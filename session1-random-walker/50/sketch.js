// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Perlin noise

// "x-offset" in Perlin noise space
var xoff = 0;

function setup() {
  createCanvas(640, 360);
  background(color("#b7d5ac"));
}

function draw() {

  // Perlin noise value
  var x = noise(xoff) * width;
  var y = noise(xoff+10) * height;
  // Move through perlin noise space

  xoff += 0.01;

  fill(color("#ef93b6"));
  stroke(color("#FFFF"));//縁
  //ellipse(x, 180, 48, 48);
  triangle(30+x, 75+y, 58+x, 20+y, 86+x, 75+y);

}
