"use client";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-[764px] mb-4 overflow-auto max-h-[60vh]">
        <div className="flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div key={index} className="rounded-lg bg-white/10 p-3 text-sm text-white">
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[764px] mb-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full rounded-xl bg-white/10 p-3 text-sm text-white placeholder-gray-300"
          placeholder="Type your message..."
          style={{ width: '764px', height: '128px' }}
        />
      </div>
      <div className="w-[764px]">
        <button
          onClick={handleSubmit}
          className="w-full items-center rounded-md bg-white/10 p-3 text-white hover:bg-indigo-400 hover:text-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
}