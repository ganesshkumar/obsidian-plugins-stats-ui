'use client';

import { getAuthToken, refreshAccessToken, logout } from './auth';

/**
 * Fetch wrapper that automatically includes authentication token
 * Handles 401 errors by refreshing token and retrying the request
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const parsedUrl = new URL(
    url,
    typeof window !== 'undefined' ? window.location.origin : getBackendUrl()
  );

  if (parsedUrl.pathname === '/api/graphql') {
    throw new Error('Use Apollo Client for GraphQL requests instead of fetch.');
  }

  const token = getAuthToken();

  if (!token) {
    throw new Error('Not authenticated. Please login first.');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Required to send refresh token cookie
  });

  // Handle 401 (token expired) - try to refresh and retry
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      // Retry request with new token
      const newToken = getAuthToken();
      headers.set('Authorization', `Bearer ${newToken}`);

      response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      // Refresh failed, user needs to re-authenticate
      logout('/');
      throw new Error('Session expired. Please login again.');
    }
  }

  return response;
}

/**
 * Helper to get the backend API base URL
 */
export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
}

/**
 * Make an authenticated GET request to your backend
 */
export async function backendGet<T = any>(endpoint: string): Promise<T> {
  const url = `${getBackendUrl()}${endpoint}`;
  const response = await authenticatedFetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Make an authenticated POST request to your backend
 */
export async function backendPost<T = any>(
  endpoint: string,
  data: any
): Promise<T> {
  const url = `${getBackendUrl()}${endpoint}`;
  const response = await authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Make an authenticated PUT request to your backend
 */
export async function backendPut<T = any>(
  endpoint: string,
  data: any
): Promise<T> {
  const url = `${getBackendUrl()}${endpoint}`;
  const response = await authenticatedFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Make an authenticated DELETE request to your backend
 */
export async function backendDelete<T = any>(endpoint: string): Promise<T> {
  const url = `${getBackendUrl()}${endpoint}`;
  const response = await authenticatedFetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
