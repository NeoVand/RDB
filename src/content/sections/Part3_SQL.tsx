import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, EMPLOYEES_PRESET, EMPTY_PRESET } from '../../lib/database/presets';

export function Part3_SQL() {
  return (
    <>
      <Section id="part3" title="Part III: The Language of Data - Mastering SQL" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This part transitions from the theory and design of databases to the practical language used to 
          create, manipulate, and retrieve data from them: Structured Query Language (SQL).
        </p>
      </Section>

      <Section id="section6" title="Introduction to SQL - Speaking to the Database" level={2}>
        <p>
          <strong>Structured Query Language (SQL)</strong> is the standard, domain-specific programming language 
          used to communicate with and manage data held in a relational database management system (RDBMS).
        </p>

        <Subsection title='The Declarative Approach ("What," not "How")'>
          <p>
            SQL is a <strong>declarative language</strong>. This means you specify <em>what</em> data you want 
            to retrieve or modify, rather than providing step-by-step instructions for <em>how</em> to accomplish 
            the task.
          </p>

          <CodeExample
            title="Example: Declarative SQL query"
            code={`SELECT CompanyName
FROM Companies
WHERE SectorID = (
  SELECT SectorID 
  FROM Sectors 
  WHERE SectorName = 'Technology'
);`}
          />

          <p>
            You simply declare the desired outcome—the database's <strong>query optimizer</strong> determines 
            the most efficient execution plan to retrieve the requested data.
          </p>
        </Subsection>

        <Subsection title="The Sublanguages of SQL">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Sublanguage</th>
                  <th>Purpose</th>
                  <th>Commands</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">DDL</td>
                  <td>Data Definition Language</td>
                  <td>CREATE, ALTER, DROP</td>
                </tr>
                <tr>
                  <td className="font-semibold">DML</td>
                  <td>Data Manipulation Language</td>
                  <td>INSERT, UPDATE, DELETE</td>
                </tr>
                <tr>
                  <td className="font-semibold">DQL</td>
                  <td>Data Query Language</td>
                  <td>SELECT</td>
                </tr>
                <tr>
                  <td className="font-semibold">DCL</td>
                  <td>Data Control Language</td>
                  <td>GRANT, REVOKE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      <Section id="section7" title="The Four Horsemen of DML - CRUD Operations" level={2}>
        <p>
          The four fundamental operations that form the basis of most data interaction are <strong>Create, 
          Read, Update, and Delete</strong>, often abbreviated as CRUD.
        </p>

        <Subsection title="CREATE (INSERT)">
          <p>
            The <code>INSERT INTO</code> statement adds new rows of data into a table.
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- First, create a table
CREATE TABLE Companies (
  CompanyID INTEGER PRIMARY KEY,
  CompanyName TEXT NOT NULL,
  StockTicker TEXT UNIQUE
);

-- Insert a single row
INSERT INTO Companies (CompanyID, CompanyName, StockTicker)
VALUES (101, 'Apple Inc.', 'AAPL');

-- Insert multiple rows at once
INSERT INTO Companies (CompanyID, CompanyName, StockTicker) VALUES
  (102, 'Microsoft Corp.', 'MSFT'),
  (103, 'NVIDIA Corp.', 'NVDA');

-- View the results
SELECT * FROM Companies;`}
          />

          <Callout type="tip" title="INSERT Best Practices">
            <ul className="list-disc pl-5 space-y-1">
              <li>Always specify column names (don't rely on column order)</li>
              <li>Use multi-row INSERT for better performance when adding multiple records</li>
              <li>Validate data before INSERT to avoid constraint violations</li>
              <li>Consider using transactions when inserting related data across tables</li>
            </ul>
          </Callout>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Advanced INSERT: Insert from SELECT (copy data)
CREATE TABLE source_products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price DECIMAL(10, 2)
);

INSERT INTO source_products VALUES
  (1, 'Widget', 19.99),
  (2, 'Gadget', 29.99),
  (3, 'Gizmo', 39.99);

-- Create destination table
CREATE TABLE archived_products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price DECIMAL(10, 2),
  archived_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT from SELECT: copy expensive products
INSERT INTO archived_products (id, name, price)
SELECT id, name, price
FROM source_products
WHERE price > 25;

-- Verify the copy
SELECT * FROM archived_products;`}
          />
        </Subsection>

        <Subsection title="READ (SELECT)">
          <p>
            The <code>SELECT</code> statement retrieves data from one or more tables. It's the most frequently 
            used command in SQL.
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Select all columns
SELECT * FROM employees;

-- Select specific columns with filtering
SELECT name, department, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;

-- Aggregate functions
SELECT
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary
FROM employees
GROUP BY department;`}
          />
        </Subsection>

        <Subsection title="UPDATE (UPDATE)">
          <p>
            The <code>UPDATE</code> statement modifies existing records in a table.
          </p>
          
          <Callout type="warning" title="Critical Warning">
            Always use a WHERE clause with UPDATE! Without it, ALL rows will be updated.
          </Callout>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- View current data
SELECT * FROM employees WHERE name = 'Alice Smith';

-- Update a specific employee's salary
UPDATE employees
SET salary = 95000
WHERE name = 'Alice Smith';

-- View the updated data
SELECT * FROM employees WHERE name = 'Alice Smith';`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Bulk UPDATE: Give 10% raise to all Engineering employees
-- First, see current Engineering salaries
SELECT name, department, salary FROM employees
WHERE department = 'Engineering';

-- Apply bulk update
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Engineering';

-- Verify the changes
SELECT name, department, salary FROM employees
WHERE department = 'Engineering';`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- UPDATE with multiple columns and complex conditions
UPDATE employees
SET
  salary = salary * 1.15,
  department = 'Senior ' || department
WHERE salary > 80000
  AND hire_date < '2020-01-01';

-- View employees affected
SELECT * FROM employees
WHERE department LIKE 'Senior%';`}
          />
        </Subsection>

        <Subsection title="DELETE (DELETE)">
          <p>
            The <code>DELETE</code> statement removes one or more rows from a table.
          </p>

          <Callout type="warning" title="Critical Warning">
            Always use a WHERE clause with DELETE! Without it, ALL rows will be deleted.
          </Callout>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- View all employees
