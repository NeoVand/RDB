interface JoinAlgorithmVisualProps {
  type: 'nested-loop' | 'hash' | 'merge';
}

export function JoinAlgorithmVisual({ type }: JoinAlgorithmVisualProps) {
  // Sample data for demonstrations
  const customers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
  ];

  const orders = [
    { order_id: 101, customer_id: 2, item: 'Book' },
    { order_id: 102, customer_id: 1, item: 'Pen' },
    { order_id: 103, customer_id: 2, item: 'Notebook' },
    { order_id: 104, customer_id: 1, item: 'Eraser' },
  ];

  // For nested loop visualization, use subset to keep it compact
  const nestedLoopCustomers = customers.slice(0, 2); // Just Alice and Bob
  const nestedLoopOrders = orders.slice(0, 3); // Just first 3 orders

  if (type === 'nested-loop') {
    return (
      <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg overflow-hidden bg-indigo-50 dark:bg-indigo-950/20">
        <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-100 px-3 py-2.5 font-semibold text-sm">
          🔄 Nested Loop Join
        </div>

        <div className="p-4 space-y-4">
          {/* Explanation */}
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            For each row in the outer table (Customers), scan <strong>all</strong> rows in the inner table (Orders) to find matches. 
            Checks every combination one by one.
          </p>

          {/* Visual demonstration */}
          <div className="space-y-3">
            {nestedLoopCustomers.map(customer => {
              const customerOrders = nestedLoopOrders.map(order => ({
                ...order,
                isMatch: order.customer_id === customer.id
              }));

              return (
                <div key={customer.id} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/40 border border-blue-400 dark:border-blue-600 rounded px-2 py-1 text-[10px] font-mono">
                      <span className="text-gray-600 dark:text-gray-400">id:</span>
                      <span className="font-bold">{customer.id}</span>
                      <span className="mx-1">|</span>
                      <span>{customer.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">→ Scan all orders:</span>
                  </div>
                  <div className="ml-4 pl-3 border-l-2 border-indigo-300 dark:border-indigo-700 space-y-1">
                    {customerOrders.map(order => (
                      <div
                        key={order.order_id}
                        className={`rounded px-2 py-0.5 text-[9px] font-mono ${
                          order.isMatch
                            ? 'bg-green-100 dark:bg-green-900/40 border border-green-500'
                            : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                        }`}
                      >
                        {order.isMatch ? '✓' : '✗'} order_id:{order.order_id}, cust:
                        {order.isMatch ? <strong>{order.customer_id}</strong> : order.customer_id}
                        {order.isMatch && `, item:${order.item}`}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-400 dark:border-indigo-600 rounded p-2 text-[10px]">
            <div className="font-bold text-indigo-900 dark:text-indigo-100">
              {nestedLoopCustomers.length} × {nestedLoopOrders.length} = {nestedLoopCustomers.length * nestedLoopOrders.length} comparisons
            </div>
            <div className="text-indigo-800 dark:text-indigo-200 mt-0.5">
              O(N×M) - Checks every combination
            </div>
          </div>

          {/* Additional explanation - more concise */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 rounded px-2 py-1.5 text-[10px] text-indigo-800 dark:text-indigo-200">
            <strong>Why it's slow:</strong> 10K × 100K = 1 billion comparisons! Indexes let inner loop jump to matches.
          </div>

          {/* Characteristics */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">Simple, works with any join condition</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">Fast if outer table is tiny or inner has index</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-600 dark:text-red-400 font-bold text-sm">❌</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">Catastrophic for large tables without indexes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hash') {
    // For hash join, use same compact dataset as nested loop
    const hashCustomers = nestedLoopCustomers;
    const hashOrders = nestedLoopOrders;
    
    // Build hash table structure
    const hashTable: Record<number, typeof customers[0][]> = {};
    hashCustomers.forEach(c => {
      hashTable[c.id] = [c];
    });

    return (
      <div className="border border-cyan-200 dark:border-cyan-800 rounded-lg overflow-hidden bg-cyan-50 dark:bg-cyan-950/20">
        <div className="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-900 dark:text-cyan-100 px-3 py-2.5 font-semibold text-sm">
          # Hash Join
        </div>

        <div className="p-4 space-y-4">
          {/* Explanation */}
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Phase 1 (Build):</strong> Create hash table from smaller table (Customers).
            <strong> Phase 2 (Probe):</strong> For each Order, instantly lookup customer via hash.
          </p>

          {/* Phase 1: Build hash table */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-cyan-700 dark:text-cyan-300">
              Phase 1: Build Hash Table from Customers
            </div>
            <div className="bg-cyan-100 dark:bg-cyan-900/40 border border-cyan-400 dark:border-cyan-600 rounded p-2 space-y-1">
              {Object.entries(hashTable).map(([key, customers]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="bg-gray-700 text-white rounded px-2 py-0.5 text-[9px] font-mono font-bold min-w-[40px] text-center">
                    hash({key})
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-400 text-[10px]">→</span>
                  {customers.map(c => (
                    <div key={c.id} className="bg-blue-100 dark:bg-blue-900/40 border border-blue-400 rounded px-2 py-0.5 text-[9px] font-mono">
                      id:{c.id} | {c.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2: Probe with Orders */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-cyan-700 dark:text-cyan-300">
              Phase 2: Probe Hash Table with Each Order
            </div>
            <div className="space-y-1.5">
              {hashOrders.map(order => {
                const customer = hashCustomers.find(c => c.id === order.customer_id);
                return (
                  <div key={order.order_id} className="flex items-center gap-2 text-[9px]">
                    <div className="bg-amber-100 dark:bg-amber-900/40 border border-amber-400 rounded px-2 py-0.5 font-mono">
                      order:{order.order_id}, cust:{order.customer_id}
                    </div>
                    <span className="text-gray-500">→</span>
                    <div className="bg-gray-700 text-white rounded px-1.5 py-0.5 font-mono font-bold">
                      hash({order.customer_id})
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-bold">⚡</span>
                    <div className="bg-green-100 dark:bg-green-900/40 border border-green-500 rounded px-2 py-0.5 font-mono">
                      ✓ {customer?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-cyan-100 dark:bg-cyan-900/40 border border-cyan-400 dark:border-cyan-600 rounded p-2 text-[10px]">
            <div className="font-bold text-cyan-900 dark:text-cyan-100">
              {hashCustomers.length} hash builds + {hashOrders.length} probes = {hashCustomers.length + hashOrders.length} ops
            </div>
            <div className="text-cyan-800 dark:text-cyan-200 mt-1">
              O(N+M) - Each row processed once, O(1) lookups
            </div>
          </div>

          {/* Additional explanation - more concise */}
          <div className="bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-700 rounded px-2 py-1.5 text-[10px] text-cyan-800 dark:text-cyan-200">
            <strong>Why it's fast:</strong> Hash table = one-time build cost, then O(1) lookups. Needs memory; huge tables may spill to disk.
          </div>

          {/* Characteristics */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">Excellent for large tables with equi-joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">O(1) lookup time per row</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">⚠️</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">Requires memory for hash table</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Merge Join - use same compact dataset
  const mergeCustomers = nestedLoopCustomers;
  const mergeOrders = nestedLoopOrders;
  const sortedCustomers = [...mergeCustomers].sort((a, b) => a.id - b.id);
  const sortedOrders = [...mergeOrders].sort((a, b) => a.customer_id - b.customer_id);

  return (
    <div className="border border-emerald-200 dark:border-emerald-800 rounded-lg overflow-hidden bg-emerald-50 dark:bg-emerald-950/20">
      <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 px-3 py-2.5 font-semibold text-sm">
        ⚡ Merge Join
      </div>

      <div className="p-4 space-y-4">
        {/* Explanation */}
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
          Both tables must be <strong>sorted</strong> on join key. Walk through both simultaneously, advancing the smaller value.
          Like merging two sorted lists.
        </p>

        {/* Visual demonstration of merge */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left: Sorted Customers */}
          <div className="space-y-1">
            <div className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
              Customers (sorted by id)
            </div>
            <div className="space-y-1">
              {sortedCustomers.map((c, idx) => (
                <div key={c.id} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-blue-100 dark:bg-blue-900/40 border border-blue-400 rounded px-1.5 py-0.5 text-[9px] font-mono">
                    {c.id}|{c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sorted Orders */}
          <div className="space-y-1">
            <div className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
              Orders (sorted by cust_id)
            </div>
            <div className="space-y-1">
              {sortedOrders.map((o, idx) => (
                <div key={o.order_id} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-amber-100 dark:bg-amber-900/40 border border-amber-400 rounded px-1.5 py-0.5 text-[9px] font-mono">
                    {o.customer_id}|{o.item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Merge process steps - simplified */}
        <div className="space-y-1.5">
          <div className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
            Merge Process (single linear pass):
          </div>
          <div className="space-y-1">
            {sortedOrders.map(order => {
              const customer = sortedCustomers.find(c => c.id === order.customer_id);
              if (customer) {
                return (
                  <div key={order.order_id} className="bg-green-100 dark:bg-green-900/40 border border-green-500 rounded px-2 py-1 text-[9px] font-mono">
                    ✓ {customer.name}({customer.id}) = order({order.customer_id}) → {order.item}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-400 dark:border-emerald-600 rounded p-2 text-[10px]">
          <div className="font-bold text-emerald-900 dark:text-emerald-100">
            Single pass = {sortedCustomers.length + sortedOrders.length} operations
          </div>
          <div className="text-emerald-800 dark:text-emerald-200 mt-1">
            O(N+M) if pre-sorted by indexes
          </div>
        </div>

        {/* Additional explanation - more concise */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded px-2 py-1.5 text-[10px] text-emerald-800 dark:text-emerald-200">
          <strong>Index advantage:</strong> Pre-sorted data = "free" merge. No memory overhead, no backtracking, pure linear efficiency.
        </div>

        {/* Characteristics */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Perfect when data is already sorted (indexes)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm">✅</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Single pass, no memory for hash table</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">⚠️</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Expensive if sorting is required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

