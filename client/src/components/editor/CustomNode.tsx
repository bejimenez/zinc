// src/components/editor/CustomNode.tsx

import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

// Define the shape of the data custom node expects
type NodeData = {
    label: string;
    color: string;
};

// The NodeProps type is passed from React Flow to custom components
export function CustomNode({ data }: NodeProps<NodeData>) {
    // data.color will be our Tailwind border class
    const borderColorClass = data.color || 'border-primary';

    return (
        <Card className={`w-48 border-2 ${borderColorClass}`}>
            <CardHeader className="p-2">
                <CardTitle className="text-sm text-center">{data.label}</CardTitle>
            </CardHeader>

            {/* Execution input handle (left side) */}
            <Handle
                type="target"
                position={Position.Left}
                id="exec-in"
                className="!bg-gray-400 w-3 h-3"
            />
        </Card>
    );
}