
class Bullet {
  constructor(x, y) {
    this.x = x+35,
    this.y = y-15,
    this.velocity = -5,
    this.width = 30,
    this.height = 30,
    this.active = true
  }

  draw(context) {
    let bulletImage = new Image();
    bulletImage.src = 'assests/shooter-bottle.png',
    context.drawImage(bulletImage,
      this.x,
      this.y,
      this.width,
      this.height)
  }

  moveBullet() {
    this.y += this.velocity
  }

  gunFire()  {
    $('#gun-audio').trigger("play")
  }

}

module.exports = Bullet;
