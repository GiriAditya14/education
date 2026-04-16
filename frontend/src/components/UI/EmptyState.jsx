import React from 'react';
import Button from './Button';

/**
 * EmptyState Component
 * Display empty state with icon, message, and optional CTA
 * 
 * @param {React.ReactNode} icon - Icon element or emoji
 * @param {string} title - Main message title
 * @param {string} message - Descriptive message
 * @param {string} ctaText - Call-to-action button text
 * @param {function} onCtaClick - CTA button click handler
 * @param {string} ctaVariant - Button variant for CTA
 * @param {string} className - Additional CSS classes
 */
const EmptyState = ({ 
  icon = '📭',
  title = 'No items found',
  message = 'Get started by creating your first item',
  ctaText,
  onCtaClick,
  ctaVariant = 'primary',
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      {...props}
    >
      <div className="text-6xl mb-4">
        {typeof icon === 'string' ? icon : icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {ctaText && onCtaClick && (
        <Button 
          variant={ctaVariant}
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
