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

