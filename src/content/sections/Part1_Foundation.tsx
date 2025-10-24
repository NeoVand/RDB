import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, ENROLLMENT_PRESET } from '../../lib/database/presets';

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

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Explore the Companies table
SELECT * FROM Companies;`}
          />

          <p className="mt-4">
            Try modifying the query above to explore different tables in our financial database. 
            For example, try: <code>SELECT * FROM Sectors;</code>
          </p>
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

