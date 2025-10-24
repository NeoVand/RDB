import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, EMPTY_PRESET } from '../../lib/database/presets';

export function Part2_DataIntegrity() {
  return (
    <>
      <Section id="part2" title="Part II: The Principle of Order - Ensuring Data Integrity" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This part transitions from defining the structure of data to establishing the rules that ensure 
          the data remains clean, consistent, and reliable. This involves both the formal process of database 
          normalization and the practical application of constraints.
        </p>
      </Section>

      <Section id="section4" title="The Quest for Clean Data - Database Normalization" level={2}>
        <p>
          <strong>Database normalization</strong> is a systematic design technique used to organize the tables 
          and columns of a relational database to minimize data redundancy and improve data integrity.
        </p>

        <Subsection title="The Problem: Data Anomalies">
          <p>When a database is not properly normalized, it becomes susceptible to data anomalies:</p>
          
          <MermaidDiagram
            caption="Visual Representation of Data Anomalies in Denormalized Tables"
            chart={`
graph TB
    subgraph Problem["Denormalized Table Problems"]
        Denorm["Unnormalized Table<br/>CompanyName | SectorName | Revenue"]
        
        Denorm -->|"Leads to"| IA["Insertion Anomaly"]
        Denorm -->|"Leads to"| UA["Update Anomaly"]
        Denorm -->|"Leads to"| DA["Deletion Anomaly"]
    end
    
    subgraph Solution["Normalized Solution"]
        Norm1["Companies Table"]
        Norm2["Sectors Table"]
        Norm3["Statements Table"]
        
        Norm2 -->|"1:N"| Norm1
        Norm1 -->|"1:N"| Norm3
    end
    
    Problem -->|"Fix with Normalization"| Solution
    
    style IA fill:#fee2e2,stroke:#dc2626,color:#000
    style UA fill:#fef3c7,stroke:#d97706,color:#000
    style DA fill:#fed7aa,stroke:#ea580c,color:#000
    style Solution fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />
          
          <div className="space-y-3 my-4">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">Insertion Anomaly</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Cannot add a new record because unrelated data is not available. 
                    Example: Can't add a new sector until at least one company exists in it.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm mb-1">Update Anomaly</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Same information stored in multiple rows requires updating all copies. 
                    Example: Renaming 'Technology' to 'Information Technology' in every company record.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-4 rounded-r">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">Deletion Anomaly</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    Deleting data unintentionally causes loss of other data. 
                    Example: Deleting the last company in 'Energy' sector loses the sector itself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Subsection>

        <Subsection title="First Normal Form (1NF): The Rule of Atomicity">
          <p>
            A table is in <strong>First Normal Form (1NF)</strong> if:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Each column contains only <strong>atomic</strong> (indivisible) values</li>
            <li>Each row is uniquely identifiable (typically via a primary key)</li>
          </ol>

          <div className="my-6">
            <p className="font-semibold mb-2">Before 1NF (violates atomicity):</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th>CompanyName</th>
                    <th>LineItems</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple Inc.</td>
                    <td className="text-red-600 dark:text-red-400">Revenue: 383B, Net Income: 97B</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ❌ LineItems column contains multiple values (not atomic)
            </p>
          </div>

          <div className="my-6">
            <p className="font-semibold mb-2">After 1NF (atomic values):</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th>CompanyName</th>
                    <th>ItemName</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple Inc.</td>
                    <td>Revenue</td>
                    <td>383B</td>
                  </tr>
                  <tr>
                    <td>Apple Inc.</td>
                    <td>Net Income</td>
                    <td>97B</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ✅ Each cell contains a single, atomic value
            </p>
          </div>
        </Subsection>

        <Subsection title="Second Normal Form (2NF): Eliminating Partial Dependencies">
          <p>
            A table is in <strong>Second Normal Form (2NF)</strong> if it is in 1NF and every non-key attribute 
            is fully functionally dependent on the <em>entire</em> composite primary key (relevant only for 
            composite keys).
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            In simpler terms: No column should depend on only <em>part</em> of the primary key.
          </p>
        </Subsection>

        <Subsection title="Second Normal Form (2NF): Eliminating Partial Dependencies">
          <p>
            A table is in <strong>Second Normal Form (2NF)</strong> if it is in 1NF and every non-key attribute 
            is fully functionally dependent on the <em>entire</em> composite primary key (relevant only for 
            composite keys).
          </p>

          <MermaidDiagram
            caption="Partial Dependency Problem in 2NF"
            chart={`
graph TB
    subgraph Before["Before 2NF: Partial Dependencies"]
        PK["Composite PK:<br/>OrderID + ProductID"]
        PK --> A1["OrderDate<br/>depends on OrderID only"]
        PK --> A2["ProductName<br/>depends on ProductID only"]
        PK --> A3["Quantity<br/>depends on BOTH"]
    end
    
    subgraph After["After 2NF: Separate Tables"]
        T1["Orders<br/>OrderID, OrderDate"]
        T2["Products<br/>ProductID, ProductName"]
        T3["OrderItems<br/>OrderID, ProductID, Quantity"]
        
        T1 -->|"1:N"| T3
        T2 -->|"1:N"| T3
    end
    
    Before -->|"Normalize"| After
    
    style A1 fill:#fef3c7,stroke:#d97706,color:#000
    style A2 fill:#fef3c7,stroke:#d97706,color:#000
    style After fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            In simpler terms: No column should depend on only <em>part</em> of the primary key.
          </p>
        </Subsection>

        <Subsection title="Third Normal Form (3NF): Eliminating Transitive Dependencies">
          <p>
            A table is in <strong>Third Normal Form (3NF)</strong> if it is in 2NF and there are no transitive 
            dependencies. The rule: every non-key attribute must provide a fact about "the key, the whole key, 
            and nothing but the key."
          </p>

          <MermaidDiagram
            caption="Transitive Dependency Problem in 3NF"
            chart={`
graph LR
    subgraph Before["Before 3NF: Transitive Dependency"]
        direction TB
        C["Companies Table"]
        C --> D1["CompanyID → CompanyName ✓"]
        C --> D2["CompanyID → SectorName ✗"]
        C --> D3["SectorName → SectorDescription ✗"]
        
        D2 -.->|"Transitive"| D3
    end
    
    subgraph After["After 3NF: No Transitive Dependencies"]
        direction TB
        T1["Companies<br/>CompanyID, CompanyName, SectorID"]
        T2["Sectors<br/>SectorID, SectorName, Description"]
        
        T2 -->|"FK Reference"| T1
    end
    
    Before -->|"Normalize"| After
    
    style D2 fill:#fef3c7,stroke:#d97706,color:#000
    style D3 fill:#fef3c7,stroke:#d97706,color:#000
    style After fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Our normalized schema in 3NF
-- SectorName is NOT in Companies (would be transitive dependency)
-- Instead, Companies references Sectors via SectorID

SELECT
  c.CompanyName,
  c.StockTicker,
  s.SectorName
FROM Companies c
JOIN Sectors s ON c.SectorID = s.SectorID
ORDER BY s.SectorName, c.CompanyName;`}
          />
        </Subsection>

        <Subsection title="The Normalization Journey: Visual Summary">
          <MermaidDiagram
            caption="Progressive Normalization from Unnormalized to 3NF"
            chart={`
graph TD
    U["Unnormalized<br/>Repeating groups,<br/>Multi-valued fields"]
    
    U -->|"Remove repeating groups<br/>Ensure atomic values"| NF1["1NF<br/>Atomic values only<br/>Each row unique"]
    
    NF1 -->|"Remove partial<br/>dependencies"| NF2["2NF<br/>All attributes depend on<br/>entire composite key"]
    
    NF2 -->|"Remove transitive<br/>dependencies"| NF3["3NF<br/>No non-key attribute<br/>depends on another<br/>non-key attribute"]
    
    NF3 -->|"Eliminate all anomalies<br/>related to candidate keys"| BCNF["BCNF<br/>Every determinant<br/>is a candidate key"]
    
    style U fill:#fee2e2,stroke:#dc2626,color:#000
    style NF1 fill:#fef3c7,stroke:#d97706,color:#000
    style NF2 fill:#dbeafe,stroke:#2563eb,color:#000
    style NF3 fill:#d1fae5,stroke:#059669,color:#000
    style BCNF fill:#dcfce7,stroke:#16a34a,color:#000
            `}
          />
        </Subsection>
      </Section>

      <Section id="section5" title="The Rules of the Game - Constraints and Data Integrity" level={2}>
        <p>
          While normalization provides the theoretical blueprint, <strong>constraints</strong> are the practical 
          mechanisms that enforce these rules at the data level. Constraints are rules defined on columns or 
          tables that prevent invalid data from being entered.
        </p>

        <Subsection title="Entity Integrity (PRIMARY KEY, UNIQUE)">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>PRIMARY KEY:</strong> Guarantees unique, non-NULL identifier for each row
            </li>
            <li>
              <strong>UNIQUE:</strong> Ensures all values in a column are distinct (allows one NULL)
            </li>
          </ul>

          <CodeExample
            title="Creating a table with PRIMARY KEY and UNIQUE constraints"
            code={`CREATE TABLE Companies (
  CompanyID INTEGER PRIMARY KEY,
  CompanyName TEXT NOT NULL,
  StockTicker TEXT UNIQUE,
  SectorID INTEGER
);`}
          />
        </Subsection>

        <Subsection title="Domain Integrity (NOT NULL, CHECK, DEFAULT)">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>NOT NULL:</strong> Column cannot have NULL values</li>
            <li><strong>CHECK:</strong> Specifies a logical condition that must be true</li>
            <li><strong>DEFAULT:</strong> Assigns a default value when none is provided</li>
          </ul>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Create a table with domain constraints
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 18 AND age <= 100),
  status TEXT DEFAULT 'active'
);

-- This will work
INSERT INTO employees (id, name, age)
VALUES (1, 'Alice', 25);

-- Try inserting invalid data (age < 18) - will fail!
-- INSERT INTO employees (id, name, age) VALUES (2, 'Bob', 15);

SELECT * FROM employees;`}
          />
        </Subsection>

        <Subsection title="Referential Integrity (FOREIGN KEY)">
          <p>
            <strong>Foreign key constraints</strong> ensure that relationships between tables remain valid. 
            They prevent "orphaned" records by ensuring any foreign key value exists in the referenced table's 
            primary key.
          </p>

          <Callout type="info" title="Why enforce constraints at the database level?">
            Enforcing rules in application code alone is brittle—a new service might forget checks, 
            or manual data entry could bypass them. Database constraints create an unbreakable contract 
            that protects data integrity universally.
          </Callout>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Foreign keys maintain referential integrity
-- Try to query a company and its sector
SELECT
  c.CompanyName,
  s.SectorName
FROM Companies c
JOIN Sectors s ON c.SectorID = s.SectorID
WHERE c.CompanyID = 101;`}
          />
        </Subsection>

        <Subsection title="Cascading Actions: Managing Related Data">
          <p>
            When defining foreign key constraints, you can specify what happens to child records when 
            the parent record is updated or deleted:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Behavior</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">CASCADE</td>
                  <td>Automatically update/delete child records</td>
                  <td>Delete company → delete all its statements</td>
                </tr>
                <tr>
                  <td className="font-semibold">SET NULL</td>
                  <td>Set foreign key to NULL in child records</td>
                  <td>Delete manager → set employee.manager_id to NULL</td>
                </tr>
                <tr>
                  <td className="font-semibold">RESTRICT</td>
                  <td>Prevent the operation if children exist</td>
                  <td>Cannot delete sector if companies reference it</td>
                </tr>
                <tr>
                  <td className="font-semibold">NO ACTION</td>
                  <td>Similar to RESTRICT (check at end of transaction)</td>
                  <td>Default behavior in most databases</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeExample
            title="Defining cascading actions"
            code={`CREATE TABLE Financial_Statements (
  StatementID INTEGER PRIMARY KEY,
  CompanyID INTEGER NOT NULL,
  Year INTEGER,
  -- If company deleted, delete all its statements
  FOREIGN KEY (CompanyID) 
    REFERENCES Companies(CompanyID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`}
          />

          <Callout type="warning" title="Use CASCADE with caution">
            CASCADE can lead to unexpected data loss if not carefully planned. Always consider 
            the business implications before using ON DELETE CASCADE.
          </Callout>
        </Subsection>

        <Subsection title="Hands-On: Creating Tables with Constraints">
          <p>
            Let's practice creating tables with various constraints to ensure data integrity from the start.
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Create a comprehensive table with all constraint types
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  price DECIMAL(10, 2) CHECK (price >= 0),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active INTEGER DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Try inserting valid data
INSERT INTO products (sku, product_name, category, price, stock_quantity)
VALUES ('LAPTOP-001', 'Professional Laptop', 'Electronics', 1299.99, 10);

