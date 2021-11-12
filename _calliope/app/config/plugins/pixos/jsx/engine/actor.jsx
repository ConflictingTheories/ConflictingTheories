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

import {
  rotate,
  translate,
} from "./utils/matrix4";

import { Direction } from "./utils/direction";
export default class Actor {
  constructor(engine) {
    this.engine = engine;
    this.templateLoaded = false;
    this.drawOffset = Vector.create();
    this.hotspotOffset = Vector.create();
    this.animFrame = 0;
    this.pos = Vector.create();
    this.facing = Direction.RIGHT;
    this.activityDict = {};
    this.activityList = [];
    this.onLoadActions = new ActionQueue();
  }

  runWhenLoaded(a) {
    if (this.loaded) a();
    else this.onLoadActions.add(a);
  }

  onLoad(instanceData) {
    if (this.loaded) return;

    if (!this.src || !this.sheetSize || !this.tileSize || !this.frames) {
      console.error("Invalid actor definition");
      return;
    }

    this.zone = instanceData.zone;
    if (instanceData.id) this.id = instanceData.id;
    if (instanceData.pos) Vector.set(instanceData.pos, this.pos);
    if (instanceData.facing) this.facing = instanceData.facing;

    this.texture = this.engine.loadTexture(this.src);
    this.texture.runWhenLoaded(this.onTilesetOrTextureLoaded.bind(this));
    this.vertexTexBuf = this.engine.createBuffer(
      this.getTexCoords(),
      gl.DYNAMIC_DRAW,
      2
    );

    this.zone.tileset.runWhenDefinitionLoaded(
      this.onTilesetDefinitionLoaded.bind(this)
    );
  }

  onTilesetDefinitionLoaded() {
    let s = this.zone.tileset.tileSize;
    let ts = [this.tileSize[0] / s, this.tileSize[1] / s];
    let v = [
      [0, 0, 0],
      [ts[0], 0, 0],
      [ts[0], 0, ts[1]],
      [0, 0, ts[1]],
    ];
    let poly = [
      [v[2], v[3], v[0]],
      [v[2], v[0], v[1]],
    ].flatten();
    this.vertexPosBuf = this.engine.createBuffer(poly, gl.STATIC_DRAW, 3);

    this.zone.tileset.runWhenLoaded(this.onTilesetOrTextureLoaded.bind(this));
  }

  onTilesetOrTextureLoaded() {
    if (this.loaded || !this.zone.tileset.loaded || !this.texture.loaded)
      return;

    this.init(); // Hook for actor implementations
    this.loaded = true;
    console.log(
      "Initialized actor '" + this.id + "' in zone '" + this.zone.id + "'"
    );

    this.onLoadActions.run();
  }

  getTexCoords(i) {
    let t =
      this.frames[Direction.actorSequence(this.facing)][this.animFrame % 4];
    let ss = this.sheetSize;
    let ts = this.tileSize;
    let bl = [(t[0] + ts[0]) / ss[0], t[1] / ss[1]];
    let tr = [t[0] / ss[0], (t[1] + ts[1]) / ss[1]];
    let v = [bl, [tr[0], bl[1]], tr, [bl[0], tr[1]]];
    let poly = [
      [v[0], v[1], v[2]],
      [v[0], v[2], v[3]],
    ];
    return poly.flatten();
  }

  draw(engine) {
    if (!this.loaded) return;

    engine.mvPushMatrix();
    translate(mvMatrix, this.pos);

    // Undo rotation so that character plane is normal to LOS
    translate(mvMatrix, this.drawOffset);
    rotate(mvMatrix, engine.degToRad(this.engine.cameraAngle), [1, 0, 0]);
    engine.bindBuffer(this.vertexPosBuf, shaderProgram.vertexPositionAttribute);
    engine.bindBuffer(this.vertexTexBuf, shaderProgram.textureCoordAttribute);
    engine.bindTexture(this.texture);
    shaderProgram.setMatrixUniforms();

    // Actors always render on top of everything behind them
    gl.depthFunc(gl.ALWAYS);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertexPosBuf.numItems);
    gl.depthFunc(gl.LESS);

    engine.mvPopMatrix();
  }

  setFrame(frame) {
    this.animFrame = frame;
    this.engine.updateBuffer(this.vertexTexBuf, this.getTexCoords());
  }

  setFacing(facing) {
    this.facing = facing;
    this.setFrame(this.animFrame);
  }

  addActivity(a) {
    if (this.activityDict[a.id]) this.removeActivity(a.id);

    this.activityDict[a.id] = a;
    this.activityList.push(a);
  }

  removeActivity(id) {
    this.activityList.erase(this.activityDict[id]);
    delete this.activityDict[id];
  }

  tickOuter(time) {
    if (!this.loaded) return;

    // Sort activities by increasing startTime, then by id
    this.activityList.sort(function (a, b) {
      let dt = a.startTime - b.startTime;
      if (!dt) return dt;
      return a.id > b.id ? 1 : -1;
    });

    let toRemove = [];
    this.activityList.each(function (a) {
      if (!a.loaded || a.startTime > time) return;

      // Activity returns true when it is complete
      if (a.tick(time)) toRemove.push(a);
    });

    toRemove.each(
      function (a) {
        this.removeActivity(a.id);
      }.bind(this)
    );

    if (this.tick) this.tick(time);
  }

  // Hook for actor implementations
  init() {}
}
