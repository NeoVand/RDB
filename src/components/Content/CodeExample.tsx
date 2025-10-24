import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeExample({ code, title }: CodeExampleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6">
      {title && (
        <div className={`text-sm font-semibold mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {title}
        </div>
      )}
      <div className="relative group">
        <pre className={`p-4 rounded-md overflow-x-auto border font-mono text-sm ${
          isDark 
            ? 'bg-gray-900 text-gray-100 border-gray-700' 
            : 'bg-gray-50 text-gray-900 border-gray-300'
        }`}>
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 px-3 py-1 text-xs rounded transition-opacity opacity-0 group-hover:opacity-100 ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
          type="button"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
