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

import { Vector, set, lerp } from "../../engine/utils/vector";
import Direction from "../../engine/utils/direction";
export default {
  init: function (from, to, length) {
    console.log("loading - move");
    this.from = new Vector(...from);
    this.to = new Vector(...to);
    this.facing = Direction.fromOffset([Math.round(to.x - from.x), Math.round(to.y - from.y)]);
    this.length = length;
  },
  tick: function (time) {
    let a = this.actor;
    if (!this.loaded) return;
    // Set facing
    if (this.facing != a.facing) a.setFacing(this.facing);
    // Transition & Move
    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(this.to, a.pos);
      frac = 1;
    } else lerp(this.from, this.to, frac, a.pos);
    // Get next frame
    let newFrame = Math.floor(frac * 4);
    if (newFrame != a.animFrame) a.setFrame(newFrame);
    // Determine height
    let hx = a.pos.x + a.hotspotOffset.x;
    let hy = a.pos.y + a.hotspotOffset.y;
    a.pos.z = a.zone.getHeight(hx, hy);

    return time >= endTime;
  },
};
