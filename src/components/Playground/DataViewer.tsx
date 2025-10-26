import { useState, useMemo } from 'react';
import type { Database } from 'sql.js';
import { useTheme } from '../../hooks/useTheme';

interface DataViewerProps {
  db: Database;
  dataVersion: number;
}

export function DataViewer({ db, dataVersion }: DataViewerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Get list of tables
  const tables = useMemo(() => {
    try {
      const tablesResult = db.exec(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
      `);

      if (!tablesResult.length || !tablesResult[0].values.length) {
        return [];
      }

      return tablesResult[0].values.map(([tableName]) => String(tableName));
    } catch (err) {
      console.error('Error fetching tables:', err);
      return [];
    }
  }, [db, dataVersion]);

  // Get data for selected table
  const tableData = useMemo(() => {
    if (!selectedTable) return null;

    try {
      const result = db.exec(`SELECT * FROM ${selectedTable} LIMIT 1000`);
      
      if (!result.length) {
        return { columns: [], values: [] };
      }

      return {
        columns: result[0].columns,
        values: result[0].values,
      };
    } catch (err) {
      console.error('Error fetching table data:', err);
      return { columns: [], values: [], error: String(err) };
    }
  }, [db, selectedTable, dataVersion]);

  if (tables.length === 0) {
    return (
      <div className={`px-3 py-4 border-b ${
        isDark 
          ? 'bg-gray-900 border-gray-700 text-gray-400' 
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <svg className={`w-10 h-10 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <p className="text-xs font-medium">No tables in database</p>
          <p className="text-xs opacity-75">Execute queries to create tables and insert data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-b ${
      isDark 
        ? 'bg-gray-900/50 border-gray-700' 
        : 'bg-gray-50/50 border-gray-200'
    }`}>
      <div className="flex" style={{ maxHeight: '400px' }}>
        {/* Left sidebar - Table list */}
        <div className={`w-44 border-r overflow-y-auto ${
          isDark 
            ? 'bg-gray-900/30 border-gray-700/50' 
            : 'bg-gray-50/50 border-gray-200'
        }`}>
          <div className={`px-2 py-1 border-b sticky top-0 flex items-center ${
            isDark 
              ? 'bg-gray-900/50 border-gray-700/50' 
              : 'bg-gray-100/50 border-gray-200/50'
          }`}>
            <span className={`text-[10px] font-normal uppercase tracking-wide ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Tables ({tables.length})
            </span>
          </div>
          <div className="p-1.5 space-y-0.5">
            {tables.map((table) => (
              <button
                key={table}
                onClick={() => setSelectedTable(table)}
                className={`w-full text-left px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedTable === table
                    ? isDark
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-blue-50/80 text-blue-700'
                    : isDark
                      ? 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'
                      : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900'
                }`}
                type="button"
              >
                <svg className={`w-3 h-3 flex-shrink-0 ${
                  selectedTable === table
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-gray-600' : 'text-gray-400'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span className="truncate">{table}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel - Table data */}
        <div className="flex-1 overflow-auto">
          {!selectedTable ? (
            <div className={`flex flex-col items-center justify-center h-full px-4 py-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <svg className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <p className="text-xs font-medium">Select a table to view its data</p>
              <p className="text-xs opacity-75 mt-1">Click on a table name from the list</p>
            </div>
          ) : tableData?.error ? (
            <div className={`p-4 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              <p className="text-xs font-semibold mb-1">Error loading table data:</p>
              <p className="text-xs font-mono">{tableData.error}</p>
            </div>
          ) : tableData && tableData.values.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full px-4 py-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <svg className={`w-10 h-10 mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xs font-semibold">{selectedTable}</p>
              <p className="text-xs opacity-75 mt-1">Table is empty (no rows)</p>
            </div>
          ) : tableData ? (
            <div className="px-2 pt-2 pb-2">
              <div className={`flex items-center justify-between ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <h4 className="text-xs font-medium flex items-center gap-1.5">
                  <svg className={`w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  {selectedTable}
                </h4>
                <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                  {tableData.values.length} row{tableData.values.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="overflow-hidden mt-1">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className={
                      isDark 
                        ? 'bg-gray-800/40 border-b border-gray-700/50' 
                        : 'bg-gray-50/60 border-b border-gray-200/80'
                    }>
                      <tr>
                        {tableData.columns.map((column, idx) => (
                          <th
                            key={idx}
                            className={`px-3 py-0.5 text-left font-medium ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'bg-gray-900/30' : 'bg-white/50'}>
                      {tableData.values.map((row, rowIdx) => (
                        <tr
                          key={rowIdx}
                          className={`${
                            rowIdx < tableData.values.length - 1 
                              ? `border-b ${
                                  isDark 
                                    ? 'border-gray-800/50' 
                                    : 'border-gray-100/60'
                                }` 
                              : ''
                          } ${
                            isDark 
                              ? 'hover:bg-gray-800/30' 
                              : 'hover:bg-gray-50/40'
                          }`}
                        >
                          {row.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className={`px-3 py-1.5 font-mono ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {cell === null ? (
                                <span className={`italic ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                  NULL
                                </span>
                              ) : (
                                String(cell)
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {tableData.values.length >= 1000 && (
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                    Showing first 1000 rows
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

