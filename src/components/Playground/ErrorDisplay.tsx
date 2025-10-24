import { useTheme } from '../../hooks/useTheme';

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`px-3 py-2.5 border-t ${
      isDark 
        ? 'bg-red-950/20 border-red-800' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-start gap-2">
        <svg
          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            isDark ? 'text-red-400' : 'text-red-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <h3 className={`font-semibold text-xs mb-1 ${
            isDark ? 'text-red-300' : 'text-red-800'
          }`}>
            Query Error
          </h3>
          <p className={`text-xs font-mono whitespace-pre-wrap ${
            isDark ? 'text-red-400' : 'text-red-700'
          }`}>
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
