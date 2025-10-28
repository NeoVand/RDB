import { IndexVisual } from './IndexVisual';

export function IndexFigure() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IndexVisual type="sequential" />
        <IndexVisual type="btree" />
      </div>
      <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        <strong className="text-gray-900 dark:text-gray-100">How Indexes Work: Sequential Search vs B-Tree Search</strong>
        <p className="mt-2">
          <strong>Sequential Search (left):</strong> Without an index, the database must check <em>every single record</em> 
          until it finds matches. You can see this requires 8 comparison operations for our small dataset. Each step checks 
          one record, compares the department value, and moves to the next. This is <strong>O(n) complexity</strong>—doubling 
          the table size doubles the search time.
        </p>
        <p className="mt-2">
          <strong>B-Tree Search (right):</strong> With an index, the database uses a sorted tree structure to navigate 
          directly to the data. Notice it takes only <strong>3 steps</strong> instead of 8:
        </p>
        <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
          <li><strong>Step 1 (Root):</strong> Checks which range "Sales" falls into (Q–Z)</li>
          <li><strong>Step 2 (Internal Node):</strong> Narrows down to the S–T range</li>
          <li><strong>Step 3 (Leaf Node):</strong> Finds the exact list of row IDs with "Sales"</li>
        </ul>
        <p className="mt-2">
          This is <strong>O(log n) complexity</strong>—doubling the table size adds only one more step. The tree's height 
          (number of levels) determines the number of lookups, not the table size. For 1 million rows, a B-tree needs ~20 
          lookups vs 1 million comparisons for sequential scan—a <strong>50,000× improvement</strong>.
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          This visualization is simplified for teaching. Real B-trees have more keys per node and are wider/shorter, 
          but the principle is identical: each step eliminates a large portion of the search space.
        </p>
      </figcaption>
    </figure>
  );
}

