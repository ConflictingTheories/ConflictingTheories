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

import { Vector, set, lerp } from "../../engine/utils/math/vector";
import { Direction } from "../../engine/utils/enums";

export default {
  init: function (from, to, length) {
    console.log("loading - move");
    this.from = new Vector(...from);
    this.to = new Vector(...to);
    this.facing = Direction.fromOffset([Math.round(to.x - from.x), Math.round(to.y - from.y)]);
    this.length = length;
  },
  tick: function (time) {
    if (!this.loaded) return;
    // Set facing
    if (this.facing != this.actor.facing) this.actor.setFacing(this.facing);
    // Transition & Move
    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(this.to, this.actor.pos);
      frac = 1;
    } else lerp(this.from, this.to, frac, this.actor.pos);
    // Get next frame
    let newFrame = Math.floor(frac * 4);
    if (newFrame != this.actor.animFrame) this.actor.setFrame(newFrame);
    // Determine height
    let hx = this.actor.pos.x + this.actor.hotspotOffset.x;
    let hy = this.actor.pos.y + this.actor.hotspotOffset.y;
    this.actor.pos.z = this.actor.zone.getHeight(hx, hy);

    return time >= endTime;
  },
};
