import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error) {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [authChanged]);

  const login = () => {
    const returnTo = window.location.pathname;
    supabase.auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`,
        },
      })
      .then(() => setAuthChanged((prev) => !prev));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthChanged((prev) => !prev);
  };

  return { user, loading, login, logout };
};

export default useUser;
