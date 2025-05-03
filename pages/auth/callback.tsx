'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';

  useEffect(() => {
    const run = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      const { data: existing } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!existing) {
        const username = prompt("Pick an anonymous username");
        if (!username) return;

        await supabase.from('users').insert({ id: user.id, username });
      }

      router.replace(returnTo);
    };

    run();
  }, [router, returnTo]);

  return <p>Logging you in...</p>;
};

export default AuthCallback;
