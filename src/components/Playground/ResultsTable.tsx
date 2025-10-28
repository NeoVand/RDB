import type { QueryResult } from '../../types/database';
import { useTheme } from '../../hooks/useTheme';

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
      {results.map((result, resultIndex) => {
        const hasMultipleResults = results.length > 1;
        const executionTime = result.executionTimeMs;
        
        // Color code based on execution time (if available)
        let timingColor = '';
        let timingBg = '';
        if (executionTime !== undefined) {
          if (executionTime < 1) {
            timingColor = isDark ? 'text-green-400' : 'text-green-600';
            timingBg = isDark ? 'bg-green-900/30' : 'bg-green-50';
          } else if (executionTime < 10) {
            timingColor = isDark ? 'text-blue-400' : 'text-blue-600';
            timingBg = isDark ? 'bg-blue-900/30' : 'bg-blue-50';
          } else if (executionTime < 100) {
            timingColor = isDark ? 'text-amber-400' : 'text-amber-600';
            timingBg = isDark ? 'bg-amber-900/30' : 'bg-amber-50';
          } else {
            timingColor = isDark ? 'text-red-400' : 'text-red-600';
            timingBg = isDark ? 'bg-red-900/30' : 'bg-red-50';
          }
        }
        
        return (
          <div key={resultIndex} className="overflow-x-auto">
            <div className={`px-3 py-2 border-b ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  {hasMultipleResults && (
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Result {resultIndex + 1}
                    </span>
                  )}
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {result.values.length} row{result.values.length !== 1 ? 's' : ''} ×{' '}
                    {result.columns.length} column{result.columns.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {executionTime !== undefined && (
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${timingBg}`}>
                    <svg className={`w-3.5 h-3.5 ${timingColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`text-xs font-mono font-semibold ${timingColor}`}>
                      {executionTime.toFixed(2)} ms
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={`max-h-80 overflow-y-auto border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
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
                    className={`${
                      rowIndex < result.values.length - 1
                        ? `border-b ${
                            isDark
                              ? 'border-gray-800'
                              : 'border-gray-100'
                          }`
                        : ''
                    } ${
                      isDark
                        ? 'hover:bg-gray-800/50'
                        : 'hover:bg-gray-50'
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
        );
      })}
    </div>
  );
}
