import type { QueryResult } from '../../types/database';
import { useTheme } from '../../contexts/ThemeContext';

interface ResultsTableProps {
  results: QueryResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (results.length === 0) {
    return (
      <div className={`px-3 py-4 border-t ${
        isDark 
          ? 'bg-gray-900 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-600'
      }`}>
        <p className="text-center text-xs">
          Query executed successfully. No results to display.
        </p>
      </div>
    );
  }

  const formatValue = (value: string | number | null | Uint8Array): string => {
    if (value === null) {
      return 'NULL';
    }
    if (value instanceof Uint8Array) {
      return `<BLOB ${value.length} bytes>`;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {results.map((result, resultIndex) => (
        <div key={resultIndex} className="overflow-x-auto">
          <div className={`px-3 py-1.5 border-b ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-400' 
              : 'bg-gray-50 border-gray-200 text-gray-600'
          }`}>
            <p className="text-xs">
              {result.values.length} row{result.values.length !== 1 ? 's' : ''} ×{' '}
              {result.columns.length} column{result.columns.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className={`sticky top-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <tr>
                  {result.columns.map((column, colIndex) => (
                    <th
                      key={colIndex}
                      className={`px-3 py-1.5 text-left font-semibold border-b ${
                        isDark
                          ? 'text-gray-300 border-gray-700'
                          : 'text-gray-700 border-gray-200'
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={isDark ? 'bg-gray-900' : 'bg-white'}>
                {result.values.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b ${
                      isDark
                        ? 'border-gray-800 hover:bg-gray-800/50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-3 py-1.5 font-mono ${
                          cell === null
                            ? isDark ? 'text-gray-500 italic' : 'text-gray-400 italic'
                            : isDark ? 'text-gray-200' : 'text-gray-800'
                        }`}
                      >
                        {formatValue(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
