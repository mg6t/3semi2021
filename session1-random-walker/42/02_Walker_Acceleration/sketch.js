// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Walker accelerating towards mouse

var w;
const palette = ["#70d6ff" ,"#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];

function setup() {
  createCanvas(600, 360);
  // Make a Walker object
  w = new Walker(50);
  w1 = new Walker(100);
  w2 = new Walker(150);
  w3 = new Walker(200);
  w4 = new Walker(250);
  w5 = new Walker(300);
  w6 = new Walker(350);
  w7 = new Walker(400);
  w8 = new Walker(450);
  w9 = new Walker(500);
  w10 = new Walker(550);
  w11 = new Walker(600);
  w12 = new Walker(650);

  updatePos = new updatePosition();

}

function draw() {
  background(51);

  v = updatePos.revel();
  // console.log(updateVel);

  // Update and display object

  w.updateRect();
  w.display(v);

  w1.updateRect();
  w1.display(v);

  w2.updateRect();
  w2.display(v);

  w3.updateRect();
  w3.display(v);

  w4.updateRect();
  w4.display(v);

  w5.updateRect();
  w5.display(v);

  w6.updateRect();
  w6.display(v);

  w7.updateRect();
  w7.display(v);

  w8.updateRect();
  w8.display(v);

  w9.updateRect();
  w9.display(v);

  w10.updateRect();
  w10.display(v);

  w11.updateRect();
  w11.display(v);

  w12.updateRect();
  w12.display(v);
}

function Walker(positionX) {

  // Start Walker in center
  this.rectPos = createVector(positionX, 0);
  // set Color
  this.c = pick(palette);
  // console.log(this.c);

  this.updateRect = function() {
    // Move Walker randomly
    var vel = createVector(0, random(-5, 5));
    this.rectPos.add(vel);
  }

  this.display = function(vel) {
    // Draw Walker as circle
    strokeWeight(3);
    stroke(150);
    fill(this.c);
    rect((this.rectPos.x + vel.x)%650-50, 180, 50, this.rectPos.y);
    console.log(this.rectPos.x + vel.x);
    this.rectPos = this.rectPos.add(vel);
  }
}

function updatePosition() {

  // Start with 0 velocity
  this.vel = createVector(0, 0);

  this.accX = 0.005;

  this.revel = function() {
    // Vector at mouse location
    // var mouse = createVector(mouseX, mouseY);
    // Vector pointing from Walker to mouse

    // Physics engine algorithm
    this.vel.x += this.accX;

    return this.vel;
  }
}

function pick(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}
