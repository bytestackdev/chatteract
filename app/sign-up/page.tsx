'use client'
import Link from "next/link";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import ToastMessage from "@/components/ui/ToastMessage";
import toast from "react-hot-toast";
import LoadingWrapper from "@/components/ui/LoadingWrapper";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const displayName = formData.get("displayName") as string;

    if (!email || !password || !displayName) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const data = await response.json();
        toast.error(data.error || 'An error occurred');
      }
    } catch (err) {
      console.log(err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <p className="text-2xl font-semibold mb-2">Sign Up</p>
              <p className="text-sm text-slate-600 mb-5">Fill out the necessary details to create a new account</p>
              <form className="flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={signUp}>
                <label className="text-md" htmlFor="displayName">
                  Name
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  name="displayName"
                  placeholder="Your Display Name"
                  required
                />
                <label className="text-md" htmlFor="email">
                  Email
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <label className="text-md" htmlFor="password">
                  Password
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <Button type="submit" disabled={loading}>
                  Create New Account
                </Button>
              </form>

              <div className="flex flex-row gap-2 items-center mt-2">
                <p className="mt-1">Already have an account?</p>
                <Link className="text-sm text-blue-600 hover:text-blue-500 mt-1" href="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </LoadingWrapper>
        <Suspense>
          <ToastMessage />
        </Suspense>
      </div>
    </>
  );
}
