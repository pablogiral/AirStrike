class EnemyPlane {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 681 / 3;
    this.h = 103;
    this.dx = 10;
    this.x = w;
    this.y = randomInt(10,h-200);
    this.newEnemyPlane = new Image();
    this.newEnemyPlane.src = "./../Img/Enemy plane.png";
    this.newEnemyPlane.frames = 3;
    this.newEnemyPlane.frameIndex = 0;
    this.newEnemyPlane.width = 681;
    this.newEnemyPlane.height = 103;
    this.enemyPlanes = []
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.newEnemyPlane,
      this.newEnemyPlane.frameIndex *
        Math.floor(this.newEnemyPlane.width / this.newEnemyPlane.frames),
      0,
      Math.floor(this.newEnemyPlane.width / this.newEnemyPlane.frames),
      this.newEnemyPlane.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.animateEnemyPlane(framesCounter);
  }
  animateEnemyPlane(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      this.newEnemyPlane.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.newEnemyPlane.frameIndex > 2) this.newEnemyPlane.frameIndex = 0;
    }
  }

  move() {
    this.x -= this.dx;
  }
}
