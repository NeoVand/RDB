import type { Database } from 'sql.js';

/**
 * Seed Sectors table with sample data
 */
export function seedSectors(db: Database): void {
  db.run(`
    INSERT INTO Sectors (SectorID, SectorName) VALUES
      (1, 'Technology'),
      (2, 'Financial Services'),
      (3, 'Healthcare'),
      (4, 'Energy');
  `);
}

/**
 * Seed Companies table with sample data
 */
export function seedCompanies(db: Database): void {
  db.run(`
    INSERT INTO Companies (CompanyID, CompanyName, StockTicker, SectorID) VALUES
      (101, 'Apple Inc.', 'AAPL', 1),
      (102, 'Microsoft Corp.', 'MSFT', 1),
      (103, 'NVIDIA Corp.', 'NVDA', 1),
      (104, 'JPMorgan Chase', 'JPM', 2),
      (105, 'Goldman Sachs', 'GS', 2);
  `);
}

/**
 * Seed Financial_Statements table with sample data
 */
export function seedFinancialStatements(db: Database): void {
  db.run(`
    INSERT INTO Financial_Statements (StatementID, Year, ReportType, CompanyID) VALUES
      (1, 2024, '10-K', 101),
      (2, 2024, '10-K', 102),
      (3, 2024, '10-K', 103),
      (4, 2023, '10-K', 101),
      (5, 2023, '10-K', 102);
  `);
}

/**
 * Seed Line_Items table with sample data
 */
export function seedLineItems(db: Database): void {
  db.run(`
    INSERT INTO Line_Items (LineItemID, ItemName, Value, StatementID) VALUES
      (1, 'Revenue', 383290000000, 1),
      (2, 'Net Income', 97000000000, 1),
      (3, 'Operating Expenses', 55000000000, 1),
      (4, 'Revenue', 211920000000, 2),
      (5, 'Net Income', 72360000000, 2),
      (6, 'Operating Expenses', 65000000000, 2),
      (7, 'Revenue', 60920000000, 3),
      (8, 'Net Income', 29760000000, 3),
      (9, 'Revenue', 394328000000, 4),
      (10, 'Net Income', 96995000000, 4);
  `);
}

/**
 * Seed test table with sample data
 */
export function seedTestTable(db: Database): void {
  db.run(`
    INSERT INTO test (id, name, value) VALUES
      (1, 'First', 100),
      (2, 'Second', 200),
      (3, 'Third', 300);
  `);
}

/**
 * Seed employees table with sample data
 */
export function seedEmployees(db: Database): void {
  db.run(`
    INSERT INTO employees (name, department, salary, hire_date) VALUES
      ('Alice Smith', 'Engineering', 85000, '2020-01-15'),
      ('Bob Johnson', 'Marketing', 72000, '2019-03-20'),
      ('Carol Williams', 'Engineering', 92000, '2018-11-07'),
      ('Dave Brown', 'Finance', 115000, '2017-05-12'),
      ('Eve Davis', 'Engineering', 110000, '2021-08-30');
  `);
}

/**
 * Seed users table for blog app example
 */
export function seedUsers(db: Database): void {
  db.run(`
    INSERT INTO users (username, email, password_hash, created_at) VALUES
      ('alice', 'alice@example.com', 'hash1', '2022-01-10'),
      ('bob', 'bob@example.com', 'hash2', '2022-01-15'),
      ('carol', 'carol@example.com', 'hash3', '2022-02-20');
  `);
}

/**
 * Seed posts table for blog app example
 */
export function seedPosts(db: Database): void {
  db.run(`
    INSERT INTO posts (user_id, title, content, published, created_at) VALUES
      (1, 'First Post', 'This is my first post content', 1, '2022-01-12'),
      (1, 'Second Post', 'This is another post by Alice', 1, '2022-01-18'),
      (2, 'Hello World', 'Bob''s first post content', 1, '2022-01-20'),
      (3, 'Introduction', 'Hello from Carol', 1, '2022-02-25'),
      (2, 'Draft Post', 'This is a draft', 0, '2022-02-28');
  `);
}

/**
 * Seed comments table for blog app example
 */
export function seedComments(db: Database): void {
  db.run(`
    INSERT INTO comments (post_id, user_id, content, created_at) VALUES
      (1, 2, 'Great post!', '2022-01-13'),
      (1, 3, 'I agree with Bob', '2022-01-14'),
      (3, 1, 'Welcome Bob!', '2022-01-21'),
      (4, 2, 'Nice to meet you Carol', '2022-02-26');
  `);
}

/**
 * Seed students table for many-to-many example
 */
export function seedStudents(db: Database): void {
  db.run(`
    INSERT INTO students (StudentID, StudentName) VALUES
      (1, 'John Doe'),
      (2, 'Jane Smith'),
      (3, 'Mike Johnson');
  `);
}

/**
 * Seed classes table for many-to-many example
 */
export function seedClasses(db: Database): void {
  db.run(`
    INSERT INTO classes (ClassID, ClassName) VALUES
      (1, 'Mathematics'),
      (2, 'Computer Science'),
      (3, 'Physics');
  `);
}

/**
 * Seed enrollment table for many-to-many example
 */
export function seedEnrollment(db: Database): void {
  db.run(`
    INSERT INTO enrollment (StudentID, ClassID, Grade, EnrollmentDate) VALUES
      (1, 1, 'A', '2024-01-15'),
      (1, 2, 'B+', '2024-01-15'),
      (2, 1, 'A-', '2024-01-15'),
      (2, 3, 'B', '2024-01-15'),
      (3, 2, 'A', '2024-01-15'),
      (3, 3, 'A-', '2024-01-15');
  `);
}

