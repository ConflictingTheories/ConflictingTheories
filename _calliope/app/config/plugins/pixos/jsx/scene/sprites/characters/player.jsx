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

import { Vector, set } from "../../../engine/utils/math/vector.jsx";
import { Direction } from "../../../engine/utils/enums.jsx";
import { ActionLoader } from "../../../engine/utils/loaders.jsx";
import Resources from "../../../engine/utils/resources.jsx";
// Object Definition
export default {
  // Character art from http://opengameart.org/content/chara-seth-scorpio
  src: Resources.artResourceUrl("player.gif"),
  sheetSize: [128, 256],
  tileSize: [24, 32],
  state: "intro",
  // Frames & Faces
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
  enableSpeech: true,
  // Offsets
  drawOffset: new Vector(-0.25, 1, 0.125),
  hotspotOffset: new Vector(0.5, 0.5, 0),
  // Should the camera follow the player?
  bindCamera: false,
  // Interaction Management
  interact: function (finish) {
    let ret = null;
    // React based on internal state
    switch (this.state) {
      case "intro":
        this.state = "loop";
        ret = new ActionLoader(this.engine, "dialogue", ["Welcome!", false, { autoclose: true }], this);
        break;
      case "loop":
        this.state = "loop2";
        ret = new ActionLoader(
          this.engine,
          "dialogue",
          ["I heard about a strange legend once.", false, { autoclose: true }],
          this
        );
        break;
      case "loop2":
        this.state = "loop";
        ret = new ActionLoader(
          this.engine,
          "dialogue",
          ["Sorry, I don't remember the story at the moment", false, { autoclose: true }],
          this
        );
        break;
      default:
        break;
    }
    // If completion handler passed through - call it when done
    if (finish) finish();
    return ret;
  },
  // Update
  tick: function (time) {
    if (!this.actionList.length) {
      // ONLY ONE MOVE AT A TIME
      let ret = this.checkInput();
      if (ret) {
        // Send action to the server
        // network.sendAction(ret);

        // Start running action locally to avoid latency
        // Local action will be replaced with a server-sanitised
        // version on the next update
        this.addAction(ret);
      }
    }
    if (this.bindCamera) set(this.pos, this.engine.cameraPosition);
  },
  // Reads for Input to Respond to
  checkInput: function () {
    let moveTime = 600; // move time in ms
    let facing = Direction.None;
    // Read Key presses
    switch (this.engine.keyboard.lastPressedKey("wsadhmp")) {
      // Movement
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
      case "b":
        this.bindCamera = true;
        break;
      case "c":
        this.bindCamera = false;
        break;
      // Interact with tile
      case "k":
        return new ActionLoader(this.engine, "interact", [this.pos.toArray(), this.facing, this.zone.world], this);
      // Help Dialogue
      case "h":
        return new ActionLoader(this.engine, "dialogue", ["Welcome! You pressed help!", false, { autoclose: true }], this);
      // Chat Message
      case "m":
        return new ActionLoader(this.engine, "chat", [">:", true, { autoclose: false }], this);
      case "p":
        let to = new Vector(8, 13, this.pos.z);
        return new ActionLoader(this.engine, "patrol", [this.pos.toArray(), to.toArray(), 600, this.zone], this);
      default:
        return null;
    }
    // Check Direction
    if (this.facing !== facing) {
      return this.faceDir(facing);
    }
    // Determine Location
    let from = this.pos;
    let dp = Direction.toOffset(facing);
    let to = new Vector(...[Math.round(from.x + dp[0]), Math.round(from.y + dp[1]), 0]);
    // Check zones if changing
    if (!this.zone.isInZone(to.x, to.y)) {
      let z = this.zone.world.zoneContaining(to.x, to.y);
      if (!z || !z.loaded || !z.isWalkable(to.x, to.y, Direction.reverse(facing))) {
        return this.faceDir(facing);
      }
      return new ActionLoader(this.engine, "changezone", [this.zone.id, this.pos.toArray(), z.id, to.toArray(), moveTime], this);
    }
    // Check Walking
    if (!this.zone.isWalkable(to.x, to.y, Direction.reverse(facing))) {
      return this.faceDir(facing);
    }
    return new ActionLoader(this.engine, "move", [this.pos.toArray(), to.toArray(), moveTime], this);
  },
  // Set Facing
  faceDir: function (facing) {
    if (this.facing == facing || facing === Direction.None) return null;
    return new ActionLoader(this.engine, "face", [facing], this);
  },
  // set message (for chat bubbles)
  setGreeting: function (greeting) {
    this.speech.clearHud();
    this.speech.writeText(greeting);
    this.speech.loadImage();
    return new ActionLoader(this.engine, "greeting", [greeting, { autoclose: true }], this);
  },
};
