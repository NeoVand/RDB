interface CRUDVisualProps {
  operation: 'create' | 'read' | 'update' | 'delete';
}

export function CRUDVisual({ operation }: CRUDVisualProps) {
  const configs = {
    create: {
      title: 'CREATE',
      subtitle: 'INSERT',
      icon: '➕',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-300 dark:border-green-700',
      description: 'Add new records to the database',
      visual: (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-4 items-center">
            {/* Before */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">Before</div>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-12 rounded border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-xs"
                >
                  Row {i + 1}
                </div>
              ))}
            </div>
            {/* Arrow with emoji */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl">➕</div>
              <div className="text-2xl text-green-500">→</div>
            </div>
            {/* After */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">After</div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-12 rounded border-2 ${
                    i === 2
                      ? 'border-green-500 bg-green-100 dark:bg-green-900/40 animate-pulse'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                  } flex items-center justify-center text-xs`}
                >
                  {i === 2 ? '✨ NEW' : `Row ${i + 1}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    read: {
      title: 'READ',
      subtitle: 'SELECT',
      icon: '🔍',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-300 dark:border-blue-700',
      description: 'Query and retrieve data',
      visual: (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-4 items-center">
            {/* Table */}
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-12 rounded border-2 border-blue-500 bg-blue-100 dark:bg-blue-900/40 shadow-lg shadow-blue-500/50 flex items-center justify-center text-xs"
                >
                  Row {i + 1}
                </div>
              ))}
            </div>
            {/* Arrow with emoji */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl">🔍</div>
              <div className="text-2xl text-blue-500">→</div>
            </div>
            {/* Results */}
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-12 rounded border-2 border-blue-500 bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  ✓
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    update: {
      title: 'UPDATE',
      subtitle: 'UPDATE',
      icon: '✏️',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-300 dark:border-amber-700',
      description: 'Modify existing records',
      visual: (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-4 items-center">
            {/* Before */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">Before</div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-12 rounded border-2 ${
                    i === 1
                      ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                  } flex items-center justify-center text-xs`}
                >
                  {i === 1 ? '📧 old@' : `Row ${i + 1}`}
                </div>
              ))}
            </div>
            {/* Arrow with pencil */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl">✏️</div>
              <div className="text-2xl text-amber-500">→</div>
            </div>
            {/* After */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">After</div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-12 rounded border-2 ${
                    i === 1
                      ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40 shadow-lg shadow-amber-500/50'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                  } flex items-center justify-center text-xs`}
                >
                  {i === 1 ? '📧 new@' : `Row ${i + 1}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    delete: {
      title: 'DELETE',
      subtitle: 'DELETE',
      icon: '🗑️',
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-300 dark:border-red-700',
      description: 'Remove records from the database',
      visual: (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-4 items-center">
            {/* Before */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">Before</div>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-10 rounded border-2 ${
                    i === 2
                      ? 'border-red-500 bg-red-100 dark:bg-red-900/40'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                  } flex items-center justify-center text-xs`}
                >
                  Row {i + 1}
                </div>
              ))}
            </div>
            {/* Arrow with trash emoji */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl">🗑️</div>
              <div className="text-2xl text-red-500">→</div>
            </div>
            {/* After */}
            <div className="space-y-2">
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">After</div>
              {[0, 1, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-10 rounded border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-xs"
                >
                  Row {i + 1}
                </div>
              ))}
              <div className="w-16 h-10 rounded border-2 border-dashed border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10 flex items-center justify-center text-xs text-red-500 opacity-50">
                Deleted
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const config = configs[operation];

  return (
    <div className={`p-6 ${config.bgColor} border-2 ${config.borderColor} rounded-xl`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-block px-6 py-3 bg-gradient-to-r ${config.color} text-white rounded-lg shadow-lg mb-2`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{config.icon}</span>
            <div className="text-left">
              <div className="text-2xl font-bold">{config.title}</div>
              <div className="text-sm opacity-90">SQL: {config.subtitle}</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{config.description}</p>
      </div>

      {/* Visual */}
      {config.visual}
    </div>
  );
}

