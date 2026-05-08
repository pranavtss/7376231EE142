import { Link } from 'react-router-dom';
import { Card } from './common';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Back to Dashboard
        </Link>
      </Card>
    </div>
  );
}
