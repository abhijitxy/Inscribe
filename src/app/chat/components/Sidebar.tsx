import React from 'react';
import { Folder, Tag, Search, X } from 'lucide-react';

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
}

const NoteSidebar: React.FC<NoteSidebarProps> = ({
  notes,
  folders,
  tags,
  onSelectNote,
  onSelectFolder,
  onSelectTag,
  onSearch,
  isOpen,
  onClose
}) => {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-neutral-900/50 backdrop-blur-md text-white p-6 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0
    `}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="mb-6">
        <div className="flex items-center bg-neutral-800/50 rounded-md p-2">
          <Search className="w-5 h-5 mr-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none flex-1 text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-3 flex items-center text-neutral-300">
          <Folder className="w-4 h-4 mr-2" /> Folders
        </h2>
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => onSelectFolder(folder.id)}
            className="cursor-pointer p-2 rounded-md hover:bg-neutral-800/50 mb-1 text-sm transition-colors"
          >
            {folder.name}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-3 flex items-center text-neutral-300">
          <Tag className="w-4 h-4 mr-2" /> Tags
        </h2>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag.id}
              onClick={() => onSelectTag(tag.id)}
              className="cursor-pointer bg-neutral-800/50 text-xs rounded-full px-3 py-1 m-1 hover:bg-indigo-600 transition-colors"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3 flex items-center text-neutral-300">
          Notes
        </h2>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            className="cursor-pointer p-2 rounded-md hover:bg-neutral-800/50 mb-1 text-sm transition-colors"
          >
            {note.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteSidebar;