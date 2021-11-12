// This file is part of webglrpg-client, Copyright (C) 2011 Paul Chote
// You can redistribute and/or modify it under the terms of version 3 of the
// GNU General Public License, as published by the Free Software Foundation.
// See LICENSE.html for the license terms.

def = {
    init: function(from, to, length) {
        this.from = Vector.create(from);
        this.to = Vector.create(to);
        this.facing = Direction.fromOffset([Math.round(to[0] - from[0]), Math.round(to[1] - from[1])]);
        this.length = length;
    },

    tick: function(time) {
        var a = this.actor;
        if (!this.loaded)
            return;

        // Set facing
        if (this.facing != a.facing)
            a.setFacing(this.facing);

        var endTime = this.startTime + this.length;
        var frac = (time - this.startTime)/this.length;
        if (time >= endTime) {
            Vector.set(this.to, a.pos);
            frac = 1;
        }
        else
            Vector.lerp(this.from, this.to, frac, a.pos);

        var newFrame = Math.floor(frac*4);
        if (newFrame != a.animFrame)
            a.setFrame(newFrame);

        var hx = a.pos[0] + a.hotspotOffset[0];
        var hy = a.pos[1] + a.hotspotOffset[1];
        a.pos[2] = a.zone.getHeight(hx, hy);

        return time >= endTime;
    }
};