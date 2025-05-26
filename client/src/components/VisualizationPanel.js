import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const treeToReactFlowNodesEdges = (root) => {
  const nodes = [];
  const edges = [];
  let idCounter = 0;

  // Helper function to recursively traverse the tree
  const traverse = (node, x, y, parentId = null) => {
    if (!node) return;

    const nodeId = `node-${idCounter++}`;
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x, y },
      data: { label: node.value.toString() },
      style: {
        padding: 10,
        borderRadius: 8,
        border: '2px solid #8b5cf6',
        background: '#ede9fe',
        color: '#6d28d9',
        fontWeight: 'bold',
      },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        animated: true,
        style: { stroke: '#8b5cf6' },
      });
    }

    // Horizontal spacing for child nodes
    const horizontalSpacing = 150;
    // Vertical spacing between levels
    const verticalSpacing = 100;

    // Recursively render left and right children
    traverse(node.left, x - horizontalSpacing, y + verticalSpacing, nodeId);
    traverse(node.right, x + horizontalSpacing, y + verticalSpacing, nodeId);
  };

  // Start traversing from root at center top
  traverse(root, 300, 50);

  return { nodes, edges };
};

const transformTree = (node, x, y, spacingX, spacingY, nodes, edges, parentId = null) => {
  if (!node) return;

  const nodeId = `node-${nodes.length + 1}`;
  nodes.push({
    id: nodeId,
    data: { label: node.value },
    position: { x, y },
    style: { 
      background: '#ede9fe', 
      border: '2px solid #8b5cf6', 
      color: '#6d28d9', 
      padding: '10px', 
      borderRadius: '4px' 
    }
  });

  if (parentId) {
    edges.push({
      id: `edge-${edges.length + 1}`,
      source: parentId,
      target: nodeId,
      animated: true,
      style: { stroke: '#8b5cf6' }
    });
  }

  // Recursively add left and right child nodes
  transformTree(node.left, x - spacingX, y + spacingY, spacingX / 1.5, spacingY, nodes, edges, nodeId);
  transformTree(node.right, x + spacingX, y + spacingY, spacingX / 1.5, spacingY, nodes, edges, nodeId);
};

const VisualizationPanel = ({ visualization, loading }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView();
  }, []);

  useEffect(() => {
  if (visualization?.root) {
    // Tree visualization
    const { nodes: newNodes, edges: newEdges } = treeToReactFlowNodesEdges(visualization.root);
    setNodes(newNodes);
    setEdges(newEdges);
  } else if (Array.isArray(visualization)) {
    // Flowchart steps visualization
    const { nodes: newNodes, edges: newEdges } = transformVisualizationData(visualization);
    setNodes(newNodes);
    setEdges(newEdges);
  }
}, [visualization]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="spinner" />
        <p className="mt-4 text-primary-500 font-medium animate-pulse">Visualizing...</p>
      </div>
    );
  }

  if (!visualization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-gray-400 dark:text-gray-500 text-center">
          Write some code and click <span className="font-semibold text-primary-500">Explain & Visualize</span> to see the visualization
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-primary-600 dark:text-primary-300 mb-4 tracking-tight">
        Visualization
      </h2>
      <div className="rounded-xl overflow-hidden border border-primary-100 dark:border-primary-600 shadow glass h-[400px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={onInit}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

// --- Updated transformVisualizationData function ---
const transformVisualizationData = (visualization) => {
  if (!Array.isArray(visualization)) {
    console.error("Expected visualization to be an array but got:", visualization);
    return { nodes: [], edges: [] };
  }

  const nodes = [];
  const edges = [];
  let nodeId = 1;
   if (visualization && visualization.type === 'tree' && visualization.root) {
    transformTree(visualization.root, 300, 40, 120, 80, nodes, edges);
  } else if (Array.isArray(visualization)) {
    // existing linear flow logic here
     const getNodeStyle = (category) => {
    switch (category) {
      case 'array':
        return {
          background: '#ecfeff',
          border: '2px dashed #22d3ee',
          color: '#0891b2',
          padding: '10px',
          borderRadius: '8px',
        };
      case 'loop':
        return {
          background: '#fef9c3',
          border: '2px solid #eab308',
          color: '#92400e',
          padding: '10px',
          borderRadius: '50%',
        };
      case 'tree':
        return {
          background: '#ede9fe',
          border: '2px solid #8b5cf6',
          color: '#6d28d9',
          padding: '10px',
          borderRadius: '4px',
        };
      case 'conditional':
        return {
          background: '#fef2f2',
          border: '2px dotted #f87171',
          color: '#b91c1c',
          padding: '10px',
          borderRadius: '6px',
        };
      case 'function':
        return {
          background: '#ecfccb',
          border: '2px solid #84cc16',
          color: '#365314',
          padding: '10px',
          borderRadius: '12px',
        };
      default:
        return {
          background: '#f0f9ff',
          border: '2px solid #38bdf8',
          color: '#0369a1',
          padding: '10px',
          borderRadius: '12px',
        };
    }
  };

  (visualization || []).forEach((step, index) => {
    const category = step.category || 'default';
    nodes.push({
      id: `node-${nodeId}`,
      type: 'default',
      position: { x: 250, y: index * 100 },
      data: { label: step.t },
      style: getNodeStyle(category),
    });

    if (index > 0) {
      edges.push({
        id: `edge-${nodeId}`,
        source: `node-${nodeId - 1}`,
        target: `node-${nodeId}`,
        animated: true,
        style: { stroke: '#0ea5e9' },
      });
    }
    nodeId++;
  });

  }

 
  return { nodes, edges };
};

export default VisualizationPanel;
