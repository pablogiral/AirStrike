class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx
    this.img = new Image();
    this.img.src = "Img/Background_floor.png";
    this.h = h
    this.w = w

    this.x = 0;
    this.y = 0;
    
    //este this.dx controla la velocidad del fondo. Se puede usar para hacer un throttle up figurado del avión
    this.dx = 5;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}