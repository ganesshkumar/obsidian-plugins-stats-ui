import { useEffect, useState } from 'react';
import { getAuthToken, initiateLogin, logout as authLogout, scheduleTokenRefresh } from '@/lib/auth';
import { authenticatedFetch, getBackendUrl } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
}

/**
 * Fetch user profile from backend
 */
const fetchUserProfile = async (): Promise<User | null> => {
  try {
    const response = await authenticatedFetch(`${getBackendUrl()}/auth/profile`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const token = getAuthToken();
      
      if (token) {
        // Schedule token refresh
        scheduleTokenRefresh();
        
        // Fetch user profile
        const userProfile = await fetchUserProfile();
        setUser(userProfile);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = () => {
    initiateLogin();
  };

  const logout = async () => {
    await authLogout('/');
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useUser;
