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

function drawBackground() {
  backGround.draw()
}

let tanks = [];

function generateTank() {
  tanks.push(new Tank (ctx));
}

function drawTanks() {
  tanks.forEach(function(tank) {
    tank.draw(counter);
  });
}

function moveTanks() {
  tanks.forEach(function(tank) {
    tank.move();
  });
}

function clearTanks() {
    tanks = tanks.filter(function(tank) {
      return tank.x >= -200;
    });
}

function moveBackground() {
  backGround.move()
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
  // if (plane.keyState.SPACE) {
  //   plane.fireMachinegun();
  // }
  // if (plane.keyState.B_KEY) {
  //   plane.dropBomb();
  // }
}

// function isCollision() {
//   // colisiones genéricas
//   // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
//   // esto chequea que el personaje no estén en colisión con cualquier obstáculo
//   return this.tanks.some(tank => {
//     return (
//       plane.x + plane.w >= tank.x &&
//       plane.x < tank.x + tank.w &&
//       plane.y + plane.h >= tank.y
//     );
//   });
// }

// function gameOver() {
//   clearInterval(intervalID)
//   alert("Game Over")
// }

let intervalID = setInterval ( () => {
clearScreen();
counter++;
drawBackground();
moveBackground();

// controlamos que frameCounter no sea superior a 2000
if (counter > 2000) {
  counter = 0;
}

// controlamos la velocidad de generación de tanques
if (counter % 200 === 0) {
  generateTank();
}
drawTanks();
moveTanks();
clearTanks();
drawplane();
keyStatus();
// if (isCollision()) {
//   gameOver();
// }



}, 1000 / gameFrames)
