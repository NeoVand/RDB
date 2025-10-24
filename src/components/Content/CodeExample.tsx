import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

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

  // SQL syntax highlighting
  const highlightSQL = (text: string) => {
    return text.split('\n').map((line, lineIndex) => {
      // Comments
      if (line.trim().startsWith('--')) {
        return (
          <div key={lineIndex}>
            <span className={isDark ? 'text-green-400' : 'text-green-600'}>{line}</span>
          </div>
        );
      }

      // Highlight keywords
      const parts = line.split(/(\b(?:SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INTO|VALUES|SET|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IN|LIKE|GROUP|ORDER|BY|HAVING|LIMIT|OFFSET|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|IF|EXISTS|BETWEEN|IS|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|DEFAULT|CHECK|CONSTRAINT|INDEX|BEGIN|COMMIT|ROLLBACK|TRANSACTION|PRAGMA|INTEGER|TEXT|REAL|BLOB|NUMERIC|VARCHAR|CHAR|DATE|TIMESTAMP|BOOLEAN|SERIAL|AUTO_INCREMENT|DECIMAL)\b|'[^']*'|"[^"]*"|\d+)/gi);

      return (
        <div key={lineIndex}>
          {parts.map((part, partIndex) => {
            if (!part) return null;
            
            // Keywords
            const upperPart = part.toUpperCase();
            const isKeyword = /^(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INTO|VALUES|SET|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IN|LIKE|GROUP|ORDER|BY|HAVING|LIMIT|OFFSET|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|IF|EXISTS|BETWEEN|IS|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|DEFAULT|CHECK|CONSTRAINT|INDEX|BEGIN|COMMIT|ROLLBACK|TRANSACTION|PRAGMA|INTEGER|TEXT|REAL|BLOB|NUMERIC|VARCHAR|CHAR|DATE|TIMESTAMP|BOOLEAN|SERIAL|AUTO_INCREMENT|DECIMAL)$/.test(upperPart);
            
            if (isKeyword) {
              return (
                <span key={partIndex} className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  {part}
                </span>
              );
            }
            
            // Strings
            if ((part.startsWith("'") && part.endsWith("'")) || (part.startsWith('"') && part.endsWith('"'))) {
              return (
                <span key={partIndex} className={isDark ? 'text-amber-400' : 'text-amber-600'}>
                  {part}
                </span>
              );
            }
            
            // Numbers
            if (/^\d+\.?\d*$/.test(part)) {
              return (
                <span key={partIndex} className={isDark ? 'text-purple-400' : 'text-purple-600'}>
                  {part}
                </span>
              );
            }
            
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    });
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
          <code>{highlightSQL(code)}</code>
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
