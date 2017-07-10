const Bullet = require('./bullet.js');


class EnemyBullet extends Bullet {
  constructor(x) {
    super(x)
    this.x = x,
    this.y = 0,
    this.velocity = 5,
    this.width = 20,
    this.height = 20
  }

  draw(context) {
    let snakeShootImage = new Image();

    snakeShootImage.src = 'assests/shoot-snale.png';
    context.drawImage(snakeShootImage,
      this.x,
      this.y,
      this.width,
      this.height)
  }

  moveEnemyBullet() {
    this.y += this.velocity
  }

}

module.exports = EnemyBullet;
