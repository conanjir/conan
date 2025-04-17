//mostly chatgpt & the official p5js documentation
//but i did watch a couple videos on p5js specifically shaders and went down a rabbit hole 
//barney codes youtube channel is extremely resourceful
let offscreenBuffer;
let fisheye = 6;
let tileSize;
const cols = 16;
const rows = 16;
let player = { x: 8, y: 8, tx: 8, ty: 8, animSpeed: 0.15 };
let grid = [];
let font, skyTex, floorTex, colourTex;
let terminalDiv;
const rm = 5;
const portals = {
  "3,3": { label: "LIBRARY", url: "pages/library.html" },
  "10,5": { label: "LAB", url: "pages/lab.html" },
  "6,12": { label: "MIRROR ROOM", url: "pages/mirror.html" }
};

function preload() {
  font = loadFont("./data/PressStart2P-Regular.ttf");
  skyTex = loadImage("./data/sb.png"); 
  floorTex = loadImage("./data/mb_bw.png"); 
  colourTex = loadImage("./data/mbp5.png");
}

function setup() {
  terminalDiv = document.getElementById("terminalText");
  pixelDensity(1);
  noSmooth();
  createCanvas(windowWidth, windowHeight, WEBGL);
  calculateTileSize();
  setupGrid();
  updateTerminalText();

  offscreenBuffer = createGraphics(width, height, WEBGL);
  offscreenBuffer.rectMode(CENTER);
  offscreenBuffer.noSmooth();

  noStroke();
  noCursor();
  rectMode(CENTER);
}

function draw() {
  offscreenBuffer.background(0);
  drawToBuffer();
  background(0);
  drawBufferWithFisheye();
  updateTerminalText();
  image(offscreenBuffer);
}

function drawToBuffer() {
  drawSkybox(offscreenBuffer);
  drawVoid(offscreenBuffer);
  drawFloor(offscreenBuffer);
  drawGrid(offscreenBuffer);
}

function drawSkybox(gfx) {
  gfx.push();
  gfx.resetMatrix();
  gfx.noStroke();
  gfx.texture(skyTex);
  tiltWithMouse(gfx);
  gfx.rotateX(PI / 2);
  gfx.sphere(3000, 64, 64);
  gfx.pop();
}

function drawVoid(gfx) {
  gfx.push();
  tiltWithMouse(gfx);
  const camX = player.x * tileSize + tileSize / 2;
  const camY = player.y * tileSize + tileSize / 2;

  gfx.translate(-camX, -camY);
  gfx.noStroke();
  gfx.fill(0);
  gfx.translate(0, 0, -501);
  gfx.box(cols * tileSize * 4, rows * tileSize * 4, 10);
  gfx.pop();
}

function drawFloor(gfx) {
  gfx.push();
  tiltWithMouse(gfx);
  gfx.translate(0, 0, -150);

  const camX = player.x * tileSize + tileSize / 2;
  const camY = player.y * tileSize + tileSize / 2;

  gfx.translate(-camX+340, -camY+330);
  gfx.noStroke();
  gfx.texture(floorTex);
  gfx.box(cols * tileSize * rm, rows * tileSize * rm, 300);
  gfx.pop();
}

function drawGrid(gfx) {
  gfx.push();
  tiltWithMouse(gfx);
  // Calculate center offset so player stays centered
  const camX = player.x * tileSize + tileSize / 2;
  const camY = player.y * tileSize + tileSize / 2;

  gfx.translate(-camX, -camY+50);     

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const tile = grid[y][x];
      const isAccess = tile === 1;
      const isHere = (round(player.x) === x && round(player.y) === y);

      gfx.push();
      const baseX = x * tileSize + tileSize / 2;
      const baseY = y * tileSize + tileSize / 2;
      const zOffset = (isAccess && isHere) ? sin(frameCount * 0.3) * 10 : 0;
      gfx.translate(baseX, baseY, zOffset);

      if (isAccess) {
        if (isHere) {
          gfx.noStroke();               // Red box — no outline
          gfx.fill(255, 0, 0);
        } else {
          gfx.stroke(255);              // Black box — white outline
          gfx.strokeWeight(2);
          gfx.fill(0);
        }
        gfx.box(tileSize, tileSize, 100);
      } else {
        gfx.stroke(255);
        gfx.noFill();
        gfx.strokeWeight(2);
        gfx.rect(0, 0, tileSize, tileSize);
      }
      
      gfx.pop();
    }
  }

  player.x = lerp(player.x, player.tx, player.animSpeed);
  player.y = lerp(player.y, player.ty, player.animSpeed);

  gfx.push();
  gfx.translate(
    player.x * tileSize + tileSize / 2,
    player.y * tileSize + tileSize / 2,
    tileSize * 0.3 + sin(frameCount * 0.3) * 2
  );
  gfx.fill(255, 0, 0);
  gfx.noStroke();
  gfx.sphere(tileSize * 0.5, 8, 8);
  gfx.pop();
  gfx.pop();
}

