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
var bullets = [];
//---invader 1st (top) row---//
var invader1 = new Invaders(150, 40)
var invader2 = new Invaders(200, 40)
var invader3 = new Invaders(250, 40)
var invader4 = new Invaders(300, 40)
var invader5 = new Invaders(350, 40)
var invader6 = new Invaders(400, 40)
var invader7 = new Invaders(450, 40)
var invader8 = new Invaders(500, 40)
var invader9 = new Invaders(550, 40)

//---invader 2nd row---//
var invader10 = new Invaders(150, 80)
var invader11 = new Invaders(200, 80)
var invader12 = new Invaders(250, 80)
var invader13 = new Invaders(300, 80)
var invader14 = new Invaders(350, 80)
var invader15 = new Invaders(400, 80)
var invader16 = new Invaders(450, 80)
var invader17 = new Invaders(500, 80)
var invader18 = new Invaders(550, 80)

//---invader 3rd row---//
var invader19 = new Invaders(150, 120)
var invader20 = new Invaders(200, 120)
var invader21 = new Invaders(250, 120)
var invader22 = new Invaders(300, 120)
var invader23 = new Invaders(350, 120)
var invader24 = new Invaders(400, 120)
var invader25 = new Invaders(450, 120)
var invader26 = new Invaders(500, 120)
var invader27 = new Invaders(550, 120)

//---invader 4th row---//
var invader28 = new Invaders(150, 160)
var invader29 = new Invaders(200, 160)
var invader30 = new Invaders(250, 160)
var invader31 = new Invaders(300, 160)
var invader32 = new Invaders(350, 160)
var invader33 = new Invaders(400, 160)
var invader34 = new Invaders(450, 160)
var invader35 = new Invaders(500, 160)
var invader36 = new Invaders(550, 160)


var theInvaders = [
  invader1,
  invader2,
  invader3,
  invader4,
  invader5,
  invader6,
  invader7,
  invader8,
  invader9,
  invader10,
  invader11,
  invader12,
  invader13,
  invader14,
  invader15,
  invader16,
  invader17,
  invader18,
  invader19,
  invader20,
  invader21,
  invader22,
  invader23,
  invader24,
  invader25,
  invader26,
  invader27,
  invader28,
  invader29,
  invader30,
  invader31,
  invader32,
  invader33,
  invader34,
  invader35,
  invader36,



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

function playerBulletCheck() {
  // console.log(bullets, 'bullet check func')
  for (let i = 0; i < bullets.length; i++) {
    // console.log(bullet)
  if (bullets[i].y <= 0) {
   bullets.splice(i, 1);
   console.log(bullets, 'bullet check func')
}
}
}


// -----  GAME LOOP   ------------------------------------//
function gameLoop () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  player1.draw(context)

  playerBulletCheck()

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw(context);
    var fireBullet = bullets[i]
    bullets[i].moveBullet(fireBullet)
  }


  for (var i = 0; i < theInvaders.length; i++) {
    theInvaders[i].draw(context)
    var invaderPack = theInvaders[i];
    theInvaders[i].moveInvader( invaderPack )
  }


  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
