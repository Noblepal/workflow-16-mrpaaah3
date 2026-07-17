import { useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { FeedbackProvider } from '@aime-platform/aime-feedback-module';
import NotesList from './pages/NotesList';
import NoteEditor from './pages/NoteEditor';
import ModelOverview from './pages/ModelOverview';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-gray-400 mb-4">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-neon-cyan hover:underline">Go back home</Link>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    (window as any).__APP_ROUTES__ = ['/', '/notes/new', '/notes/sample-note-id', '/model-overview'];
  }, []);

  return (
    <FeedbackProvider
      projectId="6a5a772eb0bf2cb96a557bec"
      projectsMsBaseUrl={import.meta.env.VITE_FEEDBACK_PROJECTS_MS_URL}
      projectsMsToken={import.meta.env.VITE_FEEDBACK_PROJECTS_MS_TOKEN}
      filesMsApiBaseUrl={import.meta.env.VITE_FEEDBACK_FILES_MS_URL}
      filesMsToken={import.meta.env.VITE_FEEDBACK_FILES_MS_TOKEN}
      teamsUrl={import.meta.env.VITE_PROJECT_TOOLS_URL}
      notifyUsers={import.meta.env.VITE_FEEDBACK_NOTIFY_USERS}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/notes/new" element={<NoteEditor />} />
          <Route path="/notes/:id" element={<NoteEditor />} />
          <Route path="/model-overview" element={<ModelOverview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </FeedbackProvider>
  );
}
