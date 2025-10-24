# QA Verification Checklist

## Theme Verification ✅

### Diagrams to Test:
All Mermaid diagrams should adapt to theme switching:

**Part I - Foundation:**
- [ ] Companies table anatomy (ERD)
- [ ] Key hierarchy diagram
- [ ] Natural vs Surrogate key trade-offs
- [ ] One-to-One relationship ERD
- [ ] One-to-Many relationship ERD
- [ ] Many-to-Many breakdown flowchart
- [ ] Many-to-Many ERD

**Part II - Data Integrity:**
- [ ] Data anomalies visualization
- [ ] 2NF partial dependency diagram
- [ ] 3NF transitive dependency diagram
- [ ] Normalization journey flowchart

**Part III - SQL:**
- [ ] JOIN types comparison
- [ ] INNER vs LEFT JOIN practical difference
- [ ] Aggregate functions visualization
- [ ] GROUP BY bucketing
- [ ] WHERE vs HAVING filtering stages
- [ ] Query execution order flowchart

**Part III Advanced:**
- [ ] CROSS JOIN ERD
- [ ] SELF JOIN hierarchy
- [ ] Set operations visualization
- [ ] Window functions diagram

**Part IV - Advanced:**
- [ ] Transaction lifecycle state diagram
- [ ] Isolation levels hierarchy
- [ ] OLTP vs OLAP comparison

### Testing Steps:
1. Open http://localhost:5173
2. Toggle theme using the moon/sun icon
3. Scroll through all sections
4. Verify each diagram:
   - Renders correctly in light mode
   - Renders correctly in dark mode
   - No visual artifacts or rendering errors
   - Colors adapt appropriately to theme

## Playground Isolation Testing ✅

### Verify Each Playground Maintains Isolated Database:

**Test Scenarios:**
1. Execute query in Playground A
2. Execute different query in Playground B
3. Reset Playground A → verify it resets to initial state
4. Verify Playground B is unaffected by Playground A's reset
5. Run destructive query (DELETE/UPDATE) in one playground
6. Verify other playgrounds maintain their data

**Playgrounds to Test:**
- Part I, Section 1: Companies table exploration
- Part I, Section 1: Degree and cardinality
- Part I, Section 2: Foreign keys
- Part I, Section 3: Many-to-many enrollment
- Part II, Section 4: Domain constraints
- Part II, Section 5: Foreign keys
- Part II, Section 5: CREATE TABLE with constraints
- Part II, Section 5: ALTER TABLE
- Part II, Section 5b: Numeric types
- Part II, Section 5b: Date types
- Part II, Section 5b: NULL handling
- Part III, Section 7: INSERT examples (2 playgrounds)
- Part III, Section 7: SELECT (employees)
- Part III, Section 7: UPDATE examples (3 playgrounds)
- Part III, Section 7: DELETE examples (3 playgrounds)
- Part III, Section 8: INNER JOIN
- Part III, Section 8: Aggregates
- Part III, Section 8: GROUP BY with HAVING
- Part III, Section 8: Subqueries
- Part III, Section 8: Query execution order
- Part III Advanced, Section 8b: CROSS JOIN
- Part III Advanced, Section 8b: SELF JOIN
- Part III Advanced, Section 8b: CASE expressions (2 playgrounds)
- Part III Advanced, Section 8b: Set operations
- Part III Advanced, Section 8b: Subquery contexts (3 playgrounds)
- Part III Advanced, Section 8b: CTEs (2 playgrounds)
- Part III Advanced, Section 8b: Window functions
- Part IV, Section 9: Transaction ROLLBACK
- Part IV, Section 9: Transaction COMMIT
- Part IV, Section 9: Isolation demo
- Part IV, Section 9: Banking transfer
- Part IV, Section 10: Query optimization
- Part IV, Section 11: Views
- Part V, Section 12: Final challenge
- Part VI, Section 13-15: All 15 exercises (each has its own playground)

