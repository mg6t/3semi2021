// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Separation and Seek

// The "Vehicle" constructor


function Vehicle(x, y) {
  // All the usual stuff
  this.position = createVector(x, y);
  this.r = 10;
  this.maxspeed = 8;    // Maximum speed
  this.maxforce = 0.5;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force

	this.applyForce(steer);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  this.separate = function(vehicles) {
    var desiredseparation = 15;
    var sum = createVector(0, 0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed

	  sum.setMag(this.maxspeed);
	  var steer = p5.Vector.sub(sum,this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
	  this.applyForce(steer);
    }
  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function() {
	var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
	rotate(theta);
	
	beginShape();
	vertex(0,0);
	vertex(-this.r/2,this.r);
	vertex(this.r/2,this.r);	
	endShape(CLOSE);
	
//    ellipse(0, 0, this.r, this.r);
    pop();
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }
}
