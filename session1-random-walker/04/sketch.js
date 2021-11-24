// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

let x, y, r;
let red, green, blue;
var w;

function setup() {
  background(127);
  noStroke();
  createCanvas(640, 360);
  // Make a Walker object
  w = new Walker();
}

function draw() {
  x = random(width);
  y = random(height);

  if(random() > 0.9){
    r = random(60, 80);
  }else{
    r = random(10, 30);

    //色をランダムにする
  red = random(0, 255);
  green = random(0, 255);
  blue = random(0, 255);


  // Update and display object

  w.update();
  w.display();
}
}

 function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, 0);

  this.update = function() {
    // Move Walker randomly
    var vel = createVector(random(-10, 10), random(-10, 10));
    this.pos.add(vel);
  }

  this.display = function() {
    // Draw Walker as circle
    fill(red, green, blue, random(30, 250));
  ellipse(this.pos.x, this.pos.y, r, r);
  }
}
