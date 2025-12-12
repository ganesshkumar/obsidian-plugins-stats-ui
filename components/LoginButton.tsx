import React from 'react';
import { initiateLogin, isAuthenticated, logout } from '@/lib/auth';

interface LoginButtonProps {
  /**
   * Optional custom className for styling
   */
  className?: string;
  /**
   * Optional children to customize button content
   */
  children?: React.ReactNode;
  /**
   * Show login or logout button based on auth state
   */
  showLogout?: boolean;
}

/**
 * Login button component that triggers OAuth flow
 * Saves current page URL and redirects back after authentication
 *
 * @example
 * ```tsx
 * // Simple usage
 * <LoginButton />
 *
 * // With custom styling
 * <LoginButton className="my-custom-class" />
 *
 * // With custom content
 * <LoginButton>Sign in with Google</LoginButton>
 *
 * // Show logout button when authenticated
 * <LoginButton showLogout />
 * ```
 */
export default function LoginButton({
  className = '',
  children,
  showLogout = false,
}: LoginButtonProps) {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLogin = () => {
    initiateLogin();
  };

  const handleLogout = async () => {
    await logout();
  };

  if (showLogout && authenticated) {
    return (
      <button
        onClick={handleLogout}
        className={
          className ||
          'rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
        }
      >
        {children || 'Logout'}
      </button>
    );
  }

  if (!authenticated) {
    return (
      <button
        onClick={handleLogin}
        className={
          className ||
          'rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }
      >
        {children || 'Login with Google'}
      </button>
    );
  }

  return null;
}
