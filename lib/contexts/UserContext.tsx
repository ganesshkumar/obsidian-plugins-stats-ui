'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authenticatedFetch, getBackendUrl } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Fetch user profile from backend
 */
const fetchUserProfile = async (): Promise<User | null> => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const response = await authenticatedFetch(
      `${getBackendUrl()}/auth/profile`
    );
    if (response.ok) {
      const userData = await response.json();

      // Store user email in localStorage for feature flags and analytics
      if (userData?.email && typeof window !== 'undefined') {
        localStorage.setItem('userEmail', userData.email);
      }

      return userData;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const token = getAuthToken();

  // Use TanStack Query to fetch and cache profile data
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<User | null>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!token, // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 1,
  });

  return (
    <UserContext.Provider value={{ user: user || null, isLoading, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access user context
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

/**
 * Get user email from localStorage (for use in feature flags, analytics, etc.)
 * Returns email if user is logged in, otherwise returns anonymous ID
 */
export const getUserIdentifier = (): string => {
  if (typeof window === 'undefined') {
    return 'nouser';
  }

  // Try to get email from localStorage (set when profile is fetched)
  const email = localStorage.getItem('userEmail');
  if (email) {
    return email;
  }

  // Fall back to anonymous ID
  let anonId = localStorage.getItem('gbAnonUserId');
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem('gbAnonUserId', anonId);
  }
  return anonId;
};
