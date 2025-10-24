import { useState, useEffect, useCallback } from 'react';
import type { Database } from 'sql.js';
import type { DatabasePreset, QueryResult } from '../../types/database';
import { initializeSqlJs } from '../../lib/database/initSqlJs';
import { useTheme } from '../../contexts/ThemeContext';
import { QueryEditor } from './QueryEditor';
import { ResultsTable } from './ResultsTable';
import { ErrorDisplay } from './ErrorDisplay';
import { SchemaViewer } from './SchemaViewer';

interface SQLPlaygroundProps {
  preset: DatabasePreset;
  defaultQuery?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export function SQLPlayground({
  preset,
  defaultQuery = '',
  readOnly = false,
  minHeight = '120px',
}: SQLPlaygroundProps) {
  const { theme } = useTheme();
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<QueryResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSchema, setShowSchema] = useState(false);

  const initializeDatabase = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const SQL = await initializeSqlJs();
      const newDb = new SQL.Database();
      
      preset.schemas.forEach((schemaFn) => schemaFn(newDb));
      preset.seeds.forEach((seedFn) => seedFn(newDb));
      
      setDb(newDb);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize database');
    } finally {
      setIsLoading(false);
    }
  }, [preset]);

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  useEffect(() => {
    return () => {
      if (db) {
        db.close();
      }
    };
  }, [db]);

  const executeQuery = () => {
    if (!db || !query.trim()) return;
    
    setIsExecuting(true);
    setError(null);
    setResults(null);
    
    try {
      const queryResults = db.exec(query);
      setResults(queryResults.length > 0 ? queryResults : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    if (db) {
      db.close();
    }
    setQuery(defaultQuery);
    setResults(null);
    setError(null);
    initializeDatabase();
  };

  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className={`border rounded-md p-6 my-4 ${
        isDark 
          ? 'border-gray-700 bg-gray-900' 
          : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Initializing database...
          </span>
        </div>
      </div>
    );
  }

  if (!db) {
    return (
      <div className={`border rounded-md p-4 my-4 ${
        isDark 
          ? 'border-red-800 bg-red-950/20' 
          : 'border-red-200 bg-red-50'
      }`}>
        <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          Failed to initialize database
        </p>
      </div>
    );
  }

  return (
    <div className={`border rounded-md overflow-hidden my-4 ${
      isDark 
        ? 'border-gray-700 bg-gray-900' 
        : 'border-gray-300 bg-white'
    }`}>
      {/* Header */}
      <div className={`px-3 py-2 border-b flex items-center justify-between ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {preset.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSchema(!showSchema)}
            className={`px-2 py-1 text-xs font-medium rounded border ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
            }`}
            type="button"
          >
            {showSchema ? 'Hide' : 'Schema'}
          </button>
          <button
            onClick={handleReset}
            className={`px-2 py-1 text-xs font-medium rounded border ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
            }`}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Schema Viewer */}
      {showSchema && db && <SchemaViewer db={db} />}

      {/* Query Editor */}
      <QueryEditor
        value={query}
        onChange={setQuery}
        onExecute={executeQuery}
        readOnly={readOnly}
        minHeight={minHeight}
      />

      {/* Execute Button */}
      <div className={`px-3 py-2 border-t flex items-center justify-between ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <button
          onClick={executeQuery}
          disabled={isExecuting || !query.trim()}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs flex items-center gap-1.5"
          type="button"
        >
          {isExecuting ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Execute</span>
            </>
          )}
        </button>
        
        {results !== null && !error && (
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {results.length === 0 ? 'No results' : `${results.length} result${results.length !== 1 ? 's' : ''}`}
          </span>
        )}
      </div>

      {/* Error Display */}
      {error && <ErrorDisplay error={error} />}

      {/* Results */}
      {results !== null && !error && (
        <ResultsTable results={results} />
      )}
    </div>
  );
}
