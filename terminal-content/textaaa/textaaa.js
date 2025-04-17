let font;
let points = [];
let originalPoints = [];

function preload() {
  font = loadFont('./data/FragmentMono-Italic.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 160);

  // Generate points from text
  points = font.textToPoints("aaaaaaaaaaa!!", 100, height / 2, 144, {
    sampleFactor: 1,
  });

  // Deep copy for original positions
  originalPoints = points.map(p => ({ x: p.x, y: p.y }));
}

function draw() {
  background(0, 0, 240);
  let size = map(mouseX, 0, width, 4, 30);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let original = originalPoints[i];

    let d = dist(mouseX, mouseY, p.x, p.y);
    let threshold = mouseY//+mouseX-2;

    if (d < threshold) {
      let angle = atan2(p.y - mouseY, p.x - mouseX);
      let force = map(d, 0, threshold-mouseX, 20, 0);
      p.x += cos(angle) * force;
      p.y += sin(angle) * force;
    } else {
      // Smoothly return to original point
      p.x = lerp(p.x, original.x, 0.08);
      p.y = lerp(p.y, original.y, 0.08);
    }

    noStroke();
    fill(160);
    circle(p.x, p.y, size);

  }
}
