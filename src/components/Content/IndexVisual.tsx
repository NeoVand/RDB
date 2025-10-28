interface IndexVisualProps {
  type: 'sequential' | 'btree';
}

export function IndexVisual({ type }: IndexVisualProps) {
  const isSequential = type === 'sequential';

  // Sample data: 8 records sorted by department
  const records = [
    { id: 1, dept: 'Eng', name: 'Alice' },
    { id: 2, dept: 'Eng', name: 'Bob' },
    { id: 3, dept: 'Eng', name: 'Carol' },
    { id: 4, dept: 'HR', name: 'Dave' },
    { id: 5, dept: 'HR', name: 'Eve' },
    { id: 6, dept: 'Sales', name: 'Frank' },
    { id: 7, dept: 'Sales', name: 'Grace' },
    { id: 8, dept: 'Sales', name: 'Henry' },
  ];

  if (isSequential) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg overflow-hidden bg-red-50 dark:bg-red-950/20">
        {/* Header */}
        <div className="bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-100 px-3 py-2.5 font-semibold text-sm flex items-center justify-between">
          <span>🐢 Sequential Search</span>
          <span className="text-xs opacity-75 font-mono">O(n)</span>
        </div>

        <div className="p-3">
          {/* Query */}
          <div className="mb-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded px-2 py-1.5">
            <div className="text-[9px] font-semibold text-red-700 dark:text-red-300 mb-0.5">Query:</div>
            <code className="text-[10px] text-red-900 dark:text-red-100 font-mono">
              WHERE department = 'Sales'
            </code>
          </div>

          {/* Sequential blocks with steps */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Check each record:
            </div>
            
            {records.map((record, idx) => {
              const stepNum = idx + 1;
              const isMatch = record.dept === 'Sales';
              
              return (
                <div key={record.id} className="flex items-center gap-1.5">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 flex items-center justify-center">
                    <div className="text-center leading-none">
                      <div className="text-[8px] font-semibold text-red-700 dark:text-red-300">STEP</div>
                      <div className="text-sm font-bold text-red-800 dark:text-red-200">{stepNum}</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-red-400 dark:text-red-500 text-sm">→</div>

                  {/* Record block */}
                  <div 
                    className={`flex-1 border rounded px-1.5 py-1 min-w-0 ${
                      isMatch 
                        ? 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-600' 
                        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-mono text-[9px] truncate">
                        <span className="text-gray-600 dark:text-gray-400">id:</span>
                        <span className="ml-0.5 font-semibold">{record.id}</span>
                        <span className="mx-1 text-gray-400">|</span>
                        <span className="text-gray-600 dark:text-gray-400">dept:</span>
                        <span className="ml-0.5 font-semibold">{record.dept}</span>
                        <span className="mx-1 text-gray-400">|</span>
                        <span className="text-gray-600 dark:text-gray-400">{record.name}</span>
                      </div>
                      <div className="flex-shrink-0">
                        {isMatch ? (
                          <span className="text-[9px] font-bold text-green-700 dark:text-green-300">
                            ✓
                          </span>
                        ) : (
                          <span className="text-[9px] text-gray-400 dark:text-gray-600">
                            ✗
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-3 bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 rounded p-2">
            <div className="text-[11px] font-bold text-red-900 dark:text-red-100">
              Total: 8 comparisons
            </div>
            <div className="text-[9px] text-red-800 dark:text-red-200 leading-snug">
              1M rows = 1M checks 😰
            </div>
          </div>
        </div>
      </div>
    );
  }

  // B-tree visualization
  return (
    <div className="border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-950/20">
      {/* Header */}
      <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 px-3 py-2.5 font-semibold text-sm flex items-center justify-between">
        <span>⚡ B-Tree Index</span>
        <span className="text-xs opacity-75 font-mono">O(log n)</span>
      </div>

      <div className="p-3">
        {/* Query */}
        <div className="mb-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded px-2 py-1.5">
          <div className="text-[9px] font-semibold text-blue-700 dark:text-blue-300 mb-0.5">Query:</div>
          <code className="text-[10px] text-blue-900 dark:text-blue-100 font-mono">
            WHERE department = 'Sales'
          </code>
        </div>

        <div className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Navigate tree in 3 steps:
        </div>

        {/* B-Tree structure */}
        <div className="space-y-2.5">
          {/* STEP 1: Root Node */}
          <div className="space-y-1">
            <div className="flex items-start gap-1.5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-500 dark:border-blue-600 flex items-center justify-center mt-1">
                <div className="text-center leading-none">
                  <div className="text-[8px] font-semibold text-blue-700 dark:text-blue-300">STEP</div>
                  <div className="text-sm font-bold text-blue-800 dark:text-blue-200">1</div>
                </div>
              </div>
              
              <div className="text-blue-500 dark:text-blue-400 text-sm mt-2">→</div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  Root Node
                </div>
                <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/50 dark:to-indigo-900/30 border border-indigo-400 dark:border-indigo-600 rounded p-1.5">
                  <div className="flex justify-around items-center text-[9px]">
                    <div className="text-center">
                      <div className="font-mono font-semibold text-indigo-900 dark:text-indigo-100">A–H</div>
                    </div>
                    <div className="text-indigo-400 dark:text-indigo-500">|</div>
                    <div className="text-center">
                      <div className="font-mono font-semibold text-indigo-900 dark:text-indigo-100">I–P</div>
                    </div>
                    <div className="text-indigo-400 dark:text-indigo-500">|</div>
                    <div className="text-center bg-green-200 dark:bg-green-800/60 px-1 rounded border border-green-500 dark:border-green-500">
                      <div className="font-mono font-bold text-green-900 dark:text-green-100">Q–Z</div>
                    </div>
                  </div>
                  <div className="text-[8px] text-indigo-700 dark:text-indigo-300 text-center mt-1 leading-tight">
                    'S' → Q–Z range
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Internal Node */}
          <div className="ml-6 space-y-1">
            <div className="flex items-start gap-1.5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-500 dark:border-blue-600 flex items-center justify-center mt-1">
                <div className="text-center leading-none">
                  <div className="text-[8px] font-semibold text-blue-700 dark:text-blue-300">STEP</div>
                  <div className="text-sm font-bold text-blue-800 dark:text-blue-200">2</div>
                </div>
              </div>
              
              <div className="text-blue-500 dark:text-blue-400 text-sm mt-2">→</div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  Internal Node
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-900/30 border border-purple-400 dark:border-purple-600 rounded p-1.5">
                  <div className="flex justify-around items-center text-[9px]">
                    <div className="text-center">
                      <div className="font-mono font-semibold text-purple-900 dark:text-purple-100">Q–R</div>
                    </div>
                    <div className="text-purple-400 dark:text-purple-500">|</div>
                    <div className="text-center bg-green-200 dark:bg-green-800/60 px-1 rounded border border-green-500 dark:border-green-500">
                      <div className="font-mono font-bold text-green-900 dark:text-green-100">S–T</div>
                    </div>
                    <div className="text-purple-400 dark:text-purple-500">|</div>
                    <div className="text-center">
                      <div className="font-mono font-semibold text-purple-900 dark:text-purple-100">U–Z</div>
                    </div>
                  </div>
                  <div className="text-[8px] text-purple-700 dark:text-purple-300 text-center mt-1 leading-tight">
                    'Sales' in S–T
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Leaf Node */}
          <div className="ml-12 space-y-1">
            <div className="flex items-start gap-1.5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-500 dark:border-blue-600 flex items-center justify-center mt-1">
                <div className="text-center leading-none">
                  <div className="text-[8px] font-semibold text-blue-700 dark:text-blue-300">STEP</div>
                  <div className="text-sm font-bold text-blue-800 dark:text-blue-200">3</div>
                </div>
              </div>
              
              <div className="text-blue-500 dark:text-blue-400 text-sm mt-2">→</div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  Leaf Node
                </div>
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30 border border-amber-400 dark:border-amber-600 rounded p-1.5">
                  <div className="bg-green-200 dark:bg-green-800/60 border border-green-500 dark:border-green-600 rounded px-1.5 py-1">
                    <div className="font-mono text-[9px] font-semibold text-green-900 dark:text-green-100">
                      Sales → [6,7,8]
                    </div>
                  </div>
                  <div className="text-[8px] text-amber-700 dark:text-amber-300 text-center mt-1 leading-tight">
                    Found rows!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final result */}
          <div className="ml-16 pt-1">
            <div className="text-[9px] font-semibold text-gray-700 dark:text-gray-300 mb-1">Result:</div>
            <div className="space-y-1">
              {records.filter(r => r.dept === 'Sales').map(record => (
                <div key={record.id} className="bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600 rounded px-1.5 py-0.5">
                  <div className="font-mono text-[9px]">
                    <span className="text-gray-600 dark:text-gray-400">id:</span>
                    <span className="ml-0.5 font-semibold">{record.id}</span>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="text-gray-600 dark:text-gray-400">{record.dept}</span>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="text-gray-600 dark:text-gray-400">{record.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key insight text - simple 2 lines */}
        <div className="mt-3 text-[9px] text-gray-600 dark:text-gray-400 leading-relaxed space-y-0.5">
          <div>
            The tree depth grows <strong>logarithmically</strong> with the number of entries: depth = log₂(n).
          </div>
          <div>
            This means 1M rows need only ~20 lookups instead of 1M comparisons.
          </div>
        </div>

        {/* Summary */}
        <div className="mt-3 bg-blue-100 dark:bg-blue-900/40 border border-blue-500 dark:border-blue-600 rounded p-2">
          <div className="text-[11px] font-bold text-blue-900 dark:text-blue-100">
            Total: 3 node lookups
          </div>
          <div className="text-[9px] text-blue-800 dark:text-blue-200 leading-snug">
            1M rows ≈ 20 lookups 🚀
          </div>
        </div>
      </div>
    </div>
  );
}
