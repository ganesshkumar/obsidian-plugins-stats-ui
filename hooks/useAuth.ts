import { useState, useEffect } from 'react';
import { 
  isAuthenticated, 
  getAuthToken, 
  initiateLogin, 
  logout as logoutUtil,
  scheduleTokenRefresh
} from '@/lib/auth';

interface UseAuthReturn {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated: boolean;
  /**
   * The authentication token (if available)
   */
  token: string | null;
  /**
   * Whether the auth state is being checked
   */
  loading: boolean;
  /**
   * Trigger login flow (saves current page and redirects to OAuth)
   */
  login: () => void;
  /**
   * Logout user and optionally redirect. If no redirectTo is provided, stays on current page.
   */
  logout: (redirectTo?: string) => Promise<void>;
}

/**
 * Custom hook for managing authentication state with custom backend OAuth
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, token, loading, login, logout } = useAuth();
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       {isAuthenticated ? (
 *         <>
 *           <p>Welcome! Token: {token}</p>
 *           <button onClick={logout}>Logout</button>
 *         </>
 *       ) : (
 *         <button onClick={login}>Login</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      const authToken = getAuthToken();
      
      setAuthenticated(authStatus);
      setToken(authToken);
      setLoading(false);

      // Schedule token refresh if authenticated
      if (authStatus && authToken) {
        scheduleTokenRefresh();
      }
    };

    checkAuth();

    // Optional: Listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = () => {
    initiateLogin();
  };

  const logout = async (redirectTo?: string) => {
    await logoutUtil(redirectTo);
  };

  return {
    isAuthenticated: authenticated,
    token,
    loading,
    login,
    logout,
  };
}
