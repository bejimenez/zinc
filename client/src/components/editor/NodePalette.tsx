// src/components/editor/NodePalette.tsx

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the structure of our nodes
export interface NodeDefinition {
  type: string;
  label: string;
  category: 'Events' | 'Actions' | 'Logic';
  // We can add default data for the node later
  // defaultData?: Record<string, any>; 
}

// Our library of available nodes
const NODE_DEFINITIONS: NodeDefinition[] = [
  { type: 'eventOnStart', label: 'On Game Start', category: 'Events' },
  { type: 'eventOnUpdate', label: 'On Update', category: 'Events' },
  { type: 'actionMove', label: 'Move Object', category: 'Actions' },
  { type: 'actionRotate', label: 'Rotate Object', category: 'Actions' },
  { type: 'actionPlaySound', label: 'Play Sound', category: 'Actions' },
  { type: 'logicIf', label: 'If Condition', category: 'Logic' },
];

// Group nodes by category for easier rendering
const nodeGroups = NODE_DEFINITIONS.reduce((acc, node) => {
  if (!acc[node.category]) {
    acc[node.category] = [];
  }
  acc[node.category].push(node);
  return acc;
}, {} as Record<string, NodeDefinition[]>);


interface NodePaletteProps {
  onNodeSelect: (nodeType: string) => void;
}

export function NodePalette({ onNodeSelect }: NodePaletteProps) {
  return (
    <div className="h-full bg-muted/40 border-t border-border p-2">
      <Tabs defaultValue={Object.keys(nodeGroups)[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {Object.keys(nodeGroups).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(nodeGroups).map(([category, nodes]) => (
          <TabsContent key={category} value={category} className="mt-2">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {nodes.map((node) => (
                <Button
                  key={node.type}
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                  onClick={() => onNodeSelect(node.type)}
                >
                  {/* You could add an icon here later */}
                  <span className="text-xs text-center">{node.label}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}