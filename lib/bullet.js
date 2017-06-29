class Bullet {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.color = 'red';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move (bulletVelocity) {
    this.y += bulletVelocity.y;
  }

}

module.exports = Bullet;
