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
import fs from "../shaders/fs";
import vs from "../shaders/vs";

// Pixos
import World from "../engine/world";

// Instance
const impl = {};

// Scene Object
const scene = {
  // Shaders
  shaders: {
    fs: fs(),
    vs: vs(),
  },
};

// Init Scene
scene.init = async (engine) => {
  // game Engine & Timing
  impl.engine = engine;
  impl.squareRotation = 0;
  impl.from = null;

  // Init Game Engine Components
  let world = (impl.world = new World(engine));
  await world.loadZone("dungeon-top");
  await world.loadZone("dungeon-bottom");
  world.zoneList.forEach(function (z) {
    z.runWhenLoaded(()=>console.log('loading...done'));
  });
};

// Render Loop
scene.render = (engine, now) => {
  // Draw Frame
  // engine.initProjection();
  impl.world.tick(now);
  impl.world.draw(engine);
};

// Keyboard handler for Scene
scene.onKeyEvent = (key, down) => {
  console.log("-----", key);
};

// Mouse Handler for Scene
scene.onMouseEvent = (x, y, type, rmb, e) => {
  console.log("mouse");
};

export default scene;
