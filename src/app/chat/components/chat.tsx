"use client";

import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, Menu, Sparkles } from "lucide-react";
import NoteSidebar from "./Sidebar";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getAnswer,
} from "@/app/action";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NoteTakingApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    fetchDataAsync().catch(console.error);
  
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const fetchData = async () => {
    const [fetchedNotes,] = await Promise.all([
      getNotes(),
    ]);
    setNotes(fetchedNotes);
  };

  const handleNewNote = async () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setSelectedNote(newNote);
    await addNote(newNote);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(noteId);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        if (selectedNote && selectedNote.id === noteId) {
          setSelectedNote(null);
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleNoteChange = (field: "title" | "content", value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNote.id ? updatedNote : note,
        ),
      );
  
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
  
      updateTimeoutRef.current = setTimeout(() => {
        updateNote(updatedNote).catch(console.error);
      }, 2000);
  
      if (field === "content" && value.endsWith("/")) {
        handleAIAssist(value).catch(console.error);
      }
    }
  };

  const handleAIAssist = async (content: string) => {
    setIsLoading(true);
    const prompt = content.slice(0, -1).trim();
    try {
      const { text } = await getAnswer(prompt);
      if (selectedNote) {
        const updatedNote = {
          ...selectedNote,
          content: selectedNote.content.slice(0, -1) + " " + text,
        };
        setSelectedNote(updatedNote);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNote.id ? updatedNote : note,
          ),
        );
        await updateNote(updatedNote);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearch = (query: string) => {
    const searchResults = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()),
    );
    setNotes(searchResults);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [selectedNote?.content]);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
      <NoteSidebar
        notes={notes}
        onSelectNote={setSelectedNote}
        onSearch={handleSearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onDeleteNote={handleDeleteNote}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-neutral-800 p-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-neutral-400 transition-colors hover:text-white md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">Inscribe</h1>
          </div>
          <button
            onClick={handleNewNote}
            className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-white transition-colors hover:bg-indigo-700"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            New Note
          </button>
        </div>
        <div ref={contentRef} className="flex-1 overflow-auto p-4 md:p-6">
          {selectedNote ? (
            <div className="flex flex-col rounded-lg bg-neutral-900 p-4 shadow-lg">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => handleNoteChange("title", e.target.value)}
                className="mb-4 rounded-md border-2 border-transparent bg-neutral-800 p-2 text-lg font-semibold text-white transition-all duration-300 ease-in-out focus:border-transparent focus:outline-none focus:ring-0 md:p-3 md:text-xl"
                style={{
                  backgroundImage:
                    "linear-gradient(#1f1f1f, #1f1f1f), linear-gradient(to right, #4f46e5, #7c3aed, #a21caf)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
                placeholder="Note title"
              />
              <div className="relative flex-1 overflow-hidden">
                <textarea
                  ref={textareaRef}
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange("content", e.target.value)}
                  className="h-full min-h-[200px] w-full resize-none rounded-md border-2 border-transparent p-2 text-sm text-white transition-all duration-300 ease-in-out focus:border-transparent focus:outline-none focus:ring-0 md:p-3 md:text-base"
                  style={{
                    backgroundImage:
                      "linear-gradient(#1f1f1f, #1f1f1f), linear-gradient(to right, #4f46e5, #7c3aed, #a21caf)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                  placeholder="Start typing your note... (Type '/' to enable AI assist)"
                />
                {isLoading && (
                  <div className="absolute right-2 top-2">
                    <Sparkles className="h-5 w-5 animate-pulse text-indigo-400" />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteNote(selectedNote.id)}
                className="mt-4 self-end rounded-md bg-red-600 px-3 py-2 text-white transition-colors hover:bg-red-700"
              >
                Delete Note
              </button>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-neutral-500">
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
