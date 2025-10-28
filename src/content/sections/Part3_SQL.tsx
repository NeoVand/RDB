import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { CRUDFigure } from '../../components/Content/CRUDFigure';
import { JoinFigure } from '../../components/Content/JoinFigure';
import { WindowFunctionFigure } from '../../components/Content/WindowFunctionFigure';
import { IndexFigure } from '../../components/Content/IndexFigure';
import { 
  EMPLOYEES_PRESET, 
  EMPTY_PRESET,
  ECOMMERCE_PRESET,
  FINANCIAL_FULL_PRESET,
  INDEX_DEMO_PRESET
} from '../../lib/database/presets';

export function Part3_SQL() {
  return (
    <>
      <Section id="part3" title="Part III: Mastering SQL - The Language of Data" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Having established the theoretical foundations and design principles of relational databases in Parts I and II,
          we now turn to the practical language that brings these concepts to life: <strong>Structured Query Language (SQL)</strong>.
          This part will take you from fundamental operations to advanced techniques, with a deep understanding of how SQL
          actually works under the hood, and how to leverage modern AI tools to accelerate your SQL development.
        </p>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          SQL is more than just syntax—it's a declarative paradigm that has powered data-driven applications for over four decades.
          By the end of this part, you'll not only write sophisticated queries but understand the internals of query execution,
          optimization strategies, and how to prompt AI assistants effectively for SQL development.
        </p>
      </Section>

      {/* SECTION 1: Introduction to SQL */}
      <Section id="section6" title="Introduction to SQL - The Universal Language of Data" level={2}>
        <p>
          <strong>Structured Query Language (SQL)</strong> is the standard language for interacting with relational database
          management systems (RDBMS). Whether you're querying a small SQLite database on your phone or a massive PostgreSQL
          cluster serving millions of users, SQL is the common tongue.
        </p>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> For the fascinating origin story of SQL and its creators Donald Chamberlin and Raymond Boyce,
          see the historical note in{' '}
          <a href="#section1" className="text-blue-600 dark:text-blue-400 hover:underline">Part I</a>.
        </p>

        <p className="mt-6">
          What makes SQL remarkable is its longevity and ubiquity. The SQL you learn today will remain relevant for decades,
          as it has since the 1970s. While programming languages come and go, SQL endures.
        </p>

        <Subsection title='The Declarative Paradigm: "What," Not "How"'>
          <p>
            SQL is fundamentally different from imperative programming languages like Python, Java, or C++. It's a{' '}
            <strong>declarative language</strong>, meaning you describe <em>what</em> result you want, not <em>how</em>{' '}
            to compute it.
          </p>

          <Callout type="tip" title="Analogy: Ordering Food vs. Cooking">
            <p>
              Think of SQL like ordering at a restaurant. You don't tell the chef <em>how</em> to make your meal
              ("First, heat the pan to 350°F, then sauté the onions for 3 minutes..."). Instead, you simply declare
              <em>what</em> you want: "I'll have the salmon with roasted vegetables."
            </p>
            <p className="mt-2">
              The chef (database query optimizer) decides the most efficient way to prepare your order based on available
              ingredients, equipment, and expertise. Similarly, SQL lets you declare your data requirements, and the database
              engine determines the optimal execution plan.
            </p>
          </Callout>

          <p className="mt-4">
            Let's see this in action with a simple example:
          </p>

          <CodeExample
            title="Declarative SQL Query"
            code={`-- Find all technology companies founded after 2000
SELECT CompanyName, Founded, StockTicker
FROM Companies
WHERE SectorID = (
  SELECT SectorID 
  FROM Sectors 
  WHERE SectorName = 'Technology'
)
AND Founded > 2000
ORDER BY Founded ASC;`}
          />

          <p className="mt-4">
            Notice what we <em>didn't</em> specify: which index to use, how to scan the table, whether to use a hash join
            or nested loop, what order to execute the subquery, or where the data is physically stored. The database's{' '}
            <strong>query optimizer</strong> handles all of these implementation details automatically.
          </p>
        </Subsection>

        <p className="mt-6">
          This declarative nature is SQL's superpower. It provides a stable, logical interface that remains unchanged
          even as database internals evolve. Physical storage can move from hard drives to SSDs, indexes can be restructured,
          and query optimizers can improve—all without breaking your SQL code.
        </p>

        <Subsection title="SQL Timeline: From SEQUEL to Modern SQL">
          <p>
            SQL's evolution over five decades reflects the changing needs of data management:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100">
                    Year
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100">
                    Milestone
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100">
                    Key Features
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-700 dark:text-blue-400">
                    1974
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SEQUEL Prototype
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    IBM System R - first implementation
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-700 dark:text-blue-400">
                    1979
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    Renamed to SQL
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    Oracle releases first commercial RDBMS
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-700 dark:text-blue-400">
                    1986
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL-86 (ANSI)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    First official standardization
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-purple-700 dark:text-purple-400">
                    1992
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL-92
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    Major expansion: integrity constraints, schema manipulation
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-purple-700 dark:text-purple-400">
                    1999
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL:1999
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    Triggers, recursive queries, regular expressions
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-purple-700 dark:text-purple-400">
                    2003
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL:2003
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    Window functions, XML support, MERGE statement
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-indigo-700 dark:text-indigo-400">
                    2006-2016
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL:2006-2016
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    JSON support, temporal databases, pattern matching
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-indigo-700 dark:text-indigo-400">
                    2023
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                    SQL:2023
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    Graph queries, property graphs, multi-dimensional arrays
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
              SQL Evolution Timeline: Five Decades of Innovation
            </p>
          </div>

          <p className="mt-4">
            Each SQL standard adds new features while maintaining backward compatibility—a testament to SQL's robust design.
            However, real-world SQL implementations vary by vendor, which brings us to an important distinction.
          </p>
        </Subsection>

        <Callout type="info" title="SQL Dialects and SQLite">
          <p>
            While ANSI/ISO SQL provides a common standard, each database system has its own <strong>dialect</strong>:
            PostgreSQL, MySQL, SQL Server, Oracle, and SQLite all implement the standard differently and add vendor-specific extensions.
          </p>
          <p className="mt-2">
            In this course, our interactive playgrounds use <strong>SQLite</strong>, a lightweight, serverless database engine.
            SQLite is an excellent learning environment and powers billions of devices worldwide (it's in your phone, browser, and operating system).
          </p>
          <p className="mt-2">
            We'll note when features differ across dialects, but the core SQL concepts you learn here translate to any RDBMS.
          </p>
        </Callout>

        <Subsection title="The Sublanguages of SQL">
          <p>
            SQL is actually a collection of sublanguages, each serving a specific purpose. Understanding these categories
            helps you grasp SQL's comprehensive nature:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Sublanguage</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Full Name</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Purpose</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Key Commands</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">DDL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Definition Language</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Define and modify database structure</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">CREATE, ALTER, DROP</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">DML</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Manipulation Language</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Modify data within tables</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">INSERT, UPDATE, DELETE</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">DQL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Query Language</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Retrieve data from tables</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">SELECT</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">DCL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Control Language</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Control access and permissions</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">GRANT, REVOKE</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">TCL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Transaction Control Language</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Manage database transactions</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">BEGIN, COMMIT, ROLLBACK</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            In this part, we'll focus primarily on <strong>DQL</strong> (querying data), <strong>DML</strong> (manipulating data),
            and touch on <strong>DDL</strong> (creating structures) and <strong>TCL</strong> (transactions). DCL is typically
            covered in database administration courses.
          </p>
        </Subsection>

        <p className="mt-6">
          Now that we understand what SQL is and where it came from, let's write our first query:
        </p>

        <SQLPlayground
          preset={EMPTY_PRESET}
          defaultQuery={`-- Your first SQL query: Hello, World!
-- This demonstrates SQL's declarative nature

SELECT 'Hello, SQL!' AS message;

-- Try modifying the message or adding more columns:
SELECT 
  'Hello, SQL!' AS greeting,
  'Welcome to Part III' AS subtitle,
  2024 AS year;`}
        />

        <p className="mt-4">
          Simple, yet profound. With just a few words, you've instructed the database to return data. No loops, no variables,
          no explicit memory management—just a clear declaration of intent. This is the essence of SQL.
        </p>
      </Section>

      {/* SECTION 2: CRUD Operations - The Foundation */}
      <Section id="section7" title="CRUD Operations - The Foundation of Data Manipulation" level={2}>
        <p>
          Let's start building your practical SQL skills! Every database interaction ultimately boils down to four fundamental
          operations, collectively known as <strong> CRUD</strong>: <strong>Create</strong>, <strong>Read</strong>,{' '}
          <strong>Update</strong>, and <strong>Delete</strong>. These are the building blocks of all data manipulation.
        </p>

        <CRUDFigure />

        <p className="mt-4">
          These operations correspond to SQL's Data Manipulation Language (DML) commands. Master these, and you'll be able to
          handle the vast majority of real-world database tasks. In this section, we'll not only learn the syntax but also
          explore best practices, common pitfalls, and how to leverage AI assistance for writing better SQL.
        </p>

        <p className="mt-4">
          Let's see these operations in action with concrete examples. Throughout this section, we'll use actual tables with real data
          to make each concept crystal clear. If anything seems confusing, remember that the interactive playgrounds are there for you
          to experiment—jump ahead and try the queries yourself!
        </p>

        <Subsection title="CREATE: Adding Data with INSERT">
          <p>
            The <code>INSERT INTO</code> statement adds new rows to a table. Let's see what this looks like with actual data.
          </p>

          <p className="mt-4">
            Imagine you have an <strong>Employees</strong> table. Here's what happens when you insert a new employee:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Before INSERT */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Before INSERT</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob Smith</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Sales</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">78000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">2 rows in table</p>
            </div>

            {/* After INSERT */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">After INSERT</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob Smith</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Sales</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">78000</td>
                    </tr>
                    <tr className="bg-green-50 dark:bg-green-900/30">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Carol Williams</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Marketing</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">82000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">3 rows in table</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>INSERT INTO Employees (EmployeeID, Name, Department, Salary) VALUES (3, 'Carol Williams', 'Marketing', 82000);</code>
            <br />✅ <strong>Result:</strong> A new row (highlighted in green) is added to the table. The existing rows remain unchanged.
          </p>

          <p className="mt-6">
            Now let's learn the syntax and see it in action:
          </p>

          <CodeExample
            title="INSERT Statement Syntax"
            code={`-- Basic syntax: explicitly specify columns (recommended)
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);

-- Multi-row INSERT (efficient for bulk operations)
INSERT INTO table_name (column1, column2, column3)
VALUES 
  (value1a, value2a, value3a),
  (value1b, value2b, value3b),
  (value1c, value2c, value3c);

-- INSERT from SELECT (copy data from another query)
INSERT INTO destination_table (col1, col2)
SELECT col_a, col_b
FROM source_table
WHERE condition;`}
          />

          <p className="mt-4">
            Let's see INSERT in action with a practical example:
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- First, create a table to insert data into
CREATE TABLE Companies (
  CompanyID INTEGER PRIMARY KEY,
  CompanyName TEXT NOT NULL,
  StockTicker TEXT UNIQUE,
  Founded INTEGER,
  SectorID INTEGER
);

-- Insert a single company
INSERT INTO Companies (CompanyID, CompanyName, StockTicker, Founded, SectorID)
VALUES (101, 'Apple Inc.', 'AAPL', 1976, 1);

-- View what we just inserted
SELECT * FROM Companies;

-- Now add more companies using multi-row INSERT (more efficient)
INSERT INTO Companies (CompanyID, CompanyName, StockTicker, Founded, SectorID)
VALUES 
  (102, 'Microsoft Corporation', 'MSFT', 1975, 1),
  (103, 'Alphabet Inc.', 'GOOGL', 1998, 1),
  (104, 'NVIDIA Corporation', 'NVDA', 1993, 1);

-- View all companies
SELECT CompanyName, StockTicker, Founded 
FROM Companies 
ORDER BY Founded;`}
          />

          <Callout type="tip" title="INSERT Best Practices">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Always specify column names:</strong> Don't rely on column order. It makes your code fragile when the table structure changes.</li>
              <li><strong>Use multi-row INSERT for bulk operations:</strong> Inserting 1000 rows with one statement is dramatically faster than 1000 separate INSERTs.</li>
              <li><strong>Validate data before INSERT:</strong> Check for constraint violations (NULL, UNIQUE, CHECK) before attempting the insert to provide better error messages.</li>
              <li><strong>Use transactions for related inserts:</strong> When inserting data across multiple related tables, wrap them in a transaction to ensure atomicity.</li>
            </ul>
          </Callout>

          <p className="mt-6">
            A powerful INSERT variant is <code>INSERT ... SELECT</code>, which allows you to copy data from one table to another
            (or even within the same table):
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Scenario: Archive old product data

-- Create source table with current products
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT,
  price DECIMAL(10, 2),
  created_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO products (product_id, product_name, price) VALUES
  (1, 'Laptop Pro', 1299.99),
  (2, 'Wireless Mouse', 29.99),
  (3, 'Mechanical Keyboard', 149.99),
  (4, 'USB-C Hub', 79.99),
  (5, 'Monitor 27"', 449.99);

-- Create archive table with same structure plus archive timestamp
CREATE TABLE products_archive (
  product_id INTEGER,
  product_name TEXT,
  price DECIMAL(10, 2),
  created_date DATE,
  archived_date DATE DEFAULT CURRENT_DATE
);

-- INSERT...SELECT: Copy expensive products to archive
INSERT INTO products_archive (product_id, product_name, price, created_date)
SELECT product_id, product_name, price, created_date
FROM products
WHERE price > 100;

-- Verify the archive
SELECT 
  product_name, 
  price, 
  'Archived on ' || archived_date AS status
FROM products_archive;`}
          />

          <p className="mt-6">
            Now let's talk about constraint violations—what happens when an INSERT violates table rules:
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Create a table with various constraints
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  salary INTEGER CHECK(salary > 0),
  department TEXT DEFAULT 'Unassigned'
);

-- Valid insert
INSERT INTO employees (employee_id, email, name, salary)
VALUES (1, 'alice@company.com', 'Alice Smith', 75000);

SELECT * FROM employees;

-- Try these experiments (uncomment one at a time to see errors):

-- 1. PRIMARY KEY violation (duplicate ID)
-- INSERT INTO employees (employee_id, email, name, salary)
-- VALUES (1, 'bob@company.com', 'Bob Jones', 80000);

-- 2. UNIQUE violation (duplicate email)
-- INSERT INTO employees (employee_id, email, name, salary)
-- VALUES (2, 'alice@company.com', 'Alice Johnson', 70000);

-- 3. NOT NULL violation (missing required column)
-- INSERT INTO employees (employee_id, email, salary)
-- VALUES (2, 'charlie@company.com', 85000);

-- 4. CHECK constraint violation (negative salary)
-- INSERT INTO employees (employee_id, email, name, salary)
-- VALUES (2, 'david@company.com', 'David Lee', -5000);

-- 5. DEFAULT value demonstration (omit department)
INSERT INTO employees (employee_id, email, name, salary)
VALUES (2, 'eve@company.com', 'Eve Davis', 90000);

SELECT * FROM employees;`}
          />

          <Callout type="ai" title="AI-Assisted INSERT: Generating Test Data">
            <p>
              One of AI's superpowers is generating realistic test data. Instead of manually writing dozens of INSERT statements,
              you can describe your requirements and let AI generate them.
            </p>

            <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
              <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
              <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Generate 20 INSERT statements for a Companies table with these columns:
- CompanyID (integer, starts at 1)
- CompanyName (realistic tech company names)
- StockTicker (3-4 letter symbols, all caps)
- Founded (years between 1990-2020)
- SectorID (1 for Technology, 2 for Healthcare, 3 for Finance)

Make the data realistic and diverse. Use multi-row INSERT format.`}
              </pre>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              AI will generate properly formatted SQL with realistic, randomized data—saving you significant time when setting
              up test databases or creating demos.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="READ: Querying Data with SELECT">
          <p>
            The <code>SELECT</code> statement is the most frequently used SQL command. It retrieves data from one or more tables
            based on criteria you specify. Let's build up from simple to sophisticated queries.
          </p>

          <CodeExample
            title="SELECT Statement Anatomy"
            code={`SELECT column1, column2, column3         -- What columns to retrieve
FROM table_name                          -- Which table(s)
WHERE condition                          -- Filter rows (optional)
GROUP BY column                          -- Group rows (optional)
HAVING aggregate_condition               -- Filter groups (optional)
ORDER BY column ASC/DESC                 -- Sort results (optional)
LIMIT n OFFSET m;                        -- Pagination (optional)`}
          />

          <p className="mt-4">
            Let's explore SELECT with progressively complex examples:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- 1. SELECT all columns (use sparingly!)
SELECT * FROM employees;

-- 2. SELECT specific columns (better practice)
SELECT name, department, salary 
FROM employees;

-- 3. SELECT with column aliases for readability
SELECT 
  name AS employee_name,
  department AS dept,
  salary AS annual_salary
FROM employees;

-- 4. SELECT with expressions and calculations
SELECT 
  name,
  salary AS current_salary,
  salary * 1.10 AS salary_after_raise,
  salary / 12 AS monthly_salary
FROM employees;`}
          />

          <p className="mt-6">
            Now let's explore the <code>WHERE</code> clause for filtering data. This is where SELECT becomes powerful:
          </p>

          <CodeExample
            title="WHERE Clause Operators"
            code={`-- Comparison operators
WHERE salary > 80000              -- Greater than
WHERE department = 'Engineering'  -- Equality
WHERE hire_date >= '2020-01-01'   -- Greater than or equal

-- Logical operators
WHERE salary > 70000 AND department = 'Sales'  -- AND
WHERE department = 'HR' OR department = 'IT'   -- OR
WHERE NOT (salary < 50000)                      -- NOT

-- Range checking
WHERE salary BETWEEN 60000 AND 90000   -- Inclusive range
WHERE hire_date BETWEEN '2020-01-01' AND '2023-12-31'

-- Set membership
WHERE department IN ('Engineering', 'Product', 'Design')
WHERE employee_id NOT IN (SELECT manager_id FROM managers)

-- Pattern matching
WHERE name LIKE 'John%'           -- Starts with 'John'
WHERE email LIKE '%@gmail.com'    -- Ends with '@gmail.com'
WHERE product_code LIKE 'A_3%'    -- A, any char, 3, then anything

-- NULL handling
WHERE manager_id IS NULL          -- Has no manager
WHERE phone IS NOT NULL           -- Has a phone number`}
          />

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Demonstrate different WHERE clause patterns

-- 1. Simple comparison with numbers
SELECT first_name, last_name, email
FROM customers
WHERE customer_id > 5;

-- 2. Multiple conditions with AND
SELECT first_name, last_name, email
FROM customers
WHERE first_name LIKE 'J%'
  AND last_name LIKE 'S%';

-- 3. Set membership with IN
SELECT product_name, category, price
FROM products
WHERE category IN ('Electronics', 'Books', 'Clothing')
ORDER BY category, product_name;

-- 4. Pattern matching with LIKE
SELECT first_name, last_name, email
FROM customers
WHERE email LIKE '%@gmail.com'
ORDER BY last_name;`}
          />

          <p className="mt-6">
            Let's explore <code>ORDER BY</code> for sorting results, and <code>DISTINCT</code> for removing duplicates:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- 1. Sort by single column (ascending by default)
SELECT name, salary
FROM employees
ORDER BY salary;

-- 2. Sort descending (highest salary first)
SELECT name, salary
FROM employees
ORDER BY salary DESC;

-- 3. Sort by multiple columns (department, then salary)
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- 4. DISTINCT: Get unique departments
SELECT DISTINCT department
FROM employees
ORDER BY department;

-- 5. Count employees per department (preview of aggregation)
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC;`}
          />

          <p className="mt-6">
            Finally, <code>LIMIT</code> and <code>OFFSET</code> are essential for pagination—showing results one page at a time:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Pagination example: Show 3 employees at a time

-- Page 1: First 3 employees
SELECT name, department, salary
FROM employees
ORDER BY name
LIMIT 3 OFFSET 0;

-- Page 2: Next 3 employees
-- SELECT name, department, salary
-- FROM employees
-- ORDER BY name
-- LIMIT 3 OFFSET 3;

-- Page 3: Next 3 employees
-- SELECT name, department, salary
-- FROM employees
-- ORDER BY name
-- LIMIT 3 OFFSET 6;

-- Pagination formula: OFFSET = (page_number - 1) * page_size
-- For page_size = 3:
--   Page 1: OFFSET 0
--   Page 2: OFFSET 3
--   Page 3: OFFSET 6
--   etc.`}
          />

          <Callout type="ai" title="AI-Assisted SELECT: Translating Questions to Queries">
            <p>
              AI excels at translating natural language questions into SQL queries. The key is providing enough context about
              your database schema.
            </p>

            <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
              <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
              <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema:
- employees (id, name, email, department, salary, hire_date, manager_id)

Question: Find all Engineering employees hired after 2020, 
earning more than $90,000, sorted by salary descending.

Generate: SQLite-compatible SELECT query with clear column names.`}
              </pre>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Pro tip:</strong> For complex queries, ask AI to add comments explaining each clause. This helps you learn
              while also making the query maintainable.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="UPDATE: Modifying Existing Data">
          <p>
            The <code>UPDATE</code> statement modifies existing records in a table. Let's see what happens when we update employee data:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Before UPDATE */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Before UPDATE</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob Smith</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">Sales</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">78000</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Carol Williams</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Marketing</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">82000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* After UPDATE */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">After UPDATE</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-900/30">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob Smith</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">78000</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Carol Williams</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Marketing</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">82000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>UPDATE Employees SET Department = 'Engineering' WHERE EmployeeID = 2;</code>
            <br />✅ <strong>Result:</strong> Bob's department (highlighted) changed from <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded font-semibold">"Sales"</span> to <span className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded font-semibold">"Engineering"</span>. Only the targeted row was affected because of the WHERE clause.
          </p>

          <Callout type="warning" title="Critical Warning: The WHERE Clause">
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              ⚠️ ALWAYS use a WHERE clause with UPDATE!
            </p>
            <p className="mt-2">
              Without WHERE, <em>every single row</em> in the table will be updated. This is rarely what you want and can cause
              catastrophic data loss. Many production incidents start with "I forgot the WHERE clause."
            </p>
            <code className="block mt-2 bg-amber-100 dark:bg-amber-900/30 p-2 rounded text-sm">
              -- DANGER: Updates EVERY row!<br/>
              UPDATE employees SET salary = 100000;
            </code>
          </Callout>

          <CodeExample
            title="UPDATE Statement Syntax"
            code={`-- Update a single column for specific rows
UPDATE table_name
SET column1 = new_value
WHERE condition;

-- Update multiple columns simultaneously
UPDATE table_name
SET 
  column1 = new_value1,
  column2 = new_value2,
  column3 = new_value3
WHERE condition;

-- Update with calculated values
UPDATE table_name
SET column = column * 1.10  -- Increase by 10%
WHERE condition;

