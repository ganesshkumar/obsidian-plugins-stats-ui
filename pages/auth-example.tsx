import { useAuth } from '@/hooks/useAuth';
import LoginButton from '@/components/LoginButton';
import { getAuthToken } from '@/lib/auth';
import { backendGet, authenticatedFetch, getBackendUrl } from '@/lib/api';

/**
 * Example page demonstrating the custom backend OAuth integration
 * Visit this page at /auth-example to see the authentication flow in action
 */
export default function AuthExamplePage() {
  const { isAuthenticated, token, loading, login, logout } = useAuth();

  const testApiCall = async () => {
    const authToken = getAuthToken();
    
    if (!authToken) {
      alert('Not authenticated! Please login first.');
      return;
    }

    try {
      // Using the helper function
      const data = await backendGet('/api/protected');
      alert(`API call successful: ${JSON.stringify(data)}`);
    } catch (error) {
      alert(`API call error: ${error}`);
    }
  };

  const testManualApiCall = async () => {
    const authToken = getAuthToken();
    
    if (!authToken) {
      alert('Not authenticated! Please login first.');
      return;
    }

    try {
      // Manual fetch with authenticatedFetch helper
      const response = await authenticatedFetch(`${getBackendUrl()}/api/user/profile`);
      
      if (response.ok) {
        const data = await response.json();
        alert(`Manual API call successful: ${JSON.stringify(data)}`);
      } else {
        alert(`API call failed with status: ${response.status}`);
      }
    } catch (error) {
      alert(`API call error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Authentication Example
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="mb-8 rounded-lg bg-blue-50 p-6">
            <p className="text-blue-800">Checking authentication status...</p>
          </div>
        )}

        {/* Authentication Status */}
        {!loading && (
          <div className={`mb-8 rounded-lg p-6 ${isAuthenticated ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <h2 className="mb-2 text-xl font-semibold">
              Status: {isAuthenticated ? '✓ Authenticated' : '✗ Not Authenticated'}
            </h2>
            {isAuthenticated && token && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-gray-700">Your Token:</p>
                <code className="block overflow-x-auto rounded bg-white p-2 text-xs">
                  {token}
                </code>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Using LoginButton Component:</h3>
            <div className="flex gap-4">
              <LoginButton />
              <LoginButton showLogout />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Using useAuth Hook:</h3>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => logout()}
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Logout (stay on page)
                  </button>
                  <button
                    onClick={() => logout('/')}
                    className="rounded-md bg-red-700 px-4 py-2 text-white hover:bg-red-800"
                  >
                    Logout (go to home)
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Login (via hook)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Test API Call */}
        {isAuthenticated && (
          <div className="mb-8 space-y-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold">Test Protected API Call (Helper Function)</h3>
              <p className="mb-4 text-sm text-gray-600">
                Using the <code className="rounded bg-gray-100 px-1">backendGet()</code> helper function.
              </p>
              <button
                onClick={testApiCall}
                className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                Test API Call (Helper)
              </button>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold">Test Manual API Call</h3>
              <p className="mb-4 text-sm text-gray-600">
                Using the <code className="rounded bg-gray-100 px-1">authenticatedFetch()</code> wrapper.
              </p>
              <button
                onClick={testManualApiCall}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Test API Call (Manual)
              </button>
            </div>
          </div>
        )}

        {/* Documentation */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-3 text-lg font-semibold">How It Works</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-gray-700">
            <li>User clicks the "Login with Google" button</li>
            <li>Current page URL is saved to localStorage</li>
            <li>User is redirected to backend OAuth endpoint</li>
            <li>Backend handles Google OAuth flow</li>
            <li>Backend redirects back with token: <code>/auth/google/callback?token=JWT_TOKEN</code></li>
            <li>Token is saved to localStorage</li>
            <li>User is redirected back to original page</li>
          </ol>

          <div className="mt-6">
            <h4 className="mb-2 font-semibold">Environment Setup:</h4>
            <p className="mb-2 text-sm text-gray-700">
              Make sure to set <code className="rounded bg-gray-100 px-1">NEXT_PUBLIC_BACKEND_URL</code> in your <code className="rounded bg-gray-100 px-1">.env.local</code> file:
            </p>
            <code className="block rounded bg-gray-100 p-2 text-xs">
              NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
            </code>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-semibold">Backend Requirements:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
              <li>Provide <code>/auth/google</code> endpoint</li>
              <li>Redirect to <code>/auth/google/callback?token=JWT_TOKEN</code> after success</li>
              <li>Redirect to <code>/auth/google/callback?error=MESSAGE</code> on error</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
