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
          
          <Callout type="warning" title="⚠️ Critical Warning">
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
        </Subsection>

        <Subsection title="DELETE (DELETE)">
          <p>
            The <code>DELETE</code> statement removes one or more rows from a table.
          </p>

          <Callout type="warning" title="⚠️ Critical Warning">
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
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>JOIN Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">INNER JOIN</td>
                  <td>Returns only matching records from both tables</td>
                </tr>
                <tr>
                  <td className="font-semibold">LEFT JOIN</td>
                  <td>Returns all records from left table, matched records from right (or NULL)</td>
                </tr>
                <tr>
                  <td className="font-semibold">RIGHT JOIN</td>
                  <td>Returns all records from right table, matched records from left (or NULL)</td>
                </tr>
                <tr>
                  <td className="font-semibold">FULL OUTER JOIN</td>
                  <td>Returns all records when there is a match in either table</td>
                </tr>
              </tbody>
            </table>
          </div>

          <MermaidDiagram
            caption="Visualizing JOIN operations"
            chart={`
graph LR
    A[Table A]
    B[Table B]
    C[INNER JOIN]
    D[LEFT JOIN]
    A --> C
    B --> C
    A --> D
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
            Understanding the logical order in which SQL processes a query is fundamental to mastering SQL:
          </p>

          <MermaidDiagram
            caption="Logical SQL Query Execution Order"
            chart={`
graph TD
    A[1. FROM & JOIN] --> B[2. WHERE]
    B --> C[3. GROUP BY]
    C --> D[4. HAVING]
    D --> E[5. SELECT]
    E --> F[6. ORDER BY]
            `}
          />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            This explains why column aliases defined in SELECT can't be used in WHERE, but CAN be used in ORDER BY.
          </p>
        </Subsection>
      </Section>
    </>
  );
}

