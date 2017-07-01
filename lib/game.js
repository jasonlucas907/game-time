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
var keys = []
var invaderRow1 = [];
var invaderRow2 = [];
var invaderRow3 = [];




// -----  EVENT LISTENERS  ------------------------------------//
function movePlayer () {
  if (keys[37]){
    player1.playerLeft()
  } else if (keys[39]){
    player1.playerRight()
  }
}

$(window).keydown(function (event) {
  var keyCommand = event.which
  keys[event.which] = true
})

$(window).keyup(function (event) {
  var keyCommand = event.which
  keys[event.which] = false
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
    console.log(theBullet)
  }
})

// -----  FUNCTIONS   ------------------------------------//

function collisionDetector(a, b) {
  return  b.x < a.x + a.width &&
          b.x + b.width > a.x &&
          b.y < a.y + a.height &&
          b.y + b.height > a.y;
}

function collision(a, b)  {
  a.forEach(bullet => {
    b.forEach((invader, index) => {
      if (collisionDetector(invader, bullet)) {
        a.active = false;
        b.splice(index, 1);
        console.log(a)
      }
    })
  })
}

// function playerBulletVsInvader(a, b)  {
//   a.forEach((bullet, index) => {
//     b.forEach((invader, index) => {
//       if (collisionDetector(invader, bullet)) {
//         a.splice(index, 1);
//         b.splice(index, 1);
//         console.log(a)
//       }
//     })
//   })
// }

function gunFire ()  {
  $('#gun-audio').trigger("play");
}

function playerBulletCheck() {
  for (let i = 0; i < bullets.length; i++) {
  if (bullets[i].y <= 0 || bullets[i].active === false) {
   bullets.splice(i, 1);
}
}
}

// function playerBulletCheck2() {
//   for (let i = 0; i < bullets.length; i++) {
//   if (bullets[i].active === false) {
//    bullets.splice(i, 1);
// }
// }
// }

function buildInvadersRow1()  {
  console.log('build row 1')
  for(var x = 150; x < 551; x += 50) {
    invaderRow1.push(new Invaders(x, 40));
  }
}

function buildInvadersRow2()  {
  console.log('build row 2')
  for(var x = 150; x < 551; x += 50) {
    invaderRow2.push(new Invaders(x, 80));
  }
}

function buildInvadersRow3()  {
  console.log('build row 3')
  for(var x = 150; x < 551; x += 50) {
    invaderRow3.push(new Invaders(x, 120));
  }
}


// -----  GAME LOOP   ------------------------------------//
function gameLoop () {
  movePlayer()

  context.clearRect(0, 0, canvas.width, canvas.height);

  player1.draw(context)

  playerBulletCheck()
  // playerBulletCheck2()
  collision(bullets, invaderRow1)
  collision(bullets, invaderRow2)
  collision(bullets, invaderRow3)

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw(context);
    var fireBullet = bullets[i]
    bullets[i].moveBullet(fireBullet)

  }

  for (var i = 0; i < invaderRow1.length; i++) {
    invaderRow1[i].draw(context)
    var invaderPack1 = invaderRow1[i];
    invaderRow1[i].moveInvader(invaderPack1)
  }

  for (var i = 0; i < invaderRow2.length; i++) {
    invaderRow2[i].draw(context)
    var invaderPack2 = invaderRow2[i];
    invaderRow2[i].moveInvader(invaderPack2)
  }

  for (var i = 0; i < invaderRow3.length; i++) {
    invaderRow3[i].draw(context)
    var invaderPack3 = invaderRow3[i];
    invaderRow3[i].moveInvader(invaderPack3)
  }


  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
buildInvadersRow1()
buildInvadersRow2()
buildInvadersRow3()
