import type { Database } from 'sql.js';

export interface QueryResult {
  columns: string[];
  values: (string | number | null | Uint8Array)[][];
}

export interface DatabasePreset {
  name: string;
  description: string;
  schemas: ((db: Database) => void)[];
  seeds: ((db: Database) => void)[];
}

export interface TableSchema {
  name: string;
  columns: {
    name: string;
    type: string;
  }[];
}

