// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

var w;

function setup() {
  createCanvas(640, 360);
  // Make a Walker object
  w = new Walker();
}

function draw() {
  background(51);
  // Update and display object
  var gravity = createVector(0, 0.2 * w.mass);
  w.applyForce(gravity);
  w.update();
  w.edges();
  w.display();
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, height / 2);

  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = 2;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    // Move Walker randomly
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    // Draw Walker as circle
    fill(255);
    ellipse(this.pos.x, this.pos.y-72, 60, 60);
    ellipse(this.pos.x, this.pos.y, 96, 96);
    fill(0,255,0);
    ellipse(this.pos.x + 100, this.pos.y-72, 60, 60);
    ellipse(this.pos.x + 100, this.pos.y, 96, 96);
  }
  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }
  }
}
