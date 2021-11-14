// This file is part of webglrpg-client, Copyright (C) 2011 Paul Chote
// You can redistribute and/or modify it under the terms of version 3 of the
// GNU General Public License, as published by the Free Software Foundation.
// See LICENSE.html for the license terms.
import { Vector, set } from "../../engine/utils/vector";
import Direction from "../../engine/utils/direction";
export default {
  init: async function (fromZoneId, from, toZoneId, to, length) {
    this.fromZone = await this.actor.zone.world.loadZone(fromZoneId);
    this.toZone = await this.actor.zone.world.loadZone(toZoneId);
    this.from = new Vector(from);
    this.to = new Vector(to);
    this.facing = Direction.fromOffset([
      Math.round(to[0] - from[0]),
      Math.round(to[1] - from[1]),
    ]);
    console.log('loading - change zone')
    this.length = length;
  },

  tick: function (time) {
    if (!this.toZone.loaded || !this.fromZone.loaded) return;

    let a = this.actor;

    // Set facing
    if (this.facing != a.facing) {
      a.facing = this.facing;
      a.setFrame(0);
    }

    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(new Vector(...this.to), a.pos);
      frac = 1;
    } else Vector.lerp(this.from, this.to, frac, a.pos);

    let newFrame = Math.floor(frac * 4);
    if (newFrame != a.animFrame) a.setFrame(newFrame);

    // Move into the new zone
    if (!a.zone.isInZone(a.pos[0], a.pos[1])) {
      this.fromZone.removeActor(a.id);

      // Defer until aftertick to stop the actor being ticked twice
      a.zone.world.runAfterTick(
        function () {
          this.toZone.addActor(a);
          debug.log(
            "actor '" +
              a.id +
              "' changed zone from '" +
              this.fromZone.id +
              "' to '" +
              this.toZone.id +
              "'"
          );
        }.bind(this)
      );
    }

    // Calculate new height
    let hx = a.pos[0] + a.hotspotOffset[0];
    let hy = a.pos[1] + a.hotspotOffset[1];

    if (!this.switchRenderZone && !this.fromZone.isInZone(hx, hy))
      this.switchRenderZone = true;

    a.pos[2] = (this.switchRenderZone ? this.toZone : this.fromZone).getHeight(
      hx,
      hy
    );

    return time >= endTime;
  },
};
