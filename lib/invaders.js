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

  invaderGotShot (fireBullet) {
    console.log(fireBullet)
    // var (x, y, width, height) = this;
    if( this.x + this.width < fireBullet.x || this.x > fireBullet.x + fireBullet.width ||
      this.y + this.height < fireBullet.y || this.y > fireBullet.y + fireBullet.height) {
        return false;
      }
    else { console.log('collision')
  }
  }



}

module.exports = Invaders;
