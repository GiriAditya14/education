import React, { useState } from 'react';

/**
 * StarRating Component
 * Interactive star rating input with hover effects
 * 
 * @param {number} value - Current rating value (1-5)
 * @param {function} onChange - Callback when rating changes
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 * @param {boolean} readOnly - Display only mode (no interaction)
 * @param {string} className - Additional CSS classes
 */
const StarRating = ({ 
  value = 0, 
  onChange, 
  size = 'md',
  readOnly = false,
  className = '',
  ...props 
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };
  
  const handleMouseEnter = (rating) => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };
  
  const displayValue = hoverValue || value;
  
  return (
    <div className={`flex items-center space-x-1 ${className}`} {...props}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readOnly}
          className={`
            ${sizes[size]} 
            ${star <= displayValue ? 'text-yellow-400' : 'text-gray-300'}
            ${!readOnly ? 'cursor-pointer hover:scale-110 transition-all duration-200' : 'cursor-default'}
            focus:outline-none
          `}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
