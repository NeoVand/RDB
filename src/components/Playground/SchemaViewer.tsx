import { useMemo } from 'react';
import type { Database } from 'sql.js';
import type { TableSchema } from '../../types/database';
import { useTheme } from '../../contexts/ThemeContext';

interface SchemaViewerProps {
  db: Database;
}

export function SchemaViewer({ db }: SchemaViewerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const schema = useMemo(() => {
    try {
      const tables = db.exec(`
        SELECT name, sql 
        FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
      `);

      if (!tables.length || !tables[0].values.length) {
        return [];
      }

      return tables[0].values.map(([tableName]) => {
        const columnInfo = db.exec(`PRAGMA table_info(${tableName})`);
        
        const columns = columnInfo.length
          ? columnInfo[0].values.map((col) => ({
              name: String(col[1]),
              type: String(col[2]),
            }))
          : [];

        return {
          name: String(tableName),
          columns,
        } as TableSchema;
      });
    } catch (err) {
      console.error('Error fetching schema:', err);
      return [];
    }
  }, [db]);

  if (schema.length === 0) {
    return (
      <div className={`px-3 py-2 border-b ${
        isDark 
          ? 'bg-gray-900 border-gray-700 text-gray-400' 
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <p className="text-xs">No tables in database</p>
      </div>
    );
  }

  return (
    <div className={`px-3 py-2 border-b ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Database Schema
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {schema.map((table) => (
          <div
            key={table.name}
            className={`border rounded p-2 ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <h4 className={`font-semibold text-xs mb-1.5 flex items-center gap-1.5 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              <svg className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              {table.name}
            </h4>
            <ul className="space-y-0.5">
              {table.columns.map((column, idx) => (
                <li
                  key={idx}
                  className={`text-xs font-mono flex justify-between gap-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <span className="truncate">{column.name}</span>
                  <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                    {column.type || 'ANY'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
