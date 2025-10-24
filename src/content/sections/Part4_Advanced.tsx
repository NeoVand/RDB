import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, EMPLOYEES_PRESET, EMPTY_PRESET } from '../../lib/database/presets';

export function Part4_Advanced() {
  return (
    <>
      <Section id="part4" title="Part IV: The Professional's Toolkit - Advanced Concepts" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This part elevates the discussion to the level of system design, focusing on the guarantees, 
          performance characteristics, and strategic decisions that define professional database architecture.
        </p>
      </Section>

      <Section id="section9" title="The Transactional Guarantee - ACID Properties" level={2}>
        <p>
          In the context of a database, a <strong>transaction</strong> is a sequence of operations performed 
          as a single, logical unit of work. For a transaction to be considered complete, all of its operations 
          must succeed. If any operation fails, the entire transaction is rolled back.
        </p>

        <Subsection title="The ACID Properties">
          <MermaidDiagram
            caption="Transaction Lifecycle: From BEGIN to COMMIT or ROLLBACK"
            chart={`
stateDiagram-v2
    [*] --> Active: BEGIN TRANSACTION
    
    Active --> PartiallyCommitted: All operations complete
    Active --> Failed: Operation error
    
    PartiallyCommitted --> Committed: COMMIT
    PartiallyCommitted --> Failed: Commit error
    
    Failed --> Aborted: ROLLBACK
    
    Committed --> [*]: Changes permanent
    Aborted --> [*]: Changes undone
    
    note right of Active
        Operations being executed
        Changes in memory only
    end note
    
    note right of Committed
        Changes written to disk
        DURABILITY guaranteed
    end note
    
    note right of Aborted
        All changes rolled back
        ATOMICITY preserved
    end note
            `}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">Atomicity</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    All operations in a transaction succeed or none do. It's an "all or nothing" proposition.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Consistency</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Transactions can only bring the database from one valid state to another, maintaining all rules and constraints.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-1">Isolation</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Concurrent transactions don't interfere with each other. Each appears to run in isolation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">Durability</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    Once a transaction is committed, it remains committed permanently, even after system failure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MermaidDiagram
            caption="Isolation Levels: Balancing Concurrency vs Consistency"
            chart={`
graph TB
    subgraph Levels["Isolation Levels (Strictest to Most Permissive)"]
        L1["SERIALIZABLE<br/>No concurrency issues<br/>Slowest performance"]
        L2["REPEATABLE READ<br/>Prevents dirty & non-repeatable<br/>Allows phantom reads"]
        L3["READ COMMITTED<br/>Prevents dirty reads only<br/>Default in many DBs"]
        L4["READ UNCOMMITTED<br/>No protection<br/>Fastest but risky"]
    end
    
    subgraph Issues["Concurrency Problems Prevented"]
        I1["Dirty Reads"]
        I2["Non-Repeatable Reads"]
        I3["Phantom Reads"]
    end
    
    L1 -.->|"Prevents"| I1
    L1 -.->|"Prevents"| I2
    L1 -.->|"Prevents"| I3
    
    L2 -.->|"Prevents"| I1
    L2 -.->|"Prevents"| I2
    
    L3 -.->|"Prevents"| I1
    
    style L1 fill:#dcfce7,stroke:#16a34a,color:#000
    style L4 fill:#fee2e2,stroke:#dc2626,color:#000
            `}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Transactions ensure ACID properties
BEGIN TRANSACTION;

-- Update salary
UPDATE employees SET salary = 100000 WHERE name = 'Alice Smith';

-- Simulate work...
SELECT * FROM employees WHERE name = 'Alice Smith';

-- Rollback to undo changes
ROLLBACK;

-- Verify rollback worked
SELECT * FROM employees WHERE name = 'Alice Smith';`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Commit to make changes permanent
BEGIN TRANSACTION;

UPDATE employees SET salary = 100000 WHERE name = 'Alice Smith';

-- Commit the changes
COMMIT;

-- Changes are now permanent
SELECT * FROM employees WHERE name = 'Alice Smith';`}
          />
        </Subsection>

        <Subsection title="Isolation Levels Explained">
          <p>
            Isolation levels define how transaction changes are visible to other concurrent transactions.
            Different levels provide different trade-offs between consistency and performance.
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Dirty Reads</th>
                  <th>Non-Repeatable Reads</th>
                  <th>Phantom Reads</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">READ UNCOMMITTED</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-green-600 dark:text-green-400">Fastest</td>
                </tr>
                <tr>
                  <td className="font-semibold">READ COMMITTED</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-amber-600 dark:text-amber-400">Fast</td>
                </tr>
                <tr>
                  <td className="font-semibold">REPEATABLE READ</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-red-600 dark:text-red-400">Possible</td>
                  <td className="text-amber-600 dark:text-amber-400">Moderate</td>
                </tr>
                <tr>
                  <td className="font-semibold">SERIALIZABLE</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-green-600 dark:text-green-400">Prevented</td>
                  <td className="text-red-600 dark:text-red-400">Slowest</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 my-6">
            <Callout type="info" title="Dirty Read">
              Transaction A reads uncommitted changes from Transaction B. If B rolls back, A has read invalid data.
            </Callout>

            <Callout type="info" title="Non-Repeatable Read">
              Transaction A reads a row, Transaction B updates it and commits, Transaction A reads again and gets different data.
            </Callout>

            <Callout type="info" title="Phantom Read">
              Transaction A runs a query, Transaction B inserts rows matching A's query, Transaction A runs the same query and sees new rows appear.
            </Callout>
          </div>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Demonstrating transaction isolation
-- Scenario: Two transactions updating the same data

-- Transaction 1: Update salary
BEGIN TRANSACTION;
UPDATE employees SET salary = 90000 WHERE name = 'Alice Smith';

-- At this point, changes are not committed
-- Other transactions won't see this change (READ COMMITTED+)
SELECT salary FROM employees WHERE name = 'Alice Smith';

COMMIT;

-- Now the change is visible to all transactions
SELECT salary FROM employees WHERE name = 'Alice Smith';`}
          />
        </Subsection>

        <Subsection title="Practical Transaction Examples">
          <p>
            Real-world scenarios where transactions are essential for maintaining data integrity.
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Banking Example: Transfer money between accounts
CREATE TABLE accounts (
  account_id INTEGER PRIMARY KEY,
  account_holder TEXT NOT NULL,
  balance DECIMAL(10, 2) NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts VALUES
  (1, 'Alice', 1000.00),
  (2, 'Bob', 500.00);

-- Transfer $200 from Alice to Bob (BOTH must succeed)
BEGIN TRANSACTION;

-- Debit from Alice
UPDATE accounts
SET balance = balance - 200
WHERE account_id = 1;

-- Credit to Bob
UPDATE accounts
SET balance = balance + 200
WHERE account_id = 2;

-- Verify both changes before committing
SELECT * FROM accounts;

-- If everything looks good, commit
COMMIT;

-- Final verification
SELECT * FROM accounts;`}
          />

          <Callout type="success" title="ACID in Action">
            This transaction demonstrates all ACID properties:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Atomicity:</strong> Both updates succeed or both fail</li>
              <li><strong>Consistency:</strong> Total balance stays the same ($1500)</li>
              <li><strong>Isolation:</strong> Other transactions don't see partial transfer</li>
              <li><strong>Durability:</strong> After COMMIT, changes survive system crash</li>
            </ul>
          </Callout>
        </Subsection>
      </Section>

      <Section id="section10" title="Performance and Optimization" level={2}>
        <p>
          As datasets grow, the efficiency of data retrieval becomes paramount. Performance optimization 
          is a critical discipline for any database professional.
        </p>

        <Subsection title="Understanding Indexes">
          <p>
            An <strong>index</strong> is a special data structure that speeds up data retrieval operations. 
            Without an index, the database must scan every row. With an index, it can go directly to the desired data.
          </p>

          <Callout type="tip" title="Analogy">
            An index is like the index in the back of a book—you can find a specific topic without reading every page.
          </Callout>

          <MermaidDiagram
            caption="B-Tree Index Structure (Simplified)"
            chart={`
graph TD
    Root[Root: 50]
    Root --> L1[Node: 20, 35]
    Root --> R1[Node: 70, 85]
    L1 --> L2[Leaf: 10, 15]
    L1 --> M2[Leaf: 25, 30]
    L1 --> R2[Leaf: 40, 45]
    R1 --> L3[Leaf: 60, 65]
    R1 --> M3[Leaf: 75, 80]
    R1 --> R3[Leaf: 90, 95]
            `}
          />

          <CodeExample
            title="Creating an index"
            code={`-- Create an index on a frequently queried column
CREATE INDEX idx_company_name ON Companies(CompanyName);

-- Create a composite index
CREATE INDEX idx_statement_year_company 
ON Financial_Statements(Year, CompanyID);`}
          />
        </Subsection>

        <Subsection title="Query Optimization Best Practices">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Avoid SELECT *:</strong> Only select columns you actually need
            </li>
            <li>
              <strong>Use indexes wisely:</strong> Index frequently queried columns
            </li>
            <li>
              <strong>Filter early with WHERE:</strong> Reduce the working dataset as soon as possible
            </li>
            <li>
              <strong>Avoid functions on indexed columns:</strong> Use <code>WHERE date &gt;= '2024-01-01'</code> 
              instead of <code>WHERE YEAR(date) = 2024</code>
            </li>
            <li>
              <strong>Use EXISTS over IN for large subqueries:</strong> EXISTS can stop at first match
            </li>
          </ul>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Good: Select only needed columns
