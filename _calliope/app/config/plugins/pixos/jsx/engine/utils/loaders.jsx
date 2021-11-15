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

import Resources from "./resources";
import Actor from "../actor";
import Tileset from "../tileset";
import Activity from "../activity";

// Helps Loads New Tileset Instance
export class TilesetLoader {
  constructor(engine) {
    this.engine = engine;
    this.tilesets = {};
  }
  // Load Tileset
  async load(name) {
    let ts = this.tilesets[name];
    if (ts) return ts;
    // Generate Tileset
    this.tilesets[name] = ts = new Tileset(this.engine);
    ts.name = name;
    // Fetch Image and Apply
    const fileResponse = await fetch(Resources.tilesetRequestUrl(name));
    if (fileResponse.ok) {
      try {
        let content = await fileResponse.json();
        await ts.onJsonLoaded(content);
      } catch (e) {
        console.error("Error parsing tileset '" + ts.name + "' definition");
        console.error(e);
      }
    }
    return this.tilesets[name];
  }
}

// Helps Loads New Actor Instance
export class ActorLoader {
  constructor(engine) {
    this.engine = engine;
    this.definitions = [];
    this.instances = {};
    this.requestUrlLookup = Resources.actorRequestUrl;
  }
  // Load Actor
  async load(type) {
    let afterLoad = arguments[1];
    let runConfigure = arguments[2];
    if (!this.instances[type]) {
      this.instances[type] = [];
    }
    // New Instance
    let instance = new Actor(this.engine);
    Object.assign(instance, require("../../scene/actors/" + type + ".jsx")["default"]);
    instance.templateLoaded = true;
    // Update Existing
    this.instances[type].forEach(function (instance) {
      if (instance.afterLoad) instance.afterLoad(instance.instance);
    });
    // Configure if needed
    if (runConfigure) runConfigure(instance);
    // once loaded
    if (afterLoad) {
      console.log("after load");
      if (instance.templateLoaded) afterLoad(instance);
      else this.instances[type].push({ instance, afterLoad });
    }

    return instance;
  }
}

// Helps Loads New Activity Instance
export class ActivityLoader {
  constructor(engine, type, args, actor, id, time) {
    this.engine = engine;
    this.type = type;
    this.args = args;
    this.actor = actor;
    this.instances = {};
    this.definitions = [];

    if (!time) {
      time = new Date().getTime();
    }
    if (!id) {
      id = actor.id + "-" + type + "-" + time;
    }
    return this.load(
      type,
      function (activity) {
        activity.onLoad(args);
      },
      function (activity) {
        activity.configure(type, actor, id, time, args);
      }
    );
  }
  // Load Activity
  load(type) {
    let afterLoad = arguments[1];
    let runConfigure = arguments[2];
    if (!this.instances[type]) {
      this.instances[type] = [];
    }
    // New Instance (assigns properties loaded by type)
    let instance = new Activity(this.type, this.actor);
    Object.assign(instance, require("../../scene/activities/" + type + ".jsx")["default"]);
    instance.templateLoaded = true;
    // Notify existing
    this.instances[type].forEach(function (instance) {
      if (instance.afterLoad) instance.afterLoad(instance.instance);
    });
    // construct
    if (runConfigure) runConfigure(instance);
    // load
    if (afterLoad) {
      if (instance.templateLoaded) afterLoad(instance);
      else this.instances[type].push({ instance, afterLoad });
    }

    return instance;
  }
}
