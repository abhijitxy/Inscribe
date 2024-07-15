'use client'
import { signIn } from "next-auth/react";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Login with Discord
        </h1>
        <button
          onClick={() => signIn('discord')}
          className="items-center bg-white/10 p-4 text-white hover:bg-indigo-400 hover:text-black rounded-md py-2 px-8 cursor-pointer"
        >
          Login with Discord
        </button>
        <Link href="/">
          <div className="text-lg text-white hover:underline">Go back to Home</div>
        </Link>
      </div>
    </main>
  );
}