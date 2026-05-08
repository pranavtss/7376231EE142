import { ReactNode } from 'react';
import { useAuthStore } from '@/context/store';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <main>{children}</main>
    </div>
  );
}

export { Layout };
