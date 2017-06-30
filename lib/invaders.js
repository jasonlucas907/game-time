class Invaders {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.color = 'green';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

}

module.exports = Invaders;
