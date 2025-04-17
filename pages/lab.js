let mic, fft;
let font;
let started = false;
let showSpectrum = false;

function preload() {
  font = loadFont("../data/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(10);
  noFill();

  mic = new p5.AudioIn();
  fft = new p5.FFT();
}

function draw() {
  if (!started) {
    background(0);
    fill(255, 0, 0);
    push();
    textAlign(CENTER);
    text("CLICK TO START LAB", width/2, height / 2);
    resetMatrix();
    pop();
    return;
  }

  background(0, 30);

  fft.setInput(mic);

  if (!showSpectrum) {
    drawWaveform();
  } else {
    drawSpectrum();
  }

  drawHUD();
  drawScanlines();
  drawVignette();
}

function drawWaveform() {
  let waveform = fft.waveform();
  stroke(255, 0, 0);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height / 3, 2 * height / 3);
    vertex(x, y + random(-0.5, 0.5)); // glitchy wobble
  }
  endShape();
}

function drawSpectrum() {
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height * 0.4 * (spectrum[i] / 255);
    fill(255, 0, 0, 150);
    rect(x, height - 50, width / spectrum.length, h);
  }
}

function drawHUD() {
  fill(255, 0, 0);
  noStroke();
  text("MODE: LAB", 25, 80);
  text("INPUT: MIC", 25, 100);
  text("TOGGLE: [S] WAVEFORM/SPECTRUM", 25, 120);
}

function drawScanlines() {
  stroke(0, 50);
  for (let y = 0; y < height; y += 4) {
    line(0, y, width, y);
  }
}

function drawVignette() {
  noFill();
  for (let i = 0; i < 100; i++) {
    stroke(0, 0, 0, map(i, 0, 100, 0, 180));
    rect(-i, -i, width + i * 2, height + i * 2);
  }
}

function mousePressed() {
  if (!started) {
    userStartAudio().then(() => {
      mic.start(() => {
        mic.amp(3);
        fft.setInput(mic);
        started = true;
        console.log("Mic started");
      });
    });
  }
}

function keyPressed() {
  if (key === 'S' || key === 's') {
    showSpectrum = !showSpectrum;
  }
}
