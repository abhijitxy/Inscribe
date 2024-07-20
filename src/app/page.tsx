// "use client";
// import { GridPattern } from "./components/GridPattern";
// import Link from "next/link";
// import { useChat } from "ai/react";

// export default function HomePage() {
//   const { handleInputChange, handleSubmit, messages, input } = useChat();

//   return (
//     <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="absolute top-4 right-4">
//         <Link href="/login">
//           <div className="items-center bg-white/10 p-4 text-white hover:bg-indigo-400 hover:text-black rounded-md py-2 px-8">
//             Login
//           </div>
//         </Link>
//       </div>
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
//         <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//         <div className="w-full max-w-lg flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             {messages.map((msg, index) => (
//               <div key={index} className="p-4 bg-white/10 rounded-lg">
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             className="w-full rounded-xl bg-white/10 p-4 text-white placeholder-gray-300"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSubmit}
//             className="items-center bg-white/10 p-4 text-white hover:bg-indigo-400 hover:text-black rounded-md py-2 px-8"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { GridPattern } from "./components/GridPattern";
import Link from "next/link";
import { useChat } from "ai/react";

export default function HomePage() {
  const { handleInputChange, handleSubmit, messages, input } = useChat();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center text-white overflow-hidden">
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
        className="absolute inset-0 h-full w-full z-[-1] fill-white/[0.02] stroke-white/[0.04] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <div className="absolute top-4 right-4 z-10">
        <Link href="/login">
          <div className="items-center bg-white/10 p-4 text-white hover:bg-indigo-400 hover:text-black rounded-md py-2 px-8">
            Login
          </div>
        </Link>
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 z-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="w-full max-w-lg flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-4 bg-white/10 rounded-lg">
                {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full rounded-xl bg-white/10 p-4 text-white placeholder-gray-300"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSubmit}
            className="items-center bg-white/10 p-4 text-white hover:bg-indigo-400 hover:text-black rounded-md py-2 px-8"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}