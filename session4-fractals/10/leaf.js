function Leaf(pos) {

  this.pos = pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0.2);
  var wind = createVector(random(-0.2,0.2), random(0,0.3));
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.add(wind);
    this.pos.add(this.vel);
  }

  this.display = function() {
	noStroke();
    fill(34, 139, 34);
    ellipse(this.pos.x, this.pos.y, 4, 3);
  }
}