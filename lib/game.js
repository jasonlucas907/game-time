
// -----  REQUIRES   ------------------------------------//
require('./game.css');
var Bullet = require('./bullet.js');
var Cities = require('./cities.js');
var InvaderContainer = require('./invader-container.js');
var Invaders = require('./invaders.js');
var Player = require('./player.js');


// -----  GLOBAL VARIABLES   ---------------------------//
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
var player1 = new Player();
var bulletVelocity = {
  y:-5
}
var bullets = [];
var invader1 = new Invaders(365, 40)
var theInvaders = [
  invader1,
]

// -----  EVENT LISTENERS  ------------------------------------//
$(window).keydown(function (event) {
  var keyCommand = event.which
  if (event.which === 37) {
    player1.playerLeft()
  }
  else if (event.which === 39) {
    player1.playerRight()
  }

})

$(window).keydown(function (event) {
  var fireCommand = event.which
  var playerX = player1.x;
  var playerY = player1.y;
  console.log(playerX, playerY)
  if (event.which === 32) {
    var theBullet= new Bullet(playerX, playerY)
    bullets.push(theBullet);
    gunFire();
  }
})

// -----  FUNCTIONS   ------------------------------------//

function gunFire ()  {
  $('#gun-audio').trigger("play");
}





// -----  GAME LOOP   ------------------------------------//
function gameLoop () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  player1.draw(context)

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw(context)
    if (bullets[i].y <= canvas.height){
      bullets[i].move(bulletVelocity)
    }
  }

  for (var i = 0; i < theInvaders.length; i++) {
    theInvaders[i].draw(context)
  }



  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
