import { MainLayout } from './components/Layout/MainLayout';
import { Part1_Foundation } from './content/sections/Part1_Foundation';
import { Part2_DataIntegrity } from './content/sections/Part2_DataIntegrity';
import { Part3_SQL } from './content/sections/Part3_SQL';
import { Part5_Ecosystem } from './content/sections/Part5_Ecosystem';
import { Part6_Exercises } from './content/sections/Part6_Exercises';
import { Part7_Reference } from './content/sections/Part7_Reference';

function App() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center py-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-700 dark:bg-slate-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Vibe Coder&apos;s Interactive Guide To Relational Databases and SQL
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            A course by Neo Mohsenvand
          </p>
        </div>

        {/* Course Content */}
        <Part1_Foundation />
        <Part2_DataIntegrity />
        <Part3_SQL />
        <Part5_Ecosystem />
        <Part6_Exercises />
        <Part7_Reference />
      </div>
    </MainLayout>
  );
}

export default App;