SELECT * FROM employees;

-- Delete a specific employee
DELETE FROM employees
WHERE name = 'Eve Davis';

-- View remaining employees
SELECT * FROM employees;`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Bulk DELETE: Remove all employees from a department
-- Count employees in Sales before deletion
SELECT COUNT(*) as sales_count FROM employees
WHERE department = 'Sales';

-- Delete all Sales employees
DELETE FROM employees
WHERE department = 'Sales';

-- Verify deletion
SELECT COUNT(*) as sales_count FROM employees
WHERE department = 'Sales';`}
          />

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- DELETE vs TRUNCATE (demonstration)
CREATE TABLE test_data (
  id INTEGER PRIMARY KEY,
  value TEXT
);

INSERT INTO test_data VALUES (1, 'A'), (2, 'B'), (3, 'C');

-- DELETE: Removes specific rows (or all with no WHERE)
DELETE FROM test_data WHERE id > 1;
SELECT * FROM test_data;  -- Only id=1 remains

-- Re-populate
INSERT INTO test_data VALUES (2, 'B'), (3, 'C');

-- In SQLite, no TRUNCATE command exists
-- Use DELETE without WHERE to remove all rows
DELETE FROM test_data;
SELECT * FROM test_data;  -- Empty table

-- Note: In PostgreSQL/MySQL, you would use:
-- TRUNCATE TABLE test_data;  -- Faster than DELETE for all rows`}
          />
        </Subsection>

        <Subsection title="DELETE with Subqueries">
          <p>
            You can use subqueries to identify which rows to delete based on complex conditions.
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Delete employees with below-average salary
-- First, see who will be affected
SELECT name, salary,
  (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees
WHERE salary < (SELECT AVG(salary) FROM employees);

-- Uncomment to execute the deletion:
-- DELETE FROM employees
-- WHERE salary < (SELECT AVG(salary) FROM employees);`}
          />
        </Subsection>
      </Section>

      <Section id="section8" title="Asking Complex Questions - Advanced Querying" level={2}>
        <p>
          The true power of SQL lies in its ability to answer complex questions by combining, filtering, 
          and summarizing data from multiple tables.
        </p>

        <Subsection title="Connecting the Dots: JOINs">
          <p>
            A <code>JOIN</code> clause combines rows from two or more tables based on a related column between them.
            Understanding the different types of JOINs is crucial for effective data retrieval.
          </p>

          <MermaidDiagram
            caption="JOIN Types Visual Comparison (Venn Diagram Style)"
            chart={`
graph TB
    subgraph INNER["INNER JOIN"]
        I1["Table A"] 
        I2["Table B"]
        I3["Result: Only<br/>matching rows<br/>from both"]
        I1 -.-> I3
        I2 -.-> I3
    end
    
    subgraph LEFT["LEFT JOIN (LEFT OUTER)"]
        L1["Table A<br/>(All rows)"] 
        L2["Table B<br/>(Matching only)"]
        L3["Result: All A +<br/>matching B<br/>(NULL if no match)"]
        L1 --> L3
        L2 -.-> L3
    end
    
    subgraph RIGHT["RIGHT JOIN (RIGHT OUTER)"]
        R1["Table A<br/>(Matching only)"] 
        R2["Table B<br/>(All rows)"]
        R3["Result: All B +<br/>matching A<br/>(NULL if no match)"]
        R1 -.-> R3
        R2 --> R3
    end
    
    subgraph FULL["FULL OUTER JOIN"]
        F1["Table A"] 
        F2["Table B"]
        F3["Result: All rows<br/>from both tables<br/>(NULL for non-matches)"]
        F1 --> F3
        F2 --> F3
    end
    
    style I3 fill:#dbeafe,stroke:#2563eb,color:#000
    style L3 fill:#d1fae5,stroke:#059669,color:#000
    style R3 fill:#fef3c7,stroke:#d97706,color:#000
    style F3 fill:#e9d5ff,stroke:#9333ea,color:#000
            `}
          />

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>JOIN Type</th>
                  <th>Description</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">INNER JOIN</td>
                  <td>Returns only matching records from both tables</td>
                  <td>Find companies WITH financial statements</td>
                </tr>
                <tr>
                  <td className="font-semibold">LEFT JOIN</td>
                  <td>Returns all records from left table, matched records from right (or NULL)</td>
                  <td>List all companies, show statements if they exist</td>
                </tr>
                <tr>
                  <td className="font-semibold">RIGHT JOIN</td>
                  <td>Returns all records from right table, matched records from left (or NULL)</td>
                  <td>Rarely used (use LEFT JOIN instead)</td>
                </tr>
                <tr>
                  <td className="font-semibold">FULL OUTER JOIN</td>
                  <td>Returns all records when there is a match in either table</td>
                  <td>Compare two datasets, find all differences</td>
                </tr>
                <tr>
                  <td className="font-semibold">CROSS JOIN</td>
                  <td>Cartesian product - every row from A with every row from B</td>
                  <td>Generate all possible combinations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <MermaidDiagram
            caption="INNER JOIN vs LEFT JOIN: Practical Difference"
            chart={`
graph LR
    subgraph Example["Companies & Statements Example"]
        direction TB
        C["Companies: 5 rows"]
        S["Statements: 3 rows<br/>(Only 3 companies<br/>have filed)"]
    end
    
    subgraph InnerResult["INNER JOIN Result"]
        IR["3 rows<br/>(Only companies<br/>WITH statements)"]
    end
    
    subgraph LeftResult["LEFT JOIN Result"]
        LR["5 rows<br/>(All companies,<br/>NULLs for 2)"]
    end
    
    Example --> InnerResult
    Example --> LeftResult
    
    style IR fill:#dbeafe,stroke:#2563eb,color:#000
    style LR fill:#d1fae5,stroke:#059669,color:#000
            `}
          />

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- INNER JOIN: Companies with their sectors
SELECT
  c.CompanyName,
  c.StockTicker,
  s.SectorName
