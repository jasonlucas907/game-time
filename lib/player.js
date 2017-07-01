class Player {
  constructor (x, y, velocity, width, height, color) {
    this.x = 365;
    this.y = 460;
    this.vx = 3;
    this.width = 20;
    this.height = 20;
    this.color = 'red';
    // this.speedLeft = -5;
    // this.speedRight = 5;
    // this.stop = 0;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  playerLeft () {
    this.x -= this.vx;
    // if (this.x === 0) {
    //   this.speedLeft = this.stop;
    //   this.speedRight = this.speedRight;
    // }
  }
  playerRight () {
    this.x += this.vx;
    // if (this.x === 710) {
    //   this.speedRight = this.stop;
    //   this.speedLeft = this.speedleft;
    // }
  }



}

module.exports = Player;
