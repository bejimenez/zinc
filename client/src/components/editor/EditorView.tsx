// src/components/editor/EditorView.tsx

import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import type { Node, Edge, OnConnect, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from '@/components/ui/button';
import type { ScriptData } from '@/App';
import { NodePalette } from './NodePalette';
import type { NodeDefinition } from './NodePalette';
import { CustomNode } from './CustomNode';

const initialNodes: Node[] = [
  // update this to use our custom node from the start
  { 
    id: '1', 
    position: { x: 100, y: 100 }, 
    // The data now needs to match what CustomNode expects
    data: { label: 'On Game Start', color: 'border-rose-500' }, 
    type: 'CustomNode' // Use the registered type name
  },
];
const initialEdges: Edge[] = [];

// A counter to ensure unique node IDs
let id = 2;
const getUniqueId = () => `${id++}`;

interface EditorViewProps {
  onPlay: (scriptData: ScriptData) => void;
}

export default function EditorView({ onPlay }: EditorViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const nodeTypes = useMemo(() => ({ CustomNode: CustomNode }), []);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // This function is passed to our NodePalette
  const handleNodeSelect = useCallback((nodeDefinition: NodeDefinition) => {
    if (!reactFlowInstance) return;

    // Use the viewport to place the new node in the center of the current screen
    const position = reactFlowInstance.screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3, // A bit higher than center to feel natural
    });

    const newNode: Node = {
      id: getUniqueId(),
      type: 'CustomNode', // Use the type from the palette
      position,
      data: { 
        label: nodeDefinition.label, 
        color: nodeDefinition.color,
      }, 
    };

    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, setNodes]);
  
  const handlePlayClick = () => {
    // Pass the current state of nodes and edges
    onPlay({ nodes, edges });
  };

  return (
    // Main container with flex layout
    <div className="w-screen h-screen flex flex-col">
      
      {/* Top bar for global actions */}
      <div className="p-2 border-b border-border bg-background flex justify-end">
        <Button onClick={handlePlayClick} variant="secondary">
          Play
        </Button>
      </div>

      {/* React Flow canvas fills the remaining space */}
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
      onConnect={onConnect}
          onInit={setReactFlowInstance} // Save instance to calculate positions
          fitView
          nodeTypes={nodeTypes} // Register custom node type
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Bottom Node Palette with a fixed height */}
      <div className="h-48">
        <NodePalette onNodeSelect={handleNodeSelect} />
      </div>
    </div>
  );
}