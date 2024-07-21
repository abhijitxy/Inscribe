"use client";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { handleInputChange, handleSubmit, messages, input } = useChat();
  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex-grow overflow-auto">
        <div className="flex flex-col gap-2 p-4">
          {messages.map((msg, index) => (
            <div key={index} className="rounded-lg bg-white/10 p-3 text-sm">
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full rounded-xl bg-white/10 p-3 text-sm text-white placeholder-gray-300 mb-2"
          placeholder="Type your message..."
        />
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
