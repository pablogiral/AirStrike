class MachineGun {
  constructor(x, y, y0, h, ctx) {
    this.x = x;
    this.y = y;
    this.y0 = y0
    this.h = h
    this.ctx = ctx
    this.r = 5;
    this.vx = 25;
    this.vy = 0;
    this.newRound = new Image();
    this.newRound.src = "./../Img/Bullet.png";
    this.w = 25
    this.h = 13
    this.gravity = 0.05;
  }

  draw() {
    this.ctx.drawImage(this.newRound, this.x, this.y, 25, 13);
  }

  move() {
    this.x += this.vx;

    this.vy += this.gravity;
    this.y += this.vy;
  }
}