"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const result = await signIn('credentials', { redirect: false, email, password });
    if (result?.ok) {
      window.location.href = '/draw';
    } else {
      console.log(result);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center text-white overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="w-full max-w-md px-4 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Get started with your account</h1>
          <p className="text-gray-300 mb-4 text-center">
            <Link href="/signup" className="text-[hsl(280,100%,70%)] hover:underline">Already have an account?</Link>
          </p>
          <form className="w-full" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            <div className="mb-4">
              <label className="block text-white text-sm mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl bg-white/10 p-3 text-white placeholder-gray-300 text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-xl bg-white/10 p-3 text-white placeholder-gray-300 text-sm mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/forgot-password" className="text-[hsl(280,100%,70%)] hover:underline text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="mb-4 flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <label className="block text-gray-300 text-sm" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-white/10 p-3 text-white hover:bg-indigo-400 hover:text-black rounded-md"
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="border-t border-gray-600 flex-grow mr-2"></div>
              <span className="text-gray-400">Or continue with</span>
              <div className="border-t border-gray-600 flex-grow ml-2"></div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-white/10 text-white border border-gray-600 rounded-md px-4 py-2 hover:bg-white/20 flex items-center"
                onClick={() => signIn('google')}
              >
                Sign In with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
