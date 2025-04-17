function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  noStroke();
  frameRate(1);
}

function draw() {
  background("white"); // clear every frame

  let maxTries = 100;
  let circleCount = 10;
  let placed = 0;
  let spacing = map(mouseX, 0, width, 20, 100); // size based on mouseX

  randomSeed(mouseY); // randomness changes with mouseY

  while (placed < circleCount && maxTries > 0) {
    let x = random(width);
    let y = random(height);
    let ok = true;

    // check distance to existing ones (just saved in a simple array)
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
      fill(255, 0, 0); // red
      circle(x, y, spacing);
      circleX[placed] = x;
      circleY[placed] = y;
      placed++;
    }

    maxTries--;
  }
}

let circleX = [];
let circleY = [];
