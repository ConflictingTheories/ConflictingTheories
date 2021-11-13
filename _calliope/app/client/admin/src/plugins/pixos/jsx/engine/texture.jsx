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
import ActionQueue from "./queue";
export default class Texture {
  constructor(src, engine) {
    this.engine = engine;
    this.src = src;
    this.glTexture = engine.gl.createTexture();
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = src;
    this.loaded = false;
    this.onLoadActions = new ActionQueue();
  }

  runWhenLoaded(a) {
    if (this.loaded) a();
    else this.onLoadActions.add(a);
  }

  onImageLoaded() {
    console.log("loaded image '" + this.src + "'");
    this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, this.glTexture);
    this.engine.gl.texImage2D(
      this.engine.gl.TEXTURE_2D,
      0,
      this.engine.gl.RGBA,
      this.engine.gl.RGBA,
      this.engine.gl.UNSIGNED_BYTE,
      this.image
    );
    this.engine.gl.texParameteri(this.engine.gl.TEXTURE_2D, this.engine.gl.TEXTURE_MAG_FILTER, this.engine.gl.NEAREST);
    this.engine.gl.texParameteri(this.engine.gl.TEXTURE_2D, this.engine.gl.TEXTURE_MIN_FILTER, this.engine.gl.NEAREST);
    this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, null);

    this.loaded = true;
    this.onLoadActions.run();
  }

  bind() {
    this.engine.gl.activeTexture(this.engine.gl.TEXTURE0);
    this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, this.glTexture);
    this.engine.gl.uniform1i(this.engine.programInfo.program.samplerUniform, 0);
  }
}
