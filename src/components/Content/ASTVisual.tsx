interface TreeNode {
  id: string;
  label: string;
  type: 'root' | 'operator' | 'leaf';
  children?: TreeNode[];
}

interface NodePosition {
  x: number;
  y: number;
  node: TreeNode;
}

export function ASTVisual() {
  // Define the tree structure that accurately matches the SQL query
  const tree: TreeNode = {
    id: 'root',
    label: 'SELECT',
    type: 'root',
    children: [
      {
        id: 'columns',
        label: 'COLUMNS',
        type: 'operator',
        children: [
          { id: 'col1', label: 'name', type: 'leaf' },
          { id: 'col2', label: 'price', type: 'leaf' },
        ],
      },
      {
        id: 'from',
        label: 'FROM',
        type: 'operator',
        children: [
          { id: 'table1', label: 'products', type: 'leaf' },
        ],
      },
      {
        id: 'where',
        label: 'WHERE',
        type: 'operator',
        children: [
          {
            id: 'gt',
            label: '>',
            type: 'operator',
            children: [
              { id: 'where_col', label: 'price', type: 'leaf' },
              { id: 'where_val', label: '100', type: 'leaf' },
            ],
          },
        ],
      },
    ],
  };

  // Calculate positions using a tree layout algorithm
  const calculatePositions = (node: TreeNode, depth: number = 0, offset: number = 0): { positions: NodePosition[], width: number } => {
    const levelHeight = 70;
    const minNodeSpacing = 100;
    
    if (!node.children || node.children.length === 0) {
      return {
        positions: [{ x: offset, y: depth * levelHeight, node }],
        width: minNodeSpacing,
      };
    }

    const childResults: { positions: NodePosition[], width: number }[] = [];
    node.children.forEach((child, i) => {
      const childOffset = i === 0 ? offset : offset + childResults.slice(0, i).reduce((sum: number, r: { width: number }) => sum + r.width, 0);
      childResults.push(calculatePositions(child, depth + 1, childOffset));
    });

    const totalWidth = childResults.reduce((sum: number, r: { width: number }) => sum + r.width, 0);
    const allChildPositions = childResults.flatMap((r: { positions: NodePosition[] }) => r.positions);
    
    // Position current node at the center of its children
    const firstChild = allChildPositions.find((p: NodePosition) => p.y === (depth + 1) * levelHeight);
    const lastChild = [...allChildPositions].reverse().find((p: NodePosition) => p.y === (depth + 1) * levelHeight);
    const centerX = firstChild && lastChild ? (firstChild.x + lastChild.x) / 2 : offset + totalWidth / 2;

    return {
      positions: [
        { x: centerX, y: depth * levelHeight, node },
        ...allChildPositions,
      ],
      width: totalWidth,
    };
  };

  const { positions } = calculatePositions(tree);

  // Find min/max for viewBox with extra padding to prevent truncation
  const minX = Math.min(...positions.map(p => p.x)) - 70;
  const maxX = Math.max(...positions.map(p => p.x)) + 70;
  const minY = -30; // Extra padding at top to prevent truncation
  const maxY = Math.max(...positions.map(p => p.y)) + 40;
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  // Generate edges
  const edges: Array<{ from: NodePosition; to: NodePosition }> = [];
  positions.forEach(pos => {
    if (pos.node.children) {
      pos.node.children.forEach(child => {
        const childPos = positions.find(p => p.node.id === child.id);
        if (childPos) {
          edges.push({ from: pos, to: childPos });
        }
      });
    }
  });

  // Get color for node based on its label - each element gets unique color
  const getNodeColor = (label: string): string => {
    switch (label) {
      case 'SELECT':
        return 'fill-purple-100 dark:fill-purple-900/40 stroke-purple-500 dark:stroke-purple-400';
      case 'COLUMNS':
        return 'fill-slate-100 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600';
      case 'name':
        return 'fill-cyan-100 dark:fill-cyan-900/40 stroke-cyan-500 dark:stroke-cyan-400';
      case 'price':
        return 'fill-rose-100 dark:fill-rose-900/40 stroke-rose-500 dark:stroke-rose-400';
      case 'FROM':
        return 'fill-orange-100 dark:fill-orange-900/40 stroke-orange-500 dark:stroke-orange-400';
      case 'products':
        return 'fill-emerald-100 dark:fill-emerald-900/40 stroke-emerald-500 dark:stroke-emerald-400';
      case 'WHERE':
        return 'fill-green-100 dark:fill-green-900/40 stroke-green-500 dark:stroke-green-400';
      case '>':
        return 'fill-amber-100 dark:fill-amber-900/40 stroke-amber-500 dark:stroke-amber-400';
      case '100':
        return 'fill-indigo-100 dark:fill-indigo-900/40 stroke-indigo-500 dark:stroke-indigo-400';
      default:
        return 'fill-slate-100 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600';
    }
  };

  const getTextColor = (label: string): string => {
    switch (label) {
      case 'SELECT':
        return 'fill-purple-900 dark:fill-purple-100';
      case 'COLUMNS':
        return 'fill-slate-900 dark:fill-slate-100';
      case 'name':
        return 'fill-cyan-900 dark:fill-cyan-100';
      case 'price':
        return 'fill-rose-900 dark:fill-rose-100';
      case 'FROM':
        return 'fill-orange-900 dark:fill-orange-100';
      case 'products':
        return 'fill-emerald-900 dark:fill-emerald-100';
      case 'WHERE':
        return 'fill-green-900 dark:fill-green-100';
      case '>':
        return 'fill-amber-900 dark:fill-amber-100';
      case '100':
        return 'fill-indigo-900 dark:fill-indigo-100';
      default:
        return 'fill-slate-900 dark:fill-slate-100';
    }
  };

  return (
    <figure className="my-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-stretch gap-4">
        {/* Top: SQL Query */}
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 text-center italic">SQL Query</p>
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6">
            <div className="font-mono text-base space-y-2">
              <div>
                <span className="text-purple-600 dark:text-purple-400 font-bold">SELECT</span>
                <span className="text-cyan-600 dark:text-cyan-400"> name</span>
                <span className="text-slate-900 dark:text-slate-100">,</span>
                <span className="text-rose-600 dark:text-rose-400"> price</span>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400 font-bold">FROM</span>
                <span className="text-emerald-600 dark:text-emerald-400"> products</span>
              </div>
              <div>
                <span className="text-green-600 dark:text-green-400 font-bold">WHERE</span>
                <span className="text-rose-600 dark:text-rose-400"> price </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">&gt;</span>
                <span className="text-indigo-600 dark:text-indigo-400"> 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow pointing down */}
        <div className="flex flex-col items-center gap-1">
          <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 italic">Parser</span>
        </div>

        {/* Bottom: Abstract Syntax Tree */}
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 text-center italic">Abstract Syntax Tree</p>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6">
            <svg
              viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ height: '320px' }}
            >
              {/* Draw edges first (so they appear behind nodes) */}
              {edges.map((edge, i) => (
                <line
                  key={`edge-${i}`}
                  x1={edge.from.x}
                  y1={edge.from.y + 20}
                  x2={edge.to.x}
                  y2={edge.to.y - 20}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-400 dark:text-slate-600"
                />
              ))}

              {/* Draw nodes */}
              {positions.map((pos) => {
                const isLeaf = pos.node.type === 'leaf';
                
                if (isLeaf) {
                  // Leaf nodes: rectangles with color coding
                  const labelWidth = Math.max(70, pos.node.label.length * 8);
                  const bgColor = getNodeColor(pos.node.label);
                  const textColor = getTextColor(pos.node.label);
                  
                  return (
                    <g key={pos.node.id}>
                      <rect
                        x={pos.x - labelWidth / 2}
                        y={pos.y - 14}
                        width={labelWidth}
                        height="28"
                        rx="4"
                        className={bgColor}
                        strokeWidth="2"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        className={`${textColor} text-[13px] font-bold`}
                      >
                        {pos.node.label}
                      </text>
                    </g>
                  );
                } else {
                  // Operator nodes: ellipses with color coding
                  const bgColor = getNodeColor(pos.node.label);
                  const textColor = getTextColor(pos.node.label);
                  
                  return (
                    <g key={pos.node.id}>
                      <ellipse
                        cx={pos.x}
                        cy={pos.y}
                        rx="55"
                        ry="22"
                        className={bgColor}
                        strokeWidth="2"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        className={`${textColor} text-[13px] font-bold`}
                      >
                        {pos.node.label}
                      </text>
                    </g>
                  );
                }
              })}
            </svg>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        <strong className="text-gray-900 dark:text-gray-100">Abstract Syntax Tree: How the Parser Understands Your Query</strong>
      </figcaption>
    </figure>
  );
}

