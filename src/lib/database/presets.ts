import type { DatabasePreset } from '../../types/database';
import {
  createSectorsTable,
  createCompaniesTable,
  createFinancialStatementsTable,
  createLineItemsTable,
  createTestTable,
  createEmployeesTable,
  createUsersTable,
  createPostsTable,
  createCommentsTable,
  createStudentsTable,
  createClassesTable,
  createEnrollmentTable,
  createCustomersTable,
  createProductsTable,
  createOrdersTable,
  createOrderItemsTable,
  createProfessorsTable,
  createCoursesTable,
  createUniversityStudentsTable,
  createRegistrationsTable,
} from './schemas';
import {
  seedSectors,
  seedCompanies,
  seedFinancialStatements,
  seedLineItems,
  seedTestTable,
  seedEmployees,
  seedUsers,
  seedPosts,
  seedComments,
  seedStudents,
  seedClasses,
  seedEnrollment,
  seedCustomers,
  seedProducts,
  seedOrders,
  seedOrderItems,
  seedProfessors,
  seedCourses,
  seedUniversityStudents,
  seedRegistrations,
} from './seedData';

/**
 * Empty database - for teaching CREATE TABLE
 */
export const EMPTY_PRESET: DatabasePreset = {
  name: 'Empty Database',
  description: 'No tables, completely empty',
  schemas: [],
  seeds: [],
};

/**
 * Basic test table - for simple examples
 */
export const BASIC_TEST_PRESET: DatabasePreset = {
  name: 'Basic Test',
  description: 'Simple test table with sample data',
  schemas: [createTestTable],
  seeds: [seedTestTable],
};

/**
 * Employees example - for basic SQL operations
 */
export const EMPLOYEES_PRESET: DatabasePreset = {
  name: 'Employees',
  description: 'Employee table with sample data',
  schemas: [createEmployeesTable],
  seeds: [seedEmployees],
};

/**
 * Financial schema only - for teaching INSERT
 */
export const FINANCIAL_SCHEMA_ONLY: DatabasePreset = {
  name: 'Financial Schema Only',
  description: 'Financial tables without data',
  schemas: [
    createSectorsTable,
    createCompaniesTable,
    createFinancialStatementsTable,
    createLineItemsTable,
  ],
  seeds: [],
};

/**
 * Complete financial database - for advanced queries
 */
export const FINANCIAL_FULL_PRESET: DatabasePreset = {
  name: 'Financial Database',
  description: 'Complete financial schema with sample data',
  schemas: [
    createSectorsTable,
    createCompaniesTable,
    createFinancialStatementsTable,
    createLineItemsTable,
  ],
  seeds: [
    seedSectors,
    seedCompanies,
    seedFinancialStatements,
    seedLineItems,
  ],
};

/**
 * Blog application - for relationships and foreign keys
 */
export const BLOG_APP_PRESET: DatabasePreset = {
  name: 'Blog Application',
  description: 'Blog schema with users, posts, and comments',
  schemas: [
    createUsersTable,
    createPostsTable,
    createCommentsTable,
  ],
  seeds: [
    seedUsers,
    seedPosts,
    seedComments,
  ],
};

/**
 * Student enrollment - for many-to-many relationships
 */
export const ENROLLMENT_PRESET: DatabasePreset = {
  name: 'Student Enrollment',
  description: 'Students, classes, and enrollment junction table',
  schemas: [
    createStudentsTable,
    createClassesTable,
    createEnrollmentTable,
  ],
  seeds: [
    seedStudents,
    seedClasses,
    seedEnrollment,
  ],
};

/**
 * Normalization example - combining multiple schemas
 */
export const NORMALIZATION_PRESET: DatabasePreset = {
  name: 'Normalization Example',
  description: 'Complete financial database for normalization lessons',
  schemas: [
    createSectorsTable,
    createCompaniesTable,
    createFinancialStatementsTable,
    createLineItemsTable,
  ],
  seeds: [
    seedSectors,
    seedCompanies,
    seedFinancialStatements,
    seedLineItems,
  ],
};

