import React from 'react';
import Card from './Card';

/**
 * StatCard Component
 * Card component for displaying statistics with icon, label, value, and optional trend
 * 
 * @param {React.ReactNode} icon - Icon element or emoji
 * @param {string} label - Statistic label
 * @param {string|number} value - Statistic value
 * @param {string} trend - Optional trend indicator (e.g., "+12% this week")
 * @param {string} subtitle - Optional subtitle text
 * @param {string} size - Card size: 'md', 'lg'
 * @param {string} className - Additional CSS classes
 */
const StatCard = ({ 
  icon, 
  label, 
  value, 
  trend,
  subtitle,
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeStyles = {
    md: 'p-6',
    lg: 'p-8',
  };
  
  const iconSizes = {
    md: 'text-3xl',
    lg: 'text-4xl',
  };
  
  const valueSizes = {
    md: 'text-3xl',
    lg: 'text-4xl',
  };
  
  return (
    <Card hoverable className={`${sizeStyles[size]} ${className}`} {...props}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className={`${valueSizes[size]} font-bold text-gray-900 mb-1`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <p className="text-sm text-emerald-600 font-medium mt-2">{trend}</p>
          )}
        </div>
        {icon && (
          <div className={`${iconSizes[size]} ml-4`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
