import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/store';
import { useNotificationStore } from '@/context/store';
import { classNames } from '@/utils/helpers';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-bold text-primary-600">
            Assessment Platform
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <Link
              to="/dashboard"
              className={classNames(
                'font-medium transition-colors',
                isActive('/dashboard')
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Dashboard
            </Link>

            <Link
              to="/evaluation"
              className={classNames(
                'font-medium transition-colors',
                isActive('/evaluation')
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Evaluation
            </Link>

            <Link
              to="/notifications"
              className={classNames(
                'relative font-medium transition-colors',
                isActive('/notifications')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-error-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-error-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