-- Update using subquery
UPDATE table_name
SET column = (SELECT value FROM other_table WHERE ...)
WHERE condition;`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Safe UPDATE patterns: always check before modifying

-- 1. Check current data BEFORE update
SELECT name, salary, department
FROM employees
WHERE name = 'Alice Smith';

-- 2. Perform the update
UPDATE employees
SET salary = 95000
WHERE name = 'Alice Smith';

-- 3. Verify the change AFTER update
SELECT name, salary, department
FROM employees
WHERE name = 'Alice Smith';

-- Bulk update with calculated values
-- Give 10% raise to all Engineering employees

-- Check who will be affected
SELECT name, salary, salary * 1.10 AS new_salary
FROM employees
WHERE department = 'Engineering';

-- Uncomment to execute:
-- UPDATE employees
-- SET salary = salary * 1.10
-- WHERE department = 'Engineering';

-- Update multiple columns with complex conditions
-- UPDATE employees
-- SET 
--   salary = salary * 1.15,
--   department = 'Senior ' || department
-- WHERE salary > 80000 AND hire_date < '2020-01-01';`}
          />
        </Subsection>

        <Subsection title="DELETE: Removing Data">
          <p>
            The <code>DELETE</code> statement removes rows from a table. Let's see what happens when we delete an employee record:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Before DELETE */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Before DELETE</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-red-50 dark:bg-red-900/30">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Bob Smith</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">78000</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Carol Williams</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Marketing</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">82000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">3 rows in table</p>
            </div>

            {/* After DELETE */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">After DELETE</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">EmployeeID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice Johnson</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">95000</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Carol Williams</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Marketing</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">82000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">2 rows remaining</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>DELETE FROM Employees WHERE EmployeeID = 2;</code>
            <br />✅ <strong>Result:</strong> Bob's entire row (highlighted in red) was permanently removed from the table. The WHERE clause ensured only the targeted employee was deleted.
          </p>

          <Callout type="warning" title="Critical Warning: The WHERE Clause (Again!)">
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              ⚠️ ALWAYS use a WHERE clause with DELETE!
            </p>
            <p className="mt-2">
              Without WHERE, <em>every single row</em> will be deleted (but the table structure remains). There is no "undo"
              button—once deleted, data is gone unless you have backups.
            </p>
            <code className="block mt-2 bg-amber-100 dark:bg-amber-900/30 p-2 rounded text-sm">
              -- DANGER: Deletes ALL rows!<br/>
              DELETE FROM employees;
            </code>
          </Callout>

          <CodeExample
            title="DELETE Statement Syntax"
            code={`-- Delete specific rows based on condition
DELETE FROM table_name
WHERE condition;

-- Delete using subquery (complex conditions)
DELETE FROM table_name
WHERE column IN (
  SELECT column FROM other_table WHERE condition
);

-- Delete with complex logic
DELETE FROM table_name
WHERE condition1 AND (condition2 OR condition3);

-- Note: In SQLite, TRUNCATE doesn't exist
-- To delete all rows quickly, use:
DELETE FROM table_name;  -- But be careful!

-- In PostgreSQL/MySQL/SQL Server, you would use:
-- TRUNCATE TABLE table_name;  -- Faster, resets auto-increment`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Safe DELETE pattern: always count before deleting

-- 1. Count rows that match your condition
SELECT COUNT(*) AS rows_to_delete
FROM employees
WHERE department = 'Sales';

-- 2. View the actual rows that will be deleted
SELECT name, department, salary
FROM employees
WHERE department = 'Sales';

-- 3. Delete the rows (uncomment to execute)
-- DELETE FROM employees
-- WHERE department = 'Sales';

-- 4. Verify deletion
-- SELECT COUNT(*) AS remaining_count
-- FROM employees;

-- DELETE with subquery: remove below-average earners
SELECT name, salary, 
  (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees
WHERE salary < (SELECT AVG(salary) FROM employees);

-- Uncomment to execute:
-- DELETE FROM employees
-- WHERE salary < (SELECT AVG(salary) FROM employees);`}
          />

          <p className="mt-6">
            When you delete a row that's referenced by another table (via foreign key), the database's behavior depends on the
            foreign key's <code>ON DELETE</code> action. Let's revisit what we learned in{' '}
            <a href="#section5" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Part II</a>:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">ON DELETE Action</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Behavior</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">CASCADE</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Automatically delete referencing rows</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Delete user → delete their posts</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">SET NULL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Set foreign key to NULL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Delete manager → set manager_id to NULL</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">RESTRICT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Prevent deletion if references exist</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Prevent deleting category with products</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">NO ACTION</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Similar to RESTRICT (implementation varies)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Default in many databases</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            For a refresher on foreign keys and referential integrity, see{' '}
            <a href="#section5" className="text-blue-600 dark:text-blue-400 hover:underline">
              Part II: Data Integrity
            </a>.
          </p>
        </Subsection>

        <p className="mt-6">
          You've now mastered the four fundamental CRUD operations. These form the foundation of all database interactions.
          Next, we'll explore how to combine data from multiple tables using JOINs—unlocking the true power of relational databases.
        </p>
      </Section>

      {/* SECTION 3: JOINs - Connecting the Dots */}
      <Section id="section8" title="Relationships and JOINs - Connecting the Dots" level={2}>
        <p>
          The true power of relational databases emerges when you combine data from multiple related tables. This is where
          the word "relational" truly shines—not just from the formal relational model, but from the practical ability to
          establish and query <em>relationships</em> between entities.
        </p>

        <p className="mt-4">
          In <a href="#section2" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Part I</a>, we
          learned how to design relationships using primary and foreign keys. Now we'll learn how to <em>query</em> those
          relationships using <code>JOIN</code> operations.
        </p>

        <Subsection title="Understanding JOINs: The Conceptual Model">
          <p>
            A <code>JOIN</code> clause combines rows from two or more tables based on a related column between them—typically
            a primary key-foreign key relationship. Think of it as answering questions like:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>"Show me each company <em>along with</em> its sector name"</li>
            <li>"Find all financial statements <em>and</em> their associated companies"</li>
            <li>"List employees <em>with</em> their managers"</li>
          </ul>

          <p>
            Without JOINs, relational databases would be little more than spreadsheets. JOINs enable the rich interconnected
            data models that make databases powerful.
          </p>
        </Subsection>

        <Callout type="tip" title="Analogy: JOINs as Real-World Connections">
          <p>
            <strong>INNER JOIN</strong> is like a dating app showing only mutual matches—both sides must connect.
          </p>
          <p className="mt-2">
            <strong>LEFT JOIN</strong> is like your contact list—you see everyone you know, even if they haven't responded lately (NULLs for missing data).
          </p>
          <p className="mt-2">
            <strong>CROSS JOIN</strong> is like generating every possible pairing for a round-robin tournament—every combination, regardless of actual relationships.
          </p>
        </Callout>

        <Subsection title="JOIN Types: Visual Understanding">
          <p>
            There are six fundamental types of JOINs in SQL, each answering different questions about how data from two tables
            should be combined. Before we dive into the syntax and detailed examples of each type, let's get a visual overview
            of all six types to understand the "big picture" of how JOINs work:
          </p>

          <JoinFigure />

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            Each visualization above shows a simplified example of how rows from two tables combine. In the sections that follow,
            we'll explore each JOIN type in detail with real queries and data. But first, here's a quick reference table summarizing
            when you'd use each type:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">JOIN Type</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Returns</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">When to Use</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">SQLite Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">INNER JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Only matching rows from both tables</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Find companies WITH statements</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">✅ Yes</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">LEFT JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">All from left + matched from right (NULL if no match)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">All companies, show statements if exist</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">✅ Yes</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">RIGHT JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">All from right + matched from left (NULL if no match)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Rarely used (use LEFT instead)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">❌ No (rewrite as LEFT)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">FULL OUTER JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">All rows from both (NULL for non-matches)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Compare datasets, find all differences</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">❌ No (use UNION workaround)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">CROSS JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Cartesian product (every combination)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Generate all possible pairs</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">✅ Yes</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">SELF JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Table joined to itself</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Hierarchies, comparing rows in same table</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">✅ Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Now let's explore each JOIN type in depth, starting with the most common and essential: INNER JOIN. We'll use concrete
            examples with real data to make each concept crystal clear. If any JOIN type seems confusing, remember that the interactive
            playgrounds are there for you to experiment and build intuition—feel free to jump ahead to try the queries yourself!
          </p>
        </Subsection>

        <Callout type="ai" title="AI-Assisted JOINs: Describing Relationships">
          <p>
            AI can generate JOIN queries when you clearly describe your database relationships and what you want to know.
          </p>

          <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
            <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
            <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema relationships:
- Companies (company_id PK, sector_id FK → Sectors)
- Sectors (sector_id PK)
- Financial_Statements (statement_id PK, company_id FK → Companies)
- Line_Items (item_id PK, statement_id FK → Financial_Statements)

Task: Write a query to find all technology companies (sector = 'Technology')
that reported revenue above $100B in 2024. Show company name, revenue, and
rank them by revenue descending.

Generate: SQLite-compatible query with clear aliases and comments.`}
            </pre>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>Key to good AI JOIN queries:</strong> Clearly specify PK→FK relationships. AI needs to understand how
            tables connect to generate correct <code>ON</code> clauses.
          </p>
        </Callout>

        <Subsection title="INNER JOIN: The Foundation">
          <p>
            <code>INNER JOIN</code> returns only rows where there's a match in <em>both</em> tables. It's the most common JOIN
            and the one you'll use most frequently. Let's see this in action with a concrete example.
          </p>

          <p className="mt-4">
            Imagine we have two tables: <strong>Companies</strong> (with company details) and <strong>Sectors</strong> (with sector information).
            Each company has a <code>SectorID</code> foreign key pointing to the Sectors table:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Companies Table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Companies Table</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyName</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30">SectorID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">101</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Apple Inc.</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">102</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">JPMorgan Chase</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 font-semibold">2</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">103</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Microsoft Corp.</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">104</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Unknown Startup</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-red-100 dark:bg-red-900/30 font-semibold">99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sectors Table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Sectors Table</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30">SectorID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">SectorName</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Technology</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 font-semibold">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Financial Services</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-green-100 dark:bg-green-900/30 font-semibold">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Healthcare</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <strong>Notice:</strong> The <code className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">SectorID</code> columns (highlighted in blue) are how these tables connect.
            The <code className="bg-red-100 dark:bg-red-900/30 px-1 rounded">red-highlighted</code> company has SectorID 99, which doesn't exist in Sectors.
            The <code className="bg-green-100 dark:bg-green-900/30 px-1 rounded">green-highlighted</code> sector (Healthcare) has no companies referencing it.
          </p>

          <p className="font-semibold text-gray-900 dark:text-white mb-2">After INNER JOIN (only matching rows):</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-xs border-collapse">
              <thead>
                <tr className="bg-green-100 dark:bg-green-900/30">
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">SectorName</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Apple Inc.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Technology</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-850">
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Microsoft Corp.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Technology</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">JPMorgan Chase</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Financial Services</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            ✅ <strong>Result:</strong> Only 3 rows appear—companies that have a matching SectorID. "Unknown Startup" (SectorID 99) is excluded because 99 doesn't exist in Sectors.
            "Healthcare" (SectorID 3) doesn't appear because no company references it. This is the defining characteristic of INNER JOIN: <em>both sides must match</em>.
          </p>

          <CodeExample
            title="INNER JOIN Syntax"
            code={`SELECT 
  t1.column1,
  t1.column2,
  t2.column3,
  t2.column4
FROM table1 t1
INNER JOIN table2 t2 
  ON t1.foreign_key = t2.primary_key
WHERE condition;

-- Note: INNER is optional, you can just write JOIN
SELECT ...
FROM table1 t1
JOIN table2 t2 ON t1.fk = t2.pk;`}
          />

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- INNER JOIN: Companies with their sectors
-- Only returns companies that HAVE a sector

SELECT 
  c.CompanyName,
  c.StockTicker,
  s.SectorName
FROM Companies c
INNER JOIN Sectors s 
  ON c.SectorID = s.SectorID
ORDER BY s.SectorName, c.CompanyName;

-- Multi-table INNER JOIN: Companies → Statements → Line Items
-- Find Revenue and Net Income for Apple in 2024
SELECT 
  c.CompanyName,
  fs.Year,
  li.ItemName,
  li.Value
FROM Companies c
INNER JOIN Financial_Statements fs 
  ON c.CompanyID = fs.CompanyID
INNER JOIN Line_Items li 
  ON fs.StatementID = li.StatementID
WHERE c.CompanyName = 'Apple Inc.'
  AND fs.Year = 2024
  AND li.ItemName IN ('Revenue', 'Net Income');`}
          />

          <p className="mt-6">
            The <code>ON</code> clause specifies the join condition—how rows from the two tables are matched. Almost always,
            this is a foreign key = primary key comparison.
          </p>
        </Subsection>

        <Subsection title="LEFT JOIN: Keeping All From the Left">
          <p>
            <code>LEFT JOIN</code> (also called <code>LEFT OUTER JOIN</code>) returns <em>all</em> rows from the left table,
            plus matched rows from the right table. If there's no match, the right table's columns are NULL.
          </p>

          <p className="mt-4">
            Let's use the same Companies and Sectors example. Notice how LEFT JOIN differs from INNER JOIN:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
            {/* Companies Table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">Companies</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">ID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30">SectorID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">101</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Apple</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">102</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">JPMorgan</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">2</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">104</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-green-100 dark:bg-green-900/30 font-semibold">Startup</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-red-100 dark:bg-red-900/30 font-semibold">99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sectors Table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">Sectors</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30">SectorID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">SectorName</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Technology</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Financial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* LEFT JOIN result */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">After LEFT JOIN</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyName</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">SectorName</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Apple</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Technology</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">JPMorgan</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Financial</td>
                    </tr>
                    <tr className="bg-green-50 dark:bg-green-900/30">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold">Startup</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 font-semibold italic text-gray-500">NULL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>SELECT c.CompanyName, s.SectorName FROM Companies c LEFT JOIN Sectors s ON c.SectorID = s.SectorID;</code>
            <br />✅ <strong>Key difference from INNER JOIN:</strong> The <span className="bg-green-100 dark:bg-green-900/30 px-1 rounded">green-highlighted</span> Startup company appears in the result even though it has no matching sector (SectorID 99 doesn't exist). Its SectorName is NULL.
            <br />💡 <strong>Use case:</strong> "Show me ALL companies, and their sector info if available." LEFT JOIN keeps everything from the left table (Companies).
          </p>

          <p className="mt-6">
            This is incredibly useful for finding "missing" relationships—like companies without financial statements, users
            who haven't placed orders, or products with no reviews.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- LEFT JOIN: Show ALL companies, with sector info if available
-- If a company has no sector, show NULL for sector columns

SELECT 
  c.CompanyName,
  c.StockTicker,
  s.SectorName
FROM Companies c
LEFT JOIN Sectors s 
  ON c.SectorID = s.SectorID
ORDER BY s.SectorName, c.CompanyName;

-- Find companies WITHOUT financial statements (NULLs mean no match)
SELECT 
  c.CompanyName,
  c.StockTicker,
  fs.StatementID
FROM Companies c
LEFT JOIN Financial_Statements fs 
  ON c.CompanyID = fs.CompanyID
WHERE fs.StatementID IS NULL;  -- Only show companies with NO statements

-- Count statements per company (including 0 for companies with none)
SELECT 
  c.CompanyName,
  COUNT(fs.StatementID) AS statement_count  -- COUNT ignores NULLs
FROM Companies c
LEFT JOIN Financial_Statements fs 
  ON c.CompanyID = fs.CompanyID
GROUP BY c.CompanyID, c.CompanyName
ORDER BY statement_count DESC;`}
          />

          <Callout type="tip" title="LEFT JOIN Pattern: Finding Missing Relationships">
            <p>
              A common pattern: Use LEFT JOIN and filter for <code>WHERE right_table.id IS NULL</code> to find rows in the
              left table that have NO corresponding rows in the right table.
            </p>
            <p className="mt-2">
              Examples:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Customers who've never placed an order</li>
              <li>Products with no reviews</li>
              <li>Employees with no assigned projects</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="CROSS JOIN: The Cartesian Product">
          <p>
            <code>CROSS JOIN</code> produces every possible combination of rows from two tables: rows_in_A × rows_in_B.
            Let's see this with a simple example:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
            {/* Sizes table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">Sizes (2 rows)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Small</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Large</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Colors table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">Colors (3 rows)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Red</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Blue</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Green</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CROSS JOIN result */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white text-xs">After CROSS JOIN</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-purple-100 dark:bg-purple-900/30">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Size</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Small</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Red</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Small</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Blue</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Small</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Green</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Large</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Red</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Large</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Blue</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Large</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Green</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>SELECT s.Size, c.Color FROM Sizes s CROSS JOIN Colors c;</code>
            <br />✅ <strong>Result:</strong> Every possible combination of size and color. No ON clause needed—CROSS JOIN has no matching condition.
            <br />💡 <strong>Use cases:</strong> Generate product variants, create test data combinations, schedule all possible time slots, or populate recommendation matrices.
          </p>

          <Callout type="warning" title="Danger: Result Set Explosion">
            <p>
              If Table A has 100 rows and Table B has 1,000 rows, CROSS JOIN produces 100,000 rows. Always verify your
              table sizes before using CROSS JOIN on production data.
            </p>
          </Callout>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- CROSS JOIN: Generate all customer-product combinations
-- Useful for recommendation systems, promotional targeting, etc.

SELECT 
  c.first_name || ' ' || c.last_name AS customer,
  p.product_name,
  p.category,
  p.price
FROM customers c
CROSS JOIN products p
WHERE p.category = 'Electronics'  -- Filter AFTER cross join
ORDER BY customer, p.price DESC
LIMIT 15;

-- Use case: Generate all possible product pairs for "frequently bought together"
SELECT 
  p1.product_name AS product_1,
  p2.product_name AS product_2,
  p1.price + p2.price AS bundle_price
FROM products p1
CROSS JOIN products p2
WHERE p1.product_id < p2.product_id  -- Avoid duplicate pairs (A-B and B-A)
  AND p1.category = p2.category      -- Same category bundles
LIMIT 10;`}
          />
        </Subsection>

        <Subsection title="SELF JOIN: When a Table References Itself">
          <p>
            A <strong>SELF JOIN</strong> is when a table is joined to itself. This is essential for hierarchical data like
            employee-manager relationships. Let's see a concrete example:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Left: Source table */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Employees Table (single table)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">ID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30">ManagerID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">1</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Alice (CEO)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-gray-400 italic">NULL</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Bob (VP)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">3</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Carol (VP)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">1</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">4</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">David (Eng)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 font-semibold">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">ManagerID</span> references{' '}
                <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">ID</span> in the same table!
              </p>
            </div>

            {/* Right: SELF JOIN result */}
            <div>
              <p className="font-semibold text-center mb-2 text-gray-900 dark:text-white">After SELF JOIN</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Employee</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob (VP)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice (CEO)</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Carol (VP)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Alice (CEO)</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">David (Eng)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Bob (VP)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Each employee paired with their manager (Alice has no manager, so she doesn't appear)
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>The SQL:</strong> <code>SELECT e.Name AS Employee, m.Name AS Manager FROM Employees e JOIN Employees m ON e.ManagerID = m.ID;</code>
            <br />✅ <strong>Key concept:</strong> The same Employees table appears twice in the query with different aliases (<code>e</code> and <code>m</code>). We join the table to itself by matching ManagerID to ID.
            <br />💡 <strong>Use cases:</strong> Employee hierarchies, comment threads (parent_comment_id), category trees, friend networks, file system folders.
          </p>

          <MermaidDiagram
            caption="SELF JOIN Use Case: Employee-Manager Hierarchy"
            chart={`
flowchart TD
    CEO["👔 CEO Alice"]
    VP1["📊 VP Bob"]
    VP2["📊 VP Carol"]
    ENG1["💻 Engineer David"]
    ENG2["💻 Engineer Eve"]
    SALES1["📈 Sales Frank"]
    
    CEO --> VP1
    CEO --> VP2
    VP1 --> ENG1
    VP1 --> ENG2
    VP2 --> SALES1
            `}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- SELF JOIN: Find pairs of employees in the same department
-- Useful for team analysis, collaboration patterns, etc.

SELECT 
  e1.name AS employee_1,
  e2.name AS employee_2,
  e1.department AS shared_department
FROM employees e1
JOIN employees e2 
  ON e1.department = e2.department
  AND e1.id < e2.id  -- Avoid duplicates (A-B and B-A) and self-pairs (A-A)
WHERE e1.department = 'Engineering'
ORDER BY e1.name, e2.name;

-- Note: For actual hierarchies (employee-manager), you'd have a manager_id column:
-- SELECT 
--   e.name AS employee,
--   m.name AS manager
-- FROM employees e
-- LEFT JOIN employees m ON e.manager_id = m.id;`}
          />

          <Callout type="tip" title="Common SELF JOIN Use Cases">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Organizational hierarchies:</strong> employee → manager chains</li>
              <li><strong>Finding duplicates:</strong> Compare rows to themselves to find similar records</li>
              <li><strong>Sequential analysis:</strong> Compare current month to previous month (time series)</li>
              <li><strong>Graph traversal:</strong> Nodes and edges in the same table</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="Complex Multi-Table JOINs">
          <p>
            In real-world applications, complex queries routinely JOIN three, four, five, or even more tables. This isn't 
            an edge case—it's the norm. E-commerce sites join customers, orders, order items, products, and reviews. 
            Social networks join users, posts, comments, likes, and friendships. Financial systems join accounts, transactions, 
            categories, budgets, and recurring payments.
          </p>

          <p className="mt-4">
            <strong>The good news:</strong> Complex multi-table JOINs follow the same principles as simple two-table JOINs. 
            The key is approaching them systematically, one relationship at a time, rather than trying to construct the entire 
            query at once.
          </p>

          <Callout type="tip" title="Common Real-World Multi-Table JOIN Scenarios">
            <p className="font-semibold mb-2">You'll encounter these patterns constantly:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>E-commerce Analytics:</strong> "Show me total revenue by product category" requires joining: 
                Orders → OrderItems → Products → Categories</li>
              <li><strong>User Activity Tracking:</strong> "Which features do premium users engage with most?" needs: 
                Users → Subscriptions → ActivityLogs → Features</li>
              <li><strong>Content Moderation:</strong> "Find posts with the most reports from verified users" combines: 
                Posts → Reports → Users → Verifications</li>
              <li><strong>Inventory Management:</strong> "Which suppliers provide our best-selling products?" links: 
                Sales → Products → ProductSuppliers → Suppliers</li>
              <li><strong>Medical Records:</strong> "Patient diagnosis history with prescribed treatments" spans: 
                Patients → Visits → Diagnoses → Prescriptions → Medications</li>
            </ul>
            <p className="mt-3 text-sm">
              Notice the pattern: you're traversing a <strong>relationship chain</strong> through your database schema. 
              Each arrow (→) represents a JOIN operation.
            </p>
          </Callout>

          <p className="mt-6 font-semibold text-lg text-gray-900 dark:text-white">
            The Systematic Approach: From Natural Language to SQL
          </p>

          <p className="mt-3">
            Here's a proven methodology for translating complex business questions into multi-table JOINs:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-blue-500 p-5 my-4 space-y-4">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 1: Identify the Entities (Tables)</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Extract all the nouns from your question. These usually map to tables.
                <br/><strong>Example question:</strong> "Show me customers who bought electronics products in 2024"
                <br/><strong>Entities:</strong> Customers, Products (electronics), Orders/Purchases (implicit), Time (2024)
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 2: Map the Relationship Path</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Draw the path through your schema. How do you get from the first entity to the last?
                <br/><strong>Path:</strong> Customers → Orders → OrderItems → Products (with category filter)
                <br/>Each arrow is a JOIN. If you can't connect two entities, you might be missing a table.
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 3: Identify the "Anchor" Table</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Which table should you start FROM? Usually, it's the primary entity you're asking about.
                <br/><strong>In our example:</strong> Start FROM Customers (we want to show customers)
                <br/><strong>Alternative:</strong> If the question was "Show products bought by VIP customers," start FROM Products
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 4: Build JOINs Following the Path</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Add one JOIN at a time, in the order of your relationship path. Test after each JOIN.
                <br/><code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">FROM Customers c</code>
                <br/><code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">JOIN Orders o ON c.CustomerID = o.CustomerID</code>
                <br/><code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">JOIN OrderItems oi ON o.OrderID = oi.OrderID</code>
                <br/><code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">JOIN Products p ON oi.ProductID = p.ProductID</code>
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 5: Add Filters and Aggregations</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Now apply your WHERE conditions, GROUP BY, and SELECT clauses.
                <br/><code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 rounded">WHERE p.Category = 'Electronics' AND YEAR(o.OrderDate) = 2024</code>
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Step 6: Verify and Debug</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Use <code>COUNT(*)</code> or <code>LIMIT 10</code> to check intermediate results. Do you have more or fewer 
                rows than expected? An unexpected explosion of rows often means a missing or incorrect join condition.
              </p>
            </div>
          </div>

          <p className="mt-6">
            Let's apply this methodology to a concrete example:
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Business Question: "Show me total revenue by sector, 
-- but only for companies that have filed statements in 2023"

-- Step 1: Entities identified: Sectors, Companies, Statements, Line_Items (revenue)
-- Step 2: Path: Sectors → Companies → Financial_Statements → Line_Items
-- Step 3: Anchor: Sectors (we want results grouped by sector)
-- Step 4: Build JOINs incrementally (see below)

-- Start with the anchor
SELECT 
  s.SectorName,
  COUNT(DISTINCT c.CompanyID) AS companies_with_statements,
  SUM(li.Value) AS total_revenue,
  AVG(li.Value) AS avg_revenue_per_statement
FROM Sectors s
-- First JOIN: Sectors → Companies
JOIN Companies c 
  ON s.SectorID = c.SectorID
-- Second JOIN: Companies → Financial_Statements
JOIN Financial_Statements fs 
  ON c.CompanyID = fs.CompanyID
-- Third JOIN: Financial_Statements → Line_Items
JOIN Line_Items li 
  ON fs.StatementID = li.StatementID
-- Step 5: Apply filters
WHERE li.ItemName = 'Revenue'
  AND fs.Year = 2023
-- Step 6: Aggregate and sort
GROUP BY s.SectorName
ORDER BY total_revenue DESC;

-- Try: Comment out the last JOIN and see what happens
-- Try: Add COUNT(fs.StatementID) to see statement counts per sector`}
          />

          <Callout type="success" title="Pro Tips for Complex JOINs">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Build incrementally:</strong> Start with 2 tables, verify the results, then add the 3rd, then the 4th. 
                Don't try to write all JOINs at once.</li>
              <li><strong>Use meaningful aliases:</strong> <code>c</code> for Companies, <code>o</code> for Orders. 
                This makes complex queries readable.</li>
              <li><strong>Comment your JOINs:</strong> Add comments explaining what each JOIN accomplishes, especially in queries 
                with 5+ tables.</li>
              <li><strong>Watch for Cartesian explosions:</strong> If you suddenly have millions of rows from three small tables, 
                you're missing a join condition.</li>
              <li><strong>Consider LEFT JOIN carefully:</strong> In a chain like A → B → C, if B → C is a LEFT JOIN but A → B is INNER, 
                you'll lose rows from A. Think through the logic.</li>
              <li><strong>Use DISTINCT when needed:</strong> Multi-table JOINs can create duplicate rows. <code>DISTINCT</code> or 
                <code>COUNT(DISTINCT ...)</code> helps.</li>
            </ul>
          </Callout>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            Example 2: A More Complex Scenario
          </p>

          <p className="mt-3">
            Let's tackle a harder question that requires careful thought about the join structure:
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Business Question: "For each sector, show the company with the 
-- highest revenue in 2023, and that company's total statement count"

-- This is complex because we need:
-- 1. Revenue aggregated by company (Companies → Statements → Line_Items)
-- 2. Total statement counts per company
-- 3. Only the TOP company per sector
-- 4. All while preserving sector information

-- Approach: Use a subquery to find max revenue per sector first
SELECT 
  s.SectorName,
  c.CompanyName,
  c.StockTicker,
  SUM(CASE WHEN li.ItemName = 'Revenue' THEN li.Value END) AS total_revenue_2023,
  COUNT(DISTINCT fs.StatementID) AS total_statements
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
LEFT JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE fs.Year = 2023
GROUP BY s.SectorName, c.CompanyID, c.CompanyName, c.StockTicker
ORDER BY s.SectorName, total_revenue_2023 DESC;

-- This gives us ALL companies ranked by revenue within each sector
-- To get just the TOP company per sector, we'd use a window function
-- (covered later in Part III) or filter in application code

-- Try: Remove the CASE statement and see what happens
-- Try: Change LEFT JOIN to INNER JOIN - what rows disappear?`}
          />

          <p className="mt-6">
            Notice how we had to think carefully about:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Using <code>LEFT JOIN</code> for Line_Items (what if a statement has no line items yet?)</li>
            <li>Using <code>CASE</code> to filter to only Revenue items within the SUM</li>
            <li>Grouping by all columns from Sectors and Companies we want to display</li>
            <li>The ORDER BY to show highest revenue first (though this doesn't limit to top 1 per sector)</li>
          </ul>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            When Multi-Table JOINs Go Wrong: Common Mistakes
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-red-100 dark:bg-red-900/30">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Symptom</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Likely Cause</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Millions of rows from small tables</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Missing or incorrect join condition (accidental CROSS JOIN)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Verify every JOIN has an ON clause matching the correct keys</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Zero rows returned unexpectedly</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Using INNER JOIN when you need LEFT JOIN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Change to LEFT JOIN for optional relationships</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Duplicate rows for same entity</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">One-to-many relationship creating cartesian product</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Use DISTINCT, or rethink aggregation strategy</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Aggregations returning wrong numbers</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Counting/summing across duplicated rows from JOINs</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Use COUNT(DISTINCT ...) or SUM(DISTINCT ...), or subqueries</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Query takes forever to run</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Missing indexes on join columns</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Add indexes to foreign key columns (covered in Query Optimization)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="ai" title="AI-Assisted Multi-Table JOIN Construction">
            <p>
              AI excels at translating complex natural language queries into multi-table JOINs—but you need to provide 
              schema context. Here's how to prompt effectively:
            </p>

            <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
              <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Effective Prompt Template:</p>
              <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema:
- Customers (customer_id PK, name, email)
- Orders (order_id PK, customer_id FK, order_date, total)
- OrderItems (item_id PK, order_id FK, product_id FK, quantity, price)
- Products (product_id PK, name, category, price)

Relationships:
- Customers → Orders (one-to-many)
- Orders → OrderItems (one-to-many)
- Products → OrderItems (one-to-many)

Question: Show me the top 5 product categories by revenue in 2024, 
including how many unique customers bought from each category.

Requirements:
- Use PostgreSQL syntax
- Include comments explaining each JOIN
- Handle NULL values appropriately`}
              </pre>
            </div>

            <p className="mt-4 text-sm">
              <strong>Key point:</strong> Even with AI help, <em>you</em> need to verify the logic. Run the query with 
              <code>LIMIT 10</code> first, check the row count, and ensure the JOINs make sense for your data model.
            </p>
          </Callout>

          <p className="mt-6">
            Multi-table JOINs are a core skill that you'll use daily as a developer or analyst. Start simple, build incrementally, 
            test frequently, and soon you'll be confidently navigating schemas with dozens of tables. The methodology above works 
            whether you're joining 3 tables or 13.
          </p>
        </Subsection>

        <p className="mt-6">
          Mastering JOINs unlocks the full power of relational databases. Next, we'll explore how to summarize and aggregate
          joined data using GROUP BY—transforming raw rows into meaningful insights.
        </p>
      </Section>

      {/* SECTION 4: Aggregation and GROUP BY */}
      <Section id="section9" title="Aggregation and Grouping - From Rows to Insights" level={2}>
        <p>
          So far, we've retrieved individual rows from tables. But often, you don't want raw rows—you want <em>summaries</em>:
          "How many customers per country?", "What's the average salary per department?", "Total revenue by quarter?"
        </p>

        <p className="mt-4">
          This is where <strong>aggregate functions</strong> and <code>GROUP BY</code> transform SQL from a data retrieval tool
          into an analytical powerhouse. These features turn databases into real-time reporting engines.
        </p>

        <p className="mt-4">
          Now that you can JOIN tables to combine related data, aggregation lets you <em>summarize</em> that data—computing 
          totals, averages, and counts across groups of rows. This is where analytical queries come alive: you're not just 
          fetching data anymore, you're generating insights.
        </p>

        <Subsection title="Aggregate Functions: Crunching Numbers">
          <p>
            Aggregate functions perform calculations across multiple rows and return a single summary value. SQL provides five
            core aggregate functions that you'll use constantly:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-6">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm"><code className="text-blue-600 dark:text-blue-400">COUNT()</code></h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Counts rows</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm"><code className="text-green-600 dark:text-green-400">SUM()</code></h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Totals values</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm"><code className="text-purple-600 dark:text-purple-400">AVG()</code></h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Averages values</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm"><code className="text-orange-600 dark:text-orange-400">MIN()</code></h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Finds minimum</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm"><code className="text-red-600 dark:text-red-400">MAX()</code></h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Finds maximum</p>
            </div>
          </div>

          <p className="mt-4">
            Let's see these in action. The playground below demonstrates how each function works on a simple employees table:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Basic aggregate functions on employees table

-- Count all employees
SELECT COUNT(*) AS total_employees FROM employees;

-- Count employees with non-NULL salaries
SELECT COUNT(salary) AS employees_with_salary FROM employees;

-- Calculate aggregate statistics for salaries
SELECT 
  COUNT(*) AS employee_count,
  SUM(salary) AS total_payroll,
  AVG(salary) AS average_salary,
  MIN(salary) AS lowest_salary,
  MAX(salary) AS highest_salary
FROM employees;

-- Fun fact: MIN/MAX work on dates and strings too!
SELECT 
  MIN(hire_date) AS earliest_hire,
  MAX(hire_date) AS latest_hire,
  MIN(name) AS alphabetically_first,
  MAX(name) AS alphabetically_last
FROM employees;`}
          />

          <p className="mt-6">
            These aggregate functions seem straightforward, but there's a critical behavior that trips up even experienced developers: 
            <strong>how they handle NULL values</strong>. Understanding this is essential to avoid subtle bugs in your analytics.
          </p>

          <Callout type="warning" title="Critical: Aggregate Functions and NULL Values">
            <p className="font-semibold mb-2">
              Aggregate functions have special NULL handling that trips up many developers:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><code>COUNT(*)</code> counts ALL rows, including rows with NULL values</li>
              <li><code>COUNT(column)</code> counts only rows where <code>column IS NOT NULL</code></li>
              <li><code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, <code>MAX()</code> ignore NULL values entirely</li>
              <li><code>AVG()</code> excludes NULLs from both numerator AND denominator</li>
              <li>If ALL values are NULL, most aggregates return NULL (except <code>COUNT</code>, which returns 0)</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong>Pro tip:</strong> To count NULL values: <code>COUNT(*) - COUNT(column)</code>
            </p>
          </Callout>

          <p className="mt-4">
            Let's see NULL handling in action with a concrete example:
          </p>

          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Source Table: employees (with NULLs)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-100 dark:bg-blue-900/30">
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">department</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Alice</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">90000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Bob</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Engineering</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-red-100 dark:bg-red-900/30">NULL</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Carol</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Sales</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">75000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">David</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Sales</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-red-100 dark:bg-red-900/30">NULL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                Note: 2 out of 4 employees have NULL salaries (highlighted in red)
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Aggregate Results</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">Aggregate</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">Result</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-mono">COUNT(*)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">4</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">All rows</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-mono">COUNT(salary)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">2</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Non-NULL salaries only</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-mono">SUM(salary)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">165000</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">90000 + 75000 (NULLs ignored)</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-mono">AVG(salary)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">82500</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">165000 / 2, not 4!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                Notice: AVG divides by 2 (non-NULL count), not 4 (total rows)
              </p>
            </div>
          </div>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Exploring NULL behavior in aggregates
