import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setAuthToken, getAndClearReturnUrl, scheduleTokenRefresh } from '@/lib/auth';

/**
 * Google OAuth callback handler page
 * Handles the redirect from backend after Google OAuth authentication
 * Expects an 'accessToken' query parameter at /auth/google/callback?accessToken=...
 */
export default function GoogleCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return;

    const { accessToken, error } = router.query;

    // Handle error from backend
    if (error) {
      setStatus('error');
      setErrorMessage(typeof error === 'string' ? error : 'Authentication failed');
      return;
    }

    // Handle successful authentication
    if (accessToken && typeof accessToken === 'string') {
      try {
        // Store the access token in localStorage
        setAuthToken(accessToken);
        setStatus('success');

        // Schedule automatic token refresh
        scheduleTokenRefresh();

        // Get the URL to return to (defaults to '/')
        const returnUrl = getAndClearReturnUrl();

        // Redirect after a brief delay to show success message
        setTimeout(() => {
          router.push(returnUrl);
        }, 1000);
      } catch (err) {
        setStatus('error');
        setErrorMessage('Failed to store authentication token');
        console.error('Auth error:', err);
      }
    } else {
      setStatus('error');
      setErrorMessage('No authentication token received');
    }
  }, [router.isReady, router.query, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {status === 'processing' && (
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Completing authentication...
            </h2>
            <p className="text-gray-600">Please wait while we log you in.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Authentication successful!
            </h2>
            <p className="text-gray-600">Redirecting you back...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Authentication failed
            </h2>
            <p className="mb-4 text-gray-600">{errorMessage}</p>
            <button
              onClick={() => router.push('/')}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
