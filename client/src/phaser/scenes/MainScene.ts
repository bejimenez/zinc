// src/phaser/scenes/MainScene.ts

import Phaser from "phaser";
import type { ScriptData } from "@/App";
import { Interpreter } from "@/lib/interpreter";

export class MainScene extends Phaser.Scene {
  private scriptData?: ScriptData;
  private interpreter?: Interpreter;

  // This Map will store all game objects created by the visual script.
  // The key is the 'Object ID' from the node (e.g., 'player'),
  // and the value is the Phaser GameObject itself.
  public gameObjects = new Map<string, Phaser.GameObjects.GameObject>();

  constructor() {
    super("MainScene");
  }

  init(data: { scriptData: ScriptData }) {
    this.scriptData = data.scriptData;
    // Clear the map for each new run
    this.gameObjects.clear();
  }

  preload() {
    // Load the assets we created in Step 1
    this.load.image("red", "/assets/red_square.png");
    this.load.image("blue", "/assets/blue_square.png");
  }

  create() {
    this.add.text(20, 20, "Game Running!", {
      color: "#ffffff",
      fontSize: "24px",
    });

    if (this.scriptData) {
      // Initialize the interpreter and tell it to start the game
      this.interpreter = new Interpreter(this, this.scriptData);
      this.interpreter.triggerEvent("eventOnStart");
    }
  }

  update() {
    // This will be used later for 'On Update' events
    // this.interpreter?.triggerEvent('eventOnUpdate');
  }
}