-- (We'll create a table with some NULL values to demonstrate)

-- Count different ways
SELECT 
  COUNT(*) AS all_orders,                      -- Counts all rows
  COUNT(total_amount) AS orders_with_amount,   -- Counts non-NULL amounts
  COUNT(*) - COUNT(total_amount) AS null_amounts  -- How many are NULL?
FROM orders;

-- How aggregates handle NULLs
SELECT 
  SUM(total_amount) AS total_revenue,          -- NULLs ignored
  AVG(total_amount) AS avg_order_value,        -- Excludes NULLs from calculation
  MIN(total_amount) AS smallest_order,         -- NULLs ignored
  MAX(total_amount) AS largest_order           -- NULLs ignored
FROM orders;

-- Try: What if we want to treat NULL as 0?
SELECT 
  SUM(COALESCE(total_amount, 0)) AS total_revenue_treating_null_as_zero,
  AVG(COALESCE(total_amount, 0)) AS avg_treating_null_as_zero
FROM orders;`}
          />
        </Subsection>

        <Subsection title="GROUP BY: Organizing Data into Buckets">
          <p>
            <code>GROUP BY</code> is where aggregation gets really powerful. It divides rows into groups based on column values,
            then applies aggregate functions to each group separately.
          </p>

          <MermaidDiagram
            caption="How GROUP BY Works: Organizing Rows into Groups"
            chart={`
flowchart TD
    subgraph Input["📋 Step 1: Original Rows"]
        R1["Alice | Eng | 90k"] ~~~ R2["Bob | Eng | 85k"] ~~~ R3["Carol | Sales | 75k"] ~~~ R4["David | Sales | 70k"] ~~~ R5["Eve | HR | 65k"]
    end
    
    Input ==> GroupBy
    
    subgraph GroupBy["🗂️ Step 2: GROUP BY department"]
        G1["Eng: Alice, Bob"] ~~~ G2["Sales: Carol, David"] ~~~ G3["HR: Eve"]
    end
    
    GroupBy ==> Aggregate
    
    subgraph Aggregate["🔢 Step 3: Apply Aggregates"]
        A1["Eng<br/>AVG=87.5k, COUNT=2"] ~~~ A2["Sales<br/>AVG=72.5k, COUNT=2"] ~~~ A3["HR<br/>AVG=65k, COUNT=1"]
    end
            `}
          />

          <p className="mt-4">
            Let's see this transformation with actual data. Watch how individual employee rows get grouped by department, 
            then aggregated into summary statistics:
          </p>

          <div className="my-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Source Table: employees (8 rows)</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900/30">
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">id</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">department</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Alice</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Engineering</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">90000</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">2</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Bob</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Engineering</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">85000</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">3</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Frank</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Engineering</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">92000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">4</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Carol</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">75000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">5</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">David</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">70000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">6</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Grace</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">78000</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">7</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Eve</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">HR</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">65000</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">8</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Henry</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">HR</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">68000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4">
              Color grouping shows which rows belong together: 
              <span className="inline-block w-3 h-3 bg-green-200 dark:bg-green-900/40 mx-1 align-middle"></span> Engineering (3 rows),
              <span className="inline-block w-3 h-3 bg-orange-200 dark:bg-orange-900/40 mx-1 align-middle"></span> Sales (3 rows),
              <span className="inline-block w-3 h-3 bg-purple-200 dark:bg-purple-900/40 mx-1 align-middle"></span> HR (2 rows)
            </p>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Query: <code className="text-xs">SELECT department, COUNT(*), AVG(salary) FROM employees GROUP BY department;</code>
            </p>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">Result: Aggregated Summary (3 rows)</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900/30">
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">department</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">COUNT(*)</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">AVG(salary)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Engineering</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">3</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">89000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">3</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">74333</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">HR</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">2</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">66500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
              Notice: 8 rows collapsed into 3 summary rows—one per department
            </p>
          </div>

          <CodeExample
            title="GROUP BY Syntax"
            code={`SELECT 
  grouping_column,
  AGG_FUNCTION(column) AS alias
FROM table
WHERE row_filter          -- Filter BEFORE grouping
GROUP BY grouping_column
HAVING group_filter       -- Filter AFTER aggregation
ORDER BY column;

-- Multiple grouping columns
SELECT col1, col2, AGG_FUNCTION(col3)
FROM table
GROUP BY col1, col2;`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- GROUP BY: Analyze employees by department

-- Count employees per department
SELECT 
  department,
  COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC;

-- Salary statistics per department
SELECT 
  department,
  COUNT(*) AS employee_count,
  AVG(salary) AS avg_salary,
  MIN(salary) AS min_salary,
  MAX(salary) AS max_salary,
  SUM(salary) AS dept_payroll
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Multiple grouping columns: department + hire year
SELECT 
  department,
  strftime('%Y', hire_date) AS hire_year,  -- Extract year from date
  COUNT(*) AS hires_that_year
FROM employees
GROUP BY department, hire_year
ORDER BY department, hire_year;`}
          />

          <Callout type="info" title="GROUP BY Rule: SELECT Only Grouped or Aggregated Columns">
            <p>
              When using GROUP BY, your SELECT clause can only include:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>Columns listed in the GROUP BY clause</li>
              <li>Aggregate functions (COUNT, SUM, AVG, etc.)</li>
            </ol>
            <p className="mt-2">
              <strong>Why?</strong> Each group produces one output row. If you try to SELECT a column that's NOT grouped,
              SQL doesn't know which value from the group to show.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="Multiple Grouping Columns: Hierarchical Analysis">
          <p>
            You can GROUP BY multiple columns to create hierarchical summaries. This is incredibly powerful for analyzing data 
            at different levels of granularity—like sales by region AND product category, or user activity by country AND month.
          </p>

          <p className="mt-4">
            When you <code>GROUP BY col1, col2</code>, SQL creates a unique group for each combination of <code>col1</code> and 
            <code>col2</code> values. This results in more granular grouping than using a single column.
          </p>

          <div className="my-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Example: GROUP BY department, hire_year
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900/30">
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">department</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">hire_year</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Alice</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Eng</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2020</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">90000</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Bob</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Eng</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2020</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">85000</td>
                  </tr>
                  <tr className="bg-blue-50 dark:bg-blue-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Frank</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Eng</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2021</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">92000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">Carol</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2020</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">75000</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">David</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2021</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">70000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4">
              Each unique (department, hire_year) combination forms a separate group
            </p>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Result: 4 groups (not 2 departments or 2 years, but 4 combinations)
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900/30">
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">department</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">hire_year</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">COUNT(*)</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1">AVG(salary)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Eng</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2020</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">2</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">87500</td>
                  </tr>
                  <tr className="bg-blue-50 dark:bg-blue-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Eng</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2021</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">92000</td>
                  </tr>
                  <tr className="bg-orange-50 dark:bg-orange-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2020</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">75000</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/20">
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">Sales</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-semibold">2021</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">70000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
              Each row represents a unique (department, year) pair
            </p>
          </div>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Multi-level grouping: Sector → Year → Company count
SELECT 
  s.SectorName,
  fs.Year,
  COUNT(DISTINCT c.CompanyID) AS companies_filing,
  COUNT(fs.StatementID) AS total_statements,
  ROUND(AVG(li.Value) / 1000000000, 2) AS avg_revenue_billions
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'
GROUP BY s.SectorName, fs.Year
ORDER BY s.SectorName, fs.Year;

-- Try: Remove "fs.Year" from GROUP BY to see aggregation at sector level only
-- Try: Add "c.CompanyName" to GROUP BY to see company-level detail`}
          />

          <Callout type="tip" title="When to Use Multiple Grouping Columns">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Time-based analysis:</strong> GROUP BY region, year, month for trending</li>
              <li><strong>Category breakdowns:</strong> GROUP BY product_category, product_subcategory</li>
              <li><strong>Organizational hierarchies:</strong> GROUP BY country, state, city</li>
              <li><strong>A/B testing:</strong> GROUP BY experiment_group, user_segment</li>
            </ul>
            <p className="mt-2 text-sm">
              <strong>Rule of thumb:</strong> More grouping columns = more granular groups = more result rows
            </p>
          </Callout>
        </Subsection>

        <Subsection title="WHERE vs. HAVING: Two Levels of Filtering">
          <p>
            This is one of SQL's most confusing concepts for beginners: when to use WHERE vs. HAVING. The key is understanding
            <em>when</em> each operates in the query execution order (we'll explore this in detail in <a href="#section14" className="text-blue-600 dark:text-blue-400 hover:underline">Section 9: How SQL Really Works</a>):
          </p>

          <MermaidDiagram
            caption="WHERE vs HAVING: Different Stages of Filtering"
            chart={`
flowchart LR
    Start["📊 All Rows"] 
    
    Start ==>|"1️⃣ WHERE<br/>(filter rows)"| Filtered["Filtered Rows"]
    
    Filtered ==>|"2️⃣ GROUP BY<br/>(group)"| Grouped["Grouped Data"]
    
    Grouped ==>|"3️⃣ Aggregate<br/>(calculate)"| Aggregated["Group Results"]
    
    Aggregated ==>|"4️⃣ HAVING<br/>(filter groups)"| Final["✅ Final Result"]
            `}
          />

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Aspect</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">WHERE</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">HAVING</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Operates on</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Individual rows</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Grouped results</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Executes</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">BEFORE GROUP BY</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">AFTER GROUP BY</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Can use aggregates?</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">❌ No</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">✅ Yes</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Example</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>WHERE salary &gt; 80000</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>HAVING AVG(salary) &gt; 80000</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- WHERE vs HAVING demonstration

-- WRONG: Can't use aggregate in WHERE
-- SELECT department, AVG(salary)
-- FROM employees
-- WHERE AVG(salary) > 75000  -- ERROR!
-- GROUP BY department;

-- CORRECT: Use HAVING to filter groups
SELECT 
  department,
  COUNT(*) AS employee_count,
  AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 75000  -- Filter departments with high avg salary
ORDER BY avg_salary DESC;

-- Using BOTH WHERE and HAVING (common pattern)
SELECT 
  department,
  COUNT(*) AS employee_count,
  AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2020-01-01'  -- Filter rows: only recent hires
GROUP BY department
HAVING COUNT(*) >= 2             -- Filter groups: only depts with 2+ recent hires
ORDER BY avg_salary DESC;`}
          />
        </Subsection>

        <Subsection title="Advanced Aggregation Techniques">
          <p>
            Beyond basic aggregates, SQL provides powerful patterns for conditional aggregation, distinct counting, 
            string concatenation, and handling JOINs safely. These techniques are essential for real-world analytics.
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            1. COUNT DISTINCT: Counting Unique Values
          </p>

          <p className="mt-2">
            <code>COUNT(DISTINCT column)</code> counts only unique values, essential when dealing with many-to-many relationships 
            or de-duplicating counts across JOINs.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- COUNT vs COUNT DISTINCT: Understanding the difference

-- How many financial statements do we have?
SELECT COUNT(*) AS total_statements FROM Financial_Statements;

-- How many unique companies filed statements?
SELECT COUNT(DISTINCT CompanyID) AS unique_companies 
FROM Financial_Statements;

-- How many unique years are covered?
SELECT COUNT(DISTINCT Year) AS years_covered 
FROM Financial_Statements;

-- All together: Overall dataset statistics
SELECT 
  COUNT(*) AS total_statements,
  COUNT(DISTINCT CompanyID) AS unique_companies,
  COUNT(DISTINCT Year) AS years_covered,
  ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT CompanyID), 2) AS avg_statements_per_company
FROM Financial_Statements;`}
          />

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            2. Conditional Aggregation with CASE
          </p>

          <p className="mt-2">
            Use <code>CASE</code> inside aggregate functions to compute multiple metrics in a single query—no need for 
            separate queries or complex JOINs. This is sometimes called "pivoting" data.
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Conditional aggregation: Multiple metrics in one query

SELECT 
  customer_id,
  first_name || ' ' || last_name AS customer_name,
  -- Total orders
  COUNT(*) AS total_orders,
  -- Count orders by status (if we had a status column)
  -- For demo: count orders above/below $100
  SUM(CASE WHEN total_amount > 100 THEN 1 ELSE 0 END) AS large_orders,
  SUM(CASE WHEN total_amount <= 100 THEN 1 ELSE 0 END) AS small_orders,
  -- Revenue breakdown
  SUM(CASE WHEN total_amount > 100 THEN total_amount ELSE 0 END) AS revenue_from_large_orders,
  SUM(CASE WHEN total_amount <= 100 THEN total_amount ELSE 0 END) AS revenue_from_small_orders,
  -- Overall stats
  SUM(total_amount) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY customer_id, customer_name
HAVING COUNT(*) >= 2  -- Customers with 2+ orders
ORDER BY total_revenue DESC
LIMIT 10;

-- This is WAY more efficient than running separate queries!`}
          />

          <Callout type="tip" title="Conditional Aggregation Pattern">
            <p className="text-sm">
              <strong>Pattern:</strong> <code>SUM(CASE WHEN condition THEN 1 ELSE 0 END)</code> counts rows meeting a condition
              <br/>
              <strong>Alternative:</strong> <code>COUNT(CASE WHEN condition THEN 1 END)</code> also works (COUNT ignores NULLs)
              <br/>
              <strong>For sums:</strong> <code>SUM(CASE WHEN condition THEN amount ELSE 0 END)</code>
            </p>
          </Callout>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            3. String Aggregation: GROUP_CONCAT
          </p>

          <p className="mt-2">
            SQLite's <code>GROUP_CONCAT()</code> function (called <code>STRING_AGG()</code> in PostgreSQL, 
            <code>LISTAGG()</code> in Oracle) combines multiple text values from a group into a single string. 
            Incredibly useful for creating comma-separated lists.
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- String aggregation: Combine multiple values into one

-- What products did each customer order?
SELECT 
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer_name,
  COUNT(DISTINCT oi.product_id) AS unique_products_ordered,
  GROUP_CONCAT(DISTINCT p.product_name, ', ') AS products_list
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
GROUP BY c.customer_id, customer_name
ORDER BY unique_products_ordered DESC
LIMIT 10;

-- Try: Change the separator to ' | ' or add ORDER BY in GROUP_CONCAT
-- Syntax: GROUP_CONCAT(column, 'separator') ORDER BY column`}
          />

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            4. Aggregating with JOINs: The Duplicate Row Problem
          </p>

          <p className="mt-2">
            <strong>Critical gotcha:</strong> When you JOIN before aggregating, rows can multiply due to one-to-many 
            relationships, inflating your counts and sums. Always use <code>COUNT(DISTINCT ...)</code> or 
            <code>SUM(DISTINCT ...)</code> when aggregating across JOINs.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Demonstration: JOIN can inflate aggregate results!

-- WRONG: Naive aggregation after JOIN (double-counts)
-- Let's count statements per sector
SELECT 
  s.SectorName,
  COUNT(*) AS statement_count_WRONG  -- Inflated by Line_Items JOIN!
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID  -- This multiplies rows!
GROUP BY s.SectorName;

-- CORRECT: Use COUNT(DISTINCT) to handle duplicates
SELECT 
  s.SectorName,
  COUNT(DISTINCT fs.StatementID) AS statement_count_CORRECT,
  COUNT(DISTINCT c.CompanyID) AS company_count,
  COUNT(*) AS total_rows_after_join  -- Shows the multiplication
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
GROUP BY s.SectorName
ORDER BY s.SectorName;

-- Try: Compare the two results to see the difference`}
          />

          <Callout type="warning" title="Aggregation + JOIN = Danger Zone">
            <p className="text-sm font-semibold mb-2">
              When JOINing before aggregating, always ask: "Could this JOIN create duplicate rows?"
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>One-to-many relationships multiply rows (e.g., 1 customer → 5 orders)</li>
              <li>Use <code>COUNT(DISTINCT id)</code> instead of <code>COUNT(*)</code></li>
              <li>Use <code>SUM(DISTINCT ...)</code> only if values are unique per entity</li>
              <li>Or aggregate first in a subquery, then JOIN to the aggregated result</li>
            </ul>
          </Callout>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            5. Aggregates on Calculated Expressions
          </p>

          <p className="mt-2">
            You can apply aggregates to any expression—calculated columns, arithmetic, functions, and more.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Aggregating calculated values

SELECT 
  s.SectorName,
  COUNT(*) AS line_item_count,
  -- Aggregates on calculations
  ROUND(AVG(li.Value) / 1000000000, 2) AS avg_value_billions,
  ROUND(SUM(li.Value) / 1000000000, 2) AS total_billions,
  ROUND((MAX(li.Value) - MIN(li.Value)) / 1000000000, 2) AS range_billions,
  -- Aggregate of aggregate (not directly possible, but we can calculate)
  ROUND((MAX(li.Value) / AVG(li.Value)), 2) AS max_to_avg_ratio
FROM Sectors s
JOIN Companies c ON s.SectorID = c.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'
  AND li.Value IS NOT NULL
GROUP BY s.SectorName
HAVING COUNT(*) >= 3  -- Only sectors with sufficient data
ORDER BY total_billions DESC;`}
          />
        </Subsection>

        <Subsection title="Common Aggregation Patterns: Real-World Use Cases">
          <p>
            Every database-driven application uses these patterns constantly. Recognizing them helps you write queries faster 
            and understand what others have built.
          </p>

          <div className="my-4 space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-blue-900 dark:text-blue-200">1. Time-Series Analysis: Trending Over Time</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>GROUP BY YEAR(date), MONTH(date)</code> or similar
                <br/>
                <strong>Use case:</strong> Monthly revenue, daily active users, quarterly growth
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-green-900 dark:text-green-200">2. Cohort Analysis: Segmenting Users</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>GROUP BY user_segment, acquisition_month</code>
                <br/>
                <strong>Use case:</strong> Retention rates, lifetime value by cohort, feature adoption
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-semibold text-orange-900 dark:text-orange-200">3. Leaderboards and Rankings</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>GROUP BY user_id ORDER BY SUM(points) DESC LIMIT 10</code>
                <br/>
                <strong>Use case:</strong> Top customers, best-selling products, most active contributors
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold text-purple-900 dark:text-purple-200">4. Business Metrics Dashboards</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> Multiple conditional aggregates in one query
                <br/>
                <strong>Use case:</strong> Count active users, paying users, churned users—all at once
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <p className="font-semibold text-pink-900 dark:text-pink-200">5. Funnel Analysis: Conversion Rates</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>SUM(CASE WHEN stage='checkout' THEN 1 END) / SUM(CASE WHEN stage='view' THEN 1 END)</code>
                <br/>
                <strong>Use case:</strong> Signup conversion, purchase funnel, feature adoption rates
              </p>
            </div>
          </div>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Real-world pattern: Monthly revenue and customer growth

SELECT 
  strftime('%Y-%m', order_date) AS month,
  -- Revenue metrics
  COUNT(DISTINCT order_id) AS total_orders,
  COUNT(DISTINCT customer_id) AS active_customers,
  ROUND(SUM(total_amount), 2) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value,
  -- Growth indicators
  ROUND(SUM(total_amount) / COUNT(DISTINCT customer_id), 2) AS revenue_per_customer,
  -- Order size distribution
  SUM(CASE WHEN total_amount > 200 THEN 1 ELSE 0 END) AS large_orders,
  SUM(CASE WHEN total_amount BETWEEN 50 AND 200 THEN 1 ELSE 0 END) AS medium_orders,
  SUM(CASE WHEN total_amount < 50 THEN 1 ELSE 0 END) AS small_orders
FROM orders
GROUP BY month
ORDER BY month DESC;

-- This single query powers a typical SaaS dashboard!`}
          />
        </Subsection>

        <Subsection title='The "Top N Per Group" Challenge'>
          <p>
            One of the most common—and frustrating—problems beginners face: "How do I find the highest-paid employee 
            in <em>each</em> department?" or "Show me the top 3 products in each category." This is called the 
            "Top N per group" problem.
          </p>

          <p className="mt-4">
            <strong>The challenge:</strong> <code>GROUP BY</code> alone can't solve this. It gives you one aggregate 
            value per group, but you want multiple detail rows per group. Let's see why this is hard, and how to solve it.
          </p>

          <Callout type="warning" title="Why GROUP BY Doesn't Work">
            <p className="text-sm">
              <code>SELECT department, name, MAX(salary)</code> seems logical, but it violates the GROUP BY rule: 
              you can't SELECT individual row columns (<code>name</code>) when grouping—SQL doesn't know which name to show. 
              MAX(salary) gives you the highest salary per department, but not <em>who</em> has it.
            </p>
          </Callout>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            Solution 1: Subquery with JOIN (Pre-Window Functions Era)
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Find the highest-paid employee in each department

-- Step 1: Find the max salary per department (subquery)
-- Step 2: JOIN back to employees table to get the full row

SELECT 
  e.department,
  e.name,
  e.salary
FROM employees e
INNER JOIN (
  -- This subquery finds max salary per department
  SELECT department, MAX(salary) AS max_salary
  FROM employees
  GROUP BY department
) dept_max
  ON e.department = dept_max.department 
  AND e.salary = dept_max.max_salary
ORDER BY e.department;

-- This works, but it's verbose and can be inefficient`}
          />

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            Solution 2: Correlated Subquery (Elegant but Slow)
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Alternative: Correlated subquery approach

SELECT 
  e.department,
  e.name,
  e.salary
FROM employees e
WHERE e.salary = (
  -- For each employee, find the max salary in their department
  SELECT MAX(e2.salary)
  FROM employees e2
  WHERE e2.department = e.department
)
ORDER BY e.department;

