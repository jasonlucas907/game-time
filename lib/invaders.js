class Invaders {
  constructor (x, y, speed = 3) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = speed;
    this.leftEdge = this.x - 100;
    this.rightEdge = this.x + 100;
    this.bottomEdge = this.y + 50;
    this.width = 30;
    this.height = 30;
    this.color = 'green';
    this.counter = 0;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  invaderGotShot (fireBullet) {
    console.log(fireBullet)
    console.log(this)
    // var (x, y, width, height) = this;
    if( this.x + this.width < fireBullet.x || this.x > fireBullet.x + fireBullet.width ||
      this.y + this.height < fireBullet.y || this.y > fireBullet.y + fireBullet.height) {
        return false;
      }
    else { console.log('collision')
  }
  }

  moveInvader ( InvaderPack) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x <= this.leftEdge) {
      this.speedX = this.speed;
    }
    else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed;
    }
    else if (this.y >= this.bottomEdge) {
      this.speed = 1.5;
      this.speedY = 0;
      this.y -= 5;
      this.speedX = -this.speed;
    }
  }



}

module.exports = Invaders;
