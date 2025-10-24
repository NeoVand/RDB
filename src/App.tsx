import { MainLayout } from './components/Layout/MainLayout';
import { Part1_Foundation } from './content/sections/Part1_Foundation';
import { Part2_DataIntegrity } from './content/sections/Part2_DataIntegrity';
import { Part3_SQL } from './content/sections/Part3_SQL';
import { Part4_Advanced } from './content/sections/Part4_Advanced';
import { Part5_Ecosystem } from './content/sections/Part5_Ecosystem';

function App() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8 px-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            The Architect's Guide to Relational Databases
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
            From First Principles to Advanced Design
          </p>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            An interactive journey through relational databases and SQL. 
            Learn by doing with embedded playgrounds and visualizations.
          </p>
        </div>

        {/* Course Content */}
        <Part1_Foundation />
        <Part2_DataIntegrity />
        <Part3_SQL />
        <Part4_Advanced />
        <Part5_Ecosystem />
      </div>
    </MainLayout>
  );
}

export default App;
