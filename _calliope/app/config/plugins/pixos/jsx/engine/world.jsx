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
import { Direction } from "./utils/enums.jsx";

export default class World {
  constructor(engine) {
    this.engine = engine;
    this.zoneDict = {};
    this.zoneList = [];
    this.afterTickActions = new ActionQueue();
    this.sortZones = this.sortZones.bind(this);
  }

  // push action into next frame
  runAfterTick(action) {
    this.afterTickActions.add(action);
  }

  // Sort zones for correct render order
  sortZones() {
    this.zoneList.sort((a, b) => a.bounds[1] - b.bounds[1]);
  }

  // Fetch and Load Zone
  async loadZone(zoneId) {
    if (this.zoneDict[zoneId]) return this.zoneDict[zoneId];
    // Fetch Zone Remotely (allows for custom maps - with approved sprites / actions)
    let z = new Zone(zoneId, this);
    await z.load();
    this.zoneDict[zoneId] = z;
    this.zoneList.push(z);
    // Sort for correct render order
    z.runWhenLoaded(this.sortZones);
    return z;
  }

  // Remove Zone
  removeZone(zoneId) {
    this.zoneList = this.zoneList.filter((zone) => zone.id !== zoneId);
    delete this.zoneDict[zoneId];
  }

  // Update
  tick(time) {
    for (let z in this.zoneDict) this.zoneDict[z].tick(time);
    this.afterTickActions.run(time);
  }

  // Draw Each Zone
  draw() {
    for (let z in this.zoneDict) this.zoneDict[z].draw(this.engine);
  }

  // Check for Cell inclusion
  zoneContaining(x, y) {
    for (let z in this.zoneDict) {
      let zone = this.zoneDict[z];
      if (zone.loaded && zone.isInZone(x, y)) return zone;
    }
    return null;
  }

  /**
   * Finds a path if one exists between two points on the world
   * @param Vector from
   * @param Vector to
   */
  pathfind(from, to, initialFace = Direction.Right) {
    let moveList = [[from[0], from[1], 600]];
    let prevLocations = [[from[0], from[1], 600]];
    let currentPos = 0;
    let startZone = this.zoneContaining(from[0], from[1]);
    let facing = initialFace;
    // Trivial solution
    if (from[0] == to[0] && from[1] == to[1]) return moveList;
    // Calculate Path
    if (startZone.isInZone(to[0], to[1])) {
      // Same Zone
      single: while (true) {
        // Determine walkability options
        // if we are there - exit
        let placement = moveList[currentPos];
        if (placement[0] == to[0] && placement[1] == to[1]) break;
        // Determine walkability options
        // check adjacent tiles (ignoring previously visited, with a preference for Clockwise)
        let offset = Direction.toOffset(facing);
        let newSpot = [placement[0] + offset[0], placement[1] + offset[1]];
        let zone = startZone;
        // If we have hit a dead end - we will need to backtrack a bit
        if (prevLocations.includes(newSpot)) {
          if (moveList.length > 1) {
            // check a new direction that has been checked
            for (let i = 0; i < 4; i++) {
              facing = Direction.rotate(facing);
              offset = Direction.toOffset(facing);
              newSpot = [placement[0] + offset[0], placement[1] + offset[1]];
              if (prevLocations.includes(newSpot)) {
                continue;
              }
              // found one
              if (zone.isWalkable(...newSpot, facing)) {
                moveList.push([...newSpot, 600]); // add move
                currentPos++;
                continue single;
              }
            }
            // nothing found move back
            moveList.pop();
            currentPos--;
            continue;
          } else {
            return false; // no luck - could not find or walk anywhere.
          }
        }
        // otherwise keep moving
        if (zone.isWalkable(...newSpot, facing)) {
          moveList.push([...newSpot, 600]); // add move
          currentPos++;
        } else {
          facing = Direction.rotate(facing);
        }
        prevLocations.push(moveList[currentPos]); // track locations visited
      }
    } else {
      // Different Zone
      multi: while (true) {
        // if we are there - exit
        let placement = moveList[currentPos];
        if (placement[0] == to[0] && placement[1] == to[1]) break;
        // Determine walkability options
        // check adjacent tiles (ignoring previously visited, with a preference for Clockwise)
        let offset = Direction.toOffset(facing);
        let newSpot = [placement[0] + offset[0], placement[1] + offset[1]];
        let zone = this.zoneContaining(...newSpot);
        // If we have hit a dead end - we will need to backtrack a bit
        if (prevLocations.includes(newSpot)) {
          if (moveList.length > 1) {
            // check a new direction that has been checked
            for (let i = 0; i < 4; i++) {
              facing = Direction.rotate(facing);
              offset = Direction.toOffset(facing);
              newSpot = [placement[0] + offset[0], placement[1] + offset[1]];
              zone = this.zoneContaining(...newSpot);
              if (prevLocations.includes(newSpot)) {
                continue;
              }
              // found one
              if (zone.isWalkable(...newSpot, facing)) {
                moveList.push([...newSpot, 600]); // add move
                currentPos++;
                continue multi;
              }
            }
            // nothing found move back
            moveList.pop();
            currentPos--;
            continue;
          } else {
            return false; // no luck - could not find or walk anywhere.
          }
        }
        // otherwise keep moving
        if (zone.isWalkable(...newSpot, facing)) {
          moveList.push([...newSpot, 600]); // add move
          currentPos++;
        } else {
          facing = Direction.rotate(facing);
        }
        prevLocations.push(moveList[currentPos]); // track locations visited
      }
      return moveList;
    }
  }
}
