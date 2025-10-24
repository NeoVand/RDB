import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  readOnly?: boolean;
  minHeight?: string;
}

export function QueryEditor({
  value,
  onChange,
  onExecute,
  readOnly = false,
  minHeight = '120px',
}: QueryEditorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Auto-resize to fit content
  useEffect(() => {
    if (textareaRef.current && highlightRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(scrollHeight, parseInt(minHeight));
      textareaRef.current.style.height = `${newHeight}px`;
      highlightRef.current.style.height = `${newHeight}px`;
    }
  }, [value, minHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lines = value.split('\n').length;

  const renderHighlightedCode = () => {
    const sqlKeywords = [
      'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 
      'ALTER', 'TABLE', 'INTO', 'VALUES', 'SET', 'JOIN', 'LEFT', 'RIGHT', 'INNER',
      'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'GROUP', 'ORDER', 'BY',
      'HAVING', 'LIMIT', 'OFFSET', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 
      'MIN', 'MAX', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF', 'EXISTS',
      'BETWEEN', 'IS', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 
      'UNIQUE', 'DEFAULT', 'CHECK', 'CONSTRAINT', 'INDEX', 'BEGIN', 'COMMIT',
      'ROLLBACK', 'TRANSACTION', 'PRAGMA'
    ];

    return value.split('\n').map((line, lineIndex) => {
      if (line.trim().startsWith('--')) {
        return (
          <div key={lineIndex} className="leading-5">
            <span className={isDark ? 'text-green-400' : 'text-green-600'}>
              {line}
            </span>
          </div>
        );
      }

      const words = line.split(/(\s+|[(),;])/);
      
      return (
        <div key={lineIndex} className="leading-5">
          {words.map((word, wordIndex) => {
            const upperWord = word.toUpperCase();
            const isKeyword = sqlKeywords.includes(upperWord);
            
            if (isKeyword) {
              return (
                <span 
                  key={wordIndex} 
                  className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  {word}
                </span>
              );
            }
            
            if (word.startsWith("'") || word.startsWith('"')) {
              return (
                <span 
                  key={wordIndex} 
                  className={isDark ? 'text-amber-400' : 'text-amber-600'}
                >
                  {word}
                </span>
              );
            }
            
            if (/^\d+\.?\d*$/.test(word)) {
              return (
                <span 
                  key={wordIndex} 
                  className={isDark ? 'text-cyan-400' : 'text-cyan-600'}
                >
                  {word}
                </span>
              );
            }
            
            return <span key={wordIndex}>{word}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={`relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex relative overflow-x-auto">
        {/* Line numbers */}
        <div
          className={`py-2 px-2 text-right select-none font-mono text-xs shrink-0 ${
            isDark ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-500'
          }`}
          style={{ minWidth: '2.5rem' }}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div key={i + 1} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Syntax highlighted overlay */}
        <div
          ref={highlightRef}
          className={`absolute left-10 top-0 py-2 px-3 font-mono text-sm pointer-events-none select-none overflow-hidden ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}
          style={{ 
            minHeight,
            width: 'calc(100% - 2.5rem)',
          }}
        >
          {renderHighlightedCode()}
        </div>

        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="flex-1 py-2 px-3 bg-transparent font-mono text-sm resize-none outline-none leading-5 relative z-10"
          style={{ 
            minHeight,
            color: 'transparent',
            caretColor: isDark ? 'rgb(243 244 246)' : 'rgb(17 24 39)',
          }}
          placeholder="Enter your SQL query here..."
          spellCheck={false}
        />
      </div>
      
      {/* Hint */}
      <div className={`absolute bottom-1.5 right-2 text-xs px-2 py-0.5 rounded pointer-events-none ${
        isDark ? 'text-gray-500 bg-gray-800/80' : 'text-gray-500 bg-gray-200/80'
      }`}>
        Ctrl/Cmd + Enter
      </div>
    </div>
  );
}
