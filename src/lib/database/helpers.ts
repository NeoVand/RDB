import type { Database } from 'sql.js';
import type { DatabasePreset } from '../../types/database';

/**
 * Initialize a database with a given preset
 */
export async function createDatabaseFromPreset(
  SQL: { Database: new (data?: ArrayLike<number>) => Database },
  preset: DatabasePreset
): Promise<Database> {
  const db = new SQL.Database();

  try {
    // Execute all schema creation functions
    preset.schemas.forEach((schemaFn) => {
      schemaFn(db);
    });

    // Execute all seed data functions
    preset.seeds.forEach((seedFn) => {
      seedFn(db);
    });

    return db;
  } catch (error) {
    db.close();
    throw error;
  }
}

/**
 * Get all tables in the database
 */
export function getDatabaseTables(db: Database): string[] {
  try {
    const result = db.exec(`
      SELECT name 
      FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);

    if (!result.length || !result[0].values.length) {
      return [];
    }

    return result[0].values.map((row) => String(row[0]));
  } catch (err) {
    console.error('Error fetching tables:', err);
    return [];
  }
}

/**
 * Get schema information for a specific table
 */
export function getTableSchema(db: Database, tableName: string) {
  try {
    const result = db.exec(`PRAGMA table_info(${tableName})`);
    
    if (!result.length) {
      return [];
    }

    return result[0].values.map((col) => ({
      cid: col[0],
      name: String(col[1]),
      type: String(col[2]),
      notNull: Boolean(col[3]),
      defaultValue: col[4],
      pk: Boolean(col[5]),
    }));
  } catch (err) {
    console.error(`Error fetching schema for ${tableName}:`, err);
    return [];
  }
}

