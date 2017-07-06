var { expect } = require('chai');
var { assert } = require('chai');
var Invaders = require('../lib/invaders.js');


describe('Invaders test', () => {
  let invaders;

  beforeEach(() => {
    invaders = new Invaders();
  })

  it.skip('should be an instance of Invaders', () => {
    expect(invaders).to.be.an.instanceOf(invaders);
  })

  it.skip('should have an X and Y coordinate', () => {
    let invaders = new Invaders('x' + 35, 'y' - 15)

    expect(invaders.x).to.equal(invaders.x + 35);
    expect(invaders.y).to.equal(invaders.y - 15);
  })



  it.skip('should have a size', () => {
    expect(invaders.width).to.equal(30);
    expect(invaders.height).to.equal(30);
  })


  it.skip('should move on the canvas', () => {
    assert.isFunction(invaders.moveBullet);
  });

  it.skip('should be able to draw itself on the canvas', () => {
    assert.isFunction(invaders.draw)
  })
})
