'use client';

import React from 'react';
import useUser from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import AppNavbar from '../components/Navbar';

const Profile = () => {
  const { user, loading, login, logout } = useUser();

  const handleDeleteAccount = () => {
    window.location.href = 'mailto:support@example.com?subject=Delete My Account';
  };

  return (
    <div className='flex flex-col h-screen'>
      <AppNavbar />
      <div className="h-full flex flex-col justify-center items-center">
        {loading ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        ) : user ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              You are logged in via <strong className="capitalize">{user.app_metadata.provider}</strong> as <strong>{user.email}</strong>
            </p>
            <div className="mt-4 space-x-4">
              <Button
                onClick={logout}
                className="px-4 py-2"
              >
                Log Out
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="px-4 py-2"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">You are not logged in.</p>
            <Button
              onClick={login}
              className="mt-4 px-4 py-2"
            >
              Log In with Google
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;