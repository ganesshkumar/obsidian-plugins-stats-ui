/**
 * Authentication utilities for custom backend OAuth
 * Handles token storage and authentication state
 */

const TOKEN_KEY = 'auth_token';
const RETURN_URL_KEY = 'auth_return_url';

/**
 * Store the authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Retrieve the authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Remove the authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Check if user is authenticated (has a valid token)
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Store the return URL before redirecting to login
 */
export const setReturnUrl = (url: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RETURN_URL_KEY, url);
  }
};

/**
 * Get and clear the stored return URL
 */
export const getAndClearReturnUrl = (): string => {
  if (typeof window !== 'undefined') {
    const url = localStorage.getItem(RETURN_URL_KEY) || '/';
    localStorage.removeItem(RETURN_URL_KEY);
    return url;
  }
  return '/';
};

/**
 * Get the backend OAuth URL from environment variables
 */
export const getOAuthUrl = (): string => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  return `${backendUrl}/auth/google`;
};

/**
 * Initiate login by redirecting to OAuth provider
 * Saves the current URL to return to after authentication
 */
export const initiateLogin = (): void => {
  if (typeof window !== 'undefined') {
    // Save current page to return to after login
    setReturnUrl(window.location.pathname + window.location.search);
    
    // Redirect to OAuth provider
    window.location.href = getOAuthUrl();
  }
};

/**
 * Logout the user by removing token and optionally redirecting
 * If no redirectTo is provided, stays on the current page
 */
export const logout = (redirectTo?: string): void => {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      // Reload current page to reflect logged out state
      window.location.reload();
    }
  }
};
