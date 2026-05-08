import { useState } from 'react';
import { Button, Input, Card, Alert } from '@/components/common';
import { validateEmail } from '@/utils/helpers';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/context/store';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    rollNo: '',
    accessCode: '',
    clientID: '',
    clientSecret: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }
    if (!formData.accessCode.trim()) {
      newErrors.accessCode = 'Access code is required';
    }
    if (formData.accessCode !== 'uKaJfm') {
      newErrors.accessCode = 'Invalid access code';
    }
    if (!formData.clientID.trim()) {
      newErrors.clientID = 'Client ID is required';
    }
    if (!formData.clientSecret.trim()) {
      newErrors.clientSecret = 'Client secret is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      if (response.access_token && response.user) {
        setToken(response.access_token);
        setUser(response.user);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      } else {
        setServerError(response.message || 'Login failed');
      }
    } catch (error) {
      setServerError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials</p>
          </div>

          {serverError && (
            <Alert
              type="error"
              title="Login Failed"
              message={serverError}
              onClose={() => setServerError('')}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Full Name"
              placeholder="John Doe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              label="Roll Number"
              placeholder="CSE001"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              error={errors.rollNo}
            />

            <Input
              label="Access Code"
              placeholder="Enter access code"
              name="accessCode"
              value={formData.accessCode}
              onChange={handleChange}
              error={errors.accessCode}
            />

            <Input
              label="Client ID"
              placeholder="Your client ID"
              name="clientID"
              value={formData.clientID}
              onChange={handleChange}
              error={errors.clientID}
            />

            <Input
              label="Client Secret"
              placeholder="Your client secret"
              name="clientSecret"
              value={formData.clientSecret}
              onChange={handleChange}
              error={errors.clientSecret}
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-primary-600 font-semibold hover:underline">
              Register here
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
