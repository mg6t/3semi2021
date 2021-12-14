var Triangles = [];

function setup() {
  createCanvas(600, 500);
  noStroke();
}

function draw() {
  background(color("#44617B"));
  //ツリー
  fill(color("#734e30"));
  rect(width/2-50, 300, 100, 100);
  fill(color("#008000"));
  triangle(width/4, 150, width/2, 20, width-width/4, 150);
  triangle(width/5, 230, width/2, 100, width-width/5, 230);
  triangle(width/6, 310, width/2, 180, width-width/6, 310);

  fill(255);
  ellipse(200, 100, 30, 30);
  ellipse(300, 120, 30, 30);
  ellipse(400, 140, 30, 30);
  ellipse(350, 180, 30, 30);
  ellipse(250, 200, 30, 30);
  ellipse(150, 220, 30, 30);
  ellipse(200, 260, 30, 30);
  ellipse(300, 280, 30, 30);
  ellipse(400, 300, 30, 30);

  var r = random(2,6)


  if (mouseIsPressed) {
    Triangles.push(new drawTriangle(width/2, 10, 60, r,"#ffff00"));
    Triangles.push(new drawTriangle(width/3.5, 130, 60, r,"#ff0000"));
    Triangles.push(new drawTriangle(width/4, 200, 60, r,"#00bfff"));
    Triangles.push(new drawTriangle(width/5, 300, 60, r,"#ffffff"));
    Triangles.push(new drawTriangle(width/1.4, 130, 60, r,"#ffa500"));
    Triangles.push(new drawTriangle(width/1.35, 200, 60, r,"#ff0000"));
    Triangles.push(new drawTriangle(width/1.25, 300, 60, r,"#ff69b4"));
  }

}

function drawTriangle(x, y, length, level,in_color) {
  fill(color(in_color));
  triangle(x, y, x+length*sin(PI/6), y+length*cos(PI/6), x-length*sin(PI/6), y+length*cos(PI/6));
  if (level > 0) {
    fill(color("#008000"));
    triangle(x, y, x+length*sin(PI/6), y+length*cos(PI/6), x-length*sin(PI/6), y+length*cos(PI/6));
    length /= 2;
    drawTriangle(x, y, length, level-1,in_color);
    drawTriangle(x+length*sin(PI/6), y+length*cos(PI/6), length, level-1,in_color);
    drawTriangle(x-length*sin(PI/6), y+length*cos(PI/6), length, level-1,in_color);
  }

}
