'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Card } from 'flowbite-react';
import AppNavbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { initiateLogin, logout as authLogout } from '@/lib/auth';
import { useUser } from '@/lib/contexts/UserContext';
import Head from 'next/head';

const Profile = () => {
  const { user, isLoading, refetch } = useUser();

  const handleLogin = () => {
    initiateLogin();
  };

  const handleLogout = async () => {
    await authLogout('/');
    refetch(); // Refetch to clear user data
  };

  const handleDeleteAccount = () => {
    window.location.href =
      'mailto:support@example.com?subject=Delete My Account';
  };

  return (
    <>
      <Head>
        <title>Profile | Obsidian Stats</title>
        <meta name="description" content="Manage your Obsidian Stats profile" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <AppNavbar />
        
        <main className="flex-1 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {isLoading ? (
              <Card className="text-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <Spinner size="large" />
                  <p className="text-lg font-semibold text-gray-700">Loading your profile...</p>
                </div>
              </Card>
            ) : user ? (
              <Card className="max-w-2xl mx-auto">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
                  
                  <div className="mb-8">
                    {user.avatarUrl && (
                      <img 
                        src={user.avatarUrl} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-violet-200 shadow-lg"
                      />
                    )}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {user.username || 'User'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {user.email}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button onClick={handleLogout} className="px-8 py-2 cursor-pointer" variant="outline">
                      Log Out
                    </Button>
                    <Button
                      onClick={handleDeleteAccount}
                      className="px-8 py-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto text-center py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Your Profile
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Sign in to view and manage your profile
                </p>
                <Button onClick={() => handleLogin()} className="mt-2 border border-gray-700 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                  <img src='/images/logos/google.png' className='w-8' />
                  <span>Sign in with Google</span>
                </Button>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
