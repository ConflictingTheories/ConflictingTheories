// This file is part of webglrpg-client, Copyright (C) 2011 Paul Chote
// You can redistribute and/or modify it under the terms of version 3 of the
// GNU General Public License, as published by the Free Software Foundation.
// See LICENSE.html for the license terms.
import { Vector, set, lerp } from "../../engine/utils/vector";
import Direction from "../../engine/utils/direction";
export default {
  init: function (from, to, length) {
    this.from = new Vector(...from);
    this.to = new Vector(...to);
    this.facing = Direction.fromOffset([Math.round(to.x - from.x), Math.round(to.y - from.y)]);
    console.log("loading - move");
    this.length = length;
  },
  tick: function (time) {
    let a = this.actor;
    if (!this.loaded) return;

    // Set facing
    if (this.facing != a.facing) a.setFacing(this.facing);

    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(this.to, a.pos);
      frac = 1;
    } else lerp(this.from, this.to, frac, a.pos);

    let newFrame = Math.floor(frac * 4);
    if (newFrame != a.animFrame) a.setFrame(newFrame);

    let hx = a.pos.x + a.hotspotOffset.x;
    let hy = a.pos.y + a.hotspotOffset.y;
    a.pos.z = a.zone.getHeight(hx, hy);

    return time >= endTime;
  },
};
