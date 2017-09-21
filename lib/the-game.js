// -----  REQUIRES   ------------------------------------//

require('./game.css');
const Bullet = require('./bullet.js');
const EnemyBullet = require('./enemy-bullet.js');
const Invaders = require('./invaders.js');
const Player = require('./player.js');
const AirHostess = require('./air-hostess.js');



class Game {
  constructor() {
    this.player1 = new Player(),
    this.points = 0,
    this.theInvaderCounter = 27,
    this.bullets = [],
    this.enemyBullets = [],
    this.airHostessArray = [],
    this.invaderRow1 = [],
    this.invaderRow2 = [],
    this.invaderRow3 = [],
    this.level = 1,
    this.levelDisplay = 1,
    this.invaderLevelSpeed = 2,
    this.lives = 3,
    this.randomFireLevel = 1
  }

// monitor if bullet has hit an invader
  collision(a, b)  {
    a.forEach((bullet, bulletIndex) => {
      b.forEach((invader, index) => {
        if (this.collisionDetector(invader, bullet)) {
          this.points += 1;
          this.theInvaderCounter -= 1;
          b.splice(index, 1);
          a.splice(bulletIndex, 1);
          this.player1.invaderShotSound();
          this.levelIncrease()
        }
      })
    })
  }

// monitor if invader or enemy bullet has hit the ship
  invadercollisionShip(a, b)  {
    b.forEach((invader, index) => {
      if (this.collisionDetector(a, invader)) {
        b.splice(index, 1);
        this.medic();
        this.enemyBullets.splice(0, this.enemyBullets.length);
        this.invaderRow1.splice(0, this.invaderRow1.length);
        this.invaderRow2.splice(0, this.invaderRow2.length);
        this.invaderRow3.splice(0, this.invaderRow3.length);
        this.collisionReset()
      }
    })
  }

// monitor if invader or enemy bullet has hit the ship
  hostesscollisionShip(a, b)  {
    b.forEach((hostess, index) => {
      if (this.collisionDetector(a, hostess)) {
        b.splice(index, 1);
        this.lives += 1;
        this.player1.hostessCaughtAudio()
      }
    })
  }

// evals if a collision has occured
  collisionDetector(a, b) {
    return  b.x < a.x + a.width &&
            b.x + b.width > a.x &&
            b.y < a.y + a.height &&
            b.y + b.height > a.y
  }


// the player functions

// draw player function
  drawPlayer(context)  {
    if (this.lives >= 1) {
      this.player1.draw(context)
    }
  }


//  player bullet functions

// draw and move the bullet
  drawPlayerBullet (context) {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(context);
      this.bullets[i].moveBullet()
    }
  }

// monitor if the bullet has left the canvas
  playerBulletCheck() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].y <= 0) {
        this.bullets.splice(i, 1)
      }
    }
  }


//    invaders functions

// build invaders
  buildInvadersRow1()  {
    for (let x = 150; x < 551; x += 50) {
      this.invaderRow1.push(new Invaders(x, 40, this.invaderLevelSpeed, .05))
    }
  }

  buildInvadersRow2()  {
    for (let x = 150; x < 551; x += 50) {
      this.invaderRow2.push(new Invaders(x, 80, this.invaderLevelSpeed, .05))
    }
  }

  buildInvadersRow3()  {
    for (let x = 150; x < 551; x += 50) {
      this.invaderRow3.push(new Invaders(x, 120, this.invaderLevelSpeed, .05))
    }
  }

//   draw invaders
  drawInvaderPack1(context) {
    for (let i = 0; i < this.invaderRow1.length; i++) {
      this.invaderRow1[i].draw(context);
      this.invaderRow1[i].moveInvader();
      this.randomInvaderFire();
      this.randomHostessCreate()
    }
  }

  drawInvaderPack2(context) {
    for (let i = 0; i < this.invaderRow2.length; i++) {
      this.invaderRow2[i].draw(context);
      this.invaderRow2[i].moveInvader();
      this.randomInvaderFire();
      this.randomHostessCreate()
    }
  }

  drawInvaderPack3(context) {
    for (let i = 0; i < this.invaderRow3.length; i++) {
      this.invaderRow3[i].draw(context);
      this.invaderRow3[i].moveInvader();
      this.randomInvaderFire();
      this.randomHostessCreate()
    }
  }


//    invaders bullet functions

// decides to fire randomly
  randomInvaderFire() {
    let randomPosition = Math.floor(Math.random() * 700) + 1;
    let randomNumber = Math.floor(Math.random() * 2000) + 1;

    if (randomNumber <= this.randomFireLevel) {
      this.invaderFire(randomPosition)
    }
  }

//  builds and fires enemy bullet
  invaderFire(randomPosition) {
    let invaderBullet = new EnemyBullet(randomPosition);

    this.enemyBullets.push(invaderBullet)
  }

//  draw invader bullet
  drawInvaderBullet(context) {
    for (let i = 0; i < this.enemyBullets.length; i++) {
      this.enemyBullets[i].draw(context);
      this.enemyBullets[i].moveEnemyBullet()
    }
  }


//    air hostess functions

// decides to build hostess randomly
  randomHostessCreate() {
    let randomPosition = Math.floor(Math.random() * 700) + 1;
    let randomNumber = Math.floor(Math.random() * 20000) + 1;

    if (randomNumber <= 1) {
      this.hostessCreate(randomPosition)
    }
  }

//  builds and fires hostess
  hostessCreate(randomPosition) {
    let theHostess = new AirHostess(randomPosition);

    this.airHostessArray.push(theHostess);
    theHostess.airHostessAudio()
  }

