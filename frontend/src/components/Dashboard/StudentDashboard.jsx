import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';
import StatCard from '../UI/StatCard';
import Badge from '../UI/Badge';
import EmptyState from '../UI/EmptyState';
import questionService from '../../services/questions';

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeDoubts: 0,
    resolved: 0,
    avgRating: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const questionsData = await questionService.getMyQuestions(token);
      setQuestions(questionsData);
      
      // Calculate statistics
      const active = questionsData.filter(q => !q.isCompleted).length;
      const resolved = questionsData.filter(q => q.isCompleted).length;
      
      setStats({
        activeDoubts: active,
        resolved: resolved,
        avgRating: 0 // Will be calculated from feedback data
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAskDoubt = () => {
    navigate('/questions');
  };

  const getQuestionStatus = (question) => {
    if (question.isCompleted) return 'Completed';
    if (question.isAccepted) return 'Accepted';
    return 'Open';
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Accepted':
        return 'info';
      case 'Open':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInMs = now - questionDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const activeDoubts = questions.filter(q => !q.isCompleted);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Track your learning progress and manage your doubts
          </p>
        </div>
        <Button 
          variant="primary" 
          size="lg"
          onClick={handleAskDoubt}
          className="w-full sm:w-auto"
        >
          Ask a Doubt
        </Button>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="📝"
          label="Active Doubts"
          value={stats.activeDoubts}
        />
        <StatCard
          icon="✅"
          label="Resolved"
          value={stats.resolved}
        />
        <StatCard
          icon="⭐"
          label="Average Rating"
          value={stats.avgRating.toFixed(1)}
        />
      </div>

      {/* Active Doubts Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">My Active Doubts</h2>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : activeDoubts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeDoubts.map((doubt) => (
              <div
                key={doubt._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={getStatusVariant(getQuestionStatus(doubt))}>
                    {getQuestionStatus(doubt)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(doubt.createdAt)}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-900 font-medium mb-3 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {doubt.text}
                </p>
                
                {doubt.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={doubt.imageUrl}
                      alt="Question"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
                
                {doubt.acceptedBy && (
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium">Teacher:</span>
                    <span className="ml-2">{doubt.acceptedBy.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🤔"
            title="No active doubts"
            message="You don't have any active doubts. Ask your first question to get started!"
            ctaText="Ask a Doubt"
            onCtaClick={handleAskDoubt}
          />
        )}
      </div>

      {/* Recent Sessions Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Sessions</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Mobile: Card Layout */}
          <div className="block sm:hidden">
            {questions.filter(q => q.isCompleted).slice(0, 5).length > 0 ? (
              <div className="divide-y divide-gray-200">
                {questions.filter(q => q.isCompleted).slice(0, 5).map((session) => (
                  <div key={session._id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {session.acceptedBy?.name || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500">General</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-sm text-gray-900">
                          {session.rating || 'Not rated'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No completed sessions yet
              </div>
            )}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questions.filter(q => q.isCompleted).slice(0, 5).map((session) => (
                  <tr key={session._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {session.acceptedBy?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        General
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-sm text-gray-900">
                          {session.rating || 'Not rated'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {questions.filter(q => q.isCompleted).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No completed sessions yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
