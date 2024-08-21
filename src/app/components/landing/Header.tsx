"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { status } = useSession();

  return (
    <header className="mb-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={64}
            height={64}
            className="mr-3"
          />
          <span className="text-2xl font-bold text-white">Inscribe</span>
        </div>

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
  );
}
