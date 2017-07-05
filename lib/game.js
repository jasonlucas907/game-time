// -----  REQUIRES   ------------------------------------//

require('./game.css');
const Bullet = require('./bullet.js');
const EnemyBullet = require('./enemy-bullet.js');
const Invaders = require('./invaders.js');
const Player = require('./player.js');
const AirHostess = require('./air-hostess.js');


// -----  GLOBAL VARIABLES   ---------------------------//

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let player1 = new Player();
let points = 0;
let theInvaderCounter = 27;
let bullets = [];
let enemyBullets = [];
let airHostessArray = [];
let keys = [];
let invaderRow1 = [];
let invaderRow2 = [];
let invaderRow3 = [];
let level = 1;
let invaderLevelSpeed = 2;
let lives = 3;
let randomFireLevel = 1;
let gameStartCheck = 0;


// -----  FUNCTIONS   ------------------------------------//

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
        levelIncrease()
      }
    })
  })
}
// if invader count = 0 then increas level +1
function levelIncrease(){
  if(theInvaderCounter === 0)  {
    level += 1;
    setTimeout(() => {invadersAllDeadSound(); }, 1000);
    levelUpEval()
  }
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
        collisionReset()
    }
  })
}

// monitor if invader or enemy bullet has hit the ship
function hostesscollisionShip(a, b)  {
    b.forEach((hostess, index) => {
      if (collisionDetector(a, hostess)) {
        b.splice(index, 1);
        lives += 1;
        hostessCaughtAudio();
    }
  })
}

// evals if a collision has occured
function collisionDetector(a, b) {
  return  b.x < a.x + a.width &&
          b.x + b.width > a.x &&
          b.y < a.y + a.height &&
          b.y + b.height > a.y
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

// monitor if the bullet is not active and remove
function bulletCollisionCheck() {
  bullets.forEach((bullet, index) => {
    if(bullet.active === false) {
      bullets.splice(index, 1)
    }
  }
)}


//    invaders functions

// build invaders
function buildInvadersRow1()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow1.push(new Invaders(x, 40, invaderLevelSpeed, .05))
  }
}

function buildInvadersRow2()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow2.push(new Invaders(x, 80, invaderLevelSpeed, .05))
  }
}

function buildInvadersRow3()  {
  for(let x = 150; x < 551; x += 50) {
    invaderRow3.push(new Invaders(x, 120, invaderLevelSpeed, .05))
    gameStartCheck = 2;
  }
}

//   draw invaders
function drawInvaderPack(invaderRow) {
for (let i = 0; i < invaderRow.length; i++) {
  invaderRow[i].draw(context);
  invaderRow[i].moveInvader();
  randomInvaderFire();
  randomHostessCreate()
  }
}


//    invaders bullet functions

// decides to fire randomly
function randomInvaderFire() {
  let randomPosition = Math.floor(Math.random() * 700) + 1;
  let randomNumber = Math.floor(Math.random() * 2000) + 1;
  if(randomNumber <= randomFireLevel) {
  invaderFire(randomPosition)
  }
}

//  builds and fires enemy bullet
function invaderFire(randomPosition) {
  let invaderBullet= new EnemyBullet(randomPosition)
  enemyBullets.push(invaderBullet)
}

//  draw invader bullet
function drawInvaderBullet() {
for (let i = 0; i < enemyBullets.length; i++) {
  enemyBullets[i].draw(context);
  enemyBullets[i].moveEnemyBullet()
}
}


//    air hostess functions

// decides to build hostess randomly
function randomHostessCreate() {
  let randomPosition = Math.floor(Math.random() * 700) + 1;
  let randomNumber = Math.floor(Math.random() * 20000) + 1;
  if(randomNumber <= 1) {
  hostessCreate(randomPosition)
  }
}

//  builds and fires hostess
function hostessCreate(randomPosition) {
  let theHostess= new AirHostess(randomPosition)
  airHostessArray.push(theHostess);
  airHostessAudio()
}

//  draw hostess
function drawHostess() {
for (let i = 0; i < airHostessArray.length; i++) {
  airHostessArray[i].draw(context);
  airHostessArray[i].moveHostess()
}
}

//   game functions

// reset game values to zero state//

function zeroState() {
  randomFireLevel = 1;
  level = 1;
  points = 0;
  invaderLevelSpeed = 2;
  theInvaderCounter = 27;
  lives = 3
}

