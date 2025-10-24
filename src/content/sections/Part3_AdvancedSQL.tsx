import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { CodeExample } from '../../components/Content/CodeExample';
import { EMPLOYEES_PRESET, ECOMMERCE_PRESET, UNIVERSITY_PRESET } from '../../lib/database/presets';

export function Part3_AdvancedSQL() {
  return (
    <>
      <Section id="section8b" title="Advanced SQL Features - Beyond the Basics" level={2}>
        <p>
          Once you've mastered basic queries and joins, SQL offers powerful advanced features that 
          enable complex analysis and data manipulation.
        </p>

        <Subsection title="CROSS JOIN: The Cartesian Product">
          <p>
            A <code>CROSS JOIN</code> produces the Cartesian product of two tables - every row from 
            the first table combined with every row from the second table. This results in 
            rows_in_table1 × rows_in_table2 total rows.
          </p>

          <MermaidDiagram
            caption="CROSS JOIN: Every Combination"
            chart={`
erDiagram
    TABLE_A {
        string value
    }
    TABLE_B {
        string value
    }
    RESULT {
        string a_value
        string b_value
    }
    
    TABLE_A ||--o{ RESULT : "crosses with"
    TABLE_B ||--o{ RESULT : "crosses with"
            `}
          />

          <Callout type="warning" title="Use with Caution">
            CROSS JOIN can create huge result sets quickly. If Table A has 100 rows and Table B has 
            1,000 rows, the result will have 100,000 rows! Use only when you genuinely need all combinations.
          </Callout>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- CROSS JOIN: Generate all product-customer combinations
-- (useful for recommendation systems or promotional targeting)

SELECT
  c.first_name || ' ' || c.last_name as customer,
  p.product_name,
  p.category,
  p.price
FROM customers c
CROSS JOIN products p
WHERE p.category = 'Electronics'
LIMIT 10;

-- Notice: 5 customers × 3 electronics = 15 combinations
-- We limited to 10 for display`}
          />
        </Subsection>

        <Subsection title="SELF JOIN: When a Table References Itself">
          <p>
            A <strong>SELF JOIN</strong> is when a table is joined to itself. This is commonly used 
            for hierarchical data, like employee-manager relationships, or for comparing rows within 
            the same table.
          </p>

          <MermaidDiagram
            caption="SELF JOIN Use Case: Employee-Manager Hierarchy"
            chart={`
graph TD
    CEO["CEO (no manager)"]
    VP1["VP Engineering<br/>reports to CEO"]
    VP2["VP Sales<br/>reports to CEO"]
    ENG1["Engineer 1<br/>reports to VP Eng"]
    ENG2["Engineer 2<br/>reports to VP Eng"]
    SALES1["Sales Rep<br/>reports to VP Sales"]
    
    CEO --> VP1
    CEO --> VP2
    VP1 --> ENG1
    VP1 --> ENG2
    VP2 --> SALES1
            `}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- First, add a manager_id column conceptually
-- (our employees table is simple, so we'll use a workaround)

-- SELF JOIN pattern: Find employees in the same department
SELECT
  e1.name as employee_1,
  e2.name as employee_2,
  e1.department as shared_department
FROM employees e1
JOIN employees e2
  ON e1.department = e2.department
  AND e1.id < e2.id  -- Avoid duplicate pairs
WHERE e1.department = 'Engineering'
ORDER BY e1.name;

-- This finds all pairs of engineers who work together`}
          />

          <Callout type="tip" title="Common SELF JOIN Uses">
            <ul className="list-disc pl-5 space-y-1">
              <li>Organizational hierarchies (employee → manager)</li>
              <li>Finding duplicates or similar records</li>
              <li>Comparing sequential records (previous vs current month)</li>
              <li>Graph traversal (nodes and edges in the same table)</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="CASE Expressions: Conditional Logic in SQL">
          <p>
            The <code>CASE</code> expression allows you to add if-then-else logic directly in your SQL queries,
            similar to switch statements in programming languages.
          </p>

          <CodeExample
            title="CASE Expression Syntax"
            code={`-- Simple CASE
CASE column_name
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  ELSE default_result
END

-- Searched CASE (more flexible)
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ELSE default_result
END`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Use CASE to categorize products and create price tiers
SELECT
  product_name,
  category,
  price,
  CASE
    WHEN price >= 1000 THEN 'Premium'
    WHEN price >= 100 THEN 'Standard'
    ELSE 'Budget'
  END as price_tier,
  CASE category
    WHEN 'Electronics' THEN 'Tech'
    WHEN 'Furniture' THEN 'Home'
    ELSE 'Other'
  END as category_group
FROM products
ORDER BY price DESC;`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- CASE in aggregation: Conditional counting (pivot table style)
SELECT
  category,
  COUNT(*) as total_products,
  SUM(CASE WHEN price >= 100 THEN 1 ELSE 0 END) as expensive_count,
  SUM(CASE WHEN price < 100 THEN 1 ELSE 0 END) as affordable_count,
  AVG(price) as avg_price
FROM products
GROUP BY category
ORDER BY total_products DESC;`}
          />
        </Subsection>

        <Subsection title="Set Operations: Combining Query Results">
          <p>
            Set operations allow you to combine the results of multiple SELECT statements. 
            Think of them as mathematical set operations applied to query results.
          </p>

          <MermaidDiagram
            caption="Set Operations Visualized"
            chart={`
graph TB
    subgraph UNION["UNION: Combines all unique rows"]
        U1["Query 1: A, B, C"]
        U2["Query 2: C, D, E"]
        U3["Result: A, B, C, D, E"]
        U1 --> U3
        U2 --> U3
    end
    
    subgraph INTERSECT["INTERSECT: Only rows in both"]
        I1["Query 1: A, B, C"]
        I2["Query 2: C, D, E"]
        I3["Result: C"]
        I1 --> I3
        I2 --> I3
    end
    
    subgraph EXCEPT["EXCEPT: Rows in first, not in second"]
        E1["Query 1: A, B, C"]
        E2["Query 2: C, D, E"]
        E3["Result: A, B"]
        E1 --> E3
        E2 --> E3
    end
    
    style U3 fill:#dbeafe,stroke:#2563eb,color:#000
    style I3 fill:#d1fae5,stroke:#059669,color:#000
    style E3 fill:#fef3c7,stroke:#d97706,color:#000
            `}
          />

          <CodeExample
            title="Set Operations Syntax"
            code={`-- UNION: Combines results, removes duplicates
SELECT column FROM table1
UNION
SELECT column FROM table2;

-- UNION ALL: Combines results, keeps duplicates (faster)
SELECT column FROM table1
UNION ALL
SELECT column FROM table2;

-- INTERSECT: Only rows present in both results
SELECT column FROM table1
INTERSECT
SELECT column FROM table2;

-- EXCEPT: Rows in first query but not in second
SELECT column FROM table1
EXCEPT
SELECT column FROM table2;`}
          />

          <SQLPlayground
            preset={UNIVERSITY_PRESET}
            defaultQuery={`-- Find students taking CS courses OR Math courses
SELECT name, major FROM university_students
WHERE major = 'Computer Science'
UNION
SELECT name, major FROM university_students
WHERE major = 'Mathematics';

-- Note: UNION automatically removes duplicates
-- (students who have both majors would appear once)`}
          />
        </Subsection>

        <Subsection title="Subqueries in Different Contexts">
          <p>
            Subqueries can appear in multiple parts of a SQL statement, each serving different purposes.
          </p>

          <div className="space-y-4 my-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Scalar Subquery (returns single value)
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Used in SELECT, WHERE, or anywhere a single value is expected.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Row Subquery (returns single row)
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Can be used with operators like =, &lt;, &gt; when comparing multiple columns.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Table Subquery (returns multiple rows)
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Used with IN, EXISTS, or in the FROM clause as a derived table.
              </p>
            </div>
          </div>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Subquery in SELECT: Calculate percentage of total
SELECT
  category,
  COUNT(*) as product_count,
  ROUND(
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM products),
    2
  ) as percentage_of_total