-- This is more readable but runs the subquery for EVERY row (slow on large tables)`}
          />

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            The Modern Solution: Window Functions
          </p>

          <p className="mt-2">
            Window functions (covered in the next section) solve this elegantly with <code>ROW_NUMBER()</code> or 
            <code>RANK()</code>. They let you assign rankings <em>within</em> groups without collapsing rows. This is 
            the preferred approach in modern SQL.
          </p>

          <CodeExample
            title="Preview: Window Function Solution (Coming Next!)"
            code={`-- This is MUCH cleaner (requires window functions)
SELECT department, name, salary
FROM (
  SELECT 
    department, 
    name, 
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
  FROM employees
) ranked
WHERE rank = 1;

-- Stay tuned for the Window Functions section!`}
          />
        </Subsection>

        <Subsection title="Common Aggregation Mistakes and How to Fix Them">
          <p>
            These errors trip up beginners and experienced developers alike. Learn to recognize and avoid them:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-red-100 dark:bg-red-900/30">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Symptom / Error</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cause</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    "Column must appear in GROUP BY or be used in aggregate"
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Trying to SELECT a column that's not grouped
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Add column to GROUP BY or remove it from SELECT
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    COUNT returns different number than expected
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Using <code>COUNT(column)</code> on column with NULLs
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Use <code>COUNT(*)</code> to count all rows, or handle NULLs explicitly
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    "Aggregate functions are not allowed in WHERE"
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Trying to filter on an aggregate in WHERE clause
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Use HAVING instead of WHERE for aggregate filters
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    AVG() doesn't match manual calculation
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Forgot that AVG() excludes NULLs from denominator
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Understand NULL behavior: AVG ignores NULLs, doesn't count them as zeros
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Group has too many rows after GROUP BY
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Grouping by wrong column (e.g., ID instead of category)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Verify you're grouping by the right column(s) for your analysis
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Counts inflated after adding JOIN
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    One-to-many JOIN multiplied rows before aggregation
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Use <code>COUNT(DISTINCT id)</code> or aggregate in subquery first
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Query is very slow on large dataset
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    No index on GROUP BY or JOIN columns
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Add indexes to columns used in GROUP BY and JOIN ON clauses
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    "No such function: GROUP_CONCAT"
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Using SQLite function in PostgreSQL/MySQL
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Use <code>STRING_AGG()</code> (PostgreSQL) or <code>GROUP_CONCAT()</code> (MySQL/SQLite)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="success" title="Debugging Aggregation Queries">
            <p className="text-sm font-semibold mb-2">When your GROUP BY query isn't working:</p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Remove GROUP BY and run the ungrouped query—do the rows look right?</li>
              <li>Add one grouping column at a time and check row counts</li>
              <li>Use <code>LIMIT 100</code> while debugging to speed up iterations</li>
              <li>Add <code>COUNT(*) AS row_count</code> to see group sizes</li>
              <li>Check for NULLs with <code>COUNT(*)</code> vs <code>COUNT(column)</code></li>
              <li>If numbers seem off after JOIN, check for duplicate rows with <code>COUNT(DISTINCT id)</code></li>
            </ol>
          </Callout>
        </Subsection>

        <Callout type="ai" title="AI-Assisted Aggregation: Generating Summary Reports">
          <p>
            AI excels at writing GROUP BY queries when you describe what insights you want. The key is being specific about
            grouping dimensions and metrics.
          </p>

          <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
            <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
            <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema: employees (id, name, department, salary, hire_date)

Task: Create a department summary report showing:
- Department name
- Total employee count
- Average salary
- Salary range (max - min)
- Total department payroll

Filter: Only include departments with 3+ employees
Sort: By average salary descending

Generate: SQLite query with clear column aliases`}
            </pre>
          </div>
        </Callout>

        <p className="mt-6">
          Aggregation and GROUP BY transform SQL from a data retrieval language into an analytical powerhouse. You've learned 
          the five core aggregates, GROUP BY mechanics, NULL handling, WHERE vs. HAVING, multi-column grouping, conditional 
          aggregation with CASE, string aggregation, and how to avoid the most common pitfalls. You've also seen real-world 
          patterns and gotten a preview of the "Top N per group" challenge that will be solved elegantly with window functions.
        </p>

        <p className="mt-4">
          Next, we'll explore subqueries and CTEs—techniques for breaking down complex analytical logic into manageable, 
          readable steps. You'll see how to compose queries like building blocks, making even the most intricate data 
          questions tractable.
        </p>
      </Section>

      {/* SECTION 5: Subqueries and CTEs */}
      <Section id="section10" title="Subqueries and CTEs - Breaking Down Complexity" level={2}>
        <p>
          As your analytical questions grow more complex, single-level queries become unwieldy. You need to break problems
          into logical steps: "First find X, then use that result to find Y." This is where <strong>subqueries</strong> and
          <strong>Common Table Expressions (CTEs)</strong> shine.
        </p>

        <p className="mt-4">
          These features let you compose complex logic from simple building blocks—making SQL queries more readable, maintainable,
          and easier to debug.
        </p>

        <Subsection title="Subqueries: Queries Within Queries">
          <p>
            A <strong>subquery</strong> (or nested query) is a SELECT statement embedded inside another SQL statement. Subqueries
            can appear in various places—SELECT, FROM, WHERE, HAVING—and return different types of results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scalar Subquery</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">Returns a single value (one row, one column). Use with =, &lt;, &gt;, etc.</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Row Subquery</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">Returns a single row with multiple columns. Rarely used in practice.</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Table Subquery</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">Returns multiple rows. Use with IN, EXISTS, or as a derived table in FROM.</p>
            </div>
          </div>

          <p className="mt-4">
            Let's explore these types in action. The playground below demonstrates both <strong>scalar subqueries</strong> 
            (returning a single value for comparison) and <strong>table subqueries</strong> (returning multiple rows for 
            use with IN):
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Scalar subquery: Compare to average
-- Find employees earning more than the average salary

SELECT 
  name,
  department,
  salary,
  (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- Subquery with IN: Find employees in high-paying departments
SELECT name, department, salary
FROM employees
WHERE department IN (
  SELECT department
  FROM employees
  GROUP BY department
  HAVING AVG(salary) > 75000
)
ORDER BY department, salary DESC;`}
          />

          <p className="mt-6">
            <strong>Subqueries in FROM:</strong> You can use a subquery as a "derived table" in the FROM clause, treating
            the subquery result as a temporary table:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Derived table: Calculate dept stats, then rank departments

SELECT 
  dept_name,
  avg_salary,
  CASE 
    WHEN avg_salary > 85000 THEN 'Premium'
    WHEN avg_salary > 70000 THEN 'Competitive'
    ELSE 'Standard'
  END AS pay_tier
FROM (
  -- This subquery calculates per-department averages
  SELECT 
    department AS dept_name,
    AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_stats
ORDER BY avg_salary DESC;`}
          />
        </Subsection>

        <Subsection title="Correlated Subqueries: Referencing Outer Query">
          <p>
            A <strong>correlated subquery</strong> references columns from the outer query. It's executed once per row of the
            outer query, making it potentially slow but very powerful for row-by-row comparisons.
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Correlated subquery: Find employees earning above their department average

SELECT 
  e1.name,
  e1.department,
  e1.salary,
  (
    -- This subquery runs for EACH employee (e1)
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department = e1.department  -- Correlation: refers to outer query
  ) AS dept_avg
FROM employees e1
WHERE e1.salary > (
  SELECT AVG(salary)
  FROM employees e2
  WHERE e2.department = e1.department
)
ORDER BY e1.department, e1.salary DESC;`}
          />

          <Callout type="warning" title="Performance Warning: Correlated Subqueries">
            <p>
              Correlated subqueries execute once per row of the outer query. For a table with 10,000 rows, the inner query
              runs 10,000 times! Modern optimizers sometimes rewrite them as joins, but not always.
            </p>
            <p className="mt-2">
              <strong>Better alternative:</strong> Use JOINs or window functions when possible (covered in Section 7).
            </p>
          </Callout>
        </Subsection>

        <Subsection title="EXISTS and NOT EXISTS: Testing for Existence">
          <p>
            <code>EXISTS</code> is a special operator that returns TRUE if a subquery returns any rows. It's optimized to stop
            as soon as it finds the first match (unlike IN, which processes all results). This makes it significantly faster 
            for checking existence, especially with large datasets.
          </p>

          <p className="mt-4">
            <code>NOT EXISTS</code> is the inverse—it returns TRUE if the subquery returns <em>no</em> rows. This is perfect 
            for finding "missing" relationships: customers who haven't ordered, products with no reviews, users who haven't 
            logged in.
          </p>

          <p className="mt-4">
            Here's how to use both for common analytical questions:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- EXISTS: Find customers who have placed at least one order
-- (More efficient than IN for large datasets)

SELECT 
  customer_id,
  first_name,
  last_name,
  email
FROM customers c
WHERE EXISTS (
  SELECT 1  -- The SELECT clause doesn't matter for EXISTS
  FROM orders o
  WHERE o.customer_id = c.customer_id
)
ORDER BY last_name, first_name;

-- NOT EXISTS: Find customers who have NEVER placed an order
SELECT 
  customer_id,
  first_name,
  last_name,
  email
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.customer_id
)
ORDER BY last_name, first_name;`}
          />
        </Subsection>

        <Subsection title="Common Table Expressions (CTEs): WITH Clause">
          <p>
            <strong>CTEs</strong> (Common Table Expressions) are one of SQL's most powerful features for writing maintainable, 
            readable queries. Introduced with the <code>WITH</code> clause, CTEs let you break complex queries into named, 
            logical steps—like defining variables or functions before using them.
          </p>

          <p className="mt-4">
            Think of a CTE as a temporary, named result set that exists only for the duration of your query. Instead of deeply 
            nested subqueries that are hard to read and debug, you write a series of clear, sequential transformations. Each CTE 
            can reference previously defined CTEs, building up complex logic step by step.
          </p>

          <Callout type="info" title="Why Use CTEs Instead of Subqueries?">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Readability:</strong> Name your intermediate results meaningfully (<code>high_value_customers</code>, not <code>subquery3</code>)</li>
              <li><strong>Maintainability:</strong> Modify one CTE without touching the rest of the query</li>
              <li><strong>Debuggability:</strong> Test each CTE independently by selecting from it directly</li>
              <li><strong>Reusability:</strong> Reference the same CTE multiple times in your query (can't do this with subqueries!)</li>
              <li><strong>Organization:</strong> Present complex logic as a sequence of clear transformations</li>
            </ul>
          </Callout>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            When Should You Use CTEs?
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li>When your query has multiple logical steps (aggregate, then filter, then join)</li>
            <li>When you need to reference the same subquery result multiple times</li>
            <li>When you're joining complex aggregations together</li>
            <li>When debugging complex queries (isolate each step)</li>
            <li>When working with hierarchical data (recursive CTEs)</li>
            <li>When your team needs to understand or modify your SQL later</li>
          </ul>

          <MermaidDiagram
            caption="CTE Benefits: Readability and Reusability"
            chart={`
flowchart TD
    subgraph Complex["❌ Nested Subqueries"]
        C1["😵 Hard to read"] ~~~ C2["🐛 Hard to debug"] ~~~ C3["📋 Copy-paste reuse"]
    end
    
    Complex ==> |"Refactor"| CTE
    
    subgraph CTE["✅ CTEs (WITH)"]
        T1["✨ Clear step-by-step"] ~~~ T2["🔍 Test each CTE"] ~~~ T3["♻️ Reuse by name"]
    end
            `}
          />

          <CodeExample
            title="CTE Syntax"
            code={`-- Single CTE
WITH cte_name AS (
  SELECT column1, column2
  FROM table
  WHERE condition
)
SELECT * FROM cte_name;

-- Multiple CTEs (separated by commas, not semicolons!)
WITH
  cte1 AS (SELECT ...),
  cte2 AS (SELECT ...),
  cte3 AS (SELECT ...)
SELECT * FROM cte1
JOIN cte2 ON ...
JOIN cte3 ON ...;`}
          />

          <p className="mt-4">
            Now let's see CTEs in action with a real-world example. This query analyzes customer behavior using a three-step 
            transformation: first aggregating order statistics, then categorizing customers into tiers, and finally joining with 
            customer details for a complete report. Notice how each CTE builds on the previous one:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- CTE example: Multi-step customer analysis

WITH 
  -- Step 1: Calculate per-customer order statistics
  customer_orders AS (
    SELECT 
      customer_id,
      COUNT(*) AS order_count,
      SUM(total_amount) AS total_spent,
      AVG(total_amount) AS avg_order_value,
      MAX(order_date) AS last_order_date
    FROM orders
    GROUP BY customer_id
  ),
  -- Step 2: Categorize customers by spending
  customer_tiers AS (
    SELECT 
      *,
      CASE
        WHEN total_spent >= 1000 THEN 'VIP'
        WHEN total_spent >= 500 THEN 'Premium'
        ELSE 'Standard'
      END AS customer_tier
    FROM customer_orders
  )
-- Step 3: Join with customer details and final filter
SELECT 
  c.first_name || ' ' || c.last_name AS customer_name,
  c.email,
  ct.order_count,
  ct.total_spent,
  ct.avg_order_value,
  ct.customer_tier,
  ct.last_order_date
FROM customer_tiers ct
JOIN customers c ON ct.customer_id = c.customer_id
WHERE ct.customer_tier IN ('VIP', 'Premium')
ORDER BY ct.total_spent DESC;`}
          />

          <p className="mt-6">
            Notice how this query reads like a story: "First, calculate order stats per customer. Then, categorize them into tiers. 
            Finally, join with customer details and filter." Compare this to the equivalent nested subquery version—it would be 
            nearly impossible to understand at a glance.
          </p>

          <Callout type="tip" title="CTE Best Practices">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Name descriptively:</strong> Use clear names like <code>active_customers</code>, not <code>cte1</code></li>
              <li><strong>One transformation per CTE:</strong> Don't try to do everything in one CTE</li>
              <li><strong>Comment your intent:</strong> Add a comment above each CTE explaining what it does</li>
              <li><strong>Test incrementally:</strong> Run <code>SELECT * FROM cte_name</code> to verify each step</li>
              <li><strong>Order matters:</strong> Each CTE can only reference CTEs defined before it</li>
              <li><strong>Comma separation:</strong> Multiple CTEs are separated by commas, not semicolons!</li>
            </ul>
          </Callout>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            CTE Performance Note
          </p>

          <p className="mt-2">
            In most databases, CTEs are <strong>optimization fences</strong>—the database optimizer treats each CTE as a 
            separate step. This can sometimes be slower than a single complex query, but the readability and maintainability 
            benefits usually far outweigh minor performance differences. Modern database optimizers (PostgreSQL 12+, SQL Server) 
            can often "inline" simple CTEs automatically.
          </p>

          <p className="mt-4">
            <strong>Pro tip:</strong> If you need to reference the same complex calculation multiple times in a query, CTEs 
            can actually <em>improve</em> performance by computing it once instead of multiple times (as you'd have to with 
            subqueries).
          </p>

          <p className="mt-6 font-semibold text-gray-900 dark:text-white">
            Real-World CTE Patterns
          </p>

          <div className="my-4 space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-blue-900 dark:text-blue-200">Pattern 1: Sequential Filters</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <code>WITH active_users AS (...), paying_users AS (SELECT * FROM active_users WHERE ...)</code>
                <br/>Apply filters one at a time, narrowing down your dataset step by step.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-green-900 dark:text-green-200">Pattern 2: Aggregate Then Join</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <code>WITH order_stats AS (SELECT customer_id, SUM(...) FROM orders GROUP BY ...)</code>
                <br/>Aggregate data first, then join the summary to other tables for enrichment.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold text-purple-900 dark:text-purple-200">Pattern 3: Multiple Aggregations</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <code>WITH sales_by_month AS (...), sales_by_product AS (...)</code>
                <br/>Compute different aggregations, then join or UNION them together.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-semibold text-orange-900 dark:text-orange-200">Pattern 4: Data Enrichment Pipeline</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <code>WITH raw AS (...), cleaned AS (SELECT * FROM raw WHERE ...), enriched AS (...)</code>
                <br/>Transform raw data through multiple stages before final analysis.
              </p>
            </div>
          </div>
        </Subsection>

        <Subsection title="Recursive CTEs: Hierarchies and Graphs">
          <p>
            <strong>Recursive CTEs</strong> are CTEs that reference themselves—enabling queries on hierarchical or graph-structured
            data like organizational charts, bill-of-materials, or category trees.
          </p>

          <Callout type="tip" title="Recursive CTE Structure">
            <p>A recursive CTE has two parts:</p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li><strong>Anchor member:</strong> The base case (non-recursive SELECT)</li>
              <li><strong>Recursive member:</strong> References the CTE itself (connected by UNION ALL)</li>
            </ol>
            <p className="mt-2">
              The recursion continues until the recursive member returns no rows.
            </p>
          </Callout>

          <CodeExample
            title="Recursive CTE Syntax"
            code={`WITH RECURSIVE cte_name AS (
  -- Anchor: Base case
  SELECT ...
  FROM table
  WHERE ...
  
  UNION ALL
  
  -- Recursive: References cte_name
  SELECT ...
  FROM table
  JOIN cte_name ON ...  -- Self-reference!
  WHERE ...              -- Termination condition
)
SELECT * FROM cte_name;`}
          />

          <p className="mt-4">
            Let's start with a simple example to understand the mechanics. This playground demonstrates recursive CTEs with 
            two classic use cases: generating a number sequence (the "Hello World" of recursion) and then a practical application 
            for creating date ranges for reports. Watch how the anchor member starts the recursion and the recursive member 
            keeps going until the condition is no longer met:
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Recursive CTE: Generate a sequence of numbers

WITH RECURSIVE number_sequence AS (
  -- Anchor: Start at 1
  SELECT 1 AS n
  
  UNION ALL
  
  -- Recursive: Add 1 each time, stop at 10
  SELECT n + 1
  FROM number_sequence
  WHERE n < 10
)
SELECT n AS number FROM number_sequence;

-- Practical use: Generate date range for reporting
WITH RECURSIVE date_range AS (
  SELECT DATE('2024-01-01') AS report_date
  
  UNION ALL
  
  SELECT DATE(report_date, '+1 day')
  FROM date_range
  WHERE report_date < DATE('2024-01-10')
)
SELECT 
  report_date,
  strftime('%w', report_date) AS day_of_week,
  CASE strftime('%w', report_date)
    WHEN '0' THEN 'Sunday'
    WHEN '6' THEN 'Saturday'
    ELSE 'Weekday'
  END AS day_type
FROM date_range;`}
          />

          <p className="mt-6">
            Recursive CTEs are powerful but can be tricky. Always ensure you have a proper termination condition to avoid
            infinite recursion!
          </p>
        </Subsection>

        <Callout type="ai" title="AI-Assisted Query Decomposition with CTEs">
          <p>
            When facing a complex analytical question, ask AI to break it down into CTEs. This makes the query easier to
            understand and debug.
          </p>

          <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
            <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
            <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema: 
- orders (order_id, customer_id, order_date, total_amount)
- customers (customer_id, name, email, region)

Task: Find the top 3 customers by total spending in each region,
but only for customers who've placed at least 3 orders.

Generate: SQLite query using CTEs to break down the logic into clear steps.
Add comments explaining each CTE's purpose.`}
            </pre>
          </div>
        </Callout>

        <p className="mt-6">
          Subqueries and CTEs are essential tools for complex analytical queries. Next, we'll explore Window Functions—a
          modern SQL feature that provides even more powerful analytical capabilities.
        </p>
      </Section>

      {/* ============================================
          SECTION 6: Window Functions - Advanced Analytics
          ============================================ */}
      <Section id="section11" title="7. Window Functions: Analytics Without Grouping">
        <p>
          <strong>Window functions</strong> are one of SQL's most powerful modern features, introduced in SQL:2003. They solve 
          a fundamental limitation of SQL: how to perform calculations across related rows <em>without losing the individual row 
          detail</em>. This is the problem GROUP BY can't solve—it forces you to collapse rows into summaries.
        </p>

        <p className="mt-4">
          Remember the "Top N per group" challenge from the Aggregation section? Window functions provide the elegant solution. 
          They let you answer questions like "Show me each employee's salary <em>and</em> their rank within their department" 
          in a single, clean query—no complex self-joins or correlated subqueries required.
        </p>

        <p className="mt-4">
          Think of window functions as adding a "sidebar calculation" to each row. You keep all your individual rows while also 
          seeing aggregate, ranking, or comparative information computed across a "window" of related rows.
        </p>

        <Callout type="tip" title="Window Functions vs. GROUP BY: The Key Difference">
          <p className="font-semibold mb-2">
            The fundamental distinction:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>GROUP BY</strong> collapses multiple rows into summary rows (5 employees → 3 departments)</li>
            <li><strong>Window functions</strong> add calculated columns to existing rows (5 employees → 5 employees with rankings)</li>
          </ul>
          <p className="mt-3 text-sm">
            This means you can show <em>both</em> individual detail <em>and</em> group-level insights in the same result set. 
            It's like having your cake and eating it too—you get the granularity of raw data with the analytical power of aggregation.
          </p>
        </Callout>

        <p className="mt-6">
          Let's visualize how window functions work with four common patterns:
        </p>

        <WindowFunctionFigure />

        <Subsection title="Ranking Functions: ROW_NUMBER, RANK, DENSE_RANK">
          <p>
            The most common window functions assign ranks or row numbers based on an ordering. Understanding the differences
            between these three is crucial:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Function</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Behavior on Ties</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example (Salaries: 100K, 100K, 90K)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">ROW_NUMBER()</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Assigns unique numbers arbitrarily for ties</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">1, 2, 3</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">RANK()</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Same rank for ties, then skips numbers</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">1, 1, 3</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">DENSE_RANK()</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Same rank for ties, no gaps</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">1, 1, 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Let's see this in action with actual data. The playground below demonstrates all three ranking functions side by side, 
            so you can compare their behavior when there are ties in the salary values:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Compare ranking functions: Finding top earners

SELECT 
  name,
  department,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
  RANK() OVER (ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees
ORDER BY salary DESC, name;

-- Notice the difference when there are salary ties!`}
          />

          <p className="mt-4">
            The <code>OVER</code> clause defines the "window" of rows to consider. Here, <code>ORDER BY salary DESC</code>
            ranks all employees by salary (highest first).
          </p>
        </Subsection>

        <Subsection title="PARTITION BY: Ranking Within Groups">
          <p>
            The real power of window functions emerges with <code>PARTITION BY</code>, which divides rows into groups before
            applying the window function. This lets you rank or calculate statistics <em>within each partition</em> independently.
          </p>

          <p className="mt-4">
            Here's the key insight: without <code>PARTITION BY</code>, the window function operates over ALL rows. With 
            <code>PARTITION BY</code>, it resets for each group. This solves the "Top N per group" problem elegantly. Let's see 
            how to rank employees within their own departments:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Rank employees within their own department

SELECT 
  name,
  department,
  salary,
  RANK() OVER (
    PARTITION BY department 
    ORDER BY salary DESC
  ) AS dept_rank
FROM employees
ORDER BY department, dept_rank;

-- Each department's ranking resets independently!
-- Engineering rank 1 vs Sales rank 1 are unrelated`}
          />

          <p className="mt-4">
            This query answers: "Within each department, how does this employee's salary rank?" Without window functions,
            you'd need complex self-joins or correlated subqueries.
          </p>
        </Subsection>

        <Subsection title="Aggregate Window Functions: Running Totals and Moving Averages">
          <p>
            You can use familiar aggregate functions (<code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, etc.) as window
            functions by adding an <code>OVER</code> clause. This creates powerful analytical capabilities like running totals
            and moving averages—essential for time-series analysis, financial dashboards, and trend visualization.
          </p>

          <p className="mt-4">
            The magic happens with the <strong>window frame specification</strong> (<code>ROWS BETWEEN...</code>), which defines 
            exactly which rows relative to the current row should be included in the calculation. Let's see running totals and 
            rolling averages in action:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Running total of order amounts over time

