// -----  REQUIRES   ------------------------------------//

require('./game.css');
const Bullet = require('./bullet.js');
const Game = require('./the-game.js');


// -----  GLOBAL VARIABLES   ---------------------------//

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
// gameStartCheck: 0 = gameStart can function.  0 = instuction video can function.  2 = game reset can function
let gameStartCheck = 0;
let game1 = new Game();
let keys = [];


// -----  FUNCTIONS   ------------------------------------//

// start game function
//  removes autoplay video - plays intro video - starts the game
function gameStart()  {

  if (gameStartCheck === 0) {
    disableAllButtons();
    removeGameHolderAudio();
    removeGameHolder();
    game1.zeroState();
    installGamePackage()
  }
}

 // timed initiate game delay
function installGamePackage()  {
  introVideo();
  setTimeout(() => {game1.gameMusic(); }, 11000);
  setTimeout(() => {enableResetButton(); }, 17000);
  setTimeout(() => {game1.getReady(); }, 14000);
  setTimeout(() => {game1.buildInvadersRow1(); }, 16000);
  setTimeout(() => {game1.buildInvadersRow2(); }, 16000);
  setTimeout(() => {game1.buildInvadersRow3(); }, 16000)

}

//  reset the game
function resetGame() {
  if (gameStartCheck === 2)  {
    removeIntroVideo();
    resetGameStartCheck();
    removeGameHolderAudio();
    removeGameHolder();
    game1.clearArrays();
    game1.removeGameMusic();
    setTimeout(() => {gameIntroMusic(); }, 1000);
    setTimeout(() => {addHolderVideo(); }, 1000)
  }
}

//  resets game if player has no lives
function gameOverReset()  {
  if (game1.lives < 1) {
    setTimeout(() => {resetGame(); }, 3000)
  }
}

//  resets the game if player wins
function gameWinReset() {
  if (game1.level > 5) {
    setTimeout(() => {resetGame(); }, 9000)
  }
}

//  reset the gameStartCheck to = 0 (start button and instruction button can function)
function resetGameStartCheck()  {
  gameStartCheck = 0
}

//  reset the gameStartCheck to = 1 (start, reset and instruction button disable)
function disableAllButtons()  {
  gameStartCheck = 1
}

//  reset the gameStartCheck to = 2 (enable reset button)
function enableResetButton()  {
  gameStartCheck = 2
}


//  video handlers

//   remove the initial auto play video
function removeGameHolder() {
  $('.game-holder-video-container').delay(1000).fadeOut(1000, function(){
  $('.game-holder-video-container').remove()
    })
}

// add initial auto play video
function addHolderVideo() {
  $(".game-container").append(`
    <section class='game-holder-video-container video-container'>
      <video poster="assests/video-holder.mp4" class='game-holder-video' id="bgvid" playsinline autoplay muted loop>
          <source src="assests/video-holder.mp4" type="video/webm">
          <source src="assests/video-holder.mp4" type="video/mp4">
      </video>
      <p class='press-start-message'>Press Start!</p>
    </section>
    `)
}

// add robbie intro video play, delay and remove
function introVideo() {
  $(".game-container").append(`
    <section class='intro-video-container video-container'>
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

// remove robbie intro video
function removeIntroVideo() {
  $('.intro-video-container').remove();
}

// add instructions video play, delay and remove
function instructionVideo() {
  $(".game-container").append(`
    <section class='intro-video-container video-container'>
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


// sound functions

//  button click audio
function buttonClick()  {
  $('#btn-click').trigger('play')
}

//  game initial place holder music
function gameIntroMusic() {
  $(".audio-container").append(`
  <audio id='game-intro-audio' autoplay loop>
    <source src="assests/05 I'm Here to Kill Your Monster.m4a">
  </audio>
  `)
}

//  remove initial game placeholder music
function removeGameHolderAudio() {
  $('#game-intro-audio').remove()
}


// button functions

// push start button image
function pushStartButton() {
  $(".start-button-container").append(`
    <img class='start-button-push btn' src='assests/green-pushed-button.png'/>
    `);
  $('.start-button-push').delay(1000).fadeOut(1000, function(){
  $('.start-button-push').remove();
  })
}

// push restart button image
function pushRestartButton() {
  $(".restart-button-container").append(`
    <img class='restart-button-push btn' src='assests/red-pushed-button.png'/>
    `);
  $('.restart-button-push').delay(1000).fadeOut(1000, function(){
  $('.restart-button-push').remove();
    })
}

// push instructions button image
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

  // eval player lives status and reset if live = 0
  gameOverReset();

  //  eval player level and restart game after level 5 complete
  gameWinReset();

  // draw game pieces
  // drawGame();
  game1.drawPlayer(context);
  game1.drawHostess(context);
  game1.drawPlayerBullet(context);
  game1.drawInvaderBullet(context);
  game1.drawInvaderPack1(context);
  game1.drawInvaderPack2(context);
  game1.drawInvaderPack3(context);

  // player movements
  movePlayer();

  // monitor if the bullet has left the canvas
  game1.playerBulletCheck();

  // player bullet vs invader collision check
  game1.collision(game1.bullets, game1.invaderRow1);
  game1.collision(game1.bullets, game1.invaderRow2);
  game1.collision(game1.bullets, game1.invaderRow3);

  // invader or invader bullet vs player collision
  game1.invadercollisionShip(game1.player1, game1.invaderRow1);
  game1.invadercollisionShip(game1.player1, game1.invaderRow2);
  game1.invadercollisionShip(game1.player1, game1.invaderRow3);
  game1.invadercollisionShip(game1.player1, game1.enemyBullets);

  // hostess vs player collision
  game1.hostesscollisionShip(game1.player1, game1.airHostessArray);

  //  update player status displays
  game1.displayLifeCount();
  game1.pointsCounter();
  game1.levelDisplay();

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
  if (gameStartCheck === 0) {
    disableAllButtons();
    removeGameHolderAudio();
    pushInstructionButton();
    instructionVideo();
    buttonClick();
    setTimeout(() => {resetGameStartCheck(); }, 38000);
    setTimeout(() => {gameIntroMusic(); }, 39000);
    setTimeout(() => {resetGame(); }, 39000)
  }
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

//     move the player
function movePlayer() {
  if (keys[37]) {
    game1.player1.playerLeft()
  } else if (keys[39]) {
    game1.player1.playerRight()
  }
}

//   fire bullet on space bar
$(window).keydown(function (event) {
  let fireCommand = event.which;
  let playerX = game1.player1.x;
  let playerY = game1.player1.y;

  if (event.which === 32) {
    let theBullet = new Bullet(playerX, playerY);

    game1.bullets.push(theBullet);
    game1.player1.gunFire()
  }
})
