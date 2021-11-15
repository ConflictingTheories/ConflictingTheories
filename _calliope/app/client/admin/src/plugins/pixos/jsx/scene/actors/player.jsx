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

import { Vector, set } from "../../engine/utils/vector";
import Direction from "../../engine/utils/direction";
import { ActivityLoader } from "../../engine/utils/loaders";
export default {
  // Character art from http://opengameart.org/content/chara-seth-scorpio
  src: "art/player.gif",
  sheetSize: [128, 256],
  tileSize: [24, 32],
  frames: {
    up: [
      [0, 0],
      [24, 0],
      [48, 0],
      [24, 0],
    ],
    right: [
      [0, 32],
      [24, 32],
      [48, 32],
      [24, 32],
    ],
    down: [
      [0, 64],
      [24, 64],
      [48, 64],
      [24, 64],
    ],
    left: [
      [0, 96],
      [24, 96],
      [48, 96],
      [24, 96],
    ],
  },
  drawOffset: new Vector(-0.25, 1, 0.125),
  hotspotOffset: new Vector(0.5, 0.5, 0),

  // Should the camera follow the player?
  bindCamera: true,

  tick: function (time) {
    if (!this.activityList.length) {
      let ret = this.checkInput();
      if (ret) {
        // Send activity to the server
        // network.sendActivity(ret);

        // Start running activity locally to avoid latency
        // Local activity will be replaced with a server-sanitised
        // version on the next update
        this.addActivity(ret);
      }
    }
    if (this.bindCamera) set(this.pos, this.engine.cameraPosition);
  },

  checkInput: function () {
    let moveTime = 600; // move time in ms
    let facing = Direction.None;
    console.log('checking', this.engine.keyboard.lastPressed("wsad"));
    switch (this.engine.keyboard.lastPressed("wsad")) {
      case "w":
        facing = Direction.Up;
        break;
      case "s":
        facing = Direction.Down;
        break;
      case "a":
        facing = Direction.Left;
        break;
      case "d":
        facing = Direction.Right;
        break;
      default:
        return null;
    }

    // Change Direction
    let faceDir = function (facing) {
      if (this.facing == facing) return null;
      return new ActivityLoader(this.engine, "face", [facing], this);
    }.bind(this);
    // Determine Location
    let from = this.pos;
    let dp = Direction.toOffset(facing);
    let to = new Vector(...[Math.round(from.x + dp[0]), Math.round(from.y + dp[1]), 0]);
    // Check Walking
    if (!this.zone.isWalkable(this.pos.x, this.pos.y, facing)) return faceDir(facing);
    else console.log("cannot walk");
    // Check zones if changing
    if (!this.zone.isInZone(to.x, to.y)) {
      let z = zone.world.zoneContaining(to.x, to.y);
      if (!z || !z.loaded || !z.isWalkable(to.x, to.y, Direction.reverse(facing))) return faceDir(facing);
      else {
        console.log("No zone!");
      }
      return new ActivityLoader(
        this.engine,
        "changezone",
        [this.zone.id, this.pos.toArray(), z.id, to.toArray(), moveTime],
        this
      );
    }
    // Check
    if (!this.zone.isWalkable(to.x, to.y, Direction.reverse(facing))) return faceDir(facing);
    else console.log("No Walk!");

    return new ActivityLoader(this.engine, "move", [this.pos.toArray(), to.toArray(), moveTime], this);
  },
};
