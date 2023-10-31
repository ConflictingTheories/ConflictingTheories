<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet">

<style>
[class*="spider"] {
  position: absolute;
  height: 40px;
  width: 50px;
  z-index:1000;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  margin: 40px 0 0 0;
  background: #110D04;
}

[class*="halloween"]{
  font-family: 'Eater', cursive;
}

[class*="spider"] *, [class*="spider"]:before, [class*="spider"]:after, [class*="spider"] :after, [class*="spider"] :before {
  position: absolute;
  content: "";
}
[class*="spider"]:before {
  width: 1px;
  background: #AAAAAA;
  left: 50%;
  top: -320px;
  height: 320px;
}
[class*="spider"] .eye {
  top: 16px;
  height: 14px;
  width: 12px;
  background: #FFFFFF;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
[class*="spider"] .eye:after {
  top: 6px;
  height: 5px;
  width: 5px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: black;
}
[class*="spider"] .eye.left {
  left: 14px;
}
[class*="spider"] .eye.left:after {
  right: 3px;
}
[class*="spider"] .eye.right {
  right: 14px;
}
[class*="spider"] .eye.right:after {
  left: 3px;
}
[class*="spider"] .leg {
  top: 6px;
  height: 12px;
  width: 14px;
  border-top: 2px solid #110D04;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  z-index: -1;
}
[class*="spider"] .leg.left {
  left: -8px;
  -moz-transform-origin: top right;
  -ms-transform-origin: top right;
  -webkit-transform-origin: top right;
  transform-origin: top right;
  -moz-transform: rotate(36deg) skewX(-20deg);
  -ms-transform: rotate(36deg) skewX(-20deg);
  -webkit-transform: rotate(36deg) skewX(-20deg);
  transform: rotate(36deg) skewX(-20deg);
  border-left: 2px solid #110D04;
  -moz-border-radius: 60% 0 0 0;
  -webkit-border-radius: 60%;
  border-radius: 60% 0 0 0;
  -moz-animation: legs-wriggle-left 1s 0s infinite;
  -webkit-animation: legs-wriggle-left 1s 0s infinite;
  animation: legs-wriggle-left 1s 0s infinite;
}
[class*="spider"] .leg.right {
  right: -8px;
  -moz-transform-origin: top left;
  -ms-transform-origin: top left;
  -webkit-transform-origin: top left;
  transform-origin: top left;
  -moz-transform: rotate(-36deg) skewX(20deg);
  -ms-transform: rotate(-36deg) skewX(20deg);
  -webkit-transform: rotate(-36deg) skewX(20deg);
  transform: rotate(-36deg) skewX(20deg);
  border-right: 2px solid #110D04;
  -moz-border-radius: 0 60% 0 0;
  -webkit-border-radius: 0;
  border-radius: 0 60% 0 0;
  -moz-animation: legs-wriggle-right 1s 0.2s infinite;
  -webkit-animation: legs-wriggle-right 1s 0.2s infinite;
  animation: legs-wriggle-right 1s 0.2s infinite;
}
[class*="spider"] .leg:nth-of-type(2) {
  top: 14px;
  left: -11px;
  -moz-animation: legs-wriggle-left 1s 0.8s infinite;
  -webkit-animation: legs-wriggle-left 1s 0.8s infinite;
  animation: legs-wriggle-left 1s 0.8s infinite;
}
[class*="spider"] .leg:nth-of-type(3) {
  top: 22px;
  left: -12px;
  -moz-animation: legs-wriggle-left 1s 0.2s infinite;
  -webkit-animation: legs-wriggle-left 1s 0.2s infinite;
  animation: legs-wriggle-left 1s 0.2s infinite;
}
[class*="spider"] .leg:nth-of-type(4) {
  top: 31px;
  left: -10px;
}
[class*="spider"] .leg:nth-of-type(6) {
  top: 14px;
  right: -11px;
}
[class*="spider"] .leg:nth-of-type(7) {
  top: 22px;
  right: -12px;
}
[class*="spider"] .leg:nth-of-type(8) {
  top: 31px;
  right: -10px;
  -moz-animation: legs-wriggle-right 1s 0.3s infinite;
  -webkit-animation: legs-wriggle-right 1s 0.3s infinite;
  animation: legs-wriggle-right 1s 0.3s infinite;
}

.spider_4 {
  right: 20%;
  margin-top: 50px;
}

.spider_5 {
  right: 5%;
  margin-top: 210px;
}

h1 {
  font-family: 'Creepster', cursive;
  color: #111111;
  -moz-animation: flicker 4s 0s infinite;
  -webkit-animation: flicker 4s 0s infinite;
  animation: flicker 4s 0s infinite;
}

@-moz-keyframes flicker {
  0%, 6%, 12% {
    text-shadow: none;
    color: #111111;
  }
  3%, 9% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6);
    color: #fa6701;
  }
  60% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
  100% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
}
@-webkit-keyframes flicker {
  0%, 6%, 12% {
    text-shadow: none;
    color: #111111;
  }
  3%, 9% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6);
    color: #fa6701;
  }
  60% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
  100% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
}
@keyframes flicker {
  0%, 6%, 12% {
    text-shadow: none;
    color: #111111;
  }
  3%, 9% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6);
    color: #fa6701;
  }
  60% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
  100% {
    text-shadow: 0 0 8px rgba(250, 103, 1, 0.6), 0 0 16px rgba(250, 103, 1, 0.4), 0 0 20px rgba(255, 0, 84, 0.2), 0 0 22px rgba(255, 0, 84, 0.1);
    color: #fa6701;
  }
}
</style>

# Happy Halloween from the Pixels Cafe! 👻 🎃

~ 20231030T231107 ~

<div class="halloween">
<div class='spider_0'>
  <div class='eye left'></div>
  <div class='eye right'></div>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
</div>
<div class='spider_4'>
  <div class='eye left'></div>
  <div class='eye right'></div>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
</div>
<div class='spider_5'>
  <div class='eye left'></div>
  <div class='eye right'></div>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg left'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
  <span class='leg right'></span>
</div>

Check out these halloween-themed appropriate video-game throwbacks:

---

### __Silent Hill__
## ![Silent Hill](https://wallpapercave.com/wp/ekoHPBT.jpg)

### __Fatal Frame__
## ![Fatal Frame](https://nintendoeverything.com/wp-content/uploads/fatal-frame.jpg)

### Resident Evil
## ![Resident Evil](<https://vignette.wikia.nocookie.net/residentevil/images/d/df/Stuffed_deer_room_2002_(1).jpg/revision/latest?cb=20150530010512>)

### Dino Crisis
## ![Dino Crisis](<https://r.mprd.se/media/images/51986-Dino_Crisis_(E)-1492553873.png>)

### Twisted Metal Black
## ![Twisted Metal Black](https://www.movienewsnet.com/wp-content/uploads/2021/02/Twisted-Metal-1024x576.jpg)

### BioShock
## ![BioShock](https://www.gamespot.com/a/uploads/screen_kubrick/123/1239113/2606973-bioshock.jpg)

### Deadspace
## ![Deadspace](https://thekoalition.com/images/2013/01/Dead-Space-3-PS3-4.jpg)

### Ghosthunter
![Ghosthunter](https://i.ytimg.com/vi/pWC7lluBTI0/maxresdefault.jpg)
</div>