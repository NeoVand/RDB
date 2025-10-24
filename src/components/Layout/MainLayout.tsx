import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface MainLayoutProps {
  children: React.ReactNode;
}

const sectionIds = [
  'part1', 'section1', 'section2', 'section3',
  'part2', 'section4', 'section5', 'section5b',
  'part3', 'section6', 'section7', 'section8', 'section8b',
  'part4', 'section9', 'section10', 'section11',
  'part5', 'section12',
  'part6', 'section13', 'section14', 'section15',
  'part7', 'section16', 'section17', 'section18',
];

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds, 120);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeId={activeId}
      />
      
      <main id="main-content" className="pt-14 lg:pl-72 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-12">
          {children}
        </div>
        
        <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Built with React, TypeScript, Tailwind CSS, and{' '}
              <a
                href="https://sql.js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                sql.js
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
