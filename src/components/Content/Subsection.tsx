interface SubsectionProps {
  title: string;
  children: React.ReactNode;
}

export function Subsection({ title, children }: SubsectionProps) {
  return (
    <div className="my-5">
      <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <div className="text-gray-700 dark:text-gray-300 text-sm">
        {children}
      </div>
    </div>
  );
}
