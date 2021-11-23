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

import { Vector } from "../../../engine/utils/math/vector.jsx";
import Resources from "../../../engine/utils/resources.jsx";
export default {
  // Character art from http://opengameart.org/content/chara-seth-scorpio
  src: Resources.artResourceUrl("earth-knight.gif"),
  sheetSize: [128, 256],
  tileSize: [24, 32],
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
};