// start game function
//  removes autoplay video - plays intro video - starts the game
function gameStart()  {
  if(gameStartCheck === 0) {
  gameStartCheck = 1;
  removeGameHolderAudio();
  introVideo();
  removeGameHolder();
  zeroState();
  setTimeout(() => {gameMusic(); }, 11000);
  setTimeout(() => {getReady(); }, 14000);
  setTimeout(() => {buildInvadersRow1(); }, 16000);
  setTimeout(() => {buildInvadersRow2(); }, 16000);
  setTimeout(() => {buildInvadersRow3(); }, 16000)
  }
}

//  reset the game
function resetGame() {
  if(gameStartCheck === 2)  {
  removeIntroVideo();
  gameStartCheck = 0;
  removeGameHolderAudio();
  removeGameHolder();
  enemyBullets.splice(0, enemyBullets.length);
  invaderRow1.splice(0, invaderRow1.length);
  invaderRow2.splice(0, invaderRow2.length);
  invaderRow3.splice(0, invaderRow3.length);
  removeGameMusic();
  setTimeout(() => {gameIntroMusic(); }, 2100);
  setTimeout(() => {addHolderVideo(); }, 2100)
  console.log(gameStartCheck)
  }
}


//  collision reset
// evals if player is out of lives
// if out of lives rest the game
// if still has lives reset invaders and continue
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
    setTimeout(() => {resetGame(); }, 3000)
  }
}

//  level up function
//  if all invaders killed advance to next level
//  if pass level 5 win the game
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
    setTimeout(() => {buildInvadersRow3(); }, 3000)
  }
  else if(level > 5) {
    level = 5;
    removeGameMusic();
    winnerMessage();
    setTimeout(() => {winnerAudio(); }, 3000)
    setTimeout(() => {resetGame(); }, 8000)
  }
}


//  video handlers

//   remove the initial auto play video
function removeGameHolder() {
  $('.game-holder-video-container').delay(1000).fadeOut(1000, function(){
  $('.game-holder-video-container').remove();
    })
}

// add intro auto play video
function addHolderVideo() {
  $(".game-container").append(`
    <section class='game-holder-video-container'>
      <video poster="assests/video-holder.mp4" class='game-holder-video' id="bgvid" playsinline autoplay muted loop>
          <source src="assests/video-holder.mp4" type="video/webm">
          <source src="assests/video-holder.mp4" type="video/mp4">
      </video>
      <p class='press-start-message'>Press Start!</p>
    </section>
    `)
}

// add intro video delay and remove
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
  $('.intro-video-container').remove();
    })
}

// add instructions video delay and remove
function instructionVideo() {
  $(".game-container").append(`
    <section class='intro-video-container'>
      <video poster="assests/zoe-instructional-vid.mp4" class='intro-video' id="bgvid" playsinline autoplay>
          <source src="assests/zoe-instructional-vid.mp4" type="video/webm">
          <source src="assests/zoe-instructional-vid.mp4" type="video/mp4">
      </video>
    </section
    `);
  $('.intro-video-container').delay(39000).fadeOut(1000, function(){
  $('.intro-video-container').remove();
    })
}

// remove intro video
function removeIntroVideo() {
  $('.intro-video-container').remove();
}


// game append text messages

// get ready message
function getReady() {
  $(".game-container").append(`
    <p class='get-ready'>Get Ready!</p>
    `);
  $('.get-ready').delay(2000).fadeOut(1000, function(){
  $('.get-ready').remove();
    })
}

// level up message
function levelUpMessage() {
  $(".game-container").append(`
    <p class='level-up-message'>Level Up!</p>
    `);
  $('.level-up-message').delay(2000).fadeOut(1000, function(){
  $('.level-up-message').remove();
    })
}

// winner message
function winnerMessage() {
  $(".game-container").append(`
    <p class='winner-message'>Winner!</p>
    `);
  $('.winner-message').delay(4000).fadeOut(1000, function(){
  $('.winner-message').remove();
    })
}

// game over message
function gameOverMessage() {
  $(".game-container").append(`
    <p class='game-over-message'>Game Over!</p>
    `);
  $('.game-over-message').delay(5000).fadeOut(1000, function(){
  $('.get-ready-message').remove();
    })
}


// display functions

//  display player lives
function displayLifeCount() {
  $('.life-count-txt').text(lives)
}

//  display player points
function pointsCounter() {
  $('.point-count-txt').text(points)
}

//  display player level
function levelDisplay() {
  $('.level-display-txt').text('level ' +level)
}


// sound functions

//  all invaders killed audio
function invadersAllDeadSound()  {
  $('#invaders-killed-audio').trigger('play')
}

//  button click audio
function buttonClick()  {
    $('#btn-click').trigger('play')
}

//  bullet to invader collision
function invaderShotSound()  {
  $('#shot-snake-audio').trigger('play')
}

//  player dies and is out of lives game over audio
function gameOverAudio()  {
  $('#game-over-audio').trigger('play')
}

//  player ship hit by invader bullet audio
function medic()  {
  $('#medic').trigger('play')
}

//  get ready to play audio
function lockAndLoad()  {
  $('#lock-and-load').trigger('play')
}

//  winner audio
function winnerAudio()  {
  $('#winner-audio').trigger('play')
}

//  winner audio
function hostessCaughtAudio()  {
  $('#hostes-caught-audio').trigger('play')
}

//  air hostess drop audio
function airHostessAudio()  {
  $('#air-hostess').trigger('play')
}

//  game background music
function gameMusic()  {
  $(".audio-container").append(`
    <audio id='game-background-audio' autoplay loop>
      <source src="assests/01 Send Me an Angel.m4a">
    </audio>
    `)
}

//  game initial place holder music
function gameIntroMusic() {
$(".audio-container").append(`
  <audio id='game-intro-audio' autoplay loop>
    <source src="assests/05 I'm Here to Kill Your Monster.m4a">
  </audio>
  `)
}

// remove game background audio
function removeGameMusic() {
  $('#game-background-audio').delay(1000).fadeOut(3000, function(){
  $('#game-background-audio').remove()
    })
}

// remove game background audio fast
function removeGameMusic() {
  $('#game-background-audio').delay(500).fadeOut(500, function(){
  $('#game-background-audio').remove()
    })
}

//  remove game placeholder music
function removeGameHolderAudio() {
  $('#game-intro-audio').remove()
}

//  reset the gameStartCheck to = 0
function resetGameStartCheck()  {
  gameStartCheck = 0
}


// button functions

// push start button
function pushStartButton() {
  $(".start-button-container").append(`
    <img class='start-button-push btn' src='assests/green-pushed-button.png'/>
    `);
  $('.start-button-push').delay(1000).fadeOut(1000, function(){
  $('.start-button-push').remove();
    })
}

// push restart button
function pushRestartButton() {
  $(".restart-button-container").append(`
    <img class='restart-button-push btn' src='assests/red-pushed-button.png'/>
    `);
  $('.restart-button-push').delay(1000).fadeOut(1000, function(){
  $('.restart-button-push').remove();
    })
}

// push instructions button
function pushInstructionButton() {
  $(".instruction-button-container").append(`
    <img class='instruction-button-push btn' src='assests/yellow-pushed-button.png'/>
    `);
  $('.instruction-button-push').delay(1000).fadeOut(1000, function(){
  $('.instruction-button-push').remove();
    })
}

// -----  GAME LOOP   ------------------------------------//

// auto runs the game loop
requestAnimationFrame(gameLoop);

// the game loop
function gameLoop() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw game pieces
  drawPlayer();
  drawHostess();
  drawPlayerBullet();
  drawInvaderBullet();
  drawInvaderPack(invaderRow1);
  drawInvaderPack(invaderRow2);
  drawInvaderPack(invaderRow3);

  // player bullet checks
  playerBulletCheck();
  bulletCollisionCheck();

  // player movements
  movePlayer();

  // player bullet vs invader collision check
  collision(bullets, invaderRow1);
  collision(bullets, invaderRow2);
  collision(bullets, invaderRow3);

  // invader or invader bullet vs player collision
  invadercollisionShip(player1, invaderRow1);
  invadercollisionShip(player1, invaderRow2);
  invadercollisionShip(player1, invaderRow3);
  invadercollisionShip(player1, enemyBullets);

  // hostess vs player collision
  hostesscollisionShip(player1, airHostessArray);

  //  update counter displays
  displayLifeCount();
  pointsCounter();
  levelDisplay();

  //  run the game loop
  requestAnimationFrame(gameLoop);
}


// -----  EVENT LISTENERS  ------------------------------------//

// start button on click
$('.start-button').on('click', function()  {
  gameStart();
  buttonClick();
  pushStartButton()
})

// reset button on click
$('.restart-button').on('click', function()  {
  resetGame();
  buttonClick();
  pushRestartButton()
})

// instruction button on click
$('.instruction-button').on('click', function()  {
  if(gameStartCheck === 0) {
  gameStartCheck = 1;
  removeGameHolderAudio();
  pushInstructionButton();
  instructionVideo();
  buttonClick();
  setTimeout(() => {resetGameStartCheck(); }, 38000);
  setTimeout(() => {gameIntroMusic(); }, 39000);
  setTimeout(() => {resetGame(); }, 39000)
  }
  console.log(gameStartCheck)
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
    theBullet.gunFire()
  }
})
