# RDB: The Architect's Guide to Relational Databases

An interactive, single-page educational website for learning relational databases and SQL from first principles to advanced design.

## Features

- **Interactive SQL Playgrounds**: Embedded database playgrounds in each section with live query execution
- **Comprehensive Content**: Complete guide covering fundamentals, normalization, SQL, ACID properties, and more
- **Beautiful Visualizations**: Mermaid diagrams for ERDs, flowcharts, and conceptual illustrations
- **Theme Support**: Dark and light modes with smooth transitions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **In-Browser Database**: Powered by sql.js (SQLite compiled to WebAssembly) - no server required

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **sql.js** - SQLite in the browser via WebAssembly
- **Mermaid** - Diagram generation

## Project Structure

```
src/
├── components/
│   ├── Content/         # Section, Subsection, diagrams, code examples
│   ├── Layout/          # Header, Sidebar, MainLayout
│   └── Playground/      # SQL playground components
├── content/
│   └── sections/        # Course content by part
├── hooks/               # Custom React hooks (theme, scroll spy)
├── lib/
│   └── database/        # Database schemas, seeds, presets
└── types/               # TypeScript type definitions
```

## Course Structure

1. **Part I: The Foundation** - Understanding the relational model
2. **Part II: Data Integrity** - Normalization and constraints
3. **Part III: Mastering SQL** - CRUD operations and advanced queries
4. **Part IV: Advanced Concepts** - ACID, performance, architecture
5. **Part V: The Ecosystem** - Choosing the right database

## License

MIT

## Credits

Built with ❤️ using React, TypeScript, Tailwind CSS, and sql.js
