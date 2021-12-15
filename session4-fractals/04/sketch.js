var w,h;
var tree = [];
var leaves = [];

w = 400;
h = 400;
function setup(){
  createCanvas(400,400);
  var a= createVector(w/2, h);
  var b= createVector(w/2, h - 100);
  var root = new branch2(a, b);

  tree[0] = root;
}

limit = 7;
var count = 0;
function mousePressed(){
  if(count > limit) return;
  for (var i = tree.length - 1; i >= 0; i--) {
    if(!tree[i].finished){
      tree.push(tree[i].branchR());
      tree.push(tree[i].branchL());
    }
    tree[i].finished = tree;
  }
  count++;

  if(count >= 5){
    for (var i = 0; i < tree.length; i++) {
      if(!tree[i].finished){
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw(){
  background(210,225,225);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(random(0,255),random(0,255),random(0,255), 100);
    noStroke();
    ellipse(leaves[i].x,leaves[i].y,8,8);
    if(count == 8)leaves[i].y += random(3, 5);
  }
}

function branch2(begin, end){
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.jitter = function(){
    this.end.x += random(-1,1);
    this.end.y += random(-1,1);
  }
  this.show = function(){
    stroke(255);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }

  this.branchR = function(){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var right = new branch2(this.end, newEnd)
    return right;
  }

  this.branchL = function(){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var left = new branch2(this.end, newEnd)
    return left;
  }
}