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

// Use Tileset
import Tiles from "../tilesets/sewer.tiles.jsx";
import { Vector } from "../../engine/utils/math/vector.jsx";
import { Direction } from "../../engine/utils/enums.jsx";
import { ActionLoader } from "../../engine/utils/loaders.jsx";
// Map Information
export default {
  bounds: [0, 0, 17, 10],
  tileset: "sewer",
  // (0,0) -> (17,10) (X, Y) (10 Rows x 17 Column)
  cells: [
    ...[
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.NLW_CORNER,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.NRW_CORNER,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.NLW_CORNER,
      Tiles.NLW_COLUMN,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.NRW_COLUMN,
      Tiles.NRW_CORNER,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.L_WALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.R_WALL,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.L_WALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.R_WALL,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.L_WALL,
      Tiles.NW_NPIT,
      Tiles.NW_NPIT,
      Tiles.N_STAIRWALL,
      Tiles.NW_NPIT,
      Tiles.NW_NPIT,
      Tiles.R_WALL,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.EMPTY,
      Tiles.NLW_CORNER,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.NLW_LAVA_COLUMN,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.N_STAIR,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.NRW_LAVA_COLUMN,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.N_WALL,
      Tiles.NRW_CORNER,
      Tiles.EMPTY,
    ],
    ...[
      Tiles.NLW_CORNER,
      Tiles.NLW_COLUMN,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.LW_LPIT,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.V_WALKWAY,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.RW_RPIT,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.NRW_COLUMN,
      Tiles.NRW_CORNER,
    ],
    ...[
      Tiles.L_WALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.LW_LPIT,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.V_WALKWAY,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.RW_RPIT,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.R_WALL,
    ],
    ...[
      Tiles.L_WALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.L_STAIRWALL,
      Tiles.L_STAIR,
      Tiles.H_WALKWAY,
      Tiles.H_WALKWAY,
      Tiles.C_WALKWAY,
      Tiles.H_WALKWAY,
      Tiles.H_WALKWAY,
      Tiles.R_STAIR,
      Tiles.R_STAIRWALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.R_WALL,
    ],
    ...[
      Tiles.L_WALL,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.LW_LPIT,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.V_WALKWAY,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.LAVA,
      Tiles.RW_RPIT,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.FLOOR,
      Tiles.R_WALL,
    ],
  ],
  // Sprites and Objects to be Loaded in the Scene & their Starting Points (includes effect tiles)
  sprites: [
    // NPCs
    { id: "darkness", type: "npc/darkness", pos: new Vector(...[10, 2, 0]), facing: Direction.Down },
    { id: "air", type: "npc/air-knight", pos: new Vector(...[8, 2, 0]), facing: Direction.Down },
    { id: "fire", type: "npc/fire-knight", pos: new Vector(...[2, 8, 0]), facing: Direction.Right },
    { id: "earth", type: "npc/earth-knight", pos: new Vector(...[14, 8, 0]), facing: Direction.Left },
    // Effect tiles
    { id: "spurt1", type: "effects/lavaspurt", pos: new Vector(...[10, 7, -1.5]), facing: Direction.Up },
    { id: "spurt2", type: "effects/lavaspurt", pos: new Vector(...[9, 6, -1.5]), facing: Direction.Up },
    { id: "spurt3", type: "effects/lavaspurt", pos: new Vector(...[10, 5, -1.5]), facing: Direction.Up },
    { id: "spurt4", type: "effects/lavaspurt", pos: new Vector(...[7, 6, -1.5]), facing: Direction.Up },
    { id: "spurt5", type: "effects/lavaspurt", pos: new Vector(...[6, 7, -1.5]), facing: Direction.Up },
    { id: "spurt6", type: "effects/lavaspurt", pos: new Vector(...[6, 9, -1.5]), facing: Direction.Up },
    { id: "spurt8", type: "effects/lavaspurt", pos: new Vector(...[9, 9, -1.5]), facing: Direction.Up },
    // Presently - player is treated like a normal sprite
    { id: "player", type: "characters/player", pos: new Vector(...[8, 8, -1]), facing: Direction.Down },
  ],
  // TODO - Add Scripts / Triggers for the Scene
  //
  scripts: [
    {
      id: "load-scene", // run automatically when loaded
      trigger: function () {
        let darkness = this.getSpriteById("darkness");
        darkness.addAction(new ActionLoader(this.engine, "patrol", [darkness.pos.toArray(), [8, 6, 0], 200, this], darkness));
      },
    },
    {
      id: "clear-path", // manually called custom script
      trigger: function () {
        let darkness = this.getSpriteById("darkness");
        darkness.addAction(new ActionLoader(this.engine, "patrol", [darkness.pos.toArray(), [10, 2, 0], 200, this], darkness));
      },
    },
    {
      id: "custom", // manually called custom script
      trigger: function () {
        let darkness = this.getSpriteById("darkness");
        darkness.addAction(new ActionLoader(this.engine, "dialogue", ["Hello!", false, { autoclose: true }], darkness));
      },
    },
  ],
  // TODO - Add in Scenes / Dialogue
  //
  scenes: [
    {
      id: "strange-legend",
      actions: [
        {
          sprite: "air",
          action: "dialogue",
          args: ["Sorry, I don't remember the story at the moment", false, { autoclose: true }],
          scope: this,
        },
        { trigger: "clear-path", scope: this },
        { trigger: "custom", scope: this },
      ],
    },
  ],
};
