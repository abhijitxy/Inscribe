"use client";

import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, Menu, Sparkles } from "lucide-react";
import NoteSidebar from "./Sidebar";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getFolders,
  getTags,
  getAnswer,
} from "@/app/action";

interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
}

interface Folder {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function NoteTakingApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const fetchData = async () => {
    const [fetchedNotes, fetchedFolders, fetchedTags] = await Promise.all([
      getNotes(),
      getFolders(),
      getTags(),
    ]);
    setNotes(fetchedNotes);
    setFolders(fetchedFolders);
    setTags(fetchedTags);
  };

  const handleNewNote = async () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      tags: [],
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setSelectedNote(newNote);
    await addNote(newNote);
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

      updateTimeoutRef.current = setTimeout(async () => {
        await updateNote(updatedNote);
      }, 2000);

      if (field === "content" && value.endsWith("/")) {
        handleAIAssist(value);
      }
    }
  };

  const handleAIAssist = async (content: string) => {
    setIsAIEnabled(true);
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
      setIsAIEnabled(false);
    }
  };

  const handleSelectFolder = (id: string) => {
    const filteredNotes = notes.filter((note) => note.folderId === id);
    setNotes(filteredNotes);
  };

  const handleSelectTag = (id: string) => {
    const filteredNotes = notes.filter((note) => note.tags.includes(id));
    setNotes(filteredNotes);
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
  }, [selectedNote?.content]);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
      <NoteSidebar
        notes={notes}
        folders={folders}
        tags={tags}
        onSelectNote={setSelectedNote}
        onSelectFolder={handleSelectFolder}
        onSelectTag={handleSelectTag}
        onSearch={handleSearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-neutral-800 p-4 md:p-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-neutral-400 transition-colors hover:text-white md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold md:text-3xl">Notes</h1>
          </div>
          <button
            onClick={handleNewNote}
            className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm text-white transition-colors hover:bg-indigo-700 md:px-4 md:py-2 md:text-base"
          >
            <PlusCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            New Note
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {selectedNote ? (
            <div className="flex h-full flex-col rounded-lg bg-neutral-900 p-4 shadow-lg">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => handleNoteChange("title", e.target.value)}
                className="mb-4 rounded-md bg-neutral-800 p-2 text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:p-3 md:text-xl"
                placeholder="Note title"
              />
              <div className="relative flex-1 overflow-hidden">
                <textarea
                  ref={textareaRef}
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange("content", e.target.value)}
                  className="h-full min-h-[200px] w-full resize-none overflow-auto rounded-md bg-neutral-800 p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:p-3 md:text-base"
                  placeholder="Start typing your note... (Type '/' to enable AI assist)"
                />
                {isLoading && (
                  <div className="absolute right-2 top-2">
                    <Sparkles className="h-5 w-5 animate-pulse text-indigo-400" />
                  </div>
                )}
              </div>
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
