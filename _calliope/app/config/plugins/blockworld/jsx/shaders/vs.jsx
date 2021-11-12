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

export default function vs() {
  return `
  uniform mat4 uViewMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjMatrix;

  attribute Vector aPos;
  attribute vec2 aTexCoord;
  attribute vec4 aColor;

  varying vec4 vColor;
  varying vec2 vTexCoord;

  void main(void) {
    gl_Position = uProjMatrix * uViewMatrix * ( uViewMatrix * vec4( aPos, 1.0 ) );
    vTexCoord = aTexCoord;
    vColor = vec4(aColor.rgb, 1.0);
  }
`;
}
