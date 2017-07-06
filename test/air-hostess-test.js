var { expect } = require('chai');
var { assert } = require('chai');
var AirHostess = require('../lib/air-hostess.js');

describe('AirHostess test', () => {
let airhostess;

  beforeEach(() => {
    airhostess = new AirHostess();
  })

  it('should be an instance of Airhostess', () => {
    expect(airhostess).to.be.an.instanceOf(AirHostess);
  })

  it('should have a starting X and Y coordinate', () => {
    expect(airhostess.x).to.equal(undefined);
    expect(airhostess.y).to.equal(0);
  })


  it('should have a width and a height', () => {
    expect(airhostess.width).to.equal(40);
    expect(airhostess.height).to.equal(80);
  })

  it('should have a function to move on the canvas', () => {
    assert.isFunction(airhostess.moveHostess);
  })
})
