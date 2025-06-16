// src/components/editor/EditorView.tsx
import { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import type { Node, Edge, OnConnect } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import type { ScriptData } from '@/App'; // Import the type

const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' }, type: 'input' },
];
const initialEdges: Edge[] = [];

interface EditorViewProps {
  onPlay: (scriptData: ScriptData) => void;
}

export default function EditorView({ onPlay }: EditorViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  let nodeId = 2;
  const onAddNode = () => {
    const newNode = {
      id: `${nodeId++}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodeId - 1}` },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  
  const handlePlayClick = () => {
    // Pass the current state of nodes and edges
    onPlay({ nodes, edges });
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button onClick={onAddNode}>Add Node</Button>
        <Button onClick={handlePlayClick} variant="secondary">
          Play
        </Button>
      </div>      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}