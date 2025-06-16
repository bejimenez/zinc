// src/components/editor/CustomNode.tsx

import { Handle, Position, useReactFlow } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the shape of our node data more specifically
type NodeData = {
  label: string;
  color: string;
  // Specific data fields for different node types
  assetKey?: 'red' | 'blue';
  objectId?: string;
  x?: number;
  y?: number;
};

export function CustomNode({ id, data, type }: NodeProps<NodeData>) {
  const { setNodes } = useReactFlow();

  // A helper function to update this specific node's data
  const updateNodeData = (newData: Partial<NodeData>) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  };

  const borderColorClass = data.color || 'border-primary';

  return (
    <Card className={`w-64 border-2 ${borderColorClass}`}>
      <CardHeader className="p-2 border-b bg-muted/50">
        <CardTitle className="text-sm text-center">{data.label}</CardTitle>
      </CardHeader>
      
      <div className="p-3 flex flex-col gap-3">
        {/* CONDITIONAL UI RENDERING BASED ON NODE TYPE */}
        
        {type === 'actionSpawnPlayer' && (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`objectId-${id}`}>Object ID</Label>
              <Input
                id={`objectId-${id}`}
                placeholder="e.g. 'player'"
                defaultValue={data.objectId}
                onChange={(e) => updateNodeData({ objectId: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sprite</Label>
              <Select
                defaultValue={data.assetKey}
                onValueChange={(value: 'red' | 'blue') => updateNodeData({ assetKey: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sprite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor={`x-${id}`}>X</Label>
                <Input
                  id={`x-${id}`}
                  type="number"
                  defaultValue={data.x ?? 400}
                  onChange={(e) => updateNodeData({ x: parseInt(e.target.value, 10) })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={`y-${id}`}>Y</Label>
                <Input
                  id={`y-${id}`}
                  type="number"
                  defaultValue={data.y ?? 300}
                  onChange={(e) => updateNodeData({ y: parseInt(e.target.value, 10) })}
                />
              </div>
            </div>
          </>
        )}
        
        {/* You can add more conditional blocks here for other node types */}

      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} id="exec-in" className="!bg-gray-400 w-3 h-3" />
      <Handle type="source" position={Position.Right} id="exec-out" className="!bg-gray-400 w-3 h-3" />
    </Card>
  );
}