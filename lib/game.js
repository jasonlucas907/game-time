// -----  REQUIRES   ------------------------------------//

require('./game.css');
const Bullet = require('./bullet.js');



const EnemyBullet = require('./enemy-bullet.js');

const Invaders = require('./invaders.js');
const Player = require('./player.js');


// -----  GLOBAL VARIABLES   ---------------------------//

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let player1 = new Player();
let lives = 3;
let points = 0;
// let player1 = []
let bullets = [];
let enemyBullets = [];
let keys = []
let invaderRow1 = [];
let invaderRow2 = [];
let invaderRow3 = [];


// -----  EVENT LISTENERS  ------------------------------------//

function movePlayer () {
  if (keys[37]) {
    player1.playerLeft()
  } else if (keys[39]) {
    player1.playerRight()
  }
}


//   capture key down
$(window).keydown(function (event) {
  let keyCommand = event.which
  keys[event.which] = true
})

//    capture key up
$(window).keyup(function (event) {
  let keyCommand = event.which
  keys[event.which] = false
})

//   fire bullet on space bar
$(window).keydown(function (event) {
  let fireCommand = event.which
  let playerX = player1.x;
  let playerY = player1.y;
  if (event.which === 32) {
    let theBullet= new Bullet(playerX, playerY)
    bullets.push(theBullet);
    theBullet.gunFire();
  }
})

// -----  FUNCTIONS   ------------------------------------//


//  collision functions
function collision(a, b)  {
  a.forEach(bullet => {
    b.forEach((invader, index) => {
      if (collisionDetector(invader, bullet)) {
        points += 1;
        a.active = false;
        b.splice(index, 1);
        console.log(points)
      }
    })
  })
}

function invadercollisionShip(a, b)  {
    b.forEach((invader, index) => {
      if (collisionDetector(a, invader)) {
        console.log(lives)
        lives -= 1;
        console.log(lives)
    }
  })
}

function collisionDetector(a, b) {
  return  b.x < a.x + a.width &&
          b.x + b.width > a.x &&
          b.y < a.y + a.height &&
          b.y + b.height > a.y;
}

//    player functions

// function buildPlayer()  {
//     player1.push(new Player());
// }
//
// function drawPlayer() {
// for (let i = 0; i < player1.length; i++) {
//   player1[i].draw(context)
//   }
// }

function movePlayer () {
  if (keys[37]){
    player1.playerLeft()
  } else if (keys[39]){
    player1.playerRight()
  }
}


//  player bullet functions
function drawPlayerBullet () {
for (let i = 0; i < bullets.length; i++) {
  bullets[i].draw(context);
  let fireBullet = bullets[i]
  bullets[i].moveBullet()
}
}

function playerBulletCheck() {
  for (let i = 0; i < bullets.length; i++) {
  if (bullets[i].y <= 0 || bullets[i].active === false) {
   bullets.splice(i, 1);
}
}
}

function bulletCollisionCheck() {
  bullets.forEach((bullet, index) => {
    if(bullet.active === false) {
      bullets.splice(index, 1)
    }
  }
)}


//    invaders functions
function buildInvadersRow1()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow1.push(new Invaders(x, 40));
  }
}

function buildInvadersRow2()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow2.push(new Invaders(x, 80));
  }
}

function buildInvadersRow3()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow3.push(new Invaders(x, 120));
  }
}

function drawInvaderPack(invaderRow) {
for (let i = 0; i < invaderRow.length; i++) {
  invaderRow[i].draw(context)
  let invaderPack1 = invaderRow;
  invaderRow[i].moveInvader()
  // invaderRow[i].randomInvaderFire()
  }
}

function invaderFire(invaderX, invaderY) {
  let theEnemyBullet = new EnemyBullet(invaderX, invaderY)
  enemyBullets.push(theEnemyBullet);
  theBullet.gunFire();
}



// -----  GAME LOOP   ------------------------------------//
function gameLoop () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  player1.draw(context)
  // drawPlayer()

  drawPlayerBullet()
  drawInvaderPack(invaderRow1)
  drawInvaderPack(invaderRow2)
  drawInvaderPack(invaderRow3)

  playerBulletCheck()
  bulletCollisionCheck()

  movePlayer()

  collision(bullets, invaderRow1)
  collision(bullets, invaderRow2)
  collision(bullets, invaderRow3)

  invadercollisionShip(player1, invaderRow3)
  invadercollisionShip(player1, invaderRow3)
  invadercollisionShip(player1, invaderRow3)

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
buildInvadersRow1()
buildInvadersRow2()
buildInvadersRow3()
// buildPlayer()
