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

import { Vector, set } from "../../engine/utils/vector";
import { translate, rotate } from "../../engine/utils/matrix4";
export default {
  // Character art from http://opengameart.org/content/twelve-16x18-rpg-character-sprites-including-npcs-and-elementals
  src: "art/sewer.png",
  sheetSize: [256, 256],
  tileSize: [16, 16],
  frames: {
    up: [
      [0, 144],
      [16, 144],
      [32, 144],
      [48, 144],
      [64, 144],
      [80, 144],
    ],
  },
  drawOffset: new Vector(0, 1, 0.001),
  hotspotOffset: new Vector(0.5, 0.5, 0),
  lastTime: 0,
  accumTime: 0,
  blowTime: 0,
  frameTime: 150,

  init: function () {
    this.blowTime = Math.random() * 5000;
  },

  tick: function (time) {
    if (this.lastTime == 0) {
      this.lastTime = time;
      return;
    }
    // wait enough time
    this.accumTime += time - this.lastTime;
    if (this.accumTime < this.frameTime || (this.animFrame == 0 && this.accumTime < this.blowTime)) return;
    // reset animation
    if (this.animFrame == 5) {
      this.setFrame(0);
      this.blowTime = 1000 + Math.random() * 4000;
    } else {
      this.setFrame(this.animFrame + 1);
      this.accumTime = 0;
      this.lastTime = time;
    }
  },

  draw: function (engine) {
    if (!this.loaded) return;
    console.log("binding animated tile");
    engine.mvPushMatrix();
    translate(engine.uViewMat, engine.uViewMat, this.pos.toArray());
    // Lie flat on the ground
    translate(engine.uViewMat, engine.uViewMat, this.drawOffset.toArray());
    rotate(engine.uViewMat, engine.uViewMat, engine.degToRad(90), [1, 0, 0]);
    engine.bindBuffer(this.vertexPosBuf, engine.shaderProgram.vertexPositionAttribute);
    engine.bindBuffer(this.vertexTexBuf, engine.shaderProgram.textureCoordAttribute);
    this.texture.attach();
    // Draw
    engine.shaderProgram.setMatrixUniforms();
    engine.gl.drawArrays(engine.gl.TRIANGLES, 0, this.vertexPosBuf.numItems);
    engine.mvPopMatrix();
  },
};
