// src/lib/interpreter.ts

import type { ScriptData } from "@/App";
import { MainScene } from "@/phaser/scenes/MainScene";
import type { Node } from "reactflow";

export class Interpreter {
  private scene: MainScene;
  private script: ScriptData;
  private nodesMap: Map<string, Node>;

  constructor(phaserScene: MainScene, scriptData: ScriptData) {
    this.scene = phaserScene;
    this.script = scriptData;
    this.nodesMap = new Map(scriptData.nodes.map((node) => [node.id, node]));
  }

  public triggerEvent(eventType: "eventOnStart" | "eventOnUpdate") {
    for (const node of this.script.nodes) {
      // We check the node's `type` from the editor now
      if (node.type === eventType) {
        this.executeFrom(node.id);
      }
    }
  }

  private executeFrom(startNodeId: string) {
    let currentNodeId: string | null = startNodeId;

    // Safety break to prevent infinite loops in bad scripts
    let executionLimit = 100;

    while (currentNodeId && executionLimit > 0) {
      const node = this.nodesMap.get(currentNodeId);
      if (!node) break;

      // The Big Switch Statement
      switch (node.type) {
        case "eventOnStart":
          console.log('Interpreter: "On Start" event triggered.');
          break;

        case "actionSpawnPlayer": {
          console.log('Interpreter: Executing "Spawn Player".', node.data);
          const { objectId, assetKey, x, y } = node.data;

          // Basic validation
          if (objectId && assetKey && x !== undefined && y !== undefined) {
            // Check if object already exists to prevent duplicates
            if (this.scene.gameObjects.has(objectId)) {
              console.warn(
                `Object with ID "${objectId}" already exists. Skipping spawn.`
              );
            } else {
              const newSprite = this.scene.add.sprite(x, y, assetKey);
              this.scene.gameObjects.set(objectId, newSprite);
              console.log(
                `Spawned "${assetKey}" with ID "${objectId}" at (${x}, ${y})`
              );
            }
          } else {
            console.error("Spawn Player node is missing data.", node.data);
          }
          break;
        }

        // Add more cases here for 'actionMove', etc. later
      }

      // Find the next node to execute via the 'exec-out' handle
      const nextEdge = this.script.edges.find(
        (edge) =>
          edge.source === currentNodeId && edge.sourceHandle === "exec-out"
      );
      currentNodeId = nextEdge ? nextEdge.target : null;
      executionLimit--;
    }
    if (executionLimit === 0) {
      console.error(
        "Execution limit reached. Check for infinite loops in your script."
      );
    }
  }
}
