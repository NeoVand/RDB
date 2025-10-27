import { JoinVisual } from './JoinVisual';

export function JoinFigure() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <JoinVisual type="inner" />
        <JoinVisual type="left" />
        <JoinVisual type="right" />
        <JoinVisual type="full" />
        <JoinVisual type="cross" />
        <JoinVisual type="self" />
      </div>
      <figcaption className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 italic max-w-5xl mx-auto">
        <strong className="font-semibold not-italic">The Six Types of SQL JOINs: Visual Comparison.</strong> Each diagram shows how the JOIN combines rows from two tables into a result set. Notation: A1+B1 means row A1 joined with row B1; the ∅ symbol represents NULL (no matching row). Rows with matching numbers (A1 with B1, A2 with B2) share a common join key value and match when their key values are equal.
      </figcaption>
    </figure>
  );
}

