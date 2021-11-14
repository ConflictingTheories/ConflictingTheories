/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

import { create, translate, rotate } from "../engine/utils/matrix4";
import { cube, modelMerge } from "../engine/utils/elements";
import { Vector } from "../engine/utils/vector";
import Keyboard from "../engine/utils/keyboard";

// Shaders
import fs from "./shaders/fs";
import vs from "./shaders/vs";

import World from "../engine/world";

// Scene Object
export default class Scene {
  // Shaders
  constructor() {
    this.shaders = {
      fs: fs(),
      vs: vs(),
    };
    // Model Vertices / Indices / Etc... (OLD Method..... - For Static Model/Scenes)
    this.model = modelMerge(
      new Array(5).fill(0).map((_, i) => cube(new Vector(i * 2, i * 2, i * 3)))
    );

    // Instance
    if (!Scene._instance) {
      Scene._instance = this;
    }
    return Scene._instance;
  }

  // Init Scene
  init = async (engine) => {
    // game Engine & Timing
    Scene._instance.engine = engine;
    Scene._instance.squareRotation = 0;
    Scene._instance.from = null;
    // Init Game Engine Components
    let world = (Scene._instance.world = new World(engine));
    await world.loadZone("dungeon-top");
    await world.loadZone("dungeon-bottom");
    world.zoneList.forEach(function (z) {
      z.runWhenLoaded(() => console.log("loading...done"));
    });
  };

  // Load Scene Textures
  loadTextures = (engine) => {
    let { gl } = engine;
    // Create 1px white texture for pure vertex color operations (e.g. picking)
    var white = new Uint8Array([255, 255, 255, 255]);
    Scene._instance.texWhite = engine.blankTexture(white, gl.TEXTURE0);
    // Load Image Textures
    Scene._instance.texTerrain = engine.loadTexture("media/terrain.png");
    Scene._instance.texPlayer = engine.loadTexture("media/player.png");
  };

  // Render Loop
  render = (engine, now) => {
    // Build
    Scene._instance.world.tick(now);
    // Draw Frame
    this.draw(engine);
    // Update for next frame
    const deltaTime = Scene._instance.from === null ? 0 : now - Scene._instance.from;
    Scene._instance.from = now;
    Scene._instance.squareRotation += deltaTime * 0.001;
  };

  // Draw Scene
  draw = (engine) => {
    engine.clearScreen();
    Scene._instance.world.draw(engine);
  };

  // Keyboard handler for Scene
  onKeyEvent = (key, down) => {
    console.log("-----", key);
    if (down) Keyboard.onKeyDown(key);
    else Keyboard.onKeyUp(key);
  };

  // Mouse Handler for Scene
  onMouseEvent = (x, y, type, rmb, e) => {
    e.preventDefault();
    console.log(`pos -- ${x}, ${y}`, rmb, e);
  };
}
