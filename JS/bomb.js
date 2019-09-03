class Bomb {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ground = ground;
    this.ctx = ctx;
    this.r = 5;
    this.vx = 9;
    this.vy = 1;
    this.newBomb = new Image();
    this.newBomb.src = "./../Img/Bomb_2.png";
    this.newExplosion = new Image();
    this.newExplosion.src = "./../Img/Explosiones.png";
    this.newExplosion.frames = 3;
    this.newExplosion.frameIndex = 0;
    this.gravity = 0.75;
    this.explosion = false;
  }

  draw() {
    if (!this.explosion) {
      this.ctx.drawImage(this.newBomb, this.x, this.y, 50, 20);
    }
    else {
      this.bombExplode();
    }
  }

  bombExplode() {
    
    this.y = this.ground;
    this.newBomb.src = "";
    this.ctx.drawImage(
      this.newExplosion,
      this.newExplosion.frameIndex * Math.floor(this.newExplosion.width / this.newExplosion.frames),
      0,
      Math.floor(this.newExplosion.width / this.newExplosion.frames),
      this.newExplosion.height,
      this.x,
      this.y - 140,
      this.newExplosion.width/this.newExplosion.frames - 30,
      this.newExplosion.height 
    );
    this.animateBomb(counter);
    this.x -= 14
  }

  animateBomb(counter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (counter % 3 === 0) {
      this.newExplosion.frameIndex += 1;
      // Si el frame es el último, se vuelve al primero
      if (this.newExplosion.frameIndex > 2) this.newExplosion.frameIndex = 0;
    }
  }

  move() {
    this.x += this.vx;

    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > this.ground) {
      this.explosion = true;
    }
  }
}
