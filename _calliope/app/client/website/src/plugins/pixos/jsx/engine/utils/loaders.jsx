import Config from "./config";
import Actor from "../actor";
import Tileset from "../tileset";

export class TilesetLoader {
  constructor(engine) {
    this.engine = engine;
    this.tilesets = {};
  }

  async load(name) {
    var ts = this.tilesets[name];
    if (ts) return ts;

    this.tilesets[name] = ts = new Tileset(this.engine);
    ts.name = name;

    const fileResponse = await fetch(Config.tilesetRequestUrl(name));
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

export class ActorLoader {
  constructor(engine) {
    this.engine = engine;
    this.definitions = [];
    this.instances = {};
    this.baseClass = Actor;
    this.requestUrlLookup = Config.actorRequestUrl;
  }

  async load(type) {
    var afterLoad = arguments[1];
    var afterConstruct = arguments[2];

    // Unknown class type - create a skeleton class to be updated once the code has downloaded
    if (typeof this.definitions[type] === "undefined") {
      this.definitions[type] = new this.baseClass(this.engine);
      this.instances[type] = [];
      var self = this;
      var url = this.requestUrlLookup(type);
      
      // TODO --- NEED TO LOAD FROM CLASSES -- REPLACE BASE CLASS 
      // const fileResponse = await fetch(url);
      // if (fileResponse.ok) {
      //   try {
      //     let json = await fileResponse.text();
      //     var def;
      //     try {
      //       // TODO -- FIX THIS!!! 
      //       eval(json);
      //     } catch (e) {
      //       var lineNumber = "";
      //       // Dirty browser specific hack to determine line number in loaded file
      //       if (e.lineNumber)
      //         lineNumber = e.lineNumber - new Error().lineNumber + 6;

      //       console.error(
      //         "Error in type definition for " + type + ":" + lineNumber
      //       );
      //       console.error(e.message);
      //     }
      //     console.log(self.definitions[type]);
      //     console.log(def);

          // self.definitions[type].implement(def);
          Object.assign(self.definitions[type],require("../../sceneProvider/actors/"+type+".jsx")['default']);
          self.definitions[type].templateLoaded = true;

          // notify existing actor instances
          self.instances[type].forEach(function (i) {
            if (i.f) i.f(i.i);
          });
          console.log("Loaded definition for type '" + type + "'");
        // } catch (e) {
        //   console.error("Error fetching definition for '" + type + "'");
        //   console.error(e);
        // }
      // }
    }

    var instance = this.definitions[type];
    if (afterConstruct) afterConstruct(instance);

    if (afterLoad) {
      if (instance.templateLoaded) afterLoad(instance);
      else this.instances[type].push({ i: instance, f: afterLoad });
    }

    return instance;
  }
}
