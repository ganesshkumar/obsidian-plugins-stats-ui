'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loggedIn, setLoggedIn] = useState(false);
  const [needUsername, setNeedUsername] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const [usernameInput, setUsernameInput] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [acceptErrorMessage, setAcceptErrorMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const check = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      setLoggedIn(true);

      const { data: existing } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!existing) {
        setNeedUsername(true);
      } else {
        setNeedUsername(false);
        setUsername(existing.username);
      }
    };

    check();
  }, [router]);

  useEffect(() => {
    if (!username) return;
    router.replace(searchParams.get('returnTo'));
  }, [username]);

  const handleConfirm = useCallback(() => {
    let valid = true;

    const upsertUsername = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      const { error } = await supabase
        .from('users')
        .insert({ id: user.id, username: usernameInput });

      if (error) {
        setErrorMessage(
          'An error occurred while saving your username. Please try again later.'
        );
      } else {
        setUsername(usernameInput);
      }
    };

    if (!usernameInput) {
      valid = false;
      setErrorMessage('Please enter a username');
    } else if (usernameInput.length < 4 || usernameInput.length > 24) {
      valid = false;
      setErrorMessage(
        'Username must be at least 4 characters and at most 24 characters long'
      );
    } else {
      setErrorMessage(null);
    }

    if (!termsAccepted) {
      valid = false;
      setAcceptErrorMessage('Please accept the terms and conditions');
    } else {
      setAcceptErrorMessage(null);
    }

    if (valid) {
      upsertUsername();
    }
  }, [usernameInput, termsAccepted]);

  if (!loggedIn) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <div>You are not logged in</div>
        <a href="/">Go home</a>
      </main>
    );
  }

  if (!needUsername) {
    return (
      <main className="w-screen h-screen flex items-center justify-center gap-y-2">
        <div className="text-xl">
          Welcome <strong>{username}</strong>
        </div>
        <div>
          You will be redirected shortly. If not,{' '}
          <a href={searchParams.get('returnTo')}>click here</a> to go back
        </div>
        <a href="/">
          <Button>Go to Home</Button>
        </a>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-xl">
        <Input
          type="text"
          placeholder="Pseudonymous Username"
          onChange={(e) => setUsernameInput(e.target.value)}
          value={usernameInput}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {errorMessage}
          </div>
        )}
        <div>
          <div>Why we need a pseudo username?</div>
          <ul className="list-disc list-inside text-xs text-gray-700">
            <li>
              Your rating and review will be displayed publicly on the plugin
              page.
            </li>
            <li>
              Currently, our servers are located in the United States, and your
              data is processed there.
            </li>
            <li>
              To protect your privacy, we do not display personally identifiable
              information.
            </li>
            <li>A pseudonymous username is shown instead.</li>
            <li>
              You may request the deletion of your username, rating, and review
              at any time by contacting us.
            </li>
          </ul>
        </div>
        <div>
          <ul className="list-disc list-inside text-xs text-gray-700 pt-8">
            <li>
              By agreeing "Terms and Conditions" you consent to the storage and
              display of your input (pseudonymous name, rating, and review) in
              accordance with our Privacy Policy.
            </li>
            <li>
              Your data is retained only as long as necessary to serve the
              purpose for which it was collected, or until deletion is
              requested.
            </li>
          </ul>
        </div>
        {acceptErrorMessage && (
          <div className="text-red-500 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {acceptErrorMessage}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={() => setTermsAccepted(!termsAccepted)}
          />
          <label
            htmlFor="terms"
            className="text-gray-800 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </main>
  );
};

export default AuthCallback;
