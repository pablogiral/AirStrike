// Variables básicas

const w = window.innerWidth;
const h = window.innerHeight;
const w2 = w / 2;
const h2 = h / 2;
const PI_DOUBLE = Math.PI * 2;
const gameFrames = 50;
const ground = h - 45;
const canvasDOMEL = document.querySelector("#canvas");
const ctx = canvasDOMEL.getContext("2d");
let counter = 0;
let score = 0;
let damagePoints = 0;
let isGameRunning = true;
let pause = false;
// Game Sounds
let menuMusic = new Audio("./../audio/Loop Inicio Doors.mp3");
let inGameMusic = new Audio("./../audio/All allong the watchtower.mp3")
let gameOverMusic = new Audio("./../audio/valkirias.mp3")
let pauseIn = new Audio("./../audio/sfx_sounds_pause2_in.wav")
let pauseOut = new Audio("./../audio/sfx_sounds_pause2_out.wav")
let bombDrop = new Audio("./../audio/sfx_wpn_grenadewhistle2.wav")
let bombExplosion = new Audio("./../audio/sfx_exp_medium6.wav")
let enemyExplosion = new Audio("./../audio/sfx_exp_short_hard10.wav")
let machinegunshot = new Audio("./../audio/sfx_wpn_machinegun_loop1.wav")

let tanks = [];
let enemyPlanes = [];
let backGround = undefined;
let plane = undefined;
let scoreBoard = undefined;
let intervalID = undefined;
let gameOverScreen = new Screen(ctx);

// utilidad random number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Dimensiones del canvas
function setCanvasDimensions() {
  canvasDOMEL.setAttribute("width", `${w}px`);
  canvasDOMEL.setAttribute("height", `${h}px`);
}
setCanvasDimensions();

// Clear Screen
function clearScreen() {
  ctx.clearRect(0, 0, w, h);
}

//Start Game
function startGame() {
  resetGame();
  menuMusic.pause();
  // pauseOut.play()
  menuMusic.currentTime = 0
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0
  inGameMusic.play()
  intervalID = setInterval(() => {
    if (pause) {
      let pauseScreen = new Screen(ctx);
      pauseScreen.drawPause();
      inGameMusic.pause()
      // pauseIn.play()
      menuMusic.play();
      return
    };
    clearScreen();
    counter++;
    if (counter % (10 + randomInt(100, 200)) === 0) {
      generateTank();
    }
    if (counter % (100 + randomInt(50, 150)) === 0) {
      generateEnemyPlane();
    }
    drawAll();
    moveAll();
    //collision check
    checkColisionTankPlane();
    checkColisionEnemyPlanePlane();
    checkColisionTankBomb();
    checkColisionEnemyPlaneBomb();
    checkColisionEnemyPlaneMachinegun();
    //limpiar
    clearAll();
    keyStatus();
    //mantenimiento
    if (counter > 2000) {
      counter = 0;
    }
    gameOver();
  }, 1000 / gameFrames);
}

// Stop Game
function stopGame() {
  clearInterval(intervalID);
  menuMusic.pause();
  menuMusic.currentTime = 0
}

function gameOver() {
  if (damagePoints >= 100) {
    stopGame();
    inGameMusic.pause();
    inGameMusic.currentTime = 0
    gameOverMusic.play();
    isGameRunning = false;
    gameOverScreen.drawGameOver();
    gameOverScreen.drawTotalPoints();
  }
}

// Reset del juego
function resetGame() {
  isGameRunning = true;
  backGround = new Background(w, h, ctx);
  plane = new Plane(ctx);
  setListeners();
  scoreBoard = new Scoreboard(ctx);
  counter = 0;
  score = 0;
  damagePoints = 0;
  enemyPlanes = [];
  tanks = [];
}

// acciones de tecla
function setListeners() {
  document.onkeydown = function(event) {
    if (event.keyCode === plane.keys.LEFT_KEY) {
      plane.keyState.LEFT_KEY = true;
    }
    if (event.keyCode === plane.keys.RIGHT_KEY) {
      plane.keyState.RIGHT_KEY = true;
    }
    if (event.keyCode === plane.keys.TOP_KEY) {
      plane.keyState.TOP_KEY = true;
    }
    if (event.keyCode === plane.keys.BOTT_KEY) {
      plane.keyState.BOTT_KEY = true;
    }
    if (event.keyCode === plane.keys.SPACE) {
      plane.fireMachinegun();
    }
    if (event.keyCode === plane.keys.B_KEY) {
      plane.dropBomb();
      // dropBomb.play()
      // bombExplosion.play()
    }
    if (event.keyCode === 82 && isGameRunning === false) {
      startGame();
    }
    if (event.keyCode === 80) {
      pause = !pause;
    }
  };

  document.onkeyup = function(event) {
    if (event.keyCode === plane.keys.LEFT_KEY) {
      plane.keyState.LEFT_KEY = false;
    }
    if (event.keyCode === plane.keys.RIGHT_KEY) {
      plane.keyState.RIGHT_KEY = false;
    }
    if (event.keyCode === plane.keys.TOP_KEY) {
      plane.keyState.TOP_KEY = false;
    }
    if (event.keyCode === plane.keys.BOTT_KEY) {
      plane.keyState.BOTT_KEY = false;
    }
    if (event.keyCode === plane.keys.SPACE) {
      plane.keyState.SPACE = false;
    }
    if (event.keyCode === plane.keys.B_KEY) {
      plane.keyState.B_KEY = false;
      // bombExplosion.pause()
      // bombExplosion.currentTime = 0;
    }
    if (event.keyCode === 80) {
      menuMusic.pause();
      menuMusic.currentTime = 0;
      pauseOut.play()
      inGameMusic.play();
    }
  };
}

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

