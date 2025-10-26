import { useMemo, useEffect, useRef } from 'react';
import type { Database } from 'sql.js';
import { useTheme } from '../../hooks/useTheme';
import mermaid from 'mermaid';

interface SchemaViewerProps {
  db: Database;
  dataVersion: number;
}

export function SchemaViewer({ db, dataVersion }: SchemaViewerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const mermaidERD = useMemo(() => {
    try {
      const tables = db.exec(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
      `);

      if (!tables.length || !tables[0].values.length) {
        return '';
      }

      // Configure Mermaid for compact horizontal layout
      // Use standard themes and override colors via CSS
      const themeConfig = isDark ? 'dark' : 'neutral';
      let erd = `%%{init: {'theme':'${themeConfig}', 'themeVariables': {'fontSize':'10px'}}}%%\n`;
      erd += 'erDiagram\n';
      erd += '  direction LR\n';
      const tableNames = tables[0].values.map(([name]) => String(name));

      // Helper function to sanitize type names for Mermaid
      const sanitizeType = (type: string): string => {
        if (!type) return 'ANY';
        // Remove parentheses and their contents (e.g., DECIMAL(10,2) -> DECIMAL)
        const baseType = type.split('(')[0].trim().toUpperCase();
        // Map common types to simple names
        const typeMap: Record<string, string> = {
          'INTEGER': 'int',
          'TEXT': 'string',
          'REAL': 'float',
          'BLOB': 'blob',
          'NUMERIC': 'numeric',
          'DECIMAL': 'decimal',
          'VARCHAR': 'string',
          'CHAR': 'string',
          'BOOLEAN': 'bool',
          'DATE': 'date',
          'DATETIME': 'datetime',
          'TIMESTAMP': 'timestamp',
          'BIGINT': 'bigint',
        };
        return typeMap[baseType] || baseType.toLowerCase();
      };

      // Helper function to sanitize column names
      const sanitizeColumnName = (name: string): string => {
        // Replace spaces and special characters with underscores
        return name.replace(/[^a-zA-Z0-9_]/g, '_');
      };

      // Get column info and foreign keys for each table
      tableNames.forEach((tableName) => {
        const columnInfo = db.exec(`PRAGMA table_info(${tableName})`);
        const foreignKeys = db.exec(`PRAGMA foreign_key_list(${tableName})`);

        if (columnInfo.length) {
          erd += `  ${tableName} {\n`;
          columnInfo[0].values.forEach((col) => {
            const rawName = String(col[1]);
            const rawType = String(col[2]);
            const pk = col[5] === 1;
            
            const name = sanitizeColumnName(rawName);
            const type = sanitizeType(rawType);
            const pkMarker = pk ? ' PK' : '';
            
            erd += `    ${type} ${name}${pkMarker}\n`;
          });
          erd += '  }\n';
        }

        // Add relationships
        if (foreignKeys.length) {
          foreignKeys[0].values.forEach((fk) => {
            const toTable = String(fk[2]);
            // One-to-many relationship (parent can have many children)
            erd += `  ${toTable} ||--o{ ${tableName} : "has"\n`;
          });
        }
      });

      return erd;
    } catch (err) {
      console.error('Error generating ERD:', err);
      return '';
    }
  }, [db, dataVersion, isDark]);

  useEffect(() => {
    if (mermaidERD && containerRef.current) {
      // Clear the container and recreate the pre element to force re-render
      const container = containerRef.current.querySelector('.mermaid-container');
      if (container) {
        container.innerHTML = '';
        const pre = document.createElement('pre');
        pre.className = 'mermaid';
        pre.textContent = mermaidERD;
        container.appendChild(pre);

        // Re-initialize and render
        mermaid.initialize({ 
          startOnLoad: false,
          fontSize: 10,
        });
        mermaid.run({
          nodes: [pre],
        });
      }
    }
  }, [mermaidERD, isDark]);

  if (!mermaidERD) {
    return (
      <div className={`px-3 py-2 border-b ${
        isDark 
          ? 'bg-gray-900 border-gray-700 text-gray-400' 
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <p className="text-xs">No tables in database</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`px-3 py-2 border-b ${
        isDark 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <style>{`
        .mermaid-container svg {
          max-height: 350px;
          font-size: 10px !important;
        }
        .mermaid-container .er.entityBox {
          font-size: 10px !important;
        }
        .mermaid-container .er.attributeBoxOdd,
        .mermaid-container .er.attributeBoxEven {
          font-size: 9px !important;
        }
        .mermaid-container text {
          font-size: 10px !important;
        }
        /* Subtle color adjustments to match playground theme */
        ${isDark ? `
          /* Dark mode - adjust to blue tones */
          .mermaid-container .er.entityBox {
            fill: #1e3a5f !important;
          }
          .mermaid-container line,
          .mermaid-container path {
            stroke: #60a5fa !important;
          }
        ` : `
          /* Light mode - add subtle shading */
          .mermaid-container .er.entityBox {
            fill: #dbeafe !important;
          }
          .mermaid-container .er.attributeBoxOdd {
            fill: #f8fafc !important;
          }
          .mermaid-container line,
          .mermaid-container path {
            stroke: #2563eb !important;
          }
        `}
      `}</style>
      <div className="mermaid-container">
        <pre className="mermaid">{mermaidERD}</pre>
      </div>
    </div>
  );
}