### Expected Behavior:
- Each playground initializes with correct preset
- Reset button restores initial state
- Schema viewer shows correct tables
- Execute button runs queries
- Results display properly
- Errors display clearly
- No cross-contamination between playgrounds

## Responsive Design Testing ✅

### Viewports to Test:
1. **Mobile:** 375px (iPhone SE)
2. **Tablet:** 768px (iPad)
3. **Desktop:** 1920px (Full HD)

### Elements to Verify:

**Navigation:**
- [ ] Sidebar collapses on mobile
- [ ] Hamburger menu appears on mobile
- [ ] Sidebar slides in/out smoothly
- [ ] TOC items are clickable and scroll to sections

**Content:**
- [ ] Text reflows appropriately
- [ ] Tables are horizontally scrollable on mobile
- [ ] Code examples don't overflow
- [ ] Callout boxes display correctly
- [ ] Mermaid diagrams scale appropriately

**Playgrounds:**
- [ ] Query editor is usable on mobile
- [ ] Buttons are accessible and properly sized
- [ ] Results table scrolls horizontally if needed
- [ ] Schema viewer displays correctly
- [ ] No layout breaking on small screens

**Exercises:**
- [ ] Exercise component displays well on all sizes
- [ ] Hint buttons work on mobile
- [ ] Solution sections expand/collapse properly
- [ ] Code snippets are readable on mobile

## Comprehensive Functionality Test ✅

### Core Features:
- [ ] Application loads without errors
- [ ] Theme toggle works (persists in localStorage)
- [ ] Scroll spy highlights active section in sidebar
- [ ] All navigation links work
- [ ] Skip link is functional (accessibility)

### SQL Execution:
Test a sample of queries from each section:
- [ ] Basic SELECT queries execute
- [ ] INSERT statements work
- [ ] UPDATE statements work
- [ ] DELETE statements work
- [ ] CREATE TABLE statements work
- [ ] ALTER TABLE statements work
- [ ] Transactions (BEGIN, COMMIT, ROLLBACK) work
- [ ] JOINs execute correctly
- [ ] Aggregate functions work
- [ ] Window functions work (in advanced SQL section)
- [ ] CTEs execute properly
- [ ] CASE expressions work
- [ ] Set operations (UNION, etc.) work

### Error Handling:
- [ ] Invalid SQL shows clear error messages
- [ ] Constraint violations display properly
- [ ] Database initialization errors handled gracefully
- [ ] Network errors (WASM loading) handled

### Performance:
- [ ] Initial page load is reasonable
- [ ] Playground initialization is fast
- [ ] Query execution is responsive
- [ ] Theme switching is smooth
- [ ] No memory leaks (check dev tools)

### Browser Compatibility:
- [ ] Chrome/Edge: Full functionality
- [ ] Firefox: Full functionality
- [ ] Safari: Full functionality (if available)

### Console Check:
- [ ] No errors in console
- [ ] No warnings (except build size warning, which is expected)
- [ ] Mermaid diagrams render without errors

## Accessibility ✅

- [ ] Keyboard navigation works (Tab through elements)
- [ ] Focus states are visible
- [ ] Skip link is present and functional
- [ ] ARIA labels are appropriate
- [ ] Color contrast meets WCAG AA standards

## Final Checklist ✅

- [ ] All sections render
- [ ] All diagrams render
- [ ] All playgrounds work
- [ ] All exercises display
- [ ] Reference section is complete
- [ ] Navigation is comprehensive
- [ ] Theme switching works everywhere
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] No runtime errors

## Notes:

### Known Issues to Address Later:
- Some diagrams may need refinement for better pedagogical clarity
- Consider using more varied Mermaid diagram types (quadrant charts, timeline, etc.)
- Some flowcharts could be replaced with more appropriate diagram types

### Performance Optimization Opportunities:
- Code splitting for Mermaid (mentioned in build warning)
- Lazy loading of playground components
- Progressive enhancement strategies

### Content Enhancement Opportunities:
- Add more real-world examples
- Include industry case studies
- Add more advanced exercises
- Create printable cheat sheets

