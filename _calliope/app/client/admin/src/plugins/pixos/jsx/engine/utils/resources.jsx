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
    activityRequestUrl : function(id) { return "activities/"+id+".js" },
    actorRequestUrl: function(id) { return 'actors/'+id+'.js'; },
    tilesetRequestUrl: function(id) { return "tilesets/"+id+".tileset"; },
    zoneRequestUrl: function(id) { return "maps/"+id+".map"; },
};
