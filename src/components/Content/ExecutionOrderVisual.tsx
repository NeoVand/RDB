export function ExecutionOrderVisual() {
  return (
    <figure className="my-8">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 overflow-x-auto">
        {/* Horizontal flow */}
        <div className="flex items-center justify-center gap-2 min-w-max mx-auto">
          {/* Start */}
          <div className="bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
            📝 Query
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Phase 1: Data Collection */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-3 min-w-[140px]">
            <div className="font-bold text-xs text-blue-900 dark:text-blue-100 mb-2">Data Collection</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">FROM/JOIN</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">WHERE</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Phase 2: Aggregation */}
          <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-3 min-w-[140px]">
            <div className="font-bold text-xs text-purple-900 dark:text-purple-100 mb-2">Aggregation</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">GROUP BY</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold">4</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">HAVING</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Phase 3: Column Selection */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-3 min-w-[140px]">
            <div className="font-bold text-xs text-emerald-900 dark:text-emerald-100 mb-2">Column Selection</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">5</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">SELECT</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">6</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">DISTINCT</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Phase 4: Result Refinement */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-3 min-w-[140px]">
            <div className="font-bold text-xs text-amber-900 dark:text-amber-100 mb-2">Result Refinement</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">7</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">ORDER BY</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">8</div>
                <div className="text-[10px] text-slate-900 dark:text-slate-100 font-semibold">LIMIT</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* End */}
          <div className="bg-green-100 dark:bg-green-900/40 border-2 border-green-500 dark:border-green-600 rounded-lg px-3 py-2 text-xs font-bold text-green-900 dark:text-green-100 whitespace-nowrap">
            📊 Result
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <strong className="text-gray-900 dark:text-gray-100">Logical SQL Execution Order: Four Phases</strong>
        <p className="mt-1">
          The database processes your query in 4 logical phases with 8 steps total. This is why aliases created in 
          <strong> Column Selection</strong> (step 5) aren't available in <strong>Data Collection</strong> (step 2), 
          but work in <strong>Result Refinement</strong> (step 7).
        </p>
      </figcaption>
    </figure>
  );
}

