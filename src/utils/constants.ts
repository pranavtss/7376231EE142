// Global API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Application constants
export const APP_CONSTANTS = {
  ACCESS_CODE: 'uKaJfm',
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  TOKEN_KEY: 'authToken',
  USER_KEY: 'user',
};

// Evaluation constants
export const EVALUATION_CONSTANTS = {
  MIN_PASSING_SCORE: 60,
  STAGE_1_TIME_LIMIT: 1800, // 30 minutes
  STAGE_2_TIME_LIMIT: 2400, // 40 minutes
  STAGE_3_TIME_LIMIT: 3600, // 60 minutes
  AUTO_SUBMIT_ON_TIMEOUT: true,
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_ACCESS_CODE: 'Invalid access code',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  REGISTER_SUCCESS: 'Account created successfully',
  EVALUATION_SUBMITTED: 'Your evaluation has been submitted',
  NOTIFICATION_READ: 'Notification marked as read',
};
