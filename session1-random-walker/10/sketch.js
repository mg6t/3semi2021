// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker



const NORTH = 0;      // 上
const NORTHEAST = 1;  // 右上
const EAST = 2;       // 右
const SOUTHEAST = 3;  // 右下
const SOUTH = 4;      // 下
const SOUTHWEST = 5;  // 左下
const WEST = 6;       // 左
const NORTHWEST = 7;  // 左上

const stepSize = 2;

let direction;
let diameter;
let posX, posY;
let dist;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0, 30);

  posX = width / 2;
  posY = height / 2;
}

function draw() {
  background(255, 10);

//	dist = (mouseX-width/2)^2+(mouseY-height/2)^2;
  for(let i=0; i<=(mouseX+mouseY)/2; i++) {
//  for(let i=0; i<=dist; i++) {
    direction = int(random(0, 8));
    diameter = random(2, 4);

    if(direction === NORTH) {
      posY += stepSize;
	  fill('red');
//	  fill(255,0,0);
    } else if(direction === NORTHEAST) {
      posX += stepSize;
      posY += stepSize;
	  fill('red');
//	fill(255,0,0);
    } else if(direction === EAST) {
      posX += stepSize;
	  fill('red');
//	  fill(0,128,0);
    } else if(direction === SOUTHEAST) {
      posX += stepSize;
      posY -= stepSize;
	  fill('blue');
//	  fill(0,128,0);
    } else if(direction === SOUTH) {
      posY -= stepSize;
	  fill('blue');
//	  fill(0,0,255);
    } else if(direction === SOUTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
	  fill('blue');
//      fill(0,0,255);
    } else if(direction === WEST) {
      posX -= stepSize;
	  fill('blue');
//	  fill(255,255,0);
    } else if(direction === NORTHWEST) {
      posX -= stepSize;
      posY += stepSize;
	  fill('red');
//	  fill(255,255,0);
    }


    if(posX > width)  posX = 0;
    if(posX < 0)      posX = width;
    if(posY < 0)      posY = height;
    if(posY > height) posY = 0;    


    ellipse(posX, posY, diameter, diameter);
  }
}

function keyPressed() {
  if(keyCode === ENTER) clear();
}

/*
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

  this.update = function() {
    // Move Walker randomly
    var vel = createVector(random(-5, 5), random(-5, 5));
    this.pos.add(vel);
  }

  this.display = function() {
    // Draw Walker as circle
    fill(255);
    ellipse(this.pos.x, this.pos.y, 48, 48);
  }
}
*/
