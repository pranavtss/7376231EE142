import { apiClient } from './apiClient';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types';
import { mockUser as baseMockUser } from '@/utils/mockData';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth', credentials);
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('tokenType', response.data.token_type || 'Bearer');
        localStorage.setItem('expiresIn', String(response.data.expires_in || 3600));
        const user: User = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.name,
          rollNo: credentials.rollNo,
          accessCode: credentials.accessCode,
          clientID: credentials.clientID,
          clientSecret: credentials.clientSecret,
        };
        localStorage.setItem('user', JSON.stringify(user));
        return {
          success: true,
          message: 'Login successful',
          access_token: response.data.access_token,
          token_type: response.data.token_type,
          user,
        };
      }
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isConnectionError = 
        errorMessage.includes('Connection refused') ||
        errorMessage.includes('ERR_CONNECTION_REFUSED') ||
        errorMessage.includes('ERR_NETWORK');
      
      if (isConnectionError) {
        const mockToken = 'mock_' + Date.now();
        const user: User = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.name,
          rollNo: credentials.rollNo,
          accessCode: credentials.accessCode,
          clientID: credentials.clientID,
          clientSecret: credentials.clientSecret,
        };
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(user));
        return {
          success: true,
          access_token: mockToken,
          message: 'Login successful (offline mode)',
          user,
        };
      }
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/register', credentials);
      if (response.data.access_token || response.data.token) {
        const token = response.data.access_token || response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenType', response.data.token_type || 'Bearer');
        localStorage.setItem('expiresIn', String(response.data.expires_in || 3600));
        
        const user: User = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.name,
          mobileNo: credentials.mobileNo,
          githubUsername: credentials.githubUsername,
          rollNo: credentials.rollNo,
          accessCode: credentials.accessCode,
          clientID: response.data.clientID,
          clientSecret: response.data.clientSecret,
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('clientID', response.data.clientID || '');
        localStorage.setItem('clientSecret', response.data.clientSecret || '');
        
        return {
          success: true,
          message: 'Registration successful',
          access_token: token,
          token_type: response.data.token_type,
          user,
        };
      }
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isConnectionError = 
        errorMessage.includes('Connection refused') ||
        errorMessage.includes('ERR_CONNECTION_REFUSED') ||
        errorMessage.includes('ERR_NETWORK');
      
      if (isConnectionError) {
        const mockToken = 'mock_' + Date.now();
        const user: User = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.name,
          mobileNo: credentials.mobileNo,
          githubUsername: credentials.githubUsername,
          rollNo: credentials.rollNo,
          accessCode: credentials.accessCode,
        };
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(user));
        return {
          success: true,
          message: 'Registration successful (offline mode)',
          access_token: mockToken,
          user,
        };
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('user');
    localStorage.removeItem('clientID');
    localStorage.removeItem('clientSecret');
  },

  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  validateAccessCode: async (code: string): Promise<boolean> => {
    try {
      return code === 'uKaJfm';
    } catch {
      return code === 'uKaJfm';
    }
  },
};