function tiltWithMouse(gfx) {
  const rx = map(mouseY, 0, height, -PI / 16, PI / 16);
  const ry = map(mouseX, 0, width, -PI / 16, PI / 16);
  gfx.rotateX(-rx * rm);
  gfx.rotateY(ry * rm);
}

function drawBufferWithFisheye() {
  push();
  noStroke();
  texture(offscreenBuffer);
  const density = 12;
  const hw = width / 2;
  const hh = height / 2;

  beginShape(TRIANGLES);
  for (let y = 0; y < density; y++) {
    for (let x = 0; x < density; x++) {
      const u1 = x / density, v1 = y / density;
      const u2 = (x + 1) / density, v2 = (y + 1) / density;
      const nx1 = u1 * 2 - 1, ny1 = v1 * 2 - 1;
      const nx2 = u2 * 2 - 1, ny2 = v2 * 2 - 1;

      const p1 = applyFisheye(nx1, ny1);
      const p2 = applyFisheye(nx2, ny1);
      const p3 = applyFisheye(nx2, ny2);
      const p4 = applyFisheye(nx1, ny2);

      vertex(p1.x * hw, p1.y * hh, 0, u1, v1);
      vertex(p2.x * hw, p2.y * hh, 0, u2, v1);
      vertex(p3.x * hw, p3.y * hh, 0, u2, v2);

      vertex(p1.x * hw, p1.y * hh, 0, u1, v1);
      vertex(p3.x * hw, p3.y * hh, 0, u2, v2);
      vertex(p4.x * hw, p4.y * hh, 0, u1, v2);
    }
  }
  endShape();
  pop();
}


function applyFisheye(nx, ny) {
  const r = sqrt(nx * nx + ny * ny);
  const theta = atan2(ny, nx);
  const rDistorted = r * (1 + fisheye * r * r);
  return { x: rDistorted * cos(theta), y: rDistorted * sin(theta) };
}

function updateTerminalText() {
  const key = `${player.tx},${player.ty}`;
  
  if (portals[key]) {
    terminalDiv.textContent = 
      `> PRESS ENTER TO ACCESS: ${portals[key].label}\n` +
      `> ARROW KEYS: MOVE\n` +
      `> ENTER: ENTER TERMINAL ROOM\n` +
      `> MOUSE CLICK: START + FULLSCREEN\n` +
      `> SYSTEM: READY`;
  } else {
    terminalDiv.textContent = 
      `> SYS: IDLE\n` +
      `> ARROW KEYS: MOVE\n` +
      `> ENTER: ACCESS ROOM IF STANDING ON PORTAL\n` +
      `> MOUSE CLICK: START + FULLSCREEN\n` +
      `> SYSTEM: READY`;
  }
}


function calculateTileSize() {
  tileSize = min(floor(windowWidth / cols / 1.5), floor(windowHeight / rows / 1.5));
}

function setupGrid() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  Object.keys(portals).forEach(key => {
    const [x, y] = key.split(",").map(Number);
    grid[y][x] = 1;
  });
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && player.tx > 0) player.tx--;
  if (keyCode === RIGHT_ARROW && player.tx < cols - 1) player.tx++;
  if (keyCode === UP_ARROW && player.ty > 0) player.ty--;
  if (keyCode === DOWN_ARROW && player.ty < rows - 1) player.ty++;
  updateTerminalText();
  if (keyCode === ENTER) {
    const key = `${player.tx},${player.ty}`;
    if (portals[key]) window.location.href = portals[key].url;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  offscreenBuffer.resizeCanvas(width, height);
}

function mousePressed() {
  let cnv = document.querySelector('canvas');
  if (cnv) cnv.focus();

  // Hide overlay
  const overlay = document.getElementById("start-overlay");
  if (overlay) overlay.style.display = "none";

  // Enter fullscreen
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn("Fullscreen failed:", err);
    });
  }
}
