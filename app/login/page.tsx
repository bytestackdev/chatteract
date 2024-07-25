'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ToastMessage from '@/components/ui/ToastMessage';
import { searchParamsType } from '@/types/type';
import toast from 'react-hot-toast';
import LoadingWrapper from '@/components/ui/LoadingWrapper';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true)
      if (!email || !password) {
        toast.error('Please fill in all fields')
        return;
      }

      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const data = await response.json();
        toast.error(data.error || 'An error occurred');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-32">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <LoadingWrapper loading={loading}>
        <div className="flex justify-center items-center">
          <div className="border border-slate-200 rounded-md p-5">
            <p className="text-2xl font-semibold mb-2">Login</p>
            <p className="text-sm text-slate-600 mb-5">Enter your email and password to login to your account</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center gap-2 text-foreground border-slate-400">
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">Sign In</Button>
              <Suspense>
                <ToastMessage />
              </Suspense>
            </form>

            <div className="flex flex-row gap-2 items-center mt-2">
              <p className="mt-1">Don&apos;t have an account?</p>
              <Link className="text-sm text-blue-600 hover:text-blue-500 mt-1" href="/sign-up">
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
}
