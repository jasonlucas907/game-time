const { expect } = require('chai');
const { assert } = require('chai');
const Player = require('../lib/player.js');

describe('Player test', () => {
  let player;

  beforeEach(() => {
    player = new Player(365, 400, 3, 100, 100)
  })

  it('should be a function', () => {
    assert.isFunction(Player);
  })

  it('should be an instance of a Player', () => {
    expect(player).to.be.an.instanceOf(Player)
  })

  it('should have a starting X and Y position', () => {
    expect(player.x).to.equal(365);
    expect(player.y).to.equal(400);
  })

  it('should have a default speed of 3', () => {
    expect(player.speed).to.equal(3);
  })

  it('should have a size', () => {
    expect(player.width).to.equal(100)
    expect(player.height).to.equal(100)
  })

  it('should be able to move to the left', () => {
    player.playerLeft();
    expect(player.x).to.equal(362);
    player.playerLeft();
    expect(player.x).to.equal(359)
      // player position should decrease 3px with each keypress
  })

  it('should be able to move to the right', () => {
    player.playerRight();
    expect(player.x).to.equal(368);
    player.playerRight();
    expect(player.x).to.equal(371)
      // player position should increase 3px with each keypress
  })

})
