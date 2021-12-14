// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var tree = [];
var leaves = [];

function setup() {
  createCanvas(640, 360);
  /*var b0 = new Branch(createVector(width / 4, height), createVector(0, -1), 100);
  var b1 = new Branch(createVector(width / 2, height), createVector(0, -1), 100);
  var b2 = new Branch(createVector(width * 3 / 4, height), createVector(0, -1), 100);
  tree.push(b0);
  tree.push(b1);
  tree.push(b2);*/
  for (var i = 1; i < 8; i++) {
    var b = new Branch(createVector(width * i / 8, height), createVector(0, -1), 100);
    tree.push(b);
  }
}

function draw() {
  background(255);
  for (var i = 0; i < tree.length; i++) {
    // Get the branch, update and draw it
    var c = i % 3;
    if(c == 0) {
      c1=255;c2=0;c3=0;
    }else if(c == 1){
      c1=0;c2=255;c3=0;
    }else if(c == 2){
      c1=0;c2=0;c3=255;
    }
    tree[i].update();
    tree[i].render(c1,c2,c3);
   
    if (tree[i].timeToBranch()) {
      if (tree.length < 1024) {
        tree.push(tree[i].branch(30 + random(-20, 20))); // Add one going right
        tree.push(tree[i].branch(-25 + random(-15, 15))); // Add one going left
//        tree.push(tree[i].branch(30)); // Add one going right
//        tree.push(tree[i].branch(-25)); // Add one going left
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