class Invaders {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.speedX = 2;
    this.speedY = .05;
    this.leftEdge = this.x - 150;
    this.rightEdge = this.x + 130;
    this.bottomEdge = this.y + 20;
    this.width = 30;
    this.height = 30;
    this.color = 'green';
    this.counter = 0;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  invaderGotShot (bullet) {
    if (bullet === undefined) {
      return
    }
    // console.log(bullet.y)
    // console.log(this)
    // var (x, y, width, height) = this;
    if( this.x + this.width < bullet.x || this.x > bullet.x + bullet.width ||
      this.y + this.height < bullet.y || this.y > bullet.y + bullet.height) {
      //  console.log("MISS")
      }
      else {
        theInvaders.splice(i, 1);
        console.log("HIT")
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
      this.y = this.y + 5;
    }
    // else if (this.y >= this.bottomEdge) {
    //   this.speed = 1.5;
    //   this.speedY = 0;
    //   this.y -= 5;
    //   this.speedX = -this.speed;
    // }
  }



}

module.exports = Invaders;
