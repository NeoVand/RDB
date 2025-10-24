import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { Callout } from '../../components/Callout';

export function Part7_Reference() {
  return (
    <>
      <Section id="part7" title="Part VII: Reference Guide - Quick Reference and Best Practices" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          A comprehensive reference guide for SQL syntax, best practices, and common pitfalls to avoid.
        </p>
      </Section>

      <Section id="section16" title="SQL Keywords Quick Reference" level={2}>
        <Subsection title="Data Query Language (DQL)">
          <div className="space-y-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">SELECT</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Retrieves data from one or more tables.
              </p>
              <CodeExample
                title="Syntax"
                code={`SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column
HAVING group_condition
ORDER BY column [ASC|DESC]
LIMIT n OFFSET m;`}
              />
              <Callout type="tip" title="Common Pitfall">
                Avoid <code>SELECT *</code> in production code. Always specify the columns you need for better performance and maintainability.
              </Callout>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">WHERE</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Filters rows based on conditions.
              </p>
              <CodeExample
                title="Common operators"
                code={`-- Comparison: =, <>, <, >, <=, >=
WHERE price > 100

-- Logical: AND, OR, NOT
WHERE category = 'Electronics' AND price < 500

-- Pattern matching: LIKE, ILIKE
WHERE name LIKE '%Corp%'

-- Range: BETWEEN
WHERE date BETWEEN '2024-01-01' AND '2024-12-31'

-- Set membership: IN, NOT IN
WHERE status IN ('active', 'pending')

-- NULL checks: IS NULL, IS NOT NULL
WHERE email IS NOT NULL`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">JOIN</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Combines rows from multiple tables.
              </p>
              <CodeExample
                title="JOIN types"
                code={`-- INNER JOIN: Only matching rows
SELECT * FROM a INNER JOIN b ON a.id = b.a_id;

-- LEFT JOIN: All from left + matching from right
SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;

-- RIGHT JOIN: All from right + matching from left
SELECT * FROM a RIGHT JOIN b ON a.id = b.a_id;

-- FULL OUTER JOIN: All from both tables
SELECT * FROM a FULL OUTER JOIN b ON a.id = b.a_id;

-- CROSS JOIN: Cartesian product
SELECT * FROM a CROSS JOIN b;

-- SELF JOIN: Table joined to itself
SELECT e1.name, e2.name as manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GROUP BY & HAVING</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Groups rows and filters groups.
              </p>
              <CodeExample
                title="Aggregation syntax"
                code={`SELECT 
  category,
  COUNT(*) as count,
  AVG(price) as avg_price
FROM products
WHERE price > 0           -- Filter rows BEFORE grouping
GROUP BY category
HAVING COUNT(*) >= 5;     -- Filter groups AFTER aggregation`}
              />
              <Callout type="warning" title="Common Pitfall">
                Remember: WHERE filters rows <em>before</em> GROUP BY, HAVING filters groups <em>after</em> aggregation.
              </Callout>
            </div>
          </div>
        </Subsection>

        <Subsection title="Data Manipulation Language (DML)">
          <div className="space-y-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">INSERT</h4>
              <CodeExample
                title="Insert data"
                code={`-- Single row
INSERT INTO table_name (col1, col2, col3)
VALUES (val1, val2, val3);

-- Multiple rows
INSERT INTO table_name (col1, col2) VALUES
  (val1, val2),
  (val3, val4),
  (val5, val6);

-- From SELECT
INSERT INTO table_name (col1, col2)
SELECT col1, col2 FROM other_table WHERE condition;`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">UPDATE</h4>
              <CodeExample
                title="Update data"
                code={`-- Update with WHERE (ALWAYS use WHERE!)
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;

-- Update with JOIN
UPDATE products
SET price = price * 1.1
WHERE category IN (
  SELECT category_id FROM categories WHERE name = 'Electronics'
);`}
              />
              <Callout type="warning" title="Critical Warning">
                ALWAYS use WHERE with UPDATE! Without it, ALL rows will be updated.
              </Callout>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">DELETE</h4>
              <CodeExample
                title="Delete data"
                code={`-- Delete with WHERE (ALWAYS use WHERE!)
DELETE FROM table_name
WHERE condition;

-- Delete with subquery
DELETE FROM orders
WHERE customer_id IN (
  SELECT customer_id FROM customers WHERE status = 'inactive'
);`}
              />
              <Callout type="warning" title="Critical Warning">
                ALWAYS use WHERE with DELETE! Without it, ALL rows will be deleted.
              </Callout>
            </div>
          </div>
        </Subsection>

        <Subsection title="Data Definition Language (DDL)">
          <div className="space-y-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">CREATE TABLE</h4>
              <CodeExample
                title="Create table with constraints"
                code={`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  age INTEGER CHECK (age >= 18),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active'
);

-- With foreign key
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ALTER TABLE</h4>
              <CodeExample
                title="Modify table structure"
                code={`-- Add column
ALTER TABLE users ADD COLUMN phone TEXT;

-- Rename column (SQLite 3.25+)
ALTER TABLE users RENAME COLUMN username TO user_name;

-- Drop column (SQLite 3.35+)
ALTER TABLE users DROP COLUMN phone;

-- Rename table
ALTER TABLE users RENAME TO customers;`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">DROP & TRUNCATE</h4>
              <CodeExample
                title="Remove tables or data"
                code={`-- DROP: Removes table and all data permanently
DROP TABLE IF EXISTS table_name;

-- TRUNCATE: Removes all data but keeps structure
-- (Not available in SQLite, use DELETE instead)
DELETE FROM table_name;  -- SQLite alternative

-- TRUNCATE in other databases:
TRUNCATE TABLE table_name;  -- PostgreSQL, MySQL`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">CREATE INDEX</h4>
              <CodeExample
                title="Create indexes for performance"
                code={`-- Simple index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date 
  ON orders(user_id, order_date);

-- Unique index
CREATE UNIQUE INDEX idx_users_username 
  ON users(username);`}
              />
            </div>
          </div>
        </Subsection>

        <Subsection title="Advanced SQL Features">
          <div className="space-y-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Table Expressions (CTEs)</h4>
              <CodeExample
                title="WITH clause"
                code={`-- Single CTE
WITH high_value_customers AS (
  SELECT customer_id, SUM(total) as lifetime_value
  FROM orders
  GROUP BY customer_id
  HAVING SUM(total) > 1000
)
SELECT * FROM high_value_customers;

-- Multiple CTEs
WITH 
  sales_2023 AS (SELECT * FROM orders WHERE year = 2023),
  sales_2024 AS (SELECT * FROM orders WHERE year = 2024)
SELECT * FROM sales_2023
UNION ALL
SELECT * FROM sales_2024;`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Window Functions</h4>
              <CodeExample
                title="Advanced analytics"
                code={`-- Ranking
SELECT 
  product_name,
  price,
  RANK() OVER (ORDER BY price DESC) as price_rank,
  DENSE_RANK() OVER (ORDER BY price DESC) as dense_rank,
  ROW_NUMBER() OVER (ORDER BY price DESC) as row_num
FROM products;

-- Partitioned aggregation
SELECT 
  category,
  product_name,
  price,
  AVG(price) OVER (PARTITION BY category) as category_avg
FROM products;

-- Running total
SELECT 
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;`}
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">CASE Expressions</h4>
              <CodeExample
                title="Conditional logic"
                code={`-- Simple CASE
SELECT 
  name,
  CASE status
    WHEN 'A' THEN 'Active'
    WHEN 'P' THEN 'Pending'
    WHEN 'I' THEN 'Inactive'
    ELSE 'Unknown'
  END as status_text
FROM users;

-- Searched CASE
SELECT 
  product_name,
  price,
  CASE
    WHEN price < 50 THEN 'Budget'
    WHEN price < 200 THEN 'Mid-Range'
    ELSE 'Premium'
  END as tier
FROM products;`}
              />
            </div>
          </div>
        </Subsection>
      </Section>

      <Section id="section17" title="Best Practices Checklist" level={2}>
        <div className="space-y-6">
          <Subsection title="Query Writing">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Be specific with SELECT:</strong> List only the columns you need instead of using SELECT *
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Use table aliases:</strong> Makes queries more readable, especially with joins
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Format your SQL:</strong> Use indentation and line breaks for readability
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Add comments:</strong> Explain complex logic, especially in production queries
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Use EXISTS instead of IN for large subqueries:</strong> EXISTS stops at first match, often faster
                </div>
              </li>
            </ul>
          </Subsection>

          <Subsection title="Performance">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Index frequently queried columns:</strong> Especially foreign keys and WHERE clause columns
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Avoid functions on indexed columns in WHERE:</strong> Use WHERE date &gt;= '2024-01-01' not WHERE YEAR(date) = 2024
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Use LIMIT when testing:</strong> Limit results during development to avoid overwhelming the system
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Be careful with DISTINCT:</strong> It can be expensive; ensure you actually need unique rows
                </div>
              </li>
            </ul>
          </Subsection>

          <Subsection title="Data Integrity">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Always define primary keys:</strong> Every table should have a primary key
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Use NOT NULL where appropriate:</strong> Prevent NULL values in columns that should always have data
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Enforce referential integrity:</strong> Use foreign key constraints to maintain relationships
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Use transactions for multi-statement operations:</strong> Ensure atomicity
                </div>
              </li>
            </ul>
          </Subsection>

          <Subsection title="Naming Conventions">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <strong>Be consistent:</strong> Choose a naming convention and stick to it
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <strong>Table names:</strong> Use plural nouns (users, orders, products)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <strong>Column names:</strong> Use singular nouns and snake_case (user_id, created_at)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <strong>Avoid reserved keywords:</strong> Don't name columns "select", "from", "table", etc.
                </div>
              </li>
            </ul>
          </Subsection>
        </div>
      </Section>

      <Section id="section18" title="Common Pitfalls Gallery" level={2}>
        <div className="space-y-4">
          <Callout type="warning" title="Pitfall #1: UPDATE/DELETE Without WHERE">
            <p className="mb-2">
              <strong>Problem:</strong> Forgetting WHERE clause affects ALL rows
            </p>
            <CodeExample
              title="Dangerous vs Safe"
              code={`-- DANGEROUS: Updates ALL employees
UPDATE employees SET salary = 100000;

-- SAFE: Updates specific employee
UPDATE employees SET salary = 100000 WHERE id = 123;`}
            />
          </Callout>

          <Callout type="warning" title="Pitfall #2: NULL Comparison">
            <p className="mb-2">
              <strong>Problem:</strong> Using = NULL instead of IS NULL
            </p>
            <CodeExample
              title="Wrong vs Right"
              code={`-- WRONG: Never matches (= NULL always returns NULL/unknown)
SELECT * FROM users WHERE email = NULL;

-- RIGHT: Use IS NULL
SELECT * FROM users WHERE email IS NULL;`}
            />
          </Callout>

          <Callout type="warning" title="Pitfall #3: Implicit Type Conversion">
            <p className="mb-2">
              <strong>Problem:</strong> Comparing different data types can cause unexpected results or poor performance
            </p>
            <CodeExample
              title="Avoid implicit conversion"
              code={`-- SLOW: Forces type conversion on every row
SELECT * FROM orders WHERE CAST(order_id AS TEXT) = '123';

-- FAST: Use proper types
SELECT * FROM orders WHERE order_id = 123;`}
            />
          </Callout>

          <Callout type="warning" title="Pitfall #4: N+1 Query Problem">
            <p className="mb-2">
              <strong>Problem:</strong> Running separate queries for each result instead of using JOIN
            </p>
            <CodeExample
              title="Inefficient vs Efficient"
              code={`-- INEFFICIENT: Running N queries (one per customer)
-- In application code:
-- for customer in customers:
--     orders = query("SELECT * FROM orders WHERE customer_id = ?", customer.id)

-- EFFICIENT: Single query with JOIN
SELECT c.*, o.*
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;`}
            />
          </Callout>

          <Callout type="warning" title="Pitfall #5: Cartesian Product Accident">
            <p className="mb-2">
              <strong>Problem:</strong> Forgetting JOIN condition creates massive result sets
            </p>
            <CodeExample
              title="Accidental vs Intentional"
              code={`-- ACCIDENTAL CROSS JOIN: Forgot ON clause
-- If users has 1000 rows and orders has 10,000 rows = 10 million results!
SELECT * FROM users, orders;

-- INTENDED JOIN: Proper relationship
SELECT * FROM users u
JOIN orders o ON u.user_id = o.user_id;`}
            />
          </Callout>

          <Callout type="warning" title="Pitfall #6: COUNT(*) vs COUNT(column)">
            <p className="mb-2">
              <strong>Problem:</strong> Not understanding the difference between COUNT variants
            </p>
            <CodeExample
              title="Different behaviors"
              code={`-- COUNT(*): Counts all rows (includes NULLs)
SELECT COUNT(*) FROM users;  -- Returns 100

-- COUNT(column): Counts non-NULL values
SELECT COUNT(email) FROM users;  -- Returns 95 (5 have NULL email)

-- COUNT(DISTINCT column): Counts unique non-NULL values
SELECT COUNT(DISTINCT country) FROM users;  -- Returns 12`}
            />
          </Callout>
        </div>
      </Section>
    </>
  );
}

