interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
}

export function Callout({ children, type = 'info', title }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-500',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-200',
      text: 'text-blue-800 dark:text-blue-300',
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500',
      icon: 'text-yellow-600 dark:text-yellow-500',
      title: 'text-yellow-900 dark:text-yellow-200',
      text: 'text-yellow-800 dark:text-yellow-300',
    },
    success: {
      container: 'bg-green-50 dark:bg-green-950/30 border-green-500',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-200',
      text: 'text-green-800 dark:text-green-300',
    },
    tip: {
      container: 'bg-purple-50 dark:bg-purple-950/30 border-purple-500',
      icon: 'text-purple-600 dark:text-purple-400',
      title: 'text-purple-900 dark:text-purple-200',
      text: 'text-purple-800 dark:text-purple-300',
    },
  };

  const style = styles[type];
  
  const icons = {
    info: <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />,
    warning: <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />,
    success: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />,
    tip: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />,
  };

  return (
    <div className={`border-l-4 ${style.container} rounded-r p-3 my-3`}>
      <div className="flex items-center gap-2.5">
        <svg className={`w-5 h-5 ${style.icon} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
          {icons[type]}
        </svg>
        <div className="flex-1 min-w-0">
          {title && (
            <div className={`font-semibold ${style.title} text-sm mb-1`}>
              {title.replace(/⚠️|✅|💡|ℹ️/g, '').trim()}
            </div>
          )}
          <div className={`text-sm ${style.text} leading-relaxed`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
