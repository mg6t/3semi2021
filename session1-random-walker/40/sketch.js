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
  w.update();
  w.display();
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, height / 2);
  x0 = width / 2;
  y0 = height / 2;
  n =0;
  //vel;
  this.update = function() {
    // Move Walker randomly
//    m = Math.abs(this.pos.x - width / 2）；
//    n = Math.abs(this.pos.y - height / 2）；

    if (n % 2 == 0){
//   if (n == 0){
      vel = createVector(random(-5, 5)+100 , random(-5, 5)+100);
}    else{
      vel = createVector(random(-5, 5)-100 , random(-5, 5)-100);
}
//    vel = createVector(random(-m, m) , random(-n, n));
//    vel = createVector(random(-5, 5) , random(-5, 5));
//      var vel = createVector(random(- this.pos.x + x0, this.pos.x - x0), random(- this.pos.y + y0, this.pos.y - y0));
    this.pos.add(vel);
    n = n + 1;
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
}
