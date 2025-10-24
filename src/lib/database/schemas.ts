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

// ============================================================================
// E-COMMERCE DATABASE SCHEMAS
// ============================================================================

/**
 * Create customers table for e-commerce example
 */
export function createCustomersTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

/**
 * Create products table for e-commerce example
 */
export function createProductsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY,
      product_name TEXT NOT NULL,
      category TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INTEGER DEFAULT 0
    );
  `);
}

/**
 * Create orders table for e-commerce example
 */
export function createOrdersTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount DECIMAL(10, 2),
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
  `);
}

/**
 * Create order_items table for e-commerce example
 */
export function createOrderItemsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      order_item_id INTEGER PRIMARY KEY,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `);
}

// ============================================================================
// UNIVERSITY DATABASE SCHEMAS
// ============================================================================

/**
 * Create professors table for university example
 */
export function createProfessorsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS professors (
      professor_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      email TEXT UNIQUE,
      hire_date DATE
    );
  `);
}

/**
 * Create courses table for university example
 */
export function createCoursesTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      course_id INTEGER PRIMARY KEY,
      course_code TEXT UNIQUE NOT NULL,
      course_name TEXT NOT NULL,
      credits INTEGER NOT NULL,
      professor_id INTEGER,
      FOREIGN KEY (professor_id) REFERENCES professors(professor_id)
    );
  `);
}

/**
 * Create university students table (different from enrollment example)
 */
export function createUniversityStudentsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS university_students (
      student_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      major TEXT,
      enrollment_year INTEGER
    );
  `);
}

/**
 * Create registrations table for university example
 */
export function createRegistrationsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      registration_id INTEGER PRIMARY KEY,
      student_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      semester TEXT NOT NULL,
      grade TEXT,
      FOREIGN KEY (student_id) REFERENCES university_students(student_id),
      FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );
  `);
}

