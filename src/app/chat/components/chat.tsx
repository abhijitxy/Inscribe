"use client";
import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, Menu, Sparkles } from 'lucide-react';
import NoteSidebar from './Sidebar';
import { getAnswer } from '@/app/action';

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
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Personal' },
    { id: '2', name: 'Work' },
  ]);
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Important' },
    { id: '2', name: 'Todo' },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      tags: [],
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleNoteChange = async (field: 'title' | 'content', value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));

      if (field === 'content') {
        await handleAIAssist(value);
      }
    }
  };

  const handleAIAssist = async (content: string) => {
    if (content.endsWith('/')) {
      setIsAIEnabled(true);
      setIsLoading(true);
      const prompt = content.slice(0, -1).trim(); // Remove the '/' from the input
      try {
        const { text } = await getAnswer(prompt);
        setSelectedNote(prev => {
          if (prev) {
            const updatedContent = prev.content.slice(0, -1) + " " + text;
            return { ...prev, content: updatedContent };
          }
          return prev;
        });
      } catch (error) {
        console.error("Error getting AI response:", error);
      } finally {
        setIsLoading(false);
        setIsAIEnabled(false);
      }
    }
  };

  const handleSelectFolder = (id: string) => {
    // Filter notes by folder
    const filteredNotes = notes.filter(note => note.folderId === id);
    // TODO: Update UI to show only these notes
    console.log("Selected folder:", id);
  };

  const handleSelectTag = (id: string) => {
    // Filter notes by tag
    const filteredNotes = notes.filter(note => note.tags.includes(id));
    // TODO: Update UI to show only these notes
    console.log("Selected tag:", id);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    const searchResults = notes.filter(note => 
      note.title.toLowerCase().includes(query.toLowerCase()) || 
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    // TODO: Update UI to show search results
    console.log("Search query:", query);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [selectedNote?.content]);

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <NoteSidebar 
        folders={folders}
        tags={tags}
        onSelectFolder={handleSelectFolder}
        onSelectTag={handleSelectTag}
        onSearch={handleSearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-neutral-800">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 md:hidden text-neutral-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Notes</h1>
          </div>
          <button
            onClick={handleNewNote}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 md:px-4 md:py-2 transition-colors text-sm md:text-base"
          >
            <PlusCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            New Note
          </button>
        </div>
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {selectedNote ? (
            <div className="flex-1 flex flex-col bg-neutral-900 rounded-lg p-4 shadow-lg">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => handleNoteChange('title', e.target.value)}
                className="bg-neutral-800 text-white p-2 md:p-3 rounded-md mb-4 text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Note title"
              />
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange('content', e.target.value)}
                  className="w-full min-h-[200px] bg-neutral-800 text-white p-2 md:p-3 rounded-md resize-none text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start typing your note... (Type '/' to enable AI assist)"
                  style={{ overflow: 'hidden' }}
                />
                {isLoading && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}