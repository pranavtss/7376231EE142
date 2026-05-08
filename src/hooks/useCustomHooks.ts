import { useState, useEffect } from 'react';
import { useAuthStore } from '@/context/store';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const error = useAuthStore((state) => state.error);
  const logout = useAuthStore((state) => state.logout);
  const setError = useAuthStore((state) => state.setError);

  return {
    user,
    token,
    isAuthenticated,
    error,
    logout,
    setError,
  };
}

export function useLocalStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch {
      
    }
  };

  return [storedValue, setValue];
}

export function useTimer(initialSeconds: number, onTimeUp?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  return seconds;
}
