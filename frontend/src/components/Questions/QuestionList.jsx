import { useEffect, useState } from 'react';
import questionService from '../../services/questions';
import QuestionItem from './QuestionItem';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../UI/EmptyState';
import io from 'socket.io-client';

const QuestionList = ({ isTeacherView = false, searchQuery = '', subjectFilter = 'all' }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        let data;
        if (isTeacherView) {
          data = await questionService.getOpenQuestions(token);
        } else {
          data = await questionService.getMyQuestions(token);
        }
        setQuestions(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    // Set up Socket.io for real-time updates (teacher view only)
    if (isTeacherView) {
      const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: { token }
      });

      // Listen for new questions
      socket.on('newQuestion', (newQuestion) => {
        setQuestions(prev => [newQuestion, ...prev]);
      });

      // Listen for question acceptance
      socket.on('questionAccepted', (questionId) => {
        setQuestions(prev => prev.filter(q => q._id !== questionId));
      });

      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [isTeacherView, token]);

  const handleAcceptQuestion = async (questionId) => {
    try {
      await questionService.acceptQuestion(questionId, token);
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to accept question');
    }
  };

  // Filter questions for student view
  const getFilteredQuestions = () => {
    let filtered = questions;
    
    // Apply status filter for student view
    if (!isTeacherView) {
      switch (filter) {
        case 'open':
          filtered = filtered.filter(q => !q.isAccepted);
          break;
        case 'accepted':
          filtered = filtered.filter(q => q.isAccepted && !q.isCompleted);
          break;
        case 'completed':
          filtered = filtered.filter(q => q.isCompleted);
          break;
        default:
          break;
      }
    }
    
    // Apply search filter for teacher view
    if (isTeacherView && searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(query) ||
        q.student?.name?.toLowerCase().includes(query)
      );
    }
    
    // Apply subject filter for teacher view
    if (isTeacherView && subjectFilter !== 'all') {
      filtered = filtered.filter(q => 
        q.subject?.toLowerCase() === subjectFilter.toLowerCase()
      );
    }
    
    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold">Error loading questions</h3>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs for student view */}
      {!isTeacherView && (
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { key: 'all', label: 'All Questions' },
              { key: 'open', label: 'Open' },
              { key: 'accepted', label: 'Accepted' },
              { key: 'completed', label: 'Completed' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${filter === tab.key
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Real-time indicator for teacher view */}
      {isTeacherView && questions.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>Live updates enabled</span>
        </div>
      )}

      {/* Questions grid */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          icon="🤔"
          title={
            isTeacherView 
              ? (searchQuery || subjectFilter !== 'all' ? 'No matching questions' : 'No open questions available')
              : 'No questions yet'
          }
          message={
            isTeacherView
              ? (searchQuery || subjectFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'New questions from students will appear here. Check back soon!')
              : filter === 'all'
              ? "You haven't asked any questions yet. Start by asking your first doubt!"
              : `You don't have any ${filter} questions at the moment.`
          }
          ctaText={!isTeacherView && filter === 'all' ? 'Ask Your First Question' : undefined}
          onCtaClick={!isTeacherView && filter === 'all' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredQuestions.map((question) => (
            <QuestionItem
              key={question._id}
              question={question}
              isTeacherView={isTeacherView}
              onAccept={handleAcceptQuestion}
              currentUserId={user?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionList;