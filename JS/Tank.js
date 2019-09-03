class Tank {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.w = 15;
    this.h = this.w * 3;
    this.dx = 10;
    this.x = w;
    this.y = playerY + playerH - this.h - 5;
    this.newTank = new Image();
    this.newTank.src = "./../Img/Enemy Tank.png";
  }

  draw() {
    this.ctx.drawImage(this.newTank, this.x, this.y, 750, 120);
  }

  move() {
    this.x -= this.dx;
  }
}
