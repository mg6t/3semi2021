let sound;
let fft;

//サウンドファイルをプリロード
function preload() {
  sound = loadSound('./sound.mp3');
}

function create_button() {
  play_button = createButton('play');
  play_button.position(10, 10);
  play_button.mousePressed(function() { sound.loop(); });
  stop_button = createButton('stop');
  stop_button.position(60, 10);
  stop_button.mousePressed(function() { sound.stop(); });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  create_button();

  colorMode(HSB, 360, 256, 256, 256);
  fft = new p5.FFT(0.0,4096);
  fft.setInput(sound);
}

function draw() {
  blendMode(BLEND);
  background(0);
  blendMode(ADD);
  noStroke();

  let spectrum = fft.analyze();
  for (i = 0; i < spectrum.length; i++) {
    let x1 = map(log(i), 0, log(spectrum.length), width/2, width);
    let x2 = map(log(i), 0, log(spectrum.length), width/2, 0);
    let hue = map(log(i+1), 0, log(spectrum.length), 0, 360);
    let diameter = map(pow(spectrum[i], 2), 0, pow(255, 2), 0, height);
    fill(hue, 255, 255, 31);
    ellipse(x1, height/2, diameter, diameter);
    ellipse(x2, height/2, diameter, diameter);
  }
}