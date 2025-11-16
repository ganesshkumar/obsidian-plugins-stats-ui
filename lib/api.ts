'use client';

import { getAuthToken } from './auth';

/**
 * Fetch wrapper that automatically includes authentication token
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Not authenticated. Please login first.');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Helper to get the backend API base URL
 */
export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000s';
}

/**
 * Make an authenticated GET request to your backend
 */
export async function backendGet<T = any>(endpoint: string): Promise<T> {
  const url = `${getBackendUrl()}${endpoint}`;
  const response = await authenticatedFetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
