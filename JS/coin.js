class Coin {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 216 / 3;
    this.h = 72;
    this.dx = 10;
    this.x = w;
    this.y = randomInt(10,h-200);
    this.vx = 5;
    this.vy = 0.5;
    this.gravity = 0.1;
    this.newCoin = new Image();
    this.newCoin.src = "./../Img/Gamecoin.png";
    this.newCoin.frames = 3;
    this.newCoin.frameIndex = 0;
    this.newCoin.width = 216;
    this.newCoin.height = 72;
    this.newExplosion = new Image();
    this.newExplosion.src = "./../Img/GamecoinExplode.png";
    this.newExplosion.frames = 3;
    this.collision = false;
    this.scoreCollision = true;
  }

  draw(framesCounter) {
    if (!this.collision) {
      this.ctx.drawImage(
        this.newCoin,
        this.newCoin.frameIndex *
          Math.floor(this.newCoin.width / this.newCoin.frames),
        0,
        Math.floor(this.newCoin.width / this.newCoin.frames),
        this.newCoin.height,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animateCoin(framesCounter);
    }
    else {
      this.coinExplode()
    }
  }
  animateCoin(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      this.newCoin.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.newCoin.frameIndex > 2) this.newCoin.frameIndex = 0;
    }
  }

  move() {
    this.x -= this.dx;
  }

  coinExplode() {
    this.newCoin.src = "";
    this.ctx.drawImage(
      this.newExplosion,
      this.newCoin.frameIndex * Math.floor(this.newExplosion.width / this.newExplosion.frames),
      0,
      Math.floor(this.newExplosion.width / this.newExplosion.frames),
      this.newExplosion.height,
      this.x,
      this.y,
      72,
      72
    );
    this.animateCoin(counter);
    this.x += this.vx;
    this.vy += this.gravity;
    this.y -= this.vy;
    
  }
}
