import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET } from '../../lib/database/presets';

export function Part5_Ecosystem() {
  return (
    <>
      <Section id="part5" title="Part V: The Ecosystem - A Comparative Look at RDBMS" level={1}>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This final part provides a practical comparison of some of the most popular relational database 
          management systems, equipping you to make an informed choice for your projects.
        </p>
      </Section>

      <Section id="section12" title="Choosing Your Engine - A Relational Database Showdown" level={2}>
        <p>
          While all relational databases are based on the same underlying model and use SQL, they differ 
          significantly in their features, performance characteristics, and ideal use cases.
        </p>

        <Subsection title="Database Comparison">
          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MySQL</th>
                  <th>PostgreSQL</th>
                  <th>SQLite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Architecture</td>
                  <td>Client-Server</td>
                  <td>Client-Server</td>
                  <td>Serverless (embedded)</td>
                </tr>
                <tr>
                  <td className="font-semibold">Best For</td>
                  <td>Web apps, read-heavy workloads</td>
                  <td>Complex apps, data warehousing</td>
                  <td>Mobile apps, prototyping</td>
                </tr>
                <tr>
                  <td className="font-semibold">Concurrency</td>
                  <td>Good</td>
                  <td>Excellent (MVCC)</td>
                  <td>Low (file locking)</td>
                </tr>
                <tr>
                  <td className="font-semibold">SQL Compliance</td>
                  <td>Good</td>
                  <td>Excellent</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td className="font-semibold">Advanced Types</td>
                  <td>Limited (JSON)</td>
                  <td>Extensive (JSONB, arrays)</td>
                  <td>Basic</td>
                </tr>
                <tr>
                  <td className="font-semibold">Licensing</td>
                  <td>Dual (GPL/Commercial)</td>
                  <td>Permissive Open Source</td>
                  <td>Public Domain</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="MySQL">
          <p>
            <strong>Profile:</strong> One of the world's most popular open-source databases, renowned for 
            ease of use, speed, and reliability. Powers countless websites and is a cornerstone of the LAMP stack.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Strengths:</strong> Massive community, extensive documentation, fast for read-heavy workloads, simple to set up</li>
            <li><strong>Weaknesses:</strong> Less SQL-compliant than PostgreSQL, can struggle with high concurrent writes, dual licensing considerations</li>
          </ul>
        </Subsection>

        <Subsection title="PostgreSQL">
          <p>
            <strong>Profile:</strong> Widely regarded as the most advanced and feature-rich open-source 
            relational database. Known for strict SQL standards adherence, robustness, and powerful extensibility.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Strengths:</strong> Powerful query optimizer, advanced data types (JSONB, PostGIS), excellent concurrency (MVCC), permissive license</li>
            <li><strong>Weaknesses:</strong> Steeper learning curve, slightly more resource-intensive than MySQL</li>
          </ul>
        </Subsection>

        <Subsection title="SQLite">
          <p>
            <strong>Profile:</strong> A unique, serverless SQL database engine embedded as a C library. 
            The entire database is a single file on disk. This is what we're using in this course!
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Strengths:</strong> Zero configuration, portable, perfect for mobile apps and prototyping, completely free (public domain)</li>
            <li><strong>Weaknesses:</strong> Not designed for high concurrency or multi-user access, file-level locking, limited advanced features</li>
          </ul>

          <Callout type="success" title="Why SQLite for this course?">
            SQLite runs entirely in your browser via WebAssembly, making it perfect for learning 
            without any server setup. It's the same SQL syntax you'll use in production databases!
          </Callout>
        </Subsection>

        <Subsection title="The Architect's Checklist">
          <p>Choosing a database is a critical architectural decision. Consider these questions:</p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Data Model Complexity:</strong> How structured is the data? Are relationships complex?
            </li>
            <li>
              <strong>Scalability Requirements:</strong> What's the anticipated user load and data volume?
            </li>
            <li>
              <strong>Consistency Needs:</strong> Is strict ACID compliance non-negotiable?
            </li>
            <li>
              <strong>Workload Pattern:</strong> Read-heavy, write-heavy, or balanced?
            </li>
            <li>
              <strong>Operational Overhead:</strong> Team expertise? Dedicated operations team?
            </li>
            <li>
              <strong>Ecosystem & Features:</strong> Need specific features like geospatial queries, full-text search?
            </li>
          </ol>
        </Subsection>

        <Subsection title="Try It Yourself!">
          <p>
            Now that you've learned about relational databases, try writing your own queries using everything 
            you've learned:
          </p>

          <SQLPlayground
            preset={FINANCIAL_FULL_PRESET}
            defaultQuery={`-- Challenge: Write a query that finds:
-- 1. The top 3 companies by 2024 revenue
-- 2. Show their sector name and net income too

-- Your solution here:
SELECT 
  c.CompanyName,
  s.SectorName,
  MAX(CASE WHEN li.ItemName = 'Revenue' THEN li.Value END) as Revenue,
  MAX(CASE WHEN li.ItemName = 'Net Income' THEN li.Value END) as NetIncome
FROM Companies c
JOIN Sectors s ON c.SectorID = s.SectorID
JOIN Financial_Statements fs ON c.CompanyID = fs.CompanyID
JOIN Line_Items li ON fs.StatementID = li.StatementID
WHERE fs.Year = 2024
GROUP BY c.CompanyID, c.CompanyName, s.SectorName
ORDER BY Revenue DESC
LIMIT 3;`}
          />
        </Subsection>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            You've completed the comprehensive guide to relational databases and SQL! You now understand:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li>The relational model and database design principles</li>
            <li>Normalization and data integrity</li>
            <li>SQL fundamentals and advanced querying techniques</li>
            <li>ACID properties and transactions</li>
            <li>Performance optimization and architectural considerations</li>
            <li>How to choose the right database for your project</li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Keep practicing with the playgrounds above, and remember: the best way to learn SQL is by writing queries!
          </p>
        </div>
      </Section>
    </>
  );
}

