import React from 'react';
import { IsolationLevelsVisual } from './IsolationLevelsVisual';

export const IsolationLevelsFigure: React.FC = () => {
  return (
    <figure className="my-8">
      <IsolationLevelsVisual />
      <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
        <strong>Isolation Levels:</strong> Each level provides stronger consistency guarantees (preventing more concurrency problems) 
        but at the cost of performance. SERIALIZABLE prevents all anomalies but is slowest; READ UNCOMMITTED is fastest but 
        offers no protection. Most applications use READ COMMITTED (the default in PostgreSQL, Oracle, SQL Server) as it balances 
        consistency and performance effectively.
      </figcaption>
    </figure>
  );
};

