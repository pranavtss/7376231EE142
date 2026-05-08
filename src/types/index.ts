// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  mobileNo?: string;
  githubUsername?: string;
  rollNo: string;
  accessCode?: string;
  clientID?: string;
  clientSecret?: string;
  createdAt?: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}

export interface RegisterCredentials {
  email: string;
  name: string;
  mobileNo: string;
  githubUsername: string;
  rollNo: string;
  accessCode: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token_type?: string;
  access_token?: string;
  expires_in?: number;
  token?: string;
  user?: User;
  clientID?: string;
  clientSecret?: string;
  statusCode?: number;
}

// Evaluation Types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

export interface EvaluationStage {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  totalQuestions: number;
  questions?: Question[];
}

export interface EvaluationResponse {
  questionId: string;
  selectedOption: number;
  timeSpent: number; // in seconds
}

export interface EvaluationResult {
  stageId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  status: 'passed' | 'failed';
}

export interface UserEvaluation {
  userId: string;
  stages: EvaluationStage[];
  results: EvaluationResult[];
  overallStatus: 'not-started' | 'in-progress' | 'completed';
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  error?: string;
}
