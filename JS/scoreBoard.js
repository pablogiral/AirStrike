class Scoreboard {
  constructor(ctx) {
    this.x = 18;
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
      250,
      100
    );
  }

  drawScorePoints() {
    ctx.font = "30px Germania One";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + Math.floor(score), this.x, this.y);
  }

  drawScoreLife() {
    
    // ctx.fillStyle = "black";
    ctx.fillText("Plane Damage: " + Math.floor(100), this.x, this.y + 30);
  }
}