// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness

//constructor
function Rocket(l, dna_, totalRockets) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  this.location = createVector(l.x,l.y);
  // Size
  this.r = 4;
  // Fitness and DNA
  this.fitness = 0;
  // To count which force we're on in the genes
  this.geneCounter = 0;
  this.dna = dna_;
  // How close did it get to the target
  this.recordDist = 10000;      // Some high number that will be beat instantly
  this.finishTime = 0;          // We're going to count how long it takes to reach target

  this.hitObstacle = false;    // Am I stuck on an obstacle?
  this.hitTarget = false;   // Did I reach the target


  this.radiusDist = [];

  this.t = 0;

  let step = 0.01;
  let size = 100;

  this.setDetails = function() {
    this.nodes = floor((2 * PI) / step);

    this.radiusDist.length = this.nodes;
    this.radiusDist.fill(size);
  }


  // FITNESS FUNCTION
  // distance = distance from target
  // finish = what order did i finish (first, second, etc. . .)
  // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
  // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
  this.calcFitness = function() {
    if (this.recordDist < 1) {
      this.recordDist = 1;
    }

    // Reward finishing faster and getting close
    this.fitness = (1/(this.finishTime*this.recordDist));

    // Make the function exponential
    this.fitness = pow(this.fitness, 4);

    if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
    if (this.hitTarget) this.fitness *= 2; // twice the fitness for finishing!
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  this.run = function(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      // If I hit an edge or an obstacle
      this.obstacles(os);
    }
    // Draw me!
    if (!this.hitObstacle) {
      this.display(this.t);
      this.t += 0.005;
    }
  }

  // Did I make it to the target?
  this.checkTarget = function() {
    var d = dist(this.location.x, this.location.y, target.location.x, target.location.y);
    if (d < this.recordDist) this.recordDist = d;

    if (target.contains(this.location) && !this.hitTarget) {
      this.hitTarget = true;
    }
    else if (!this.hitTarget) {
      this.finishTime++;
    }
  }

  // Did I hit an obstacle?
  this.obstacles = function(os) {
    for (var i = 0; i < os.length; i++) {
      if (os[i].contains(this.location)) {
        this.hitObstacle = true;
      }
    }
  }

  this.applyForce = function(f) {
    this.acceleration.add(f);
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function(t) {
    // var theta = this.velocity.heading() + PI/3;
    var r = this.r;

    k = 0.7;

    stroke(0.005);
    beginShape();
    fill(112, 214, 255, 100);
    for (let i = 0; i < this.nodes; i++) {
      let theta = i * step;
      let r1, r2;
      if (theta < PI / 2) {
        r1 = cos(theta);
        r2 = 1;
      } else if (theta < PI) {
        r1 = 0;
        r2 = sin(theta);
      } else if (theta < 3 * PI / 2) {
        r1 = sin(theta);
        r2 = 0;
      } else {
        r1 = 1;
        r2 = cos(theta);
      }
      let r = this.radiusDist[i]/8 + noise(k * r1, k * r2, t) * (2/3) * this.radiusDist[i]/3;
      let x = this.location.x + r * cos(theta);
      let y = this.location.y + r * sin(theta);
      curveVertex(x, y);
    }
    endShape();

    // eyes
    fill(0);
    ellipse(this.location.x - 10 + 10*noise(t), this.location.y - 17 + 10*noise(t+1), 2, 2);
    ellipse(this.location.x + 5 + 10*noise(t+2), this.location.y - 14 + 10*noise(t+3), 2, 2);

    // mouth
    stroke(0);
    noFill();
    strokeWeight(2);
    beginShape();
    vertex(this.location.x - 16 + 10*noise(t+4), this.location.y - 8 + 10*noise(t+5));
    quadraticVertex(this.location.x - 5 + 10*noise(t+6),
                    this.location.y + 3 + 10*noise(t+7),
                    this.location.x + 8 + 10*noise(t+8),
                    this.location.y - 5 + 10*noise(t+9));
    endShape();
  };

  this.getFitness = function() {
    return this.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };

  this.stopped = function() {
    return this.hitObstacle;
  }
}
