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
export default class Activity {
  constructor(type, actor) {
    this.type = type;
    this.actor = actor;
    this.time = new Date().getTime();
    this.id = actor.id + "-" + type + "-" + this.time;
  }
  // configure activity
  configure(type, actor, id, time, args) {
    this.actor = actor;
    this.id = id;
    this.type = type;
    this.startTime = time;
    this.creationArgs = args;
  }
  // initialize on load
  onLoad(args) {
    this.init.apply(this, args);
    this.loaded = true;
  }
  // serialize
  serialize() {
    return {
      id: this.id,
      time: this.startTime,
      zone: this.actor.zone.id,
      actor: this.actor.id,
      type: this.type,
      args: this.creationArgs,
    };
  }
}
