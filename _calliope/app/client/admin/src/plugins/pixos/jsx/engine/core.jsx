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

import { create, rotate, translate, perspective, isPowerOf2, from } from './utils/matrix4';
import { Vector, negate} from './utils/vector';
import Texture from './texture';
export default class GLEngine {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.modelViewMatrixStack = [];
    this.textures = [];
    this.cameraAngle = 45;
    this.cameraPosition = new Vector(0, 0, 0);
    this.cameraOffset = new Vector(0, 0, 0);
    this.setCamera = this.setCamera.bind(this);
    this.render = this.render.bind(this);
    this.setMatrixUniforms = this.setMatrixUniforms.bind(this);
  }

  // Initialize a Scene object
  init(scene) {
    const gl = this.canvas.getContext('webgl');
    if (!gl) {
      throw new Error('WebGL : unable to initialize');
    }
    console.log(scene);
    this.gl = gl;
    this.scene = scene;

    // Configure GL
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    // Initialize Shader
    this.initShaderProgram(gl, scene.shaders);

    // Initialize Project Matrix
    this.initProjection(gl);

    // Dummy Model Matrix
    this.modelMatrix = create();
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.uModelMat, false, this.modelMatrix);

    // Initialize Scene
    scene.init(this);

    // Render
    this.requestId = requestAnimationFrame(this.render);
  }

  // Load and Compile Shader Source
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`An error occurred compiling the shaders: ${log}`);
    }
    return shader;
  };

  // Initialize Shader Program
  initShaderProgram = (gl, { vs: vsSource, fs: fsSource }) => {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Could Link
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(`WebGL unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
    }

    // Use Shader
    gl.useProgram(shaderProgram);

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        aPos: gl.getAttribLocation(shaderProgram, 'aPos'),
        aTexCoord: gl.getAttribLocation(shaderProgram, 'aTexCoord'),
      },
      uniformLocations: {
        uProjMat: gl.getUniformLocation(shaderProgram, 'uProjMatrix'),
        uModelMat: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
        uViewMat: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      },
      setMatrixUniforms : this.setMatrixUniforms
    };

    gl.enableVertexAttribArray(this.programInfo.attribLocations.aPos);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.aTexCoord);

    return shaderProgram;
  };

  setMatrixUniforms() {
    let {gl} = this;
    gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.uProjMat,
      false,
      this.uProjMat
    );
    gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.uViewMat,
      false,
      this.uViewMat
    )
  }

  // Set FOV and Perspective
  initProjection(gl) {
    const fieldOfView = (60 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 200.0;
    this.uProjMat = perspective(fieldOfView, aspect, zNear, zFar);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.uProjMat, false, this.uProjMat);
  }

  // Set Camera Pos & Angle
  setCamera() {
    var gl = this.gl;
    // var ang = this.cameraAngle.toArray();
    // var pos = this.cameraOffset.toArray();

    this.uViewMat = create();
    translate(this.uViewMat, this.uViewMat, [0.0, 0.0, -15.0]);
    rotate(
      this.uViewMat,
      this.uViewMat,
      this.degToRad(this.cameraAngle),
      [1, 0, 0]
    );

    negate(this.cameraPosition, this.cameraOffset);
    translate(this.uViewMat, this.uViewMat, this.cameraOffset.toArray());

    // rotate(this.uViewMat, this.uViewMat, -ang[0] - Math.PI / 2, [1, 0, 0]);
    // rotate(this.uViewMat, this.uViewMat, ang[1], [0, 0, 1]);
    // rotate(this.uViewMat, this.uViewMat, -ang[2], [0, 1, 0]);
    // translate(this.uViewMat, this.uViewMat, [-pos[0], -pos[1], -pos[2]],);

    gl.uniformMatrix4fv(this.programInfo.uniformLocations.uViewMat, false, this.uViewMat);
  }

  // Clear Screen with Color (RGBA)
  clearScreen() {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  // Render Frame
  render(now) {
    this.scene.render(this, now);
    requestAnimationFrame(this.render);
  }

// individual buffer
  createBuffer(contents, type, itemSize) {
    let { gl } = this;
    let buf = gl.createBuffer();
    buf.itemSize = itemSize;
    buf.numItems = contents.length / itemSize;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(contents), type);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buf;
  }

  // Build Buffers for Rendering Vertices / Indices
  buildBuffers({ positions, indices, aTexCoordinates }) {
    const { gl } = this;
    // Vertex Buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // Texture Buffer
    const aTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aTexCoordinates), gl.STATIC_DRAW);
    // Indices
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // Return
    this.buffers = {
      position: vertexBuffer,
      texture: aTexCoordBuffer,
      index: indexBuffer,
    };
  }

  // Draw Chunk Buffer
  drawBuffer(buffer) {
    var gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(this.programInfo.attribLocations.aPos, 3, gl.FLOAT, false, 9 * 4, 0);
    gl.vertexAttribPointer(this.programInfo.attribLocations.aTexCoord, 2, gl.FLOAT, false, 9 * 4, 3 * 4);
    gl.drawArrays(gl.TRIANGLES, 0, buffer.vertices);
  };

  // Load Texture from URL
  loadTexture(url) {
    let { gl } = this;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      width, height, border, srcFormat, srcType,
      pixel);

    const image = new Image();
    image.onload = function () {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        srcFormat, srcType, image);

      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;

    return texture;
  }

  loadTexture(src) {
    if (this.textures[src]) return this.textures[src];
    this.textures[src] = new Texture(src, this);
    return this.textures[src];
  }

  // Blank Texture (Colour)
  blankTexture(color, unit) {
    let { gl } = this;
    const texture = gl.createTexture();
    // Create 1px white texture for pure vertex color operations (e.g. picking)
    gl.activeTexture(unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var white = new Uint8Array(color);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, white);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.uniform1i(this.programInfo.uniformLocations.uSampler, unit);

    return texture;
  }

  updateBuffer(buffer, contents) {
    let { gl } = this;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(contents));
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  bindBuffer(buffer, attribute) {
    let { gl } = this;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attribute, buffer.itemSize, gl.FLOAT, false, 0, 0);
  }

  bindTexture(texture) {
    texture.attach();
  }

  mvPushMatrix() {
    let copy = from(this.uViewMat);
    this.modelViewMatrixStack.push(copy);
  }

  mvPopMatrix() {
    if (this.modelViewMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    this.uViewMat = this.modelViewMatrixStack.pop();
  }

  // Clear Render Loop
  close() {
    cancelAnimationFrame(this.requestId);
  }

  degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
}
