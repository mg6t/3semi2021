// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

var w;
const palette = ["#70d6ff" ,"#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];

function setup() {
  createCanvas(640, 360);
  // Make a Walker object
  w1 = new Walker();
  w2 = new Walker();
  w3 = new Walker();
  w4 = new Walker();
  w5 = new Walker();
  w6 = new Walker();
  w7 = new Walker();
  w8 = new Walker();
}

function draw() {
  background(51);
  // Update and display object
  w1.update();
  w1.display(100);

  w2.update();
  w2.display(150);

  w3.update();
  w3.display(200);

  w4.update();
  w4.display(250);

  w5.update();
  w5.display(300);

  w6.update();
  w6.display(350);

  w7.update();
  w7.display(400);

  w8.update();
  w8.display(450);
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(0, 0);

  this.c = pick(palette);
  console.log(this.c);

  this.update = function() {
    // Move Walker randomly
    var vel = createVector(random(-5, 5), random(-5, 5));
    this.pos.add(vel);
  }

  this.display = function(positionX) {
    // Draw Walker as circle
    strokeWeight(3);
    stroke(150);
    fill(this.c);
    rect(positionX, 180, 50, this.pos.y);
  }

}

function pick(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}
