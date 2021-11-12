import Config from "./config";
import Actor from "../actor";
import Tileset from "../tileset";

export class TilesetLoader {
  constructor(engine) {
    this.engine = engine;
    this.tilesets = {};
  }

  load(name) {
    var ts = this.tilesets[name];
    if (ts) return ts;

    this.tilesets[name] = ts = new Tileset(this.engine);
    ts.name = name;
    new Request.JSON({
      url: Config.tilesetRequestUrl(name),
      method: "get",
      link: "chain",
      secure: true,
      onSuccess: function (json) {
        ts.onJsonLoaded(json);
      },
      onFailure: function () {
        console.error("Error fetching tileset definition '" + ts.name + "'");
      },
      onError: function (text, error) {
        console.error(
          "Error parsing tileset '" + ts.name + "' definition: " + error
        );
        console.error(text);
      },
    }).send();

    return this.tilesets[name];
  }
}

export class ActorLoader {
  constructor(engine) {
    this.engine = engine;
    this.definitions = [];
    this.instances = {};
    this.baseClass = Actor;
    this.requestUrlLookup = Config.requestUrlLookup;
  }

  load(type) {
    var afterLoad = arguments[1];
    var afterConstruct = arguments[2];

    // Unknown class type - create a skeleton class to be updated once the code has downloaded
    if (typeof this.definitions[type] === "undefined") {
      this.definitions[type] = new this.baseClass(this.engine);
      this.instances[type] = [];
      var self = this;
      var url = this.requestUrlLookup(type);
      new Request({
        url: url,
        method: "get",
        link: "chain",
        onSuccess: function (json) {
          var def;
          try {
            eval(json);
          } catch (e) {
            var lineNumber = "";
            // Dirty browser specific hack to determine line number in loaded file
            if (e.lineNumber)
              lineNumber = e.lineNumber - new Error().lineNumber + 6;

            console.error(
              "Error in type definition for " + type + ":" + lineNumber
            );
            console.error(e.message);
          }
          self.definitions[type].implement(def);
          self.definitions[type].implement({ templateLoaded: true });

          // notify existing actor instances
          self.instances[type].each(function (i) {
            if (i.f) i.f(i.i);
          });
          console.log("Loaded definition for type '" + type + "'");
        },
        onFailure: function () {
          console.error("Error fetching definition for '" + type + "'");
        },
      }).send();
    }

    var instance = new this.definitions[type]();
    if (afterConstruct) afterConstruct(instance);

    if (afterLoad) {
      if (instance.templateLoaded) afterLoad(instance);
      else this.instances[type].push({ i: instance, f: afterLoad });
    }

    return instance;
  }
}
