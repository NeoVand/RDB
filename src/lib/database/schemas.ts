import type { Database } from 'sql.js';

/**
 * Create Sectors table
 * Represents different business sectors (Technology, Finance, etc.)
 */
export function createSectorsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS Sectors (
      SectorID INTEGER PRIMARY KEY,
      SectorName TEXT NOT NULL UNIQUE
    );
  `);
}

/**
 * Create Companies table
 * Represents companies with foreign key to Sectors
 */
export function createCompaniesTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS Companies (
      CompanyID INTEGER PRIMARY KEY,
      CompanyName TEXT NOT NULL,
      StockTicker TEXT UNIQUE,
      SectorID INTEGER,
      FOREIGN KEY (SectorID) REFERENCES Sectors(SectorID)
    );
  `);
}

/**
 * Create Financial_Statements table
 * Represents annual/quarterly financial filings
 */
export function createFinancialStatementsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS Financial_Statements (
      StatementID INTEGER PRIMARY KEY,
      Year INTEGER NOT NULL,
      ReportType TEXT NOT NULL,
      CompanyID INTEGER NOT NULL,
      FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
    );
  `);
}

/**
 * Create Line_Items table
 * Represents individual line items in financial statements
 */
export function createLineItemsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS Line_Items (
      LineItemID INTEGER PRIMARY KEY,
      ItemName TEXT NOT NULL,
      Value DECIMAL(15, 2),
      StatementID INTEGER NOT NULL,
      FOREIGN KEY (StatementID) REFERENCES Financial_Statements(StatementID)
    );
  `);
}

/**
 * Create a simple test table for basic examples
 */
export function createTestTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      value INTEGER
    );
  `);
}

/**
 * Create employees table for examples
 */
export function createEmployeesTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT,
      salary NUMERIC,
      hire_date DATE
    );
  `);
}

/**
 * Create users table for blog app example
 */
export function createUsersTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

/**
 * Create posts table for blog app example
 */
export function createPostsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      published BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

/**
 * Create comments table for blog app example
 */
export function createCommentsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

/**
 * Create students table for many-to-many example
 */
export function createStudentsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      StudentID INTEGER PRIMARY KEY,
      StudentName TEXT NOT NULL
    );
  `);
}

/**
 * Create classes table for many-to-many example
 */
export function createClassesTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS classes (
      ClassID INTEGER PRIMARY KEY,
      ClassName TEXT NOT NULL
    );
  `);
}

/**
 * Create enrollment junction table for many-to-many example
 */
export function createEnrollmentTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollment (
      StudentID INTEGER NOT NULL,
      ClassID INTEGER NOT NULL,
      Grade TEXT,
      EnrollmentDate DATE,
      PRIMARY KEY (StudentID, ClassID),
      FOREIGN KEY (StudentID) REFERENCES students(StudentID),
      FOREIGN KEY (ClassID) REFERENCES classes(ClassID)
    );
  `);
}

