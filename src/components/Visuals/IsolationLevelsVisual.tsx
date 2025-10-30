import React from 'react';

interface IsolationLevel {
  name: string;
  shortName: string;
  description: string;
  preventsDirty: boolean;
  preventsNonRepeatable: boolean;
  preventsPhantom: boolean;
  performance: 'Fastest' | 'Fast' | 'Moderate' | 'Slowest';
  color: string;
  bgColor: string;
  borderColor: string;
}

export const IsolationLevelsVisual: React.FC = () => {
  const levels: IsolationLevel[] = [
    {
      name: 'SERIALIZABLE',
      shortName: 'SERIALIZABLE',
      description: 'Complete isolation',
      preventsDirty: true,
      preventsNonRepeatable: true,
      preventsPhantom: true,
      performance: 'Slowest',
      color: 'text-green-900 dark:text-green-100',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-400 dark:border-green-600',
    },
    {
      name: 'REPEATABLE READ',
      shortName: 'REPEATABLE READ',
      description: 'Consistent snapshots',
      preventsDirty: true,
      preventsNonRepeatable: true,
      preventsPhantom: false,
      performance: 'Moderate',
      color: 'text-blue-900 dark:text-blue-100',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-400 dark:border-blue-600',
    },
    {
      name: 'READ COMMITTED',
      shortName: 'READ COMMITTED',
      description: 'Default in most DBs',
      preventsDirty: true,
      preventsNonRepeatable: false,
      preventsPhantom: false,
      performance: 'Fast',
      color: 'text-amber-900 dark:text-amber-100',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-400 dark:border-amber-600',
    },
    {
      name: 'READ UNCOMMITTED',
      shortName: 'READ UNCOMMITTED',
      description: 'No protection',
      preventsDirty: false,
      preventsNonRepeatable: false,
      preventsPhantom: false,
      performance: 'Fastest',
      color: 'text-red-900 dark:text-red-100',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-400 dark:border-red-600',
    },
  ];

  const problems = [
    { key: 'dirty', label: 'Dirty Reads', icon: '🚫' },
    { key: 'nonRepeatable', label: 'Non-Repeatable Reads', icon: '🔄' },
    { key: 'phantom', label: 'Phantom Reads', icon: '👻' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="font-semibold">← Strictest (Safest)</span>
          <span>•</span>
          <span className="font-semibold">Most Permissive (Fastest) →</span>
        </div>
      </div>

      {/* Isolation Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((level, index) => (
          <div
            key={level.name}
            className={`${level.bgColor} ${level.borderColor} border-2 rounded-lg p-4 relative`}
          >
            {/* Level Number Badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>

            {/* Level Name */}
            <h4 className={`font-bold text-base mb-1 ${level.color}`}>
              {level.shortName}
            </h4>
            <p className={`text-xs ${level.color} opacity-80 mb-3`}>
              {level.description}
            </p>

            {/* Problems Prevented */}
            <div className="space-y-2 mb-3">
              <p className={`text-xs font-semibold ${level.color} mb-1`}>Prevents:</p>
              {problems.map((problem) => {
                const prevented =
                  problem.key === 'dirty'
                    ? level.preventsDirty
                    : problem.key === 'nonRepeatable'
                    ? level.preventsNonRepeatable
                    : level.preventsPhantom;

                return (
                  <div
                    key={problem.key}
                    className={`flex items-center gap-2 text-xs ${
                      prevented
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-gray-400 dark:text-gray-600 line-through'
                    }`}
                  >
                    <span className="text-base">{prevented ? '✓' : '✗'}</span>
                    <span>{problem.icon} {problem.label.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>

            {/* Performance Badge */}
            <div className="mt-3 pt-3 border-t border-current opacity-30"></div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-xs font-semibold ${level.color} opacity-70`}>
                Performance:
              </span>
              <span className={`text-xs font-bold ${level.color}`}>
                {level.performance}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-6">
        <h5 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
          Understanding the Trade-offs
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">🚫 Dirty Reads:</span>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Reading uncommitted data from other transactions
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">🔄 Non-Repeatable:</span>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Same query returns different results within one transaction
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">👻 Phantom Reads:</span>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              New rows appear when re-running same query
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

