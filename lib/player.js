class Player {
  constructor () {
    this.x = 365;
    this.y = 400;
    this.speed = 3;
    this.width = 100;
    this.height = 100;
    this.color = 'red';
    this.keys = [];
  }

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

module.exports = Player;
