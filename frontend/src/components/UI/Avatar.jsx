import React from 'react';

/**
 * Avatar Component
 * User profile avatar with fallback to initials
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for image
 * @param {string} name - User name (used for initials fallback)
 * @param {string} size - Avatar size: 'sm', 'md', 'lg', 'xl'
 * @param {string} className - Additional CSS classes
 */
const Avatar = ({ 
  src, 
  alt = 'User avatar', 
  name = '',
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  const baseStyles = 'inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold';
  const avatarClasses = `${baseStyles} ${sizes[size]} ${className}`;
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={avatarClasses}
        {...props}
      />
    );
  }
  
  return (
    <div className={avatarClasses} {...props}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
