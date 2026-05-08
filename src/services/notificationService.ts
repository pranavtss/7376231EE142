import { apiClient } from './apiClient';
import { Notification } from '@/types';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data || [];
  },

  getNotification: async (id: string): Promise<Notification> => {
    const response = await apiClient.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.put<Notification>(`/notifications/${id}/read`, {});
    return response.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.put<void>('/notifications/read-all', {});
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`/notifications/${id}`);
  },
};
