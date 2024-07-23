'use client' // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import WaitListMainView from '../WaitList/WaitListMainView';

const AuthButton: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('/api/auth/user');
      const data = await response.json();
      setUser(data.user);
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', {
      method: 'POST',
    });
    window.location.reload(); // Reload to reflect changes
  };

  return (
    <div className="flex flex-row gap-5 items-center">
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-xs text-slate-500">Hey, {user.user_metadata.displayName || user.email}!</p>
          <Button variant={'default'} onClick={handleSignOut}>
            Logout
          </Button>
        </div>
      ) : (
        <>
          <WaitListMainView />
          <Link href="/login">
            <Button variant={'outline'} size={'sm'}>Login</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
