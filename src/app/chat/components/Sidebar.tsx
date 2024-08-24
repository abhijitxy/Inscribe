import React from "react";
import { Folder, Tag, Search, X } from "lucide-react";

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

interface NoteSidebarProps {
  notes: Note[];
  folders: Folder[];
  tags: Tag[];
  onSelectNote: (note: Note) => void;
  onSelectFolder: (id: string) => void;
  onSelectTag: (id: string) => void;
  onSearch: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNote: (noteId: string) => Promise<void>; // Add this line
}

const NoteSidebar: React.FC<NoteSidebarProps> = ({
  notes,
  onSelectNote,
  onSearch,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-neutral-900/50 p-6 text-white backdrop-blur-md transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
    >
      <button onClick={onClose} className="absolute right-4 top-4 md:hidden">
        <X className="h-6 w-6" />
      </button>
      <div className="mb-6">
        <div className="flex items-center rounded-md bg-neutral-800/50 p-2">
          <Search className="mr-2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="flex-1 bg-transparent text-sm outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 flex items-center font-semibold text-neutral-300">
          Notes
        </h2>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            className="mb-1 cursor-pointer rounded-md p-2 text-sm transition-colors hover:bg-neutral-800/50"
          >
            {note.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteSidebar;
