import { useState, useEffect } from 'react';
import feedbackService from '../../services/feedback';
import questionService from '../../services/questions';
import { useAuth } from '../../context/AuthContext';
import Card, { CardBody } from '../UI/Card';
import Button from '../UI/Button';
import StarRating from './StarRating';

const FeedbackForm = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const MAX_CHARS = 500;

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
      setSuccess('Feedback submitted successfully! Thank you for your input.');
      setSelectedQuestion('');
      setFeedbackText('');
      setRating(5);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setFeedbackText(text);
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardBody className="p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Submit Feedback</h3>
          <p className="text-sm sm:text-base text-gray-600">Help us improve by rating your session</p>
        </div>

        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-800 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="question">
              Select Session
            </label>
            <select
              id="question"
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all text-sm sm:text-base"
              required
            >
              <option value="">-- Select a completed session --</option>
              {questions.map((q) => (
                <option key={q._id} value={q._id}>
                  {q.acceptedBy?.name ? `${q.acceptedBy.name} - ` : ''}
                  {q.text.substring(0, 60)}{q.text.length > 60 ? '...' : ''}
                </option>
              ))}
            </select>
            {questions.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">
                No completed sessions available for feedback
              </p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rating
            </label>
            <StarRating 
              value={rating} 
              onChange={setRating}
              size="lg"
            />
            <p className="mt-2 text-sm text-gray-600">
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Fair'}
              {rating === 1 && 'Needs Improvement'}
            </p>
          </div>

          {/* Feedback Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="feedbackText">
              Your Feedback
            </label>
            <textarea
              id="feedbackText"
              value={feedbackText}
              onChange={handleFeedbackChange}
              placeholder="Share your experience with this session..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none transition-all text-sm sm:text-base"
              rows="5"
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-gray-500">Optional</p>
              <p className={`text-sm ${feedbackText.length >= MAX_CHARS ? 'text-red-600' : 'text-gray-500'}`}>
                {feedbackText.length}/{MAX_CHARS}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting || !selectedQuestion}
              fullWidth
              className="text-sm sm:text-base py-3 sm:py-2.5"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default FeedbackForm;