class Tank {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 702 / 3;
    this.h = 104;
    this.dx = 10;
    this.x = w;
    this.y = ground - this.h;
    this.newTank = new Image();
    this.newTank.src = "Img/Enemy Tank.png";
    this.newTank.frames = 3;
    this.newTank.frameIndex = 0;
    this.newTank.width = 702;
    this.newTank.height = 104;
    this.newExplosion = new Image();
    this.newExplosion.src = "Img/Explosiones.png";
    this.newExplosion.frames = 3;
    this.collision = false;
    this.scoreCollision = true;
  }

  draw(framesCounter) {
    if (!this.collision) {
      this.ctx.drawImage(
        this.newTank,
        this.newTank.frameIndex *
          Math.floor(this.newTank.width / this.newTank.frames),
        0,
        Math.floor(this.newTank.width / this.newTank.frames),
        this.newTank.height,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animateTank(framesCounter);
    } else {
      this.tankExplode();
    }
  }
  animateTank(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      this.newTank.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.newTank.frameIndex > 2) this.newTank.frameIndex = 0;
    }
  }

  move() {
    this.x -= this.dx;
  }

  tankExplode() {
    this.newTank.src = "";
    this.ctx.drawImage(
      this.newExplosion,
      this.newTank.frameIndex *
        Math.floor(this.newExplosion.width / this.newExplosion.frames),
      0,
      Math.floor(this.newExplosion.width / this.newExplosion.frames),
      this.newExplosion.height,
      this.x + 100,
      this.y - 50,
      150,
      250
    );
    this.animateTank(counter);
    this.x += 5;
  }
}