FROM products
GROUP BY category
ORDER BY product_count DESC;`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Subquery with EXISTS: Find customers who have placed orders
SELECT
  customer_id,
  first_name,
  last_name,
  email
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.customer_id
)
ORDER BY last_name;

-- EXISTS is efficient: stops at first match`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Derived table in FROM clause: Find high-value customers
SELECT
  customer_id,
  total_spent,
  CASE
    WHEN total_spent >= 1000 THEN 'VIP'
    WHEN total_spent >= 500 THEN 'Premium'
    ELSE 'Standard'
  END as customer_tier
FROM (
  SELECT
    customer_id,
    SUM(total_amount) as total_spent
  FROM orders
  GROUP BY customer_id
) as customer_spending
ORDER BY total_spent DESC;`}
          />
        </Subsection>

        <Subsection title="Common Table Expressions (CTEs): WITH Clause">
          <p>
            CTEs provide a way to write more readable queries by breaking complex logic into named,
            reusable subqueries. Think of them as temporary named result sets.
          </p>

          <Callout type="tip" title="Why Use CTEs?">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Readability:</strong> Break complex queries into logical steps</li>
              <li><strong>Reusability:</strong> Reference the same subquery multiple times</li>
              <li><strong>Maintainability:</strong> Easier to debug and modify</li>
              <li><strong>Recursion:</strong> CTEs can reference themselves (recursive CTEs)</li>
            </ul>
          </Callout>

          <CodeExample
            title="CTE Syntax"
            code={`WITH cte_name AS (
  SELECT column1, column2
  FROM table
  WHERE condition
)
SELECT * FROM cte_name;