SELECT 
  order_id,
  order_date,
  total_amount,
  -- Running total: sum of all orders up to and including this one
  SUM(total_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  -- Rolling 3-order average
  AVG(total_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_avg_3
FROM orders
ORDER BY order_date, order_id
LIMIT 20;`}
          />

          <Callout type="info" title="Window Frame Specification">
            <p>
              The <code>ROWS BETWEEN ... AND ...</code> clause defines the <strong>window frame</strong>—which rows relative
              to the current row are included in the calculation:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li><code>UNBOUNDED PRECEDING</code>: From the first row of the partition</li>
              <li><code>CURRENT ROW</code>: The current row</li>
              <li><code>N PRECEDING</code>: N rows before the current row</li>
              <li><code>N FOLLOWING</code>: N rows after the current row</li>
              <li><code>UNBOUNDED FOLLOWING</code>: To the last row of the partition</li>
            </ul>
            <p className="mt-2">
              Default (if omitted): <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>
            </p>
          </Callout>
        </Subsection>

        <Subsection title="LAG and LEAD: Accessing Adjacent Rows">
          <p>
            <code>LAG()</code> and <code>LEAD()</code> let you access values from previous or subsequent rows without self-joins.
            This is invaluable for time-series analysis, calculating changes, or comparing sequential records.
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Calculate time between orders for each customer

SELECT 
  customer_id,
  order_id,
  order_date,
  total_amount,
  -- Previous order date for this customer
  LAG(order_date) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date
  ) AS prev_order_date,
  -- Days since previous order
  JULIANDAY(order_date) - JULIANDAY(
    LAG(order_date) OVER (
      PARTITION BY customer_id 
      ORDER BY order_date
    )
  ) AS days_since_last_order,
  -- Compare to next order amount
  LEAD(total_amount) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date
  ) AS next_order_amount
FROM orders
WHERE customer_id IN (1, 2)
ORDER BY customer_id, order_date;`}
          />

          <p className="mt-4">
            <code>LAG(column, offset, default)</code> retrieves the value from <code>offset</code> rows before the current row.
            <br />
            <code>LEAD(column, offset, default)</code> retrieves the value from <code>offset</code> rows after.
            <br />
            The <code>default</code> value is returned when no such row exists (e.g., first row for LAG).
          </p>
        </Subsection>

        <Subsection title="NTILE: Dividing Data into Buckets">
          <p>
            <code>NTILE(n)</code> distributes rows into <code>n</code> roughly equal groups (buckets). This is perfect for
            percentile analysis, creating quartiles, or segmenting data for A/B testing.
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Divide employees into salary quartiles (4 buckets)

SELECT 
  name,
  department,
  salary,
  NTILE(4) OVER (ORDER BY salary) AS salary_quartile,
  CASE NTILE(4) OVER (ORDER BY salary)
    WHEN 4 THEN 'Top 25%'
    WHEN 3 THEN 'Upper Middle'
    WHEN 2 THEN 'Lower Middle'
    WHEN 1 THEN 'Bottom 25%'
  END AS salary_bracket
FROM employees
ORDER BY salary DESC;

-- Each quartile contains ~25% of employees`}
          />
        </Subsection>

        <Subsection title="Common Window Function Patterns: Real-World Use Cases">
          <p>
            Window functions appear constantly in production SQL. Recognizing these patterns helps you write better queries and 
            understand what colleagues have built. Here are the six most common use cases you'll encounter:
          </p>

          <div className="my-4 space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-blue-900 dark:text-blue-200">1. 🏆 Leaderboards & Top N Per Group</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>ROW_NUMBER() OVER (PARTITION BY category ORDER BY score DESC)</code>
                <br/>
                <strong>Use cases:</strong> Top-selling products per region, highest-rated items per category, best employees per department
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-green-900 dark:text-green-200">2. 📈 Running Totals & Cumulative Metrics</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)</code>
                <br/>
                <strong>Use cases:</strong> Cumulative revenue dashboards, year-to-date sales, lifetime customer value calculation
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold text-purple-900 dark:text-purple-200">3. 📊 Moving Averages & Trend Smoothing</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>AVG(value) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>
                <br/>
                <strong>Use cases:</strong> 7-day rolling averages, smoothing noisy time-series data, stock price moving averages
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-semibold text-orange-900 dark:text-orange-200">4. 📉 Period-over-Period Comparisons</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>LAG(revenue, 1) OVER (PARTITION BY product ORDER BY month)</code>
                <br/>
                <strong>Use cases:</strong> Month-over-month growth, same-quarter-last-year comparisons, sequential change analysis
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <p className="font-semibold text-pink-900 dark:text-pink-200">5. 🎯 Percentile Analysis & Segmentation</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>NTILE(100) OVER (ORDER BY spend)</code> or <code>PERCENT_RANK() OVER (ORDER BY score)</code>
                <br/>
                <strong>Use cases:</strong> Customer segmentation (top 10%, bottom quartile), performance distributions, outlier detection
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-4">
              <p className="font-semibold text-teal-900 dark:text-teal-200">6. 🔄 Sequential Pattern Detection</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Pattern:</strong> <code>LEAD(status) OVER (PARTITION BY user_id ORDER BY timestamp)</code>
                <br/>
                <strong>Use cases:</strong> User journey analysis (page view sequences), churn prediction (no activity after X days), funnel drop-off detection
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
            <strong>Pro tip:</strong> Most analytical queries involve one or more of these six patterns. When facing a complex 
            analytical question, ask yourself: "Is this fundamentally a ranking problem? A running total? A comparison to previous 
            rows?" This helps you choose the right window function approach.
          </p>
        </Subsection>

        <Subsection title="Combining Window Functions: Real-World Analytics">
          <p>
            The true power of window functions shines when you combine multiple in a single query for sophisticated analysis.
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Comprehensive employee analytics in one query

SELECT 
  name,
  department,
  salary,
  -- Rankings within department
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  -- Percentile within company
  NTILE(100) OVER (ORDER BY salary) AS percentile,
  -- Department statistics
  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
  -- Deviation from department average
  ROUND(salary - AVG(salary) OVER (PARTITION BY department), 0) AS diff_from_dept_avg,
  -- Company-wide statistics
  AVG(salary) OVER () AS company_avg_salary,
  -- Salary as percentage of department total
  ROUND(100.0 * salary / SUM(salary) OVER (PARTITION BY department), 2) AS pct_of_dept_payroll
FROM employees
ORDER BY department, salary DESC;`}
          />

          <p className="mt-4">
            This single query provides multi-dimensional insights: individual performance, departmental comparisons, and
            company-wide context—all without GROUP BY collapsing the rows.
          </p>
        </Subsection>

        <Callout type="ai" title="AI-Assisted Window Function Design">
          <p>
            Window functions can be tricky to design correctly. AI assistants excel at translating analytical questions
            into window function syntax.
          </p>

          <div className="mt-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-500 dark:border-teal-700 rounded-lg p-4">
            <p className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Example Prompt:</p>
            <pre className="text-sm text-teal-800 dark:text-teal-300 whitespace-pre-wrap">
{`Schema:
- sales (sale_id, product_id, sale_date, quantity, revenue)

Task: For each sale, show:
1. The sale's rank within its month (by revenue)
2. The 7-day moving average of revenue (including current sale)
3. The percentage change from the previous sale's revenue

Generate: SQLite query using appropriate window functions.`}
            </pre>
          </div>

          <p className="mt-4 text-sm">
            <strong>Pro tip:</strong> When debugging window functions, test each one separately before combining them.
            Add one window function at a time to identify which calculation isn't behaving as expected.
          </p>
        </Callout>

        <Subsection title="Common Window Function Mistakes & How to Fix Them">
          <p>
            Window functions are powerful but can be tricky. Here are the most common errors beginners (and even experienced developers) 
            make, along with the fixes:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">❌ Mistake</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Why It Fails</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">✅ Fix</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    WHERE ROW_NUMBER() = 1
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Window functions can't be used in WHERE—they're evaluated <em>after</em> WHERE
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Use a CTE or subquery, then filter in outer query
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    GROUP BY with window function in SELECT
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Window functions are incompatible with GROUP BY in the same query level
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Do GROUP BY first in a CTE, then apply window functions in outer query
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Forgetting ORDER BY in OVER clause
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Ranking and LAG/LEAD require ORDER BY to be meaningful; results will be arbitrary
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Always specify ORDER BY for ranking, running totals, and LAG/LEAD
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Using PARTITION BY without ORDER BY
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    PARTITION BY divides data; ORDER BY defines sequence. Both are needed for rankings
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    PARTITION BY category ORDER BY score DESC
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Expecting RANK() to skip duplicate ranks
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    RANK() <em>does</em> skip (1,2,2,4); DENSE_RANK() doesn't (1,2,2,3)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Use DENSE_RANK() if you want consecutive ranks (no gaps)
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Window frame issues (ROWS vs RANGE)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ROWS counts physical rows; RANGE groups by value (can include multiple rows per "position")
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Use ROWS for rolling windows, RANGE for value-based windows
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Not handling NULLs from LAG/LEAD
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    First row has no LAG; last row has no LEAD—returns NULL
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    LAG(col, 1, 0) or COALESCE(LAG(col), 0)
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Duplicate OVER clauses (verbose)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Repeating long OVER(...) clauses makes queries hard to read and maintain
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    Use WINDOW clause: WINDOW w AS (PARTITION BY dept ORDER BY sal)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="Debugging Window Functions: A Systematic Approach">
            <p className="text-sm mb-2"><strong>When your window function query doesn't work:</strong></p>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li>Remove the window function and verify the base query returns expected data</li>
              <li>Add just the <code>OVER ()</code> clause (empty) to see if the window function executes at all</li>
              <li>Add <code>ORDER BY</code> and check if ranking makes sense</li>
              <li>Add <code>PARTITION BY</code> and verify partitions are correctly formed</li>
              <li>If filtering results, wrap in a CTE/subquery—never filter window functions in WHERE</li>
            </ol>
            <p className="text-sm mt-2 italic">
              Most window function bugs come from filtering or grouping issues. The CTE wrapper is your best friend!
            </p>
          </Callout>
        </Subsection>

        <Callout type="warning" title="Window Functions and Database Compatibility">
          <p>
            While window functions are part of the SQL standard (SQL:2003, SQL:2011), not all databases support all features:
          </p>
          <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
            <li><strong>PostgreSQL, SQL Server, Oracle:</strong> Full support for all window functions</li>
            <li><strong>MySQL:</strong> Window function support added in MySQL 8.0 (2018)</li>
            <li><strong>SQLite:</strong> Window function support added in SQLite 3.25.0 (2018)</li>
          </ul>
          <p className="mt-2 text-sm">
            If using an older database, you may need to fall back to self-joins or correlated subqueries for similar functionality.
          </p>
        </Callout>

        <p className="mt-6">
          Window functions are essential for modern data analysis. They eliminate complex self-joins and correlated subqueries
          while providing clearer, more maintainable SQL. Mastering these patterns—from simple rankings to complex analytical 
          queries—will make you significantly more effective at extracting insights from your data. In the next section, we'll 
          explore additional advanced SQL techniques to round out your toolkit.
        </p>
      </Section>

      {/* ============================================
          SECTION 7: Data Transformation
          ============================================ */}
      <Section id="section12" title="Data Transformation - Text, Dates, and Conditional Logic" level={2}>
        <p>
          You've mastered the fundamental SQL operations—querying with SELECT, combining data with JOINs, aggregating with 
          GROUP BY, and analyzing with window functions. But real-world data is messy: dates come in different formats, text 
          needs cleaning, business logic requires conditional processing, and NULL values lurk everywhere waiting to break your queries.
        </p>
        
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          This is where SQL's "utility functions" shine. Think of them as your Swiss Army knife—a collection of specialized 
          tools that transform raw data into exactly what you need. These aren't theoretical concepts; they're the everyday 
          workhorses that data analysts, engineers, and scientists use dozens of times per day. A junior developer writes 
          queries that work on clean data. A senior developer writes queries that work on <em>real</em> data—handling edge 
          cases, cleaning text, parsing dates, and making decisions with conditional logic.
        </p>

        <Callout type="info" title="Why These Techniques Matter">
          <p className="mb-2">
            <strong>Consider a real scenario:</strong> You're building a customer segmentation dashboard. Your data has:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Customer names in inconsistent formats ("john doe", "JANE SMITH", "  Bob  Jones  ")</li>
            <li>Email addresses needing domain extraction for analysis</li>
            <li>Purchase dates from three different systems with varying formats</li>
            <li>NULL values in optional fields that break calculations</li>
            <li>Business rules like "VIP customers = spent &gt; $10K OR orders &gt; 50 in past year"</li>
          </ul>
          <p className="mt-2 text-sm">
            <strong>Without these utility functions, you'd need to extract data and clean it in Python/JavaScript.</strong> 
            With them, you handle everything in SQL—cleaner code, fewer bugs, better performance.
          </p>
        </Callout>

        <Subsection title="CASE Expressions: Conditional Logic in SQL">
          <p>
            The <code>CASE</code> expression is SQL's if/then/else mechanism—it's how you implement business logic and 
            conditional transformations directly in your queries. Think of it as the bridge between your database and 
            your business rules. Instead of fetching raw data and processing it in application code, CASE lets you apply 
            logic at the database level, which is often more efficient and clearer.
          </p>

          <Callout type="tip" title="Analogy: The Traffic Light">
            Imagine you're a traffic controller at an intersection. A CASE expression is like your decision process: 
            "IF traffic from north is waiting AND timer expired THEN green light north, ELSE IF traffic from east is 
            waiting THEN green light east, ELSE yellow all directions." Each WHEN clause is a condition you check in 
            order, and you take the first matching action. The ELSE is your default when nothing else applies—like 
            defaulting to yellow lights when no traffic is detected.
          </Callout>

          <p className="mt-4">
            There are two forms of CASE: <strong>searched CASE</strong> (tests arbitrary conditions) and <strong>simple CASE</strong> 
            (tests equality against a single expression). Use searched CASE for most scenarios—it's more flexible.
          </p>

          <CodeExample
            title="CASE Expression Syntax"
            code={`-- Searched CASE (most flexible) - use this 95% of the time
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  ELSE default_result
END

-- Simple CASE (only for equality checks against one column)
CASE column_name
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  ...
  ELSE default_result
END`}
          />

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's see CASE in action with a realistic employee analysis scenario. Notice how CASE expressions can appear 
            in SELECT (to create new computed columns), in aggregate functions (to conditionally count or sum), and even 
            nested inside other CASE expressions for complex logic:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Real-world employee analysis with CASE expressions
-- Demonstrates categorization, conditional aggregation, and business rules

SELECT 
  name,
  department,
  salary,
  -- Searched CASE: Create salary bands for compensation analysis
  CASE
    WHEN salary >= 100000 THEN 'Executive'
    WHEN salary >= 75000 THEN 'Senior'
    WHEN salary >= 50000 THEN 'Mid-Level'
    ELSE 'Entry-Level'
  END AS seniority_level,
  
  -- Simple CASE: Map departments to divisions
  CASE department
    WHEN 'Engineering' THEN 'Tech'
    WHEN 'Product' THEN 'Tech'
    WHEN 'Sales' THEN 'Revenue'
    WHEN 'Marketing' THEN 'Revenue'
    ELSE 'Operations'
  END AS division,
  
  -- CASE with calculations: Bonus eligibility
  CASE
    WHEN salary >= 80000 AND department = 'Sales' THEN salary * 0.15
    WHEN salary >= 80000 THEN salary * 0.10
    WHEN salary >= 50000 THEN salary * 0.05
    ELSE 0
  END AS annual_bonus_estimate,
  
  -- Nested CASE: Complex business rules
  CASE
    WHEN department = 'Sales' THEN
      CASE 
        WHEN salary > 90000 THEN 'Senior Sales - High Comp'
        ELSE 'Sales Team'
      END
    ELSE department
  END AS detailed_category
  
FROM employees
ORDER BY salary DESC;

-- CASE in WHERE clause: Filter using complex conditions
-- SELECT name, salary FROM employees 
-- WHERE CASE 
--   WHEN department = 'Engineering' THEN salary > 70000
--   WHEN department = 'Sales' THEN salary > 60000
--   ELSE salary > 50000 
-- END;`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Common Pattern</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Use Case</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Bucketing/Binning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Group continuous values into ranges</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">CASE WHEN age &lt; 18 THEN 'Minor' WHEN age &lt; 65 THEN 'Adult' ELSE 'Senior' END</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Conditional Aggregation</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Count/sum only rows meeting criteria</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SUM(CASE WHEN status='paid' THEN amount ELSE 0 END)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Pivot/Unpivot</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Transform rows to columns</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SUM(CASE WHEN month='Jan' THEN revenue END) AS jan_revenue</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Data Cleaning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fix inconsistent values</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">CASE WHEN status IN ('complete','done') THEN 'completed' END</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Feature Engineering</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Create ML model features</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">CASE WHEN orders &gt; 10 THEN 1 ELSE 0 END AS is_repeat_customer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="Common CASE Expression Mistakes">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">❌ Missing ELSE clause</p>
                <p className="text-sm mt-1">
                  If no WHEN matches and there's no ELSE, CASE returns NULL. This can break calculations. 
                  <strong>Always include ELSE</strong> for safety, even if it's just <code>ELSE NULL</code> to make intent explicit.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">❌ Order matters!</p>
                <p className="text-sm mt-1">
                  CASE evaluates conditions <em>sequentially</em> and stops at the first match. If you have 
                  <code>WHEN salary &gt; 50000 THEN 'High'</code> before <code>WHEN salary &gt; 100000 THEN 'Executive'</code>, 
                  executives will be labeled "High" because the first condition matches.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">❌ Type mismatches</p>
                <p className="text-sm mt-1">
                  All THEN results must be the same type (or compatible). Mixing strings and numbers causes errors: 
                  <code>CASE WHEN x THEN 'yes' ELSE 0 END</code> ❌
                </p>
              </div>
            </div>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            <strong>Pro tip:</strong> CASE expressions can appear <em>anywhere</em> in SQL—in SELECT (computed columns), 
            WHERE (complex filters), ORDER BY (custom sort order), GROUP BY (dynamic grouping), and inside aggregate functions 
            (conditional aggregation). This versatility makes CASE one of the most powerful tools in SQL.
          </p>
        </Subsection>

        <Subsection title="Set Operations: UNION, INTERSECT, EXCEPT">
          <p>
            Set operations treat query results as mathematical sets, allowing you to combine, intersect, or subtract them. 
            These are essential when you need to merge data from similar sources, find overlaps, or identify differences 
            between datasets. Think of them as the SQL equivalent of Venn diagrams.
          </p>

          <Callout type="tip" title="Analogy: Music Playlist Operations">
            Imagine you have two Spotify playlists: "Workout" and "Focus". <strong>UNION</strong> is like combining both 
            playlists into one mega-playlist (removing duplicates if a song appears in both). <strong>INTERSECT</strong> 
            gives you only the songs that appear in BOTH playlists—your crossover favorites. <strong>EXCEPT</strong> gives 
            you songs in "Workout" that are NOT in "Focus"—your high-energy tracks that aren't suitable for concentration. 
            Set operations let you perform these same logical operations on database query results.
          </Callout>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Operation</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">SQL Syntax</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Math Equivalent</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Duplicates</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Union</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">UNION</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A ∪ B</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Removed</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Union All</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">UNION ALL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A ∪ B (with duplicates)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Kept ⚡ faster</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Intersection</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">INTERSECT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A ∩ B</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Removed</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Difference</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">EXCEPT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A − B</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Removed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            <strong>Important requirements:</strong> All queries in a set operation must return the same number of columns, 
            and corresponding columns must have compatible data types. Column names come from the first query.
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's explore practical scenarios where set operations solve real business problems. These examples demonstrate 
            common patterns you'll encounter when analyzing customer behavior, finding data inconsistencies, or combining 
            data from multiple sources:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Scenario 1: UNION - Create a master list of contacts
-- Combine customers who have ordered with newsletter subscribers

SELECT 'Customer' AS source, customer_id, first_name, last_name, email
FROM customers
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders)

UNION

SELECT 'Newsletter' AS source, customer_id, first_name, last_name, email
FROM customers
WHERE email LIKE '%@gmail.com'

ORDER BY last_name;
-- UNION removes duplicates - customers in both groups appear once


-- Scenario 2: UNION ALL - Audit log from multiple systems
-- When you WANT duplicates (e.g., activity from different sources)

SELECT 'Web' AS platform, customer_id, 'Logged In' AS action
FROM customers
WHERE customer_id <= 5

UNION ALL

SELECT 'Mobile' AS platform, customer_id, 'Logged In' AS action
FROM customers
WHERE customer_id <= 3;
-- UNION ALL is faster - keeps all rows, including duplicates


-- Scenario 3: EXCEPT - Find customers who never ordered
-- "Give me all customers EXCEPT those who have placed orders"

SELECT customer_id, first_name, last_name
FROM customers

EXCEPT

SELECT DISTINCT c.customer_id, c.first_name, c.last_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
-- Returns customers with no orders - great for marketing campaigns


-- Scenario 4: INTERSECT - Find overlap between two segments
-- "Customers who ordered AND subscribed to newsletter"

SELECT customer_id, email
FROM customers
WHERE customer_id IN (SELECT customer_id FROM orders)

INTERSECT

SELECT customer_id, email
FROM customers
WHERE email LIKE '%@gmail.com';
-- Only customers meeting BOTH criteria`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Use Case</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Best Operation</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Merge data from similar tables</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">UNION ALL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs">sales_2023 UNION ALL sales_2024</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Create unified contact list</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">UNION</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs">email_list1 UNION email_list2 (dedupe)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Find customers in segment A but not B</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">EXCEPT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs">all_customers EXCEPT purchasers</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Find overlap between two segments</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">INTERSECT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs">high_value INTERSECT recent_activity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="UNION vs UNION ALL Performance">
            <p className="mb-2">
              <strong>UNION</strong> must sort and deduplicate results, which adds significant overhead for large datasets.
            </p>
            <p>
              <strong>UNION ALL</strong> simply appends results—no sorting, no deduplication. This makes it 
              <strong> 10-100x faster</strong> for large result sets. Use UNION ALL whenever you know duplicates don't exist 
              or when duplicates are acceptable (like audit logs from different sources).
            </p>
            <p className="mt-2 text-sm">
              <strong>Rule of thumb:</strong> Default to UNION ALL for performance, only use UNION when deduplication is 
              truly necessary.
            </p>
          </Callout>

          <Callout type="info" title="Cross-Dialect Note: EXCEPT vs MINUS">
            <p className="text-sm">
              <strong>SQLite, PostgreSQL, SQL Server:</strong> Use <code>EXCEPT</code> for set difference.
              <br />
              <strong>Oracle, MariaDB:</strong> Use <code>MINUS</code> instead (same functionality, different keyword).
              <br />
              <strong>MySQL (before 8.0):</strong> No native EXCEPT/MINUS—use <code>LEFT JOIN ... WHERE IS NULL</code> pattern.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="String Functions: Text Manipulation">
          <p>
            Real-world data is messy—names have inconsistent capitalization, emails need domain extraction, text has leading/trailing 
            spaces, and you need to search within strings. SQL's string functions are your data cleaning toolkit. While syntax varies 
            across databases, mastering these core operations is essential for any data professional.
          </p>

          <Callout type="tip" title="Real-World Scenario: Cleaning Customer Data">
            You've inherited a customer database where:
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Names are in ALL CAPS: "JOHN SMITH" should be "John Smith"</li>
              <li>Emails have extra spaces: "  user@example.com  " needs trimming</li>
              <li>You need to group customers by email domain for B2B analysis</li>
              <li>Phone numbers have inconsistent formats: "(555) 123-4567", "555-123-4567", "5551234567"</li>
            </ul>
            <p className="mt-2 text-sm">
              String functions let you clean and normalize this data in SQL, avoiding the need to export, clean in Python, 
              and re-import.
            </p>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's explore the essential string functions with practical examples. Pay attention to how these can be combined 
            to solve complex text processing tasks:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Practical string manipulation for data cleaning and analysis

SELECT 
  customer_id,
  first_name,
  last_name,
  email,
  
  -- Concatenation: Build full names
  first_name || ' ' || last_name AS full_name,
  
  -- Case conversion: Normalize text for display or comparison
  UPPER(email) AS email_upper,           -- "john@example.com" → "JOHN@EXAMPLE.COM"
  LOWER(last_name) AS last_name_lower,   -- "SMITH" → "smith"
  
  -- Length: Validate or find long values
  LENGTH(email) AS email_length,
  LENGTH(first_name || last_name) AS name_char_count,
  
  -- Substring extraction: Parse structured text
  -- SUBSTR(string, start, length) - start is 1-indexed!
  SUBSTR(email, 1, INSTR(email, '@') - 1) AS email_username,
  SUBSTR(email, INSTR(email, '@') + 1) AS email_domain,
  
  -- Replace: Fix patterns or obfuscate data
  REPLACE(email, '@', ' [AT] ') AS obfuscated_email,
  REPLACE(REPLACE(email, '.', ' '), '@', ' ') AS no_punctuation,
  
  -- Trim: Remove whitespace (important for data cleaning!)
  TRIM(first_name) AS trimmed_first,
  -- LTRIM/RTRIM for left/right only
  
  -- INSTR: Find substring position (returns 0 if not found)
  INSTR(email, '@') AS at_position,
  INSTR(email, 'gmail') AS gmail_position  -- 0 if not Gmail
  
FROM customers
LIMIT 10;

