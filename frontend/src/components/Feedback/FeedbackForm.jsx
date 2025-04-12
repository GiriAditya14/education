import { useState, useEffect } from 'react';
import feedbackService from '../../services/feedback';
import questionService from '../../services/questions';
import { useAuth } from '../../context/AuthContext';

const FeedbackForm = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchAnsweredQuestions = async () => {
      try {
        const data = await questionService.getMyQuestions(token);
        const answeredQuestions = data.filter(q => q.isAccepted);
        setQuestions(answeredQuestions);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch questions');
      }
    };

    fetchAnsweredQuestions();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await feedbackService.submitFeedback(selectedQuestion, rating, feedbackText, token);
      setSuccess('Feedback submitted successfully!');
      setSelectedQuestion('');
      setFeedbackText('');
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Submit Feedback</h3>
      {error && <div className="mb-4 p-2 bg-red-600 text-white rounded-md">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-600 text-white rounded-md">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="question">
            Select Question
          </label>
          <select
            id="question"
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          >
            <option value="">-- Select a question --</option>
            {questions.map((q) => (
              <option key={q._id} value={q._id}>
                {q.text.substring(0, 50)}{q.text.length > 50 ? '...' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Rating</label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="feedbackText">
            Feedback (optional)
          </label>
          <textarea
            id="feedbackText"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            rows="3"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;