FROM Companies c
INNER JOIN Sectors s ON c.SectorID = s.SectorID;

-- Complex JOIN across multiple tables
SELECT
  c.CompanyName,
  fs.Year,
  li.ItemName,
  li.Value
FROM Companies c
INNER JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
INNER JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE c.CompanyName = 'Apple Inc.'
  AND fs.Year = 2024
  AND li.ItemName IN ('Revenue', 'Net Income');`}
          />
        </Subsection>

        <Subsection title="Summarizing Information: Aggregate Functions">
          <p>
            Aggregate functions perform calculations on a set of rows and return a single summary value.
          </p>

          <MermaidDiagram
            caption="How Aggregate Functions Work"
            chart={`
graph TB
    subgraph Input["Input: Multiple Rows"]
        R1["Row 1: Value = 100"]
        R2["Row 2: Value = 200"]
        R3["Row 3: Value = 150"]
        R4["Row 4: Value = 175"]
    end
    
    subgraph Process["Aggregate Function Applied"]
        COUNT["COUNT(*) = 4"]
        SUM["SUM(Value) = 625"]
        AVG["AVG(Value) = 156.25"]
        MIN["MIN(Value) = 100"]
        MAX["MAX(Value) = 200"]
    end
    
    subgraph Output["Output: Single Value"]
        Result["One row with<br/>aggregated result"]
    end
    
    Input --> Process
    Process --> Output
    
    style Output fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
            {['COUNT()', 'SUM()', 'AVG()', 'MIN()', 'MAX()'].map((func) => (
              <div key={func} className="bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-700">
                <code className="font-semibold text-blue-600 dark:text-blue-400">{func}</code>
              </div>
            ))}
          </div>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Aggregate functions in action
