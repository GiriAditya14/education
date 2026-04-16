import { useState } from 'react';
import questionService from '../../services/questions';
import { useAuth } from '../../context/AuthContext';
import Card, { CardBody } from '../UI/Card';
import Button from '../UI/Button';
import { FiImage } from 'react-icons/fi';

const QuestionForm = ({ onQuestionAdded }) => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const MAX_CHARS = 500;
  const charCount = text.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const newQuestion = await questionService.createQuestion(text, imageUrl, token);
      onQuestionAdded(newQuestion);
      setText('');
      setImageUrl('');
      setSuccess('Question submitted successfully! A teacher will review it soon.');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit question');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardBody className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Ask a Question</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base" htmlFor="text">
              Your Question
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none transition-all duration-200 text-sm sm:text-base"
              rows="4"
              placeholder="Describe your doubt in detail..."
              maxLength={MAX_CHARS}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                Be specific to get better help
              </span>
              <span className={`text-xs font-medium ${charCount > MAX_CHARS * 0.9 ? 'text-amber-600' : 'text-gray-500'}`}>
                {charCount}/{MAX_CHARS}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base" htmlFor="imageUrl">
              <span className="flex items-center gap-2">
                <FiImage className="text-gray-500" />
                Image URL (optional)
              </span>
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200 text-sm sm:text-base"
              placeholder="https://example.com/image.jpg"
            />
            
            {imageUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-md">
                  <img
                    src={imageUrl}
                    alt="Question preview"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="hidden w-full h-32 bg-gray-100 items-center justify-center text-gray-500 text-sm"
                  >
                    Invalid image URL
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting || !text.trim()}
            fullWidth
            className="text-sm sm:text-base py-3 sm:py-2.5"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default QuestionForm;