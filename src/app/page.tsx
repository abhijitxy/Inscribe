
"use client";

import Image from "next/image";
import { GridPattern } from "./components/GridPattern";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { status } = useSession();

  return (
    <main className="relative flex flex-col items-center min-h-screen overflow-y-auto text-white">
      {/* Radial gradient background */}
      <div className="fixed top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Grid pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        squares={[
          [0, 1],
          [1, 3],
        ]}
        className="fixed inset-0 z-[-1] h-full w-full fill-white/[0.02] stroke-white/[0.04] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      {/* Content wrapper */}
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="w-full mb-8">
          <div className="flex items-center justify-between">
            {/* Logo and site name */}
            <div className="flex items-center">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={64}
                height={64}
                className="mr-3"
              />
              <span className="text-2xl font-bold text-white">CodeSage</span>
            </div>

            {/* Auth buttons */}
            <div className="flex space-x-2">
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut()}
                  className="items-center rounded-md bg-white px-4 py-2 text-sm text-black hover:bg-indigo-300 hover:text-black"
                >
                  Logout
                </button>
              ) : (
                <Link href="/auth/signin">
                  <button className="items-center rounded-md bg-white px-4 py-2 text-sm text-black hover:bg-indigo-300 hover:text-black">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* New snippets button */}
        <div className="w-full flex justify-center mb-8">
          <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
              Get started ⚡️
              <span className="inline-flex items-center pl-2 text-black dark:text-white">
                Read more{" "}
              </span>
            </div>
          </span>
        </div>

        {/* Main content area */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-6xl font-medium text-gray-50 mb-4">
            Transform your GitHub repos into an <br />
            <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              AI-powered knowledge base
            </span>
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Extract code, store it smartly, and get instant project insights with ChatGPT.
          </p>
        </div>

        {/* Dashboard image */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-lg border-[10px] border-neutral-950">
            <Image
              src="/dashboard.webp"
              alt="Dashboard"
              width={1200}
              height={800}
              layout="responsive"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}


