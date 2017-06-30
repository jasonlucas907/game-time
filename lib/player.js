class Player {
  constructor (x, y, width, height, color) {
    this.x = 365;
    this.y = 460;
    this.width = 20;
    this.height = 20;
    this.color = 'red';
    this.speedLeft = -5;
    this.speedRight = 5;
    this.stop = 0;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  playerRight () {
    this.x += this.speedRight;
    if (this.x === 710) {
      this.speedRight = this.stop;
    }
  }

  playerLeft () {
    this.x += this.speedLeft;
    if (this.x === 0) {
      this.speedLeft = this.stop;
    }
  }


}

module.exports = Player;
