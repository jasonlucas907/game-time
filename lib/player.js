class Player {
  constructor (x, y, velocity, width, height, color) {
    this.x = 400;

    this.y = 420;
    this.width = 20;
    this.height = 20;
    this.color = 'red';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

  }

  playerLeft () {
    this.x -= this.vx;
  }

  playerRight () {
    this.x += this.vx;
  }

  // playerFire ( direction ) {
  //   console.log('fire')
  // }

}

module.exports = Player;