//  draw hostess
  drawHostess(context) {
    for (let i = 0; i < this.airHostessArray.length; i++) {
      this.airHostessArray[i].draw(context);
      this.airHostessArray[i].moveHostess()
    }
  }

//   game functions

// reset game values to zero state//
  zeroState() {
    this.randomFireLevel = 1;
    this.levelDisplay = 1;
    this.level = 1;
    this.points = 0;
    this.invaderLevelSpeed = 2;
    this.theInvaderCounter = 27;
    this.lives = 3
  }

// collision reset
// evals if player is out of lives
// if out of lives reset the game
// if still has lives reset invaders and continue
  collisionReset() {
    this.lives -= 1;
    if (this.lives >= 1) {
      setTimeout(() => {this.getReady(); }, 1000);
      setTimeout(() => {this.lockAndLoad(); }, 3000);
      setTimeout(() => {this.buildInvadersRow1();; }, 4000);
      setTimeout(() => {this.buildInvadersRow2();; }, 4000);
      setTimeout(() => {this.buildInvadersRow3(); }, 4000);
      this.theInvaderCounter = 27
    }
    else if(this.lives < 1) {
      this.gameOverMessage();
      this.removeGameMusic();
      setTimeout(() => {this.gameOverAudio(); }, 1000)
    }
  }

// if invader count = 0 then increas level +1
  levelIncrease(){
    if(this.theInvaderCounter === 0)  {
      this.level += 1;
      this.levelDisplay += 1;
      setTimeout(() => {this.player1.invadersAllDeadSound(); }, 1000);
      this.levelUpEval()
    }
  }

//  level up function
//  if all invaders killed advance to next level
//  if pass level 5 win the game
  levelUpEval()  {
    if (this.level <= 4) {
      this.levelUpMessage();
      this.theInvaderCounter = 27;
      this.invaderLevelSpeed += 1;
      this.randomFireLevel += 1;
      setTimeout(() => {this.getReady(); }, 3000);
      setTimeout(() => {this.lockAndLoad(); }, 3000);
      setTimeout(() => {this.buildInvadersRow1(); }, 3000);
      setTimeout(() => {this.buildInvadersRow2(); }, 3000);
      setTimeout(() => {this.buildInvadersRow3(); }, 3000)
    }
    else if (this.level > 4) {
      // this.level = 5;
      this.removeGameMusic();
      this.winnerMessage();
      setTimeout(() => {
      this.winnerVideo(); }, 3000)
    }
  }

  //  clear all game arrays
  clearArrays() {
    this.enemyBullets.splice(0, this.enemyBullets.length);
    this.invaderRow1.splice(0, this.invaderRow1.length);
    this.invaderRow2.splice(0, this.invaderRow2.length);
    this.invaderRow3.splice(0, this.invaderRow3.length);
    this.airHostessArray.splice(0, this.airHostessArray.length)
  }


// game append text messages

// get ready message
  getReady() {
    $(".game-container").append(`
      <p class='get-ready'>Get Ready!</p>
      `);
    $('.get-ready').delay(2000).fadeOut(1000, function(){
    $('.get-ready').remove()
      })
  }

// level up message
  levelUpMessage() {
    $(".game-container").append(`
      <p class='level-up-message'>Level Up!</p>
      `);
    $('.level-up-message').delay(2000).fadeOut(1000, function(){
    $('.level-up-message').remove()
      })
  }

// winner message
  winnerMessage() {
    $(".game-container").append(`
      <p class='winner-message'>Winner!</p>
      `);
    $('.winner-message').delay(4000).fadeOut(1000, function(){
    $('.winner-message').remove()
      })
  }

// game over message
  gameOverMessage() {
    $(".game-container").append(`
      <p class='game-over-message'>Game Over!</p>
      `);
    $('.game-over-message').delay(5000).fadeOut(1000, function(){
    $('.get-ready-message').remove()
      })
  }


// display functions

//  display player lives
  displayLifeCount() {
    $('.life-count-txt').text(this.lives)
  }
//
// //  display player points
  pointsCounter() {
    $('.point-count-txt').text(this.points)
  }
//
// //  display player level
  displayLevel() {
    $('.level-display-txt').text('level ' + this.levelDisplay)
  }


// sound functions

//  player dies and is out of lives game over audio
  gameOverAudio()  {
    $('#game-over-audio').trigger('play')
  }

//  player ship hit by invader bullet audio
  medic()  {
    $('#medic').trigger('play')
  }

//  get ready to play audio
  lockAndLoad()  {
    $('#lock-and-load').trigger('play')
  }

//  game background music
  gameMusic()  {
    $(".audio-container").append(`
      <audio id='game-background-audio' autoplay loop>
        <source src="assests/01 Send Me an Angel.m4a">
      </audio>
      `)
  }

// remove game background audio
  removeGameMusic() {
    $('#game-background-audio').delay(500).fadeOut(500, function(){
    $('#game-background-audio').remove()
      })
  }


  winnerVideo() {
    $(".game-container").append(`
      <section class='intro-video-container video-container'>
        <video poster="assests/jeff on a plane.mp4" class='intro-video' id="bgvid" playsinline autoplay>
            <source src="assests/jeff on a plane.mp4" type="video/webm">
            <source src="assests/jeff on a plane.mp4" type="video/mp4">
        </video>
      </section
      `);
    $('.intro-video-container').delay(10000).fadeOut(2000, function(){
    $('.intro-video-container').remove();
    })
  }


}

module.exports = Game;
