'use client';

import React from 'react';
import useUser from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AppNavbar from '../components/Navbar';

const Profile = () => {
  const { user, loading, login, logout } = useUser();

  const handleDeleteAccount = () => {
    window.location.href =
      'mailto:support@example.com?subject=Delete My Account';
  };

  return (
    <div className="flex flex-col h-screen">
      <AppNavbar />
      <div className="h-full flex flex-col justify-center items-center">
        {loading ? (
          <div className="text-center flex flex-col items-center gap-4">
            <Spinner size="large" />
            <p className="text-lg font-semibold text-gray-700">Loading your profile...</p>
          </div>
        ) : user ? (
          <div className="text-center max-w-md">
            <div className="mb-6">
              {user.avatarUrl && (
                <img 
                  src={user.avatarUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              )}
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {user.username || 'User'}
              </p>
              <p className="text-lg text-gray-600">
                <strong>{user.email}</strong>
              </p>
            </div>
            <div className="mt-6 space-x-4">
              <Button onClick={logout} className="px-6 py-2">
                Log Out
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="px-6 py-2"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              You are not logged in.
            </p>
            <Button onClick={login} className="mt-4 px-6 py-2">
              Log In with Google
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
