// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

var particles = [];
var rains = [];

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  if (mouseY < height*3/4) {
    var r = new Rain(mouseX, mouseY, random(2,4));
    rains.push(r);
  }
}

function keyPressed() {
  if (key == ' ') {
    rains.splice(0, 1);
  }
}

function draw() {
  background(100);
  fill(255);
  noStroke();
  rect(0, 0, 640, 270);
  var wind = createVector(0.1, 0);

  for (var i = 0; i < rains.length; i++) {
    var gravity = createVector(0, 0.1 * rains[i].mass);
    rains[i].applyForce(gravity);

    rains[i].update();
    // rains[i].edges();
    rains[i].display();

    if (rains[i].pos.y > height*3/4) {
      rains[i].changeParticleFlag();
    }

    rains[i].showParticle();
  }

  fill(51);
  noStroke();
  rect(0, 270, 640, 90);
}