SELECT
  COUNT(DISTINCT CompanyID) AS total_companies,
  AVG(Value) AS average_revenue
FROM Line_Items
WHERE ItemName = 'Revenue';

-- GROUP BY: aggregate per group
SELECT
  s.SectorName,
  COUNT(c.CompanyID) AS company_count,
  AVG(li.Value) AS avg_revenue
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'
GROUP BY s.SectorName;`}
          />
        </Subsection>

        <Subsection title="GROUP BY and HAVING">
          <p>
            <strong>GROUP BY</strong> groups rows with the same values in specified columns. 
            <strong>HAVING</strong> filters groups (unlike WHERE which filters individual rows).
          </p>

          <MermaidDiagram
            caption="GROUP BY: Organizing Data into Buckets"
            chart={`
graph TB
    subgraph Input["All Rows (Mixed Sectors)"]
        R1["Apple | Tech | 383B"]
        R2["Microsoft | Tech | 211B"]
        R3["JPMorgan | Finance | 158B"]
        R4["Goldman | Finance | 47B"]
    end
    
    subgraph GroupBy["GROUP BY SectorName"]
        G1["Tech Group:<br/>Apple, Microsoft"]
        G2["Finance Group:<br/>JPMorgan, Goldman"]
    end
    
    subgraph Aggregate["Apply Aggregate Functions"]
        A1["Tech: AVG = 297B"]
        A2["Finance: AVG = 102.5B"]
    end
    
    Input --> GroupBy
    GroupBy --> Aggregate
    
    style GroupBy fill:#dbeafe,stroke:#2563eb,color:#000
    style Aggregate fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <MermaidDiagram
            caption="WHERE vs HAVING: Different Filtering Stages"
            chart={`
graph LR
    Start["Original Table"] 
    
    Start -->|"1. WHERE<br/>(Filter Rows)"| Filtered["Filtered Rows"]
    
    Filtered -->|"2. GROUP BY<br/>(Create Groups)"| Grouped["Grouped Data"]
    
    Grouped -->|"3. Aggregate<br/>(Calculate)"| Aggregated["Group Results"]
    
    Aggregated -->|"4. HAVING<br/>(Filter Groups)"| Final["Final Result"]
    
    style Filtered fill:#fef3c7,stroke:#d97706,color:#000
    style Final fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <Callout type="info" title="Key Distinction">
            WHERE filters rows <em>before</em> grouping; HAVING filters groups <em>after</em> aggregation.
          </Callout>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Use WHERE and HAVING together
SELECT
  s.SectorName,
  AVG(li.Value) AS avg_net_income
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE
  li.ItemName = 'Net Income'  -- Filter rows first
GROUP BY
  s.SectorName
HAVING
  AVG(li.Value) > 50000000000;  -- Filter groups after aggregation`}
          />
        </Subsection>

        <Subsection title="Subqueries">
          <p>
            A <strong>subquery</strong> is a query nested inside another query, allowing for multi-step logic.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Scalar subquery (returns single value)
