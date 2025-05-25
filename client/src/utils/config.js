// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  ENDPOINTS: {
    EXPLAIN: '/api/explain',
  },
};

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: {
      LIGHT: '#0ea5e9',
      DARK: '#0369a1',
    },
    ACCENT: {
      LIGHT: '#ec4899',
      DARK: '#be185d',
    },
  },
  TRANSITIONS: {
    DEFAULT: 'transition-all duration-300 ease-in-out',
    FAST: 'transition-all duration-200 ease-in-out',
  },
};

// Editor Configuration
export const EDITOR_CONFIG = {
  DEFAULT_HEIGHT: '300px',
  THEME: 'vs-dark',
};

// Loading States
export const LOADING_STATES = {
  ANALYZING: 'Analyzing code...',
  VISUALIZING: 'Visualizing...',
  PROCESSING: 'Processing...',
};

// Error Messages
export const ERROR_MESSAGES = {
  API_ERROR: 'Failed to analyze code. Please try again.',
  INVALID_CODE: 'Please enter some code to analyze.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
}; 