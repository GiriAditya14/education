import React from 'react';

/**
 * Badge Component
 * Status indicator badge with different variants
 * 
 * @param {string} variant - Badge style: 'success', 'warning', 'danger', 'info', 'default'
 * @param {string} size - Badge size: 'sm', 'md', 'lg'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Badge content
 */
const Badge = ({ 
  variant = 'default', 
  size = 'md',
  className = '',
  children,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;
