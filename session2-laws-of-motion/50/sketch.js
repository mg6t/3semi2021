// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

var particles = [];
let slider;

function setup() {
  createCanvas(640, 360);
  //スライダー1(風)
  slider = createSlider(0, 100, 0);//最小値、最大値、デフォ値
  slider.position(420, 60);
  slider.style('width', '100px');

  //スライダー2(重力)
  slider2 = createSlider(1, 30, 2);//最小値、最大値、デフォ値
  slider2.position(420, 100);
  slider2.style('width', '100px');
}

function mousePressed() {
  var p = new Particle(mouseX, mouseY, random(2,4));
  particles.push(p);
}

function keyPressed() {
  if (key == ' ') {
    particles.splice(0, 1);
  }

}

function draw() {
  background(color("#b7d5ac"));//緑
  //スライダー
  let val = slider.value();
  let val2 = slider2.value();

  var wind = createVector(0.1*val, 0);

  for (var i = 0; i < particles.length; i++) {
    var gravity = createVector(0, 0.2 * particles[i].mass * val2);
    particles[i].applyForce(gravity);

    // Wind is applied only if mouse is pressed
    if (mouseIsPressed) {
      particles[i].applyForce(wind);
    }

    particles[i].update();
    particles[i].edges();
    particles[i].display();
  }
}
