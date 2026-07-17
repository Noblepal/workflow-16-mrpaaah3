import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import type { Note } from '../types';
import ConfirmDialog from '../components/ConfirmDialog';

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

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(false);
  const [saved, setSaved] = useState(false);

  const existingNote = !isNew ? notes.find(n => n.id === id) : null;

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setBody(existingNote.body);
    }
  }, [existingNote]);

  const handleSave = () => {
    const now = new Date().toISOString();
    let updated: Note[];

    if (isNew) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: title.trim() || 'Untitled',
        body,
        createdAt: now,
        updatedAt: now,
      };
      updated = [...notes, newNote];
      setNotes(updated);
      saveNotes(updated);
      setSaved(true);
      setTimeout(() => navigate(`/notes/${newNote.id}`, { replace: true }), 600);
    } else if (existingNote) {
      updated = notes.map(n =>
        n.id === existingNote.id
          ? { ...n, title: title.trim() || 'Untitled', body, updatedAt: now }
          : n
      );
      setNotes(updated);
      saveNotes(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  };

  const handleDelete = () => {
    if (!existingNote) return;
    const updated = notes.filter(n => n.id !== existingNote.id);
    setNotes(updated);
    saveNotes(updated);
    navigate('/', { replace: true });
  };

  // Keyboard shortcut: Cmd/Ctrl+S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [title, body, notes]);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const charCount = body.length;

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0f0f1a]/95 backdrop-blur border-b border-[#1e1e2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="text-sm text-gray-500">
                {isNew ? 'New Note' : 'Edit Note'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isNew && (
                <button
                  onClick={() => setDeleteTarget(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              )}
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-neon-cyan text-[#0f0f1a] font-semibold rounded-lg hover:bg-neon-cyan/90 transition-all text-sm"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-in">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-2xl sm:text-3xl font-bold text-white bg-transparent border-none outline-none placeholder-gray-600 mb-4"
            autoFocus
          />
          <textarea
            placeholder="Start writing..."
            value={body}
            onChange={e => setBody(e.target.value)}
            className="w-full min-h-[50vh] text-base text-gray-300 bg-transparent border-none outline-none placeholder-gray-600 leading-relaxed resize-none"
          />
        </div>

        {/* Status bar */}
        <div className="mt-6 pt-4 border-t border-[#1e1e2e] flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          {saved && (
            <span className="text-neon-cyan animate-fade-in">Saved</span>
          )}
        </div>
      </main>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={deleteTarget}
        onClose={() => setDeleteTarget(false)}
        onConfirm={handleDelete}
        title="Delete Note"
        message={`Are you sure you want to delete "${title || 'Untitled'}"? This action cannot be undone.`}
      />
    </div>
  );
}
