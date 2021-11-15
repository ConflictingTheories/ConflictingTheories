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
import Zone from "./zone.jsx";
import ActionQueue from "./queue.jsx";

export default class World {
  constructor(engine) {
    this.engine = engine;
    this.zoneDict = {};
    this.zoneList = [];
    this.afterTickActions = new ActionQueue();
    this.sortZones = this.sortZones.bind(this);
  }

  runAfterTick(action) {
    this.afterTickActions.add(action);
  }

  // Sort zones for correct render order
  sortZones() {
    this.zoneList.sort((a, b) => a.bounds[1] - b.bounds[1]);
  }

  async loadZone(zoneId) {
    if (this.zoneDict[zoneId]) return this.zoneDict[zoneId];

    let z = new Zone(zoneId, this);
    await z.load();
    this.zoneDict[zoneId] = z;
    this.zoneList.push(z);

    // Sort for correct render order
    z.runWhenLoaded(this.sortZones);
    return z;
  }

  removeZone(zoneId) {
    this.actorList.erase(this.zoneDict[zoneId]);
    delete this.zoneDict[zoneId];
  }

  tick(time) {
    for (let z in this.zoneDict) this.zoneDict[z].tick(time);

    this.afterTickActions.run(time);
  }

  draw() {
    for (let z in this.zoneDict) this.zoneDict[z].draw(this.engine);
  }

  zoneContaining(x, y) {
    for (let z in this.zoneDict) {
      let zone = this.zoneDict[z];
      if (zone.loaded && zone.isInZone(x, y)) return zone;
    }
    return null;
  }
}
