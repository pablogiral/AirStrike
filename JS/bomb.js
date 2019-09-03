
class Bomb {
  // constructor(x, y, y0, h, ctx) {
  //   this.x = x;
  //   this.y = y;
  //   this.y0 = y0
  //   this.h = h
  //   this.ctx = ctx
  //   this.r = 5;
  //   this.vx = 9;
  //   this.vy = 1;
  //   this.newBomb = new Image();
  //   this.newBomb.src = "./../Img/Bomb_2.png";
  //   this.gravity = .75;
  // }
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ground = ground
    // this.h = h
    this.ctx = ctx
    this.r = 5;
    this.vx = 9;
    this.vy = 1;
    this.newBomb = new Image();
    this.newBomb.src = "./../Img/Bomb_2.png";
    this.newExplosion = new Image();
    this.newExplosion.src = "./../Img/Explosiones.png"
    this.gravity = .75;
  }

  draw() {
    this.ctx.drawImage(this.newBomb, this.x, this.y, 50, 20);
  }

  // bombExplode(){
  //   this.ctx.drawImage(this.newExplosion, this.x, this.y, 50, 20);
  // }

  move() {
    this.x += this.vx;

    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > this.ground) {
      this.y = this.ground;
      this.vx = -5
      ctx.drawImage(this.newExplosion, this.x - 40, this.y - 40, 100, 100)
      // this.vy *= -1;
      // this.bombExplode();
    }
  }
}
