import React from 'react';

/**
 * Card Component
 * Reusable card container with shadow and hover effects
 * 
 * @param {string} className - Additional CSS classes
 * @param {boolean} hoverable - Enable hover lift effect
 * @param {React.ReactNode} children - Card content
 */
const Card = ({ 
  className = '', 
  hoverable = false,
  children,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md transition-all duration-300';
  const hoverStyles = hoverable ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  const cardClasses = `${baseStyles} ${hoverStyles} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * CardHeader Component
 * Header section for Card component
 */
export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardBody Component
 * Body section for Card component
 */
export const CardBody = ({ className = '', children, ...props }) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 * Footer section for Card component
 */
export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
