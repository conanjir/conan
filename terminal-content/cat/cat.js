function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  noStroke();
  frameRate(1);
}

function draw() {
  background("white");

  let maxTries = 100;
  let circleCount = 10;
  let placed = 0;
  let spacing = map(mouseX, 0, width, 20, 100);

  randomSeed(mouseY);

  while (placed < circleCount && maxTries > 0) {
    let x = random(width);
    let y = random(height);
    let ok = true;

    for (let i = 0; i < placed; i++) {
      let otherX = circleX[i];
      let otherY = circleY[i];
      let d = dist(x, y, otherX, otherY);
      if (d < spacing) {
        ok = false;
        break;
      }
    }

    if (ok) {
      fill(255, 0, 0);
      circle(x, y, spacing);
      circleX[placed] = x;
      circleY[placed] = y;
      placed++;
    }

    maxTries--;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let circleX = [];
let circleY = [];
