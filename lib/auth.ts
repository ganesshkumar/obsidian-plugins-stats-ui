/**
 * Authentication utilities for custom backend OAuth
 * Handles token storage and authentication state
 */

const TOKEN_KEY = 'accessToken';
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
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  return `${backendUrl}/auth/google`;
};

/**
 * Get the backend base URL
 */
export const getBackendUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
};

/**
 * Refresh the access token using the refresh token stored in httpOnly cookie
 * Returns true if refresh was successful, false otherwise
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${getBackendUrl()}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Required to send refresh token cookie
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      setAuthToken(accessToken);
      return true;
    } else {
      // Refresh token expired or invalid
      return false;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

/**
 * Decode JWT token to get payload
 */
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Timer ID to track scheduled token refresh and prevent duplicates
 */
let refreshTimerId: NodeJS.Timeout | null = null;

/**
 * Schedule automatic token refresh 1 minute before it expires
 * Call this after successful login or token refresh
 * Prevents duplicate scheduling by clearing any existing timer
 */
export const scheduleTokenRefresh = (): void => {
  if (typeof window === 'undefined') return;

  // Clear any existing timer to prevent duplicate refresh calls
  if (refreshTimerId) {
    clearTimeout(refreshTimerId);
    refreshTimerId = null;
  }

  const accessToken = getAuthToken();
  if (!accessToken) return;

  const payload = decodeJWT(accessToken);
  if (!payload || !payload.exp) return;

  const expiresAt = payload.exp * 1000; // Convert to milliseconds
  const refreshAt = expiresAt - 60000; // 1 minute before expiry
  const delay = refreshAt - Date.now();

  if (delay > 0) {
    refreshTimerId = setTimeout(async () => {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        scheduleTokenRefresh(); // Schedule next refresh
      } else {
        // Refresh failed, user needs to re-authenticate
        logout('/');
      }
    }, delay);
  }
};

/**
 * Cancel any scheduled token refresh
 * Useful when logging out or cleaning up
 */
export const cancelTokenRefresh = (): void => {
  if (refreshTimerId) {
    clearTimeout(refreshTimerId);
    refreshTimerId = null;
  }
};

/**
 * Initialize authentication on app load
 * Schedules token refresh if user is authenticated
 * Call this once when the app starts
 */
export const initializeAuth = async (): Promise<void> => {
  if (typeof window === 'undefined') return;

  const token = getAuthToken();
  if (token) {
    // Check if token is still valid
    const payload = decodeJWT(token);
    if (payload && payload.exp) {
      const expiresAt = payload.exp * 1000;
      const now = Date.now();

      if (expiresAt > now) {
        // Token is still valid, schedule refresh
        scheduleTokenRefresh();
      } else {
        // Token expired, try to refresh using refresh token (httpOnly cookie)
        console.log('Access token expired on app load, attempting refresh...');
        const refreshed = await refreshAccessToken();

        if (refreshed) {
          // Successfully refreshed, schedule next refresh
          console.log('Token refreshed successfully on app load');
          scheduleTokenRefresh();
        } else {
          // Refresh failed (refresh token also expired or invalid), clear token
          console.warn(
            'Token refresh failed on app load, clearing expired token'
          );
          removeAuthToken();
        }
      }
    }
  }
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
 * Logout the user by calling backend logout endpoint and clearing local storage
 * If no redirectTo is provided, stays on the current page
 */
export const logout = async (redirectTo?: string): Promise<void> => {
  const token = getAuthToken();

  // Cancel any scheduled token refresh
  cancelTokenRefresh();

  // Call backend logout endpoint if we have a token
  if (token) {
    try {
      await fetch(`${getBackendUrl()}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Required to clear refresh token cookie
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Clear local storage
  removeAuthToken();

  if (typeof window !== 'undefined') {
    // Also clear user email from localStorage
    localStorage.removeItem('userEmail');

    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      // Reload current page to reflect logged out state
      window.location.reload();
    }
  }
};

/**
 * Logout from all devices by invalidating all refresh tokens
 */
export const logoutAll = async (redirectTo?: string): Promise<void> => {
  const token = getAuthToken();

  // Cancel any scheduled token refresh
  cancelTokenRefresh();

  if (token) {
    try {
      await fetch(`${getBackendUrl()}/auth/logout-all`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout all failed:', error);
    }
  }

  // Clear local storage
  removeAuthToken();

  if (typeof window !== 'undefined') {
    // Also clear user email from localStorage
    localStorage.removeItem('userEmail');

    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.location.href = '/';
    }
  }
};
