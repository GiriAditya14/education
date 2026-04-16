import React from 'react';
import Card, { CardBody } from '../UI/Card';
import StarRating from './StarRating';
import Avatar from '../UI/Avatar';

/**
 * FeedbackCard Component
 * Displays individual feedback item with student info, rating, and comment
 * 
 * @param {Object} feedback - Feedback object containing student, rating, comment, question, and date
 */
const FeedbackCard = ({ feedback }) => {
  // Format date to relative time
  const formatRelativeTime = (date) => {
    const now = new Date();
    const feedbackDate = new Date(date);
    const diffInSeconds = Math.floor((now - feedbackDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    
    return feedbackDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const studentName = feedback.student?.name || 'Anonymous Student';
  const studentInitials = studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card hoverable>
      <CardBody className="p-6">
        <div className="flex items-start space-x-4">
          {/* Student Avatar */}
          <Avatar 
            name={studentName}
            size="md"
          />

          {/* Feedback Content */}
          <div className="flex-1 min-w-0">
            {/* Header: Student Name and Date */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {studentName}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatRelativeTime(feedback.createdAt)}
                </p>
              </div>
              
              {/* Star Rating */}
              <div className="flex-shrink-0">
                <StarRating 
                  value={feedback.rating} 
                  size="sm"
                  readOnly
                />
              </div>
            </div>

            {/* Feedback Comment */}
            {feedback.feedbackText && (
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {feedback.feedbackText}
                </p>
              </div>
            )}

            {/* Question Preview */}
            {feedback.question && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Session Question
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {feedback.question.text}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FeedbackCard;
