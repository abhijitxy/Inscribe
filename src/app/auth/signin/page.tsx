"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.ok) {
        window.location.href = "/chat";
      } else {
        console.error(result?.error);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
      {/* Radial gradient background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-md px-4 py-8">
        <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Get started with your account
          </h1>
          <p className="mb-4 text-center text-gray-300">
            <Link
              href="/signup"
              className="text-[hsl(280,100%,70%)] hover:underline"
            >
              Already have an account?
            </Link>
          </p>
          <form className="w-full" onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="mb-1 block text-sm text-white" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl bg-white/10 p-3 text-sm text-white placeholder-gray-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mb-2 w-full rounded-xl bg-white/10 p-3 text-sm text-white placeholder-gray-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                href="/forgot-password"
                className="text-sm text-[hsl(280,100%,70%)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mb-4 flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <label
                className="block text-sm text-gray-300"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full rounded-md bg-white/10 p-3 text-white hover:bg-indigo-400 hover:text-black"
              >
                Sign in
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <div className="mr-2 flex-grow border-t border-gray-600"></div>
              <span className="text-gray-400">Or continue with</span>
              <div className="ml-2 flex-grow border-t border-gray-600"></div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center rounded-md border border-gray-600 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                onClick={() => signIn("google")}
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
