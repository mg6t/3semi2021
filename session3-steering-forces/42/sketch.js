var t = 0;
var vehicle;
// const palette = ["#70d6ff" ,"#ff70a6", "#ff9770", "#ffd670", "#e9ff70", "#00FF00"];
const colorR = [112, 255, 255, 255];
const colorG = [214, 122, 151, 214];
const colorB = [255, 166, 112, 112];

function setup() {
  createCanvas(640, 360);
  // Create the vehicle
  vehicle = new Vehicle(320, 180);
  vehicle.setDetails();
}

function draw() {
  background(255);

  // 背景を透かす
  noStroke();
  for (let i = 0; i < 4; i++) {
    myColor = color(colorR[i], colorG[i], colorB[i]);
    fill(myColor);
    x = 250 * ((i+1)/2);
    y = 150 * ((i+1)/2);
    ellipse(x, y, 50, 50);
    // console.log(x,y);
  }

  // Arrive at the target
  var target = createVector(mouseX, mouseY);
  vehicle.arrive(target);

  // Update and display
  vehicle.update();
  stroke(0.1);
  vehicle.display(0.7, t);
  t += 0.005;

  vehicle.changeAlpha();
  vehicle.changeColor();
}
