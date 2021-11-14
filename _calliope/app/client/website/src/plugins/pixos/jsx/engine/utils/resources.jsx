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

export default {
  activityRequestUrl: (id) => "activities/" + id + ".js",
  actorRequestUrl: (id) => "actors/" + id + ".js",
  tilesetRequestUrl: (id) => "tilesets/" + id + ".tileset",
  zoneRequestUrl: (id) => "maps/" + id + ".map",
};
