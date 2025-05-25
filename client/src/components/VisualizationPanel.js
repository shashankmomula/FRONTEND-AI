import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const VisualizationPanel = ({ visualization, loading }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView();
  }, []);

  React.useEffect(() => {
    if (visualization) {
      const steps = visualization.steps || visualization;
      const { nodes: newNodes, edges: newEdges } = transformVisualizationData(steps);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [visualization, setNodes, setEdges]);

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

const transformVisualizationData = (visualization) => {
  const nodes = [];
  const edges = [];
  let nodeId = 1;

  (visualization || []).forEach((step, index) => {
    nodes.push({
      id: `node-${nodeId}`,
      type: 'default',
      position: { x: 250, y: index * 100 },
      data: { label: step.t },
      style: {
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid #bae6fd',
        borderRadius: '12px',
        padding: '10px',
        fontWeight: 600,
      },
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
  return { nodes, edges };
};

export default VisualizationPanel; 