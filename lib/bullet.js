class Bullet {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.velocity = -5
    this.width = 3;
    this.height = 3;
    this.color = 'red';
    this.active = true;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveBullet () {
    this.y += this.velocity;
  }

  gunFire ()  {
    $('#gun-audio').trigger("play");
  }



}

module.exports = Bullet;
