// Reference
// By Roni Kaufman
// https://openprocessing.org/sketch/744859

function Vehicle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 3.0;
  this.maxforce = 0.2;
  this.color = color(255, 255, 255, 0);

  let step = 0.01;
  let size = 100;

  this.nodes = 0;
  this.radiusDist = [];

  this.nowColorPos = createVector(0,0);

  this.alpha = 0;
  this.selectColor = 0;

  this.setDetails = function() {
    this.nodes = floor((2 * PI) / step);

    this.radiusDist.length = this.nodes;
    this.radiusDist.fill(size);
  }

  this.changeAlpha = function() {
    var p = p5.Vector.sub(this.nowColorPos,this.pos)
    // distance = sqrt(p.x**2+p.y**2);
    var distance = p.mag();
    // console.log(distance);
    if (distance <= 200) {
      this.alpha = map(Math.floor(distance), 0, 200, 255, 0);
    } else {
      this.alpha = 0;
    }
  }

  this.changeColor = function() {
    // console.log(this.alpha);
    if (this.pos.x >= 100 && this.pos.x <= 150 && this.pos.y>= 50 && this.pos.y <= 100) {
      this.selectColor = 0;
      this.nowColorPos.set(125, 75);
    } else if (this.pos.x >= 225 && this.pos.x <= 275 && this.pos.y>= 125 && this.pos.y <= 175) {
      this.selectColor = 1;
      this.nowColorPos.set(250, 150);
    } else if (this.pos.x >= 350 && this.pos.x <= 400 && this.pos.y>= 200 && this.pos.y <= 250) {
      this.selectColor = 2;
      this.nowColorPos.set(375, 225);
    } else if (this.pos.x >= 475 && this.pos.x <= 525 && this.pos.y>= 275 && this.pos.y <= 325) {
      this.selectColor = 3;
      this.nowColorPos.set(500, 300);
    }
    this.color = color(colorR[this.selectColor], colorG[this.selectColor], colorB[this.selectColor], this.alpha);
  }



  this.display = function(k, t) {
    // 輪郭
    beginShape();
    fill(this.color);
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
      let r = this.radiusDist[i]/2 + noise(k * r1, k * r2, t) * (2/3) * this.radiusDist[i]/3;
      let x = this.pos.x + r * cos(theta);
      let y = this.pos.y + r * sin(theta);
      curveVertex(x, y);
    }
    endShape();

    // eyes
    fill(0);
    ellipse(this.pos.x - 15 + 10*noise(t), this.pos.y - 17 + 10*noise(t+1), 5, 5);
    ellipse(this.pos.x + 5 + 10*noise(t+2), this.pos.y - 14 + 10*noise(t+3), 5, 5);

    // mouth
    stroke(0);
    noFill();
    strokeWeight(2);
    beginShape();
    vertex(this.pos.x - 16 + 10*noise(t+4), this.pos.y - 8 + 10*noise(t+5));
    quadraticVertex(this.pos.x - 5 + 10*noise(t+6),
                    this.pos.y + 3 + 10*noise(t+7),
                    this.pos.x + 8 + 10*noise(t+8),
                    this.pos.y - 5 + 10*noise(t+9));
    endShape();
    noStroke();
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.arrive = function(target) {

    var desired = p5.Vector.sub(target, this.pos);

    // desired.setMag(this.maxspeed);

    // The arrive behavior!
    var d = desired.mag();

    if (d < 100) {
      // Map the desired magnitude according to distance
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }


    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);

    this.applyForce(steering);

  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

  }
}
