import { useState } from 'react';
import { FiUser, FiClock, FiImage, FiX } from 'react-icons/fi';
import Card, { CardBody } from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

/**
 * QuestionCard Component
 * Enhanced card for displaying question details with truncation, lightbox, and actions
 */
const QuestionCard = ({ 
  question,
  isTeacherView = false,
  onAccept,
  onFeedback,
  currentUserId
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  const isAccepted = question.isAccepted;
  const isCompleted = question.isCompleted;
  const isMyQuestion = question.student?._id === currentUserId;
  
  // Determine status
  const getStatus = () => {
    if (isCompleted) return { label: 'Completed', variant: 'info' };
    if (isAccepted) return { label: 'Accepted', variant: 'success' };
    return { label: 'Open', variant: 'warning' };
  };
  
  const status = getStatus();
  
  // Format relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInSeconds = Math.floor((now - questionDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return questionDate.toLocaleDateString();
  };
  
  // Truncate text
  const MAX_LENGTH = 200;
  const shouldTruncate = question.text.length > MAX_LENGTH;
  const displayText = isExpanded || !shouldTruncate 
    ? question.text 
    : question.text.substring(0, MAX_LENGTH) + '...';

  return (
    <>
      <Card hoverable className="transition-all duration-300">
        <CardBody>
          {/* Header with user info and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {isTeacherView 
                  ? (question.student?.name?.[0]?.toUpperCase() || 'S')
                  : (question.acceptedBy?.name?.[0]?.toUpperCase() || <FiUser />)
                }
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {isTeacherView 
                    ? (question.student?.name || 'Student')
                    : (isAccepted ? question.acceptedBy?.name || 'Teacher' : 'Your Question')
                  }
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiClock className="w-3 h-3" />
                  <span>{getRelativeTime(question.createdAt)}</span>
                </div>
              </div>
            </div>
            <Badge variant={status.variant}>
              {status.label}
            </Badge>
          </div>
          
          {/* Question text */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {displayText}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-700 hover:text-blue-800 text-sm font-medium mt-2 transition-colors"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          
          {/* Image thumbnail */}
          {question.imageUrl && (
            <div className="mb-4">
              <div 
                className="relative rounded-lg overflow-hidden border border-gray-200 cursor-pointer group max-w-md"
                onClick={() => setShowLightbox(true)}
              >
                <img
                  src={question.imageUrl}
                  alt="Question illustration"
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <FiImage className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          )}
          
          {/* Teacher info for accepted questions (student view) */}
          {!isTeacherView && isAccepted && question.acceptedBy && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-800">
                <span className="font-semibold">Accepted by:</span> {question.acceptedBy.name}
              </p>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            {isTeacherView && !isAccepted && (
              <Button
                variant="success"
                onClick={() => onAccept(question._id)}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Accept & Join
              </Button>
            )}
            
            {!isTeacherView && isMyQuestion && isAccepted && !isCompleted && onFeedback && (
              <Button
                variant="primary"
                onClick={() => onFeedback(question._id)}
                size="sm"
              >
                Give Feedback
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Lightbox for image */}
      {showLightbox && question.imageUrl && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            <FiX className="w-8 h-8" />
          </button>
          <img
            src={question.imageUrl}
            alt="Question illustration"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default QuestionCard;