-- Multiple CTEs
WITH 
  cte1 AS (SELECT ...),
  cte2 AS (SELECT ...)
SELECT * FROM cte1 JOIN cte2;`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- CTE Example: Analyze customer purchase behavior
WITH customer_stats AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name as customer_name,
    COUNT(o.order_id) as order_count,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.first_name, c.last_name
)
SELECT
  customer_name,
  order_count,
  ROUND(total_spent, 2) as total_spent,
  ROUND(avg_order_value, 2) as avg_order_value,
  CASE
    WHEN order_count >= 3 THEN 'Frequent'
    WHEN order_count >= 1 THEN 'Occasional'
    ELSE 'Never Purchased'
  END as customer_type
FROM customer_stats
ORDER BY total_spent DESC;`}
          />

          <SQLPlayground
            preset={UNIVERSITY_PRESET}
            defaultQuery={`-- Multiple CTEs: Complex university analysis
WITH
  -- CTE 1: Calculate course enrollment counts
  course_enrollment AS (
    SELECT
      course_id,
      COUNT(student_id) as enrolled_count
    FROM registrations
    GROUP BY course_id
  ),
  -- CTE 2: Get course details with professor
  course_details AS (
    SELECT
      c.course_id,
      c.course_name,
      c.credits,
      p.name as professor_name
    FROM courses c
    JOIN professors p ON c.professor_id = p.professor_id
  )
-- Main query: Combine the CTEs
SELECT
  cd.course_name,
  cd.professor_name,
  cd.credits,
  COALESCE(ce.enrolled_count, 0) as students_enrolled
FROM course_details cd
LEFT JOIN course_enrollment ce ON cd.course_id = ce.course_id
ORDER BY students_enrolled DESC;`}
          />
        </Subsection>

        <Subsection title="Window Functions: Analytics Powerhouse">
          <p>
            Window functions perform calculations across a set of rows that are related to the current row,
            without collapsing them into a single output row (unlike GROUP BY).
          </p>

          <MermaidDiagram
            caption="Window Functions: Calculations Over Partitions"
            chart={`
graph TB
    subgraph Data["Original Data"]
        D1["Product A | Electronics | 100"]
        D2["Product B | Electronics | 150"]
        D3["Product C | Furniture | 200"]
        D4["Product D | Furniture | 250"]
    end
    
    subgraph Window["Window Function Applied"]
        W1["PARTITION BY category"]
        W2["ORDER BY price"]
        W3["Calculate RANK() or AVG()"]
    end
    
    subgraph Result["Result: All Rows Preserved"]
        R1["Product A | Rank 1 | Avg 125"]
        R2["Product B | Rank 2 | Avg 125"]
        R3["Product C | Rank 1 | Avg 225"]
        R4["Product D | Rank 2 | Avg 225"]
    end
    
    Data --> Window
    Window --> Result
    
    style Result fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <CodeExample
            title="Window Function Syntax"
            code={`SELECT 
  column1,
  column2,
  FUNCTION() OVER (
    PARTITION BY column3
    ORDER BY column4
    ROWS BETWEEN start AND end
  ) as window_result
FROM table;

-- Common window functions:
-- ROW_NUMBER(), RANK(), DENSE_RANK()
-- SUM(), AVG(), COUNT()
-- LEAD(), LAG()
-- FIRST_VALUE(), LAST_VALUE()`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Window Functions: Ranking and running totals
SELECT
  product_name,
  category,
  price,
  -- Rank within category
  RANK() OVER (
    PARTITION BY category
    ORDER BY price DESC
  ) as price_rank_in_category,
  -- Running total of price
  SUM(price) OVER (
    ORDER BY price
  ) as running_total,
  -- Average price in category
  ROUND(AVG(price) OVER (
    PARTITION BY category
  ), 2) as category_avg_price
FROM products
ORDER BY category, price DESC;`}
          />

          <Callout type="info" title="Window Functions vs GROUP BY">
            <strong>GROUP BY:</strong> Collapses rows into groups (one row per group)
            <br />
            <strong>Window Functions:</strong> Preserve all rows while adding calculated columns
            <br /><br />
            Use window functions when you need row-level detail WITH aggregate information.
          </Callout>
        </Subsection>
      </Section>
    </>
  );
}

