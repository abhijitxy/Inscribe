"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, Menu, Sparkles } from 'lucide-react';
import NoteSidebar from './Sidebar';
import { getNotes, addNote, updateNote, deleteNote, getFolders, getTags, getAnswer } from '@/app/action';

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
      getTags()
    ]);
    setNotes(fetchedNotes);
    setFolders(fetchedFolders);
    setTags(fetchedTags);
  };

  const handleNewNote = async () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      tags: [],
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setSelectedNote(newNote);
    await addNote(newNote);
  };

  const handleNoteChange = (field: 'title' | 'content', value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === selectedNote.id ? updatedNote : note)
      );

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(async () => {
        await updateNote(updatedNote);
      }, 2000);

      if (field === 'content' && value.endsWith('/')) {
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
          content: selectedNote.content.slice(0, -1) + " " + text
        };
        setSelectedNote(updatedNote);
        setNotes(prevNotes => 
          prevNotes.map(note => note.id === selectedNote.id ? updatedNote : note)
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
    const filteredNotes = notes.filter(note => note.folderId === id);
    setNotes(filteredNotes);
  };

  const handleSelectTag = (id: string) => {
    const filteredNotes = notes.filter(note => note.tags.includes(id));
    setNotes(filteredNotes);
  };

  const handleSearch = (query: string) => {
    const searchResults = notes.filter(note => 
      note.title.toLowerCase().includes(query.toLowerCase()) || 
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    setNotes(searchResults);
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
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
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
      <div className="flex-1 flex flex-col overflow-hidden">
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
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {selectedNote ? (
            <div className="flex flex-col h-full bg-neutral-900 rounded-lg p-4 shadow-lg">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => handleNoteChange('title', e.target.value)}
                className="bg-neutral-800 text-white p-2 md:p-3 rounded-md mb-4 text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Note title"
              />
              <div className="relative flex-1 overflow-hidden">
                <textarea
                  ref={textareaRef}
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange('content', e.target.value)}
                  className="w-full h-full min-h-[200px] bg-neutral-800 text-white p-2 md:p-3 rounded-md resize-none text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-auto"
                  placeholder="Start typing your note... (Type '/' to enable AI assist)"
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