SELECT CompanyName, StockTicker
FROM Companies
WHERE SectorID = 1;

-- Better: Use specific conditions
SELECT c.CompanyName, li.Value
FROM Companies c
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'
  AND fs.Year = 2024;`}
          />
        </Subsection>
      </Section>

      <Section id="section11" title="The Architect's Perspective - Strategic Design" level={2}>
        <Subsection title="Views: Stored Queries for Simplicity">
          <p>
            A <strong>VIEW</strong> is a stored, named SELECT query that can be queried like a regular table. 
            It's a virtual table whose contents are defined by a query.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Create a view for latest company revenues
CREATE VIEW LatestCompanyRevenue AS
SELECT
  c.CompanyName,
  li.Value AS Revenue,
  fs.Year
FROM Companies c
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue';

-- Query the view like a regular table
SELECT * FROM LatestCompanyRevenue
WHERE Year = 2024
ORDER BY Revenue DESC;`}
          />
        </Subsection>

        <Subsection title="Normalization vs. Denormalization">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Normalized</th>
                  <th>Denormalized</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Read Performance</td>
                  <td>Slower (more JOINs)</td>
                  <td className="text-green-600 dark:text-green-400">Faster (fewer JOINs)</td>
                </tr>
                <tr>
                  <td className="font-semibold">Write Performance</td>
                  <td className="text-green-600 dark:text-green-400">Faster (single location)</td>
                  <td>Slower (update redundant data)</td>
                </tr>
                <tr>
                  <td className="font-semibold">Data Integrity</td>
                  <td className="text-green-600 dark:text-green-400">High</td>
                  <td>Lower (risk of inconsistency)</td>
                </tr>
                <tr>
                  <td className="font-semibold">Use Case</td>
                  <td>OLTP (transactions)</td>
                  <td>OLAP (analytics/reporting)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <MermaidDiagram
            caption="OLTP vs OLAP: Different Workloads, Different Designs"
            chart={`
graph TB
    subgraph OLTP["OLTP: Online Transaction Processing"]
        O1["Characteristics:<br/>• Many short transactions<br/>• INSERT, UPDATE, DELETE heavy<br/>• Current data<br/>• Normalized schema"]
        O2["Examples:<br/>• E-commerce checkout<br/>• Banking transactions<br/>• Order entry<br/>• User registration"]
        O3["Optimized for:<br/>• Data integrity<br/>• Write performance<br/>• Concurrent users<br/>• ACID compliance"]
    end
    
    subgraph OLAP["OLAP: Online Analytical Processing"]
        A1["Characteristics:<br/>• Complex queries<br/>• SELECT heavy<br/>• Historical data<br/>• Denormalized/star schema"]
        A2["Examples:<br/>• Business intelligence<br/>• Data warehouses<br/>• Reporting dashboards<br/>• Trend analysis"]
        A3["Optimized for:<br/>• Read performance<br/>• Aggregations<br/>• Complex joins<br/>• Large datasets"]
    end
    
    style OLTP fill:#dbeafe,stroke:#2563eb,color:#000
    style OLAP fill:#fef3c7,stroke:#d97706,color:#000
            `}
          />

          <p>
            <strong>OLTP (Online Transaction Processing):</strong> Systems like e-commerce checkouts or 
            banking apps that require high data integrity and frequent writes. These benefit from normalization.
          </p>
          <p>
            <strong>OLAP (Online Analytical Processing):</strong> Data warehouses and BI dashboards that 
            prioritize fast reads for complex analytics. These often use denormalization.
          </p>
        </Subsection>

        <Subsection title="Common Database Design Pitfalls">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Poor planning and documentation</li>
            <li>Ignoring normalization (leading to anomalies)</li>
            <li>Inconsistent naming standards</li>
            <li>Neglecting database constraints</li>
            <li>Insufficient or improper indexing</li>
            <li>The N+1 query problem</li>
          </ul>
        </Subsection>
      </Section>
    </>
  );
}

