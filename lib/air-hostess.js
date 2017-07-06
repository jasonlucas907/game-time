
class AirHostess {
  constructor(x) {
    this.x = x,
    this.y = 0,
    this.velocity = 5,
    this.width = 40,
    this.height = 80
  }

  draw(context) {
    let airHostessImage = new Image();
    airHostessImage.src = 'assests/air-hostess.png';
    context.drawImage(airHostessImage,
      this.x,
      this.y,
      this.width,
      this.height)
  }

  moveHostess() {
    this.y += this.velocity
  }

  //  air hostess drop audio
  airHostessAudio()  {
    $('#air-hostess').trigger('play')
  }

}

module.exports = AirHostess;
