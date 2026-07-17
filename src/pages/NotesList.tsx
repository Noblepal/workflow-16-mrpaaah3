import { Plus, Search, Trash2, Edit3, ArrowLeft, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Note } from '../types';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';

const STORAGE_KEY = 'darknotes_notes';

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const filtered = notes
    .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleDelete = (note: Note) => {
    setNotes(prev => prev.filter(n => n.id !== note.id));
    setDeleteTarget(null);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSnippet = (body: string, maxLen = 100) => {
    const cleaned = body.replace(/\s+/g, ' ').trim();
    return cleaned.length > maxLen ? cleaned.slice(0, maxLen) + '...' : cleaned;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-neon-cyan hover:text-neon-cyan/70 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">
                <span className="text-neon-cyan">Light</span>Notes
              </h1>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {notes.length}
              </span>
            </div>
            <Link
              to="/notes/new"
              className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-white font-semibold rounded-lg hover:bg-neon-cyan/90 transition-all text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Search */}
        {notes.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all text-sm shadow-sm"
            />
          </div>
        )}

        {/* Notes Grid */}
        {filtered.length === 0 ? (
          notes.length === 0 ? (
            <EmptyState
              title="No notes yet"
              description="Create your first note to start capturing ideas."
              action={
                <Link
                  to="/notes/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neon-cyan text-white font-semibold rounded-lg hover:bg-neon-cyan/90 transition-all text-sm shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create Note
                </Link>
              }
            />
          ) : (
            <EmptyState
              title="No matches"
              description="Try a different search term."
            />
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((note) => (
              <div
                key={note.id}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/5 transition-all cursor-pointer animate-fade-in"
                onClick={() => navigate(`/notes/${note.id}`)}
              >
                <h3 className="text-base font-semibold text-gray-800 truncate pr-16">
                  {note.title || 'Untitled'}
                </h3>
                {note.body && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {getSnippet(note.body)}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(note.updatedAt)}</span>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/notes/${note.id}`); }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(note); }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Delete Note"
        message={`Are you sure you want to delete "${deleteTarget?.title || 'Untitled'}"? This action cannot be undone.`}
      />
    </div>
  );
}
