const palette = ["#70d6ff" ,"#ff70a6", "#ff9770", "#ffd670", "#e9ff70", "#00FF00"];

function Rain(x, y, m) {

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  this.particleFlag = false;

  var particles = [];
  var p1 = new Particle(this.pos.x, 270, random(1,1.8), 1, 0.06*abs(270-y)/2, pick(palette));
  var p2 = new Particle(this.pos.x, 270, random(1,1.8), random(-0.5, 0.5), 0.07*abs(270-y)/2, pick(palette));
  var p3 = new Particle(this.pos.x, 270, random(1,1.8), -1, 0.06*abs(270-y)/2, pick(palette));
  particles.push(p1);
  particles.push(p2);
  particles.push(p3);

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    c = color("#005FD8");
    fill(0, 0, 255, 60);
    noStroke();
    triangle(this.pos.x-15.25, this.pos.y, this.pos.x+15.25, this.pos.y, this.pos.x, this.pos.y-30);
    arc(this.pos.x, this.pos.y, 30, 30, 0, PI);
  }

  this.changeParticleFlag = function () {
    this.particleFlag = true;
  }

  this.showParticle = function () {
    // console.log(this.particleFlag);
    if (this.particleFlag === true) {
      for (var i = 0; i < particles.length; i++) {
        var gravity = createVector(0, 0.1 * particles[i].mass);
        particles[i].applyForce(gravity);

        particles[i].update();
        particles[i].edges();
        particles[i].display();
      }

    }
  }

}

function pick(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}
