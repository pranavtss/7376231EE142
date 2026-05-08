import { useAuth } from '@/hooks/useCustomHooks';
import { Card, Alert } from '@/components/common';
import { useNotificationStore } from '@/context/store';

export function Dashboard() {
  const { user } = useAuth();
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-2">
            {user?.rollNo}
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Updates</h2>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <Alert
                  key={notification.id}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                />
              ))}
            </div>
          </div>
        )}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Evaluation Status</h2>
              <p className="text-gray-600 mt-1">Complete all stages to proceed</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary-600">3</div>
              <p className="text-gray-600">Stages</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mobile</p>
              <p className="font-medium text-gray-900">{user?.mobileNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">GitHub</p>
              <p className="font-medium text-gray-900">{user?.githubUsername}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="font-medium text-gray-900">{user?.rollNo}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
