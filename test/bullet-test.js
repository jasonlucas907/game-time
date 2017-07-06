var { expect } = require('chai');
var Bullet = require('../lib/bullet.js');


  describe('Bullet', function() {
  let bullet;

  beforeEach(function () {
    bullet = new Bullet();
  })

  it('should be an instance of Bullet', () => {
    expect(bullet).to.be.an.instanceOf(Bullet);
  })

  it('should have an X and Y coordinate', () => {
    // let bullet = new Bullet(x + 35, y - 15)
    expect(bullet.x).to.equal(bullet.x + 35);
    expect(bullet.y).to.equal(bullet.y - 15);
  })

  it('should have a size', () => {
    expect(bullet.width).to.equal(30);
    expect(bullet.height).to.equal(30);
  })

  it('should fire upwards at evil snakes', () => {
    expect(bullet.velocity).to.equal(-5)
  })


})

// describe ('Bullet', () => {
//   let bullet = new Bullet ();
//
//   it('should be a function', () => {
//     expect(Bullet(Bullet);
//   })
//
//   it('should create an instance of Bullet', () => {
//     const bullet = new Bullet ();
//   })
//
//   it('should have an X position', () =>{
//     const bullet = new Bullet (x);
//     expect.toEqual(bullet)
//   })
//
//
//
//
// })
