'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen text-white">
      <div className="flex flex-col justify-center w-full md:w-1/3 px-8 md:px-12 lg:px-16 bg-black">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Get started with your account</h1>
          <p className="text-gray-600 mb-4">
           <Link href="/signup" className="text-purple-500 hover:underline">Already have an account?</Link>
          </p>
          <form className="w-full">
            <div className="mb-3">
              <label className="block text-white text-sm mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
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
                type="button"
                className="w-full bg-white text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => signIn('credentials')}
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
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 9.5c3.2 0 5.8 1.1 7.8 2.9l5.8-5.8C33.9 3.5 29.2 1 24 1 14.6 1 7 8.6 7 18s7.6 17 17 17c9.5 0 17.5-7.5 17.5-17H24v-8.5h17v8.5C41 33.2 33.3 41 24 41 14.3 41 6 32.8 6 23S14.3 6 24 6z" fill="#4285f4"/><path d="M5.7 24.8c-0.1-0.9-0.2-1.9-0.2-2.8s0.1-1.9 0.2-2.8h-0.1C2.6 24 1 28.5 1 33.5 1 41.1 6.9 47 14.5 47c5.2 0 9.5-2.2 12.6-5.8l-6.1-5c-1.3 0.9-2.9 1.5-4.8 1.5-3.7 0-6.8-2.5-7.8-5.8h-0.1z" fill="#34a853"/><path d="M44 20h-5.3V15H24v8.5h10.6c-0.8 4.2-4 7.3-8.3 7.3-3.7 0-6.8-2.5-7.8-5.8H7.7v-0.2C10.3 27 16.2 30 24 30c6.7 0 12-4.5 13.6-10.5H44z" fill="#fbbc05"/><path d="M8 15.8h6.4v8.5H8z" fill="#ea4335"/></svg>
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
