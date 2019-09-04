const w = window.innerWidth;
const h = window.innerHeight;
const w2 = w / 2;
const h2 = h / 2;
const PI_DOUBLE = Math.PI * 2;
const gameFrames = 50;
let counter = 0;
const ground = h - 45;
let score = 0;

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
  ctx.clearRect(0, 0, w, h);
}

let backGround = new Background(w, h, ctx);

//mejor toda esta mandanga como métodos de la clase tank?

let tanks = [];

function generateTank() {
  tanks.push(new Tank(ctx));
}

function clearTanks() {
  tanks = tanks.filter(function(tank) {
    return tank.x >= -200;
  });
}
//enemyPlanes
let enemyPlanes = [];

function generateEnemyPlane() {
  enemyPlanes.push(new EnemyPlane(ctx));
}

function clearEnemyPlanes() {
  enemyPlanes = enemyPlanes.filter(function(enemyPlane) {
    return enemyPlane.x >= -200;
  });
}

let plane = new Plane(ctx);

function drawplane() {
  plane.draw(counter);
}

plane.setListeners();

function keyStatus() {
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

// Motor del juego
let intervalID = setInterval(() => {
  clearScreen();
  counter++;
  backGround.draw();
  backGround.move();

  // Generación de tanques
  if (counter % (10 + randomInt(100, 200)) === 0) {
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

  // Generación de enemy planes
  if (counter % (100 + randomInt(150, 300)) === 0) {
    generateEnemyPlane();
  }
  enemyPlanes.forEach(function(enemyPlane) {
    enemyPlane.draw(counter);
  });
  enemyPlanes.forEach(function(enemyPlane) {
    enemyPlane.move();
  });
  enemyPlanes = enemyPlanes.filter(function(enemyPlane) {
    return enemyPlane.x >= -200;
  });

  //Plane
  drawplane();
  keyStatus();
  plane.bombs = plane.bombs.filter(function(bomb) {
    return bomb.x >= -200;
  });
  plane.machineguns = plane.machineguns.filter(function(machinegun) {
    return machinegun.x < w
  })

  //collision check
  checkColisionTankPlane();
  checkColisionEnemyPlanePlane();
  checkColisionTankBomb();
  checkColisionEnemyPlaneMachinegun();
  //mantenimiento
  if (counter > 2000) {
    counter = 0;
  }
}, 1000 / gameFrames);

function drawScoreBoard() {
  scoreBoard.update(score);
}


//////COLISIONES//////

// Tanques-avion
function checkColisionTankPlane() {
  for (var i = 0; i < tanks.length; i++) {
    if (
      tanks[i].x < plane.x + plane.w &&
      tanks[i].x + tanks[i].w > plane.x &&
      tanks[i].y < plane.y + plane.h &&
      tanks[i].y + tanks[i].h > plane.y
    ) {
      
      tanks[i].collision = true;
      
    }
  }
}

function checkColisionEnemyPlanePlane() {
  for (var i = 0; i < enemyPlanes.length; i++) {
    if (
      enemyPlanes[i].x < plane.x + plane.w &&
      enemyPlanes[i].x + enemyPlanes[i].w > plane.x &&
      enemyPlanes[i].y < plane.y + plane.h &&
      enemyPlanes[i].y + enemyPlanes[i].h > plane.y
    ) {
      
      enemyPlanes[i].collision = true;
      // enemyPlanes[i].newEnemyPlane.src = ""
    }
  }
}

function checkColisionTankBomb() {
  for (var i = 0; i < plane.bombs.length; i++) {
    for (var j = 0; j < tanks.length; j++) {
      if (
        plane.bombs[i].x < tanks[j].x + tanks[j].w &&
        plane.bombs[i].x + plane.bombs[i].w > tanks[j].x &&
        plane.bombs[i].y < tanks[j].y + tanks[j].h &&
        plane.bombs[i].y + plane.bombs[i].h > tanks[j].y
      ) {
        
        tanks[j].collision = true;
        // bombs[i].explosion = true;
      }
    }
  }
}

function checkColisionEnemyPlaneMachinegun() {
  for (var i = 0; i < plane.machineguns.length; i++) {
    for (var j = 0; j < enemyPlanes.length; j++) {
      // console.log(enemyPlanes[j], plane.machineguns[i])
      if (
        plane.machineguns[i].x < enemyPlanes[j].x + enemyPlanes[j].w &&
        plane.machineguns[i].x + plane.machineguns[i].w > enemyPlanes[j].x &&
        plane.machineguns[i].y < enemyPlanes[j].y + enemyPlanes[j].h &&
        plane.machineguns[i].y + plane.machineguns[i].h > enemyPlanes[j].y
      ) {
        enemyPlanes[j].collision = true;
        console.log("colision ametralladora avion");
        // machineguns[i].collision = true;
      }
    }
  }
}
