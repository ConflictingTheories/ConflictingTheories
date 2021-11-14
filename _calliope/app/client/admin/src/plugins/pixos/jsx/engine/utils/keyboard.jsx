class Keyboard {
  constructor() {
    // Instance
    if (!Keyboard._instance) {
      this.activeKeys = [];
      this.shift = false;
      Keyboard._instance = this;
    }
    return Keyboard._instance;
  }

  onKeyDown(e) {
    console.log('down');
    var c = String.fromCharCode(e.keyCode).toLowerCase();
    if (Keyboard._instance.activeKeys.indexOf(c) < 0) Keyboard._instance.activeKeys.push(c);
    Keyboard._instance.shift = e.shiftKey;
  }

  onKeyUp(e) {
    console.log('up');
    var c = String.fromCharCode(e.keyCode).toLowerCase();
    Keyboard._instance.activeKeys.erase(c);
  }

  // Return the last pressed key in keys
  lastPressed(keys) {
    var lower = keys.toLowerCase();
    var max = null;
    var maxI = -1;
    for (var i = 0; i < keys.length; i++) {
      var k = lower[i];
      var index = Keyboard._instance.activeKeys.indexOf(k);
      if (index > maxI) {
        max = k;
        maxI = index;
      }
    }
    return max;
  }
}
export default new Keyboard();
