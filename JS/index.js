const w = window.innerWidth;
const h = window.innerHeight;
const w2 = w / 2;
const h2 = h / 2;
const PI_DOUBLE = Math.PI * 2;
const gameFrames = 40
let counter = 0;
const ground = h - 45;

const canvasDOMEL = document.querySelector("#canvas");
const ctx = canvasDOMEL.getContext("2d");

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

canvasDOMEL.setAttribute("width", `${w}px`);
canvasDOMEL.setAttribute("height", `${h}px`);

function clearScreen() {
  ctx.clearRect(0, 0, w, h)
}

let backGround = new Background(w,h,ctx);


//mejor toda esta mandanga como métodos de la clase tank?

let tanks = [];

function generateTank() {
  tanks.push(new Tank (ctx));
}



function clearTanks() {
    tanks = tanks.filter(function(tank) {
      return tank.x >= -200;
    });
}

let plane = new Plane(ctx);

function drawplane(){
  plane.draw(counter)
}

plane.setListeners();

function keyStatus(){
  if (plane.keyState.TOP_KEY && plane.y > 5) {
    plane.y -= 10;
  }
  if (plane.keyState.BOTT_KEY && plane.y < h - 200) {
    plane.y += 10;
  }
  if (plane.keyState.LEFT_KEY && plane.x > 20) {
    plane.x -= 10;
  }
  if (plane.keyState.RIGHT_KEY && plane.x < w - 250) {
    plane.x += 10;
  }
}

// function checkColisionBombTank() {
//   for (var i = 0; i < player.quaffles.length; i++) {
//     for (var j = 0; j < hoops.length; j++) {
//       if (
//         player.quaffles[i].x < hoops[j].x + hoops[j].w &&
//         player.quaffles[i].x + player.quaffles[i].w > hoops[j].x &&
//         player.quaffles[i].y < hoops[j].y + hoops[j].h &&
//         player.quaffles[i].y + player.quaffles[i].h > hoops[j].y) {

//         if (hoops[j].scoring) {
//           console.log("Has sumado un punto");
//         }
//         hoops[j].scoring = false;
//       }
//     }
//   }
// }



let intervalID = setInterval ( () => {
clearScreen();
counter++;
backGround.draw();
backGround.move();

// controlamos la velocidad de generación de tanques
if (counter % (100 + randomInt(100, 200)) === 0) {
  generateTank();
}
tanks.forEach(function(tank) {
  tank.draw(counter);
});
tanks.forEach(function(tank) {
  tank.move();
});

tanks = tanks.filter(function(tank) {
  return tank.x >= -200;
});
drawplane();
keyStatus();

if (counter > 2000) {
    counter = 0;
  }
}, 1000 / gameFrames)
