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
import { ActionLoader } from "../../../engine/utils/loaders.jsx";
export default {
  // Character art from http://opengameart.org/content/twelve-16x18-rpg-character-sprites-including-npcs-and-elementals
  src: Resources.artResourceUrl("elementals-2.gif"),
  sheetSize: [64, 128],
  tileSize: [16, 18],
  // Frame Positions
  frames: {
    up: [
      [0, 54],
      [16, 54],
      [32, 54],
      [48, 54],
    ],
    right: [
      [0, 72],
      [16, 72],
      [32, 72],
      [16, 72],
    ],
    down: [
      [0, 90],
      [16, 90],
      [32, 90],
      [16, 90],
    ],
    left: [
      [48, 54],
      [48, 72],
      [48, 90],
      [48, 72],
    ],
  },
  enableSpeech: true,
  // Offsets
  drawOffset: new Vector(0, 1, 0.2),
  hotspotOffset: new Vector(0.5, 0.5, 0),
  // Interaction Management
  state: "intro",
  interact: function (finish) {
    let ret = null;
    // React based on internal state
    switch (this.state) {
      case "intro":
        this.state = "loop";
        ret = new ActionLoader(
          this.engine,
          "dialogue",
          ["Welcome!", false, { autoclose: true, onClose: () => finish(true) }],
          this
        );
        break;
      case "loop":
        this.state = "loop2";
        ret = new ActionLoader(
          this.engine,
          "dialogue",
          ["I heard about a strange legend once.", false, { autoclose: true, onClose: () => finish(true) }],
          this
        );
        break;
      case "loop2":
        this.state = "loop";
        ret = new ActionLoader(
          this.engine,
          "dialogue",
          ["Sorry, I don't remember the story at the moment", false, { autoclose: true, onClose: () => finish(true) }],
          this
        );
        break;
      default:
        break;
    }
    console.log(ret);
    if (ret) this.addAction(ret);
    // If completion handler passed through - call it when done
    if (finish) finish(false);
    return ret;
  },
};
