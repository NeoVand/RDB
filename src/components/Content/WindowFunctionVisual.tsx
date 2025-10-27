interface WindowFunctionVisualProps {
  type: 'rank' | 'partition' | 'running' | 'lag';
}

type ColorType = 'blue' | 'green' | 'purple' | 'pink';
type HighlightType = 'green' | 'orange';

interface RowData {
  name: string;
  dept: string;
  salary: string;
  highlight?: HighlightType;
}

interface ResultRowData extends RowData {
  value: string;
}

export function WindowFunctionVisual({ type }: WindowFunctionVisualProps) {
  const configs: Record<WindowFunctionVisualProps['type'], {
    title: string;
    emoji: string;
    color: ColorType;
    sourceRows: RowData[];
    resultRows: ResultRowData[];
    newCol: string;
    sql: string;
    columnHeaders: string;
    rowCountLabel: string;
  }> = {
    rank: {
      title: 'Global Ranking',
      emoji: '🏆',
      color: 'blue',
      columnHeaders: 'name | dept | salary',
      rowCountLabel: '3 rows',
      sourceRows: [
        { name: 'Alice', dept: 'Eng', salary: '90k' },
        { name: 'Bob', dept: 'Eng', salary: '85k' },
        { name: 'Carol', dept: 'Sales', salary: '75k' },
      ],
      resultRows: [
        { name: 'Alice', dept: 'Eng', salary: '90k', value: '1' },
        { name: 'Bob', dept: 'Eng', salary: '85k', value: '2' },
        { name: 'Carol', dept: 'Sales', salary: '75k', value: '3' },
      ],
      newCol: 'rank',
      sql: 'ROW_NUMBER() OVER (ORDER BY salary DESC)'
    },
    partition: {
      title: 'PARTITION BY dept',
      emoji: '📂',
      color: 'purple',
      columnHeaders: 'name | dept | salary',
      rowCountLabel: '3 rows',
      sourceRows: [
        { name: 'Alice', dept: 'Eng', salary: '90k', highlight: 'green' },
        { name: 'Bob', dept: 'Eng', salary: '85k', highlight: 'green' },
        { name: 'Carol', dept: 'Sales', salary: '75k', highlight: 'orange' },
      ],
      resultRows: [
        { name: 'Alice', dept: 'Eng', salary: '90k', value: '1', highlight: 'green' },
        { name: 'Bob', dept: 'Eng', salary: '85k', value: '2', highlight: 'green' },
        { name: 'Carol', dept: 'Sales', salary: '75k', value: '1', highlight: 'orange' },
      ],
      newCol: 'dept_rank',
      sql: 'ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)'
    },
    running: {
      title: 'Running Total',
      emoji: '📈',
      color: 'green',
      columnHeaders: 'order_id | date | amount',
      rowCountLabel: '3 rows',
      sourceRows: [
        { name: 'Order 1', dept: 'Jan 1', salary: '100' },
        { name: 'Order 2', dept: 'Jan 2', salary: '150' },
        { name: 'Order 3', dept: 'Jan 3', salary: '200' },
      ],
      resultRows: [
        { name: 'Order 1', dept: 'Jan 1', salary: '100', value: '100' },
        { name: 'Order 2', dept: 'Jan 2', salary: '150', value: '250' },
        { name: 'Order 3', dept: 'Jan 3', salary: '200', value: '450' },
      ],
      newCol: 'running_sum',
      sql: 'SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)'
    },
    lag: {
      title: 'Previous Value (LAG)',
      emoji: '⏮️',
      color: 'pink',
      columnHeaders: 'quarter | year | revenue',
      rowCountLabel: '3 rows',
      sourceRows: [
        { name: 'Q1', dept: '2024', salary: '1000' },
        { name: 'Q2', dept: '2024', salary: '1200' },
        { name: 'Q3', dept: '2024', salary: '1100' },
      ],
      resultRows: [
        { name: 'Q1', dept: '2024', salary: '1000', value: 'NULL' },
        { name: 'Q2', dept: '2024', salary: '1200', value: '1000' },
        { name: 'Q3', dept: '2024', salary: '1100', value: '1200' },
      ],
      newCol: 'prev_revenue',
      sql: 'LAG(revenue, 1) OVER (ORDER BY quarter)'
    }
  };

  const config = configs[type];
  const colorClasses: Record<ColorType, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
    green: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
    purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
    pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700',
  };

  const highlightClasses: Record<HighlightType, string> = {
    green: 'bg-green-100 dark:bg-green-700/25 border-l-2 border-green-500 dark:border-green-400',
    orange: 'bg-orange-100 dark:bg-orange-600/25 border-l-2 border-orange-500 dark:border-orange-400',
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${colorClasses[config.color]}`}>
      {/* Header */}
      <div className="text-center mb-3">
        <div className="text-2xl mb-1">{config.emoji}</div>
        <div className="font-semibold text-sm text-gray-900 dark:text-white">{config.title}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">{config.sql}</div>
      </div>

      {/* Tables */}
      <div className="flex items-start gap-2">
        {/* Source Table */}
        <div className="flex-1">
          <div className="h-10 mb-1">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Source ({config.rowCountLabel})
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-500 font-mono truncate">{config.columnHeaders}</div>
          </div>
          <div className="space-y-1">
            {config.sourceRows.map((row, idx) => (
              <div 
                key={idx} 
                className={`text-xs p-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-[42px] flex flex-col justify-center ${row.highlight ? highlightClasses[row.highlight] : ''}`}
              >
                <div className="font-mono truncate">{row.name}</div>
                <div className="text-gray-600 dark:text-gray-400 truncate">{row.dept} | {row.salary}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow - centered on middle row */}
        <div className="flex items-center" style={{ marginTop: 'calc(40px + 4px + 42px + 4px + 21px)' }}>
          <div className="text-xl text-gray-400">→</div>
        </div>

        {/* Result Table */}
        <div className="flex-1">
          <div className="h-10 mb-1">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Result ({config.rowCountLabel})
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-500 font-mono truncate">
              {config.columnHeaders} + <span className="font-bold">{config.newCol}</span>
            </div>
          </div>
          <div className="space-y-1">
            {config.resultRows.map((row, idx) => (
              <div 
                key={idx} 
                className={`text-xs p-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-[42px] ${row.highlight ? highlightClasses[row.highlight] : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono truncate">{row.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 truncate leading-tight">{row.dept} | {row.salary}</div>
                  </div>
                  <div className={`font-bold px-0.5 py-0.5 rounded text-[10px] flex-shrink-0 ml-1 leading-none ${
                    row.value === 'NULL' 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                      : colorClasses[config.color]
                  }`}>
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-2 text-xs text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-gray-900 dark:text-white">{config.newCol}</span> column added • {config.rowCountLabel} preserved
        {type === 'partition' && <> • 🟢🟠 = groups (rank resets per group)</>}
        {type === 'lag' && <> • NULL = no previous value</>}
      </div>
    </div>
  );
}

