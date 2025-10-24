import initSqlJs from 'sql.js';
import type { SqlJsStatic } from 'sql.js';

let SQL: SqlJsStatic | null = null;
let initPromise: Promise<SqlJsStatic> | null = null;

/**
 * Initialize sql.js library
 * Returns a singleton instance to avoid loading WASM multiple times
 */
export async function initializeSqlJs(): Promise<SqlJsStatic> {
  if (SQL) {
    return SQL;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = initSqlJs({
    locateFile: (file: string) => {
      // Get the base path from the document's base URL or use root
      const base = document.querySelector('base')?.href || window.location.origin + import.meta.env.BASE_URL;
      return new URL(file, base).href;
    },
  }).then((sql) => {
    SQL = sql;
    return sql;
  });

  return initPromise;
}

/**
 * Get the initialized SQL instance
 * Throws error if not initialized yet
 */
export function getSqlJs(): SqlJsStatic {
  if (!SQL) {
    throw new Error('SQL.js not initialized. Call initializeSqlJs() first.');
  }
  return SQL;
}

