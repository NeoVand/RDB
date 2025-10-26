import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, ENROLLMENT_PRESET } from '../../lib/database/presets';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../../hooks/useTheme';

function InlineMermaid({ chart }: { chart: string }) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-inline-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });
        const { svg } = await mermaid.render(idRef.current, chart.trim());
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error('Mermaid render error for chart:', chart);
        console.error('Error details:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-600 p-4 text-sm">Failed to render: ${error instanceof Error ? error.message : 'Unknown error'}</div>`;
        }
      }
    };
    renderDiagram();
  }, [chart, theme]);

  return <div ref={containerRef} className="flex justify-center items-center w-full" />;
}

export function Part1_Foundation() {
  return (
    <>
      <Section id="part1" title="Part I: The Foundation - Understanding the Relational World" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This first part establishes the fundamental vocabulary and conceptual framework of the relational model. 
          We'll move from abstract ideas to concrete definitions, ensuring a solid base before introducing complexity.
        </p>
      </Section>

      <Section id="section1" title="What is a Relational Database?" level={2}>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Why do 90% of the world's applications still use relational databases after 50 years?
        </p>
        <p>
          From your bank account to your favorite social media platform, from hospital medical records to airline reservations, 
          from e-commerce transactions to streaming services - relational databases power the infrastructure of modern life. 
          Despite the emergence of NoSQL alternatives, relational databases remain the dominant choice for mission-critical 
          applications that require data consistency, complex relationships, and transactional guarantees.
        </p>
        <p className="mt-3">
          At its core, a <strong>relational database</strong> is a type of database that stores and provides 
          access to data points that are <em>related</em> to one another. Its primary objective is to organize 
          structured information in a way that makes it easy to see and understand how different pieces of 
          data connect, forming a logical, intuitive representation of information.
        </p>

        <Callout type="success" title="Historical Note: The Birth of Relational Databases">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              The relational model was invented by{' '}
              <a 
                href="https://en.wikipedia.org/wiki/Edgar_F._Codd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Edgar F. Codd
              </a>, a British computer scientist 
              working at IBM's San Jose Research Laboratory. In 1970, he published a groundbreaking paper titled{' '}
              <a 
                href="https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                "A Relational Model of Data for Large Shared Data Banks"
              </a>{' '}
              that revolutionized how we think about data storage. 
              Before Codd's work, databases were rigid and hierarchical, requiring programmers to know the physical 
              structure of data. Codd's relational model introduced the idea of organizing data into simple tables 
              that could be queried without knowing how the data was physically stored - a concept so powerful it 
              remains the foundation of database systems over 50 years later!
            </div>
            <div className="text-center flex-shrink-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/5/58/Edgar_F_Codd.jpg" 
                alt="Edgar F. Codd"
                className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
              />
              <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">Edgar F. Codd</p>
            </div>
          </div>
        </Callout>

        <Subsection title="Continuous Case Study: Corporate Financial Filings">
          <p>
            Throughout this guide, we will build and query a database designed to solve a common business problem: 
            <strong> tracking and comparing the financial performance of public companies.</strong>
          </p>
          <p>
            Imagine an investment firm that needs to analyze quarterly and annual financial reports (like 10-K filings). 
            The raw data is vast and interconnected. A company like Apple Inc. belongs to the 'Technology' sector. 
            It files multiple financial statements over the years. Each statement contains dozens of line items, 
            such as 'Revenue', 'Net Income', and 'Operating Expenses'.
          </p>
        </Subsection>

        <Subsection title="The Building Blocks: Tables, Rows, and Columns">
          <p>The relational model is built upon a few simple, yet powerful, components:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Table (Relation):</strong> A table is the fundamental structure for storing data. 
              It is a collection of related data organized into a two-dimensional grid of columns and rows.
            </li>
            <li>
              <strong>Row (Tuple):</strong> A row represents a single, individual record or entity within a table. 
              Each row in the Companies table would represent one specific company, like 'Apple Inc.' or 'Microsoft Corp.'.
            </li>
            <li>
              <strong>Column (Attribute):</strong> A column represents a specific property or characteristic of the entity 
              that the table describes. Each column holds a single type of information for all rows in the table.
            </li>
          </ul>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            These three components work together to create the relational model's elegant structure. Let's visualize how they interact:
          </p>

          <MermaidDiagram
            caption="The Relational Model Structure: Tables contain rows (individual records) and columns (attributes). Each intersection of a row and column contains a single data value, creating the familiar grid structure."
            chart={`
flowchart TB
    DB[("Relational Database")]
    
    DB ==> T1["📊 Table: COMPANIES"]
    DB ==> T2["📊 Table: SECTORS"]
    DB ==> T3["📊 Table: STATEMENTS"]
    
    T1 --> R["Rows (Records)<br/>Each row = one entity"]
    T1 --> C["Columns (Attributes)<br/>Each column = one property"]
    
    R -.-> D1["Row 1: Apple Inc."]
    R -.-> D2["Row 2: Microsoft"]
    R -.-> D3["Row 3: Google"]
    
    C -.-> A1["CompanyID"]
    C -.-> A2["CompanyName"]
    C -.-> A3["Founded"]
            `}
          />

          <Callout type="info" title="Schema vs Instance: Blueprint vs Building">
            It's crucial to distinguish between the <strong>structure</strong> of a database and the <strong>data</strong> it holds:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Schema (Structure):</strong> The blueprint defining table names, column names, data types, and constraints. The schema is relatively stable and doesn't contain actual data.</li>
              <li><strong>Instance (Data):</strong> A snapshot of the actual data stored in the database at a specific moment. The instance is dynamic and changes constantly as data is added, updated, or deleted.</li>
            </ul>
          </Callout>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            {/* Left: Table with Data */}
            <div>
              <div className="h-[320px] flex justify-center items-center p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-auto">
                <table className="text-xs border-collapse w-auto">
                  <thead>
                    <tr>
                      <th className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 px-3 py-2 whitespace-nowrap">
                        CompanyID <span className="text-xs font-normal text-blue-700 dark:text-blue-300">(PK)</span>
                      </th>
                      <th className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 px-3 py-2 whitespace-nowrap">
                        CompanyName
                      </th>
                      <th className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 px-3 py-2 whitespace-nowrap">
                        StockTicker
                      </th>
                      <th className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 px-3 py-2 whitespace-nowrap">
                        SectorID <span className="text-xs font-normal text-blue-700 dark:text-blue-300">(FK)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">101</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Apple Inc.</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">AAPL</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">1</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">102</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Microsoft Corp.</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">MSFT</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">1</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">103</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">JPMorgan Chase</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">JPM</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">2</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-850">
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">104</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Goldman Sachs</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">GS</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-center">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Instance (The Data):</p>
                <p className="leading-relaxed">
                  This shows the actual table with real data values. Each row is a company record (Apple, Microsoft, JPMorgan, Goldman Sachs). 
                  The <strong>cardinality is 4</strong> (we have 4 rows currently), and the <strong>degree is 4</strong> (CompanyID, 
                  CompanyName, StockTicker, SectorID). This data changes constantly as companies are added, updated, or removed.
                </p>
              </div>
            </div>

            {/* Right: ERD Schema */}
            <div>
              <div className="h-[320px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center">
                <InlineMermaid chart={`erDiagram
    COMPANIES {
        int CompanyID PK
        varchar CompanyName
        varchar StockTicker
        int SectorID FK
    }`} />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Schema (The Structure):</p>
                <p className="leading-relaxed">
                  This defines the table's structure without any actual data. It specifies the column names (CompanyID, CompanyName, etc.), 
                  their data types (int, varchar), and constraints. The PK and FK labels indicate Primary Keys and Foreign Keys - 
                  don't worry, we'll explain what these mean in the next section! The schema remains relatively 
                  stable even as millions of rows are added to the table.
                </p>
              </div>
            </div>
          </div>

          <Callout type="info" title="Key Terminology">
            <ul className="space-y-2">
              <li><strong>Degree:</strong> The number of columns (attributes). The Companies table has a degree of 4.</li>
              <li><strong>Cardinality:</strong> The number of rows (tuples). The example shows 3 rows, but this changes as data is added/removed.</li>
              <li><strong>Primary Key (PK):</strong> Uniquely identifies each row.</li>
              <li><strong>Foreign Key (FK):</strong> References another table's primary key.</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="Your First SQL Query: Exploring Tables">
          <p>
            Now that you understand what tables, rows, and columns are, let's explore them using <strong>SQL</strong> 
            (Structured Query Language) - the language used to communicate with relational databases.
          </p>

          <Callout type="success" title="Historical Note: The Origins of SQL">
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                SQL was developed at IBM in the early 1970s by{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Donald_D._Chamberlin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Donald Chamberlin
                </a>{' '}
                and{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Raymond_F._Boyce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Raymond Boyce
                </a>, 
                building on E.F. Codd's relational model. It was originally called{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/SQL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  SEQUEL
                </a>{' '}
            (Structured English Query Language), designed to be so intuitive that non-programmers could use it. The name was 
            later shortened to SQL due to trademark conflicts. First commercialized by Oracle Corporation in 1979 and IBM in 1981, 
            SQL became an ANSI standard in 1986 and an ISO standard in 1987. Today, it's one of the most enduring programming 
            languages - the syntax you'll learn here has remained remarkably consistent for over 40 years!
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <div className="text-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/62/Don_Chamberlin_%28cropped%29.jpg" 
                    alt="Donald Chamberlin"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">D. Chamberlin</p>
                </div>
                <div className="text-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Raymond_F_Boyce_age_25.png" 
                    alt="Raymond Boyce"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">R. Boyce</p>
                </div>
              </div>
            </div>
          </Callout>

          <p className="mt-3">
            The most fundamental SQL command is <code>SELECT</code>, which retrieves data from a table. 
            The basic syntax is:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-3 my-3 font-mono text-sm">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">SELECT</span> 
            <span className="text-gray-700 dark:text-gray-300"> column1, column2, ... </span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">FROM</span>
            <span className="text-gray-700 dark:text-gray-300"> table_name</span>
            <span className="text-gray-500 dark:text-gray-500">;</span>
          </div>

          <p className="mt-3">
            The <code>*</code> (asterisk) is a wildcard meaning "all columns". So <code>SELECT * FROM Companies</code> means 
            "retrieve all columns from the Companies table."
          </p>

          <p className="mt-3">
            <strong>SQL Comments:</strong> You'll notice lines starting with <code>--</code> (double dashes) in our queries. 
            These are comments - notes for humans that the database ignores when executing the query. Comments are useful for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Explaining what a query does</li>
            <li>Adding context or instructions</li>
            <li>Temporarily disabling parts of a query (useful when testing)</li>
          </ul>
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-3 my-3 font-mono text-sm">
            <span className="text-green-600 dark:text-green-400">-- This is a comment - the database ignores this line</span><br/>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">SELECT</span>
            <span className="text-gray-700 dark:text-gray-300"> * </span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">FROM</span>
            <span className="text-gray-700 dark:text-gray-300"> Companies</span>
            <span className="text-gray-500 dark:text-gray-500">;</span>
            <span className="text-green-600 dark:text-green-400"> -- This is also a comment</span>
          </div>

          <Callout type="tip" title="About the Interactive Playgrounds">
            Throughout this course, you'll see interactive SQL playgrounds like the one below. Here's how to use them:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Execute button:</strong> Runs the SQL query and displays results below</li>
              <li><strong>Schema button:</strong> Shows the database structure (what tables and columns exist)</li>
              <li><strong>Reset button:</strong> Restores the database to its initial state if you've modified data</li>
              <li><strong>Keyboard shortcut:</strong> Press Ctrl+Enter (Cmd+Enter on Mac) to execute the query</li>
            </ul>
            Feel free to modify queries and experiment - you can't break anything! Each playground has its own isolated database.
          </Callout>

          <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
            Try it yourself:
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Explore the Companies table
SELECT * FROM Companies;`}
          />

          <p className="mt-4">
            <strong>Experiment further:</strong> Try modifying the query above to explore different tables in our financial database. 
            For example:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li><code>SELECT * FROM Sectors;</code> - See all business sectors</li>
            <li><code>SELECT CompanyName, StockTicker FROM Companies;</code> - Get only specific columns</li>
            <li>Click the <strong>Schema</strong> button to see what other tables are available</li>
          </ul>
        </Subsection>

        <Subsection title="Key Terminology: Degree and Cardinality">
          <p>In formal relational terminology, the dimensions of a table are described with specific terms:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Degree:</strong> The degree of a table is the number of columns (attributes) it contains. 
              A Companies table with columns for CompanyID, CompanyName, and StockTicker has a degree of 3.
            </li>
            <li>
              <strong>Cardinality:</strong> The cardinality of a table is the number of rows (tuples) it contains. 
              If the Companies table has records for 5 companies, its cardinality is 5.
            </li>
          </ul>

          <p className="mt-4">
            Let's use SQL to check these dimensions. This query introduces a few new SQL concepts:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3 space-y-3">
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">COUNT(*)</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                An aggregate function that counts the number of rows. The{' '}
                <code>*</code> means "count all rows."
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">AS</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Creates an alias (a temporary name) for a column in the results.{' '}
                <code>COUNT(*) as cardinality</code> means 
                "display the count result with the column name 'cardinality'."
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">LIMIT</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Restricts the number of rows returned.{' '}
                <code>LIMIT 1</code> means "only return the first row." 
                This is useful when you just want to see the structure without retrieving all data.
              </p>
            </div>
          </div>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Check the degree and cardinality
-- Cardinality: count the rows
SELECT COUNT(*) as cardinality FROM Companies;

-- The degree is the number of columns returned
SELECT * FROM Companies LIMIT 1;`}
          />

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Try running each query separately to see the results. The first query shows the cardinality (row count), 
            and the second shows the degree (number of columns in the result).
          </p>
        </Subsection>
      </Section>

      <Section id="section2" title="Keys to the Kingdom - Establishing Identity and Relationships" level={2}>
        <p>
          For the relational model to function, there must be a way to uniquely identify every single record 
          and a mechanism to link records from one table to another. This is accomplished through the use of <strong>keys</strong>.
        </p>

        <p className="mt-4">
          In database terminology, a <strong>key</strong> is one or more columns whose values can be used to identify 
          rows in a table. Think of keys as the addressing system of your database - just as your home address uniquely 
          identifies where you live, a key uniquely identifies a specific record in a table. But keys serve an even more 
          powerful purpose: they also create the connections between tables that make the data truly "relational."
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          {/* Role 1: Unique Identification */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 text-center">
              Role 1: Unique Identification
            </h4>
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
              <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 rounded-lg p-4 w-full max-w-xs text-center">
                <div className="font-bold text-green-900 dark:text-green-100 text-lg">Primary Key</div>
                <div className="text-sm text-green-800 dark:text-green-200 mt-1">CompanyID</div>
              </div>
              <div className="text-center text-gray-600 dark:text-gray-400">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-sm mt-2 font-medium">Uniquely identifies each row</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 w-full max-w-xs text-center">
                <div className="font-semibold text-gray-900 dark:text-white mb-2">Each Company Has Unique ID</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <div>Apple → 101</div>
                  <div>Microsoft → 102</div>
                  <div>NVIDIA → 103</div>
                </div>
              </div>
            </div>
          </div>

          {/* Role 2: Creating Relationships */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 text-center">
              Role 2: Creating Relationships
            </h4>
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
              <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-600 rounded-lg p-4 w-full max-w-xs text-center">
                <div className="font-bold text-blue-900 dark:text-blue-100 text-lg">Foreign Key</div>
                <div className="text-sm text-blue-800 dark:text-blue-200 mt-1">SectorID</div>
              </div>
              <div className="text-center text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center gap-3">
                  <div className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 font-medium">
                    Companies
                  </div>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 font-medium">
                    Sectors
                  </div>
                </div>
                <p className="text-sm mt-3 font-medium">Links tables together</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 w-full max-w-xs text-center">
                <div className="font-semibold text-gray-900 dark:text-white mb-2">SectorID Creates Connection</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <div>Apple (SectorID: 1) → Technology</div>
                  <div>JPMorgan (SectorID: 2) → Finance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 -mt-4 max-w-4xl mx-auto">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Understanding This Diagram:</p>
          <p className="leading-relaxed">
            <strong>On the left side,</strong> you see how a <span className="text-green-600 dark:text-green-400 font-semibold">Primary Key</span> (CompanyID) 
            uniquely identifies each row in the Companies table. Each company gets a unique ID number (101, 102, 103), ensuring no two companies 
            can be confused with each other. <strong>On the right side,</strong> you see how a <span className="text-blue-600 dark:text-blue-400 font-semibold">Foreign Key</span> (SectorID) 
            creates relationships between tables. The SectorID in the Companies table references a sector in the Sectors table, linking Apple 
            to Technology (ID: 1) and JPMorgan to Finance (ID: 2). This is what makes databases "relational" - tables can refer to each other!
          </p>
        </div>

        <p className="mt-4">
          There are several types of keys, each serving a specific purpose in database design. At first glance, the terminology 
          might seem overwhelming - Super Keys, Candidate Keys, Primary Keys, Foreign Keys, and more. <strong>Don't worry!</strong> We'll explain 
          each one in detail throughout this section. For now, here's a comprehensive overview to give you the big picture:
        </p>

        <div className="my-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Key Type</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Definition</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Example</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">Unique?</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">NULL OK?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Super Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Any set of columns that uniquely identifies a row</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">&#123;CompanyID, CompanyName&#125;</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-amber-50 dark:bg-amber-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-amber-900 dark:text-amber-200">Candidate Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Minimal super key (no redundant columns)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">CompanyID OR StockTicker</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-green-900 dark:text-green-200">Primary Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">THE chosen candidate key for the table</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">CompanyID</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-yellow-50 dark:bg-yellow-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-yellow-900 dark:text-yellow-200">Alternate Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Candidate keys NOT chosen as primary</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">StockTicker (if CompanyID is PK)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-blue-900 dark:text-blue-200">Foreign Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">References another table's primary key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">SectorID (in Companies table)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Composite Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Key made of 2+ columns combined</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">&#123;StudentID, ClassID&#125;</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-indigo-50 dark:bg-indigo-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-indigo-900 dark:text-indigo-200">Natural Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Has real-world business meaning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">email, StockTicker, ISBN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
                <tr className="bg-purple-50 dark:bg-purple-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-purple-900 dark:text-purple-200">Surrogate Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Artificial ID with no business meaning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">Auto-increment ID, UUID</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✓</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic text-center">
            The hierarchy: Super Key → Candidate Key → Primary Key (chosen) or Alternate Key (not chosen)
          </p>
        </div>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          Understanding how these key types relate to each other is crucial. Here's a visual representation of the key hierarchy and their roles:
        </p>

        <MermaidDiagram
          caption="Key Types and Their Relationships: Primary keys uniquely identify rows within a table, while foreign keys create relationships between tables by referencing primary keys in other tables."
          chart={`
flowchart LR
    subgraph Table1["COMPANIES Table"]
        PK1["🔑 CompanyID<br/>(PRIMARY KEY)"]
        NK1["StockTicker<br/>(NATURAL KEY)"]
        FK1["SectorID<br/>(FOREIGN KEY)"]
    end
    
    subgraph Table2["SECTORS Table"]
        PK2["🔑 SectorID<br/>(PRIMARY KEY)"]
        NK2["SectorName"]
    end
    
    FK1 -.->|"References"| PK2
    
    PK1 --> R1["Uniquely identifies<br/>each company"]
    NK1 --> R2["Business identifier<br/>(e.g., 'AAPL')"]
    FK1 --> R3["Links to<br/>Sectors table"]
          `}
        />

        <Subsection title="The Primary Key (PK): A Unique Identifier">
          <p>
            A <strong>primary key</strong> is a column, or a set of columns, that contains values that uniquely 
            identify each row in a table. By definition, a primary key column cannot contain NULL (empty) values, 
            and every value within it must be unique across all rows in the table.
          </p>
          
          <Callout type="tip" title="Analogy: Real-World Identifiers">
            The role of a primary key is analogous to a Social Security Number for a U.S. citizen, 
            a Vehicle Identification Number (VIN) for a car, or an ISBN for a book. Its sole purpose 
            is to provide an unambiguous, stable identity for a single record.
          </Callout>

          <p className="mt-4">
            Let's see how primary keys work in practice. This query demonstrates using a primary key to retrieve a specific record:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3">
            <code className="text-cyan-600 dark:text-cyan-400 font-semibold">WHERE</code>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              The <strong>WHERE clause</strong> is one of the most important parts of SQL - it filters rows based on conditions. 
              Only rows that meet the condition are included in the result. In this example,{' '}
              <code>WHERE CompanyID = 101</code> means 
              "only return rows where the CompanyID column equals 101." Since CompanyID is a primary key, this will return exactly 
              one row (the company with ID 101). Think of WHERE as asking "which rows?" - it's how you search and filter data.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              <strong>Common operators:</strong> <code>=</code> (equals),{' '}
              <code>&lt;&gt;</code> (not equals),{' '}
              <code>&gt;</code> (greater than),{' '}
              <code>&lt;</code> (less than),{' '}
              <code>&gt;=</code>,{' '}
              <code>&lt;=</code>
            </p>
          </div>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Using a primary key to find a specific record
-- The WHERE clause filters rows based on the primary key
SELECT 
  CompanyID,      -- The unique identifier
  CompanyName,    -- Company's legal name
  StockTicker     -- Stock symbol
FROM Companies
WHERE CompanyID = 101;  -- Finds exactly ONE company

-- Try changing 101 to 102, 103, 104, etc.
-- Each CompanyID returns exactly one company!`}
          />

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Try changing <code>101</code> to <code>102</code> or <code>103</code> to retrieve different companies. 
            Because CompanyID is a primary key, each value will return exactly one unique company.
          </p>
        </Subsection>

        <Subsection title="The Foreign Key (FK): The Bridge Between Tables">
          <p>
            A <strong>foreign key</strong> is a column in one table whose values correspond to the values of 
            the primary key in another table. It is the fundamental mechanism that creates the "relation" in 
            a relational database, acting as a logical pointer from one table to another.
          </p>

          <p className="mt-3">
            To see foreign keys in action, we need to query data from <em>multiple related tables</em>. This requires 
            some new SQL syntax that we'll explore in detail in later sections, but let's introduce the basics now:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3 space-y-3">
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">Table Aliases (c, s)</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                When working with multiple tables, we use short aliases to make queries more readable.{' '}
                <code>FROM Companies c</code> means "call the Companies table 'c' in this query." Then we can write{' '}
                <code>c.CompanyName</code> instead of <code>Companies.CompanyName</code>. Think of it as a nickname for the table.
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">JOIN</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                The <strong>JOIN clause</strong> combines rows from two or more tables based on a related column.{' '}
                <code>JOIN Sectors s</code> means "combine the Companies table with the Sectors table, and call Sectors 's'." 
                This is how we retrieve data that spans multiple tables.
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">ON</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                The <strong>ON clause</strong> specifies the condition for joining tables - which columns should match.{' '}
                <code>ON c.SectorID = s.SectorID</code> means "match rows where the SectorID in Companies equals the SectorID 
                in Sectors." This is the foreign key relationship in action - connecting companies to their sectors!
              </p>
            </div>
          </div>

          <p className="mt-3">
            In the query below, we're combining the Companies table with the Sectors table to show each company alongside 
            its sector name. The foreign key (SectorID) is what makes this connection possible:
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Using foreign keys to JOIN related tables
-- This combines data from Companies and Sectors tables

SELECT 
  c.CompanyName,    -- From Companies table
  c.StockTicker,    -- From Companies table
  s.SectorName      -- From Sectors table (related via foreign key!)
FROM Companies c           -- Main table (alias "c")
JOIN Sectors s             -- Related table (alias "s")
  ON c.SectorID = s.SectorID;  -- Match condition: foreign key = primary key

-- The JOIN connects rows where the SectorID values match
-- Result: Each company row gets its sector name added

-- Try: Click the Schema button to see both tables
-- Notice: Companies.SectorID references Sectors.SectorID`}
          />

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Notice how we can now display the sector name (from the Sectors table) alongside each company (from the Companies table). 
            The foreign key SectorID creates this bridge between the two tables. We'll dive much deeper into JOINs in Part III!
          </p>
        </Subsection>

        <Subsection title="Natural vs. Surrogate Keys: A Critical Design Decision">
          <p>
            When choosing a primary key for a table, database designers face a fundamental decision: should we use 
            a <strong>natural key</strong> or a <strong>surrogate key</strong>?
          </p>

          <p className="mt-3">
            A <strong>natural key</strong> is a column (or set of columns) that already exists in your data and has 
            real-world business meaning. It "naturally" arises from the domain you're modeling. For example, when designing 
            a Users table, the email address seems like a perfect primary key - it's already there, it's unique to each user, 
            and it has meaning. Similarly, a stock ticker symbol (like "AAPL" for Apple) or an ISBN for books are natural 
            keys because they're part of the real-world entity itself.
          </p>

          <p className="mt-3">
            However, <strong>natural keys come with significant problems:</strong>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>They can change.</strong> A user might change their email address. A company might change its stock ticker 
              if it moves to a different exchange. When a primary key changes, you must update that value everywhere it's 
              referenced as a foreign key - a risky and expensive operation.
            </li>
            <li>
              <strong>They might not always be unique.</strong> What seems unique today (like a Social Security Number) might 
              have edge cases or exceptions you didn't anticipate.
            </li>
            <li>
              <strong>They might be sensitive or complex.</strong> Using an email as a key means it appears throughout your 
              database, potentially creating privacy or data management issues.
            </li>
            <li>
              <strong>They might not exist yet.</strong> When designing a new system, you might not have determined what the 
              "natural" identifier should be, causing analysis paralysis.
            </li>
          </ul>

          <p className="mt-4">
            A <strong>surrogate key</strong>, by contrast, is an artificial identifier created solely to serve as the 
            primary key. It has no business meaning - it's just a unique number assigned by the database (like an 
            auto-incrementing integer: 1, 2, 3...). While this might seem less intuitive, surrogate keys are <em>stable</em> 
            and <em>permanent</em>. Once a company is assigned CompanyID = 123, that ID never changes, even if the company 
            changes its name, ticker symbol, or any other attribute.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Type</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Description</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Example</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Pros</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Cons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-amber-50 dark:bg-amber-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-amber-900 dark:text-amber-200">Natural Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Key from existing attributes with real-world meaning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">Email, StockTicker, ISBN, SSN</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Meaningful, already exists, intuitive</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-red-700 dark:text-red-400">Can change, cascading updates, privacy concerns</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/20">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-green-900 dark:text-green-200">Surrogate Key</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Artificial key with no business meaning</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-xs">Auto-increment ID, UUID, GUID</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-green-700 dark:text-green-400">Never changes, simple, efficient, stable</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">No inherent meaning, requires lookup</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="Real-World Example: The Email Address Problem">
            Imagine using email as a primary key in a Users table. User 12345 has email "john@gmail.com" which is referenced 
            throughout your database - in Orders, Reviews, Favorites, etc. One day, John changes his email to "john.smith@proton.me". 
            Now you must update his email in potentially hundreds or thousands of foreign key references across multiple tables. 
            Miss one, and you have data integrity issues. With a surrogate key (UserID = 12345), John's email can change freely 
            in one place, while all relationships remain stable.
          </Callout>

          <p className="mt-4">
            <strong>The Best Practice:</strong> Use <strong>surrogate keys</strong> (like CompanyID) as primary keys for 
            internal database relationships. This ensures stability and efficiency. However, you should <em>still</em> enforce 
            uniqueness on natural keys using a <code>UNIQUE</code> constraint. For example, CompanyID is the primary key, 
            but StockTicker has a UNIQUE constraint to prevent duplicate ticker symbols. This gives you the best of both worlds: 
            stable internal references (surrogate) and business rule enforcement (natural with UNIQUE). We'll explore constraints 
            like UNIQUE, NOT NULL, and CHECK in depth in{' '}
            <a 
              href="#section5" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Part II: Data Integrity
            </a>.
          </p>
        </Subsection>

        <Subsection title="Common Misconceptions About Keys">
          <p>
            Before moving forward, let's address some common misconceptions that often confuse beginners:
          </p>

          <Callout type="warning" title="Myths vs Reality">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-200">Myth: "Primary keys must be integers"</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Reality:</strong> Primary keys can be any data type (text, UUID, composite). However, simple integers are 
                  preferred because they're compact, efficient for indexing, and fast for joins.
                </p>
              </div>
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-200">Myth: "You can never change a primary key value"</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Reality:</strong> You CAN change them, but it triggers cascading updates to all foreign key references - 
                  a risky, expensive operation. This is precisely why surrogate keys (which never need to change) are best practice.
                </p>
              </div>
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-200">Myth: "Foreign key constraints are optional - they just slow things down"</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Reality:</strong> While technically optional, foreign key constraints are essential for data integrity in 
                  production systems. The slight performance cost is vastly outweighed by the protection against orphaned records and 
                  referential integrity violations. Never skip them in real applications. We'll cover constraints and referential integrity 
                  in detail in{' '}
                  <a 
                    href="#section5" 
                    className="text-amber-800 dark:text-amber-200 hover:underline font-semibold"
                  >
                    Part II
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-200">Myth: "Every table needs an auto-increment ID"</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Reality:</strong> Junction tables often use composite keys (two foreign keys combined). Pure lookup tables 
                  might use natural keys. The "always use auto-increment ID" rule is a good default, but not universal.
                </p>
              </div>
            </div>
          </Callout>
        </Subsection>
      </Section>

      <Section id="section3" title="Modeling the Real World - Entities and Relationships" level={2}>
        <p>
          Data modeling is the intellectual process of translating real-world business requirements—such as 
          companies, sectors, and financial statements—into the formal structure of a relational database schema.
        </p>

        <Subsection title="Entity-Relationship Diagrams (ERDs)">
          <p>
            An <strong>Entity-Relationship Diagram (ERD)</strong> is a visual blueprint that represents the structure of a database. 
            It's one of the most important tools in database design, allowing designers, developers, and business stakeholders to 
            communicate about data structures without writing code.
          </p>

          <Callout type="success" title="Historical Note: The Birth of ERDs">
            <div className="flex gap-4 items-start mb-0">
              <div className="flex-1 mb-0">
                Entity-Relationship diagrams were invented by{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Peter_Chen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Peter Chen
                </a>, a computer scientist at MIT, in his 1976 paper{' '}
                <a 
                  href="https://dl.acm.org/doi/10.1145/320434.320440" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  "The Entity-Relationship Model: Toward a Unified View of Data"
                </a>. 
                Chen's notation provided a simple, intuitive way to model data that could be understood by both technical and 
                non-technical audiences. Today, ERDs remain the standard tool for database design, with various notations 
                including Chen's original, crow's foot (which we use here), and UML-style diagrams.
              </div>
              <div className="text-center flex-shrink-0">
                <img 
                  src="https://technologytransfer.it/wp-content/uploads/Peter_Chen.jpg" 
                  alt="Peter Chen"
                  className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                />
                <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">Peter Chen</p>
              </div>
            </div>
          </Callout>

          <p className="mt-4">
            An ERD consists of three main building blocks. Let's start with the simplest: a <strong>single entity</strong>.
          </p>

          <MermaidDiagram
            caption="Reading a Single Entity Diagram: The entity name (COMPANY) appears at the top of the box in bold. Each line inside represents an attribute (column) with three parts: the data type (int, varchar, date), the attribute name (CompanyID, CompanyName), and any constraints (PK for Primary Key). The optional notes on the right explain each attribute's purpose. This entity has 4 attributes, and CompanyID is marked as the primary key."
            chart={`
erDiagram
    COMPANY {
        int CompanyID PK "Primary Key - Unique ID"
        varchar CompanyName "Company's legal name"
        varchar StockTicker "Stock symbol"
        date Founded "When company was established"
    }
            `}
          />

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r my-4">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">The Three Components of ERDs:</p>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li><strong>Entities:</strong> The "things" we store data about (Company, Sector, Financial Statement). Drawn as rectangles/boxes.</li>
              <li><strong>Attributes:</strong> The properties or characteristics of entities (CompanyID, CompanyName, StockTicker). Listed inside the entity box.</li>
              <li><strong>Relationships:</strong> How entities connect to each other (a Company "belongs to" a Sector). Drawn as lines between entities.</li>
            </ul>
          </div>

          <Callout type="info" title="Why Diagrams as Code Matter in Modern Development">
            Entity-Relationship Diagrams in this course use <strong>Mermaid syntax</strong> - a text-based diagramming language. 
            This represents a powerful philosophy: <strong>diagrams as code</strong>. Instead of creating diagrams in visual tools 
            that produce binary files, we express them as text that can be:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Version controlled:</strong> Track changes in Git, see who modified what, and when</li>
              <li><strong>Code-reviewed:</strong> Review diagrams in pull requests alongside code changes</li>
              <li><strong>AI-assisted:</strong> AI can read, generate, and modify Mermaid ERDs directly</li>
              <li><strong>Automated:</strong> Generate diagrams from database schemas or vice versa</li>
              <li><strong>Collaborative:</strong> No proprietary tools needed - just a text editor</li>
            </ul>
            <p className="mt-2">
              This "diagrams as code" approach - treating visual models as text that lives alongside your codebase - is 
              essential for modern, collaborative, AI-augmented development workflows. You'll see this principle in action 
              throughout this course.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="Reading ERD Notation: Understanding Crow's Foot">
          <p>
            ERDs use symbols to show <strong>cardinality</strong> - how many instances of one entity can be related to instances 
            of another. We use <strong>crow's foot notation</strong>, which gets its name from the symbol that resembles a bird's foot.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-6 my-6">
            <p className="font-semibold text-gray-900 dark:text-white mb-4">Crow's Foot Symbols Reference:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  Cardinality Markers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">||</code>
                    <span className="text-gray-700 dark:text-gray-300">Exactly one (required)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">|o</code>
                    <span className="text-gray-700 dark:text-gray-300">Zero or one (optional)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">|&#123;</code>
                    <span className="text-gray-700 dark:text-gray-300">One or more (required, many)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">o&#123;</code>
                    <span className="text-gray-700 dark:text-gray-300">Zero or more (optional, many)</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-300 dark:border-slate-700">
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  Line Types:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">--</code>
                    <span className="text-gray-700 dark:text-gray-300">Identifying relationship (solid line) - child cannot exist without parent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded">..</code>
                    <span className="text-gray-700 dark:text-gray-300">Non-identifying relationship (dashed line) - child can exist independently</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-300 dark:border-slate-700">
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Examples:</p>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                  <div>
                    <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">COMPANY ||--o&#123; ORDER</code>
                    <br />
                    <span className="ml-1">One company has zero or more orders (identifying)</span>
                  </div>
                  <div>
                    <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">PERSON &#125;o..o&#123; ADDRESS</code>
                    <br />
                    <span className="ml-1">A person can have zero or more addresses (non-identifying)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-300 dark:border-slate-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Learn more:{' '}
                  <a 
                    href="https://docs.mermaidchart.com/mermaid-oss/syntax/entityRelationshipDiagram.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mermaid ERD Documentation
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4">
            Now let's see the three fundamental relationship types in action:
          </p>

          <MermaidDiagram
            caption="The Three Core Relationship Types: (Top) One-to-One (||--||): PERSON to PASSPORT - each person has exactly one passport, and each passport belongs to exactly one person. Notice the UNIQUE constraint on PersonID in PASSPORT enforces this. (Middle) One-to-Many (||--o{): COMPANY to ORDER - one company can have zero or more orders, but each order belongs to exactly one company. The || on the company side means 'exactly one' and o{ on the order side means 'zero or more.' (Bottom) Many-to-Many (}o--o{): STUDENT to COURSE - students can take multiple courses, and courses can have multiple students. The }o and o{ symbols both indicate 'zero or more.' This type requires a junction table to implement (not shown here, but explained next)."
            chart={`
erDiagram
    PERSON ||--|| PASSPORT : "1:1 One-to-One"
    COMPANY ||--o{ ORDER : "1:N One-to-Many"
    STUDENT }o--o{ COURSE : "M:N Many-to-Many"
    
    PERSON {
        int PersonID PK
        varchar Name
    }
    PASSPORT {
        int PassportID PK
        int PersonID FK "UNIQUE"
    }
    
    COMPANY {
        int CompanyID PK
        varchar CompanyName
    }
    ORDER {
        int OrderID PK
        int CompanyID FK
    }
    
    STUDENT {
        int StudentID PK
        varchar StudentName
    }
    COURSE {
        int CourseID PK
        varchar CourseName
    }
            `}
          />

          <div className="mt-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                One-to-One (1:1) <code className="text-sm">||--||</code>
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Each record in Table A relates to exactly one record in Table B, and vice versa. 
                Example: Each Person has exactly one Passport, and each Passport belongs to exactly one Person. 
                In the diagram, notice PersonID in PASSPORT has a UNIQUE constraint - this enforces the one-to-one relationship.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                One-to-Many (1:N) <code className="text-sm">||--o&#123;</code>
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The most common relationship type. One record in the "parent" table relates to zero or more records in the "child" table. 
                Example: One Company can have many Orders, but each Order belongs to exactly one Company. 
                The <code>||</code> means "exactly one company" and the <code>o&#123;</code> means "zero or more orders."
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Many-to-Many (M:N) <code className="text-sm">&#125;o--o&#123;</code>
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Multiple records in Table A can relate to multiple records in Table B. 
                Example: A Student can enroll in many Courses, and a Course can have many Students. 
                The <code>&#125;o</code> and <code>o&#123;</code> both mean "zero or more," indicating the many-to-many nature. 
                Important: This relationship requires a junction table (which we'll see in detail next).
              </p>
            </div>
          </div>
          <p className="mt-4">
            For many-to-many relationships, we need a special <strong>junction table</strong> (also called a linking table or 
            bridge table). But why? Let's understand the problem first.
          </p>

          <p className="mt-3">
            <strong>The Problem:</strong> In a relational database, relationships are created using foreign keys. But where would 
            you put the foreign key for a many-to-many relationship?
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Option 1 - Put ClassID in the STUDENTS table:</strong> Each student could only reference ONE class. 
              This breaks the "many" part - a student can't enroll in multiple classes. ❌
            </li>
            <li>
              <strong>Option 2 - Put StudentID in the CLASSES table:</strong> Each class could only reference ONE student. 
              This also breaks the "many" part - a class can't have multiple students. ❌
            </li>
            <li>
              <strong>Option 3 - Store multiple IDs in one column:</strong> Like "StudentIDs: 1,2,3,4,5" - this violates 
              First Normal Form (atomicity) and makes querying impossible. ❌
            </li>
          </ul>

          <p className="mt-4">
            <strong>The Solution:</strong> A <strong>junction table</strong> sits between the two entities and has foreign keys 
            to BOTH tables. This transforms one many-to-many (M:N) relationship into TWO one-to-many (1:N) relationships, which 
            relational databases handle perfectly!
          </p>

          <MermaidDiagram
            caption="Many-to-Many Implementation: How a Junction Table Solves the Problem"
            chart={`
erDiagram
    STUDENTS ||--o{ ENROLLMENT : "enrolls in"
    CLASSES ||--o{ ENROLLMENT : "has enrolled"
    
    STUDENTS {
        int StudentID PK
        varchar StudentName
    }
    ENROLLMENT {
        int StudentID FK
        int ClassID FK
        varchar Grade
        date EnrollmentDate
    }
    CLASSES {
        int ClassID PK
        varchar ClassName
    }
            `}
          />

          <p className="mt-4">
            Notice how the many-to-many relationship between STUDENTS and CLASSES is implemented with the ENROLLMENT junction table. 
            This table has foreign keys to both STUDENTS (StudentID) and CLASSES (ClassID), effectively creating two one-to-many 
            relationships. The junction table can also store attributes about the relationship itself, like Grade and EnrollmentDate.
          </p>

          <p className="mt-4">
            Let's query this many-to-many relationship using SQL. This query introduces one new keyword:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3">
            <code className="text-cyan-600 dark:text-cyan-400 font-semibold">ORDER BY</code>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              The <strong>ORDER BY clause</strong> sorts the results.{' '}
              <code>ORDER BY s.StudentName, c.ClassName</code> means 
              "sort the results first by student name, then by class name within each student." By default, sorting is ascending 
              (A to Z, 1 to 9). You can add{' '}
              <code>DESC</code> for descending order. Multiple columns create a hierarchical sort.
            </p>
          </div>

          <SQLPlayground
            preset={ENROLLMENT_PRESET}
            defaultQuery={`-- Querying a many-to-many relationship through a junction table
-- Pattern: Table1 → Junction Table → Table2

SELECT 
  s.StudentName,   -- From students table
  c.ClassName,     -- From classes table  
  e.Grade          -- From enrollment junction table
FROM students s                          -- Start with students
JOIN enrollment e                        -- Connect to junction table
  ON s.StudentID = e.StudentID          -- Match student IDs
JOIN classes c                           -- Connect to classes
  ON e.ClassID = c.ClassID              -- Match class IDs
ORDER BY s.StudentName, c.ClassName;    -- Sort alphabetically

-- This query "walks" across the many-to-many relationship:
-- Students → Enrollment → Classes
-- The enrollment table bridges the connection!

-- Try: Remove the ORDER BY to see unsorted results
-- Try: Add WHERE s.StudentName = 'Alice' to filter one student`}
          />

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Notice how we JOIN through the enrollment table to connect students with classes. This query crosses the 
            many-to-many relationship, showing which students are enrolled in which classes along with their grades.
          </p>
        </Subsection>

        <Subsection title="Our Complete Financial Database ERD">
          <p>
            Now that you understand entities, attributes, relationships, and crow's foot notation, here's the complete ERD for our 
            financial database case study:
          </p>

          <MermaidDiagram
            caption="Complete ERD: Our Financial Data Model with All Relationships"
            chart={`
erDiagram
    SECTORS ||--o{ COMPANIES : "contains"
    COMPANIES ||--o{ FINANCIAL_STATEMENTS : "files"
    FINANCIAL_STATEMENTS ||--o{ LINE_ITEMS : "contains"
    
    SECTORS {
        int SectorID PK
        varchar SectorName
    }
    COMPANIES {
        int CompanyID PK
        varchar CompanyName
        varchar StockTicker
        int SectorID FK
    }
    FINANCIAL_STATEMENTS {
        int StatementID PK
        int Year
        varchar ReportType
        int CompanyID FK
    }
    LINE_ITEMS {
        int LineItemID PK
        varchar ItemName
        decimal Value
        int StatementID FK
    }
            `}
          />

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-5 my-4">
            <p className="font-semibold text-gray-900 dark:text-white mb-3">How to Read This Multi-Table ERD:</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <strong>Start at the top:</strong> SECTORS is the root entity. One sector (like "Technology") contains many companies.
              </li>
              <li>
                <strong>Follow the relationships:</strong> The <code>||--o&#123;</code> symbols show "one-to-many." Read left-to-right: 
                "One SECTOR contains zero or more COMPANIES."
              </li>
              <li>
                <strong>Trace the foreign keys:</strong> COMPANIES has <code>SectorID FK</code> - this creates the link back to SECTORS. 
                The FK points to the PK in the parent table.
              </li>
              <li>
                <strong>Continue the chain:</strong> One COMPANY files many FINANCIAL_STATEMENTS (via <code>CompanyID FK</code>). 
                One FINANCIAL_STATEMENT contains many LINE_ITEMS (via <code>StatementID FK</code>).
              </li>
              <li>
                <strong>See the hierarchy:</strong> SECTORS → COMPANIES → FINANCIAL_STATEMENTS → LINE_ITEMS. This structure prevents 
                redundancy: instead of repeating "Technology" in every Apple record, we store it once and reference it.
              </li>
            </ol>
          </div>
        </Subsection>

        <Subsection title="Creating Your Own ERDs with Mermaid">
          <p>
            Now that you've learned to read ERDs, let's learn to create them! All the diagrams in this course are made with{' '}
            <a 
              href="https://mermaid.js.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Mermaid
            </a>, 
            a text-based diagramming tool that turns code into beautiful diagrams.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-3">
            Step 1: Creating a Single Entity
          </h4>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To create an ERD in Mermaid, you start with the <code>erDiagram</code> declaration, then define each entity as a block. 
            Inside the curly braces, list each attribute with its data type, attribute name, and optional constraints (like PK for Primary Key). 
            The basic syntax is: <code>datatype attributeName constraint</code>. Let's see this in action:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start my-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">The Mermaid Code:</p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1.5 border-b border-gray-300 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">mermaid</span>
                </div>
                <pre className="text-gray-900 dark:text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
{`erDiagram
    COMPANY {
        int CompanyID PK
        varchar CompanyName
        varchar StockTicker
    }`}
                </pre>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Creates This Diagram:</p>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <InlineMermaid chart={`erDiagram
    COMPANY {
        int CompanyID PK
        varchar CompanyName
        varchar StockTicker
    }`} />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Start with <code>erDiagram</code>, then define each entity with its attributes and data types.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-3">
            Step 2: Adding Relationships
          </h4>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To connect entities with relationships, add a relationship line before the entity definitions. The syntax is:{' '}
            <code>ENTITY1 relationship_type ENTITY2 : "verb phrase"</code>. The relationship type uses crow's foot notation 
            (like <code>||--o&#123;</code> for one-to-many). The verb phrase in quotes describes the relationship in plain English. 
            Then define both entities with their attributes, including the foreign key in the child entity:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start my-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">The Mermaid Code:</p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1.5 border-b border-gray-300 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">mermaid</span>
                </div>
                <pre className="text-gray-900 dark:text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
{`erDiagram
    CUSTOMER ||--o{ ORDER : "places"
    
    CUSTOMER {
        int CustomerID PK
        varchar Name
    }
    ORDER {
        int OrderID PK
        int CustomerID FK
    }`}
                </pre>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Creates This Diagram:</p>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <InlineMermaid chart={`erDiagram
    CUSTOMER ||--o{ ORDER : "places"
    
    CUSTOMER {
        int CustomerID PK
        varchar Name
    }
    ORDER {
        int OrderID PK
        int CustomerID FK
    }`} />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            The first line <code>CUSTOMER ||--o&#123; ORDER : "places"</code> defines the relationship. 
            The <code>||--o&#123;</code> is the crow's foot notation showing "one-to-many," 
            and <code>"places"</code> describes the relationship in plain English.
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Beyond their readability and version control benefits, text-based ERDs have become particularly valuable in the 
            age of AI-assisted development. When working with AI coding assistants, providing a structured ERD dramatically 
            improves the quality and accuracy of generated code:
          </p>

          <Callout type="tip" title="AI-Assisted Database Design: Using ERDs to Prevent Hallucination">
            When working with AI coding assistants (GitHub Copilot, ChatGPT, Claude, Cursor), providing an ERD in Mermaid syntax 
            dramatically improves code quality and reduces errors. Here's why:
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Precision over prose:</strong> "Create a user table with posts" is ambiguous. An ERD specifies exact column names, 
              types, and relationships, leaving no room for AI misinterpretation.</li>
              <li><strong>Prevents hallucination:</strong> AI sometimes invents column names or relationships. A structured ERD acts as 
              a strict specification the AI must follow.</li>
              <li><strong>Multi-language generation:</strong> From one ERD, ask AI to generate SQL DDL, SQLAlchemy models, Prisma schemas, 
              or TypeORM entities - all guaranteed to match your design.</li>
              <li><strong>Iterative refinement:</strong> Update the ERD, regenerate code. Much faster than manually editing SQL across multiple files.</li>
            </ul>
            
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded p-3 mt-3">
              <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">Example AI Prompts:</p>
              <div className="text-xs text-green-800 dark:text-green-200 space-y-2 font-mono">
                <p>"Generate PostgreSQL CREATE TABLE statements for this ERD: [paste Mermaid code]"</p>
                <p>"Convert this Mermaid ERD to Python SQLAlchemy ORM models with all relationships"</p>
                <p>"Create a TypeScript Prisma schema from this ERD, include all constraints"</p>
              </div>
            </div>

            <p className="mt-3 text-sm">
              Experiment with{' '}
              <a 
                href="https://mermaid.live/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Mermaid's live editor
              </a>{' '}
              and see the{' '}
              <a 
                href="https://docs.mermaidchart.com/mermaid-oss/syntax/entityRelationshipDiagram.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                complete ERD syntax reference
              </a>.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="Practice: Design Your First Database">
          <p>
            Now that you understand entities, relationships, keys, and ERDs, let's put your knowledge to the test. 
            Try designing a database for this real-world scenario:
          </p>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 p-5 rounded-r my-4">
            <p className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3 text-lg">Scenario: Library Management System</p>
            <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-3">
              A public library needs a database to manage their collection and track loans. The system must handle:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-indigo-800 dark:text-indigo-300">
              <li><strong>Books:</strong> Title, ISBN (unique), publication year, number of copies</li>
              <li><strong>Authors:</strong> Name, birth year, nationality</li>
              <li><strong>Members:</strong> Name, email (unique), phone, join date</li>
              <li><strong>Loans:</strong> Track which member borrowed which book, loan date, due date, return date</li>
            </ul>
            <p className="text-sm text-indigo-800 dark:text-indigo-300 mt-3">
              <strong>Key requirements:</strong> Books can have multiple authors (many-to-many). Members can borrow multiple books. 
              The library needs to track loan history even after books are returned.
            </p>
          </div>

          <p className="mt-4">
            <strong>Think about these questions:</strong>
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li>What are the main entities?</li>
            <li>What attributes does each entity need?</li>
            <li>What should be the primary key for each entity?</li>
            <li>What relationships exist between entities?</li>
            <li>Do any relationships require a junction table?</li>
            <li>Where should foreign keys be placed?</li>
          </ul>

          <details className="mt-6 bg-green-50 dark:bg-green-950/20 border-2 border-green-400 dark:border-green-600 rounded-lg p-5">
            <summary className="font-semibold text-green-900 dark:text-green-100 cursor-pointer text-lg hover:text-green-700 dark:hover:text-green-300">
              💡 Click to Show Solution ERD
            </summary>
            <div className="mt-4">
              <MermaidDiagram
                caption="Library Database ERD Solution: This design uses 5 entities including a BOOK_AUTHORS junction table for the many-to-many relationship between books and authors"
                chart={`
erDiagram
    MEMBERS ||--o{ LOANS : "borrows"
    BOOKS ||--o{ LOANS : "borrowed in"
    AUTHORS ||--o{ BOOK_AUTHORS : "writes"
    BOOKS ||--o{ BOOK_AUTHORS : "written by"
    
    AUTHORS {
        int AuthorID PK
        varchar Name
        int BirthYear
        varchar Nationality
    }
    BOOKS {
        int BookID PK
        varchar ISBN "UNIQUE"
        varchar Title
        int PublicationYear
        int CopiesAvailable
    }
    BOOK_AUTHORS {
        int BookID FK
        int AuthorID FK
    }
    MEMBERS {
        int MemberID PK
        varchar Name
        varchar Email "UNIQUE"
        varchar Phone
        date JoinDate
    }
    LOANS {
        int LoanID PK
        int MemberID FK
        int BookID FK
        date LoanDate
        date DueDate
        date ReturnDate
    }
                `}
              />
              <div className="bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg p-4 mt-4">
                <p className="font-semibold text-green-900 dark:text-green-100 mb-2">Key Design Decisions:</p>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                  <li><strong>5 Tables:</strong> AUTHORS, BOOKS, MEMBERS, LOANS, plus BOOK_AUTHORS junction table</li>
                  <li><strong>Surrogate PKs:</strong> AuthorID, BookID, MemberID, LoanID - stable identifiers</li>
                  <li><strong>Natural key constraints:</strong> ISBN and Email marked UNIQUE to prevent duplicates</li>
                  <li><strong>Many-to-many:</strong> BOOK_AUTHORS junction table connects books with authors (one book can have 
                  multiple authors, one author can write multiple books)</li>
                  <li><strong>One-to-many:</strong> MEMBERS to LOANS (one member, many loans). BOOKS to LOANS (one book, many loans over time)</li>
                  <li><strong>Audit trail:</strong> ReturnDate in LOANS allows NULL (book not yet returned) and preserves history</li>
                </ul>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200 mt-3">
                Compare your design with this solution. There's no single "right" answer - different designs can work depending on 
                requirements. The important thing is that your design prevents data redundancy and maintains referential integrity!
              </p>
            </div>
          </details>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Congratulations!
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              You've completed Part I and learned the foundational concepts of relational databases! You now understand:
              tables, rows, columns, keys, relationships, ERDs, and how to communicate database designs using Mermaid. 
            </p>
            <p className="mt-3">
              In{' '}
              <a 
                href="#part2" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Part II: Data Integrity
              </a>, we'll explore how to ensure data quality through:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Database Normalization:</strong> Organizing data to eliminate redundancy and anomalies (1NF, 2NF, 3NF, BCNF)</li>
              <li><strong>Constraints:</strong> PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and DEFAULT</li>
              <li><strong>Data Types:</strong> Choosing the right types for your data</li>
              <li><strong>Referential Integrity:</strong> Maintaining relationships through cascading actions</li>
            </ul>
          </div>
        </Subsection>
      </Section>
    </>
  );
}

