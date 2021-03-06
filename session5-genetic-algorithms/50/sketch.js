// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of p5.Vectors
// Each p5.Vector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

var lifetime;  // How long should each generation live

var population;  // Population

var lifeCounter;   // Timer for cycle of generation

var target;        // Target location

var info;

var recordtime;         // Fastest time to target

var obstacles;  //an array list to keep track of all the obstacles!

var angle;

function setup() {
  createCanvas(640, 360);
  // The number of cycles we will allow a generation to live
  lifetime = height;

  // Initialize variables
  lifeCounter = 0;

  //target = new Obstacle(width/2-12, 24, 24, 24);

  // Create a population with a mutation rate, and population max
  var mutationRate = 0.01;
  population = new Population(mutationRate, 50);

  info = createP("");
  info.position(10,380);

  recordtime = lifeCounter;
  obstacles = [];


  fill(255,192,203,200);
  for (var i = 0; i < 30; i++) {//真ん中
    var r_y = random(-210,-150);
    var r_x = random(-100,100);
    obstacles.push(new Obstacle(r_x, r_y, 24, 24));
  }
  for (var i = 0; i < 30; i++) {//左
    var r_y = random(-190,-100);
    var r_x = random(-150,-90);
    obstacles.push(new Obstacle(r_x, r_y, 24, 24));
  }
  for (var i = 0; i < 30; i++) {//右
    var r_y = random(-190,-100);
    var r_x = random(90,150);
    obstacles.push(new Obstacle(r_x, r_y, 24, 24));
  }

  //fill(255,0,0,200);
  target = new Obstacle(0, -160, 24, 24);

  // Create the obstacle course
  //obstacles = [];
  //obstacles.push(new Obstacle(width/2-100, height/2, 200, 10));
  //obstacles.push(new Obstacle(width/2-100, height/2, 200, 10));

}

function draw() {
  background(color("#b7d5ac"));

  angle = map(height/2, 0, width, 0, PI / 2);

  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  stroke(255);
  branch(120, 1);

  // Draw the start and target locations
  target.display();

  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifeCounter < recordtime)) {
      recordtime = lifeCounter;
    }
    lifeCounter++;
    // Otherwise a new generation
  }
  else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

 // Draw the obstacles
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].display();

  }
  info.html("Generation #: " + population.getGenerations() + "<br>" + "Cycles left: " + (lifetime-lifeCounter));

}

// Move the target if the mouse is pressed
// System will adapt to new target
// function mousePressed() {
//   target.location.x = mouseX;
//   target.location.y = mouseY;
// }

function branch(len, generation) {
  // Draw the branch
  strokeWeight(map(generation, 1, 10, 4, 1));
  stroke("#a0522d");
  line(0, 0, 0, -len);

  // Move to the end and shrink.
  translate(0, -len);
  len *= 0.66;

  generation++;

  if (len > 2) {
    push();
    rotate(angle);
    branch(len, generation);
    pop();

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-angle);
    branch(len, generation);
    pop();
  }


}
