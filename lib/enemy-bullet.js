class EnemyBullet {
  constructor (x, y,) {
    this.x = x;
    this.y = y;
    this.bottomLimit = this.y 280;
    this.velocity = 5
    this.width = 3;
    this.height = 3;
    this.color = 'purple';
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

// fireEnemyBullet () {
//   var randomInvader = Math.floor(Math.random() * 35) + 1;
//   var invaderX = invader(randomInvader).x;
//   var invaderY = invader(randomInvader).y;
//   var randomNumber = Math.floor(Math.random() * 100) + 1;
//   if(randomNumber < 20) {
//   var theEnemyBullet = new EnemyBullet(invaderx invadery)
//   }
// }

fireEnemyBullet () {
  console.log('enemy bullet')
  var randomInvader = Math.floor(Math.random() * 35) + 1;
  var invaderX = invader(randomInvader).x;
  var invaderY = invader(randomInvader).y;
  var randomNumber = Math.floor(Math.random() * 100) + 1;
  if(randomNumber < 20) {
  var theEnemyBullet = new EnemyBullet(invaderX, invaderY)
  enemyBullets.push(theEnemyBullet);
}

}

module.exports = EnemyBullet;
