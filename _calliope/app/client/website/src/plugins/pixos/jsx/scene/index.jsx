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

// Shaders
import fs from "./shaders/fs";
import vs from "./shaders/vs";
import World from "../engine/world";

// Scene Object
export default class Scene {
  constructor() {
    // Shaders
    this.shaders = {
      fs: fs(),
      vs: vs(),
    };
    // Singleton
    if (!Scene._instance) {
      Scene._instance = this;
    }
    return Scene._instance;
  }

  // Init Scene
  init = async (engine) => {
    // game Engine & Timing
    Scene._instance.engine = engine;
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
  };

  // Draw Scene
  draw = (engine) => {
    engine.clearScreen();
    Scene._instance.world.draw(engine);
  };

  // Keyboard handler for Scene
  onKeyEvent = (e, down) => {
    console.log("-----", e);
    if (down) {
      Scene._instance.engine.keyboard.onKeyDown(e);
    } else Scene._instance.engine.keyboard.onKeyUp(e);
  };

  // Mouse Handler for Scene
  onMouseEvent = (x, y, type, rmb, e) => {
    e.preventDefault();
    console.log(`pos -- ${x}, ${y}`, rmb, e);
  };
}
