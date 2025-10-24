import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
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
          
          <div className="space-y-3 my-4">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-300">Insertion Anomaly</h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                Cannot add a new record because unrelated data is not available. 
                Example: Can't add a new sector until at least one company exists in it.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Update Anomaly</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Same information stored in multiple rows requires updating all copies. 
                Example: Renaming 'Technology' to 'Information Technology' in every company record.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-4">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300">Deletion Anomaly</h4>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                Deleting data unintentionally causes loss of other data. 
                Example: Deleting the last company in 'Energy' sector loses the sector itself.
              </p>
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

        <Subsection title="Third Normal Form (3NF): Eliminating Transitive Dependencies">
          <p>
            A table is in <strong>Third Normal Form (3NF)</strong> if it is in 2NF and there are no transitive 
            dependencies. The rule: every non-key attribute must provide a fact about "the key, the whole key, 
            and nothing but the key."
          </p>

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
      </Section>
    </>
  );
}

