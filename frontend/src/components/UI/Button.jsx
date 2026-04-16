import React from 'react';

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 * 
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'success', 'danger'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} loading - Show loading state
 * @param {boolean} disabled - Disable button
 * @param {boolean} fullWidth - Make button full width
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 shadow-sm hover:shadow-md',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-md hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md hover:shadow-lg',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