-- Pro Pattern: Extract email domain for B2B analysis
-- SELECT 
--   SUBSTR(email, INSTR(email, '@') + 1) AS domain,
--   COUNT(*) AS customer_count
-- FROM customers
-- GROUP BY domain
-- ORDER BY customer_count DESC;`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Pattern</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Use Case</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Parse Email</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Extract username or domain</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SUBSTR(email, INSTR(email, '@')+1)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Title Case</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Format names properly</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">UPPER(SUBSTR(name,1,1)) || LOWER(SUBSTR(name,2))</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Remove Characters</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Clean phone numbers</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">REPLACE(REPLACE(phone, '-', ''), ' ', '')</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Initials</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Create compact identifiers</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SUBSTR(first,1,1) || SUBSTR(last,1,1)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Padding</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Format IDs with leading zeros</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">printf('%05d', id) -- "00042"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title="Cross-Dialect String Functions">
            <div className="space-y-2 text-sm">
              <div>
                <strong>Concatenation:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li><strong>SQLite, PostgreSQL:</strong> <code>||</code> operator</li>
                  <li><strong>MySQL, SQL Server:</strong> <code>CONCAT(str1, str2, ...)</code></li>
                  <li><strong>SQL Server:</strong> Also supports <code>+</code> operator</li>
                </ul>
              </div>
              <div>
                <strong>Substring:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li><strong>SQLite, SQL Server:</strong> <code>SUBSTR(str, start, length)</code> (1-indexed)</li>
                  <li><strong>PostgreSQL, MySQL:</strong> <code>SUBSTRING(str FROM start FOR length)</code></li>
                </ul>
              </div>
              <div>
                <strong>String Position:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li><strong>SQLite:</strong> <code>INSTR(str, substring)</code></li>
                  <li><strong>PostgreSQL, MySQL:</strong> <code>POSITION(substring IN str)</code></li>
                  <li><strong>SQL Server:</strong> <code>CHARINDEX(substring, str)</code></li>
                </ul>
              </div>
            </div>
          </Callout>
        </Subsection>

        <Subsection title="Date and Time Functions: Temporal Operations">
          <p>
            Date and time operations are everywhere in data analysis: calculating age, finding records within a date range, 
            grouping sales by month, computing time differences, and handling timezones. SQLite's date/time functions are 
            powerful once you understand their patterns—they're based on ISO 8601 format and Julian day numbers.
          </p>

          <Callout type="tip" title="Common Date/Time Scenarios">
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Cohort analysis:</strong> Group customers by signup month to track retention</li>
              <li><strong>Recency:</strong> Find customers who haven't ordered in 90+ days</li>
              <li><strong>Seasonality:</strong> Analyze sales by day of week or month</li>
              <li><strong>Age calculation:</strong> Compute customer age from birthdate</li>
              <li><strong>Business hours:</strong> Filter transactions to 9 AM - 5 PM</li>
              <li><strong>Reporting periods:</strong> Get "start of month" or "end of quarter" dates</li>
            </ul>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            SQLite stores dates as TEXT (ISO8601), REAL (Julian day), or INTEGER (Unix timestamp). The date/time functions 
            work with all three formats. Let's explore the essential operations with practical examples:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Comprehensive date/time operations for analysis

SELECT 
  order_id,
  order_date,
  
  -- Extract components with strftime (STRing Format TIME)
  DATE(order_date) AS date_only,              -- "2024-03-15"
  TIME(order_date) AS time_only,              -- "14:30:00"
  strftime('%Y', order_date) AS year,         -- "2024"
  strftime('%m', order_date) AS month,        -- "03"
  strftime('%d', order_date) AS day,          -- "15"
  strftime('%H', order_date) AS hour,         -- "14" (24-hour)
  strftime('%M', order_date) AS minute,       -- "30"
  
  -- Day of week and week of year
  strftime('%w', order_date) AS day_of_week,  -- 0=Sunday, 6=Saturday
  strftime('%W', order_date) AS week_of_year, -- Week number (00-53)
  
  -- Human-readable formats
  strftime('%Y-%m', order_date) AS year_month,        -- "2024-03"
  strftime('%Y-%m-%d %H:%M', order_date) AS formatted,-- "2024-03-15 14:30"
  
  -- Date arithmetic (modifiers)
  DATE(order_date, '+7 days') AS one_week_later,
  DATE(order_date, '-1 month') AS one_month_earlier,
  DATE(order_date, '+1 year') AS one_year_later,
  
  -- Anchoring to start/end of periods
  DATE(order_date, 'start of month') AS month_start,  -- First day of month
  DATE(order_date, 'start of year') AS year_start,    -- Jan 1
  DATE(order_date, '+1 month', 'start of month', '-1 day') AS month_end,
  
  -- Date differences (in days)
  JULIANDAY('now') - JULIANDAY(order_date) AS days_since_order,
  ROUND((JULIANDAY('now') - JULIANDAY(order_date)) / 7, 1) AS weeks_since,
  
  -- Categorize recency
  CASE
    WHEN JULIANDAY('now') - JULIANDAY(order_date) <= 30 THEN 'Recent'
    WHEN JULIANDAY('now') - JULIANDAY(order_date) <= 90 THEN 'Active'
    ELSE 'Dormant'
  END AS recency_category
  
FROM orders
ORDER BY order_date DESC
LIMIT 15;

-- Pro Pattern: Monthly sales aggregation
-- SELECT 
--   strftime('%Y-%m', order_date) AS month,
--   COUNT(*) AS orders,
--   SUM(total_amount) AS revenue
-- FROM orders
-- GROUP BY month
-- ORDER BY month DESC;`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Pattern</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Use Case</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">SQLite Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Days Between</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Calculate date difference</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">JULIANDAY(date2) - JULIANDAY(date1)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Add/Subtract</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Date arithmetic</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">DATE(date, '+30 days')</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Start of Period</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Find month/year start</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">DATE(date, 'start of month')</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Age/Years</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Calculate age</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">(JULIANDAY('now') - JULIANDAY(bday)) / 365.25</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Last Day of Month</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Month-end reports</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">DATE(date, '+1 month', 'start of month', '-1 day')</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title="strftime Format Codes Cheat Sheet">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong>Date Components:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li><code>%Y</code> - Year (4 digits): 2024</li>
                  <li><code>%m</code> - Month (01-12): 03</li>
                  <li><code>%d</code> - Day (01-31): 15</li>
                  <li><code>%w</code> - Weekday (0-6): 5</li>
                  <li><code>%j</code> - Day of year (001-366)</li>
                  <li><code>%W</code> - Week of year (00-53)</li>
                </ul>
              </div>
              <div>
                <strong>Time Components:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li><code>%H</code> - Hour 24h (00-23): 14</li>
                  <li><code>%I</code> - Hour 12h (01-12): 02</li>
                  <li><code>%M</code> - Minute (00-59): 30</li>
                  <li><code>%S</code> - Second (00-59): 45</li>
                  <li><code>%p</code> - AM/PM</li>
                  <li><code>%s</code> - Unix timestamp</li>
                </ul>
              </div>
            </div>
          </Callout>

          <Callout type="warning" title="Timezone Handling: The Hard Part">
            <p className="mb-2">
              <strong>SQLite has NO timezone support.</strong> All dates are naive (no timezone info). For timezone-aware 
              applications:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Store in UTC:</strong> Always store timestamps in UTC (use <code>datetime('now')</code>)</li>
              <li><strong>Convert in application:</strong> Handle timezone conversions in your app layer (Python, JS, etc.)</li>
              <li><strong>Or use PostgreSQL:</strong> PostgreSQL's <code>timestamptz</code> type handles timezones natively</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="NULL Handling: COALESCE and NULLIF">
          <p>
            NULLs are unavoidable in real-world data—optional fields, missing values, failed lookups, or data not yet collected. 
            SQL provides powerful functions to handle NULLs gracefully: <code>COALESCE</code> (provide fallback values) and 
            <code>NULLIF</code> (convert specific values to NULL). These functions prevent NULL-related errors and make your 
            queries more robust.
          </p>

          <Callout type="tip" title="The NULL Problem">
            Remember: <code>NULL</code> isn't zero or an empty string—it's "unknown." Any arithmetic with NULL yields NULL 
            (<code>5 + NULL = NULL</code>). Any comparison with NULL yields UNKNOWN (<code>x = NULL</code> is always UNKNOWN, 
            never TRUE). This breaks calculations and filters unexpectedly. COALESCE and NULLIF help you handle this gracefully.
          </Callout>

          <CodeExample
            title="NULL Handling Functions"
            code={`-- COALESCE: Return first non-NULL value from a list
COALESCE(value1, value2, value3, ..., default_value)
-- Evaluates left-to-right, returns first non-NULL

-- NULLIF: Return NULL if two values are equal
NULLIF(expression1, expression2)
-- Returns NULL if expression1 = expression2, else returns expression1

-- Common Pattern: Clean then Default
COALESCE(NULLIF(column, ''), 'default')
-- Converts empty strings to NULL, then provides default`}
          />

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's see these functions in action with realistic scenarios. Notice how COALESCE prevents NULL from breaking 
            calculations, and NULLIF converts sentinel values (like empty strings or zeros) into proper NULLs for cleaner logic:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Practical NULL handling patterns

SELECT 
  name,
  department,
  salary,
  
  -- COALESCE: Single fallback
  COALESCE(department, 'Unassigned') AS dept_with_default,
  
  -- COALESCE: Multiple fallbacks (cascade)
  -- "Try column1, if NULL try column2, if NULL try column3, else use default"
  COALESCE(NULL, NULL, department, 'Unknown') AS multi_fallback,
  
  -- NULLIF: Convert specific values to NULL
  -- "If department is 'Engineering', treat it as NULL"
  NULLIF(department, 'Engineering') AS non_eng_dept,
  
  -- Practical Pattern 1: Clean empty strings
  -- Problem: Empty strings ('') aren't NULL, but should be treated as missing
  -- Solution: NULLIF converts '' to NULL, then COALESCE provides default
  COALESCE(NULLIF(department, ''), 'Not Specified') AS cleaned_dept,
  
  -- Practical Pattern 2: Avoid division by zero
  -- NULLIF converts 0 to NULL, preventing division error
  100000.0 / NULLIF(salary, 0) AS salary_ratio,
  
  -- Alternative division by zero handling with CASE
  CASE 
    WHEN salary = 0 THEN NULL
    ELSE 100000.0 / salary 
  END AS salary_ratio_case,
  
  -- COALESCE in calculations: Treat NULL as 0 in sums
  salary + COALESCE(NULL, 0) AS salary_with_bonus,
  
  -- Real-world: Default values for display
  'Employee: ' || name || ', Dept: ' || COALESCE(department, 'TBD') AS summary
  
FROM employees
LIMIT 10;

-- Pro Pattern: Safe average that handles NULLs
-- SELECT 
--   department,
--   AVG(COALESCE(bonus, 0)) AS avg_bonus  -- Treat NULL bonus as 0
-- FROM employees
-- GROUP BY department;`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Problem</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Solution Pattern</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">NULL breaks display</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">COALESCE for default</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">COALESCE(phone, 'N/A')</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Division by zero</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">NULLIF to convert 0 → NULL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">total / NULLIF(count, 0)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Empty string ≠ NULL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">NULLIF then COALESCE</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">COALESCE(NULLIF(col, ''), 'default')</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Cascade fallbacks</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Multiple COALESCE args</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">COALESCE(email, phone, 'No contact')</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Sentinel values</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">NULLIF to normalize</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">NULLIF(status, 'UNKNOWN')</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="Common NULL Handling Mistakes">
            <div className="space-y-2 text-sm">
              <div>
                <strong>❌ Using COALESCE in WHERE:</strong> <code>WHERE COALESCE(status, 'active') = 'active'</code> 
                can be slow—it prevents index use. Better: <code>WHERE status = 'active' OR status IS NULL</code>
              </div>
              <div>
                <strong>❌ Not considering NULL in AVG:</strong> <code>AVG(bonus)</code> ignores NULLs (divides by 
                count of non-NULLs). If you want NULLs as zeros: <code>AVG(COALESCE(bonus, 0))</code>
              </div>
              <div>
                <strong>❌ Forgetting NULLIF can return NULL:</strong> Always handle the NULL result from NULLIF, 
                especially in division or aggregations.
              </div>
            </div>
          </Callout>
        </Subsection>

        <p className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
          Mastering the Swiss Army Knife
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          These utility functions—<strong>CASE expressions</strong> (conditional logic), <strong>set operations</strong> 
          (UNION/INTERSECT/EXCEPT), <strong>string functions</strong> (text manipulation), <strong>date/time functions</strong> 
          (temporal operations), and <strong>NULL handling</strong> (COALESCE/NULLIF)—are the tools you'll use daily 
          to transform raw, messy data into clean, actionable insights.
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Combined with the core SQL techniques you learned earlier—JOINs for combining data, aggregations for summarizing, 
          subqueries and CTEs for complex logic, and window functions for analytics—you now have a comprehensive SQL toolkit 
          that handles 95% of real-world data challenges. The remaining 5% is knowing when to optimize for performance, 
          which we'll cover in the next section.
        </p>

        <Callout type="ai" title="AI-Assisted SQL Utility Functions: Practical Prompts">
          <p className="mb-3">
            Use these prompt patterns to leverage AI for data cleaning, transformation, and complex conditional logic:
          </p>

          <div className="space-y-3">
            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Data Cleaning with String Functions</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "I have a customers table with names in ALL CAPS and emails with extra spaces. Write SQL (SQLite) to: 
                (1) Convert names to Title Case, (2) Trim whitespace from emails, (3) Extract email domain for grouping. 
                Show the transformation clearly."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Complex CASE Logic</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "Create a SQL CASE expression to categorize customers: 'VIP' if spent &gt;$10K OR orders &gt;50 in past year, 
                'Loyal' if orders &gt;20, 'Active' if ordered in last 90 days, else 'At Risk'. Schema: customers(customer_id), 
                orders(customer_id, order_date, total_amount)."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Date/Time Analysis</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "Write SQLite query to analyze orders: (1) Group by month, (2) Calculate days since first order per customer, 
                (3) Find customers who haven't ordered in 90+ days. Use strftime for date formatting. orders table has 
                order_date and customer_id."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: NULL Handling Strategy</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "I have a products table where some prices are NULL (coming soon) and some stock quantities are 0. 
                Write SQL to: (1) Display 'TBD' for NULL prices, (2) Avoid division by zero when calculating price per unit, 
                (3) Treat NULL stock as 0 in calculations. Use COALESCE and NULLIF."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Cross-Dialect Conversion</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "Convert this SQLite query to PostgreSQL: [paste query with SUBSTR, INSTR, ||, strftime]. 
                Preserve functionality but use PostgreSQL-specific functions where appropriate."
              </p>
            </div>
          </div>

          <p className="text-sm mt-3 text-teal-800 dark:text-teal-200">
            <strong>Pro tip:</strong> When asking AI for SQL transformations, always specify: (1) your database dialect, 
            (2) table schema, (3) desired output format. Include example input/output data to make the transformation 
            crystal clear.
          </p>
        </Callout>
      </Section>

      {/* ============================================
          SECTION 8: Query Optimization and Performance
          ============================================ */}
      <Section id="section13" title="Query Optimization" level={2}>
        <p className="text-gray-700 dark:text-gray-300">
          You've learned how to write SQL that <em>works</em>—now let's make it <em>fast</em>. In production systems, the difference 
          between a 5-second query and a 50-millisecond query isn't just nice-to-have—it's the difference between a usable application 
          and one that users abandon. Query optimization is the art and science of making your SQL execute efficiently, even on massive datasets.
        </p>

        <Callout type="info" title="Real-World Impact: When Speed Matters">
          <p>
            Consider an e-commerce site with 10 million products. A customer searches for "wireless headphones"—do they wait 
            8 seconds while your database scans every row, or do they get results in 100 milliseconds because you have the right indexes? 
            Amazon found that <strong>every 100ms of latency costs 1% in sales</strong>. Google found an extra 500ms in search page 
            load time reduced traffic by 20%.
          </p>
          <p className="mt-2">
            The database's <strong>query optimizer</strong> tries to find the best execution plan automatically, but <em>you</em> guide it 
            with proper schema design, strategic indexes, and well-structured queries. Understanding indexes is your superpower.
          </p>
        </Callout>

        <Subsection title="Indexes: The Secret to Fast Queries">
          <p className="text-gray-700 dark:text-gray-300">
            An <strong>index</strong> is a data structure (typically a B-tree) that maintains a sorted, searchable copy of one or more 
            columns. Without an index, the database must perform a <strong>table scan</strong>—reading every single row to find matches. 
            With an index, it performs an <strong>index scan</strong>—using the sorted structure to jump directly to matching rows.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            The difference is dramatic: O(n) linear scan versus O(log n) tree traversal. For a table with 1 million rows, that's scanning 
            1,000,000 rows versus ~20 index lookups—a <strong>50,000× speedup</strong>.
          </p>

          <Callout type="success" title="Historical Note: The Invention of B-Trees">
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                The <strong>B-tree</strong> data structure—which powers virtually all modern database indexes—was invented in 1970 by{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Rudolf_Bayer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Rudolf Bayer
                </a>{' '}
                and{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Edward_M._McCreight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Edward McCreight
                </a>{' '}
                at Boeing Research Labs. Their 1972 paper{' '}
                <a 
                  href="https://infolab.usc.edu/csci585/Spring2010/den_ar/indexing.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  "Organization and Maintenance of Large Ordered Indices"
                </a>{' '}
                introduced a balanced tree structure optimized for systems that read and write large blocks of data—exactly what 
                databases do with disk I/O.
                <br /><br />
                The "B" in B-tree has been interpreted as "balanced," "broad," or "Boeing" (where it was invented), but Bayer himself 
                never specified! What's certain is that B-trees revolutionized database performance. Unlike binary search trees, 
                B-trees have many children per node (hundreds, not just 2), minimizing disk seeks. This design made databases 
                practical for real-world use, enabling the explosion of data-driven applications that followed.
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <div className="text-center">
                  <img 
                    src="https://i1.rgstatic.net/ii/profile.image/277706571829272-1443221815023_Q512/Rudolf-Bayer.jpg" 
                    alt="Rudolf Bayer"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">Rudolf Bayer</p>
                </div>
                <div className="text-center">
                  <img 
                    src="https://www.mccreight.com/people/ed_mcc/photo.JPG" 
                    alt="Edward McCreight"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">Edward McCreight</p>
                </div>
              </div>
            </div>
          </Callout>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            Now that you understand the history, let's see <em>exactly</em> how these B-tree indexes work in practice. The visualization 
            below compares two approaches to finding records in a database table: sequential search (the slow way, without an index) versus 
            B-tree search (the fast way, using an index).
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Imagine you need to find all employees in the "Sales" department from a table with thousands of records. Without an index, 
            the database must check <strong>every single row</strong>—one by one—to see if the department matches "Sales". This is like 
            flipping through every page of a phone book to find people with a specific last name. With a B-tree index, however, the database 
            navigates through a sorted tree structure, making only a handful of comparisons to jump directly to the matching records. 
            Watch how the number of operations differs dramatically:
          </p>

          <IndexFigure />

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's see how to create and use indexes effectively. Most databases automatically create an index on <code>PRIMARY KEY</code> columns, 
            but you'll want to add indexes for columns frequently used in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code> clauses.
          </p>

          <CodeExample
            title="Creating Indexes: Syntax and Types"
            code={`-- Basic single-column index
CREATE INDEX idx_employees_department ON employees(department);

-- Composite/multi-column index (order matters!)
-- Good for: WHERE dept = 'Sales' AND salary > 50000
-- Also works for: WHERE dept = 'Sales' (leftmost prefix rule)
CREATE INDEX idx_employees_dept_salary ON employees(department, salary);

-- Unique index (enforces uniqueness + provides fast lookups)
CREATE UNIQUE INDEX idx_customers_email ON customers(email);

-- Partial/filtered index (smaller, faster for specific conditions)
-- SQLite doesn't support this directly, but PostgreSQL does:
-- CREATE INDEX idx_active_users ON users(last_login) WHERE active = true;

-- Functional/expression index (index on computed values)
-- CREATE INDEX idx_lower_email ON customers(LOWER(email));

-- Drop an index
DROP INDEX idx_employees_department;

