"use client";
import React, { useState } from 'react';
import NoteSidebar from '../components/Sidebar';
import { PlusCircle, Menu } from 'lucide-react';

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

  const handleNoteChange = (field: 'title' | 'content', value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
    }
  };

  const handleSelectFolder = (id: string) => {
    // Filter notes by folder
    const filteredNotes = notes.filter(note => note.folderId === id);
    // You might want to update the UI to show only these notes
  };

  const handleSelectTag = (id: string) => {
    // Filter notes by tag
    const filteredNotes = notes.filter(note => note.tags.includes(id));
    // You might want to update the UI to show only these notes
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    const searchResults = notes.filter(note => 
      note.title.toLowerCase().includes(query.toLowerCase()) || 
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    // Update UI to show search results
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        <div className="flex justify-between items-center p-4 md:p-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 md:hidden"
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
        <div className="flex-1 p-4 md:p-6">
          {selectedNote ? (
            <div className="flex-1 flex flex-col bg-neutral-900 rounded-lg p-4">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => handleNoteChange('title', e.target.value)}
                className="bg-neutral-800 text-white p-2 md:p-3 rounded-md mb-4 text-lg md:text-xl font-semibold"
                placeholder="Note title"
              />
              <textarea
                value={selectedNote.content}
                onChange={(e) => handleNoteChange('content', e.target.value)}
                className="flex-1 bg-neutral-800 text-white p-2 md:p-3 rounded-md resize-none text-sm md:text-base"
                placeholder="Start typing your note..."
              />
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