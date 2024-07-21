// "use client";

// import { GridPattern } from "./components/GridPattern";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

// export default function HomePage() {
//   const { status } = useSession();

//   return (
//     <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
//       {/* Radial gradient background */}
//       <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

//       {/* Grid pattern */}
//       <GridPattern
//         width={40}
//         height={40}
//         x={-1}
//         y={-1}
//         squares={[
//           [0, 1],
//           [1, 3],
//         ]}
//         className="absolute inset-0 z-[-1] h-full w-full fill-white/[0.02] stroke-white/[0.04] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
//       />

//       <div className="absolute right-4 top-4 z-10 flex space-x-2">
//         {status === "authenticated" ? (
//           <button
//             onClick={() => signOut()}
//             className="items-center rounded-md bg-white/10 p-2 px-4 py-2 text-sm text-white hover:bg-indigo-400 hover:text-black ml-2"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link href="/auth/signin">
//             <button
//               className="items-center rounded-md bg-white/10 p-2 px-4 py-2 text-sm text-white hover:bg-indigo-400 hover:text-black mr-2"
//             >
//               Login
//             </button>
//           </Link>
//         )}
//       </div>

//       <div className="container z-10 flex flex-col items-center justify-center gap-8 px-4 py-8">
//         <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>

//         <div className="grid w-full max-w-md grid-cols-1 gap-4">
//           <Link
//             className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-xl font-bold">First Steps →</h3>
//             <div className="text-sm">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>

//           <Link
//             className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-xl font-bold">Documentation →</h3>
//             <div className="text-sm">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import Image from "next/image";
import { GridPattern } from "./components/GridPattern";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { status } = useSession();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
      {/* Radial gradient background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

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
        className="absolute inset-0 z-[-1] h-full w-full fill-white/[0.02] stroke-white/[0.04] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      {/* Logo in the top left */}
      <div className="absolute left-4 top-4 z-10 flex items-center">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={64} // Adjust the size as needed
          height={64} // Adjust the size as needed
          className="mr-3" // Added margin-right for spacing between logo and text
        />
        <span className="text-2xl font-bold text-white">CodeSage</span>
      </div>

      {/* Auth buttons in the top right */}
      <div className="absolute right-4 top-4 z-10 flex space-x-2">
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="ml-2 items-center rounded-md bg-white/10 p-2 px-4 py-2 text-sm text-white hover:bg-indigo-400 hover:text-black"
          >
            Logout
          </button>
        ) : (
          <Link href="/auth/signin">
            <button className="mr-2 items-center rounded-md bg-white/10 p-2 px-4 py-2 text-sm text-white hover:bg-indigo-400 hover:text-black">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Main content */}
      <div className="container z-10 flex flex-col items-center justify-center gap-8 px-4 py-8">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>

        <div className="grid w-full max-w-md grid-cols-1 gap-4">
          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-xl font-bold">First Steps →</h3>
            <div className="text-sm">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>

          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-xl font-bold">Documentation →</h3>
            <div className="text-sm">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
