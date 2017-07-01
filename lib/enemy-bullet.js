
const Invaders = require('./invaders.js');

class EnemyBullet {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.velocity = 5
    this.width = 3;
    this.height = 3;
    this.color = 'purple';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveEnemyBullet () {
    this.y += this.velocity;
  }



}

module.exports = EnemyBullet;
