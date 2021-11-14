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

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import glEngine from './engine/core';
import { MOUSE } from "./engine/enums"
import Keyboard from './engine/utils/keyboard';
//
const WebGLView = ({ width, height, SceneProvider, class: string }) => {
  const ref = useRef();

  let onMouseEvent = SceneProvider.onMouseEvent;

  useEffect(async () => {
    const canvas = ref.current;
    const engine = new glEngine(canvas, width, height);
    // Initialize Scene
    await engine.init(SceneProvider);
    return () => {
      engine.close();
    };
  }, [SceneProvider]);

  return <canvas
    tabIndex={0}
    ref={ref}
    width={width}
    height={height}
    className={string}
    onKeyDownCapture={(e)=> Keyboard._instance.onKeyDown(e.nativeEvent)}
    onKeyUpCapture={(e) => Keyboard._instance.onKeyUp(e.nativeEvent)}
    onContextMenu={(e) => onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.UP, true, e)}
    onMouseUp={(e) => onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.UP, e.nativeEvent.button == 3, e)}
    onMouseDown={(e) => onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.DOWN, e.nativeEvent.button == 3, e)}
    onMouseMove={(e) => onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.MOVE, e.nativeEvent.button == 3, e)} />;
};

WebGLView.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  SceneProvider: PropTypes.object.isRequired,
  class: PropTypes.string.isRequired,
};

export default WebGLView;
