function TreeNode({ node, x, y, horizontalSpacing, verticalSpacing }) {
  if (!node) return null;

  return (
    <>
      <circle cx={x} cy={y} r={20} fill="lightblue" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12">{node.value}</text>

      {/* Left child */}
      {node.left && (
        <>
          <line 
            x1={x} y1={y + 20} 
            x2={x - horizontalSpacing} y2={y + verticalSpacing - 20} 
            stroke="black" 
          />
          <TreeNode 
            node={node.left} 
            x={x - horizontalSpacing} 
            y={y + verticalSpacing} 
            horizontalSpacing={horizontalSpacing / 1.5} 
            verticalSpacing={verticalSpacing} 
          />
        </>
      )}

      {/* Right child */}
      {node.right && (
        <>
          <line 
            x1={x} y1={y + 20} 
            x2={x + horizontalSpacing} y2={y + verticalSpacing - 20} 
            stroke="black" 
          />
          <TreeNode 
            node={node.right} 
            x={x + horizontalSpacing} 
            y={y + verticalSpacing} 
            horizontalSpacing={horizontalSpacing / 1.5} 
            verticalSpacing={verticalSpacing} 
          />
        </>
      )}
    </>
  );
}

function TreeVisualization({ root }) {
  return (
    <svg width="600" height="400">
      <TreeNode node={root} x={300} y={40} horizontalSpacing={120} verticalSpacing={80} />
    </svg>
  );
}
