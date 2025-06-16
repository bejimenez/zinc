// src/App.tsx
import { useState } from 'react';
import type { Node, Edge } from 'reactflow';
import EditorView from './components/editor/EditorView';
import GameView from './components/game/GameView';
import { Button } from './components/ui/button';

// We'll define a type for our script data
export type ScriptData = {
  nodes: Node[];
  edges: Edge[];
};

function App() {
  const [isEditorMode, setEditorMode] = useState(true);
  const [scriptData, setScriptData] = useState<ScriptData>({ nodes: [], edges: [] });

  const handlePlay = (currentScript: ScriptData) => {
    setScriptData(currentScript);
    setEditorMode(false);
  };

  const handleStop = () => {
    setEditorMode(true);
  };

  return (
      <div className="w-screen h-screen bg-background text-foreground">
        {isEditorMode ? (
          <EditorView onPlay={handlePlay} />
        ) : (
          <div>
            <div className="absolute top-2 left-2 z-10">
              <Button onClick={handleStop} variant="destructive">
                Stop
              </Button>
            </div>
            <GameView scriptData={scriptData} />
          </div>
        )}
      </div>
  );
}

export default App;