-- View all indexes on a table (SQLite)
SELECT name, sql FROM sqlite_master 
WHERE type = 'index' AND tbl_name = 'employees';`}
          />

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            To truly understand the power of indexes, let's create a demonstration database from scratch with 100,000 rows. 
            We'll create two identical tables—one without an index and one with an index—so you can see the dramatic 
            performance difference firsthand.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            But how do we generate 100,000 rows efficiently? We'll use SQL's <strong><code>WITH RECURSIVE</code></strong> feature—a 
            powerful technique for generating data programmatically. This is the same SQL construct used for recursive queries like 
            organizational hierarchies and graph traversals, but here we're using it to generate synthetic data.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            A <code>WITH RECURSIVE</code> Common Table Expression (CTE) works like a loop in programming: it starts with a base case 
            (the number 1), then repeatedly adds to itself (incrementing by 1) until a condition is met (n reaches 100,000). Each 
            iteration can generate synthetic data using formulas—we'll use modulo arithmetic (<code>%</code>) to create different 
            categories, vary prices, and generate stock quantities.
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Let's build a performance demo database from scratch!
-- We'll create 2 identical tables: one WITH an index, one WITHOUT

-- Step 1: Create the first table (no index)
CREATE TABLE products_no_index (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock_quantity INTEGER NOT NULL
);

-- Step 2: Create the second table (with index)
CREATE TABLE products_with_index (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock_quantity INTEGER NOT NULL
);

-- Create the index on category column
CREATE INDEX idx_products_category ON products_with_index(category);

-- Step 3: Generate 100,000 rows using WITH RECURSIVE
-- This is a powerful technique for creating synthetic data
WITH RECURSIVE
-- Base case: start with number 1
-- Recursive case: keep adding 1 until we reach 100,000
numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 100000
),
-- Transform numbers into product data
synthetic_data AS (
  SELECT 
    n AS product_id,
    'Product ' || n AS product_name,
    -- Use modulo to create 10 different categories
    CASE (n % 10)
      WHEN 0 THEN 'Electronics'
      WHEN 1 THEN 'Books'
      WHEN 2 THEN 'Clothing'
      WHEN 3 THEN 'Home & Garden'
      WHEN 4 THEN 'Sports'
      WHEN 5 THEN 'Toys'
      WHEN 6 THEN 'Automotive'
      WHEN 7 THEN 'Health'
      WHEN 8 THEN 'Beauty'
      WHEN 9 THEN 'Food'
    END AS category,
    -- Generate prices between $9.99 and $109.99
    ROUND((n % 1000) / 10.0 + 9.99, 2) AS price,
    -- Generate stock quantities between 1 and 500
    (n % 500) + 1 AS stock_quantity
  FROM numbers
)
-- Insert into the first table (no index)
INSERT INTO products_no_index 
SELECT * FROM synthetic_data;

-- Step 4: Copy all data to the indexed table
INSERT INTO products_with_index 
SELECT * FROM products_no_index;

-- Step 5: Verify the data was created
SELECT 
  'products_no_index' AS table_name,
  COUNT(*) AS row_count,
  COUNT(DISTINCT category) AS unique_categories
FROM products_no_index

UNION ALL

SELECT 
  'products_with_index' AS table_name,
  COUNT(*) AS row_count,
  COUNT(DISTINCT category) AS unique_categories
FROM products_with_index;

-- 🎯 Success! We now have 100,000 rows in each table
-- One table has an index on 'category', the other doesn't
-- Next, we'll query both and compare execution times!`}
          />

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Take a moment to study this query. The <code>WITH RECURSIVE</code> CTE generates numbers 1 through 100,000, then 
            transforms each number into a product record with synthetic but realistic-looking data. The modulo operator (<code>%</code>) 
            creates variety: <code>(n % 10)</code> cycles through 0-9 for categories, <code>(n % 1000)</code> creates price variation, 
            and <code>(n % 500)</code> varies stock quantities.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Now let's see the dramatic performance difference that index makes:
          </p>

          <SQLPlayground
            preset={INDEX_DEMO_PRESET}
            defaultQuery={`-- Query 1: WITHOUT index (Table Scan)
-- This will scan all 100,000 rows to find Electronics products
SELECT COUNT(*), AVG(price), MIN(price), MAX(price)
FROM products_no_index
WHERE category = 'Electronics';

-- Query 2: WITH index (Index Scan)
-- This uses the index to jump directly to Electronics products
SELECT COUNT(*), AVG(price), MIN(price), MAX(price)
FROM products_with_index
WHERE category = 'Electronics';

-- 🎯 Compare the execution times above!
-- The indexed query should be 10-50x faster even with "just" 100K rows.
-- With millions of rows, the difference would be 1000x or more!`}
          />

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            The timing difference you see is the index at work. The first query scans all 100,000 rows sequentially—the database 
            must check every single record to see if its category is "Electronics". The second query uses the B-tree index to 
            jump directly to "Electronics" entries, examining maybe a few hundred tree nodes instead of 100,000 rows. This is 
            exactly what we visualized in the diagram above: <strong>O(n) vs O(log n) in action</strong>.
          </p>

          <Callout type="tip" title="Experiment Further">
            <p>Try these variations to explore index behavior:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>
                <strong>Range queries:</strong> <code>WHERE category IN ('Electronics', 'Books')</code> – indexes help here too!
              </li>
              <li>
                <strong>Anti-pattern:</strong> <code>WHERE price &gt; 50</code> on the indexed table – this can't use the category
                index, so performance is similar to the non-indexed table
              </li>
              <li>
                <strong>Combining conditions:</strong> <code>WHERE category = 'Sports' AND price &lt; 30</code> – the index helps
                filter by category first, then scans the smaller result set for price
              </li>
            </ul>
          </Callout>

          <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Understanding Index Trade-offs
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            While indexes dramatically speed up queries, they're not free. Every index comes with costs that you must weigh against 
            the benefits. Understanding these trade-offs is crucial for database design.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Pros Card */}
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-300 dark:border-green-700 rounded-lg p-6">
              <h4 className="font-semibold text-lg text-green-900 dark:text-green-100 mb-4">
                ✅ Pros
              </h4>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li>• 10x–1000x faster SELECT queries on large tables</li>
                <li>• Speeds up JOIN operations (especially on foreign keys)</li>
                <li>• Enables fast ORDER BY without sorting</li>
                <li>• Can enforce uniqueness (UNIQUE indexes)</li>
              </ul>
            </div>

            {/* Cons Card */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 rounded-lg p-6">
              <h4 className="font-semibold text-lg text-amber-900 dark:text-amber-100 mb-4">
                ⚠️ Cons
              </h4>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li>• Slower INSERT/UPDATE/DELETE (every write must update the index)</li>
                <li>• Increased storage (indexes are duplicated, sorted data)</li>
                <li>• Memory overhead (indexes compete for cache space)</li>
                <li>• Diminishing returns: The 10th index helps far less than the 1st</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r my-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Rule of thumb:</strong> Index columns in WHERE, JOIN ON, and ORDER BY that are queried frequently and are 
              selective (many distinct values). Don't index everything—each index has overhead. Start with 2–5 key indexes per table.
            </p>
          </div>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Index Type</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">When to Use</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Single-Column</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Frequent lookups or filters on one column
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    WHERE email = '...'
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Composite/Multi-Column</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Queries filter on multiple columns together
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    WHERE dept = 'Sales' AND active = true
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Covering Index</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Index contains all columns in SELECT (no table lookup!)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    INDEX(dept, salary) for SELECT dept, salary
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Unique Index</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Enforce uniqueness + fast lookups
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    UNIQUE INDEX on email
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Functional Index</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Index computed expressions
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    INDEX on LOWER(email)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="Composite Index Order: The Leftmost Prefix Rule">
            <p>
              For a composite index like <code>INDEX(dept, salary, hire_date)</code>, the database can use it for queries filtering on:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm font-mono">
              <li>✅ <code>WHERE dept = 'Sales'</code></li>
              <li>✅ <code>WHERE dept = 'Sales' AND salary &gt; 50000</code></li>
              <li>✅ <code>WHERE dept = 'Sales' AND salary &gt; 50000 AND hire_date &gt; '2020-01-01'</code></li>
              <li>❌ <code>WHERE salary &gt; 50000</code> (doesn't start with dept)</li>
              <li>❌ <code>WHERE hire_date &gt; '2020-01-01'</code> (skips dept)</li>
            </ul>
            <p className="mt-2">
              <strong>Strategy:</strong> Put the most selective (highest cardinality) columns first, or the columns most frequently 
              used alone. Think of a phone book: sorted by <code>(last_name, first_name)</code> lets you find "Smith" or "Smith, John", 
              but not "John" alone.
            </p>
          </Callout>

        </Subsection>

        <Subsection title="EXPLAIN QUERY PLAN: See What the Optimizer Sees">
          <p className="text-gray-700 dark:text-gray-300">
            Your most powerful optimization tool is <code>EXPLAIN QUERY PLAN</code>. It shows you <em>exactly</em> how the database 
            will execute your query: which tables it scans, which indexes it uses, in what order, and what algorithms it chooses for joins. 
            Always check the query plan when optimizing!
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            The workflow is simple: write your query, run <code>EXPLAIN QUERY PLAN</code>, identify bottlenecks (table scans, missing indexes, 
            expensive sorts), add indexes or restructure the query, and verify improvement. Let's see it in action:
          </p>

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Step 1: Check the query plan WITHOUT an index
-- Look for "SCAN" (bad) vs "SEARCH" (good)

EXPLAIN QUERY PLAN
SELECT * FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;

-- Expected output: "SCAN employees" (reads every row - slow!)

-- Step 2: Create an index on the filtered column
CREATE INDEX idx_emp_dept ON employees(department);

-- Step 3: Check the plan again - see the improvement!
EXPLAIN QUERY PLAN
SELECT * FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;

-- Expected output: "SEARCH employees USING INDEX idx_emp_dept" (fast!)

-- Step 4: Can we optimize further? Let's create a covering index
-- A covering index includes ALL columns needed by the query
DROP INDEX idx_emp_dept;
CREATE INDEX idx_emp_dept_salary ON employees(department, salary);

EXPLAIN QUERY PLAN
SELECT department, salary FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;

-- Expected output: "SEARCH ... USING COVERING INDEX" (fastest!)
-- No table lookup needed - everything is in the index`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Query Plan Term</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">What It Means</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SCAN table</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Full table scan—reads every row (no index used)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-semibold">
                    🐢 O(n) Slow
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SEARCH ... USING INDEX</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Uses index to find rows (much faster)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-green-600 dark:text-green-400 font-semibold">
                    ⚡ O(log n) Fast
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">USING COVERING INDEX</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    All columns in SELECT are in index (no table access!)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-blue-600 dark:text-blue-400 font-semibold">
                    🚀 Fastest
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">USE TEMP B-TREE FOR ORDER BY</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Must sort results (expensive for large datasets)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-orange-600 dark:text-orange-400 font-semibold">
                    ⚠️ Costly
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">AUTOMATIC COVERING INDEX</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    SQLite creates temporary covering index (smart!)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-green-600 dark:text-green-400 font-semibold">
                    ✅ Good
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Query Anti-Patterns: What Breaks Indexes">
          <p className="text-gray-700 dark:text-gray-300">
            You've created indexes—but certain query patterns prevent the optimizer from using them. These <strong>anti-patterns</strong> 
            force table scans even when indexes exist. Recognizing and avoiding them is crucial for fast queries.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Let's explore the most common performance killers and how to fix them:
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- ❌ Anti-pattern 1: Function on indexed column
-- Problem: Wrapping a column in a function prevents index use

-- Bad: Index on email can't be used
SELECT * FROM customers
WHERE LOWER(email) = 'john@example.com';

-- Good: Store data in a consistent format or use functional index
SELECT * FROM customers
WHERE email = 'john@example.com';

-- ❌ Anti-pattern 2: Leading wildcard in LIKE
-- Problem: Can't traverse B-tree from arbitrary middle position

-- Bad: Must scan all rows to find emails ending with @gmail.com
SELECT * FROM customers
WHERE email LIKE '%@gmail.com';

-- Good: Trailing wildcard allows index scan (prefix search)
SELECT * FROM customers
WHERE email LIKE 'john%';

-- Alternative: Use full-text search for substring matching
-- CREATE VIRTUAL TABLE customers_fts USING fts5(email, ...);

-- ❌ Anti-pattern 3: OR conditions on different columns
-- Problem: Can't efficiently use multiple indexes simultaneously

-- Bad: Must scan or merge multiple index scans
SELECT * FROM customers
WHERE first_name = 'John' OR last_name = 'Smith';

-- Good: Use UNION for selective queries (if both are indexed)
SELECT * FROM customers WHERE first_name = 'John'
UNION
SELECT * FROM customers WHERE last_name = 'Smith';

-- ❌ Anti-pattern 4: SELECT *
-- Problem: Retrieves unnecessary columns, prevents covering indexes

-- Bad: Fetches all columns even if you only need 2
SELECT * FROM customers
WHERE email = 'john@example.com';

-- Good: Select only what you need (enables covering indexes)
SELECT customer_id, first_name, email FROM customers
WHERE email = 'john@example.com';

-- ❌ Anti-pattern 5: Implicit type conversion
-- Problem: Forces conversion on every row

-- Bad: Comparing string column to number (if customer_id is TEXT)
-- SELECT * FROM customers WHERE customer_id = 12345;

-- Good: Match types exactly
-- SELECT * FROM customers WHERE customer_id = '12345';`}
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Anti-Pattern</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Why It's Bad</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Better Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">SELECT *</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Retrieves unnecessary columns, prevents covering indexes
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    SELECT only needed columns
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">WHERE func(col) = val</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Function prevents index usage
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    WHERE col = val (or functional index)
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">LIKE '%value%'</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Leading wildcard forces full scan
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    LIKE 'value%' or full-text search
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">col1 = X OR col2 = Y</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Can't use indexes efficiently
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    UNION queries if selective
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">NOT IN (subquery)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Slow with NULLs, hard to optimize
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    NOT EXISTS or LEFT JOIN ... WHERE IS NULL
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">Type mismatch</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Implicit conversion on every row
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Match column types in comparisons
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">Large OFFSET</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Must process all skipped rows
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Keyset pagination (WHERE id &gt; last_id)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="Common Indexing Mistakes">
            <div className="space-y-2 text-sm">
              <div>
                <strong>❌ Over-indexing:</strong> Creating 20 indexes on a table slows down writes dramatically and wastes memory. 
                Start with 2–5 strategic indexes per table, focusing on your most frequent queries.
              </div>
              <div>
                <strong>❌ Wrong column order in composite indexes:</strong> <code>INDEX(salary, department)</code> won't help 
                <code>WHERE department = 'Sales'</code>. Always put the most selective or most frequently filtered columns first.
              </div>
              <div>
                <strong>❌ Indexing low-cardinality columns:</strong> Indexing a boolean <code>is_active</code> column (only 2 values) 
                rarely helps. Focus on high-cardinality columns like email, user_id, or timestamps.
              </div>
              <div>
                <strong>❌ Not testing with realistic data:</strong> A query might seem fast with 100 rows but crawl with 10 million. 
                Always test optimization with production-scale data.
              </div>
            </div>
          </Callout>
        </Subsection>

        <Subsection title="Real-World Optimization Workflow">
          <p className="text-gray-700 dark:text-gray-300">
            Let's walk through a complete optimization scenario you'll encounter in production: a slow analytical query that retrieves 
            high-value customers. We'll diagnose the problem, apply strategic indexes, and measure the improvement—exactly how you'd 
            approach it in a real application.
          </p>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Real-World Scenario: Dashboard Query Taking 5+ Seconds
-- Task: Find high-value customers who ordered in the last 6 months

-- Step 1: Initial query (unoptimized)
SELECT 
  c.first_name || ' ' || c.last_name AS customer_name,
  COUNT(*) AS order_count,
  SUM(o.total_amount) AS lifetime_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE('now', '-6 months')
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING SUM(o.total_amount) > 500
ORDER BY lifetime_value DESC
LIMIT 10;

-- Step 2: Diagnose with EXPLAIN QUERY PLAN
EXPLAIN QUERY PLAN
SELECT 
  c.first_name || ' ' || c.last_name AS customer_name,
  COUNT(*) AS order_count,
  SUM(o.total_amount) AS lifetime_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE('now', '-6 months')
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING SUM(o.total_amount) > 500
ORDER BY lifetime_value DESC
LIMIT 10;

-- Observation: Look for "SCAN orders" - that's our bottleneck!
-- The WHERE clause filters on order_date but there's no index.

-- Step 3: Create index on filtered column
CREATE INDEX idx_orders_date ON orders(order_date);

-- Step 4: Re-check the plan
EXPLAIN QUERY PLAN
SELECT 
  c.first_name || ' ' || c.last_name AS customer_name,
  COUNT(*) AS order_count,
  SUM(o.total_amount) AS lifetime_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE('now', '-6 months')
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING SUM(o.total_amount) > 500
ORDER BY lifetime_value DESC
LIMIT 10;

-- Expected improvement: "SEARCH orders USING INDEX idx_orders_date"
-- Result: Query time drops from 5s to ~200ms (25x faster!)

-- Step 5: Can we optimize further? Try a covering index
-- Include frequently selected/grouped columns
DROP INDEX idx_orders_date;
CREATE INDEX idx_orders_date_cust_amt 
  ON orders(order_date, customer_id, total_amount);

-- This covering index eliminates table lookups for the orders table`}
          />

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            This playground demonstrates the iterative optimization process you'll use in real projects. Notice how we started with 
            the unoptimized query, used <code>EXPLAIN QUERY PLAN</code> to identify the bottleneck (the table scan on <code>orders</code>), 
            added a strategic index, and then verified the improvement. The query went from scanning every order to using the index 
            to jump directly to recent orders—a massive performance gain with just one line of SQL.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Let's formalize this process into a repeatable workflow you can apply to any slow query:
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              The Optimization Recipe: A Step-by-Step Process
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>
                <strong>Identify slow queries:</strong> Use database logs, APM tools (like New Relic, Datadog), or your application's 
                query logger to find queries taking &gt;100ms.
              </li>
              <li>
                <strong>Run EXPLAIN QUERY PLAN:</strong> See how the database executes the query. Look for SCAN (bad) vs SEARCH (good).
              </li>
              <li>
                <strong>Identify bottlenecks:</strong> Table scans on large tables, missing JOIN indexes, expensive sorts without indexes.
              </li>
              <li>
                <strong>Add strategic indexes:</strong> Focus on WHERE, JOIN ON, and ORDER BY columns. Start with single-column, 
                then consider composite if needed.
              </li>
              <li>
                <strong>Verify improvement:</strong> Re-run EXPLAIN QUERY PLAN. Confirm it now uses the index. Measure actual query time.
              </li>
              <li>
                <strong>Consider covering indexes:</strong> If the query is still slow and critical, add a covering index that includes 
                all SELECT columns.
              </li>
              <li>
                <strong>Monitor in production:</strong> Deploy and monitor. Indexes help most queries but might slow down writes. 
                Adjust based on real-world performance.
              </li>
            </ol>
          </div>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            This seven-step recipe is your roadmap for optimization. But here's an equally important question: when should you 
            <em>avoid</em> optimizing? Not every slow query deserves immediate attention. Optimization takes time, and indexes 
            have costs. Knowing when to stop is just as valuable as knowing how to optimize.
          </p>

          <Callout type="tip" title="When NOT to Optimize">
            <p>
              Optimization has diminishing returns. <strong>Don't</strong> optimize if:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>The query runs infrequently (e.g., monthly reports)</li>
              <li>It's already fast enough (&lt;50ms for user-facing, &lt;1s for analytics)</li>
              <li>The table is tiny (&lt;1000 rows—scans are fine)</li>
              <li>The index would slow down critical write operations</li>
            </ul>
            <p className="mt-2">
              Focus optimization efforts where they matter: frequent queries, large tables, user-facing features where every 100ms counts.
            </p>
          </Callout>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            With the workflow mastered and boundaries understood, there's one final piece that transforms good developers into 
            great ones: building intuition through practice.
          </p>
        </Subsection>

        <p className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
          From Theory to Intuition
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Query optimization isn't about memorizing rules—it's about building intuition. After optimizing a few dozen queries, you'll 
          instinctively know which columns to index, spot anti-patterns before they cause problems, and structure queries for performance 
          from the start. The key is the feedback loop: write query → check plan → add index → verify → learn.
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Remember: premature optimization is wasted effort, but <em>informed</em> optimization—guided by <code>EXPLAIN QUERY PLAN</code> 
          and real performance data—is a superpower. With the right indexes and well-structured queries, you can handle millions of rows 
          with millisecond response times.
        </p>

        <Callout type="ai" title="AI-Assisted Query Optimization: Practical Prompts">
          <p className="mb-3">
            Use these prompt patterns to leverage AI for diagnosing slow queries and designing optimal indexes:
          </p>

          <div className="space-y-3">
            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Diagnose Slow Query</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "I have a SQLite query that's slow: [paste query]. Here's the EXPLAIN QUERY PLAN output: [paste plan]. 
                What's causing the performance issue? Suggest specific indexes or query rewrites to optimize it."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Design Optimal Indexes</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "I have these frequent queries on a users table (10M rows): [list 3-5 queries]. Schema: users(user_id PK, email, 
                last_login, status, country). Suggest 2-3 strategic indexes that would optimize all of these. Explain the tradeoffs."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Anti-Pattern Detection</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "Review this query for performance anti-patterns: [paste query]. Identify issues like functions on columns, 
                SELECT *, leading wildcards, etc. Provide a rewritten version with explanations."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Composite Index Design</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "I need a composite index for: WHERE status = 'active' AND country = 'US' AND last_login &gt; '2024-01-01'. 
                What's the optimal column order? Explain why based on selectivity and query patterns."
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded p-3">
              <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1">Prompt: Index vs Query Rewrite Trade-off</p>
              <p className="text-xs text-teal-800 dark:text-teal-200 font-mono">
                "This query is slow: [paste query]. Should I add an index or rewrite the query? Consider: table has heavy writes 
                (10K inserts/sec), query runs 100 times/day. What's the best approach?"
              </p>
            </div>
          </div>

          <p className="text-sm mt-3 text-teal-800 dark:text-teal-200">
            <strong>Pro tip:</strong> When asking AI about optimization, always provide: (1) the query, (2) EXPLAIN QUERY PLAN output, 
            (3) table sizes and write frequency, (4) how often the query runs. This context helps AI give targeted, practical advice.
          </p>
        </Callout>
      </Section>

      {/* SECTION 9: How SQL Really Works */}
      <Section id="section14" title="How SQL Really Works - Under the Hood" level={2}>
        <p>
          Now that you've learned practical SQL—from basic CRUD operations through advanced optimization techniques—it's time to
          peek under the hood. Understanding what happens when you execute a query will deepen your intuition, help you write more
          efficient queries, debug problems faster, and make informed optimization decisions.
        </p>

        <Callout type="info" title="Why Learn This Now?">
          <p>
            You've been writing SQL queries throughout this chapter. Now that you understand <em>what</em> SQL can do, learning
            <em>how</em> it works internally will transform you from someone who writes SQL to someone who <em>thinks in SQL</em>.
          </p>
          <p className="mt-2">
            This knowledge—seeing the journey your query takes from text to results—is what separates junior developers from
            senior ones. It's the "aha!" moment that makes optimization patterns and best practices click into place.
          </p>
        </Callout>

        <Subsection title="The Query Lifecycle: From Text to Results">
          <p>
            When you hit "Execute" on a SQL query, it embarks on a sophisticated journey through multiple stages of the database engine.
            Each stage transforms the query from one representation to another, ultimately producing the results you see.
          </p>

          <MermaidDiagram
            caption="SQL Query Lifecycle: The Five Stages of Execution"
            chart={`
flowchart LR
    Start(["📝 SQL"]) ==> Parser["1️⃣ Parser"]
    Parser ==> Rewriter["2️⃣ Rewriter"]
    Rewriter ==> Planner["3️⃣ Planner"]
    Planner ==> Optimizer["4️⃣ Optimizer"]
    Optimizer ==> Executor["5️⃣ Executor"]
    Executor ==> Result(["📊 Result"])
            `}
          />

          <p className="mt-4">
            Let's walk through each stage with a concrete example. Consider this query:
          </p>

          <CodeExample
            title="Example Query for Analysis"
            code={`SELECT c.CompanyName, c.StockTicker, s.SectorName
FROM Companies c
INNER JOIN Sectors s ON c.SectorID = s.SectorID
WHERE c.Founded > 2000
ORDER BY c.CompanyName;`}
          />
        </Subsection>

        <Subsection title="Stage 1: The Parser - Syntax and Semantics">
          <p>
            The <strong>parser</strong> is the first stop. Its job is to validate that your SQL text is syntactically correct
            and semantically meaningful. It performs several critical checks:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Syntax validation:</strong> Is this valid SQL? (e.g., no typos like "SELCT" instead of "SELECT")</li>
            <li><strong>Object existence:</strong> Do the tables and columns you reference actually exist?</li>
            <li><strong>Type checking:</strong> Are you comparing compatible data types?</li>
            <li><strong>Permission verification:</strong> Do you have permission to access these tables?</li>
          </ul>

          <p>
            If any check fails, the parser immediately returns an error—the query never reaches later stages.
          </p>

          <p className="mt-4">
            Upon successful validation, the parser constructs an <strong>Abstract Syntax Tree (AST)</strong>—a hierarchical
            representation of your query's logical structure:
          </p>

          <MermaidDiagram
            caption="Abstract Syntax Tree: How the Parser Understands Your Query"
            chart={`
flowchart TD
    Root(["🎯 SELECT<br/>Statement"]) --> Cols
    Root --> From
    Root --> Where
    Root --> Order
    
    Cols["📋 Column List"] --> Col1["c.CompanyName"]
    Cols --> Col2["c.StockTicker"]
    Cols --> Col3["s.SectorName"]
    
    From["📦 FROM Clause"] --> Join["🔗 INNER JOIN"]
    Join --> T1["Companies c"]
    Join --> T2["Sectors s"]
    Join --> JoinCond["ON c.SectorID<br/>= s.SectorID"]
    
    Where["🔍 WHERE Clause"] --> Comp["c.Founded > 2000"]
    
    Order["⬆️ ORDER BY"] --> OrdCol["c.CompanyName ASC"]
            `}
          />

          <p className="mt-4">
            This tree structure makes it easy for subsequent stages to analyze and transform the query.
          </p>
        </Subsection>

        <Callout type="info" title="Historical Note: System R and Cost-Based Optimization">
          <p>
            IBM's <strong>System R</strong> project (1974-1979) was a watershed moment in database history. The System R
            query optimizer, designed by <strong>Patricia Selinger</strong>, <strong>Morton Astrahan</strong>, and colleagues,
            introduced <strong>cost-based optimization</strong>—the technique of estimating query execution costs and choosing
            the cheapest plan.
          </p>
          <p className="mt-2">
            This innovation made SQL practical for real-world use. Before cost-based optimization, queries could be prohibitively
            slow because the system couldn't automatically find efficient execution strategies. System R's optimizer is the
            ancestor of every modern query optimizer.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The original paper, "Access Path Selection in a Relational Database Management System" (1979), remains one of the
            most cited papers in database literature.
          </p>
        </Callout>

        <Subsection title="Stage 2: The Rewriter - Transforming the Query">
          <p>
            The <strong>rewriter</strong> (sometimes called the query rewriter) takes the parsed AST and applies transformation
            rules to simplify or standardize the query. Common transformations include:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>View expansion:</strong> If you query a view, the rewriter substitutes the view's definition</li>
            <li><strong>Subquery flattening:</strong> Simple subqueries may be converted to joins for efficiency</li>
            <li><strong>Constant folding:</strong> Expressions like <code>2 + 3</code> are computed at rewrite time, not execution</li>
            <li><strong>Predicate normalization:</strong> Conditions are standardized (e.g., <code>5 &lt; x</code> becomes <code>x &gt; 5</code>)</li>
          </ul>

          <p className="mt-4">
            These transformations don't change the query's semantics—they just make it easier for the optimizer to work with.
          </p>
        </Subsection>

        <Subsection title="Stage 3 & 4: The Planner and Optimizer - Finding the Best Path">
          <p>
            This is where the magic happens. The <strong>query planner</strong> and <strong>optimizer</strong> work together to
            answer a critical question: "Of all the ways we could execute this query, which is fastest?"
          </p>

          <Callout type="tip" title="The Optimization Problem">
            <p>
              For a query joining multiple tables, the number of possible execution plans grows factorially. A join of 10 tables
              has over 3.6 million possible join orders alone—and that's before considering different join algorithms, index usage,
              and other choices!
            </p>
            <p className="mt-2">
              Modern optimizers use sophisticated techniques—dynamic programming, heuristics, and genetic algorithms—to explore
              the most promising plans without exhaustively evaluating every possibility.
            </p>
          </Callout>

          <p className="mt-4">
            The optimizer considers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scan Methods</h4>
              <ul className="text-sm space-y-1">
                <li>• Sequential Scan (read every row)</li>
                <li>• Index Scan (use B-tree)</li>
                <li>• Index-Only Scan (covering index)</li>
                <li>• Bitmap Index Scan</li>
              </ul>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Join Algorithms</h4>
              <ul className="text-sm space-y-1">
                <li>• Nested Loop Join</li>
                <li>• Hash Join</li>
                <li>• Merge Join (Sort-Merge)</li>
              </ul>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Join Orders</h4>
              <ul className="text-sm space-y-1">
                <li>• Left-deep trees</li>
                <li>• Right-deep trees</li>
                <li>• Bushy trees</li>
              </ul>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cost Factors</h4>
              <ul className="text-sm space-y-1">
                <li>• I/O operations (disk reads)</li>
                <li>• CPU processing time</li>
                <li>• Memory usage</li>
                <li>• Network transfer (distributed)</li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            The optimizer relies heavily on <strong>statistics</strong> about your data: table sizes, column cardinalities
            (number of distinct values), data distribution, and index availability. Poor or outdated statistics can lead to
            suboptimal query plans.
          </p>

          <MermaidDiagram
            caption="Sequential Scan vs Index Scan: Choosing the Right Access Method"
            chart={`
flowchart LR
    Query["🔍 WHERE id = 42"] --> Decision{"Estimated<br/>Rows?"}
    
    Decision -->|"> 20% rows<br/>Many"| SeqPath["📖 Sequential Scan"]
    Decision -->|"< 5% rows<br/>Few"| IdxPath["⚡ Index Scan"]
    
    SeqPath --> SeqSteps["Read all rows<br/>Filter matching<br/>Return results"]
    IdxPath --> IdxSteps["B-Tree lookup<br/>Fetch specific rows<br/>Return results"]
    
    SeqSteps --> SeqNote["Slower for few rows<br/>But efficient for many"]
    IdxSteps --> IdxNote["Fast for few rows<br/>But overhead for many"]
            `}
          />

          <p className="mt-4">
            <strong>Rule of thumb:</strong> Index scans shine when selecting a small percentage of rows. Sequential scans
            are faster for large result sets because they read data sequentially (which is efficient for disks), whereas index
            scans require random access.
          </p>
        </Subsection>

        <Subsection title="Join Algorithms: Three Ways to Match Rows">
          <p>
            When your query joins tables, the optimizer must choose how to physically match rows. Each algorithm has different
            performance characteristics:
          </p>

          <MermaidDiagram
            caption="Join Algorithms Comparison: Nested Loop, Hash Join, and Merge Join"
            chart={`
flowchart TB
    subgraph NL["🔄 Nested Loop Join"]
        direction TB
        NL1["For each row in A"]
        NL2["Scan all rows in B"]
        NL3["Check condition"]
        NL1 --> NL2 --> NL3
        NLNote["✅ Small outer table<br/>❌ No indexes = slow"]
    end
    
    subgraph HJ["# Hash Join"]
        direction TB
        HJ1["Build hash from A"]
        HJ2["Probe with B"]
        HJ3["Match on hash"]
        HJ1 --> HJ2 --> HJ3
        HJNote["✅ Large tables<br/>⚠️ Needs memory"]
    end
    
    subgraph MJ["⚡ Merge Join"]
        direction TB
        MJ1["Sort A"]
        MJ2["Sort B"]
        MJ3["Merge streams"]
        MJ1 --> MJ3
        MJ2 --> MJ3
        MJNote["✅ Pre-sorted data<br/>⚠️ Needs sort key"]
    end
            `}
          />

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Algorithm</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Time Complexity</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Best For</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Requirements</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Nested Loop</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">O(N × M)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Small tables or indexed inner table</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">None</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Hash Join</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">O(N + M)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Large tables with equi-joins</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Sufficient memory for hash table</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Merge Join</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">O(N log N + M log M)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Pre-sorted data or indexed columns</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Sortable join keys</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Stage 5: The Executor - Making It Happen">
          <p>
            Finally, the <strong>executor</strong> runs the optimized plan. It's a pipeline of physical operators, each performing
            a specific task: scanning tables, applying filters, joining rows, sorting, aggregating, and returning results.
          </p>

          <p className="mt-4">
            The executor is highly optimized, using techniques like:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Pipelining:</strong> Results flow from one operator to the next without materializing intermediate results</li>
            <li><strong>Batch processing:</strong> Operating on multiple rows at once for better CPU cache utilization</li>
            <li><strong>Parallel execution:</strong> Using multiple CPU cores to process data simultaneously</li>
            <li><strong>Lazy evaluation:</strong> Computing only what's needed (important for LIMIT clauses)</li>
          </ul>

          <p>
            For our example query, the executor might:
          </p>

          <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>Scan the Sectors table (it's small)</li>
            <li>For each sector, use an index to find matching companies</li>
            <li>Apply the <code>Founded &gt; 2000</code> filter</li>
            <li>Sort the results by CompanyName</li>
            <li>Return rows to the client</li>
          </ol>
        </Subsection>

        <Subsection title="Query Execution Order: Write vs. Execute">
          <p>
            One of the most important concepts for SQL mastery is understanding that <strong>the order you write a query differs
            from the order the database executes it</strong>. This logical execution order explains many SQL quirks.
          </p>

          <MermaidDiagram
            caption="Logical SQL Execution Order: How the Database Actually Processes Your Query"
            chart={`
flowchart LR
    Start(["📝 Query"]) ==> Step1["1️⃣ FROM/JOIN"]
    Step1 ==> Step2["2️⃣ WHERE"]
    Step2 ==> Step3["3️⃣ GROUP BY"]
    Step3 ==> Step4["4️⃣ HAVING"]
    Step4 ==> Step5["5️⃣ SELECT"]
    Step5 ==> Step6["6️⃣ DISTINCT"]
    Step6 ==> Step7["7️⃣ ORDER BY"]
    Step7 ==> Step8["8️⃣ LIMIT"]
    Step8 ==> End(["📊 Result"])
            `}
          />

          <Callout type="warning" title="Why Execution Order Matters: Common Gotchas">
            <p className="font-semibold">This execution order explains several SQL behaviors that confuse beginners:</p>
            
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-medium">❌ You CANNOT use column aliases in WHERE:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm">
                  SELECT salary * 1.1 AS new_salary<br/>
                  FROM employees<br/>
                  WHERE new_salary &gt; 100000; -- ERROR!
                </code>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  Because WHERE executes <em>before</em> SELECT, the alias doesn't exist yet.
                </p>
              </div>

              <div>
                <p className="font-medium">✅ You CAN use aliases in ORDER BY:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm">
                  SELECT salary * 1.1 AS new_salary<br/>
                  FROM employees<br/>
                  ORDER BY new_salary DESC; -- Works!
                </code>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  ORDER BY executes <em>after</em> SELECT, so aliases are available.
                </p>
              </div>

              <div>
                <p className="font-medium">❌ You CANNOT use aggregate functions in WHERE:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm">
                  SELECT department, AVG(salary) AS avg_sal<br/>
                  FROM employees<br/>
                  WHERE AVG(salary) &gt; 80000 -- ERROR!<br/>
                  GROUP BY department;
                </code>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  Use HAVING instead—it executes after GROUP BY.
                </p>
              </div>
            </div>
          </Callout>

          <p className="mt-4">
            Understanding this execution order transforms you from memorizing SQL syntax to reasoning about how queries work.
            It's the difference between knowing <em>what</em> to type and understanding <em>why</em> it works.
          </p>
        </Subsection>

        <p className="mt-6">
          Let's see execution order in action with a practical example:
        </p>

        <SQLPlayground
          preset={FINANCIAL_FULL_PRESET}
          defaultQuery={`-- This query demonstrates logical execution order
-- Study how aliases can/can't be used in different clauses

SELECT
  s.SectorName,
  COUNT(*) AS company_count,          -- Alias created here (Step 5)
  AVG(li.Value) AS avg_revenue        -- Another alias
FROM Sectors s                         -- Step 1: Start with Sectors
INNER JOIN Companies c                 -- Step 1: Join Companies
  ON s.SectorID = c.SectorID
INNER JOIN Financial_Statements fs     -- Step 1: Join Statements
  ON c.CompanyID = fs.CompanyID
INNER JOIN Line_Items li               -- Step 1: Join Line Items
  ON fs.StatementID = li.StatementID
WHERE li.ItemName = 'Revenue'          -- Step 2: Filter rows
  -- WHERE can't use avg_revenue alias (doesn't exist yet!)
GROUP BY s.SectorName                  -- Step 3: Group by sector
HAVING COUNT(*) >= 2                   -- Step 4: Filter groups (can use aggregates!)
ORDER BY avg_revenue DESC              -- Step 7: Sort (CAN use alias!)
LIMIT 5;                               -- Step 8: Take top 5

-- Try these experiments:
-- 1. Uncomment the next line to see an error:
-- WHERE avg_revenue > 1000000000;    -- ERROR: alias not available in WHERE

