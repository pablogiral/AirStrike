class Plane {
  constructor(ctx) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    (this.keys = {
      TOP_KEY: 38,
      RIGHT_KEY: 39,
      LEFT_KEY: 37,
      BOTT_KEY: 40,
      SPACE: 32,
      B_KEY: 66
    }),
      (this.keyState = {
        TOP_KEY: false,
        RIGHT_KEY: false,
        LEFT_KEY: false,
        BOTT_KEY: false,
        SPACE: false,
        B_KEY: false
      });
    this.x = 80;
    this.y = h2 - 100;

    // Guardar posición original (suelo)
    this.y0 = this.canvasH - 220;

    this.img = new Image();
    this.img.src = "./../img/Sprites plane 5.png";

    // Número de frames diferentes en el sprite
    this.img.frames = 3;
    this.img.frameIndex = 0;

    // Medidas de la imagen a representar en el canvas
    this.w = 713 / 3;
    this.h = 403 / 3;

    // Array vacío para bombas
    this.bombs = [];

    // Array vacío ametralladora
    this.machineguns = [];

    
    this.collision = false;
    this.damageCollision = true;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      135,
      Math.floor(this.img.width / this.img.frames),
      this.img.height / 3,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animatePlane(framesCounter);

    // Bomba
    this.bombs = this.bombs.filter(bomb => {
      return bomb.x < this.canvasW;
    });

    this.bombs.forEach(function(bomb) {
      bomb.draw();
      bomb.move();
    });

    // Metralleta
    this.machineguns = this.machineguns.filter(machinegun => {
      return machinegun.x < this.canvasW;
    });

    this.machineguns.forEach(function(machinegun) {
      machinegun.draw();
      machinegun.move();
    });
  }

  
  // Animar avión
  animatePlane(framesCounter) {
    // Se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
  }

  // Tirar bombas
  dropBomb() {
    bombDrop.volume = 0.6;
    bombDrop.play();
    var bomb = new Bomb(
      this.x + this.w - 90,
      this.y + this.h / 2 + 15,
      this.ctx
    );

    this.bombs.push(bomb);
  }

  // Disparar ametralladora
  fireMachinegun() {
    machinegunshot.play();
    var machinegun = new MachineGun(
      this.x + this.w - 40,
      this.y + this.h / 2 - 36,
      this.y0,
      this.h,
      this.ctx
    );

    this.machineguns.push(machinegun);
  }
}
