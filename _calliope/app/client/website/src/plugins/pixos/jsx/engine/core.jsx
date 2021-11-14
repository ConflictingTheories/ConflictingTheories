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
  create,
  rotate,
  translate,
  perspective,
  isPowerOf2,
  set,
} from "./utils/matrix4";
import { Vector, negate } from "./utils/vector";
import Texture from "./texture";
export default class GLEngine {
  constructor(canvas, width, height) {
    this.uViewMat = create();
    this.uProjMat = create();
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
  }

  // Initialize a Scene object
  async init(scene, keyboard) {
    const gl = this.canvas.getContext("webgl");
    if (!gl) {
      throw new Error("WebGL : unable to initialize");
    }
    console.log(scene);
    this.gl = gl;
    this.scene = scene;
    this.keyboard = keyboard;
    // Configure GL
    gl.viewportWidth = this.canvas.width;
    gl.viewportHeight = this.canvas.height; 
    gl.clearColor(0, 1.0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    this.initializedWebGl = true; // flag

    // Initialize Shader
    this.initShaderProgram(gl, scene.shaders);

    // Initialize Project Matrix
    this.initProjection(gl);

    // Initialize Scene
    await scene.init(this);
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
  }

  // Initialize Shader Program
  initShaderProgram = (gl, { vs: vsSource, fs: fsSource }) => {
    const self = this;
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(
        `WebGL unable to initialize the shader program: ${gl.getshaderProgramLog(
          shaderProgram
        )}`
      );
    }

    // Configure Shader
    gl.useProgram(shaderProgram);
    // Vertices
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    // Texture Coord
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    // Uniform Locations
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    // Uniform apply
    shaderProgram.setMatrixUniforms = function() {
        gl.uniformMatrix4fv(this.pMatrixUniform, false, self.uProjMat);
        gl.uniformMatrix4fv(this.mvMatrixUniform, false, self.uViewMat);
    };

    this.shaderProgram = shaderProgram;
    return shaderProgram;
  };

  // Set FOV and Perspective
  initProjection(gl) {
    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    this.uProjMat = perspective(fieldOfView, aspect, zNear, zFar);
    this.uViewMat = create();
  }

  // Set Camera Pos & Angle
  setCamera() {
    var gl = this.gl;
    translate(this.uViewMat, this.uViewMat, [0.0, 0.0, -15.0]);
    rotate(this.uViewMat,this.uViewMat,this.degToRad(this.cameraAngle),[1, 0, 0]);
    negate(this.cameraPosition, this.cameraOffset);
    translate(this.uViewMat, this.uViewMat, this.cameraOffset.toArray());
    // gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,false,this.uViewMat);
  }

  // Clear Screen with Color (RGBA)
  clearScreen() {
    const { gl } = this;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  // Render Frame
  render(now) {
    this.requestId = requestAnimationFrame(this.render);
    this.scene.render(this, now);
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
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(aTexCoordinates),
      gl.STATIC_DRAW
    );
    // Indices
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
    // Return
    this.buffers = {
      position: vertexBuffer,
      texture: aTexCoordBuffer,
      index: indexBuffer,
    };
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

  loadTexture(src) {
    if (this.textures[src]) return this.textures[src];
    this.textures[src] = new Texture(src, this);
    return this.textures[src];
  }

  bindTexture(texture) {
    texture.attach();
  }

  mvPushMatrix() {
    let copy = create();
    set(this.uViewMat, copy);
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
