/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var game = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// -----  REQUIRES   ------------------------------------//

	__webpack_require__(2);
	const Bullet = __webpack_require__(6);
	const Game = __webpack_require__(7);

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
	function gameStart() {

	  if (gameStartCheck === 0) {
	    disableAllButtons();
	    removeGameHolderAudio();
	    removeGameHolder();
	    game1.zeroState();
	    installGamePackage();
	  }
	}

	// timed initiate game delay
	function installGamePackage() {
	  introVideo();
	  setTimeout(() => {
	    game1.gameMusic();
	  }, 11000);
	  setTimeout(() => {
	    enableResetButton();
	  }, 11000);
	  setTimeout(() => {
	    game1.getReady();
	  }, 14000);
	  setTimeout(() => {
	    game1.buildInvadersRow1();
	  }, 16000);
	  setTimeout(() => {
	    game1.buildInvadersRow2();
	  }, 16000);
	  setTimeout(() => {
	    game1.buildInvadersRow3();
	  }, 16000);
	}

	//  reset the game
	function resetGame() {
	  if (gameStartCheck === 2) {
	    removeIntroVideo();
	    resetGameStartCheck();
	    removeGameHolderAudio();
	    removeGameHolder();
	    game1.zeroState();
	    game1.clearArrays();
	    game1.removeGameMusic();
	    setTimeout(() => {
	      gameIntroMusic();
	    }, 1000);
	    setTimeout(() => {
	      addHolderVideo();
	    }, 1000);
	  }
	}

	//  resets game if player has no lives
	function gameOverReset() {
	  if (game1.lives < 1) {
	    setTimeout(() => {
	      resetGame();
	    }, 3000);
	  }
	}

	//  resets the game if player wins
	function gameWinReset() {
	  if (game1.level > 4) {
	    setTimeout(() => {
	      resetGame();
	    }, 11000);
	  }
	}

	//  reset the gameStartCheck to = 0 (start button and instruction button can function)
	function resetGameStartCheck() {
	  gameStartCheck = 0;
	}

	//  reset the gameStartCheck to = 1 (start, reset and instruction button disable)
	function disableAllButtons() {
	  gameStartCheck = 1;
	}

	//  reset the gameStartCheck to = 2 (enable reset button)
	function enableResetButton() {
	  gameStartCheck = 2;
	}

	//  video handlers

	//   remove the initial auto play video
	function removeGameHolder() {
	  $('.game-holder-video-container').delay(1000).fadeOut(1000, function () {
	    $('.game-holder-video-container').remove();
	  });
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
	    `);
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
	  $('.intro-video-container').delay(12000).fadeOut(1000, function () {
	    $('.intro-video-container').remove();
	  });
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
	  $('.intro-video-container').delay(39000).fadeOut(1000, function () {
	    $('.intro-video-container').remove();
	  });
	}

	// sound functions

	//  button click audio
	function buttonClick() {
	  $('#btn-click').trigger('play');
	}

	//  game initial place holder music
	function gameIntroMusic() {
	  $(".audio-container").append(`
	  <audio id='game-intro-audio' autoplay loop>
	    <source src="assests/05 I'm Here to Kill Your Monster.m4a">
	  </audio>
	  `);
	}

	//  remove initial game placeholder music
	function removeGameHolderAudio() {
	  $('#game-intro-audio').remove();
	}

	// button functions

	// push start button image
	function pushStartButton() {
	  $(".start-button-container").append(`
	    <img class='start-button-push btn' src='assests/green-pushed-button.png'/>
	    `);
	  $('.start-button-push').delay(1000).fadeOut(1000, function () {
	    $('.start-button-push').remove();
	  });
	}

	// push restart button image
	function pushRestartButton() {
	  $(".restart-button-container").append(`
	    <img class='restart-button-push btn' src='assests/red-pushed-button.png'/>
	    `);
	  $('.restart-button-push').delay(1000).fadeOut(1000, function () {
	    $('.restart-button-push').remove();
	  });
	}

	// push instructions button image
	function pushInstructionButton() {
	  $(".instruction-button-container").append(`
	    <img class='instruction-button-push btn' src='assests/yellow-pushed-button.png'/>
	    `);
	  $('.instruction-button-push').delay(1000).fadeOut(1000, function () {
	    $('.instruction-button-push').remove();
	  });
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
	  game1.displayLevel();

	  //  run the game loop
	  requestAnimationFrame(gameLoop);
	}

	// -----  EVENT LISTENERS  ------------------------------------//

	// start button on click
	$('.start-button').on('click', function () {
	  gameStart();
	  buttonClick();
	  pushStartButton();
	});

	// reset button on click
	$('.restart-button').on('click', function () {
	  resetGame();
	  buttonClick();
	  pushRestartButton();
	});

	// instruction button on click
	$('.instruction-button').on('click', function () {
	  if (gameStartCheck === 0) {
	    disableAllButtons();
	    removeGameHolderAudio();
	    pushInstructionButton();
	    instructionVideo();
	    buttonClick();
	    setTimeout(() => {
	      resetGameStartCheck();
	    }, 38000);
	    setTimeout(() => {
	      gameIntroMusic();
	    }, 39000);
	    setTimeout(() => {
	      resetGame();
	    }, 39000);
	  }
	});

	//   capture key down
	$(window).keydown(function (event) {
	  let keyCommand = event.which;
	  keys[event.which] = true;
	});

	//    capture key up
	$(window).keyup(function (event) {
	  let keyCommand = event.which;
	  keys[event.which] = false;
	});

	//     move the player
	function movePlayer() {
	  if (keys[37]) {
	    game1.player1.playerLeft();
	  } else if (keys[39]) {
	    game1.player1.playerRight();
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
	    game1.player1.gunFire();
	  }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./game.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./game.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "/*\n/************************************\n          General\n************************************/\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\na   {\n  text-decoration: none;\n}\n\nbody{\n  font-family: 'VT323', monospace;\n  background: black;\n}\n\n\n/************************************\n          Main\n************************************/\n\n/*** the background arcade video ***/\n.background-video-container  {\n  width: 100%;\n  height: 100vh;\n  position: absolute;\n  overflow: hidden;\n  z-index: -1000;\n}\n\n.background-video  {\n  width: 100%;\n  height: 100vh;\n  object-fit: cover;\n}\n\n\n/************************************\n    The game centered container\n************************************/\n\n/*** everything is built inside this ***/\n.game-container {\n  width: 1200px;\n  margin: auto;\n  position: relative;\n}\n\n/*** arcade game graphic ***/\n.arcade-back  {\n  width: 100%;\n  position: absolute;\n  z-index: 100;\n}\n\n\n/************************************\n          Buttons\n************************************/\n\n/*** game buttons container ***/\n.button-container {\n  height: 75px;\n  width: 250px;\n  position: relative;\n  z-index: 100;\n  top: 812px;\n  left: 490px;\n}\n\n/*** individual button container ***/\n.btn-con  {\n  display: inline-block;\n}\n\n.start-button-push {\n  z-index: 1000;\n}\n\n.start-button-tag {\n  left: 16px;\n}\n\n.restart-button {\n  left: 86px;\n}\n\n.restart-button-push {\n  left: 86px;\n  z-index: 1000;\n}\n\n.restart-button-tag {\n  left: 98px;\n}\n\n.instruction-button {\n  left: 175px;\n}\n\n.instruction-button-push {\n  left: 175px;\n  z-index: 1000;\n}\n\n.instructions-button-tag {\n  left: 171px;\n}\n\n/*** default button values  ***/\n.btn {\n  position: absolute;\n  height: 65px;\n  width: 65px;\n  border-radius: 50%;\n  border: none;\n  top: 0;\n}\n\n.button-label  {\n  position: absolute;\n  top: 65px;\n  color: red;\n}\n\n.btn:hover {\n  cursor: pointer;\n}\n\n\n/************************************\n        Player status displays\n************************************/\n\n/*** player lives count display  ***/\n.counter-display  {\n  font-size: 60px;\n  color: red;\n  position: absolute;\n  z-index: 100;\n  top: 820px;\n}\n\n.life-count-txt {\n  right: 325px;\n}\n\n/*** player points count display  ***/\n.point-count-txt {\n  right: 154px;\n}\n\n/*** player level count display  ***/\n.level-display-txt {\n  font-size: 30px;\n  top: 750px;\n  right: 225px;\n}\n\n\n/************************************\n          Videos\n************************************/\n\n/*** holds videos overflow is hidden to resize ***/\n.video-container  {\n  width: 900px;\n  height: 700px;\n  overflow: hidden;\n  position: absolute;\n  left: 140px;\n  z-index: 99;\n}\n\n/*** video holder section ***/\n/*** append videos to this section ***/\n.game-holder-video-container  {\n  top: 255px;\n}\n\n/*** default auto play video when open site or restart***/\n.game-holder-video  {\n  width: 930px;\n  position: absolute;\n}\n\n/*** game robbie intro video & instruction video ***/\n/*** js appended  ***/\n.intro-video-container  {\n  top: 250px;\n}\n\n.intro-video {\n  width: 970px;\n}\n\n/*** game background cloud video ***/\n.cloud-video-container  {\n  top: 250px;\n  left: 147px;\n  z-index: 1;\n}\n\n.cloud-video {\n  width: 1000px;\n}\n\n\n/************************************\n     Appended game messages\n************************************/\n\n/*** game start mesage overlay game holder video ***/\n.press-start-message  {\n  font-size: 80px;\n  color: red;\n  position: absolute;\n  top: 300px;\n  left: 272px;\n  z-index: 1000;\n  -webkit-animation-name: blinker;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);\n  -webkit-animation-duration: 1s;\n}\n\n@-webkit-keyframes blinker {\n  from { opacity: 1.0; }\n  to { opacity: 0.0; }\n}\n\n/*** game text messages js appended***/\n/*** default message centered on screen ***/\n/*** js appended  ***/\n.get-ready,\n.game-over-message,\n.level-up-message,\n.winner-message  {\n  font-size: 80px;\n  color: red;\n  position: absolute;\n  top: 400px;\n  left: 450px;\n  z-index: 1000;\n}\n\n\n/************************************\n          Canvas\n************************************/\n\n#game {\n  position: absolute;\n  top: 263px;\n  left: 225px;\n  z-index: 2;\n}\n", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	
	class Bullet {
	  constructor(x, y, velocity, width, height) {
	    this.x = x + 35, this.y = y - 15, this.velocity = -5, this.width = 30, this.height = 30;
	  }

	  draw(context) {
	    let bulletImage = new Image();

	    bulletImage.src = 'assests/shooter-bottle.png';
	    context.drawImage(bulletImage, this.x, this.y, this.width, this.height);
	  }

	  moveBullet() {
	    this.y += this.velocity;
	  }

	}

	module.exports = Bullet;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// -----  REQUIRES   ------------------------------------//

	__webpack_require__(2);
	const Bullet = __webpack_require__(6);
	const EnemyBullet = __webpack_require__(8);
	const Invaders = __webpack_require__(9);
	const Player = __webpack_require__(10);
	const AirHostess = __webpack_require__(11);

	class Game {
	  constructor() {
	    this.player1 = new Player(), this.points = 0, this.theInvaderCounter = 27, this.bullets = [], this.enemyBullets = [], this.airHostessArray = [], this.invaderRow1 = [], this.invaderRow2 = [], this.invaderRow3 = [], this.level = 1, this.levelDisplay = 1, this.invaderLevelSpeed = 2, this.lives = 3, this.randomFireLevel = 1;
	  }

	  // monitor if bullet has hit an invader
	  collision(a, b) {
	    a.forEach((bullet, bulletIndex) => {
	      b.forEach((invader, index) => {
	        if (this.collisionDetector(invader, bullet)) {
	          this.points += 1;
	          this.theInvaderCounter -= 1;
	          b.splice(index, 1);
	          a.splice(bulletIndex, 1);
	          this.player1.invaderShotSound();
	          this.levelIncrease();
	        }
	      });
	    });
	  }

	  // monitor if invader or enemy bullet has hit the ship
	  invadercollisionShip(a, b) {
	    b.forEach((invader, index) => {
	      if (this.collisionDetector(a, invader)) {
	        b.splice(index, 1);
	        this.medic();
	        this.enemyBullets.splice(0, this.enemyBullets.length);
	        this.invaderRow1.splice(0, this.invaderRow1.length);
	        this.invaderRow2.splice(0, this.invaderRow2.length);
	        this.invaderRow3.splice(0, this.invaderRow3.length);
	        this.collisionReset();
	      }
	    });
	  }

	  // monitor if invader or enemy bullet has hit the ship
	  hostesscollisionShip(a, b) {
	    b.forEach((hostess, index) => {
	      if (this.collisionDetector(a, hostess)) {
	        b.splice(index, 1);
	        this.lives += 1;
	        this.player1.hostessCaughtAudio();
	      }
	    });
	  }

	  // evals if a collision has occured
	  collisionDetector(a, b) {
	    return b.x < a.x + a.width && b.x + b.width > a.x && b.y < a.y + a.height && b.y + b.height > a.y;
	  }

	  // the player functions

	  // draw player function
	  drawPlayer(context) {
	    if (this.lives >= 1) {
	      this.player1.draw(context);
	    }
	  }

	  //  player bullet functions

	  // draw and move the bullet
	  drawPlayerBullet(context) {
	    for (let i = 0; i < this.bullets.length; i++) {
	      this.bullets[i].draw(context);
	      this.bullets[i].moveBullet();
	    }
	  }

	  // monitor if the bullet has left the canvas
	  playerBulletCheck() {
	    for (let i = 0; i < this.bullets.length; i++) {
	      if (this.bullets[i].y <= 0) {
	        this.bullets.splice(i, 1);
	      }
	    }
	  }

	  //    invaders functions

	  // build invaders
	  buildInvadersRow1() {
	    for (let x = 150; x < 551; x += 50) {
	      this.invaderRow1.push(new Invaders(x, 40, this.invaderLevelSpeed, .05));
	    }
	  }

	  buildInvadersRow2() {
	    for (let x = 150; x < 551; x += 50) {
	      this.invaderRow2.push(new Invaders(x, 80, this.invaderLevelSpeed, .05));
	    }
	  }

	  buildInvadersRow3() {
	    for (let x = 150; x < 551; x += 50) {
	      this.invaderRow3.push(new Invaders(x, 120, this.invaderLevelSpeed, .05));
	    }
	  }

	  //   draw invaders
	  drawInvaderPack1(context) {
	    for (let i = 0; i < this.invaderRow1.length; i++) {
	      this.invaderRow1[i].draw(context);
	      this.invaderRow1[i].moveInvader();
	      this.randomInvaderFire();
	      this.randomHostessCreate();
	    }
	  }

	  drawInvaderPack2(context) {
	    for (let i = 0; i < this.invaderRow2.length; i++) {
	      this.invaderRow2[i].draw(context);
	      this.invaderRow2[i].moveInvader();
	      this.randomInvaderFire();
	      this.randomHostessCreate();
	    }
	  }

	  drawInvaderPack3(context) {
	    for (let i = 0; i < this.invaderRow3.length; i++) {
	      this.invaderRow3[i].draw(context);
	      this.invaderRow3[i].moveInvader();
	      this.randomInvaderFire();
	      this.randomHostessCreate();
	    }
	  }

	  //    invaders bullet functions

	  // decides to fire randomly
	  randomInvaderFire() {
	    let randomPosition = Math.floor(Math.random() * 700) + 1;
	    let randomNumber = Math.floor(Math.random() * 2000) + 1;

	    if (randomNumber <= this.randomFireLevel) {
	      this.invaderFire(randomPosition);
	    }
	  }

	  //  builds and fires enemy bullet
	  invaderFire(randomPosition) {
	    let invaderBullet = new EnemyBullet(randomPosition);

	    this.enemyBullets.push(invaderBullet);
	  }

	  //  draw invader bullet
	  drawInvaderBullet(context) {
	    for (let i = 0; i < this.enemyBullets.length; i++) {
	      this.enemyBullets[i].draw(context);
	      this.enemyBullets[i].moveEnemyBullet();
	    }
	  }

	  //    air hostess functions

	  // decides to build hostess randomly
	  randomHostessCreate() {
	    let randomPosition = Math.floor(Math.random() * 700) + 1;
	    let randomNumber = Math.floor(Math.random() * 20000) + 1;

	    if (randomNumber <= 1) {
	      this.hostessCreate(randomPosition);
	    }
	  }

	  //  builds and fires hostess
	  hostessCreate(randomPosition) {
	    let theHostess = new AirHostess(randomPosition);

	    this.airHostessArray.push(theHostess);
	    theHostess.airHostessAudio();
	  }

	  //  draw hostess
	  drawHostess(context) {
	    for (let i = 0; i < this.airHostessArray.length; i++) {
	      this.airHostessArray[i].draw(context);
	      this.airHostessArray[i].moveHostess();
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
	    this.lives = 3;
	  }

	  // collision reset
	  // evals if player is out of lives
	  // if out of lives reset the game
	  // if still has lives reset invaders and continue
	  collisionReset() {
	    this.lives -= 1;
	    if (this.lives >= 1) {
	      setTimeout(() => {
	        this.getReady();
	      }, 1000);
	      setTimeout(() => {
	        this.lockAndLoad();
	      }, 3000);
	      setTimeout(() => {
	        this.buildInvadersRow1();;
	      }, 4000);
	      setTimeout(() => {
	        this.buildInvadersRow2();;
	      }, 4000);
	      setTimeout(() => {
	        this.buildInvadersRow3();
	      }, 4000);
	      this.theInvaderCounter = 27;
	    } else if (this.lives < 1) {
	      this.gameOverMessage();
	      this.removeGameMusic();
	      setTimeout(() => {
	        this.gameOverAudio();
	      }, 1000);
	    }
	  }

	  // if invader count = 0 then increas level +1
	  levelIncrease() {
	    if (this.theInvaderCounter === 0) {
	      this.level += 1;
	      this.levelDisplay += 1;
	      setTimeout(() => {
	        this.player1.invadersAllDeadSound();
	      }, 1000);
	      this.levelUpEval();
	    }
	  }

	  //  level up function
	  //  if all invaders killed advance to next level
	  //  if pass level 5 win the game
	  levelUpEval() {
	    if (this.level <= 4) {
	      this.levelUpMessage();
	      this.theInvaderCounter = 27;
	      this.invaderLevelSpeed += 1;
	      this.randomFireLevel += 1;
	      setTimeout(() => {
	        this.getReady();
	      }, 3000);
	      setTimeout(() => {
	        this.lockAndLoad();
	      }, 3000);
	      setTimeout(() => {
	        this.buildInvadersRow1();
	      }, 3000);
	      setTimeout(() => {
	        this.buildInvadersRow2();
	      }, 3000);
	      setTimeout(() => {
	        this.buildInvadersRow3();
	      }, 3000);
	    } else if (this.level > 4) {
	      // this.level = 5;
	      this.removeGameMusic();
	      this.winnerMessage();
	      setTimeout(() => {
	        this.winnerVideo();
	      }, 3000);
	    }
	  }

	  //  clear all game arrays
	  clearArrays() {
	    this.enemyBullets.splice(0, this.enemyBullets.length);
	    this.invaderRow1.splice(0, this.invaderRow1.length);
	    this.invaderRow2.splice(0, this.invaderRow2.length);
	    this.invaderRow3.splice(0, this.invaderRow3.length);
	    this.airHostessArray.splice(0, this.airHostessArray.length);
	  }

	  // game append text messages

	  // get ready message
	  getReady() {
	    $(".game-container").append(`
	      <p class='get-ready'>Get Ready!</p>
	      `);
	    $('.get-ready').delay(2000).fadeOut(1000, function () {
	      $('.get-ready').remove();
	    });
	  }

	  // level up message
	  levelUpMessage() {
	    $(".game-container").append(`
	      <p class='level-up-message'>Level Up!</p>
	      `);
	    $('.level-up-message').delay(2000).fadeOut(1000, function () {
	      $('.level-up-message').remove();
	    });
	  }

	  // winner message
	  winnerMessage() {
	    $(".game-container").append(`
	      <p class='winner-message'>Winner!</p>
	      `);
	    $('.winner-message').delay(4000).fadeOut(1000, function () {
	      $('.winner-message').remove();
	    });
	  }

	  // game over message
	  gameOverMessage() {
	    $(".game-container").append(`
	      <p class='game-over-message'>Game Over!</p>
	      `);
	    $('.game-over-message').delay(5000).fadeOut(1000, function () {
	      $('.get-ready-message').remove();
	    });
	  }

	  // display functions

	  //  display player lives
	  displayLifeCount() {
	    $('.life-count-txt').text(this.lives);
	  }
	  //
	  // //  display player points
	  pointsCounter() {
	    $('.point-count-txt').text(this.points);
	  }
	  //
	  // //  display player level
	  displayLevel() {
	    $('.level-display-txt').text('level ' + this.levelDisplay);
	  }

	  // sound functions

	  //  player dies and is out of lives game over audio
	  gameOverAudio() {
	    $('#game-over-audio').trigger('play');
	  }

	  //  player ship hit by invader bullet audio
	  medic() {
	    $('#medic').trigger('play');
	  }

	  //  get ready to play audio
	  lockAndLoad() {
	    $('#lock-and-load').trigger('play');
	  }

	  //  game background music
	  gameMusic() {
	    $(".audio-container").append(`
	      <audio id='game-background-audio' autoplay loop>
	        <source src="assests/01 Send Me an Angel.m4a">
	      </audio>
	      `);
	  }

	  // remove game background audio
	  removeGameMusic() {
	    $('#game-background-audio').delay(500).fadeOut(500, function () {
	      $('#game-background-audio').remove();
	    });
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
	    $('.intro-video-container').delay(10000).fadeOut(2000, function () {
	      $('.intro-video-container').remove();
	    });
	  }

	}

	module.exports = Game;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	const Bullet = __webpack_require__(6);

	class EnemyBullet extends Bullet {
	  constructor(x) {
	    super(x);
	    this.x = x, this.y = 0, this.velocity = 5, this.width = 20, this.height = 20;
	  }

	  draw(context) {
	    let snakeShootImage = new Image();

	    snakeShootImage.src = 'assests/shoot-snale.png';
	    context.drawImage(snakeShootImage, this.x, this.y, this.width, this.height);
	  }

	  moveEnemyBullet() {
	    this.y += this.velocity;
	  }

	}

	module.exports = EnemyBullet;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	class Invaders {
	  constructor(x, y, speed, speedY = .05) {
	    this.x = x, this.y = y, this.speed = speed, this.speedX = 2, this.speedY = .05, this.leftEdge = this.x - 150, this.rightEdge = this.x + 130, this.bottomEdge = this.y + 20, this.width = 30, this.height = 30;
	  }

	  draw(context) {
	    let snakeImage = new Image();
	    snakeImage.src = 'assests/King-cobra.png';
	    context.drawImage(snakeImage, this.x, this.y, this.width, this.height);
	  }

	  moveInvader() {
	    this.x += this.speedX;
	    this.y += this.speedY;
	    if (this.x <= this.leftEdge) {
	      this.speedX = this.speed;
	    } else if (this.x >= this.rightEdge + this.width) {
	      this.speedX = -this.speed;
	      this.y = this.y + 5;
	    }
	  }

	}

	module.exports = Invaders;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	class Player {
	  constructor() {
	    this.x = 365, this.y = 400, this.speed = 3, this.width = 100, this.height = 100, this.explode = 'no';
	  }

	  draw(context) {
	    if (this.explode === 'no') {
	      let playerImage = new Image();
	      playerImage.src = 'assests/airplane.png';
	      context.drawImage(playerImage, this.x, this.y, this.width, this.height);
	    } else if (this.explode === 'yes') {
	      let playerImage = new Image();
	      playerImage.src = 'assests/kapow.png';
	      context.drawImage(playerImage, this.x, this.y, this.width, this.height);
	    }
	  }

	  playerLeft() {
	    if (this.x >= 1) {
	      this.x -= this.speed;
	    }
	  }

	  playerRight() {
	    if (this.x <= 635) {
	      this.x += this.speed;
	    }
	  }

	  gunFire() {
	    $('#gun-audio').trigger("play");
	  }

	  invadersAllDeadSound() {
	    $('#invaders-killed-audio').trigger('play');
	  }

	  //  bullet to invader collision sound
	  invaderShotSound() {
	    $('#shot-snake-audio').trigger('play');
	  }

	  //  winner audio
	  winnerAudio() {
	    $('#winner-audio').trigger('play');
	  }

	  //  hostess caught audio
	  hostessCaughtAudio() {
	    $('#hostes-caught-audio').trigger('play');
	  }

	}

	module.exports = Player;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	
	class AirHostess {
	  constructor(x) {
	    this.x = x, this.y = 0, this.velocity = 5, this.width = 40, this.height = 80;
	  }

	  draw(context) {
	    let airHostessImage = new Image();
	    airHostessImage.src = 'assests/air-hostess.png';
	    context.drawImage(airHostessImage, this.x, this.y, this.width, this.height);
	  }

	  moveHostess() {
	    this.y += this.velocity;
	  }

	  //  air hostess drop audio
	  airHostessAudio() {
	    $('#air-hostess').trigger('play');
	  }

	}

	module.exports = AirHostess;

/***/ })
/******/ ]);