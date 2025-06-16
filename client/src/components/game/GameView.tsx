// src/components/game/GameView.tsx
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '@/phaser/scenes/MainScene';
import type { ScriptData } from '@/App';

interface GameViewProps {
  scriptData: ScriptData;
}

export default function GameView({ scriptData }: GameViewProps) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'phaser-container', // This div will host the canvas
      scene: [MainScene],      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 200 },
        },
      },
    };

    // Create the game instance
    gameRef.current = new Phaser.Game(config);    // Pass the script data to the main scene when it's ready
    gameRef.current.scene.start('MainScene', { scriptData });
    
    // Cleanup function to destroy the game instance on component unmount
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [scriptData]); // Include scriptData in dependencies

  // We only pass the scriptData once on init, but you could use a more
  // advanced pattern with a Phaser event emitter to update it live if needed.

  return <div id="phaser-container" className="w-full h-full" />;
}