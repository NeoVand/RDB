import { scrollToSection } from '../../hooks/useScrollSpy';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
}

const tocStructure: TOCItem[] = [
  {
    id: 'part1',
    title: 'Part I: The Foundation',
    level: 1,
    children: [
      { id: 'section1', title: 'What is a Relational Database?', level: 2 },
      { id: 'section2', title: 'Keys to the Kingdom', level: 2 },
      { id: 'section3', title: 'Modeling the Real World', level: 2 },
    ],
  },
  {
    id: 'part2',
    title: 'Part II: Data Integrity',
    level: 1,
    children: [
      { id: 'section4', title: 'Database Normalization', level: 2 },
      { id: 'section5', title: 'Constraints and Integrity', level: 2 },
    ],
  },
  {
    id: 'part3',
    title: 'Part III: Mastering SQL',
    level: 1,
    children: [
      { id: 'section6', title: 'Introduction to SQL', level: 2 },
      { id: 'section7', title: 'CRUD Operations', level: 2 },
      { id: 'section8', title: 'Advanced Querying', level: 2 },
    ],
  },
  {
    id: 'part4',
    title: 'Part IV: Advanced Concepts',
    level: 1,
    children: [
      { id: 'section9', title: 'ACID Properties', level: 2 },
      { id: 'section10', title: 'Performance & Optimization', level: 2 },
      { id: 'section11', title: "Architect's Perspective", level: 2 },
    ],
  },
  {
    id: 'part5',
    title: 'Part V: The Ecosystem',
    level: 1,
    children: [
      { id: 'section12', title: 'Choosing Your Database', level: 2 },
    ],
  },
];

export function Sidebar({ isOpen, onClose, activeId }: SidebarProps) {
  const handleItemClick = (id: string) => {
    scrollToSection(id);
    onClose();
  };

  const renderTOCItem = (item: TOCItem) => {
    const isActive = activeId === item.id;
    const hasActiveChild = item.children?.some((child) => activeId === child.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item.id)}
          className={`
            w-full text-left px-3 py-1.5 text-sm rounded transition-colors
            ${item.level === 1 ? 'font-semibold mt-3 first:mt-0' : 'ml-3 text-xs font-normal'}
            ${
              isActive
                ? 'bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100'
                : hasActiveChild
                ? 'text-gray-900 dark:text-gray-200 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
          type="button"
        >
          {item.title}
        </button>
        {item.children && (
          <div className="mt-1 space-y-0.5">
            {item.children.map((child) => renderTOCItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40
          transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Table of contents"
      >
        <nav className="p-4">
          {/* Close button for mobile - no redundant title */}
          <div className="flex items-center justify-end mb-2 lg:hidden">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close sidebar"
              type="button"
            >
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* TOC Items */}
          <div className="space-y-0.5">
            {tocStructure.map((item) => renderTOCItem(item))}
          </div>
        </nav>
      </aside>
    </>
  );
}
