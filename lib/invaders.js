const Game = require('./game.js');

class Invaders {
  constructor(x, y, speed, speedY = .05) {
    this.x = x,
    this.y = y,
    this.speed = speed,
    this.speedX = 2,
    this.speedY = .05,
    this.leftEdge = this.x - 150,
    this.rightEdge = this.x + 130,
    this.bottomEdge = this.y + 20,
    this.width = 30,
    this.height = 30
  }

  draw (context) {
    let snakeImage = new Image();
    snakeImage.src = 'assests/King-cobra.png';
    context.drawImage(snakeImage,
      this.x,
      this.y,
      this.width ,
      this.height)
  }

  moveInvader () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x <= this.leftEdge) {
      this.speedX = this.speed;
    }
    else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed;
      this.y = this.y + 5
    }
  }

}

module.exports = Invaders;
