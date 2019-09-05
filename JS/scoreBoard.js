class Scoreboard {
  constructor(ctx) {
    this.x = 20;
    this.y = 43;
    this.img = new Image();
    this.img.src = "./../Img/Marcador.png"
    this.w = 100;
    this.h = 50;

    this.ctx = ctx;
  }
  drawScoreBackground(){
    this.ctx.drawImage(
      this.img,
      0,
      0,
      280,
      100
    );
  }

  drawScorePoints() {
    ctx.font = "30px Germania One";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + Math.floor(score), this.x, this.y);
  }

  drawScoreDamage() {
    ctx.fillText("Plane Damage: " + Math.floor(damagePoints), this.x, this.y + 30);
  }
}