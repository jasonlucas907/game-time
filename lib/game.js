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
let points = 0;
let theInvaderCounter = 27;
let bullets = [];
let enemyBullets = [];
let keys = [];
let invaderRow1 = [];
let invaderRow2 = [];
let invaderRow3 = [];
let level = 1;
let invaderLevelSpeed = 2;
let lives = 3;
let randomFireLevel = 1;


// -----  EVENT LISTENERS  ------------------------------------//

// start button
$('.start-btn').on('click', function()  {
  console.log('start');
  gameStart();
})

// reset button
$('.reset-btn').on('click', function()  {
  console.log('reset');
  resetGame();
})

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

function displayLifeCount() {
  //  const displayLives = $('lives').val();
   $('.life-count-txt').text(lives);
}



// sound functions
function invadersAllDeadSound()  {
  $('#invaders-killed-audio').trigger("play");
}

function invaderShotSound()  {
  $('#shot-snake-audio').trigger("play");
}

function gameOverAudio()  {
  $('#game-over-audio').trigger("play");
}

function medic()  {
  $('#medic').trigger("play");
}

function lockAndLoad()  {
  $('#lock-and-load').trigger("play");
}

//  collision functions

// monitor if bullet has hit an invader
function collision(a, b)  {
  a.forEach(bullet => {
    b.forEach((invader, index) => {
      if (collisionDetector(invader, bullet)) {
        points += 1;
        theInvaderCounter -= 1;
        a.active = false;
        b.splice(index, 1);
        invaderShotSound();
        if(theInvaderCounter === 0)  {
          level += 1;
          setTimeout(() => {invadersAllDeadSound(); }, 1000);
          levelUpEval();
        }
      }
    })
  })
}

// monitor if invader or enemy bullet has hit the ship
function invadercollisionShip(a, b)  {
    b.forEach((invader, index) => {
      if (collisionDetector(a, invader)) {
        b.splice(index, 1);
        medic();
        enemyBullets.splice(0, enemyBullets.length);
        invaderRow1.splice(0, invaderRow1.length);
        invaderRow2.splice(0, invaderRow2.length);
        invaderRow3.splice(0, invaderRow3.length);
        collisionReset();
    }
  })
}

// evals if a collision has occured
function collisionDetector(a, b) {
  return  b.x < a.x + a.width &&
          b.x + b.width > a.x &&
          b.y < a.y + a.height &&
          b.y + b.height > a.y;
}


// the player functions


// draw player function
function drawPlayer()  {
  if(lives >= 1) {
    player1.draw(context)
  }
}

// move the player
function movePlayer() {
  if (keys[37]){
    player1.playerLeft()
  } else if (keys[39]){
    player1.playerRight()
  }
}


//  player bullet functions

// draw and move the bullet
function drawPlayerBullet () {
for (let i = 0; i < bullets.length; i++) {
  bullets[i].draw(context);
  bullets[i].moveBullet()
}
}

// monitor if the bullet has left the canvas
function playerBulletCheck() {
  for (let i = 0; i < bullets.length; i++) {
  if (bullets[i].y <= 0 || bullets[i].active === false) {
   bullets.splice(i, 1);
}
}
}

//   monitor if the bullet is not active and remove
function bulletCollisionCheck() {
  bullets.forEach((bullet, index) => {
    if(bullet.active === false) {
      bullets.splice(index, 1)
    }
  }
)}


//    invaders functions

// build level 1 invaders
function buildInvadersRow1()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow1.push(new Invaders(x, 40, invaderLevelSpeed, .05));
  }
}

function buildInvadersRow2()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow2.push(new Invaders(x, 80, invaderLevelSpeed, .05));
  }
}

function buildInvadersRow3()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow3.push(new Invaders(x, 120, invaderLevelSpeed, .05));
  }
}

//   draw invaders
function drawInvaderPack(invaderRow) {
for (let i = 0; i < invaderRow.length; i++) {
  invaderRow[i].draw(context)
  invaderRow[i].moveInvader()
  randomInvaderFire()
  }
}


//    invaders bullet functions

// decides to fire
function randomInvaderFire() {
  let randomPosition = Math.floor(Math.random() * 700) + 1;
  let randomNumber = Math.floor(Math.random() * 2000) + 1;
  if(randomNumber <= randomFireLevel) {
  invaderFire(randomPosition);
  console.log(randomFireLevel);
  }
}

//  builds and fires enemy bullet
function invaderFire(randomPosition) {
  let invaderBullet= new EnemyBullet(randomPosition)
  enemyBullets.push(invaderBullet);
}

//  draw invader
function drawInvaderBullet() {
for (let i = 0; i < enemyBullets.length; i++) {
  enemyBullets[i].draw(context);
  enemyBullets[i].moveEnemyBullet();
}
}

//   game functions

// get ready message
function getReady() {
  $(".game-container").append(`
    <p class='get-ready'>Get Ready!</p>
    `);
  $('.get-ready').delay(2000).fadeOut(1000, function(){
  $('.get-ready').remove();
    });
}

// game over message
function gameOverMessage() {
  $(".game-container").append(`
    <p class='game-over-message'>Game Over!</p>
    `);
  $('.game-over-message').delay(5000).fadeOut(1000, function(){
  $('.get-ready-message').remove();
    });
}

// level up message
function levelUpMessage() {
  $(".game-container").append(`
    <p class='level-up-message'>Level Up!</p>
    `);
  $('.level-up-message').delay(2000).fadeOut(1000, function(){
  $('.level-up-message').remove();
    });
}

