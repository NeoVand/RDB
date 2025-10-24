import { useState } from 'react';
import { SQLPlayground } from './Playground/SQLPlayground';
import type { DatabasePreset } from '../types/database';

interface ExerciseProps {
  title: string;
  description: string;
  preset: DatabasePreset;
  hints?: string[];
  expectedOutput?: string;
  solution: string;
  solutionExplanation?: string;
}

export function Exercise({
  title,
  description,
  preset,
  hints = [],
  expectedOutput,
  solution,
  solutionExplanation,
}: ExerciseProps) {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  return (
    <div className="my-6 border border-indigo-300 dark:border-indigo-700 rounded-lg overflow-hidden bg-indigo-50/50 dark:bg-indigo-950/20">
      {/* Header */}
      <div className="bg-indigo-100 dark:bg-indigo-900/40 border-b border-indigo-300 dark:border-indigo-700 p-4">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Expected Output */}
      {expectedOutput && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-indigo-300 dark:border-indigo-700 p-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Expected Output:
          </h4>
          <pre className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-700 overflow-x-auto">
            {expectedOutput}
          </pre>
        </div>
      )}

      {/* Playground */}
      <div className="p-4">
        <SQLPlayground
          preset={preset}
          defaultQuery="-- Write your query here\n"
          minHeight="150px"
        />
      </div>

      {/* Hints Section */}
      {hints.length > 0 && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2"
            type="button"
          >
            <svg className={`w-4 h-4 transition-transform ${showHints ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Need a hint? ({hints.length} available)
          </button>

          {showHints && (
            <div className="mt-3 space-y-2">
              {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                <div
                  key={index}
                  className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 rounded-r text-sm text-amber-900 dark:text-amber-200"
                >
                  <span className="font-semibold">Hint {index + 1}:</span> {hint}
                </div>
              ))}
              {currentHintIndex < hints.length - 1 && (
                <button
                  onClick={handleNextHint}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
                  type="button"
                >
                  Show next hint →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Solution Section */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-2"
          type="button"
        >
          <svg className={`w-4 h-4 transition-transform ${showSolution ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {showSolution ? 'Hide solution' : 'Show solution'}
        </button>

        {showSolution && (
          <div className="mt-3 space-y-3">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                Solution:
              </h4>
              <pre className="text-sm text-green-800 dark:text-green-200 bg-white dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800 overflow-x-auto">
                {solution}
              </pre>
            </div>

            {solutionExplanation && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-3 rounded-r">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Explanation:
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {solutionExplanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

