// src/phaser/scenes/MainScene.ts
import Phaser from "phaser";
import type { ScriptData } from "@/App";
// You'll create and import your interpreter here later
// import { Interpreter } from '@/lib/interpreter';

export class MainScene extends Phaser.Scene {
  private scriptData?: ScriptData;
  // private interpreter?: Interpreter;

  constructor() {
    super("MainScene");
  }

  init(data: { scriptData: ScriptData }) {
    this.scriptData = data.scriptData;
    console.log("Phaser scene received script data:", this.scriptData);
  }

  preload() {
    // You can load assets here later
    // this.load.image('player', 'path/to/player.png');
  }

  create() {
    this.add.text(20, 20, "Game Running!", {
      color: "#ffffff",
      fontSize: "24px",
    });

    // In the future, this is where you'll initialize your interpreter
    // this.interpreter = new Interpreter(this, this.scriptData);
    // this.interpreter.triggerEvent('onStart');

    // For now, let's just show some data from the script
    if (this.scriptData) {
      this.add.text(
        20,
        60,
        `Editor has ${this.scriptData.nodes.length} nodes.`,
        { color: "#ffff00" }
      );
    }
  }
}
