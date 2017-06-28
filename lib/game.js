
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


// -----  EVENT LISTENERS  ------------------------------------//
$(window).keydown(function (event) {
  var keyCommand = event.which
  if (event.which === 37) {
    player1.playerLeft()
  }
  else if (event.which === 39) {
    player1.playerRight()
  }
  else if (event.which === 32) {
    Player.playerFire()
  }
})


// -----  FUNCTIONS   ------------------------------------//
function gameLoop () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  player1.draw(context)





  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
