const { expect } = require('chai');
const { assert } = require('chai');
const AirHostess = require('../lib/air-hostess.js');

describe('AirHostess test', () => {
  let airhostess

  beforeEach(() => {
    airhostess = new AirHostess('x', 0, 5, 40, 80);
  })

  it('should have a x', function()  {
    airhostess = new AirHostess('x');
    assert.equal(airhostess.x, 'x');
  });

  it('should be an instance of Airhostess', () => {
    expect(airhostess).to.be.an.instanceOf(AirHostess);
  })

  it('should have a starting X coordinate and a default Y coordinate of 0', () => {
    expect(airhostess.x).to.equal('x');
    expect(airhostess.y).to.equal(0);
  })


  it('should have a width and a height', () => {
    expect(airhostess.width).to.equal(40);
    expect(airhostess.height).to.equal(80);
  })

  it('should have a function to move down on the canvas', () => {
    airhostess.moveHostess();
    expect(airhostess.y).to.equal(5)
    airhostess.moveHostess();
    expect(airhostess.y).to.equal(10)
  })
})
