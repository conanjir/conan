let song, ah;
let string = '';
let analyzer, mic;
let hands;
let showFullImage = false;

function preload() {
  song = loadSound("data/ayo.wav");
  ah = loadSound("data/ah.wav");
  hands = loadImage("data/handsup.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  mic = new p5.AudioIn();
  mic.start();
  analyzer = new p5.Amplitude();
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  noStroke();
  noCursor();
}

function draw() {
  background(255); // white background

  // Display text on top
  fill(0);
  textSize(18);
  text("are you with it? click the hands to find out!", width / 2, 50);

  // Show image (either cropped or full)
  let imgWidth = min(width * 0.8, hands.width);
  let imgHeight = imgWidth * (hands.height / hands.width);
  let imgX = width / 2 - imgWidth / 2;
  let imgY = height / 2 - imgHeight / 2 + 50;

  if (showFullImage) {
    image(hands, imgX, imgY, imgWidth, imgHeight);
  } else {
    let cropHeight = hands.height * 0.3;
    let displayHeight = imgHeight * 0.3;
    image(hands, imgX, imgY, imgWidth, displayHeight, 0, 0, hands.width, cropHeight);
  }

  // Animate text from mic input
  let volume = mic.getLevel();
  let mappedVol = map(volume, 0, 1.0, 40, 200);
  textSize(mappedVol);
  fill(255, 0, 0);
  text(string, width / 2, height - 100);
  circle(mouseX, mouseY, mappedVol * 2);

  console.log(volume);
  fill(0);
  textSize(18);
  text("a?", width / 2, 400);
}

function mousePressed() {
  // Check if click is within image bounds
  let imgWidth = min(width * 0.8, hands.width);
  let imgHeight = imgWidth * (hands.height / hands.width);
  let imgX = width / 2 - imgWidth / 2;
  let imgY = height / 2 - imgHeight / 2 + 50;

  let clickY = mouseY - imgY;
  let clickX = mouseX - imgX;

  let inXBounds = mouseX > imgX && mouseX < imgX + imgWidth;
  let inYBounds = showFullImage
    ? mouseY > imgY && mouseY < imgY + imgHeight
    : mouseY > imgY && mouseY < imgY + imgHeight * 0.3;

  if (inXBounds && inYBounds) {
    showFullImage = true;
    getAudioContext().resume();
    if (!song.isPlaying()) {
      song.play();
      song.noLoop();
    }
  }
}

function keyPressed() {
  string += key;
  if (key === 'a') {
    background("pink");
    ah.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
