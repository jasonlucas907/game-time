class Player {
  constructor (x, y, velocity, width, height, color) {
    this.x = 365;
    this.y = 460;
    this.speed = 3;
    this.width = 20;
    this.height = 20;
    this.color = 'red';
    this.keys = [];
    // this.speedLeft = -5;
    // this.speedRight = 5;
    // this.stop = 0;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  playerLeft () {
    if (this.x >= 1) {
      this.x -= this.speed;
    }
  }

  playerRight () {
    if (this.x <= 710) {
      this.x += this.speed;
    }
  }

}


module.exports = Player;
