import { CRUDVisual } from './CRUDVisual';

export function CRUDFigure() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CRUDVisual operation="create" />
        <CRUDVisual operation="read" />
        <CRUDVisual operation="update" />
        <CRUDVisual operation="delete" />
      </div>
      <figcaption className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 italic">
        The Four Fundamental CRUD Operations
      </figcaption>
    </figure>
  );
}