-- This will FAIL due to CHECK constraint (negative price)
-- INSERT INTO products (sku, product_name, price)
-- VALUES ('BAD-001', 'Bad Product', -100);

SELECT * FROM products;`}
          />

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- ALTER TABLE: Modifying table structure
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  salary NUMERIC
);

INSERT INTO employees VALUES
  (1, 'Alice', 75000),
  (2, 'Bob', 82000);

-- Add a new column
ALTER TABLE employees ADD COLUMN department TEXT DEFAULT 'Unassigned';

-- View the modified table
SELECT * FROM employees;

-- Update the new column
UPDATE employees SET department = 'Engineering' WHERE id = 1;
UPDATE employees SET department = 'Sales' WHERE id = 2;

SELECT * FROM employees;`}
          />

          <Callout type="info" title="ALTER TABLE Limitations in SQLite">
            SQLite has limited ALTER TABLE support compared to PostgreSQL or MySQL. You can:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>ADD COLUMN (with restrictions)</li>
              <li>RENAME TABLE</li>
              <li>RENAME COLUMN (SQLite 3.25+)</li>
              <li>DROP COLUMN (SQLite 3.35+)</li>
            </ul>
            For complex schema changes, you often need to create a new table and migrate data.
          </Callout>
        </Subsection>
      </Section>

      <Section id="section5b" title="Understanding Data Types - Choosing the Right Container" level={2}>
        <p>
          Selecting appropriate data types is a critical aspect of database design. Each type has specific 
          storage requirements, performance characteristics, and constraints that affect data integrity.
        </p>

        <Subsection title="Numeric Types">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Range/Precision</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">INTEGER</td>
                  <td>Whole numbers</td>
                  <td>-2,147,483,648 to 2,147,483,647</td>
                  <td>IDs, counts, years</td>
                </tr>
                <tr>
                  <td className="font-semibold">BIGINT</td>
                  <td>Large whole numbers</td>
                  <td>-9 quintillion to 9 quintillion</td>
                  <td>Large IDs, timestamps</td>
                </tr>
                <tr>
                  <td className="font-semibold">DECIMAL(p,s)</td>
                  <td>Exact decimal numbers</td>
                  <td>User-defined precision</td>
                  <td>Money, precise calculations</td>
                </tr>
                <tr>
                  <td className="font-semibold">REAL/FLOAT</td>
                  <td>Approximate decimals</td>
                  <td>~7 digits precision</td>
                  <td>Scientific data, approximations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="Critical: Never use FLOAT for money!">
            Floating-point types store approximate values and can introduce rounding errors. 
            Always use DECIMAL or NUMERIC for financial data. Example: 0.1 + 0.2 ≠ 0.3 in binary floating-point!
          </Callout>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Demonstrating numeric types
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price DECIMAL(10, 2),  -- Exact: $99,999,999.99
  weight REAL,            -- Approximate: ok for weight
  stock_count INTEGER     -- Whole numbers only
);

