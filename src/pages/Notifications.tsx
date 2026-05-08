import { useEffect, useState } from 'react';
import { notificationService } from '@/services/notificationService';
import { useNotificationStore } from '@/context/store';
import { Card, Alert } from '@/components/common';
import { formatDate } from '@/utils/helpers';

export function Notifications() {
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      useNotificationStore.setState((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    } catch {
      // Failed to mark as read
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <p className="text-gray-600">Loading notifications...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>

        {notifications.length === 0 ? (
          <Card>
            <p className="text-center text-gray-600">No notifications yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? 'opacity-75' : ''}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{formatDate(notification.timestamp)}</span>
                </div>
                <p className="text-gray-700 mb-3">{notification.message}</p>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-sm text-primary-600 hover:underline font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
