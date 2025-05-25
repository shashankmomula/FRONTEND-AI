import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import CodeEditor from './components/CodeEditor';
import ExplanationPanel from './components/ExplanationPanel';
import VisualizationPanel from './components/VisualizationPanel';
import { API_CONFIG, ERROR_MESSAGES } from './utils/config';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [visualization, setVisualization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleExplainAndVisualize = async (code, language) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPLAIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExplanation(data.explanation);
      setVisualization(data.visualization);
    } catch (error) {
      console.error('Error:', error);
      setError(ERROR_MESSAGES.API_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className="min-h-screen flex flex-col justify-center items-center px-2 py-8">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
            Code Explainer <span className="font-black">+</span> Visualizer
          </h1>
          <button
            onClick={toggleDarkMode}
            className="w-12 h-12 flex items-center justify-center rounded-full glass shadow-lg border-2 border-primary-200 dark:border-primary-600 transition-all duration-300 hover:scale-110"
            aria-label="Toggle dark mode"
          >
            <span className="sr-only">Toggle dark mode</span>
            {darkMode ? <FiSun className="text-yellow-400 text-2xl" /> : <FiMoon className="text-primary-600 text-2xl" />}
          </button>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="card">
              <CodeEditor onExplain={handleExplainAndVisualize} loading={loading} />
            </div>
            <div className="card">
              <ExplanationPanel explanation={explanation} loading={loading} />
            </div>
          </div>
          <div className="card lg:col-span-1">
            <VisualizationPanel visualization={visualization} loading={loading} />
          </div>
        </main>
        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 