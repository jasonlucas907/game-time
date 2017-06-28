class Player {
  constructor (x, y, width, height, color) {
    this.x = 400;
    this.y = 650;
    this.width = 20;
    this.height = 20;
    this.color = 'red';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  playerLeft ( direction ) {
    this.x -= 1;
  }

  playerRight ( direction ) {
    this.x += 1;
  }

  playerFire ( direction ) {
    console.log('fire')
  }

}

module.exports = Player;
