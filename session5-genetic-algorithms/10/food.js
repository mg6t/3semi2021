// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing
// Evolution EcoSystem

// A collection of food in the world

const colorR = [0, 255, 0, 0];
const colorG = [0, 0, 255, 0];
const colorB = [255, 0, 0, 0];


function Food(num) {
  // Start swith some food
  this.food = [];
  for (var i = 0; i < num; i++) {
     this.food.push(createVector(random(width),random(height)));
      myColor = color(colorR[i%4], colorG[i%4], colorB[i%4]);
	  this.food[i].color = myColor;
  }

  // Add some food at a location
  this.add = function(l) {
     this.food.push(l.copy());
	  var i = this.food.length-1;
      var f = this.food[i];
      myColor = color(colorR[i%4], colorG[i%4], colorB[i%4]);
	  f.color = myColor;
  }

  // Display the food
  this.run = function() {
    for (var i = 0; i < this.food.length; i++) {
      var f = this.food[i];
      rectMode(CENTER);
      stroke(0);
      fill(f.color);
      rect(f.x,f.y,10,10);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
       this.food.push(createVector(random(width),random(height)));
	   var i = this.food.length-1;
       var f = this.food[i];
       myColor = color(colorR[i%4], colorG[i%4], colorB[i%4]);
	   f.color = myColor;
    }
  }

  // Return the list of food
  this.getFood = function() {
    return this.food;
  }
}
