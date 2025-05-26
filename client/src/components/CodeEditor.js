import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { FiPlay, FiCode, FiPackage } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES, DEFAULT_CODE, COMMON_IMPORTS, EDITOR_OPTIONS } from '../utils/constants';

const CodeEditor = ({ onExplain, loading }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE.javascript);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage]);
  };

  const handleInsertImports = () => {
    setCode(COMMON_IMPORTS[selectedLanguage]);
  };

  const handleExplain = () => {
    onExplain(code, selectedLanguage);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-primary-600 dark:text-primary-300 tracking-tight">
            Code Editor
          </h2>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="appearance-none bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-600 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            {/* <FiCode className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 pointer-events-none" /> */}
          </div>
          <button
            onClick={handleInsertImports}
            className="btn-accent flex items-center gap-2 mr-3"
            title="Insert common imports"
          >
            <FiPackage className="text-3xl" />
            Insert Imports
          </button>
        </div>
        <button
          onClick={handleExplain}
          disabled={loading}
          className={`btn-primary flex items-center gap-2 mr-3 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <FiPlay className="text-3xl" />
          {loading ? 'Processing..' : 'Explain & Visualize'}
        </button>
      </div>
      <div className="rounded-xl overflow-hidden border border-primary-100 dark:border-primary-600 shadow glass">
        <Editor
          height="300px"
          language={selectedLanguage}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={EDITOR_OPTIONS}
        />
      </div>
      {loading && <div className="mt-4 spinner" />}
    </div>
  );
};

export default CodeEditor; 