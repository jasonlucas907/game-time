class Player {
  constructor (x, y, velocity, width, height, color, lives) {
    this.x = 365;
    this.y = 400;
    this.speed = 3;
    this.width = 100;
    this.height = 100;
    this.color = 'red';
    this.keys = [];
    this.lives = 3;
  }

  // draw (context) {
  //   context.fillStyle = this.color;
  //   context.fillRect(this.x, this.y, this.width, this.height);
  // }
  draw (context) {
    let playerImage = new Image();
    playerImage.src = 'assests/airplane.png'
    context.drawImage(playerImage,
      this.x,
      this.y,
      this.width,
      this.height);

  }

  playerLeft () {
    if (this.x >= 1) {
      this.x -= this.speed;
    }
  }

  playerRight () {
    if (this.x <= 635) {
      this.x += this.speed;
    }
  }

}
// function playerLives ()
//   if (collision detected) {
//     this.lives -= 1
//   }
//   if (this.lives)
//   }

module.exports = Player;
