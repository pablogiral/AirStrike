class Screen {
  constructor (ctx) {
    this.ctx = ctx
    this.w = w
    this.h = h

    this.pauseImg = new Image()
    this.pauseImg.src = 'Img/AirStrikePause.png'

    this.gameOverImg = new Image()
    this.gameOverImg.src = 'Img/FokkerDown.png'
    
  }

  drawPause() {
    this.ctx.drawImage(this.pauseImg, 0, 0, this.w, this.h);
  }

  drawGameOver() {
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.w, this.h);
  }

  drawTotalPoints() {
    // this.ctx.beginPath();
    this.ctx.font = "65px Germania One";
    this.ctx.fillStyle = "rgb(155,15,15)";
    this.ctx.fillText("You scored: " + score + " points", 150, h2 - 145);
    // this.ctx.endPath();

    // this.ctx.beginPath();
    this.ctx.font = "40px Germania One";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText("Press R to play again", 150, h-60);
    // this.ctx.endPath();
  }
}