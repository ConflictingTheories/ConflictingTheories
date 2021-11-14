export default class Keyboard {
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
    let c = String.fromCharCode(e.keyCode).toLowerCase();
    if (Keyboard._instance.activeKeys.indexOf(c) < 0) Keyboard._instance.activeKeys.push(c);
    Keyboard._instance.shift = e.shiftKey;
  }

  onKeyUp(e) {
    console.log('up');
    let c = String.fromCharCode(e.keyCode).toLowerCase();
    Keyboard._instance.activeKeys.erase(c);
  }

  // Return the last pressed key in keys
  lastPressed(keys) {
    let lower = keys.toLowerCase();
    let max = null;
    let maxI = -1;
    for (let i = 0; i < keys.length; i++) {
      let k = lower[i];
      let index = Keyboard._instance.activeKeys.indexOf(k);
      if (index > maxI) {
        max = k;
        maxI = index;
      }
    }
    return max;
  }
}