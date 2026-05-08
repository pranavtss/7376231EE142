// Mock data for frontend development without backend

export const mockUser = {
  id: 'user_001',
  email: 'student@college.com',
  fullName: 'John Doe',
  phone: '+91 9876543210',
  college: 'ABC Engineering College',
  registrationNumber: 'CS20001',
  createdAt: new Date().toISOString(),
};

export const mockQuestions = [
  {
    id: 'q1',
    text: 'What is the capital of India?',
    options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
    correctAnswer: 0,
    timeLimit: 30,
  },
  {
    id: 'q2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    timeLimit: 30,
  },
  {
    id: 'q3',
    text: 'What is 15 + 27?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    timeLimit: 20,
  },
  {
    id: 'q4',
    text: 'Who wrote Romeo and Juliet?',
    options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 2,
    timeLimit: 30,
  },
  {
    id: 'q5',
    text: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
    timeLimit: 25,
  },
];

export const mockStages = [
  {
    id: 'stage1',
    name: 'Stage 1: Aptitude Test',
    description: 'Basic aptitude and reasoning questions',
    status: 'completed' as const,
    totalQuestions: 5,
    questions: mockQuestions.slice(0, 5),
  },
  {
    id: 'stage2',
    name: 'Stage 2: Technical Assessment',
    description: 'Technical knowledge and problem-solving',
    status: 'in-progress' as const,
    totalQuestions: 5,
    questions: mockQuestions,
  },
  {
    id: 'stage3',
    name: 'Stage 3: Final Round',
    description: 'Comprehensive evaluation',
    status: 'not-started' as const,
    totalQuestions: 5,
    questions: [],
  },
];

export const mockNotifications = [
  {
    id: 'notif_1',
    type: 'info' as const,
    title: 'Welcome to Assessment Platform',
    message: 'Your account has been successfully created. Please complete all evaluation stages.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
  },
  {
    id: 'notif_2',
    type: 'success' as const,
    title: 'Stage 1 Completed',
    message: 'You have successfully completed Stage 1 with a score of 85/100.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
  {
    id: 'notif_3',
    type: 'warning' as const,
    title: 'Stage 2 In Progress',
    message: 'You are currently in Stage 2. Please complete it within the given time limit.',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 'notif_4',
    type: 'error' as const,
    title: 'Network Error',
    message: 'There was a temporary network issue. Your progress has been saved.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: true,
  },
];

export const mockEvaluationResults = [
  {
    stageId: 'stage1',
    score: 85,
    totalQuestions: 5,
    correctAnswers: 4,
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'passed' as const,
  },
];

export const mockApiResponses = {
  loginSuccess: {
    success: true,
    message: 'Login successful',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    user: mockUser,
    statusCode: 200,
  },
  registerSuccess: {
    success: true,
    message: 'Registration successful. Please login.',
    statusCode: 201,
  },
  evaluationData: {
    success: true,
    data: {
      userId: mockUser.id,
      stages: mockStages,
      results: mockEvaluationResults,
      overallStatus: 'in-progress' as const,
    },
  },
  notificationsData: {
    success: true,
    data: mockNotifications,
  },
};

export const simulateApiDelay = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getMockStageById = (id: string) => {
  return mockStages.find((stage) => stage.id === id);
};

export const getMockNotificationById = (id: string) => {
  return mockNotifications.find((notif) => notif.id === id);
};
