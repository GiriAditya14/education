/**
 * Design Tokens for EduConnect
 * Centralized design system constants for colors, typography, spacing, and UI elements
 */

export const colors = {
  // Primary - Deep Blue
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Accent Success - Emerald
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  
  // Accent Warning - Amber
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Accent Danger - Red
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Neutral - Gray
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Background colors
  background: {
    light: '#f9fafb', // gray-50
    lighter: '#f3f4f6', // gray-100
    dark: '#1f2937', // gray-800
    darker: '#111827', // gray-900
  },
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  container: {
    maxWidth: '80rem', // max-w-7xl
    padding: '1.5rem', // p-6
  },
  
  card: {
    padding: '1.5rem', // p-6
    paddingLarge: '2rem', // p-8
  },
  
  section: {
    gap: '1.5rem', // space-y-6
    gapLarge: '2rem', // space-y-8
  },
  
  grid: {
    gap: '1.5rem', // gap-6
    gapLarge: '2rem', // gap-8
  },
};

export const ui = {
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  borderRadius: {
    sm: '0.25rem',   // rounded-sm
    md: '0.375rem',  // rounded-md
    lg: '0.5rem',    // rounded-lg
    xl: '0.75rem',   // rounded-xl
    full: '9999px',  // rounded-full
  },
  
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

export default {
  colors,
  typography,
  spacing,
  ui,
};