INSERT INTO products VALUES
  (1, 'Laptop', 1299.99, 2.5, 15),
  (2, 'Mouse', 29.99, 0.1, 250);

SELECT * FROM products;`}
          />
        </Subsection>

        <Subsection title="Text and String Types">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Max Length</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">CHAR(n)</td>
                  <td>Fixed-length string</td>
                  <td>Exactly n characters</td>
                  <td>Fixed codes (e.g., country codes)</td>
                </tr>
                <tr>
                  <td className="font-semibold">VARCHAR(n)</td>
                  <td>Variable-length string</td>
                  <td>Up to n characters</td>
                  <td>Names, emails, addresses</td>
                </tr>
                <tr>
                  <td className="font-semibold">TEXT</td>
                  <td>Unlimited text</td>
                  <td>Database-dependent (often 1-2GB)</td>
                  <td>Articles, descriptions, comments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>CHAR vs VARCHAR:</strong> CHAR pads with spaces to fixed length, VARCHAR stores only 
            the actual characters. VARCHAR is generally preferred unless you need fixed-width storage.
          </p>
        </Subsection>

        <Subsection title="Date and Time Types">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Stores</th>
                  <th>Format Example</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">DATE</td>
                  <td>Date only</td>
                  <td>2024-12-25</td>
                  <td>Birthdates, deadlines</td>
                </tr>
                <tr>
                  <td className="font-semibold">TIME</td>
                  <td>Time only</td>
                  <td>14:30:00</td>
                  <td>Business hours, schedules</td>
                </tr>
                <tr>
                  <td className="font-semibold">DATETIME</td>
                  <td>Date + Time</td>
                  <td>2024-12-25 14:30:00</td>
                  <td>Event timestamps</td>
                </tr>
                <tr>
                  <td className="font-semibold">TIMESTAMP</td>
                  <td>Date + Time + Timezone</td>
                  <td>Varies by database</td>
                  <td>Created/updated timestamps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Working with dates
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  event_name TEXT,
  event_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (id, event_name, event_date) VALUES
  (1, 'Product Launch', '2024-06-15'),
  (2, 'Annual Meeting', '2024-12-01');

-- Date arithmetic and functions
SELECT
  event_name,
  event_date,
  DATE('now') as today,
  JULIANDAY(event_date) - JULIANDAY('now') as days_until
FROM events;`}
          />
        </Subsection>

        <Subsection title="Special Types and NULL Handling">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BOOLEAN</h4>
              <p>
                Stores TRUE/FALSE values. In SQLite, typically stored as INTEGER (0 = false, 1 = true). 
                Other databases have native BOOLEAN types.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BLOB (Binary Large Object)</h4>
              <p>
                Stores binary data like images, PDFs, or encrypted data. Generally avoided in modern applications 
                (store files separately and keep references in the database).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">NULL: The Absence of Value</h4>
              <p>
                NULL represents unknown or missing data. It's not zero, not an empty string, but the absence of a value.
              </p>
            </div>
          </div>

          <Callout type="info" title="Three-Valued Logic">
            SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN (NULL). Comparisons with NULL always return UNKNOWN, 
            not TRUE or FALSE. Use IS NULL or IS NOT NULL to check for NULL values.
          </Callout>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Understanding NULL behavior
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,  -- NULLs allowed
  is_active INTEGER DEFAULT 1  -- Boolean as INT
);

INSERT INTO users (id, username, email, is_active) VALUES
  (1, 'alice', 'alice@example.com', 1),
  (2, 'bob', NULL, 1),  -- email is NULL (unknown)
  (3, 'charlie', 'charlie@example.com', 0);

-- NULL comparisons (notice how email = NULL doesn't work!)
SELECT
  username,
  email,
  email = NULL as wrong_null_check,  -- Always NULL!
  email IS NULL as correct_null_check,
  is_active as active
FROM users;

-- Only get users WITH email
SELECT username FROM users WHERE email IS NOT NULL;`}
          />

          <Callout type="warning" title="Common NULL Pitfalls">
            <ul className="list-disc pl-5 space-y-1">
              <li><code>WHERE column = NULL</code> never matches (use <code>IS NULL</code>)</li>
              <li><code>COUNT(*)</code> counts NULLs, but <code>COUNT(column)</code> doesn't</li>
              <li>NULL + anything = NULL, NULL * anything = NULL</li>
              <li>Use <code>COALESCE(column, default)</code> to provide fallback values</li>
            </ul>
          </Callout>
        </Subsection>
      </Section>
    </>
  );
}

