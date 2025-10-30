export function QueryLifecycleVisual() {
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

          {/* Stage 1: Parser */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg px-4 py-2 min-w-[100px] text-center">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold mx-auto mb-1">1</div>
            <div className="text-xs font-semibold text-blue-900 dark:text-blue-100">Parser</div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Stage 2: Rewriter */}
          <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg px-4 py-2 min-w-[100px] text-center">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold mx-auto mb-1">2</div>
            <div className="text-xs font-semibold text-purple-900 dark:text-purple-100">Rewriter</div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Stage 3: Planner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg px-4 py-2 min-w-[100px] text-center">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold mx-auto mb-1">3</div>
            <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-100">Planner</div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Stage 4: Optimizer */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg px-4 py-2 min-w-[100px] text-center">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold mx-auto mb-1">4</div>
            <div className="text-xs font-semibold text-amber-900 dark:text-amber-100">Optimizer</div>
          </div>

          {/* Arrow */}
          <svg className="flex-shrink-0 w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Stage 5: Executor */}
          <div className="bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-700 rounded-lg px-4 py-2 min-w-[100px] text-center">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold mx-auto mb-1">5</div>
            <div className="text-xs font-semibold text-rose-900 dark:text-rose-100">Executor</div>
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

      <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        <strong className="text-gray-900 dark:text-gray-100">SQL Query Lifecycle: The Five Stages of Execution</strong>
      </figcaption>
    </figure>
  );
}

