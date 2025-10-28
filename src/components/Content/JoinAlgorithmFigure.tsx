import { JoinAlgorithmVisual } from './JoinAlgorithmVisual';

export function JoinAlgorithmFigure() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <JoinAlgorithmVisual type="nested-loop" />
        <JoinAlgorithmVisual type="hash" />
        <JoinAlgorithmVisual type="merge" />
      </div>
      <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        <strong className="text-gray-900 dark:text-gray-100">Join Algorithms: How They Actually Process Data</strong>
        <p className="mt-2">
          These visualizations show <em>exactly</em> what happens when the database engine joins two tables. Using a simple example 
          (2 customers, 3 orders), watch how each algorithm finds matching rows:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1.5">
          <li>
            <strong>Nested Loop (left):</strong> For <em>each</em> customer, scans <em>all</em> orders. 
            2 customers × 3 orders = 6 comparisons. Scale to 10K × 100K = 1 billion! Indexes make this practical.
          </li>
          <li>
            <strong>Hash Join (center):</strong> Build hash table from customers, probe with orders. 
            2 builds + 3 probes = 5 operations. O(1) lookups make this ideal for large tables.
          </li>
          <li>
            <strong>Merge Join (right):</strong> If pre-sorted (via indexes), single linear pass merges both tables. 
            5 operations total. No memory overhead, no backtracking—perfect when indexes provide sorted data.
          </li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          <strong>Key insight:</strong> The query optimizer chooses between these algorithms based on table sizes, available indexes, 
          memory, and join conditions. Understanding <em>how</em> they work helps you write queries and design schemas that make the 
          optimizer's job easier.
        </p>
      </figcaption>
    </figure>
  );
}

