import { useState } from 'react';
import { Button, Input, Card, Alert } from '@/components/common';
import { validateEmail } from '@/utils/helpers';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/context/store';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileNo: '',
    githubUsername: '',
    rollNo: '',
    accessCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    }

    if (!formData.githubUsername.trim()) {
      newErrors.githubUsername = 'GitHub username is required';
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }

    if (!formData.accessCode.trim()) {
      newErrors.accessCode = 'Access code is required';
    } else if (formData.accessCode !== 'uKaJfm') {
      newErrors.accessCode = 'Invalid access code';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register(formData);

      if (response.access_token && response.user) {
        setToken(response.access_token);
        setUser(response.user);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      } else {
        setServerError(response.message || 'Registration failed');
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.');
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
            <h1 className="text-3xl font-bold text-gray-900">Register</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          {serverError && (
            <Alert
              type="error"
              title="Registration Failed"
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
              label="Mobile Number"
              type="tel"
              placeholder="+91 9876543210"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              error={errors.mobileNo}
            />

            <Input
              label="GitHub Username"
              placeholder="johndoe"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              error={errors.githubUsername}
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

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-primary-600 font-semibold hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

            <Button type="submit" fullWidth isLoading={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-primary-600 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
           
