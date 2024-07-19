"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await signIn('credentials', { redirect: false, email, password });
  };

  return (
    <main className="flex min-h-screen text-white">
      <div className="flex flex-col justify-center w-full md:w-1/3 px-8 md:px-12 lg:px-16 bg-black">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Get started with your account</h1>
          <p className="text-gray-600 mb-4">
           <Link href="/signup" className="text-purple-500 hover:underline">Already have an account?</Link>
          </p>
          <form className="w-full" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            <div className="mb-3">
              <label className="block text-white text-sm mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-white text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/forgot-password" className="text-purple-500 hover:underline text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="mb-3 flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <label className="block text-gray-700 text-sm" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full bg-white text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="border-t border-gray-300 flex-grow mr-2"></div>
              <span className="text-gray-500">Or continue with</span>
              <div className="border-t border-gray-300 flex-grow ml-2"></div>
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="button"
                className="bg-white text-black border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 flex items-center"
                onClick={() => signIn('google')}
              >
                Sign In with Google
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-2/3 relative">
        <div className="relative w-full h-full">
          <Image
            src="/login.webp"
            alt="Login Image"
            fill
            priority
            sizes='(max-width: 768px) 100vw, 1200px'
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
