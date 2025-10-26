import { Section } from '../../components/Content/Section';
import { Subsection } from '../../components/Content/Subsection';
import { CodeExample } from '../../components/Content/CodeExample';
import { MermaidDiagram } from '../../components/Content/MermaidDiagram';
import { SQLPlayground } from '../../components/Playground/SQLPlayground';
import { Callout } from '../../components/Callout';
import { FINANCIAL_FULL_PRESET, EMPTY_PRESET } from '../../lib/database/presets';
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

export function Part2_DataIntegrity() {
  return (
    <>
      <Section id="part2" title="Part II: The Principle of Order - Ensuring Data Integrity" level={1}>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Why did a simple data entry mistake cost a healthcare company $1 billion in lost market value?
        </p>
        <p>
          In 2023, a major healthcare provider discovered that their patient database had been corrupted for months due to 
          missing referential integrity constraints. When a hospital location was deleted, thousands of patient records became 
          "orphaned" - pointing to locations that no longer existed. The resulting data cleanup took 6 months, involved manually 
          verifying hundreds of thousands of records, and led to compliance violations. This disaster could have been prevented 
          by implementing proper database constraints from the start.
        </p>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This part transitions from defining the <em>structure</em> of data in{' '}
          <a 
            href="#part1" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Part I
          </a>{' '}
          (tables, rows, columns, keys, and relationships) to establishing the <em>rules</em> that ensure 
          the data remains clean, consistent, and reliable. We'll explore both the formal process of database normalization and 
          the practical application of constraints. Together, these techniques form the foundation of data integrity - the guarantee 
          that your data is accurate, consistent, and trustworthy throughout its entire lifecycle.
        </p>
      </Section>

      <Section id="section4" title="The Quest for Clean Data - Database Normalization" level={2}>
        <p>
          <strong>Database normalization</strong> is a systematic design technique used to organize the tables 
          and columns of a relational database to minimize data redundancy and improve data integrity. It's one 
          of the most powerful yet often misunderstood concepts in database design - essential for building systems 
          that remain maintainable as they scale from thousands to millions of records.
        </p>

        <Callout type="success" title="Historical Note: E.F. Codd and the Theory of Normalization">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              While Edgar F. Codd introduced the relational model in 1970, it was his subsequent work on{' '}
              <strong>normalization</strong> that truly transformed database design into a science. In 1971, he published{' '}
              <a 
                href="https://www.seas.upenn.edu/~zives/cis550/codd-1NF.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                "Further Normalization of the Data Base Relational Model"
              </a>, introducing the concept of normal forms and functional dependencies. 
              Codd's insight was revolutionary: he provided <em>mathematical proofs</em> for why certain database structures 
              were superior to others. Before normalization theory, database design was an art based on intuition. After Codd, 
              it became an engineering discipline with formal rules. His work on Second and Third Normal Forms (1971) and later 
              Boyce-Codd Normal Form (1974, with Raymond Boyce) gave designers a systematic methodology to eliminate data anomalies. 
              Today, these principles remain as relevant as ever - the same normalization rules that governed mainframe databases 
              in the 1970s still protect the data integrity of modern cloud applications.
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

        <Subsection title="The Problem: Data Anomalies">
          <p>
            Before we dive into the solution, let's understand the problem in concrete terms. When a database is not properly 
            normalized, it becomes susceptible to <strong>data anomalies</strong> - systematic problems that occur during 
            data modification operations. These aren't random bugs; they're inherent flaws in the database structure itself.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            The core issue is <em>data redundancy</em> - storing the same information in multiple places. This creates a 
            maintenance nightmare when that information needs to change. To understand why this is so problematic, consider 
            an everyday analogy:
          </p>

          <Callout type="tip" title="Analogy: The Contact Information Problem">
            Imagine you have a friend whose phone number is written on sticky notes scattered throughout your house - 
            one on the fridge, one in your car, one on your desk, and one in your wallet. When your friend changes their 
            number, you face three problems: (1) You might forget to check if you even have their old number written down 
            (insertion anomaly), (2) You have to find and update ALL the sticky notes or you'll have conflicting information 
            (update anomaly), and (3) If you throw away the sticky note on your desk, you might lose their number entirely 
            (deletion anomaly). The solution? Keep phone numbers in ONE place - your phone's contacts - and reference that 
            single source of truth. This is exactly what database normalization does: it eliminates redundant copies of data 
            by storing each fact exactly once.
          </Callout>

          <p className="mt-3">
            Let's see this problem in action. Imagine you're tracking companies and their sectors in a single table, with the sector name repeated in every company record:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">CompanyName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">StockTicker</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">SectorName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Apple Inc.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">AAPL</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30">Technology</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">383.29B</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-850">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Microsoft Corp.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">MSFT</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30">Technology</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">211.92B</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">ExxonMobil</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">XOM</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30">Energy</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">413.68B</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Notice how "Technology" is repeated for multiple companies (highlighted in yellow). This redundancy creates three distinct problems.
          </p>
          
          <MermaidDiagram
            caption="The Three Data Anomalies: Unnormalized tables create three problems. Normalization fixes all of them by separating entities into their own tables."
            chart={`
flowchart LR
    DB[("❌ Unnormalized<br/>Table")]
    
    DB -.-> IA["Insertion<br/>Anomaly"]
    DB -.-> UA["Update<br/>Anomaly"]
    DB -.-> DA["Deletion<br/>Anomaly"]
    
    FIX[["🔧 Normalization<br/>Process"]]
    
    IA --> FIX
    UA --> FIX
    DA --> FIX
    
    FIX ==> S1["✅ Sectors<br/>Table"]
    FIX ==> S2["✅ Companies<br/>Table"]
            `}
          />
          
          <p className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
            1. Insertion Anomaly
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <strong>insertion anomaly</strong> occurs when you cannot add a new record because unrelated data is not available. 
            Consider our unnormalized table: you want to add a new sector "Renewable Energy" to your database, but you can't create 
            a row in the Companies_Flat table without specifying a company. You're forced to either wait until you have a company 
            in that sector, or create a dummy/placeholder company record - both terrible solutions that compromise data integrity.
          </p>

          <p className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
            2. Update Anomaly
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <strong>update anomaly</strong> arises when the same information is stored in multiple rows, requiring updates 
            to all copies to maintain consistency. Imagine your organization decides to rebrand "Technology" as "Information Technology". 
            You must now update this value in every single company record that belongs to this sector - potentially hundreds or 
            thousands of rows. If you miss even one, your data becomes inconsistent: some companies are in "Technology" while 
            others are in "Information Technology", even though they're supposed to be the same sector. This redundancy creates 
            a maintenance nightmare and opens the door to data corruption.
          </p>

          <p className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
            3. Deletion Anomaly
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <strong>deletion anomaly</strong> occurs when deleting data unintentionally causes loss of other, unrelated information. 
            Suppose ExxonMobil is the only company in the "Energy" sector in your database. When you delete the ExxonMobil row 
            (perhaps the company went private and is no longer tracked), you've simultaneously lost all knowledge that an "Energy" 
            sector even exists. The sector information was collateral damage in a company deletion - a clear violation of data independence.
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            These three anomalies are symptoms of the same underlying disease: <em>mixing concerns</em>. When entities that should 
            be independent are forced to coexist in the same table, operations on one entity inadvertently affect another. 
            Normalization cures this by giving each entity its own table, restoring data independence.
          </p>

          <Callout type="warning" title="Real-World Impact: The Cost of Data Anomalies">
            These aren't just theoretical problems. Consider a retail company with an unnormalized product database where 
            supplier information is repeated in every product record. When a supplier changes their phone number, hundreds 
            of product rows must be updated. In 2019, a mid-sized e-commerce company discovered that 15% of their supplier 
            contact information was inconsistent due to partial updates - some products had the old phone number, others had the 
            new one. The resulting supply chain confusion cost them an estimated $2.3 million in misrouted orders and emergency shipments.
          </Callout>
        </Subsection>

        <Subsection title="First Normal Form (1NF): The Rule of Atomicity">
          <p>
            The journey toward a fully normalized database begins with <strong>First Normal Form (1NF)</strong>, 
            which establishes the most fundamental principle: each piece of data must be <strong>atomic</strong> - 
            indivisible and stored in its own dedicated space.
          </p>

          <p className="mt-3">
            A table is in <strong>First Normal Form (1NF)</strong> if it meets two essential conditions:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Each column contains only <strong>atomic</strong> (indivisible) values - no lists, no sets, no comma-separated values</li>
            <li>Each row is uniquely identifiable (typically via a primary key) - no duplicate rows</li>
          </ol>

          <Callout type="info" title="What Does 'Atomic' Really Mean?">
            In database terminology, "atomic" means that a value cannot be meaningfully subdivided within the context 
            of the database. For example, a full name like "John Smith" <em>could</em> be considered atomic if you never need 
            to search or sort by last name separately. However, if you need "Smith" as a separate piece of data, then "John Smith" 
            is NOT atomic - it should be split into FirstName and LastName columns. Atomicity is context-dependent: it depends 
            on how you need to use the data.
          </Callout>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            {/* Left: Violates 1NF */}
            <div>
              <div className="h-auto min-h-[280px] flex flex-col justify-start p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600 rounded-lg">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3 text-center">
                  ❌ Violates 1NF
                </h4>
                <div className="overflow-x-auto flex-1">
                  <table className="min-w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-red-100 dark:bg-red-900/40">
                        <th className="border border-red-300 dark:border-red-700 px-2 py-1">CompanyName</th>
                        <th className="border border-red-300 dark:border-red-700 px-2 py-1">LineItems</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-red-300 dark:border-red-700 px-2 py-1">Apple Inc.</td>
                        <td className="border border-red-300 dark:border-red-700 px-2 py-1 bg-red-200 dark:bg-red-800/40 font-mono">
                          Revenue: 383B, Net Income: 97B
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-red-300 dark:border-red-700 px-2 py-1">Microsoft</td>
                        <td className="border border-red-300 dark:border-red-700 px-2 py-1 bg-red-200 dark:bg-red-800/40 font-mono">
                          Revenue: 212B, Net Income: 72B
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold text-red-900 dark:text-red-200 mb-1">Problems:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>LineItems column contains <strong>multiple values</strong> (not atomic)</li>
                  <li>Cannot query &quot;SELECT * WHERE Net Income &gt; 80B&quot; - the value is buried in text</li>
                  <li>Cannot sort companies by Net Income</li>
                  <li>Must parse strings to extract individual values - fragile and slow</li>
                </ul>
              </div>
            </div>

            {/* Right: Complies with 1NF */}
            <div>
              <div className="h-auto min-h-[280px] flex flex-col justify-start p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 text-center">
                  ✅ Complies with 1NF
                </h4>
                <div className="overflow-x-auto flex-1">
                  <table className="min-w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-green-100 dark:bg-green-900/40">
                        <th className="border border-green-300 dark:border-green-700 px-2 py-1">CompanyName</th>
                        <th className="border border-green-300 dark:border-green-700 px-2 py-1">ItemName</th>
                        <th className="border border-green-300 dark:border-green-700 px-2 py-1">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Apple Inc.</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Revenue</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">383000000000</td>
                      </tr>
                      <tr>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Apple Inc.</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Net Income</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">97000000000</td>
                      </tr>
                      <tr>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Microsoft</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Revenue</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">212000000000</td>
                      </tr>
                      <tr>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Microsoft</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">Net Income</td>
                        <td className="border border-green-300 dark:border-green-700 px-2 py-1">72000000000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold text-green-900 dark:text-green-200 mb-1">Benefits:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Each cell contains a <strong>single, atomic value</strong></li>
                  <li>Can filter: &quot;WHERE ItemName = &apos;Net Income&apos; AND Value &gt; 80000000000&quot;</li>
                  <li>Can sort, aggregate, and perform calculations on numeric values</li>
                  <li>Database can optimize queries with indexes</li>
                </ul>
              </div>
            </div>
          </div>

          <Callout type="tip" title="Common 1NF Violations to Watch For">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Comma-separated values:</strong> <code>Tags: "javascript, react, typescript"</code> - should be a separate Tags table</li>
              <li><strong>JSON or XML in a column:</strong> While some databases support JSON columns, storing structured data as text violates 1NF</li>
              <li><strong>Repeating columns:</strong> <code>Phone1, Phone2, Phone3</code> - should be a separate PhoneNumbers table</li>
              <li><strong>Arrays in columns:</strong> Some databases (PostgreSQL) support array types, but these technically violate 1NF principles</li>
            </ul>
          </Callout>
        </Subsection>

        <Subsection title="Second Normal Form (2NF): Eliminating Partial Dependencies">
          <p>
            Once a table is in 1NF, we can address a more subtle problem: <strong>partial dependencies</strong>. 
            A table is in <strong>Second Normal Form (2NF)</strong> if it is in 1NF and every non-key attribute 
            is fully functionally dependent on the <em>entire</em> composite primary key.
          </p>

          <p className="mt-3">
            <strong>Key insight:</strong> 2NF only applies to tables with <em>composite primary keys</em> (keys made up 
            of two or more columns). If your table has a single-column primary key, it automatically satisfies 2NF 
            (though it might still violate 3NF, which we'll cover next).
          </p>

          <Callout type="info" title="Understanding Functional Dependencies">
            A <strong>functional dependency</strong> means that one attribute's value determines another attribute's value. 
            We write this as A → B (read: "A determines B" or "B depends on A"). For example:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><code>StudentID → StudentName</code> - knowing the StudentID tells you the StudentName</li>
              <li><code>OrderID → OrderDate</code> - knowing the OrderID tells you when the order was placed</li>
              <li><code>&#123;OrderID, ProductID&#125; → Quantity</code> - knowing BOTH the order and product tells you the quantity ordered</li>
            </ul>
            A <strong>partial dependency</strong> occurs when an attribute depends on only <em>part</em> of a composite key.
            
            <div className="mt-3 flex justify-center">
              <InlineMermaid chart={`erDiagram
    ORDERS {
        int OrderID PK
        date OrderDate
    }
    PRODUCTS {
        int ProductID PK
        varchar ProductName
    }
    ORDER_ITEMS {
        int OrderID FK
        int ProductID FK
        int Quantity
    }`} />
            </div>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
              Properly normalized structure: separate tables for Orders, Products, and their junction table OrderItems
            </p>
          </Callout>

          <p className="mt-4">
            Let's see the problem in action with an order management system:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-slate-900 dark:text-slate-100 font-semibold" colSpan={2}>Composite Primary Key</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-slate-900 dark:text-slate-100 font-semibold" colSpan={3}>Non-Key Attributes</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-900">
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">OrderID</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">ProductID</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">OrderDate</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">ProductName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">1001</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">P501</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">2024-01-15</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">Laptop</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">2</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">1001</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">P502</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">2024-01-15</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100">Mouse</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100">5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r my-4">
            <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">The Problem (highlighted in yellow):</p>
            <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
              <li><strong>OrderDate</strong> depends only on OrderID (not on ProductID) - <code>OrderID → OrderDate</code></li>
              <li><strong>ProductName</strong> depends only on ProductID (not on OrderID) - <code>ProductID → ProductName</code></li>
              <li><strong>Quantity</strong> depends on BOTH - <code>&#123;OrderID, ProductID&#125; → Quantity</code> ✓ (this is correct!)</li>
            </ul>
            <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-2">
              Because OrderDate and ProductName have <em>partial dependencies</em> (depending on only part of the composite key), 
              this table violates 2NF.
            </p>
          </div>

          <MermaidDiagram
            caption="2NF: Eliminating Partial Dependencies. The composite key problem is solved by decomposing into separate tables where each attribute fully depends on its table's entire primary key."
            chart={`
erDiagram
    ORDERS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : "ordered in"
    
    ORDERS {
        int OrderID PK
        date OrderDate "Full dependency ✓"
    }
    
    PRODUCTS {
        int ProductID PK
        varchar ProductName "Full dependency ✓"
    }
    
    ORDER_ITEMS {
        int OrderID FK
        int ProductID FK
        int Quantity "Depends on BOTH ✓"
    }
            `}
          />

          <Callout type="success" title="Why 2NF Matters: The Update Anomaly Example">
            In the violating table above, if Order 1001's date needs to be changed from 2024-01-15 to 2024-01-16, you must 
            update <em>multiple rows</em> (every product in that order). If you miss one, the data becomes inconsistent - some 
            rows show the order was placed on the 15th, others show the 16th. After normalizing to 2NF, the order date exists 
            in exactly one place (the Orders table), so updating it updates it everywhere.
          </Callout>
        </Subsection>

        <Subsection title="Third Normal Form (3NF): Eliminating Transitive Dependencies">
          <p>
            The final major normalization form that most databases aim for is <strong>Third Normal Form (3NF)</strong>. 
            A table is in 3NF if it is in 2NF and contains <em>no transitive dependencies</em> - meaning no non-key 
            attribute can depend on another non-key attribute.
          </p>

          <p className="mt-3">
            The classic mnemonic for 3NF is: <strong>"Every non-key attribute must provide a fact about the key, 
            the whole key, and nothing but the key."</strong> Let's break this down:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>"The key"</strong> - addresses 1NF (atomic values, unique rows via primary key)</li>
            <li><strong>"The whole key"</strong> - addresses 2NF (no partial dependencies on composite keys)</li>
            <li><strong>"Nothing but the key"</strong> - addresses 3NF (no transitive dependencies)</li>
          </ul>

          <Callout type="info" title="Understanding Transitive Dependencies">
            A <strong>transitive dependency</strong> occurs when we have a chain of dependencies: A → B → C. 
            If CompanyID determines SectorName, and SectorName determines SectorDescription, then we have a transitive 
            dependency: <code>CompanyID → SectorName → SectorDescription</code>. The problem is that SectorDescription 
            depends on SectorName (a non-key attribute), not directly on the primary key.
          </Callout>

          <p className="mt-4">
            Let's see a concrete example with our financial database:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyID (PK)</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2">CompanyName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">SectorName</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">SectorDescription</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">101</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Apple Inc.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Technology</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Companies that produce tech products</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">102</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">Microsoft Corp.</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Technology</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Companies that produce tech products</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">103</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">JPMorgan Chase</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Financial Services</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30">Banks and investment firms</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r my-4">
            <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">The Transitive Dependency Chain:</p>
            <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-2">
              <li><code>CompanyID → CompanyName</code> ✓ (directly depends on key - OK!)</li>
              <li><code>CompanyID → SectorName</code> (depends on key, but...)</li>
              <li><code>SectorName → SectorDescription</code> (depends on a non-key attribute!)</li>
              <li className="font-semibold mt-2">Result: <code>CompanyID → SectorName → SectorDescription</code> (transitive dependency ✗)</li>
            </ul>
            <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-3">
              SectorDescription doesn't directly depend on CompanyID - it depends on SectorName. This creates the same 
              update anomaly problem we saw earlier: if we want to change the Technology sector's description, we must 
              update it in every Technology company's row.
            </p>
          </div>

          <MermaidDiagram
            caption="3NF: Eliminating Transitive Dependencies. Sector information depends on SectorID, not CompanyID. By separating entities, each non-key attribute depends only on its table's primary key."
            chart={`
erDiagram
    SECTORS ||--o{ COMPANIES : "categorizes"
    
    SECTORS {
        int SectorID PK
        varchar SectorName "Depends on SectorID ✓"
        text SectorDescription "Depends on SectorID ✓"
    }
    
    COMPANIES {
        int CompanyID PK
        varchar CompanyName "Depends on CompanyID ✓"
        varchar StockTicker "Depends on CompanyID ✓"
        int SectorID FK "Reference, not duplicate"
    }
            `}
          />

          <p className="mt-4">
            After decomposing to 3NF, we now have our familiar structure with a separate Sectors table:
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

          <Callout type="success" title="Why 3NF is the Sweet Spot for Most Applications">
            Third Normal Form strikes an excellent balance between data integrity and practical usability. Most production 
            databases aim for 3NF because:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Eliminates most anomalies:</strong> The vast majority of data anomalies are resolved by 3NF</li>
              <li><strong>Intuitive structure:</strong> 3NF schemas map naturally to real-world entities and relationships</li>
              <li><strong>Query-friendly:</strong> JOINs in 3NF are straightforward and performant with proper indexes</li>
              <li><strong>Maintainable:</strong> Updates happen in one place, reducing bugs and inconsistencies</li>
            </ul>
            Higher normal forms (BCNF, 4NF, 5NF) exist for edge cases, but 3NF is sufficient for 95% of real-world applications.
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            To understand the progression through normal forms and why 3NF is often the stopping point, it helps to visualize 
            the journey as a series of increasingly refined organizational steps. Each normal form solves a specific type of 
            redundancy problem:
          </p>

          <Callout type="tip" title="Analogy: Organizing a Messy Kitchen">
            The journey through normal forms is like progressively organizing a chaotic kitchen. <strong>Unnormalized</strong> 
            is like having ingredients scattered everywhere - pasta in three different cabinets, the same spice bought five times 
            because you can't find the original. <strong>1NF</strong> is like deciding "one item per container" - no more bags 
            containing both flour AND sugar, each ingredient gets its own labeled jar. <strong>2NF</strong> is like grouping 
            items by meal type - breakfast items together, baking supplies together - so you don't store "pancake mix" in both 
            the breakfast cabinet and the baking cabinet just because it's used in both contexts. <strong>3NF</strong> is like 
            removing indirect dependencies: instead of storing "flour → baking section → second shelf" everywhere, just store 
            "flour → baking section" and let "baking section → second shelf" be defined once. By 3NF, your kitchen is organized, 
            intuitive, and efficient - everything has one clear home, and when you move the baking section to a different shelf, 
            you only update one sign, not every item. Most kitchens stop here - it's organized enough!
          </Callout>
        </Subsection>

        <Subsection title="Beyond 3NF: Boyce-Codd Normal Form (BCNF)">
          <p>
            While 3NF resolves most data anomalies, there's a subtle edge case it doesn't handle: when a table has 
            <strong>multiple overlapping candidate keys</strong>. <strong>Boyce-Codd Normal Form (BCNF)</strong>, 
            named after computer scientists Raymond Boyce and Edgar F. Codd, addresses this rare but important scenario.
          </p>

          <p className="mt-3">
            A table is in BCNF if for every non-trivial functional dependency X → Y, X must be a <strong>superkey</strong> 
            (a set of columns that uniquely identifies rows). In simpler terms: <em>every determinant must be a candidate key</em>.
          </p>

          <Callout type="info" title="When Does BCNF Matter? A Practical Example">
            BCNF violations are rare but can occur in tables like course scheduling:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Table:</strong> Course_Offerings (StudentID, CourseTitle, Professor)</li>
              <li><strong>Rules:</strong> Each student-course combination is unique. Each professor teaches only one course. Each course is taught by only one professor.</li>
              <li><strong>Candidate Keys:</strong> &#123;StudentID, CourseTitle&#125; OR &#123;StudentID, Professor&#125;</li>
              <li><strong>Problem:</strong> Professor → CourseTitle (professor determines course), but Professor is not a candidate key!</li>
            </ul>
            This violates BCNF because Professor (a non-superkey) determines CourseTitle. The solution: split into separate tables 
            for Enrollments and Professor_Course_Assignment.
          </Callout>

          <p className="mt-3">
            <strong>For most applications:</strong> 3NF is sufficient. BCNF should be considered when you have complex business 
            rules involving multiple overlapping candidate keys. In practice, less than 5% of tables require thinking beyond 3NF.
          </p>
        </Subsection>

        <Subsection title="When NOT to Normalize: Denormalization for Performance">
          <p>
            While normalization is crucial for data integrity, there are legitimate scenarios where intentionally 
            <strong>denormalizing</strong> (violating normal forms) can improve performance. This is an advanced technique 
            that should only be applied after careful analysis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">✅ Normalize When:</h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                <li><strong>Write-heavy systems:</strong> Many INSERTs, UPDATEs, DELETEs benefit from normalized structure</li>
                <li><strong>Data integrity is critical:</strong> Financial, medical, legal applications - never compromise</li>
                <li><strong>Storage is limited:</strong> Normalization reduces data redundancy and storage costs</li>
                <li><strong>Complex business rules:</strong> Constraints and relationships are easier to maintain in normalized forms</li>
                <li><strong>Unknown future queries:</strong> When you don't know how data will be queried, keep it normalized</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 dark:border-amber-600 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">⚠️ Consider Denormalization When:</h4>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                <li><strong>Read-heavy systems:</strong> Analytics, reporting dashboards with known, repetitive queries</li>
                <li><strong>JOIN overhead is measured:</strong> Profile first! Don't guess - measure actual query performance</li>
                <li><strong>Data is read-only or rarely changes:</strong> Historical data, logs, analytics warehouses</li>
                <li><strong>Calculated/aggregated columns:</strong> Total_Price = Quantity × Unit_Price can be stored for speed</li>
                <li><strong>Caching layers exist:</strong> Application-level caching can mitigate denormalization risks</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            The decision to denormalize is a <em>trade-off</em>: you're sacrificing data integrity and maintainability for 
            query performance. This trade is only worthwhile when performance is genuinely a bottleneck that can't be solved 
            through other means. Many developers denormalize prematurely based on assumptions rather than measurements, 
            creating maintenance burdens that could have been avoided.
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Modern databases and application architectures offer many performance optimization techniques before resorting to 
            denormalization: indexes can speed up lookups by orders of magnitude, query optimization can restructure expensive 
            operations, and caching layers can serve frequently-accessed data without touching the database. Only after exhausting 
            these options should denormalization be considered.
          </p>

          <Callout type="warning" title="The Golden Rule of Denormalization">
            <strong>Never denormalize without evidence.</strong> Premature denormalization is a common mistake. Always:
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Start with a fully normalized schema (3NF)</li>
              <li>Build the application and measure real-world performance</li>
              <li>Identify actual bottlenecks with profiling tools (not assumptions)</li>
              <li>Try indexes, query optimization, and caching first</li>
              <li>Only denormalize specific tables/columns that evidence proves are bottlenecks</li>
              <li>Document the denormalization and maintain data integrity through application logic or triggers</li>
            </ol>
          </Callout>
        </Subsection>

        <Subsection title="The Normalization Journey: Visual Summary">
          <MermaidDiagram
            caption="Progressive Normalization: Each normal form builds on the previous, eliminating specific anomalies. Most databases aim for 3NF as the sweet spot."
            chart={`
stateDiagram-v2
    direction LR
    [*] --> Unnormalized: Raw Data
    Unnormalized --> 1NF: Remove<br/>repeating<br/>groups
    1NF --> 2NF: Eliminate<br/>partial<br/>dependencies
    2NF --> 3NF: Eliminate<br/>transitive<br/>dependencies
    3NF --> BCNF: Handle<br/>overlapping<br/>keys
    BCNF --> [*]: Fully<br/>Normalized
    
    note right of 1NF
        ✓ Atomic values
        ✓ Unique rows
    end note
    
    note right of 2NF
        ✓ No partial deps
        (composite key)
    end note
    
    note right of 3NF
        ✓ No transitive deps
        ⭐ Most apps stop here
    end note
    
    note right of BCNF
        ✓ Advanced cases
        (rarely needed)
    end note
            `}
          />
        </Subsection>

        <Subsection title="AI-Assisted Normalization: Using AI to Check Your Schema">
          <p>
            Modern AI tools can be invaluable for verifying database normalization and catching design issues early. 
            Instead of manually analyzing functional dependencies, you can leverage AI to review your schema designs.
          </p>

          <Callout type="tip" title="Effective AI Prompts for Schema Validation">
            <div className="space-y-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt 1: Check Normalization Level</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;Analyze this database schema for normal form violations. Identify any partial dependencies, 
                  transitive dependencies, or BCNF violations: [paste your ERD or CREATE TABLE statements]&quot;
                </p>
              </div>

              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt 2: Suggest Decomposition</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;This table violates 3NF due to the transitive dependency CompanyID → SectorName → SectorDescription. 
                  Show me how to decompose it into proper 3NF tables with SQL CREATE statements.&quot;
                </p>
              </div>

              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt 3: Generate Migration Script</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;I need to normalize my existing database from this denormalized structure [describe tables] 
                  to 3NF. Generate a migration script that preserves all existing data while splitting the tables properly.&quot;
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">🛠️ Recommended AI Tools:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>GitHub Copilot / Cursor:</strong> Generate ERDs and normalized schemas from natural language descriptions</li>
                <li><strong>ChatGPT / Claude with Mermaid:</strong> Describe your domain, ask for ERD in Mermaid syntax, iterate on the design</li>
                <li><strong>Spec validation:</strong> Paste CREATE TABLE statements, ask AI to identify violations and suggest fixes</li>
                <li><strong>Test data generation:</strong> Ask AI to generate realistic test data that respects all foreign key constraints</li>
              </ul>
            </div>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            The combination of theoretical understanding (normalization principles) and practical tools (AI assistance) creates 
            a powerful workflow. You understand <em>why</em> designs should be normalized, while AI helps you quickly iterate 
            on <em>how</em> to implement those designs. This approach is becoming standard practice in modern database development.
          </p>
        </Subsection>
      </Section>

      <Section id="section5" title="The Rules of the Game - Constraints and Data Integrity" level={2}>
        <p>
          While normalization provides the theoretical <em>blueprint</em> for organizing data, <strong>constraints</strong> 
          are the practical <em>enforcement mechanisms</em> that ensure the blueprint is respected. Constraints are rules 
          defined on columns or tables that prevent invalid data from being entered into the database. They are the guardrails 
          that protect your data integrity 24/7, regardless of which application, script, or user is accessing the database.
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          The relationship between normalization and constraints is complementary: normalization tells you <em>how to organize</em> 
          your data structure, while constraints tell you <em>what rules to enforce</em> within that structure. Think of it 
          this way:
        </p>

        <Callout type="tip" title="Analogy: Traffic Laws vs. Road Design">
          Think of database design like city planning. Normalization is like deciding how to lay out roads efficiently - 
          avoiding redundant paths that go to the same destination. But good road layout isn't enough; you also need traffic 
          laws (constraints) to keep everyone safe. A PRIMARY KEY is like a vehicle registration number - every car must have 
          one unique ID. A NOT NULL constraint is like requiring all drivers to have a valid license - no exceptions. 
          A CHECK constraint is like a speed limit - values must stay within acceptable bounds. A FOREIGN KEY is like requiring 
          that street addresses actually exist before you can list them on mail - you can't reference 123 Fake Street if 
          that street isn't in the city registry. Just as traffic laws are enforced by police (not just "hoped for" by drivers), 
          database constraints are enforced by the database engine itself - not left to the honor system of application code. 
          This is why constraints are so powerful: they're <em>always</em> enforced, no matter how many different applications 
          access your database.
        </Callout>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          This enforcement-first philosophy wasn't always standard practice. The journey from "constraints are optional 
          performance overhead" to "constraints are essential for correctness" took several decades to complete. Understanding 
          this evolution helps explain why constraints are now universally recognized as critical:
        </p>

        <Callout type="success" title="Historical Note: The Evolution of Database Constraints">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              The concept of database constraints evolved gradually through the 1970s and 1980s. While E.F. Codd's original 
              1970 paper introduced the idea of domains (acceptable values for attributes), the first practical implementation 
              of PRIMARY KEY and FOREIGN KEY constraints didn't appear in commercial databases until the late 1970s with 
              IBM's System R. The SQL standard that we know today - with its rich constraint system including CHECK, UNIQUE, 
              and NOT NULL - was formalized in <strong>SQL-89</strong> and significantly expanded in <strong>SQL-92</strong> 
              (also known as SQL2). Interestingly, many popular databases initially ignored foreign key constraints as "optional" 
              for performance reasons. MySQL's default storage engine (MyISAM) famously didn't enforce foreign keys until InnoDB 
              became the default in 2010 - meaning millions of MySQL databases operated without referential integrity for decades! 
              This led to countless data corruption issues that could have been prevented. Today, every serious relational database 
              enforces constraints at the database level, recognizing that performance is meaningless without correctness.
            </div>
            <div className="text-center flex-shrink-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sql_data_base_with_logo.png/300px-Sql_data_base_with_logo.png" 
                alt="SQL Database"
                className="h-24 w-auto object-contain rounded border border-emerald-300 dark:border-emerald-600"
              />
              <p className="text-xs mt-1 mb-0 text-emerald-800 dark:text-emerald-200">SQL Standards</p>
            </div>
          </div>
        </Callout>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          The introduction of declarative constraints in the 1980s marked a paradigm shift: instead of writing procedural 
          code to check every rule, developers could simply <em>declare</em> the rules once, and the database would enforce 
          them automatically. This moved from "hope the application doesn't have bugs" to "mathematically guaranteed enforcement."
        </p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          But why enforce constraints at the database level instead of in application code? The answer becomes clear when 
          we consider modern application architectures:
        </p>

        <Callout type="warning" title="Why Database-Level Enforcement Matters">
          <p className="font-semibold mb-2">Application code alone is not enough:</p>
          Consider a modern microservices architecture with 15 different services accessing the same database. 
          Each service is written by a different team, potentially in different languages (Java, Python, Node.js, Go). 
          If business rules are only enforced in application code:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All 15 services must implement identical validation logic (duplication = bugs)</li>
            <li>A new service might forget a rule, corrupting data immediately</li>
            <li>Direct database access (SQL client, admin tool, data migration script) bypasses all checks</li>
            <li>Race conditions between concurrent requests can violate invariants</li>
          </ul>
          <p className="mt-2">
            <strong>Database constraints create a single source of truth.</strong> They enforce rules universally, 
            regardless of how data enters the system. This architectural principle - enforcing invariants at the lowest 
            possible level - is fundamental to building reliable systems.
          </p>
        </Callout>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          With this understanding of <em>why</em> constraints matter, let's explore <em>how</em> to implement them. 
          We'll categorize constraints into three types: <strong>entity integrity</strong> (identifying rows uniquely), 
          <strong>domain integrity</strong> (validating column values), and <strong>referential integrity</strong> (maintaining 
          relationships between tables).
        </p>

        <Subsection title="Understanding CREATE TABLE: Building Tables with Constraints">
          <p>
            Before diving into specific constraints, let's understand the <code>CREATE TABLE</code> statement - the 
            fundamental SQL command for defining table structure and constraints.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Basic CREATE TABLE Syntax:</p>
            <div className="font-mono text-sm space-y-1">
              <div><span className="text-cyan-600 dark:text-cyan-400 font-semibold">CREATE TABLE</span> <span className="text-gray-700 dark:text-gray-300">table_name</span> (</div>
              <div className="pl-4"><span className="text-gray-700 dark:text-gray-300">column1</span> <span className="text-purple-600 dark:text-purple-400">datatype</span> <span className="text-amber-600 dark:text-amber-400">[constraints]</span>,</div>
              <div className="pl-4"><span className="text-gray-700 dark:text-gray-300">column2</span> <span className="text-purple-600 dark:text-purple-400">datatype</span> <span className="text-amber-600 dark:text-amber-400">[constraints]</span>,</div>
              <div className="pl-4">...</div>
              <div className="pl-4"><span className="text-green-600 dark:text-green-400">[table-level constraints]</span></div>
              <div>);</div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Constraints can be defined at the <strong>column level</strong> (immediately after the column definition) 
              or at the <strong>table level</strong> (after all columns, useful for composite constraints).
            </p>
          </div>

          <Callout type="info" title="Common Data Type Modifiers and Functions">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">AUTOINCREMENT</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When added to an INTEGER PRIMARY KEY, automatically generates sequential unique numbers for each new row. 
                  Example: <code>CompanyID INTEGER PRIMARY KEY AUTOINCREMENT</code> - the database automatically assigns 
                  1, 2, 3, etc.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">DECIMAL(p, s) or NUMERIC(p, s)</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Stores exact decimal numbers with specified precision. The first number (p) is total digits, 
                  the second (s) is digits after the decimal point. Example: <code>DECIMAL(10, 2)</code> can store 
                  up to $99,999,999.99 (10 digits total, 2 after decimal).
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">CURRENT_TIMESTAMP</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A SQL function that returns the current date and time. Often used with DEFAULT:{' '}
                  <code>created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</code> automatically sets the timestamp 
                  when a row is created.
                </p>
              </div>
            </div>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Now let's put this into practice! The playground below lets you create your first table with constraints. Follow the 
            guided steps in the comments to understand each part of the CREATE TABLE statement:
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Step 1: Create a Products table with various constraints
-- Read through each line to understand the syntax

CREATE TABLE products (
  -- Primary key: auto-incrementing unique identifier
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Required text field (NOT NULL)
  product_name TEXT NOT NULL,
  
  -- Unique constraint: SKU must be unique across all products
  sku TEXT UNIQUE NOT NULL,
  
  -- Decimal for exact pricing (10 total digits, 2 after decimal)
  price DECIMAL(10, 2) CHECK (price >= 0),
  
  -- Integer with CHECK constraint for stock
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  
  -- Automatically set when record is created
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: After running this, click the "Schema" button above
--         to see your table structure!

-- Step 3: Try inserting some data
INSERT INTO products (product_name, sku, price, stock_quantity)
VALUES ('Wireless Mouse', 'WM-001', 29.99, 50);

INSERT INTO products (product_name, sku, price)
VALUES ('USB Cable', 'USB-C-001', 9.99);  -- stock_quantity will default to 0

-- Step 4: Query your data
SELECT * FROM products;

-- Challenge: Try these experiments (uncomment one at a time):
-- This will FAIL (duplicate SKU):
-- INSERT INTO products (product_name, sku, price) VALUES ('Keyboard', 'WM-001', 49.99);

-- This will FAIL (negative price violates CHECK):
-- INSERT INTO products (product_name, sku, price) VALUES ('Monitor', 'MON-001', -199.99);

-- This will FAIL (product_name is NOT NULL):
-- INSERT INTO products (sku, price) VALUES ('HDMI-001', 15.99);`}
          />

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>Tip:</strong> Use the <strong>Schema</strong> button to visualize your table structure. Notice how constraints 
            are enforced - try uncommenting the challenge queries to see what happens when constraints are violated!
          </p>
        </Subsection>

        <Subsection title="Entity Integrity: PRIMARY KEY and UNIQUE Constraints">
          <p>
            <strong>Entity integrity</strong> ensures that each row in a table has a unique, identifiable identity. 
            This is accomplished through two related constraints (if you need a refresher on keys, see{' '}
            <a 
              href="#section3" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Part I: Keys
            </a>):
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            PRIMARY KEY Constraint
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <code>PRIMARY KEY</code> uniquely identifies each row in a table. Every table should have exactly one primary 
            key, which must be both UNIQUE and NOT NULL - no duplicates, no missing values. When you define a primary key, 
            the database automatically creates a unique index on that column for fast lookups. By convention, primary keys are 
            usually auto-incrementing integers (like <code>CompanyID INTEGER PRIMARY KEY AUTOINCREMENT</code>) or UUIDs. The 
            primary key is the foundation of all relationships in your database - foreign keys point to primary keys.
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            UNIQUE Constraint
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <code>UNIQUE</code> constraint ensures that all values in a column (or set of columns) are distinct, but unlike 
            PRIMARY KEY, a table can have multiple UNIQUE constraints. UNIQUE columns can also contain NULL values (typically one NULL 
            is allowed). Use UNIQUE constraints to enforce uniqueness on <em>natural keys</em> - real-world identifiers like email 
            addresses, stock tickers, ISBN numbers, or social security numbers. While the primary key is for internal database 
            relationships, UNIQUE constraints enforce business rules about what makes records truly distinct in your domain.
          </p>

          <CodeExample
            title="Creating a table with PRIMARY KEY and UNIQUE constraints"
            code={`-- Define a Companies table with entity integrity constraints
CREATE TABLE Companies (
  -- PRIMARY KEY: Surrogate key for internal relationships
  CompanyID INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- UNIQUE: Stock ticker must be unique (natural key)
  StockTicker TEXT UNIQUE NOT NULL,
  
  -- NOT NULL: Company name is required
  CompanyName TEXT NOT NULL,
  
  -- Foreign key to Sectors table (covered in next section)
  SectorID INTEGER,
  
  -- Timestamp for auditing
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
          />

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            In this example, <code>CompanyID</code> is the primary key for internal database use, while <code>StockTicker</code> 
            has a UNIQUE constraint to prevent duplicate ticker symbols - enforcing a business rule directly in the schema.
          </p>

          <Callout type="tip" title="AI-Assisted Schema Design: From Requirements to SQL">
            Modern AI tools excel at translating business requirements into properly constrained database schemas. Here's how to leverage them effectively:
            
            <div className="space-y-3 mt-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt: Generate Schema from Requirements</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;I need a database for an e-commerce platform. Requirements: Products have SKUs (unique), prices (positive decimals), 
                  stock quantities (non-negative integers), and categories. Every product must have a name. Generate CREATE TABLE statements 
                  with appropriate constraints.&quot;
                </p>
              </div>

              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt: Validate Existing Schema</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;Review this schema for missing constraints: [paste CREATE TABLE]. What business rules are not enforced? 
                  What columns should be NOT NULL? What needs CHECK constraints?&quot;
                </p>
              </div>

              <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded p-3">
                <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Prompt: Convert to ORM Models</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200 font-mono">
                  &quot;Convert this SQL schema to [SQLAlchemy/Prisma/TypeORM] models, preserving all constraints and relationships: 
                  [paste SQL]&quot;
                </p>
              </div>
            </div>

            <p className="text-sm mt-3">
              <strong>Pro tip:</strong> Always ask AI to explain WHY it chose certain constraints. This helps you learn 
              database design principles while leveraging AI's speed.
            </p>
          </Callout>
        </Subsection>

        <Subsection title="Domain Integrity (NOT NULL, CHECK, DEFAULT)">
          <p>
            <strong>Domain integrity</strong> ensures that all values in a column are valid according to defined rules. 
            These constraints validate individual column values, regardless of other columns or tables. Let's examine 
            the three primary domain integrity constraints:
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            NOT NULL Constraint
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <code>NOT NULL</code> constraint prevents NULL (missing or unknown) values in a column. Use this for 
            required fields where a value must always exist. For example, <code>name TEXT NOT NULL</code> ensures that 
            every record must have a name - no exceptions. This is your first line of defense against incomplete data.
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            CHECK Constraint
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <code>CHECK</code> constraint enforces that values meet a specific condition. It's perfect for validating 
            ranges, formats, or business rules. For instance, <code>age INTEGER CHECK (age &gt;= 18 AND age &lt;= 100)</code> 
            ensures age values are realistic. You can also use the <code>IN</code> operator for enumerated values:{' '}
            <code>CHECK (status IN ('active', 'inactive'))</code>. This moves validation logic from your application code 
            into the database itself, where it can't be bypassed.
          </p>

          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            DEFAULT Constraint
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            The <code>DEFAULT</code> constraint provides an automatic value when none is specified. This is useful for 
            columns that should have a sensible fallback value, like <code>status TEXT DEFAULT 'active'</code> or{' '}
            <code>created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</code>. Defaults reduce data entry burden while ensuring 
            consistency - every new user starts as 'active' unless explicitly specified otherwise.
          </p>

          <p className="mt-4">
            Before we see these constraints in action, let's learn the SQL commands needed to populate and query tables:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3 space-y-3">
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">INSERT INTO</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>INSERT INTO statement</strong> adds new rows to a table. The basic syntax is:{' '}
                <code>INSERT INTO table_name (column1, column2) VALUES (value1, value2);</code>
                <br/>You can insert multiple rows at once by separating them with commas:{' '}
                <code>VALUES (1, 'Alice'), (2, 'Bob');</code>
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">VALUES</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>VALUES clause</strong> specifies the actual data to insert. The values must match the columns 
                in order and type. String values use single quotes: <code>'Alice'</code>. Numbers don't need quotes: <code>25</code>.
              </p>
            </div>
          </div>

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
            <strong>Foreign key constraints</strong> ensure that relationships between tables remain valid (for a refresher on 
            table relationships, see{' '}
            <a 
              href="#section3" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Part I: Relationships and Foreign Keys
            </a>). 
            They prevent "orphaned" records by ensuring any foreign key value exists in the referenced table's 
            primary key.
          </p>

          <Callout type="tip" title="Analogy: Library Call Numbers">
            Think of a foreign key like a library call number written in a book recommendation card. The card says 
            "For more on this topic, see QA76.73.P98" - but this reference is only useful if that call number actually 
            exists in the library catalog! A foreign key constraint is like the librarian checking: "Before I accept this 
            recommendation card, let me verify that book QA76.73.P98 actually exists in our catalog." Without this check, 
            patrons would follow references to non-existent books (orphaned records). Cascading actions are like library 
            policies: if a book moves to a new shelf location (UPDATE), should we update all the recommendation cards 
            (CASCADE)? If a book is removed from the catalog (DELETE), should we remove all cards referencing it (CASCADE) 
            or keep them but mark "reference unavailable" (SET NULL)?
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Just as a well-run library maintains the integrity of its catalog references, foreign key constraints ensure 
            your database maintains the integrity of its table relationships. But why should these constraints be enforced 
            by the database itself rather than application code? The answer lies in the architecture of modern systems:
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

          <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Modifying Existing Tables: ALTER TABLE and UPDATE
          </p>

          <p className="mt-3">
            Often you need to modify tables after they've been created. SQL provides two key commands for this:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3 space-y-3">
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">ALTER TABLE</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>ALTER TABLE statement</strong> modifies the structure of an existing table. The most common operation 
                is adding a new column: <code>ALTER TABLE table_name ADD COLUMN column_name datatype [constraints];</code>
                <br/>Example: <code>ALTER TABLE employees ADD COLUMN department TEXT DEFAULT 'Unassigned';</code>
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">UPDATE</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>UPDATE statement</strong> modifies existing data in a table. The syntax is:{' '}
                <code>UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;</code>
                <br/><strong>⚠️ CRITICAL:</strong> Always include a WHERE clause to specify which rows to update. 
                Without WHERE, ALL rows will be updated!
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">SET</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>SET clause</strong> (used with UPDATE) specifies which columns to change and their new values.{' '}
                <code>SET department = 'Engineering'</code> changes the department column to 'Engineering' for the selected rows.
              </p>
            </div>
          </div>

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

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Now that you understand how to create and modify tables with constraints, you'll need data to test your schema. 
            Manually writing INSERT statements for hundreds of rows is tedious and error-prone. This is where AI becomes 
            a powerful productivity tool:
          </p>

          <Callout type="tip" title="AI-Assisted Test Data Generation: Populating Your Database">
            Creating realistic test data is tedious and time-consuming. AI can generate hundreds of INSERT statements that respect all your constraints:

            <div className="space-y-3 mt-3">
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded p-3">
                <p className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">Prompt: Generate Realistic Test Data</p>
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  &quot;Generate 50 realistic INSERT statements for this schema: [paste CREATE TABLE]. Include diverse data: 
                  various names, dates spanning multiple years, realistic prices. Ensure all constraints are satisfied.&quot;
                </p>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded p-3">
                <p className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">Prompt: Generate Edge Case Data</p>
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  &quot;Generate test data specifically for edge cases: NULL values where allowed, boundary values for CHECK constraints, 
                  minimum/maximum dates, empty strings vs NULL. Schema: [paste]&quot;
                </p>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded p-3">
                <p className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">Prompt: Test Foreign Key Relationships</p>
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  &quot;Generate INSERT statements that properly respect foreign key relationships. First insert parents (Sectors), 
                  then children (Companies) with valid SectorID references. Include 10 sectors and 50 companies.&quot;
                </p>
              </div>
            </div>

            <p className="text-sm mt-3">
              <strong>Pro tip:</strong> Ask AI to generate data in waves - first parent tables, then child tables. This ensures 
              foreign key constraints are satisfied. You can also request specific scenarios like &quot;3 companies with no financial 
              statements&quot; to test your application's edge case handling.
            </p>
          </Callout>
        </Subsection>
      </Section>

      <Section id="section5b" title="Understanding Data Types - Choosing the Right Container" level={2}>
        <p>
          Selecting appropriate data types is a critical aspect of database design. Each type has specific 
          storage requirements, performance characteristics, and constraints that affect data integrity.
        </p>

        <Subsection title="Numeric Types">
          <p className="mb-4">
            Choosing the right numeric type affects both storage efficiency and calculation accuracy. Here's a comprehensive comparison:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Storage</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Range/Precision</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Performance</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">INTEGER</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">4 bytes</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">-2.1B to 2.1B</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">⚡ Fastest</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Primary keys, counts, years</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">BIGINT</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">8 bytes</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">±9.2 quintillion</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">⚡ Very fast</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Large datasets, Unix timestamps</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">DECIMAL(p,s)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Variable</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">User-defined (p=total, s=decimal)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">⚙️ Moderate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">💰 Money (exact calculations)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">REAL/FLOAT</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">4 bytes</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">~6-7 digits precision</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">⚡ Fast</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">⚠️ Scientific data (approximations OK)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r">
              <p className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">✅ When to Use INTEGER/BIGINT</p>
              <ul className="text-xs text-green-800 dark:text-green-300 space-y-1">
                <li>• Primary keys and foreign keys</li>
                <li>• Counting items (inventory, users, orders)</li>
                <li>• Year/month values</li>
                <li>• Flags and status codes</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r">
              <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">✅ When to Use DECIMAL</p>
              <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li>• 💰 Money and prices (always!)</li>
                <li>• Tax rates and percentages</li>
                <li>• Any calculation requiring exactness</li>
                <li>• Legal/financial reporting</li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Among these numeric types, the most critical decision you'll make is choosing between DECIMAL and FLOAT for 
            decimal numbers. This choice has profound implications for data accuracy - particularly in financial applications 
            where even tiny rounding errors can compound into significant problems.
          </p>

          <Callout type="warning" title="Critical: Never use FLOAT for money!">
            <p className="mb-2">
              Floating-point types store approximate values using binary representation, which cannot precisely represent most decimal fractions. 
              This leads to accumulating rounding errors in financial calculations.
            </p>
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded p-3 text-xs font-mono mt-2">
              <p className="text-red-900 dark:text-red-100 mb-1">❌ WRONG: FLOAT for prices</p>
              <p>0.1 + 0.2 = 0.30000000000000004 (binary approximation)</p>
              <p className="mt-2 text-red-900 dark:text-red-100">✅ CORRECT: DECIMAL for prices</p>
              <p>0.1 + 0.2 = 0.3 (exact decimal math)</p>
            </div>
            <p className="text-sm mt-2">
              <strong>Rule of thumb:</strong> If you'd use a calculator to add it up, use DECIMAL. If you'd use a scientific calculator, FLOAT is OK.
            </p>
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's see these numeric types in action. The following example demonstrates a product table using different 
            numeric types appropriately: INTEGER for IDs and counts (whole numbers), DECIMAL for prices (exact monetary values), 
            and REAL for weights (where approximation is acceptable):
          </p>

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
          <p className="mb-3">
            Text storage is one of the most common database operations. Understanding the tradeoffs between types helps optimize both storage and query performance:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Storage Behavior</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Max Length</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">CHAR(n)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Fixed, space-padded</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Exactly n chars</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Country codes (US, UK), fixed IDs</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">VARCHAR(n)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Variable length</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Up to n chars</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Names, emails, addresses</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">TEXT</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Unlimited variable</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">~1-2GB (DB dependent)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Articles, descriptions, JSON</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r my-3">
            <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-2">💡 CHAR vs VARCHAR: The Key Difference</p>
            <p className="text-xs text-blue-800 dark:text-blue-300 mb-2">
              <strong>CHAR pads with spaces:</strong> Storing "Hi" in CHAR(5) uses 5 bytes ("Hi   ").  
              <strong>VARCHAR stores actual length:</strong> "Hi" in VARCHAR(5) uses ~2 bytes.
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>Modern practice:</strong> Use VARCHAR for almost everything. CHAR only makes sense for truly fixed-length data like state codes or single-character fields.
            </p>
          </div>
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

          <p className="mt-4">
            SQL provides powerful functions for working with dates. Let's learn the key ones before we use them:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3 space-y-3">
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">DATE()</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>DATE() function</strong> extracts or formats dates. <code>DATE('now')</code> returns today's date 
                in YYYY-MM-DD format. You can also use it to extract just the date from a timestamp.
              </p>
            </div>
            <div>
              <code className="text-cyan-600 dark:text-cyan-400 font-semibold">JULIANDAY()</code>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                The <strong>JULIANDAY() function</strong> converts a date to the Julian Day number (days since noon on 
                November 24, 4714 BC). This is useful for date arithmetic - to find days between dates, subtract their 
                Julian Day numbers: <code>JULIANDAY(date2) - JULIANDAY(date1)</code>
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Let's put these date functions to work. The following playground demonstrates storing dates, using <code>CURRENT_TIMESTAMP</code> 
            for automatic timestamps, and calculating date differences. Try experimenting with the date functions to see how 
            date arithmetic works in SQL:
          </p>

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

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            This three-valued logic concept can be confusing at first because it differs from how we typically think about 
            true/false logic in everyday situations. To make this more intuitive, consider a real-world scenario:
          </p>

          <Callout type="tip" title="Analogy: The Unanswered Question">
            NULL is like an unanswered question on a survey. Imagine a form asking "What is your favorite ice cream flavor?" 
            If someone writes "chocolate," that's a value. If someone writes "I don't like ice cream," that's also a value 
            (even though it's negative). But if someone leaves it blank, that's NULL - you don't know if they forgot to answer, 
            don't have a favorite, or haven't tried ice cream yet. The absence of an answer is fundamentally different from 
            any answer. This is why <code>favorite_flavor = NULL</code> doesn't make sense - you can't compare something to 
            "unknown." Instead, you must ask <code>IS favorite_flavor NULL?</code> - "Was this question left unanswered?" 
            This is SQL's three-valued logic: TRUE, FALSE, and "I don't know" (UNKNOWN/NULL).
          </Callout>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Understanding NULL behavior is crucial because it's counterintuitive. Let's explore how NULL works in practice 
            with a simple users table. Notice how <code>email = NULL</code> doesn't work as you might expect - it always 
            returns NULL, not TRUE or FALSE. You must use <code>IS NULL</code> or <code>IS NOT NULL</code> instead:
          </p>

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
            </ul>
          </Callout>

          <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Handling NULL Values: The COALESCE Function
          </p>

          <p className="mt-3">
            Often you need to provide a fallback value when a column is NULL. SQL provides the COALESCE function for this:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded p-4 my-3">
            <code className="text-cyan-600 dark:text-cyan-400 font-semibold">COALESCE()</code>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              The <strong>COALESCE() function</strong> returns the first non-NULL value from a list of arguments.{' '}
              <code>COALESCE(column, 'default')</code> returns the column value if it's not NULL, otherwise returns 'default'.
              <br/>You can provide multiple fallbacks: <code>COALESCE(email, phone, 'No contact info')</code>
              <br/><strong>Example:</strong> <code>SELECT username, COALESCE(email, 'No email provided') AS contact FROM users;</code>
            </p>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Here's a practical example showing how COALESCE helps display user-friendly information instead of NULL values. 
            The contacts table has optional email and phone fields - COALESCE lets us provide sensible defaults when these 
            fields are missing, and even cascade through multiple fallback options:
          </p>

          <SQLPlayground
            preset={EMPTY_PRESET}
            defaultQuery={`-- Using COALESCE to handle NULLs
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT
);

INSERT INTO contacts (id, name, email, phone) VALUES
  (1, 'Alice', 'alice@example.com', '555-0101'),
  (2, 'Bob', NULL, '555-0102'),
  (3, 'Charlie', 'charlie@example.com', NULL),
  (4, 'Diana', NULL, NULL);

-- Show fallback values for missing data
SELECT
  name,
  COALESCE(email, 'No email') AS email_display,
  COALESCE(phone, 'No phone') AS phone_display,
  COALESCE(email, phone, 'No contact info') AS preferred_contact
FROM contacts;`}
          />
        </Subsection>
      </Section>

      <Section id="part2-practice" title="Practice Challenge: Design a University Database" level={2}>
        <p>
          Now it's time to apply everything you've learned! Design a complete database for a university course registration system, 
          following all normalization rules and applying appropriate constraints. You'll create an ERD (if you need a refresher, see{' '}
          <a 
            href="#section5" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Part I: Entity-Relationship Diagrams
          </a>) 
          and implement it with proper SQL.
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 p-5 rounded-r my-4">
          <p className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3 text-lg">📚 Scenario: University Course Management</p>
          <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-3">
            Pacific University needs a database to manage students, professors, courses, and enrollments. Here are the business requirements:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-indigo-800 dark:text-indigo-300">
            <li><strong>Students:</strong> Student ID (unique), email (unique), full name (required), enrollment date, GPA (0.0-4.0)</li>
            <li><strong>Professors:</strong> Professor ID (unique), email (unique), full name (required), department, hire date, salary (positive)</li>
            <li><strong>Courses:</strong> Course code (unique, e.g., "CS101"), course name (required), credits (1-5), department</li>
            <li><strong>Enrollments:</strong> Track which student is in which course, taught by which professor, with a grade (A/B/C/D/F or NULL if not yet graded)</li>
            <li><strong>Business Rules:</strong> 
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>A course can have many students (one-to-many via enrollments)</li>
                <li>A student can enroll in many courses (many-to-many)</li>
                <li>Each course section is taught by exactly one professor</li>
                <li>Grades must be one of: 'A', 'B', 'C', 'D', 'F', or NULL (not yet graded)</li>
                <li>GPA must be between 0.0 and 4.0</li>
                <li>Credits must be between 1 and 5</li>
              </ul>
            </li>
          </ul>
        </div>

        <p className="mt-4 font-semibold">
          ✏️ Your Task: Before looking at the solution, try to:
        </p>
        <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Identify all entities (tables) needed</li>
          <li>Determine relationships between entities</li>
          <li>Choose appropriate primary keys (surrogate vs natural)</li>
          <li>Identify all constraints (NOT NULL, UNIQUE, CHECK, FOREIGN KEY)</li>
          <li>Ensure the design is in 3NF</li>
        </ol>

        <details className="mt-6 bg-green-50 dark:bg-green-950/20 border-2 border-green-400 dark:border-green-600 rounded-lg p-5">
          <summary className="font-semibold text-green-900 dark:text-green-100 cursor-pointer text-lg hover:text-green-700 dark:hover:text-green-300">
            💡 Click to Show Solution ERD
          </summary>
          <div className="mt-4">
            <MermaidDiagram
              caption="University Database Solution: A properly normalized 3NF design with junction table for many-to-many relationships"
              chart={`
erDiagram
    STUDENTS ||--o{ ENROLLMENTS : "enrolls in"
    PROFESSORS ||--o{ ENROLLMENTS : "teaches"
    COURSES ||--o{ ENROLLMENTS : "has"
    
    STUDENTS {
        int StudentID PK
        varchar Email "UNIQUE NOT NULL"
        varchar FullName "NOT NULL"
        date EnrollmentDate
        decimal GPA "CHECK 0.0-4.0"
    }
    
    PROFESSORS {
        int ProfessorID PK
        varchar Email "UNIQUE NOT NULL"
        varchar FullName "NOT NULL"
        varchar Department
        date HireDate
        decimal Salary "CHECK &gt; 0"
    }
    
    COURSES {
        varchar CourseCode PK "e.g., CS101"
        varchar CourseName "NOT NULL"
        int Credits "CHECK 1-5"
        varchar Department
    }
    
    ENROLLMENTS {
        int EnrollmentID PK
        int StudentID FK
        varchar CourseCode FK
        int ProfessorID FK
        char Grade "CHECK IN (A,B,C,D,F) or NULL"
        int Semester
        int Year
    }
              `}
            />
          </div>
        </details>

        <details className="mt-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-400 dark:border-blue-600 rounded-lg p-5">
          <summary className="font-semibold text-blue-900 dark:text-blue-100 cursor-pointer text-lg hover:text-blue-700 dark:hover:text-blue-300">
            🔨 Click to Show Complete SQL Implementation
          </summary>
          <div className="mt-4">
            <SQLPlayground
              preset={EMPTY_PRESET}
              defaultQuery={`-- University Database: Complete Implementation
-- Step 1: Create all tables with constraints

CREATE TABLE Students (
  StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
  Email TEXT UNIQUE NOT NULL,
  FullName TEXT NOT NULL,
  EnrollmentDate DATE DEFAULT CURRENT_TIMESTAMP,
  GPA DECIMAL(3, 2) CHECK (GPA >= 0.0 AND GPA <= 4.0)
);

CREATE TABLE Professors (
  ProfessorID INTEGER PRIMARY KEY AUTOINCREMENT,
  Email TEXT UNIQUE NOT NULL,
  FullName TEXT NOT NULL,
  Department TEXT,
  HireDate DATE,
  Salary DECIMAL(10, 2) CHECK (Salary > 0)
);

CREATE TABLE Courses (
  CourseCode TEXT PRIMARY KEY,
  CourseName TEXT NOT NULL,
  Credits INTEGER CHECK (Credits >= 1 AND Credits <= 5),
  Department TEXT
);

CREATE TABLE Enrollments (
  EnrollmentID INTEGER PRIMARY KEY AUTOINCREMENT,
  StudentID INTEGER NOT NULL,
  CourseCode TEXT NOT NULL,
  ProfessorID INTEGER NOT NULL,
  Grade CHAR(1) CHECK (Grade IN ('A', 'B', 'C', 'D', 'F')),
  Semester INTEGER CHECK (Semester IN (1, 2, 3)),
  Year INTEGER,
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode),
  FOREIGN KEY (ProfessorID) REFERENCES Professors(ProfessorID)
);

-- Step 2: Insert sample data
INSERT INTO Students (Email, FullName, GPA) VALUES
  ('alice@pacific.edu', 'Alice Johnson', 3.8),
  ('bob@pacific.edu', 'Bob Smith', 3.2),
  ('carol@pacific.edu', 'Carol Williams', 3.9);

INSERT INTO Professors (Email, FullName, Department, Salary) VALUES
  ('dr.chen@pacific.edu', 'Dr. James Chen', 'Computer Science', 95000),
  ('dr.patel@pacific.edu', 'Dr. Priya Patel', 'Mathematics', 88000);

INSERT INTO Courses (CourseCode, CourseName, Credits, Department) VALUES
  ('CS101', 'Introduction to Programming', 4, 'Computer Science'),
  ('CS201', 'Data Structures', 4, 'Computer Science'),
  ('MATH101', 'Calculus I', 4, 'Mathematics');

INSERT INTO Enrollments (StudentID, CourseCode, ProfessorID, Grade, Semester, Year) VALUES
  (1, 'CS101', 1, 'A', 1, 2024),
  (1, 'MATH101', 2, 'B', 1, 2024),
  (2, 'CS101', 1, 'B', 1, 2024),
  (3, 'CS201', 1, NULL, 2, 2024);

-- Step 3: Query the data
SELECT 
  s.FullName AS Student,
  c.CourseName AS Course,
  p.FullName AS Professor,
  e.Grade
FROM Enrollments e
JOIN Students s ON e.StudentID = s.StudentID
JOIN Courses c ON e.CourseCode = c.CourseCode
JOIN Professors p ON e.ProfessorID = p.ProfessorID
ORDER BY s.FullName, c.CourseName;`}
            />
          </div>
        </details>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded">
          <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">🎯 Mini Challenges (Try These!):</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-amber-800 dark:text-amber-300">
            <li><strong>Add a constraint:</strong> Modify ENROLLMENTS so the same student can't enroll in the same course twice in the same semester/year (hint: composite UNIQUE constraint)</li>
            <li><strong>Query challenge:</strong> Write a query to find all students with GPA above 3.5 who are enrolled in Computer Science courses</li>
            <li><strong>Data integrity test:</strong> Try to insert a student with GPA of 5.0. What happens? Why?</li>
            <li><strong>Normalization check:</strong> Is this schema in 3NF? Verify that there are no transitive dependencies</li>
          </ol>
        </div>

        <Callout type="tip" title="AI-Assisted Practice: Level Up Your Skills">
          <p className="mb-2">Use AI to extend this exercise and deepen your understanding:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>&quot;Add a prerequisite system: some courses require completion of other courses first. Modify the schema to support this.&quot;</li>
            <li>&quot;Generate 100 realistic enrollments for this schema, ensuring no constraint violations.&quot;</li>
            <li>&quot;Add a waitlist feature: students can be on a waitlist for full courses. Design the tables and relationships.&quot;</li>
            <li>&quot;Convert this schema to [your favorite ORM framework] while preserving all constraints.&quot;</li>
          </ul>
        </Callout>
      </Section>

      <Section id="part2-conclusion" title="Bringing It All Together: The Data Integrity Checklist" level={2}>
        <p>
          You've now mastered the two pillars of data integrity: <strong>normalization</strong> (the theoretical framework 
          for organizing data) and <strong>constraints</strong> (the practical enforcement mechanisms). Before we move to 
          Part III where we'll learn advanced SQL querying, let's consolidate what you've learned with a practical checklist.
        </p>

        <div className="my-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">
            The Database Design Checklist
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Step 1: Normalization (Design Phase)</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-5 list-disc">
                <li>Is every column atomic? (1NF)</li>
                <li>Do all non-key columns depend on the entire primary key? (2NF)</li>
                <li>Are there any transitive dependencies? (3NF)</li>
                <li>Have you used surrogate keys where appropriate?</li>
                <li>Is your ERD clear and does it match your business domain?</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Step 2: Entity Integrity (Implementation)</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-5 list-disc">
                <li>Does every table have a PRIMARY KEY?</li>
                <li>Are natural keys enforced with UNIQUE constraints?</li>
                <li>Are you using AUTO INCREMENT or UUID for surrogate keys?</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Step 3: Domain Integrity (Data Validation)</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-5 list-disc">
                <li>Are required columns marked NOT NULL?</li>
                <li>Do numeric columns have appropriate ranges (CHECK constraints)?</li>
                <li>Are default values specified where sensible?</li>
                <li>Have you chosen the right data types for each column?</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Step 4: Referential Integrity (Relationships)</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-5 list-disc">
                <li>Are all foreign keys properly defined with FOREIGN KEY constraints?</li>
                <li>Have you specified appropriate cascading actions (CASCADE, SET NULL, RESTRICT)?</li>
                <li>Are your many-to-many relationships implemented with junction tables?</li>
              </ul>
            </div>
          </div>
        </div>

        <Callout type="success" title="The Path Forward">
          You've now completed the foundational knowledge needed to design robust, maintainable databases. You understand:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Why</strong> data integrity matters (eliminating anomalies, preventing corruption)</li>
            <li><strong>How</strong> to achieve it through normalization (1NF, 2NF, 3NF, BCNF)</li>
            <li><strong>What</strong> tools enforce it (PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE, NOT NULL)</li>
            <li><strong>When</strong> to denormalize (only after measuring performance, never by default)</li>
          </ul>
          <p className="mt-3">
            In Part III, we'll build on this foundation to master SQL querying - learning how to extract insights from 
            your beautifully structured, integrity-protected data through JOINs, aggregations, subqueries, and window functions.
          </p>
        </Callout>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Congratulations on Completing Part II!
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You've mastered one of the most important - yet often overlooked - aspects of database development. Many developers 
            rush to write queries without understanding data integrity, leading to corrupt databases and countless hours debugging 
            mysterious data inconsistencies. By understanding normalization and constraints, you're equipped to build systems 
            that remain reliable as they scale from thousands to millions of records.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
            <strong>Remember:</strong> Good database design is like good architecture - it's invisible when done right, 
            but catastrophic when done wrong. The time you invest in proper normalization and constraints pays dividends 
            for the entire lifetime of your application.
          </p>
        </div>
      </Section>
    </>
  );
}

