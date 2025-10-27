import { WindowFunctionVisual } from './WindowFunctionVisual';

export function WindowFunctionFigure() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WindowFunctionVisual type="rank" />
        <WindowFunctionVisual type="partition" />
        <WindowFunctionVisual type="running" />
        <WindowFunctionVisual type="lag" />
      </div>
      <figcaption className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 italic max-w-5xl mx-auto">
        <strong className="font-semibold not-italic">Window Functions: Four Common Patterns.</strong> Unlike GROUP BY which collapses rows, window functions add calculated columns while preserving all original rows (3→3). Each diagram shows a new column computed across a "window" of related rows.
      </figcaption>
    </figure>
  );
}

