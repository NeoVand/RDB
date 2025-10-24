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
        <p>
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
                Dr. Edgar F. Codd
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
                alt="Dr. Edgar F. Codd"
                className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
              />
              <p className="text-xs mt-1 text-emerald-800 dark:text-emerald-200">Dr. Edgar F. Codd</p>
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
                later shortened to SQL due to trademark conflicts. First commercialized by{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Oracle_Database" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Oracle Corporation
                </a>{' '}
                in 1979 and IBM in 1981, SQL became an ANSI standard in 1986 and an ISO standard in 1987. Today, it's one of 
                the most enduring programming languages - the syntax you'll learn here has remained remarkably consistent for over 40 years!
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <div className="text-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/62/Don_Chamberlin_%28cropped%29.jpg" 
                    alt="Donald Chamberlin"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 text-emerald-800 dark:text-emerald-200">D. Chamberlin</p>
                </div>
                <div className="text-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Raymond_F_Boyce_age_25.png" 
                    alt="Raymond Boyce"
                    className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
                  />
                  <p className="text-xs mt-1 text-emerald-800 dark:text-emerald-200">R. Boyce</p>
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

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Check the degree and cardinality
-- Cardinality: count the rows
SELECT COUNT(*) as cardinality FROM Companies;

-- The degree is the number of columns returned
SELECT * FROM Companies LIMIT 1;`}
          />
        </Subsection>
      </Section>

      <Section id="section2" title="Keys to the Kingdom - Establishing Identity and Relationships" level={2}>
        <p>
          For the relational model to function, there must be a way to uniquely identify every single record 
          and a mechanism to link records from one table to another. This is accomplished through the use of <strong>keys</strong>.
        </p>

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

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Primary keys uniquely identify each row
SELECT CompanyID, CompanyName, StockTicker 
FROM Companies
WHERE CompanyID = 101;`}
          />
        </Subsection>

        <Subsection title="The Foreign Key (FK): The Bridge Between Tables">
          <p>
            A <strong>foreign key</strong> is a column in one table whose values correspond to the values of 
            the primary key in another table. It is the fundamental mechanism that creates the "relation" in 
            a relational database, acting as a logical pointer from one table to another.
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Foreign keys create relationships
-- Companies reference Sectors via SectorID
SELECT 
  c.CompanyName, 
  c.StockTicker, 
  s.SectorName
FROM Companies c
JOIN Sectors s ON c.SectorID = s.SectorID;`}
          />
        </Subsection>

        <Subsection title="Natural vs. Surrogate Keys">
          <div className="overflow-x-auto my-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Example</th>
                  <th>Pros</th>
                  <th>Cons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Natural Key</td>
                  <td>A key from existing attributes with real-world meaning</td>
                  <td>Email address, Stock ticker, ISBN</td>
                  <td>Meaningful, intuitive</td>
                  <td>Can change, hard to update</td>
                </tr>
                <tr>
                  <td className="font-semibold">Surrogate Key</td>
                  <td>An artificial key with no business meaning</td>
                  <td>Auto-increment ID, UUID</td>
                  <td>Stable, efficient</td>
                  <td>No inherent meaning</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Best Practice:</strong> Use surrogate keys (like CompanyID) as primary keys for internal 
            relationships, while enforcing uniqueness on natural keys (like StockTicker) with UNIQUE constraints.
          </p>
        </Subsection>
      </Section>

      <Section id="section3" title="Modeling the Real World - Entities and Relationships" level={2}>
        <p>
          Data modeling is the intellectual process of translating real-world business requirements—such as 
          companies, sectors, and financial statements—into the formal structure of a relational database schema.
        </p>

        <Subsection title="Entity-Relationship Diagrams (ERDs)">
          <p>
            An <strong>ERD</strong> is a graphical flowchart that visually represents the database schema. 
            It consists of three main components:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Entities:</strong> Principal objects (drawn as rectangles) - Company, Sector, Financial Statement</li>
            <li><strong>Attributes:</strong> Properties of entities - CompanyID, CompanyName, StockTicker</li>
            <li><strong>Relationships:</strong> Connections between entities (lines with verbs)</li>
          </ul>

          <MermaidDiagram
            caption="ERD for our Financial Data Model"
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
        </Subsection>

        <Subsection title="The Three Core Relationship Types">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">One-to-One (1:1)</h4>
              <p>A single record in one table corresponds to exactly one record in another table.</p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                Example: A Person ↔ Passport relationship
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">One-to-Many (1:N)</h4>
              <p>
                One record in a "parent" table can be linked to many records in a "child" table, 
                but each child record can only be linked to one parent record.
              </p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                Example: One Company → Many Financial Statements
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Many-to-Many (M:N)</h4>
              <p>
                Multiple records in one table can be associated with multiple records in another table. 
                This requires a <strong>junction table</strong> to implement.
              </p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                Example: Many Students ↔ Many Classes (requires Enrollment junction table)
              </p>
            </div>
          </div>

          <MermaidDiagram
            caption="Many-to-Many Relationship with Junction Table"
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

          <SQLPlayground
            preset={ENROLLMENT_PRESET}
            defaultQuery={`-- Query the many-to-many relationship
-- Show which students are in which classes
SELECT 
  s.StudentName,
  c.ClassName,
  e.Grade
FROM students s
JOIN enrollment e ON s.StudentID = e.StudentID
JOIN classes c ON e.ClassID = c.ClassID
ORDER BY s.StudentName, c.ClassName;`}
          />
        </Subsection>
      </Section>
    </>
  );
}

