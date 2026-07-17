import { Link } from 'react-router-dom';
import { FileText, Plus, Edit3, Trash2, Search, Sun, Smartphone, Save } from 'lucide-react';

export default function ModelOverview() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-neon-cyan hover:text-neon-cyan/70 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <h1 className="text-lg font-bold text-gray-800">
              <span className="text-neon-cyan">Light</span>Notes — Model Overview
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero */}
        <section className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 mb-4">
            <FileText className="w-8 h-8 text-neon-cyan" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">LightNotes</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto leading-relaxed">
            A clean, light-themed notes application for capturing and organizing your thoughts.
            Write freely in a minimalist editor, browse your collection, and keep everything safely
            stored on your device.
          </p>
        </section>

        {/* Features */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-neon-cyan rounded-full" />
            Core Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Plus, title: 'Create Notes', desc: 'Write new notes with a title and body in a distraction-free editor. Save with a click or use Ctrl+S.' },
              { icon: Search, title: 'Browse & Search', desc: 'All your notes appear in a card grid. Search by title to find what you need instantly.' },
              { icon: Edit3, title: 'Edit Anytime', desc: 'Click any note to open the full editor. Change the title or body and save your updates.' },
              { icon: Trash2, title: 'Delete with Care', desc: 'Remove notes you no longer need. A confirmation dialog prevents accidental deletions.' },
              { icon: Sun, title: 'Light Theme', desc: 'The entire interface uses a clean light palette — white backgrounds, subtle gray borders, and vibrant accent highlights.' },
              { icon: Save, title: 'Local Storage', desc: 'Notes persist in your browser\'s localStorage. They survive refreshes and restarts without any account needed.' },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <f.icon className="w-5 h-5 text-neon-cyan mb-3" />
                <h4 className="font-semibold text-gray-800 text-sm">{f.title}</h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-neon-violet rounded-full" />
            How to Use
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            {[
              { step: '1', title: 'Create a note', desc: 'Click the "New Note" button to open the editor. Give your note a title and start writing in the body area. Press Save or Ctrl+S when done.' },
              { step: '2', title: 'Browse your notes', desc: 'The home screen shows all your notes as cards. Each card displays the title, a preview snippet, and when it was last updated.' },
              { step: '3', title: 'Edit a note', desc: 'Click any note card to open it in the editor. Make your changes and save — the card updates immediately.' },
              { step: '4', title: 'Delete a note', desc: 'Hover over a card and click the trash icon, or use the Delete button inside the editor. Confirm the deletion to remove it permanently.' },
              { step: '5', title: 'Search your notes', desc: 'Use the search bar at the top of the home screen to filter notes by title in real time.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-violet/10 border border-neon-violet/20 flex items-center justify-center text-sm font-semibold text-neon-violet">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">{s.title}</h4>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-neon-green rounded-full" />
            Device Support
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <Smartphone className="w-6 h-6 text-neon-green flex-shrink-0" />
            <p className="text-sm text-gray-500">
              LightNotes works on desktop and mobile. The card grid adapts from three columns on large screens to a single column on phones. The editor is full-width and comfortable to use with a touch keyboard.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