/**
 * E-Commerce database - for advanced joins, aggregations, and real-world scenarios
 */
export const ECOMMERCE_PRESET: DatabasePreset = {
  name: 'E-Commerce Database',
  description: 'Online store with customers, products, orders, and order items',
  schemas: [
    createCustomersTable,
    createProductsTable,
    createOrdersTable,
    createOrderItemsTable,
  ],
  seeds: [
    seedCustomers,
    seedProducts,
    seedOrders,
    seedOrderItems,
  ],
};

/**
 * University database - for complex joins and academic scenarios
 */
export const UNIVERSITY_PRESET: DatabasePreset = {
  name: 'University Database',
  description: 'Academic system with students, professors, courses, and registrations',
  schemas: [
    createProfessorsTable,
    createCoursesTable,
    createUniversityStudentsTable,
    createRegistrationsTable,
  ],
  seeds: [
    seedProfessors,
    seedCourses,
    seedUniversityStudents,
    seedRegistrations,
  ],
};

/**
 * Index demonstration database - for teaching query optimization with timing
 * Creates two identical large tables: one without index, one with index
 * Uses WITH RECURSIVE to generate 100,000 synthetic rows
 */
export const INDEX_DEMO_PRESET: DatabasePreset = {
  name: 'Index Performance Demo',
  description: 'Large synthetic dataset for demonstrating index performance (100K rows)',
  schemas: [
    (db) => {
      // Create table WITHOUT index
      db.run(`
        CREATE TABLE products_no_index (
          product_id INTEGER PRIMARY KEY,
          product_name TEXT NOT NULL,
          category TEXT NOT NULL,
          price REAL NOT NULL,
          stock_quantity INTEGER NOT NULL
        );
      `);
      
      // Create identical table WITH index
      db.run(`
        CREATE TABLE products_with_index (
          product_id INTEGER PRIMARY KEY,
          product_name TEXT NOT NULL,
          category TEXT NOT NULL,
          price REAL NOT NULL,
          stock_quantity INTEGER NOT NULL
        );
      `);
      
      // Create index on the second table
      db.run(`
        CREATE INDEX idx_products_category ON products_with_index(category);
      `);
    }
  ],
  seeds: [
    (db) => {
      // Generate 100,000 rows using WITH RECURSIVE CTE
      // This demonstrates SQL's iterative data generation capability
      db.run(`
        WITH RECURSIVE 
        -- Generate numbers from 1 to 100000
        numbers(n) AS (
          SELECT 1
          UNION ALL
          SELECT n + 1 FROM numbers WHERE n < 100000
        ),
        -- Generate synthetic product data
        synthetic_data AS (
          SELECT 
            n AS product_id,
            'Product ' || n AS product_name,
            CASE (n % 10)
              WHEN 0 THEN 'Electronics'
              WHEN 1 THEN 'Books'
              WHEN 2 THEN 'Clothing'
              WHEN 3 THEN 'Home & Garden'
              WHEN 4 THEN 'Sports'
              WHEN 5 THEN 'Toys'
              WHEN 6 THEN 'Automotive'
              WHEN 7 THEN 'Health'
              WHEN 8 THEN 'Beauty'
              WHEN 9 THEN 'Food'
            END AS category,
            ROUND((n % 1000) / 10.0 + 9.99, 2) AS price,
            (n % 500) + 1 AS stock_quantity
          FROM numbers
        )
        -- Insert into table WITHOUT index
        INSERT INTO products_no_index (product_id, product_name, category, price, stock_quantity)
        SELECT product_id, product_name, category, price, stock_quantity
        FROM synthetic_data;
      `);
      
      // Copy all data to table WITH index
      db.run(`
        INSERT INTO products_with_index (product_id, product_name, category, price, stock_quantity)
        SELECT product_id, product_name, category, price, stock_quantity
        FROM products_no_index;
      `);
    }
  ],
};

