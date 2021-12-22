// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing
// Evolution EcoSystem

// A collection of food in the world

function Food(num) {
  // Start with some food
  this.food = [];
  for (var i = 0; i < num; i++) {
    this.food.push(createVector(random(width),random(height)));
  }
  for (var i = 1; i < 6; i++) {
    for (var j = 1; j < 6; j++) {
      this.food.push(createVector(width/6*i,height/6*j));
    }
  }
  // Add some food at a location
  this.add = function(l) {
     this.food.push(l.copy());
  }

  // Display the food
  this.run = function() {
    for (var i = 0; i < this.food.length; i++) {
      var f = this.food[i];
      rectMode(CENTER);
      stroke(0);
//      fill(127);
      flg = 0;

      for (var j = 1; j < 6; j++) {
        for (var k = 1; k < 6; k++) {
          if (f.x == width/6*j) {
            if (f.y == height/6*k) {
              flg = 1;
            }
          }
        }
      }

      if (flg == 1) {

          fill(255,0,255);
      }else{
          fill(0,255,0);
      }
      rect(f.x,f.y,8,8);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
       this.food.push(createVector(random(width),random(height)));
    }
  }

  // Return the list of food
  this.getFood = function() {
    return this.food;
  }
}
