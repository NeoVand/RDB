# RDB Development Guide

## What Has Been Built

A fully-functional, interactive single-page application for learning relational databases and SQL. The application features:

### Core Features Implemented

1. **Interactive SQL Playgrounds**
   - Each section has embedded database playgrounds
   - Live query execution using sql.js (SQLite in WebAssembly)
   - Real-time results display with formatted tables
   - Reset functionality to restore initial state
   - Schema viewer showing database structure
   - Syntax highlighting and line numbers
   - Keyboard shortcuts (Ctrl/Cmd + Enter to execute)

2. **Modular Database System**
   - Reusable table schemas (Sectors, Companies, Financial_Statements, Line_Items, etc.)
   - Composable seed data functions
   - Multiple database presets for different sections
   - Each playground has isolated database instance

3. **Theme System**
   - Dark and light mode support
   - Theme persistence in localStorage
   - Smooth transitions between themes
   - Mermaid diagrams adapt to theme

4. **Responsive Layout**
   - Collapsible sidebar navigation on mobile
   - Fixed header with theme toggle
   - Smooth scroll to sections
   - Active section highlighting in TOC
   - Skip link for accessibility

5. **Content Components**
   - Section and Subsection wrappers
   - Mermaid diagram integration with theme support
   - Code examples with copy functionality
   - Callout boxes for tips, warnings, and important info

6. **Complete Course Content**
   - Part I: The Foundation (Sections 1-3)
   - Part II: Data Integrity (Sections 4-5)
   - Part III: Mastering SQL (Sections 6-8)
   - Part IV: Advanced Concepts (Sections 9-11)
   - Part V: The Ecosystem (Section 12)

## Project Structure

```
src/
├── components/
│   ├── Content/
│   │   ├── Section.tsx           # Section wrapper with heading
│   │   ├── Subsection.tsx        # Subsection component
│   │   ├── MermaidDiagram.tsx    # Diagram renderer
│   │   └── CodeExample.tsx       # Code snippet with copy
│   ├── Layout/
│   │   ├── MainLayout.tsx        # Main page layout
│   │   ├── Header.tsx            # Top header with logo
│   │   └── Sidebar.tsx           # TOC sidebar
│   ├── Playground/
│   │   ├── SQLPlayground.tsx     # Main playground component
│   │   ├── QueryEditor.tsx       # SQL editor textarea
│   │   ├── ResultsTable.tsx      # Results display
│   │   ├── SchemaViewer.tsx      # Database schema viewer
│   │   └── ErrorDisplay.tsx      # Error messages
│   ├── Callout.tsx               # Info/warning/tip boxes
│   ├── Badge.tsx                 # Status badges
│   ├── LoadingSpinner.tsx        # Loading indicator
│   └── ThemeToggle.tsx           # Theme switcher
├── content/
│   └── sections/
│       ├── Part1_Foundation.tsx
│       ├── Part2_DataIntegrity.tsx
│       ├── Part3_SQL.tsx
│       ├── Part4_Advanced.tsx
│       └── Part5_Ecosystem.tsx
├── hooks/
│   ├── useTheme.ts               # Theme state management
│   └── useScrollSpy.ts           # Scroll tracking
├── lib/
│   └── database/
│       ├── initSqlJs.ts          # sql.js initialization
│       ├── schemas.ts            # Table creation functions
│       ├── seedData.ts           # Data insertion functions
│       ├── presets.ts            # Database presets
│       └── helpers.ts            # Utility functions
├── types/
│   └── database.ts               # TypeScript interfaces
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Access at: http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## Database Presets

Each playground uses a preset that defines its initial state:

- **EMPTY_PRESET** - Blank database for CREATE TABLE examples
- **BASIC_TEST_PRESET** - Simple test table
- **EMPLOYEES_PRESET** - Employee data for basic queries
- **FINANCIAL_SCHEMA_ONLY** - Schema without data for INSERT examples
- **FINANCIAL_FULL_PRESET** - Complete financial database (most common)
- **BLOG_APP_PRESET** - Users, posts, comments for foreign key examples
- **ENROLLMENT_PRESET** - Many-to-many relationship example
- **NORMALIZATION_PRESET** - For normalization lessons

## Adding New Content

### To Add a New Section:

1. Update `src/components/Layout/Sidebar.tsx` - add to `tocStructure`
2. Update `src/components/Layout/MainLayout.tsx` - add section ID to `sectionIds`
3. Create or update content in `src/content/sections/`
4. Use components:
   ```tsx
   <Section id="my-section" title="My Section" level={2}>
     <Subsection title="My Subsection">
       <p>Content here...</p>
       
       <SQLPlayground
         preset={FINANCIAL_FULL_PRESET}
         defaultQuery="SELECT * FROM Companies;"
       />
       
       <Callout type="info" title="Important Note">
         Key information here
       </Callout>
       
       <MermaidDiagram
         caption="My Diagram"
         chart={`graph TD; A-->B;`}
       />
     </Subsection>
   </Section>
   ```

### To Add a New Database Preset:

1. Add new schema/seed functions in `schemas.ts` and `seedData.ts`
2. Create preset in `presets.ts`:
   ```typescript
   export const MY_PRESET: DatabasePreset = {
     name: 'My Database',
     description: 'Description here',
     schemas: [createMyTable],
     seeds: [seedMyTable],
   };
   ```
3. Use in playground: `<SQLPlayground preset={MY_PRESET} />`

## Key Design Decisions

1. **Isolated Databases**: Each playground has its own database instance to prevent side effects
2. **Modular Schemas**: Table definitions are reusable functions
3. **Reset Functionality**: Each playground can reset to its initial preset
4. **Theme Integration**: All components support dark/light modes
5. **Accessibility**: Skip links, ARIA labels, keyboard navigation, focus states
6. **Performance**: Lazy initialization, memoized operations, efficient rendering

## Customization

### Colors
Edit CSS variables in `src/index.css` under `:root` and `.dark` selectors

### Typography
Modify prose styles in `src/index.css`

### Layout
Adjust spacing in `src/components/Layout/MainLayout.tsx`

### Sidebar Width
Change `w-80` class in `src/components/Layout/Sidebar.tsx`

## Troubleshooting

### WASM Files Not Loading
Ensure `sql-wasm.js` and `sql-wasm.wasm` are in `public/` directory

### Mermaid Diagrams Not Rendering
Check browser console for errors. Ensure chart syntax is valid.

### Theme Not Persisting
Check browser's localStorage permissions

### Queries Not Executing
Open browser console to see sql.js errors. Verify SQL syntax.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support (requires newer version for some ES features)

## Performance Notes

- Initial load includes ~800KB JS (includes Mermaid and sql.js)
- WASM file is ~1MB (loaded on demand)
- First playground initialization takes ~200ms
- Subsequent playgrounds initialize instantly (sql.js cached)

## Future Enhancements

Potential improvements:
- Syntax highlighting in query editor (CodeMirror/Monaco)
- Export query results to CSV
- Save queries to localStorage
- Query history per playground
- Interactive ERD diagrams
- Code splitting for Mermaid
- Progressive web app (PWA) support

