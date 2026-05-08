import { ReactNode } from 'react';
import { classNames } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={classNames(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="mr-2 animate-spin-custom">⏳</span>}
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        className={classNames(
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
          error ? 'border-error-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-error-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={classNames('bg-white rounded-lg shadow-md p-6 border border-gray-200', className)}>
      {children}
    </div>
  );
}

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-success-50 border-success-500',
    warning: 'bg-warning-50 border-warning-500',
    error: 'bg-error-50 border-error-500',
  };

  const textColors = {
    info: 'text-blue-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
    error: 'text-error-800',
  };

  const titleColors = {
    info: 'text-blue-900',
    success: 'text-success-900',
    warning: 'text-warning-900',
    error: 'text-error-900',
  };

  return (
    <div className={classNames('border rounded-lg p-4 animate-fade-in', bgColors[type])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={classNames('font-semibold mb-1', titleColors[type])}>{title}</h3>
          <p className={classNames('text-sm', textColors[type])}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={classNames('ml-4 font-bold', textColors[type])}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
