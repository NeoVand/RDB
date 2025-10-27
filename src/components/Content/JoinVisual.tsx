interface JoinVisualProps {
  type: 'inner' | 'left' | 'right' | 'full' | 'cross' | 'self';
}

export function JoinVisual({ type }: JoinVisualProps) {
  const configs = {
    inner: {
      title: 'INNER JOIN',
      icon: '🔗',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-300 dark:border-purple-700',
      description: 'Only matching rows',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table A */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table A</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-14 h-8 rounded border-2 flex items-center justify-center text-xs font-semibold ${
                    i <= 2
                      ? 'border-purple-400 bg-purple-200 dark:bg-purple-800/60'
                      : 'border-gray-400 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 opacity-60'
                  }`}
                >
                  A{i}
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">🔗</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">INNER</div>
            </div>
            {/* Table B */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table B</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-purple-400 bg-purple-200 dark:bg-purple-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  B{i}
                </div>
              ))}
            </div>
            {/* Result */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-base">→</div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">2 rows</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-purple-500 bg-purple-300 dark:bg-purple-700 flex items-center justify-center text-xs font-bold"
                >
                  A{i}+B{i}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    left: {
      title: 'LEFT JOIN',
      icon: '⬅️',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-300 dark:border-blue-700',
      description: 'All from A + matches',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table A */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table A</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-blue-400 bg-blue-200 dark:bg-blue-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  A{i}
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">⬅️</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">LEFT</div>
            </div>
            {/* Table B */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table B</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-gray-400 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs"
                >
                  B{i}
                </div>
              ))}
            </div>
            {/* Result */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-base">→</div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">3 rows</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-14 h-8 rounded border-2 flex items-center justify-center text-xs ${
                    i <= 2
                      ? 'border-blue-500 bg-blue-300 dark:bg-blue-700 font-semibold'
                      : 'border-blue-400 bg-blue-200 dark:bg-blue-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {i <= 2 ? `A${i}+B${i}` : 'A3+∅'}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    right: {
      title: 'RIGHT JOIN',
      icon: '➡️',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-300 dark:border-teal-700',
      description: 'All from B + matches',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table A */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table A</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-gray-400 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs"
                >
                  A{i}
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">➡️</div>
              <div className="text-sm text-teal-600 dark:text-teal-400">RIGHT</div>
            </div>
            {/* Table B */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table B</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-teal-400 bg-teal-200 dark:bg-teal-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  B{i}
                </div>
              ))}
            </div>
            {/* Result */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-base">→</div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">3 rows</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-14 h-8 rounded border-2 flex items-center justify-center text-xs ${
                    i <= 2
                      ? 'border-teal-500 bg-teal-300 dark:bg-teal-700 font-semibold'
                      : 'border-teal-400 bg-teal-200 dark:bg-teal-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {i <= 2 ? `A${i}+B${i}` : '∅+B3'}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    full: {
      title: 'FULL OUTER JOIN',
      icon: '↔️',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-300 dark:border-orange-700',
      description: 'All from both tables',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table A */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table A</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-orange-400 bg-orange-200 dark:bg-orange-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  A{i}
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">↔️</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">FULL</div>
            </div>
            {/* Table B */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table B</div>
              {[1, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-orange-400 bg-orange-200 dark:bg-orange-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  B{i}
                </div>
              ))}
            </div>
            {/* Result */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-base">→</div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">3 rows</div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-orange-500 bg-orange-300 dark:bg-orange-700 flex items-center justify-center text-[10px] font-semibold"
                >
                  {i === 1 ? 'A1+B1' : i === 2 ? 'A2+∅' : '∅+B3'}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    cross: {
      title: 'CROSS JOIN',
      icon: '✖️',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-300 dark:border-pink-700',
      description: 'Every combination',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table A */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table A</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-pink-400 bg-pink-200 dark:bg-pink-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  A{i}
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">✖️</div>
              <div className="text-sm text-pink-600 dark:text-pink-400">CROSS</div>
            </div>
            {/* Table B */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Table B</div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-14 h-8 rounded border-2 border-pink-400 bg-pink-200 dark:bg-pink-800/60 flex items-center justify-center text-xs font-semibold"
                >
                  B{i}
                </div>
              ))}
            </div>
            {/* Result */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-base">→</div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5 text-pink-600 dark:text-pink-400">4 rows!</div>
              {['A1+B1', 'A1+B2', 'A2+B1', 'A2+B2'].map((combo) => (
                <div
                  key={combo}
                  className="w-16 h-7 rounded border-2 border-pink-500 bg-pink-300 dark:bg-pink-700 flex items-center justify-center text-[10px] font-semibold"
                >
                  {combo}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    self: {
      title: 'SELF JOIN',
      icon: '🔄',
      color: 'from-violet-500 to-fuchsia-600',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-300 dark:border-violet-700',
      description: 'Table joins itself',
      visual: (
        <div className="flex items-center justify-center py-3">
          <div className="flex gap-3 items-center">
            {/* Table with FK column shown */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">Employees</div>
              <div className="flex gap-1">
                <div className="w-12 text-[9px] font-semibold text-center text-gray-600 dark:text-gray-400">ID</div>
                <div className="w-12 text-[9px] font-semibold text-center text-gray-600 dark:text-gray-400">MgrID</div>
              </div>
              {[[1, '∅'], [2, 1], [3, 1]].map(([id, mgr]) => (
                <div key={id} className="flex gap-1">
                  <div className="w-12 h-7 rounded border-2 border-violet-400 bg-violet-200 dark:bg-violet-800/60 flex items-center justify-center text-[10px] font-semibold">
                    {id}
                  </div>
                  <div className={`w-12 h-7 rounded border-2 flex items-center justify-center text-[10px] ${
                    mgr === '∅' 
                      ? 'border-gray-400 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 text-gray-500'
                      : 'border-violet-300 bg-violet-100 dark:bg-violet-900/40'
                  }`}>
                    {mgr}
                  </div>
                </div>
              ))}
            </div>
            {/* JOIN indicator */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-lg">🔄</div>
              <div className="text-[10px] text-violet-600 dark:text-violet-400 text-center leading-tight">ON<br/>mgr_id=id</div>
            </div>
            {/* Result */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-center mb-1.5">2 rows</div>
              {[[2, 1], [3, 1]].map(([emp, mgr]) => (
                <div key={`${emp}-${mgr}`} className="w-20 h-7 rounded border-2 border-violet-500 bg-violet-300 dark:bg-violet-700 flex items-center justify-center text-[10px] font-semibold">
                  {emp}→{mgr}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  };

  const config = configs[type];

  return (
    <div className={`p-4 ${config.bgColor} border-2 ${config.borderColor} rounded-xl`}>
      {/* Header */}
      <div className="text-center mb-3">
        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${config.color} text-white rounded-lg shadow-md mb-1`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{config.icon}</span>
            <div className="text-left">
              <div className="text-sm font-bold leading-tight">{config.title}</div>
            </div>
          </div>
        </div>
        <p className="mt-1.5 text-xs text-gray-700 dark:text-gray-300">{config.description}</p>
      </div>

      {/* Visual */}
      {config.visual}
    </div>
  );
}

