// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


var tree = [];
var leaves = [];

function setup() {
//  createCanvas(640, 360);
  createCanvas(800, 600);
  var b = new Branch(createVector(width / 2, height), createVector(0, -1), 100);
  tree.push(b);
}

function draw() {
  background(255);
  for (var i = 0; i < tree.length; i++) {
    // Get the branch, update and draw it
    tree[i].update();
    tree[i].render();
    
    if (tree[i].timeToBranch()) {
      if (tree.length < 8192) {
        tree.push(tree[i].branch(40)); // Add one going right
        tree.push(tree[i].branch(-40)); // Add one going left
      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
  }
  //println(leaves.length);

  for (var i = 0; i < leaves.length; i++) {
    leaves[i].display();
    leaves[i].update();
  }

}