SELECT CompanyName, StockTicker
FROM Companies
WHERE SectorID = (
  SELECT SectorID
  FROM Sectors
  WHERE SectorName = 'Technology'
);

-- Subquery with IN
SELECT ItemName, Value
FROM Line_Items
WHERE StatementID IN (
  SELECT StatementID
  FROM Financial_Statements
  WHERE Year = 2024
);`}
          />
        </Subsection>

        <Subsection title="SQL Query Execution Order">
          <p>
            Understanding the logical order in which SQL processes a query is fundamental to mastering SQL.
            The order you <em>write</em> the query is different from how the database <em>executes</em> it:
          </p>

          <MermaidDiagram
            caption="Logical SQL Query Execution Order (How Database Actually Processes)"
            chart={`
graph TD
    Start["SQL Query Written"] --> Step1
    
    Step1["1. FROM & JOIN<br/>Identify and combine tables"] --> Step2
    Step2["2. WHERE<br/>Filter individual rows<br/>(before grouping)"] --> Step3
    Step3["3. GROUP BY<br/>Organize rows into groups"] --> Step4
    Step4["4. HAVING<br/>Filter groups<br/>(after aggregation)"] --> Step5
    Step5["5. SELECT<br/>Choose columns and<br/>create aliases"] --> Step6
    Step6["6. DISTINCT<br/>Remove duplicate rows"] --> Step7
    Step7["7. ORDER BY<br/>Sort the result set"] --> Step8
    Step8["8. LIMIT/OFFSET<br/>Paginate results"] --> End
    
    End["Final Result Set"]
    
    style Step1 fill:#fee2e2,stroke:#dc2626,color:#000
    style Step2 fill:#fed7aa,stroke:#ea580c,color:#000
    style Step3 fill:#fef3c7,stroke:#d97706,color:#000
    style Step4 fill:#fef9c3,stroke:#ca8a04,color:#000
    style Step5 fill:#dbeafe,stroke:#2563eb,color:#000
    style Step6 fill:#e0e7ff,stroke:#6366f1,color:#000
    style Step7 fill:#ddd6fe,stroke:#8b5cf6,color:#000
    style Step8 fill:#fce7f3,stroke:#db2777,color:#000
    style End fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <Callout type="info" title="Why This Matters">
            <ul className="list-disc pl-5 space-y-1">
              <li>Column aliases defined in SELECT cannot be used in WHERE (WHERE executes first!)</li>
              <li>Column aliases CAN be used in ORDER BY (ORDER BY executes after SELECT)</li>
              <li>Aggregate functions can't be used in WHERE, only in HAVING</li>
              <li>HAVING can reference aggregates because it runs after GROUP BY</li>
            </ul>
          </Callout>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Demonstrating execution order
SELECT
  s.SectorName,
  COUNT(*) as company_count,  -- Alias defined here
  AVG(li.Value) as avg_revenue
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'  -- Can't use avg_revenue here!
GROUP BY s.SectorName
HAVING COUNT(*) >= 2  -- Filter groups
ORDER BY avg_revenue DESC;  -- CAN use alias here!`}
          />

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            This explains why column aliases defined in SELECT can't be used in WHERE, but CAN be used in ORDER BY.
          </p>
        </Subsection>
      </Section>
    </>
  );
}

