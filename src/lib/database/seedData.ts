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

// ============================================================================
// E-COMMERCE DATABASE SEED DATA
// ============================================================================

export function seedCustomers(db: Database): void {
  db.run(`
    INSERT INTO customers (customer_id, email, first_name, last_name) VALUES
      (1, 'john.doe@example.com', 'John', 'Doe'),
      (2, 'jane.smith@example.com', 'Jane', 'Smith'),
      (3, 'bob.johnson@example.com', 'Bob', 'Johnson'),
      (4, 'alice.williams@example.com', 'Alice', 'Williams'),
      (5, 'charlie.brown@example.com', 'Charlie', 'Brown');
  `);
}

export function seedProducts(db: Database): void {
  db.run(`
    INSERT INTO products (product_id, product_name, category, price, stock_quantity) VALUES
      (1, 'Laptop Pro 15', 'Electronics', 1299.99, 25),
      (2, 'Wireless Mouse', 'Electronics', 29.99, 150),
      (3, 'USB-C Cable', 'Accessories', 12.99, 200),
      (4, 'Office Chair', 'Furniture', 249.99, 45),
      (5, 'Desk Lamp', 'Furniture', 39.99, 80),
      (6, 'Notebook Set', 'Stationery', 15.99, 120),
      (7, 'Wireless Keyboard', 'Electronics', 79.99, 60);
  `);
}

export function seedOrders(db: Database): void {
  db.run(`
    INSERT INTO orders (order_id, customer_id, order_date, total_amount, status) VALUES
      (1, 1, '2024-01-15 10:30:00', 1342.97, 'shipped'),
      (2, 2, '2024-01-16 14:20:00', 29.99, 'delivered'),
      (3, 1, '2024-01-18 09:15:00', 52.98, 'pending'),
      (4, 3, '2024-01-20 16:45:00', 289.98, 'shipped'),
      (5, 4, '2024-01-22 11:00:00', 1299.99, 'processing');
  `);
}

export function seedOrderItems(db: Database): void {
  db.run(`
    INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price) VALUES
      (1, 1, 1, 1, 1299.99),
      (2, 1, 3, 2, 12.99),
      (3, 1, 2, 1, 29.99),
      (4, 2, 2, 1, 29.99),
      (5, 3, 3, 2, 12.99),
      (6, 3, 6, 1, 15.99),
      (7, 4, 4, 1, 249.99),
      (8, 4, 5, 1, 39.99),
      (9, 5, 1, 1, 1299.99);
  `);
}

// ============================================================================
// UNIVERSITY DATABASE SEED DATA
// ============================================================================

export function seedProfessors(db: Database): void {
  db.run(`
    INSERT INTO professors (professor_id, name, department, email, hire_date) VALUES
      (1, 'Dr. Sarah Johnson', 'Computer Science', 's.johnson@university.edu', '2015-08-20'),
      (2, 'Dr. Michael Chen', 'Computer Science', 'm.chen@university.edu', '2018-01-15'),
      (3, 'Dr. Emily Rodriguez', 'Mathematics', 'e.rodriguez@university.edu', '2012-09-01'),
      (4, 'Dr. David Kim', 'Physics', 'd.kim@university.edu', '2019-02-10'),
      (5, 'Dr. Lisa Anderson', 'Chemistry', 'l.anderson@university.edu', '2016-06-01');
  `);
}

export function seedCourses(db: Database): void {
  db.run(`
    INSERT INTO courses (course_id, course_code, course_name, credits, professor_id) VALUES
      (1, 'CS101', 'Introduction to Programming', 4, 1),
      (2, 'CS201', 'Data Structures', 4, 2),
      (3, 'CS301', 'Database Systems', 3, 1),
      (4, 'MATH101', 'Calculus I', 4, 3),
      (5, 'MATH201', 'Linear Algebra', 3, 3),
      (6, 'PHYS101', 'Physics I', 4, 4),
      (7, 'CHEM101', 'General Chemistry', 4, 5);
  `);
}

export function seedUniversityStudents(db: Database): void {
  db.run(`
    INSERT INTO university_students (student_id, name, email, major, enrollment_year) VALUES
      (1, 'Alex Turner', 'a.turner@student.edu', 'Computer Science', 2022),
      (2, 'Emma Davis', 'e.davis@student.edu', 'Computer Science', 2023),
      (3, 'Ryan Martinez', 'r.martinez@student.edu', 'Mathematics', 2022),
      (4, 'Sophia Lee', 's.lee@student.edu', 'Physics', 2021),
      (5, 'Noah Wilson', 'n.wilson@student.edu', 'Chemistry', 2023),
      (6, 'Olivia Taylor', 'o.taylor@student.edu', 'Computer Science', 2022);
  `);
}

export function seedRegistrations(db: Database): void {
  db.run(`
    INSERT INTO registrations (registration_id, student_id, course_id, semester, grade) VALUES
      (1, 1, 1, 'Fall 2023', 'A'),
      (2, 1, 4, 'Fall 2023', 'B+'),
      (3, 1, 2, 'Spring 2024', NULL),
      (4, 2, 1, 'Spring 2024', NULL),
      (5, 2, 4, 'Spring 2024', NULL),
      (6, 3, 4, 'Fall 2023', 'A'),
      (7, 3, 5, 'Spring 2024', NULL),
      (8, 4, 6, 'Fall 2023', 'A-'),
      (9, 4, 4, 'Fall 2023', 'B'),
      (10, 5, 7, 'Spring 2024', NULL),
      (11, 6, 1, 'Fall 2023', 'A-'),
      (12, 6, 2, 'Spring 2024', NULL),
      (13, 6, 3, 'Spring 2024', NULL);
  `);
}

