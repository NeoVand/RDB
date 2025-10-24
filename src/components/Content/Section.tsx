interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  level?: 1 | 2;
}

export function Section({ id, title, children, level = 1 }: SectionProps) {
  const HeadingTag = level === 1 ? 'h1' : 'h2';
  const headingClasses = level === 1
    ? 'text-xl font-bold mb-3 mt-10 pb-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
    : 'text-lg font-semibold mb-2 mt-8 text-gray-900 dark:text-gray-100';

  return (
    <section id={id} className="scroll-mt-16">
      <HeadingTag className={headingClasses}>
        {title}
      </HeadingTag>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </section>
  );
}
