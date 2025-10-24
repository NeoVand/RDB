import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../../hooks/useTheme';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        // Configure mermaid with theme-specific settings
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          themeVariables: theme === 'dark' ? {
            primaryColor: '#1e40af',
            primaryTextColor: '#e5e7eb',
            primaryBorderColor: '#3b82f6',
            lineColor: '#6b7280',
            secondaryColor: '#374151',
            tertiaryColor: '#1f2937',
            background: '#111827',
            mainBkg: '#1f2937',
            secondBkg: '#374151',
            textColor: '#e5e7eb',
            border1: '#4b5563',
            border2: '#6b7280',
          } : {
            primaryColor: '#dbeafe',
            primaryTextColor: '#1e3a8a',
            primaryBorderColor: '#3b82f6',
            lineColor: '#9ca3af',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#e5e7eb',
            background: '#ffffff',
            mainBkg: '#f9fafb',
            secondBkg: '#f3f4f6',
            textColor: '#111827',
            border1: '#d1d5db',
            border2: '#9ca3af',
          },
        });

        const { svg } = await mermaid.render(idRef.current, chart);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error('Mermaid render error:', error);
        containerRef.current.innerHTML = `
          <div class="text-red-600 dark:text-red-400 p-4 text-sm">
            Failed to render diagram
          </div>
        `;
      }
    };

    renderDiagram();
  }, [chart, theme]);

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="flex justify-center items-center p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-x-auto"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

