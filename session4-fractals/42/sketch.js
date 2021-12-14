var angle;
var mouseClickCount = 1;
var changeColorCount = 0;

const colorR = [112, 255, 255, 255, 233, 160, 50, 225];
const colorG = [214, 122, 151, 214, 255, 255, 75, 170];
const colorB = [255, 166, 112, 112, 112, 160, 100, 160];

function setup() {
  createCanvas(640, 640);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(51);
  // Let's pick an angle 0 to 180 degrees based on the mouse position
  angle = map(mouseX, 0, width, 0, 180);

  // Start the rectangle from the center of the screen
  translate(width / 2, height / 2);
  stroke(colorR[changeColorCount], colorG[changeColorCount], colorB[changeColorCount]);
  for(let i=0; i<=360; i+=60){
    push();
    rotate(i);
    branch(100, 1);
    pop();
  }
}

function branch(len) {
  // Draw the branch
  fill(colorR[changeColorCount], colorG[changeColorCount], colorB[changeColorCount], 30);
  rect(0, 0, len*0.5, len*0.5);

  // Move to the end and shrink.
  translate(0, -len);
  len *= 0.66;


  if (len > 100 / mouseClickCount) {
    push();
    rotate(angle);
    branch(len);
    pop();

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-angle);
    branch(len);
    pop();
  }
}

function mouseClicked() {
  mouseClickCount++;
  changeColorCount = floor(random(8));
}
