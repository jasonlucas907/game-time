class Bullet {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.velocity = -5
    this.width = 3;
    this.height = 3;
    this.color = 'red';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveBullet (fireBullet) {
    this.y += this.velocity;
    if (this.y === 0) {
      console.log(this)
      this.velocity = 0;
      fireBullet.remove(this)
      // fireBullet.shift();
      // this..remove();
      }
    }

}

module.exports = Bullet;
