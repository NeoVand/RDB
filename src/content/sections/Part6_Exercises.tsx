import { Section } from '../../components/Content/Section';
import { Exercise } from '../../components/Exercise';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, ECOMMERCE_PRESET, UNIVERSITY_PRESET } from '../../lib/database/presets';

export function Part6_Exercises() {
  return (
    <>
      <Section id="part6" title="Part VI: Practice Makes Perfect - Guided Exercises" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The best way to master SQL is through practice. This section provides hands-on exercises 
          progressing from beginner to advanced, with hints and solutions to guide your learning.
        </p>

        <Callout type="tip" title="How to Use These Exercises">
          <ul className="list-disc pl-5 space-y-1">
            <li>Try solving each exercise on your own first</li>
            <li>Use hints progressively if you get stuck</li>
            <li>Compare your solution with the provided answer</li>
            <li>Experiment with variations of the queries</li>
          </ul>
        </Callout>
      </Section>

      <Section id="section13" title="Beginner Exercises - SELECT and Basic Filtering" level={2}>
        <p>
          These exercises focus on fundamental SELECT statements, WHERE clauses, and basic data retrieval.
        </p>

        <Exercise
          title="Exercise 1: Simple SELECT"
          description="Retrieve all sectors from the database and display their IDs and names."
          preset={FINANCIAL_FULL_PRESET}
          hints={[
            "Use SELECT to specify which columns you want",
            "The table name is 'Sectors'",
            "You need two columns: SectorID and SectorName"
          ]}
          solution={`SELECT SectorID, SectorName
FROM Sectors;`}
          solutionExplanation="This query selects specific columns from the Sectors table. Using column names instead of * is a best practice as it's more explicit and performs better."
        />

        <Exercise
          title="Exercise 2: Filtering with WHERE"
          description="Find all companies in the 'Technology' sector. Display the company name and stock ticker."
          preset={FINANCIAL_FULL_PRESET}
          hints={[
            "You'll need to JOIN Companies and Sectors tables",
            "Use the WHERE clause to filter by SectorName",
            "Connect tables using their foreign key relationship (SectorID)"
          ]}
          expectedOutput={`CompanyName         StockTicker
Apple Inc.          AAPL
Microsoft Corp.     MSFT
NVIDIA Corp.        NVDA`}
          solution={`SELECT 
  c.CompanyName,
  c.StockTicker
FROM Companies c
JOIN Sectors s ON c.SectorID = s.SectorID
WHERE s.SectorName = 'Technology';`}
          solutionExplanation="We join Companies with Sectors to access the SectorName, then filter using WHERE. Table aliases (c, s) make the query more readable."
        />

        <Exercise
          title="Exercise 3: Counting and Aggregation"
          description="Count how many companies exist in each sector."
          preset={FINANCIAL_FULL_PRESET}
          hints={[
            "Use COUNT() aggregate function",
            "GROUP BY the sector information",
            "Join Companies and Sectors tables"
          ]}
          expectedOutput={`SectorName           CompanyCount
Technology           3
Financial Services   2`}
          solution={`SELECT 
  s.SectorName,
  COUNT(c.CompanyID) as CompanyCount
FROM Sectors s
LEFT JOIN Companies c ON s.SectorID = c.SectorID
GROUP BY s.SectorName
ORDER BY CompanyCount DESC;`}
          solutionExplanation="LEFT JOIN ensures we include sectors even if they have no companies. GROUP BY groups results by sector, and COUNT counts companies in each group."
        />

        <Exercise
          title="Exercise 4: Sorting Results"
          description="List all products from the e-commerce database, ordered by price from highest to lowest. Show product name, category, and price."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use ORDER BY to sort results",
            "DESC means descending (highest first)",
            "Select from the products table"
          ]}
          solution={`SELECT 
  product_name,
  category,
  price
FROM products
ORDER BY price DESC;`}
          solutionExplanation="ORDER BY price DESC sorts results with highest prices first. ASC (ascending) is the default if you omit DESC."
        />

        <Exercise
          title="Exercise 5: Pattern Matching with LIKE"
          description="Find all customers whose last name starts with 'S'."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use the LIKE operator for pattern matching",
            "% is a wildcard that matches any characters",
            "S% means 'starts with S'"
          ]}
          solution={`SELECT 
  customer_id,
  first_name,
  last_name,
  email
FROM customers
WHERE last_name LIKE 'S%'
ORDER BY last_name;`}
          solutionExplanation="LIKE 'S%' matches any last name starting with S. The % wildcard represents zero or more characters."
        />
      </Section>

      <Section id="section14" title="Intermediate Exercises - Joins and Subqueries" level={2}>
        <p>
          These exercises involve more complex queries with multiple tables, subqueries, and aggregations.
        </p>

        <Exercise
          title="Exercise 6: Multi-Table JOIN"
          description="Find all order details including customer name, product name, quantity, and unit price. Show results for customer 'John Doe' only."
          preset={ECOMMERCE_PRESET}
          hints={[
            "You need to join 4 tables: customers, orders, order_items, products",
            "Link them through their foreign key relationships",
            "Filter by customer name in the WHERE clause"
          ]}
          solution={`SELECT 
  c.first_name || ' ' || c.last_name as customer_name,
  p.product_name,
  oi.quantity,
  oi.unit_price,
  oi.quantity * oi.unit_price as line_total
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE c.first_name = 'John' AND c.last_name = 'Doe'
ORDER BY o.order_date;`}
          solutionExplanation="This query chains multiple JOINs to connect related tables. We calculate line_total by multiplying quantity × unit_price."
        />

        <Exercise
          title="Exercise 7: Subquery with IN"
          description="Find all students who are enrolled in any Computer Science course (courses with code starting with 'CS')."
          preset={UNIVERSITY_PRESET}
          hints={[
            "Use a subquery to find CS course IDs",
            "Use IN to check if student is registered for those courses",
            "DISTINCT ensures each student appears only once"
          ]}
          solution={`SELECT DISTINCT
  s.student_id,
  s.name,
  s.major
FROM university_students s
JOIN registrations r ON s.student_id = r.student_id
WHERE r.course_id IN (
  SELECT course_id
  FROM courses
  WHERE course_code LIKE 'CS%'
)
ORDER BY s.name;`}
          solutionExplanation="The subquery finds all CS course IDs, then the main query finds students registered for those courses. DISTINCT prevents duplicate student listings."
        />

        <Exercise
          title="Exercise 8: GROUP BY with HAVING"
          description="Find product categories that have an average price greater than $50. Show category name and average price."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use AVG() to calculate average price",
            "GROUP BY category",
            "HAVING filters groups (not individual rows)"
          ]}
          solution={`SELECT 
  category,
  ROUND(AVG(price), 2) as avg_price,
  COUNT(*) as product_count
FROM products
GROUP BY category
HAVING AVG(price) > 50
ORDER BY avg_price DESC;`}
          solutionExplanation="HAVING filters after grouping, unlike WHERE which filters before. We use HAVING to filter groups by their aggregate values."
        />

        <Exercise
          title="Exercise 9: LEFT JOIN to Find Missing Relationships"
          description="Find all customers who have never placed an order."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use LEFT JOIN to keep all customers",
            "Check for NULL in the orders table columns",
            "WHERE order_id IS NULL finds customers with no orders"
          ]}
          solution={`SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`}
          solutionExplanation="LEFT JOIN includes all customers. WHERE o.order_id IS NULL identifies customers with no matching orders (NULLs from the LEFT JOIN)."
        />

        <Exercise
          title="Exercise 10: Calculating Year-over-Year Growth"
          description="Compare company revenues between 2023 and 2024. Show company name, 2023 revenue, 2024 revenue, and growth amount."
          preset={FINANCIAL_FULL_PRESET}
          hints={[
            "Use SELF JOIN on Financial_Statements for different years",
            "Join with Line_Items to get revenue values",
            "Calculate growth as 2024 revenue - 2023 revenue"
          ]}
          solution={`SELECT 
  c.CompanyName,
  li_2023.Value as revenue_2023,
  li_2024.Value as revenue_2024,
  li_2024.Value - li_2023.Value as growth
FROM Companies c
JOIN Financial_Statements fs_2023 ON c.CompanyID = fs_2023.CompanyID
JOIN Financial_Statements fs_2024 ON c.CompanyID = fs_2024.CompanyID
JOIN Line_Items li_2023 ON fs_2023.StatementID = li_2023.StatementID
JOIN Line_Items li_2024 ON fs_2024.StatementID = li_2024.StatementID
WHERE fs_2023.Year = 2023
  AND fs_2024.Year = 2024
  AND li_2023.ItemName = 'Revenue'
  AND li_2024.ItemName = 'Revenue'
ORDER BY growth DESC;`}
          solutionExplanation="We join the Financial_Statements table to itself to compare different years for the same company, then calculate the growth difference."
        />
      </Section>

      <Section id="section15" title="Advanced Exercises - Real-World Scenarios" level={2}>
        <p>
          These advanced exercises simulate real-world business problems requiring complex queries and analytical thinking.
        </p>

        <Exercise
          title="Exercise 11: Customer Segmentation with CASE"
          description="Create a customer segmentation report. Classify customers as 'High Value' (>$1000 spent), 'Medium Value' ($500-$1000), or 'Low Value' (<$500). Include customer name, total spent, and segment."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Calculate total spending per customer using SUM and GROUP BY",
            "Use CASE expression for segmentation logic",
            "Consider customers with no orders (use LEFT JOIN)"
          ]}
          solution={`SELECT 
  c.first_name || ' ' || c.last_name as customer_name,
  COALESCE(SUM(o.total_amount), 0) as total_spent,
  CASE
    WHEN COALESCE(SUM(o.total_amount), 0) >= 1000 THEN 'High Value'
    WHEN COALESCE(SUM(o.total_amount), 0) >= 500 THEN 'Medium Value'
    ELSE 'Low Value'
  END as segment
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC;`}
          solutionExplanation="COALESCE handles customers with no orders (returns 0 instead of NULL). The CASE expression creates segments based on spending thresholds."
        />

        <Exercise
          title="Exercise 12: Product Performance Analysis"
          description="Find the top 3 most profitable products. Calculate total profit for each product (revenue - cost, assuming cost is 60% of price). Show product name, units sold, revenue, and profit."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Join order_items with products to get pricing",
            "Calculate revenue as sum of (quantity × unit_price)",
            "Profit = revenue × 0.4 (if cost is 60%, margin is 40%)",
            "Use LIMIT 3 to get top 3"
          ]}
          solution={`SELECT 
  p.product_name,
  SUM(oi.quantity) as units_sold,
  SUM(oi.quantity * oi.unit_price) as total_revenue,
  SUM(oi.quantity * oi.unit_price) * 0.4 as estimated_profit
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY estimated_profit DESC
LIMIT 3;`}
          solutionExplanation="We aggregate sales data at the product level, calculate revenue from order items, and estimate profit assuming a 40% margin."
        />

        <Exercise
          title="Exercise 13: Course Enrollment Analysis with Window Functions"
          description="For each course, show the course name, number of enrolled students, and how it ranks compared to other courses in the same department (by enrollment). Assume department is derived from the course code prefix (CS, MATH, PHYS, CHEM)."
          preset={UNIVERSITY_PRESET}
          hints={[
            "Extract department from course_code using SUBSTR",
            "Count enrollments per course",
            "Use RANK() window function partitioned by department"
          ]}
          solution={`WITH course_enrollments AS (
  SELECT 
    c.course_code,
    c.course_name,
    SUBSTR(c.course_code, 1, 
      CASE 
        WHEN INSTR(c.course_code, '1') > 0 
        THEN INSTR(c.course_code, '1') - 1
        ELSE LENGTH(c.course_code)
      END
    ) as department,
    COUNT(r.student_id) as student_count
  FROM courses c
  LEFT JOIN registrations r ON c.course_id = r.course_id
  GROUP BY c.course_id, c.course_code, c.course_name
)
SELECT 
  course_name,
  department,
  student_count,
  RANK() OVER (
    PARTITION BY department 
    ORDER BY student_count DESC
  ) as rank_in_dept
FROM course_enrollments
ORDER BY department, rank_in_dept;`}
          solutionExplanation="We use a CTE to calculate enrollments, then apply a window function to rank courses within their department. PARTITION BY creates separate ranking groups for each department."
        />

        <Exercise
          title="Exercise 14: Finding Data Quality Issues"
          description="Identify potential data quality issues in the orders table: orders with status 'shipped' or 'delivered' but with total_amount of 0 or NULL, and orders older than a certain date still marked as 'pending'."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use UNION to combine two different issue types",
            "Check for NULL using IS NULL",
            "Use descriptive labels to identify the issue type"
          ]}
          solution={`-- Issue 1: Completed orders with zero/null amounts
SELECT 
  order_id,
  customer_id,
  order_date,
  total_amount,
  status,
  'Zero/NULL amount on completed order' as issue_type
FROM orders
WHERE status IN ('shipped', 'delivered')
  AND (total_amount IS NULL OR total_amount = 0)

UNION ALL

-- Issue 2: Old pending orders (more than 5 days old)
SELECT 
  order_id,
  customer_id,
  order_date,
  total_amount,
  status,
  'Stale pending order' as issue_type
FROM orders
WHERE status = 'pending'
  AND JULIANDAY('now') - JULIANDAY(order_date) > 5
  
ORDER BY order_date;`}
          solutionExplanation="This query identifies two types of data quality issues using UNION ALL. Each query returns the same columns for compatibility. This pattern is useful for data auditing."
        />

        <Exercise
          title="Exercise 15: Cohort Analysis - First Purchase Month"
          description="Group customers by the month of their first purchase. For each cohort (month), show the cohort date, number of customers, and total revenue generated by that cohort."
          preset={ECOMMERCE_PRESET}
          hints={[
            "Use MIN(order_date) to find first purchase per customer",
            "Use STRFTIME to format dates to year-month",
            "GROUP BY the cohort month"
          ]}
          solution={`WITH customer_first_purchase AS (
  SELECT 
    customer_id,
    STRFTIME('%Y-%m', MIN(order_date)) as cohort_month
  FROM orders
  GROUP BY customer_id
),
cohort_revenue AS (
  SELECT 
    cfp.cohort_month,
    COUNT(DISTINCT cfp.customer_id) as customers_in_cohort,
    SUM(o.total_amount) as total_revenue
  FROM customer_first_purchase cfp
  JOIN orders o ON cfp.customer_id = o.customer_id
  GROUP BY cfp.cohort_month
)
SELECT 
  cohort_month,
  customers_in_cohort,
  ROUND(total_revenue, 2) as total_revenue,
  ROUND(total_revenue / customers_in_cohort, 2) as avg_revenue_per_customer
FROM cohort_revenue
ORDER BY cohort_month;`}
          solutionExplanation="Cohort analysis groups customers by when they first engaged. We use CTEs to first identify each customer's cohort, then aggregate revenue by cohort. This is valuable for understanding customer lifetime value by acquisition period."
        />
      </Section>
    </>
  );
}

