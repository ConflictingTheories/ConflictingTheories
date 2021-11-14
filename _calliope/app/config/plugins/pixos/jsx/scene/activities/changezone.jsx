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
  init: async function (fromZoneId, from, toZoneId, to, length) {
    console.log("loading - change zone");
    this.fromZone = await this.actor.zone.world.loadZone(fromZoneId);
    this.toZone = await this.actor.zone.world.loadZone(toZoneId);
    this.from = new Vector(...from);
    this.to = new Vector(...to);
    this.facing = Direction.fromOffset([Math.round(to.x - from.x), Math.round(to.y - from.y)]);
    this.length = length;
  },
  tick: function (time) {
    if (!this.toZone.loaded || !this.fromZone.loaded) return;
    // Set facing
    if (this.facing != this.actor.facing) {
      this.actor.facing = this.facing;
      this.actor.setFrame(0);
    }
    // Time Animation
    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(this.to, this.actor.pos);
      frac = 1;
    } else lerp(this.from, this.to, frac, this.actor.pos);
    // New Frame
    let newFrame = Math.floor(frac * 4);
    if (newFrame != this.actor.animFrame) this.actor.setFrame(newFrame);
    // Move into the new zone
    if (!this.actor.zone.isInZone(this.actor.pos.x, this.actor.pos.y)) {
      this.fromZone.removeActor(this.actor.id);
      // Defer until aftertick to stop the actor being ticked twice
      this.actor.zone.world.runAfterTick(
        function () {
          this.toZone.addActor(this.actor);
          console.log(
            "actor '" + this.actor.id + "' changed zone from '" + this.fromZone.id + "' to '" + this.toZone.id + "'"
          );
        }.bind(this)
      );
    }
    // Calculate new height
    let hx = this.actor.pos.x + this.actor.hotspotOffset.x;
    let hy = this.actor.pos.y + this.actor.hotspotOffset.y;
    if (!this.switchRenderZone && !this.fromZone.isInZone(hx, hy)) {
      this.switchRenderZone = true;
    }
    this.actor.pos.z = (this.switchRenderZone ? this.toZone : this.fromZone).getHeight(hx, hy);

    return time >= endTime;
  },
};
