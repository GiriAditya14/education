import { useEffect, useState } from 'react';
import questionService from '../../services/questions';
import QuestionItem from './QuestionItem';
import { useAuth } from '../../context/AuthContext';

const QuestionList = ({ isTeacherView = false }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  }, [isTeacherView, token]);

  const handleAcceptQuestion = async (questionId) => {
    try {
      await questionService.acceptQuestion(questionId, token);
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to accept question');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading questions...</div>;
  }

  if (error) {
    return <div className="bg-red-600 text-white p-4 rounded-md">{error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        {isTeacherView ? 'No open questions available' : 'You have no questions yet'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionItem
          key={question._id}
          question={question}
          isTeacherView={isTeacherView}
          onAccept={handleAcceptQuestion}
          currentUserId={user?._id}
        />
      ))}
    </div>
  );
};

export default QuestionList;