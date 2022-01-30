let sound;
let fft;

//サウンドファイルをプリロード
function preload() {
//  sound = loadSound('./sound.mp3');
  sound = loadSound('./beat.wav');
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

  colorMode(HSB, 255);
  fft = new p5.FFT();
  fft.setInput(sound);
}

function draw() {
  blendMode(BLEND);
  background(0);
  blendMode(ADD);
  noStroke();

  let spectrum = fft.analyze();
  for (i = 0; i < spectrum.length; i++) {
    let hue = map(i, 0, spectrum.length - 1, 0, 255);
    let diameter = map(spectrum[i], 0, 255, 0, height);
    fill(hue, 255, 15);
    let x = map(i, 0, spectrum.length - 1, width / 2, width);
    ellipse(x, height / 2, diameter, diameter);
    x = map(i, 0, spectrum.length - 1, width / 2, 0);
    ellipse(x, height / 2, diameter, diameter);
  }
}