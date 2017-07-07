var { expect } = require('chai');
var { assert } = require('chai');
var TheGame = require('../lib/the-game.js')



describe('TheGame test', () => {
  let game = new TheGame();

  it('should be an instance of the game', () => {
    expect(game).to.be.an.instanceOf(TheGame);


  })



})