// Generación de enemigos
function generateEnemyPlane() {
  enemyPlanes.push(new EnemyPlane(ctx));
}

function generateTank() {
  tanks.push(new Tank(ctx));
}

// Pintar todo
function drawAll() {
  // Fondo
  backGround.draw();
  // Marcador
  scoreBoard.drawScoreBackground();
  scoreBoard.drawScorePoints();
  scoreBoard.drawScoreDamage();
  //tank
  tanks.forEach(function(tank) {
    tank.draw(counter);
  });
  //enemy plane
  enemyPlanes.forEach(function(enemyPlane) {
    enemyPlane.draw(counter);
  });
  // main plane
  plane.draw(counter);
}

// Movimiento de todo
function moveAll() {
  // Fondo
  backGround.move();
  // Tanks
  tanks.forEach(function(tank) {
    tank.move();
  });
  // Enemy plane
  enemyPlanes.forEach(function(enemyPlane) {
    enemyPlane.move();
  });
}

// Limpieza de elementos fuera de la pantalla
function clearAll() {
  clearEnemyPlanes();
  clearTanks();
  clearBombs();
  clearMachinegun();
}

function clearEnemyPlanes() {
  enemyPlanes = enemyPlanes.filter(function(enemyPlane) {
    return enemyPlane.x >= -200;
  });
}

function clearTanks() {
  tanks = tanks.filter(function(tank) {
    return tank.x >= -200;
  });
}

function clearBombs() {
  plane.bombs = plane.bombs.filter(function(bomb) {
    return bomb.x >= -200;
  });
}

function clearMachinegun() {
  plane.machineguns = plane.machineguns.filter(function(machinegun) {
    return machinegun.x < w;
  });
}

//////COLISIONES//////

// Tanque - avion
function checkColisionTankPlane() {
  for (var i = 0; i < tanks.length; i++) {
    if (
      tanks[i].x < plane.x + plane.w &&
      tanks[i].x + tanks[i].w > plane.x &&
      tanks[i].y < plane.y + plane.h &&
      tanks[i].y + tanks[i].h > plane.y
    ) {
      tanks[i].collision = true;
      plane.collision = true;
      damagePoints += 10;
    }
  }
}

// Enemy plane - plane
function checkColisionEnemyPlanePlane() {
  for (var i = 0; i < enemyPlanes.length; i++) {
    if (
      enemyPlanes[i].x < plane.x + plane.w &&
      enemyPlanes[i].x + enemyPlanes[i].w > plane.x &&
      enemyPlanes[i].y < plane.y + plane.h &&
      enemyPlanes[i].y + enemyPlanes[i].h > plane.y
    ) {
      enemyPlanes[i].collision = true;
      plane.collision = true;
      damagePoints += 10;
    }
  }
}

// Tanque - bomba
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
        if (tanks[j].scoreCollision) {
          score += 100;
        }
        tanks[j].scoreCollision = false;
      }
    }
  }
}

// Enemy plane - bomb
function checkColisionEnemyPlaneBomb() {
  for (var i = 0; i < plane.bombs.length; i++) {
    for (var j = 0; j < enemyPlanes.length; j++) {
      if (
        plane.bombs[i].x < enemyPlanes[j].x + enemyPlanes[j].w &&
        plane.bombs[i].x + plane.bombs[i].w > enemyPlanes[j].x &&
        plane.bombs[i].y < enemyPlanes[j].y + enemyPlanes[j].h &&
        plane.bombs[i].y + plane.bombs[i].h > enemyPlanes[j].y
      ) {
        enemyPlanes[j].collision = true;
        if (enemyPlanes[j].scoreCollision) {
          score += 150;
        }
        enemyPlanes[j].scoreCollision = false;
      }
    }
  }
}

// Enemy plane - machinegun
function checkColisionEnemyPlaneMachinegun() {
  for (var i = 0; i < plane.machineguns.length; i++) {
    for (var j = 0; j < enemyPlanes.length; j++) {
      if (
        plane.machineguns[i].x < enemyPlanes[j].x + enemyPlanes[j].w &&
        plane.machineguns[i].x + plane.machineguns[i].w > enemyPlanes[j].x &&
        plane.machineguns[i].y < enemyPlanes[j].y + enemyPlanes[j].h &&
        plane.machineguns[i].y + plane.machineguns[i].h > enemyPlanes[j].y
      ) {
        enemyPlanes[j].collision = true;
        if (enemyPlanes[j].scoreCollision) {
          score += 150;
        }
        enemyPlanes[j].scoreCollision = false;
      }
    }
  }
}