// winner message
function winnerMessage() {
  $(".game-container").append(`
    <p class='winner-message'>Winner!</p>
    `);
  $('.winner-message').delay(2000).fadeOut(1000, function(){
  $('.winner-message').remove();
    });
}

// remove game background audio
function removeGameMusic() {
  $('#game-background-audio').delay(1000).fadeOut(3000, function(){
  $('#game-background-audio').remove();
    });
}

//  collision reset
function collisionReset() {
  lives -= 1;
  if(lives >= 1) {
    setTimeout(() => {getReady(); }, 1000);
    setTimeout(() => {lockAndLoad(); }, 3000);
    setTimeout(() => {buildInvadersRow1();; }, 4000);
    setTimeout(() => {buildInvadersRow2();; }, 4000);
    setTimeout(() => {buildInvadersRow3(); }, 4000);
    theInvaderCounter = 27;
  }
  else if(lives < 1) {
    gameOverMessage();
    removeGameMusic();
    setTimeout(() => {gameOverAudio(); }, 1000);
    setTimeout(() => {resetGame(); }, 3000);
  }
}

function levelUpEval()  {
  if(level <= 5) {
    levelUpMessage();
    theInvaderCounter = 27;
    invaderLevelSpeed += 1;
    randomFireLevel += 1;
    setTimeout(() => {getReady(); }, 3000);
    setTimeout(() => {lockAndLoad(); }, 3000);
    setTimeout(() => {buildInvadersRow1(); }, 3000);
    setTimeout(() => {buildInvadersRow2(); }, 3000);
    setTimeout(() => {buildInvadersRow3(); }, 3000);
  }
  else if(level === 6) {
    winnerMessage();
    setTimeout(() => {resetGame(); }, 4000);
  }
}


// auto runs
requestAnimationFrame(gameLoop);


function gameStart()  {
  removeGameHolderAudio()
  introVideo()
  removeGameHolder()
  randomFireLevel = 1;
  level = 1;
  points = 0;
  invaderLevelSpeed = 2;
  theInvaderCounter = 27;
  lives = 3;
  setTimeout(() => {gameMusic(); }, 11000);
  setTimeout(() => {getReady(); }, 14000);
  setTimeout(() => {buildInvadersRow1(); }, 16000);
  setTimeout(() => {buildInvadersRow2(); }, 16000);
  setTimeout(() => {buildInvadersRow3(); }, 16000);
}

function resetGame() {
  enemyBullets.splice(0, enemyBullets.length);
  invaderRow1.splice(0, invaderRow1.length);
  invaderRow2.splice(0, invaderRow2.length);
  invaderRow3.splice(0, invaderRow3.length);
  removeGameMusic();
  setTimeout(() => {gameIntroMusic(); }, 3000);
  setTimeout(() => {addHolderVideo(); }, 3000);
}

function removeGameHolder() {
  $('.game-holder-video-container').delay(2000).fadeOut(1000, function(){
  $('.game-holder-video-container').remove();
    });
}

function removeGameHolderAudio() {
  // $('#game-intro-audio').delay(2000).fadeOut(1000, function(){
  $('#game-intro-audio').remove();
    // });
}


function removeGameHolderVideo() {
  $('.winner-message').delay(10).fadeOut(10, function(){
  $('.winner-message').remove();
    });
}

function gameMusic()  {
  $(".audio-container").append(`
    <audio id='game-background-audio' autoplay loop>
      <source src="assests/01 Send Me an Angel.m4a">
    </audio>
    `);
}

function gameIntroMusic() {
$(".audio-container").append(`
  <audio id='game-intro-audio' autoplay loop>
    <source src="assests/05 I'm Here to Kill Your Monster.m4a">
  </audio>
  `);
}

// add intro video holder
function addHolderVideo() {
  $(".game-container").append(`
    <section class='game-holder-video-container'>
      <video poster="assests/video-holder.mp4" class='game-holder-video' id="bgvid" playsinline autoplay muted loop>
          <source src="assests/video-holder.mp4" type="video/webm">
          <source src="assests/video-holder.mp4" type="video/mp4">
      </video>
      <p class='press-start-message'>Press Start!</p>
    </section>
    `);
}

// add intro video
function introVideo() {
  $(".game-container").append(`
    <section class='intro-video-container'>
      <video poster="assests/snakes on a plane.mp4" class='intro-video' id="bgvid" playsinline autoplay>
          <source src="assests/snakes on a plane.mp4" type="video/webm">
          <source src="assests/snakes on a plane.mp4" type="video/mp4">
      </video>
    </section
    `);
  $('.intro-video-container').delay(12000).fadeOut(1000, function(){
  $('.intro-video-containere').remove();
    });
}

// -----  GAME LOOP   ------------------------------------//
function gameLoop () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  // player1.draw(context)
  drawPlayer()

  drawPlayerBullet()
  drawInvaderBullet()
  drawInvaderPack(invaderRow1)
  drawInvaderPack(invaderRow2)
  drawInvaderPack(invaderRow3)

  playerBulletCheck()
  bulletCollisionCheck()

  movePlayer()

  collision(bullets, invaderRow1)
  collision(bullets, invaderRow2)
  collision(bullets, invaderRow3)

  invadercollisionShip(player1, invaderRow1)
  invadercollisionShip(player1, invaderRow2)
  invadercollisionShip(player1, invaderRow3)

  invadercollisionShip(player1, enemyBullets)

  displayLifeCount()


  requestAnimationFrame(gameLoop);
}
