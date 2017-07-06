var { expect } = require('chai');
var { assert } = require('chai');
var EnemyBullet = require('../lib/enemy-bullet.js');


  describe('EnemyBullet test', () => {
  let enemybullet;

  beforeEach(() => {
    enemybullet = new EnemyBullet(undefined, 0, 5, 20, 20);
  })

  it('should be an instance of EnemyBullet', () => {
    expect(enemybullet).to.be.an.instanceOf(EnemyBullet)
  })

  it('should have X and Y coordinates', () => {
    expect(enemybullet.x).to.equal(undefined);
    expect(enemybullet.y).to.equal(0)
  })

  it('should have a default velocity of 5', () => {
    expect(enemybullet.velocity).to.equal(5)
  })

  it('should have a width and a height', () => {
    expect(enemybullet.width).to.equal(20)
    expect(enemybullet.height).to.equal(20)
  })

  it('should have a function to move on the canvas', () => {
    assert.isFunction(enemybullet.moveEnemyBullet)
  })
  })
