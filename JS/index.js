const w = window.innerWidth;
const h = window.innerHeight;
const w2 = w / 2;
const h2 = h / 2;
const PI_DOUBLE = Math.PI * 2;
const gameFrames = 40
let counter = 0;


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

let obstacles = [];

function generateObstacle() {
  obstacles.push(new Obstacle(w, plane.y, plane.h, ctx)
  );
}

function drawObstacles() {
  obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
}

function moveObstacles() {
  obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
}

function clearObstacles() {
    obstacles = obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
}

function moveBackground() {
  backGround.move()
}


let plane = new Plane(ctx);

function drawplane(){
  plane.draw(counter)
}


let intervalID = setInterval ( () => {
clearScreen();
counter++;
drawBackground();
moveBackground();
drawplane();

// controlamos que frameCounter no sea superior a 2000
if (counter > 2000) {
  counter = 0;
}

// controlamos la velocidad de generación de obstáculos
if (counter % 200 === 0) {
  generateObstacle();
}
drawObstacles();
moveObstacles();
clearObstacles();

console.log(obstacles)

}, 1000 / gameFrames)