-- 2. Change ORDER BY to use company_count instead
-- 3. Try HAVING AVG(li.Value) > 50000000000 instead of COUNT(*)
`}
        />

        <p className="mt-4">
          With this foundation of how SQL works internally, you're now equipped to write more sophisticated queries.
          The rest of this part will build on these concepts, showing you not just <em>what</em> SQL can do, but <em>why</em>
          and <em>how</em> it works.
        </p>
      </Section>

      {/* ============================================
          SECTION 10: AI-Assisted SQL Development
          ============================================ */}
      <Section id="section15" title="10. AI-Assisted SQL Development">
        <p>
          The intersection of AI and SQL is transforming how we work with databases. From writing complex queries via natural
          language to building intelligent SQL assistants, AI amplifies your database productivity—but only if you understand
          both the capabilities and limitations.
        </p>

        <p className="mt-4">
          This section covers practical techniques for leveraging AI in your SQL workflow, whether you're using ChatGPT, Claude,
          GitHub Copilot, or specialized Text-to-SQL tools.
        </p>

        <Subsection title="Prompt Engineering for SQL: Effective Communication with AI">
          <p>
            The quality of AI-generated SQL depends entirely on your prompt quality. A vague prompt yields vague SQL; a precise,
            well-structured prompt yields production-ready queries.
          </p>

          <Callout type="ai" title="Anatomy of a Great SQL Prompt">
            <p>
              A high-quality SQL prompt includes:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li><strong>Schema description:</strong> Table names, column names, data types, relationships</li>
              <li><strong>Clear objective:</strong> Exactly what question you're trying to answer</li>
              <li><strong>Constraints:</strong> Database dialect, performance requirements, edge cases</li>
              <li><strong>Output format:</strong> What the result should look like</li>
              <li><strong>Examples (optional):</strong> Sample data or expected output</li>
            </ol>
          </Callout>

          <CodeExample
            title="Poor vs. Excellent SQL Prompts"
            code={`❌ POOR PROMPT:
"Write a query to get customer orders"

Problem: Ambiguous, no schema, unclear goal


✅ EXCELLENT PROMPT:
Schema:
- customers (customer_id PK, first_name, last_name, email, signup_date)
- orders (order_id PK, customer_id FK, order_date, total_amount, status)

Task: Find all customers who have placed more than 3 orders in 2024,
showing their name, total number of orders, and total amount spent.
Sort by total spent (highest first).

Database: SQLite
Optimization: Include any indexes that would help this query.

Expected output columns: customer_name, order_count, total_spent`}
          />

          <CodeExample
            title="Template: Analytical Query Prompt"
            code={`Schema:
[Provide CREATE TABLE statements or clear description]

Relationships:
- [Table A] -> [Table B] via [foreign_key]
- [Table B] -> [Table C] via [foreign_key]

Business Question:
[Clear description of what you want to analyze]

Requirements:
- Database dialect: [SQLite/PostgreSQL/MySQL/etc.]
- Performance: [Can use subqueries/CTEs/window functions?]
- Edge cases: [How to handle NULLs? Missing data? Duplicates?]

Expected Output:
[Column names and sample row]`}
          />

          <CodeExample
            title="Template: Debugging/Optimization Prompt"
            code={`Current Query:
[Your SQL query here]

Schema:
[Relevant table definitions]

Problem:
[Describe what's wrong: incorrect results? too slow? syntax error?]

Current Behavior:
[What actually happens]

Expected Behavior:
[What should happen]

Request: [Fix the query | Optimize for performance | Explain what's wrong]`}
          />
        </Subsection>

        <Subsection title="Schema Context: The Foundation of AI SQL Generation">
          <p>
            AI models need to understand your database schema to generate accurate SQL. The more context you provide, the
            better the results. Here are three strategies:
          </p>

          <div className="mt-4 space-y-4">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Strategy 1: Inline Schema Description</p>
              <p className="text-sm mt-2">
                For one-off queries, paste your schema directly into the prompt. Use <code>CREATE TABLE</code> statements
                or a concise text description.
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Strategy 2: Schema Files in Project Context</p>
              <p className="text-sm mt-2">
                For Copilot/Cursor AI, maintain a <code>schema.sql</code> or <code>SCHEMA.md</code> file in your repository.
                The AI automatically uses it as context when writing SQL in your codebase.
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Strategy 3: RAG-Enhanced SQL Assistants</p>
              <p className="text-sm mt-2">
                For production systems, use Retrieval-Augmented Generation (RAG) to automatically fetch relevant schema
                information based on the user's question. We'll explore this approach next.
              </p>
            </div>
          </div>
        </Subsection>

        <Subsection title="Text-to-SQL Systems: From Natural Language to Queries">
          <p>
            <strong>Text-to-SQL</strong> (also called <strong>NL-to-SQL</strong>) systems translate natural language questions
            into executable SQL queries. These systems power chatbots, business intelligence tools, and internal data assistants.
          </p>

          <MermaidDiagram
            caption="Text-to-SQL System Architecture"
            chart={`
flowchart TB
    User["👤 User Question<br/>'Show me top customers'"]
    
    subgraph System["💡 Text-to-SQL System"]
        direction TB
        Parse["1️⃣ Parse Intent"]
        Schema["2️⃣ Retrieve Schema"]
        Generate["3️⃣ Generate SQL"]
        Validate["4️⃣ Validate Query"]
    end
    
    DB["💾 Database"]
    Results["📊 Results"]
    
    User ==> Parse
    Parse ==> Schema
    Schema ==> Generate
    Generate ==> Validate
    Validate ==> DB
    DB ==> Results
    Results ==> User
            `}
          />

          <p className="mt-4">
            <strong>Modern approaches:</strong>
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Fine-tuned models:</strong> Train models specifically on SQL generation tasks (e.g., text2sql-t5, CodeT5+)
            </li>
            <li>
              <strong>Few-shot prompting:</strong> Provide examples of question→SQL pairs in the prompt to guide the LLM
            </li>
            <li>
              <strong>Chain-of-thought:</strong> Ask AI to explain its reasoning before generating SQL, improving accuracy
            </li>
            <li>
              <strong>Self-correction:</strong> Let AI execute the query, see results, and refine if incorrect
            </li>
          </ul>

          <Callout type="info" title="Popular Text-to-SQL Tools">
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li><strong>Vanna AI:</strong> Open-source Python library for RAG-based Text-to-SQL</li>
              <li><strong>Defog.ai:</strong> Fine-tuned models for production Text-to-SQL</li>
              <li><strong>MindsDB:</strong> AI layer on top of databases with NL query support</li>
              <li><strong>Waii:</strong> Enterprise Text-to-SQL with governance</li>
              <li><strong>Custom LLM + RAG:</strong> Build your own with OpenAI/Anthropic APIs + vector DB</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="RAG for SQL: Retrieval-Augmented Generation">
          <p>
            For large schemas (50+ tables), including the entire schema in every prompt is impractical. <strong>RAG</strong>
            (Retrieval-Augmented Generation) solves this by retrieving only the relevant schema portions for each question.
          </p>

          <MermaidDiagram
            caption="RAG Architecture for SQL Assistant"
            chart={`
flowchart LR
    subgraph Offline["📚 Offline: Build Knowledge"]
        direction TB
        S1["Schema Metadata"]
        S2["Sample Queries"]
        S3["Business Glossary"]
        S1 & S2 & S3 --> Embed["Embed"]
        Embed --> Vector["Vector DB"]
    end
    
    subgraph Online["⚡ Online: Answer"]
        direction TB
        Q["Question"]
        Q --> QEmbed["Embed"]
        QEmbed --> Search["Search"]
        Vector --> Search
        Search --> Context["Schema Context"]
        Context --> LLM["LLM"]
        LLM --> SQL["✅ SQL"]
    end
    
    Offline ==> Online
            `}
          />

          <p className="mt-4">
            <strong>Key components:</strong>
          </p>

          <ol className="list-decimal pl-6 space-y-2 mt-2 text-sm">
            <li>
              <strong>Embeddings:</strong> Convert table/column descriptions and sample queries into vectors
            </li>
            <li>
              <strong>Vector database:</strong> Store embeddings for fast similarity search
            </li>
            <li>
              <strong>Retrieval:</strong> For each question, find the K most relevant schema elements
            </li>
            <li>
              <strong>Augmented prompt:</strong> Combine question + retrieved schema + examples → LLM → SQL
            </li>
          </ol>

          <Callout type="ai" title="Building Your Own SQL Assistant: A Guide">
            <p className="font-semibold">High-Level Architecture</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3 text-sm">
              <li>
                <strong>Extract schema metadata:</strong>
                <pre className="text-xs mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded">
{`SELECT name, sql FROM sqlite_master WHERE type='table';
-- Parse CREATE TABLE to get columns, types, constraints`}
                </pre>
              </li>
              <li>
                <strong>Enrich with business context:</strong> Add human-readable descriptions for tables and columns (e.g., "customer_id: Unique identifier for customers")
              </li>
              <li>
                <strong>Create embeddings:</strong> Use OpenAI's <code>text-embedding-3-small</code> or similar to embed schema descriptions
              </li>
              <li>
                <strong>Store in vector DB:</strong> Populate Pinecone, Weaviate, or Chroma with schema embeddings
              </li>
              <li>
                <strong>Query-time flow:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>User asks: "Who are our top 10 customers by revenue?"</li>
                  <li>Embed question → retrieve relevant tables (customers, orders)</li>
                  <li>Build prompt with retrieved schema + question</li>
                  <li>Call LLM to generate SQL</li>
                  <li>Execute SQL, return results</li>
                </ul>
              </li>
              <li>
                <strong>Self-correction loop:</strong> If SQL errors, feed error back to LLM for retry
              </li>
            </ol>

            <p className="mt-4 font-semibold">Sample Stack:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li><strong>Backend:</strong> Python (FastAPI) or Node.js</li>
              <li><strong>LLM:</strong> OpenAI GPT-4 or Anthropic Claude (via API)</li>
              <li><strong>Vector DB:</strong> Pinecone (hosted) or Chroma (local/embedded)</li>
              <li><strong>Frontend:</strong> React chat interface</li>
              <li><strong>Database:</strong> Your existing database (PostgreSQL, MySQL, SQLite, etc.)</li>
            </ul>

            <p className="mt-4 text-sm">
              <strong>Pro tip:</strong> Start simple. Build a basic version that takes a question, includes the full schema
              in the prompt, generates SQL, and executes it. Then add RAG once you prove the concept works.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="Debugging AI-Generated SQL: Common Pitfalls">
          <p>
            AI-generated SQL is impressive but not infallible. Common issues include incorrect JOINs, missing WHERE clauses,
            wrong aggregations, or SQL that runs but returns semantically incorrect results.
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Common Error</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Symptom</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Wrong JOIN type</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Missing or extra rows in results</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Verify INNER vs LEFT/RIGHT JOIN matches intent</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Missing WHERE clause</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Returns all data instead of filtered</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Clarify filtering requirements in prompt</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Incorrect aggregation</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Wrong totals or counts</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Check GROUP BY columns and HAVING conditions</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Ambiguous column names</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">"Ambiguous column" error</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Prefix columns with table aliases</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">NULL handling issues</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Unexpected missing values</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Add COALESCE or IS NOT NULL checks</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Dialect-specific syntax</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Syntax error in your database</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Specify database dialect in prompt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SQLPlayground
            preset={ECOMMERCE_PRESET}
            defaultQuery={`-- Debugging example: AI-generated query with a subtle bug

-- ❌ AI generated this (looks reasonable, but has a bug!):
-- "Show customers who placed orders in January 2024"
SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE strftime('%Y-%m', o.order_date) = '2024-01'
GROUP BY c.customer_id;

-- Bug: INNER JOIN excludes customers with no orders
-- If a customer placed orders only outside January, they're missing!

-- ✅ Fixed version (if we want "customers with >= 1 order in Jan"):
SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE strftime('%Y-%m', o.order_date) = '2024-01'
GROUP BY c.customer_id, c.first_name, c.last_name;

-- But if we want "all customers, showing Jan 2024 order count":
SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  COUNT(CASE WHEN strftime('%Y-%m', o.order_date) = '2024-01' THEN 1 END) AS jan_order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name;`}
          />

          <p className="mt-4">
            <strong>Debugging checklist:</strong>
          </p>

          <ol className="list-decimal pl-6 space-y-1 mt-2 text-sm">
            <li>Does the query execute without errors?</li>
            <li>Are the row counts reasonable? (Too many/few rows suggests JOIN issues)</li>
            <li>Do aggregate values make sense? (Verify totals/averages manually)</li>
            <li>Are NULLs handled correctly? (Check for unexpected NULL results)</li>
            <li>Does it answer the original question? (Read results carefully)</li>
            <li>Is it performant? (Run EXPLAIN QUERY PLAN)</li>
          </ol>
        </Subsection>

        <p className="mt-6">
          AI is a powerful SQL copilot, not autopilot. Use it to accelerate your workflow, but always review, test, and
          understand the generated queries. The combination of your domain knowledge and AI's pattern recognition creates
          the best results.
        </p>
      </Section>

      {/* ============================================
          SECTION 11: Transactions and ACID
          ============================================ */}
      <Section id="section16" title="11. Transactions and ACID: Ensuring Data Consistency">
        <p>
          So far, we've focused on reading and writing individual records. But real-world applications often require multiple
          operations to succeed or fail <em>together</em>. This is where <strong>transactions</strong> come in.
        </p>

        <p className="mt-4">
          A <strong>transaction</strong> is a logical unit of work that consists of one or more SQL statements. Transactions
          guarantee that either all operations succeed (<strong>commit</strong>) or none do (<strong>rollback</strong>),
          maintaining database consistency even in the face of errors or crashes.
        </p>

        <Callout type="tip" title="Analogy: Bank Transfer">
          <p>
            Imagine transferring $100 from your checking account to savings:
          </p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Deduct $100 from checking</li>
            <li>Add $100 to savings</li>
          </ol>
          <p className="mt-2">
            If step 1 succeeds but step 2 fails (power outage, crash), you've lost $100! A transaction ensures both steps
            happen atomically—either both succeed or neither happens. Your money is never lost in limbo.
          </p>
        </Callout>

        <Subsection title="ACID Properties: The Foundation of Reliability">
          <p>
            Transactions adhere to four key properties, known by the acronym <strong>ACID</strong>:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Property</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Meaning</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Guarantee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Atomicity</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">All or nothing</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Either all operations succeed (commit) or none do (rollback)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Consistency</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Valid state transitions</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Database goes from one valid state to another (constraints enforced)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Isolation</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Independent execution</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Concurrent transactions don't interfere with each other</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Durability</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Permanent once committed</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Committed changes survive system failures (written to disk)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Transaction Commands">
          <p>
            SQL provides three key commands for transaction control:
          </p>

          <CodeExample
            title="Transaction Syntax"
            code={`-- Start a transaction
BEGIN TRANSACTION;  -- or just BEGIN

-- Execute multiple statements
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Commit (make changes permanent)
COMMIT;

-- OR rollback (undo all changes since BEGIN)
ROLLBACK;`}
          />

          <SQLPlayground
            preset={EMPLOYEES_PRESET}
            defaultQuery={`-- Transaction example: Promote employee with salary adjustment

BEGIN TRANSACTION;

-- Step 1: Update salary
UPDATE employees
SET salary = salary * 1.15
WHERE name = 'Alice Johnson';

-- Step 2: Verify change (if this were production, we'd check business logic here)
SELECT name, department, salary
FROM employees
WHERE name = 'Alice Johnson';

-- If everything looks good:
COMMIT;

-- If there's a problem, you'd use:
-- ROLLBACK;

-- Note: In this playground, the transaction is auto-committed when successful.
-- In production, you'd have explicit control over COMMIT/ROLLBACK.`}
          />
        </Subsection>

        <Callout type="info" title="SQLite Transaction Behavior">
          <p>
            SQLite specifics:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li>By default, each statement is its own auto-committed transaction</li>
            <li>Use <code>BEGIN</code> to start an explicit transaction</li>
            <li>SQLite supports three transaction modes: DEFERRED (default), IMMEDIATE, EXCLUSIVE</li>
            <li>Write-ahead logging (WAL mode) allows concurrent reads during writes</li>
          </ul>
        </Callout>

        <p className="mt-6">
          Transactions are crucial for data integrity in multi-user systems and complex operations. While we've covered the
          basics here, transaction management in production involves isolation levels, deadlock handling, and concurrency
          control—topics for advanced database courses. For now, remember: when multiple operations must succeed together,
          wrap them in a transaction.
        </p>
      </Section>

      {/* ============================================
          SECTION 12: Practice and Real-World Scenarios
          ============================================ */}
      <Section id="section17" title="12. Practice: Putting It All Together">
        <p>
          You've learned a tremendous amount: from basic SELECT statements to window functions, query optimization, and
          AI-assisted development. Now it's time to apply this knowledge to realistic scenarios that mirror real-world
          data challenges.
        </p>

        <p className="mt-4">
          These exercises are progressive—each builds on concepts from previous sections. Try solving each on your own first,
          then review the solution. There's often more than one correct approach!
        </p>

        <Subsection title="Exercise 1: Customer Lifetime Value Analysis">
          <p>
            <strong>Scenario:</strong> You're analyzing customer behavior for an e-commerce company.
            <br />
            <strong>Task:</strong> Find customers who have placed at least 3 orders, showing their total order count,
            total amount spent, average order value, and days since their last order.
            Sort by total spent (highest first).
          </p>

          <details className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
              💡 Hint (click to expand)
            </summary>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Use JOIN between customers and orders</li>
              <li>GROUP BY customer and use aggregate functions (COUNT, SUM, AVG)</li>
              <li>HAVING clause to filter for customers with 3+ orders</li>
              <li>Use JULIANDAY for date calculations</li>
            </ul>
          </details>

          <details className="mt-4 border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-100">
              ✅ Solution (click to expand)
            </summary>
            <SQLPlayground
              preset={ECOMMERCE_PRESET}
              defaultQuery={`-- Solution: Customer Lifetime Value Analysis

SELECT 
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer_name,
  c.email,
  COUNT(o.order_id) AS total_orders,
  ROUND(SUM(o.total_amount), 2) AS lifetime_value,
  ROUND(AVG(o.total_amount), 2) AS avg_order_value,
  ROUND(JULIANDAY('now') - JULIANDAY(MAX(o.order_date)), 0) AS days_since_last_order
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
HAVING COUNT(o.order_id) >= 3
ORDER BY lifetime_value DESC;`}
            />
          </details>
        </Subsection>

        <Subsection title="Exercise 2: Department Salary Analysis with Window Functions">
          <p>
            <strong>Scenario:</strong> You're conducting a compensation analysis.
            <br />
            <strong>Task:</strong> For each employee, show their name, department, salary, rank within their department
            (by salary), the department's average salary, and how much their salary differs from the department average.
          </p>

          <details className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
              💡 Hint (click to expand)
            </summary>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Use RANK() OVER (PARTITION BY department ORDER BY salary DESC)</li>
              <li>Use AVG() OVER (PARTITION BY department) for department average</li>
              <li>Calculate difference: salary - AVG(...) OVER (...)</li>
              <li>No GROUP BY needed—window functions preserve all rows</li>
            </ul>
          </details>

          <details className="mt-4 border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-100">
              ✅ Solution (click to expand)
            </summary>
            <SQLPlayground
              preset={EMPLOYEES_PRESET}
              defaultQuery={`-- Solution: Department Salary Analysis

SELECT 
  name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  ROUND(AVG(salary) OVER (PARTITION BY department), 0) AS dept_avg_salary,
  ROUND(salary - AVG(salary) OVER (PARTITION BY department), 0) AS diff_from_avg,
  CASE
    WHEN salary > AVG(salary) OVER (PARTITION BY department) THEN 'Above Average'
    WHEN salary < AVG(salary) OVER (PARTITION BY department) THEN 'Below Average'
    ELSE 'Average'
  END AS performance_indicator
FROM employees
ORDER BY department, dept_rank;`}
            />
          </details>
        </Subsection>

        <Subsection title="Exercise 3: Finding Gaps in Order Sequences">
          <p>
            <strong>Scenario:</strong> You're auditing order processing to find missing order IDs (gaps in the sequence).
            <br />
            <strong>Task:</strong> Identify all missing order_id values in the orders table. For example, if orders exist
            for IDs 1, 2, 4, 5, 7, you should identify that IDs 3 and 6 are missing.
          </p>

          <details className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
              💡 Hint (click to expand)
            </summary>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Use recursive CTE to generate all numbers from MIN to MAX order_id</li>
              <li>Use EXCEPT to find generated numbers not in actual orders</li>
              <li>Alternatively: use LAG() to find gaps between consecutive order_ids</li>
            </ul>
          </details>

          <details className="mt-4 border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-100">
              ✅ Solution (click to expand)
            </summary>
            <SQLPlayground
              preset={ECOMMERCE_PRESET}
              defaultQuery={`-- Solution 1: Using Recursive CTE + EXCEPT

WITH RECURSIVE all_ids AS (
  -- Anchor: Start with minimum order_id
  SELECT MIN(order_id) AS id FROM orders
  
  UNION ALL
  
  -- Recursive: Generate next number
  SELECT id + 1
  FROM all_ids
  WHERE id < (SELECT MAX(order_id) FROM orders)
)
SELECT id AS missing_order_id
FROM all_ids
EXCEPT
SELECT order_id FROM orders
ORDER BY id;

-- Solution 2: Using LAG() to find gaps
-- This shows ranges of missing IDs more clearly

SELECT 
  order_id + 1 AS gap_start,
  next_id - 1 AS gap_end,
  (next_id - order_id - 1) AS missing_count
FROM (
  SELECT 
    order_id,
    LEAD(order_id) OVER (ORDER BY order_id) AS next_id
  FROM orders
) AS gaps
WHERE next_id > order_id + 1
ORDER BY gap_start;`}
            />
          </details>
        </Subsection>

        <Subsection title="Exercise 4: Monthly Sales Trend with Moving Average">
          <p>
            <strong>Scenario:</strong> You're creating a sales dashboard.
            <br />
            <strong>Task:</strong> Show monthly total sales, the 3-month moving average, and the month-over-month
            percentage change. Display results for all available months.
          </p>

          <details className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
              💡 Hint (click to expand)
            </summary>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Group by year-month: strftime('%Y-%m', order_date)</li>
              <li>Use SUM() for monthly totals</li>
              <li>Use AVG() OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) for 3-month average</li>
              <li>Use LAG() to get previous month's value for percentage change</li>
            </ul>
          </details>

          <details className="mt-4 border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-100">
              ✅ Solution (click to expand)
            </summary>
            <SQLPlayground
              preset={ECOMMERCE_PRESET}
              defaultQuery={`-- Solution: Monthly Sales Trend Analysis

WITH monthly_sales AS (
  SELECT 
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2) AS monthly_total
  FROM orders
  GROUP BY strftime('%Y-%m', order_date)
)
SELECT 
  month,
  monthly_total,
  ROUND(AVG(monthly_total) OVER (
    ORDER BY month 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) AS moving_avg_3mo,
  ROUND(
    100.0 * (monthly_total - LAG(monthly_total) OVER (ORDER BY month)) 
    / LAG(monthly_total) OVER (ORDER BY month),
    2
  ) AS pct_change_mom
FROM monthly_sales
ORDER BY month;`}
            />
          </details>
        </Subsection>

        <Subsection title="Exercise 5: Complex Multi-Table Analysis with CTEs">
          <p>
            <strong>Scenario:</strong> You're preparing an executive report combining multiple datasets.
            <br />
            <strong>Task:</strong> Create a comprehensive report showing:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm">
            <li>Customers who placed orders in the last 30 days</li>
            <li>Their total number of orders (all time)</li>
            <li>Total amount spent (all time)</li>
            <li>Their rank among active customers (by total spent)</li>
            <li>Percentage of company's total revenue they represent</li>
          </ul>

          <details className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
              💡 Hint (click to expand)
            </summary>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Use multiple CTEs: one for recent customers, one for all-time stats, one for totals</li>
              <li>JOIN the CTEs together</li>
              <li>Use RANK() OVER (ORDER BY total_spent DESC)</li>
              <li>Calculate percentage: 100.0 * customer_total / company_total</li>
            </ul>
          </details>

          <details className="mt-4 border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-100">
              ✅ Solution (click to expand)
            </summary>
            <SQLPlayground
              preset={ECOMMERCE_PRESET}
              defaultQuery={`-- Solution: Comprehensive Executive Report

WITH 
  -- CTE 1: Customers with recent activity
  recent_customers AS (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE order_date >= DATE('now', '-30 days')
  ),
  -- CTE 2: All-time customer statistics
  customer_stats AS (
    SELECT 
      c.customer_id,
      c.first_name || ' ' || c.last_name AS customer_name,
      c.email,
      COUNT(o.order_id) AS total_orders,
      ROUND(SUM(o.total_amount), 2) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.first_name, c.last_name, c.email
  ),
  -- CTE 3: Company totals
  company_total AS (
    SELECT SUM(total_amount) AS total_revenue
    FROM orders
  )
-- Final query: Combine CTEs
SELECT 
  cs.customer_name,
  cs.email,
  cs.total_orders,
  cs.total_spent,
  RANK() OVER (ORDER BY cs.total_spent DESC) AS revenue_rank,
  ROUND(100.0 * cs.total_spent / ct.total_revenue, 2) AS pct_of_total_revenue
FROM customer_stats cs
CROSS JOIN company_total ct
WHERE cs.customer_id IN (SELECT customer_id FROM recent_customers)
ORDER BY cs.total_spent DESC;`}
            />
          </details>
        </Subsection>

        <p className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Congratulations! 🎉
        </p>

        <p className="mt-4">
          You've completed Part III: Mastering SQL. You now have a comprehensive understanding of SQL, from basic queries
          to advanced analytics, optimization, and AI-assisted development. These skills form the foundation for working
          with any relational database system.
        </p>

        <p className="mt-4">
          The best way to solidify this knowledge is through practice. Build projects, explore real datasets, contribute
          to open-source projects with databases, and keep pushing the boundaries of what you can accomplish with SQL.
        </p>

        <Callout type="success" title="What You've Mastered">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>SQL fundamentals: SELECT, INSERT, UPDATE, DELETE, and DDL</li>
            <li>Query execution lifecycle and optimization</li>
            <li>Complex queries: JOINs, subqueries, CTEs, window functions</li>
            <li>Advanced techniques: CASE, set operations, string/date functions</li>
            <li>Performance optimization: indexing, EXPLAIN QUERY PLAN, anti-patterns</li>
            <li>AI-assisted SQL development: prompting, Text-to-SQL, RAG systems</li>
            <li>Transactions and ACID properties</li>
            <li>Real-world analytical queries combining multiple concepts</li>
          </ul>
        </Callout>

        <p className="mt-6">
          In the next parts, we'll explore advanced database concepts, the broader database ecosystem, and dive deeper into
          architectural considerations for production systems. Keep learning, keep building! 🚀
        </p>
      </Section>
    </>
  );
}
