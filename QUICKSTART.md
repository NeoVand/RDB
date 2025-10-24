# Quick Start Guide

## Running the App

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173

2. **What You'll See**
   - Interactive course on relational databases
   - Collapsible sidebar with table of contents
   - Embedded SQL playgrounds in each section
   - Theme toggle (top right)
   - Beautiful Mermaid diagrams

## Testing the Playgrounds

Each playground lets you:
- **Write SQL queries** in the editor
- **Execute** with the button or `Ctrl/Cmd + Enter`
- **View results** in formatted tables
- **Show Schema** to see database structure
- **Reset** to restore initial state

### Try This First

1. Scroll to "Part I: The Foundation"
2. Find the first SQL playground
3. Click "Execute Query" or press `Ctrl+Enter`
4. See the results from the Companies table
5. Modify the query (try: `SELECT * FROM Sectors;`)
6. Click "Show Schema" to explore the database

## How It Works

### Database Architecture

Each playground:
1. Initializes sql.js (SQLite compiled to WebAssembly)
2. Creates a new database instance
3. Runs schema creation (CREATE TABLE statements)
4. Seeds with sample data
5. Executes your queries
6. Displays results

**Important**: Each playground is isolated. Changes in one don't affect others.

### Theme Switching

- Click the sun/moon icon in the header
- Theme preference is saved to localStorage
- Diagrams automatically adjust colors

### Navigation

- **Desktop**: Sidebar always visible on left
- **Mobile**: Tap hamburger menu to show/hide sidebar
- **Scroll**: Active section auto-highlights in TOC
- **Click TOC item**: Smooth scroll to that section

## Modifying Content

### Change a Playground's Query

Edit the `defaultQuery` prop:

```tsx
<SQLPlayground
  preset={FINANCIAL_FULL_PRESET}
  defaultQuery="SELECT * FROM Companies WHERE SectorID = 1;"
/>
```

### Use a Different Database Preset

```tsx
<SQLPlayground
  preset={EMPLOYEES_PRESET}  // or EMPTY_PRESET, BLOG_APP_PRESET, etc.
  defaultQuery="SELECT * FROM employees;"
/>
```

### Add New Tables

1. **Define Schema** in `src/lib/database/schemas.ts`:
   ```typescript
   export function createProductsTable(db: Database): void {
     db.run(`
       CREATE TABLE products (
         id INTEGER PRIMARY KEY,
         name TEXT NOT NULL,
         price DECIMAL(10, 2)
       );
     `);
   }
   ```

2. **Add Seed Data** in `src/lib/database/seedData.ts`:
   ```typescript
   export function seedProducts(db: Database): void {
     db.run(`
       INSERT INTO products (name, price) VALUES
         ('Widget', 19.99),
         ('Gadget', 29.99);
     `);
   }
   ```

3. **Create Preset** in `src/lib/database/presets.ts`:
   ```typescript
   export const PRODUCTS_PRESET: DatabasePreset = {
     name: 'Products',
     description: 'Product catalog',
     schemas: [createProductsTable],
     seeds: [seedProducts],
   };
   ```

4. **Use in Content**:
   ```tsx
   <SQLPlayground
     preset={PRODUCTS_PRESET}
     defaultQuery="SELECT * FROM products;"
   />
   ```

### Add Mermaid Diagrams

```tsx
<MermaidDiagram
  caption="Your caption here"
  chart={`
    graph LR
      A[Start] --> B[Process]
      B --> C[End]
  `}
/>
```

See [Mermaid docs](https://mermaid.js.org/) for syntax.

### Add Callouts

```tsx
<Callout type="info" title="Did You Know?">
  Interesting fact here
</Callout>

{/* Available types: info, warning, success, tip */}
```

## File Organization

- **Content**: `src/content/sections/*.tsx` - Edit these to change course content
- **Playgrounds**: `src/components/Playground/*.tsx` - Modify playground UI/behavior
- **Database**: `src/lib/database/*.ts` - Add tables, data, presets
- **Styling**: `src/index.css` - Global styles and theme colors
- **Layout**: `src/components/Layout/*.tsx` - Header, sidebar, overall structure

## Tips

1. **Keep Playgrounds Isolated**: Don't share database instances between playgrounds
2. **Use Appropriate Presets**: Match the preset to what you're teaching
3. **Reset Button is Key**: Users need ability to restore initial state
4. **Test Queries**: Ensure all example queries work with the preset data
5. **Mobile First**: Test on mobile - sidebar should collapse properly

## Common Tasks

### Change Header Title
Edit `src/components/Layout/Header.tsx`, line ~49

### Adjust Sidebar Width
Change `w-80` class in `src/components/Layout/Sidebar.tsx`

### Update Theme Colors
Modify CSS variables in `src/index.css` under `:root` and `.dark`

### Add New Part to Course
1. Create `src/content/sections/PartX_Name.tsx`
2. Import and render in `src/App.tsx`
3. Add section IDs to sidebar

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Need Help?

- Check browser console for errors
- Verify WASM files are in `public/` directory
- Ensure sql.js initialized before use
- Test queries in playground before adding to content
- Use TypeScript - it'll catch issues early!

Happy coding! 🚀

