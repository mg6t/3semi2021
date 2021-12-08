// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Separation and Seek

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
var vehicles = [];
var xoff = 0;
var noise_slider;

function setup() {
  createCanvas(640,360);
  // We are now making random vehicles and storing them in an array
  //for (var i = 0; i < 10; i++) {
    vehicles.push(new Vehicle(random(width),random(height)));
  //}

  noise_slider = createSlider(1.0, 10.0, 1.0);//最小値、最大値、デフォ値
  noise_slider.position(420, 60);
  noise_slider.style('width', '100px');
}

function draw() {
  background(color("#b7d5ac"));

  //スライダー
  var noise_val = noise_slider.value();

  // Perlin noise value
  var x = noise(xoff*noise_val) * width;
  var y = noise(xoff*noise_val+10) * height;
  // Move through perlin noise space

  xoff += 0.02;

  fill(color("#de1b1e"));
  stroke(color("#FFFF"));//縁
  //ellipse(x, 180, 48, 48);
  target = triangle(30+x, 75+y, 58+x, 20+y, 86+x, 75+y);

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles,x,y);
    vehicles[i].update(10);
    vehicles[i].borders();
    vehicles[i].display();
  }

}


function mouseClicked() {//マウスをクリックするとvehicleが追加
  vehicles.push(new Vehicle(mouseX,mouseY));
}
