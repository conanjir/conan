//mostly chatgpt & the official p5js documentation
//but i did watch a couple videos on p5js specifically shaders and went down a rabbit hole 
//barney codes youtube channel is extremely resourceful

import { initPortalOverlay } from './portalOverlay.js';
let offscreenBuffer;
let fisheye = 6;
let tileSize;
const cols = 16, rows = 16;
let player = { x:8, y:8, tx:8, ty:8, animSpeed:0.15 };
let grid = [];
let font, skyTex, floorTex, colourTex;
let terminalDiv;
const rm = 5;

import { workshopData } from './workshop/workshopData.js';

const playgroundData = [
  { id: 'all', title: 'All Sketches', children: [
      { title: 'Void & Grid', url: '#sketch-void' },
      /* … */
    ]
  }
];

const archiveData = [
  { id: 'w1-4', title: 'Weeks 1–4 Precedents', children: [
      { title: 'teamLab Borderless', url: '#teamlab' },
      /* … */
    ]
  }
];
const portalsConfig = {
  '3,3': { label: 'The Workshop',   content: workshopData },
  '10,5':{ label: 'The Playground', content: playgroundData },
  '6,12':{ label: 'The Archive',    content: archiveData }
};

// timing & state
let portalState     = "grid";   // "grid" | "zooming" | "overlay" | "zooming-back"
let zoomStartTime   = 0;
const ZOOM_DURATION = 50;

// for hit-testing cube
let currentPortalKey = null;

let tiltX = 0, tiltY = 0;

function preload() {
  font      = loadFont("data/PressStart2P-Regular.ttf");
  skyTex    = loadImage("data/sb.png");
  floorTex  = loadImage("data/mb_bw.png");
  colourTex = loadImage("data/mbp5.png");
}

function setup() {
  noCursor();
  terminalDiv = document.getElementById("terminalText");
  pixelDensity(1);
  noSmooth();
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvasContainer');          // works on p5.Element
  canvas.elt.setAttribute('tabindex','0');    // then tweak the raw element
  canvas.elt.focus();

  calculateTileSize();
  setupGrid();
  updateTerminalText();

  offscreenBuffer = createGraphics(width, height, WEBGL);
  offscreenBuffer.rectMode(CENTER);
  offscreenBuffer.noSmooth();

  noStroke();
  noCursor();
  rectMode(CENTER);

  document.getElementById('closeOverlay')
    .addEventListener('click', hideOverlay);

  const startO = document.getElementById('startOverlay');
  startO.addEventListener('click', () => {
    startO.style.opacity = '0';
    setTimeout(() => (startO.style.display = 'none'), 500);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') e.preventDefault();
  });
  
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
  drawVoid(offscreenBuffer);
  drawFloor(offscreenBuffer);
  drawGrid(offscreenBuffer);
}


function drawVoid(gfx) {
  withCamera(gfx, 0, () => {
    gfx.noStroke();
    gfx.fill(0);
    gfx.translate(0, 0, -501);
    gfx.box(cols * tileSize * 4, rows * tileSize * 4, 10);
  });
}

function drawFloor(gfx) {
  // 1) Use your camera helper exactly as drawGrid does
  withCamera(gfx, 50, () => {
    gfx.push();
      // 2) shift the floor’s center to the grid’s world‐space midpoint:
      const gridCenterX = (cols * tileSize) / 2;
      const gridCenterY = (rows * tileSize) / 2;
      gfx.translate(gridCenterX, gridCenterY, -100);
      
      // 3) draw the big textured box (300 tall → top at Z=0)
      gfx.noStroke();
      gfx.texture(floorTex);
      gfx.box(
        cols * tileSize * rm,
        rows * tileSize * rm,
        300
      );
    gfx.pop();
  });
}


function drawGrid(gfx) {
  withCamera(gfx, 50, () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile    = grid[y][x];
        const isAccess= tile === 1;
        const isHere  = (round(player.x) === x && round(player.y) === y);
        const baseX   = x * tileSize + tileSize/2;
        const baseY   = y * tileSize + tileSize/2;
        const zOffset = (isAccess && isHere) ? sin(frameCount * 0.3) * 10 : 0;

        gfx.push();
          gfx.translate(baseX, baseY, zOffset+50);
          if (isAccess) {
            if (isHere) {
              gfx.noStroke();
              gfx.fill(255, 0, 0);
            } else {
              gfx.stroke(255);
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

    // smooth the player’s LERP here once per frame
    player.x = lerp(player.x, player.tx, player.animSpeed);
    player.y = lerp(player.y, player.ty, player.animSpeed);
  });

  // draw the red sphere on top
  withCamera(gfx, 50, () => {
    gfx.push();
      const sx = player.x * tileSize + tileSize/2;
      const sy = player.y * tileSize + tileSize/2;
      const sz = tileSize * 0.3 + sin(frameCount * 0.3) * 2;
      gfx.translate(sx, sy, sz+50);
      gfx.noStroke();
      gfx.fill(255, 0, 0);
      gfx.sphere(tileSize * 0.5, 8, 8);
    gfx.pop();
  });
}
function tiltWithMouse(gfx) {
  // map mouse to tilt targets
  const rawX = map(mouseY, 0, height, -PI/16, PI/16) * -rm;
  const rawY = map(mouseX, 0, width, -PI/16, PI/16) * rm;

  // smooth toward target value
  tiltX = lerp(tiltX, rawX, 0.03);
  tiltY = lerp(tiltY, rawY, 0.03);

  // clamp to prevent over-rotation
  const maxTilt = (PI / 16) * rm;
  tiltX = constrain(tiltX, -maxTilt, maxTilt);
  tiltY = constrain(tiltY, -maxTilt, maxTilt);

  // apply rotation
  gfx.rotateX(tiltX);
  gfx.rotateY(tiltY);
}


function withCamera(gfx, yOffset, drawFn) {
  gfx.push();
    tiltWithMouse(gfx);             
    const camX = player.x * tileSize + tileSize/2;
    const camY = player.y * tileSize + tileSize/2;
    gfx.translate(-camX, -camY + yOffset);   
    drawFn();
  gfx.pop();
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
  if (portalsConfig[key]) {
    terminalDiv.textContent =
      `> PRESS ENTER TO ACCESS: ${portalsConfig[key].label}\n` +
      `> ARROW KEYS: MOVE\n` +
      `> ENTER: ENTER PORTAL\n` +
      `> MOUSE CLICK: START + FULLSCREEN\n` +
      `> SYSTEM: READY`;
  } else {
    terminalDiv.textContent =
      `> SYS: IDLE\n` +
      `> ARROW KEYS: MOVE\n` +
      `> ENTER: ACCESS PORTAL IF STANDING\n` +
      `> MOUSE CLICK: START + FULLSCREEN\n` +
      `> SYSTEM: READY`;
  }
}


function calculateTileSize() {
  tileSize = min(
    floor(windowWidth / cols / 1.5),
    floor(windowHeight / rows / 1.5)
  );
}

function setupGrid() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  Object.keys(portalsConfig).forEach(key => {
    const [x, y] = key.split(',').map(Number);
    grid[y][x] = 1;
  });
}

/**
 * Slides in the full‐screen sidebar overlay.
 * @param {string} portalKey  e.g. "3,3" or "10,5"
 */


function showPanel(portalKey) {
  // reveal backdrop + panel
  document.getElementById('portalOverlay').classList.remove('hidden');

  // scroll to the right section
  const sectionId = portals[portalKey].id;
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto" });
}

function hideOverlay() {
  document.getElementById('portalOverlay').classList.add('hidden');
  document.getElementById('canvasContainer').classList.remove('zoomed');
  portalState = 'grid';

 
}


function keyPressed() {
  if (keyCode === ESCAPE && portalState === 'overlay') {
    hideOverlay();
    return;
  }

  if (portalState !== 'grid') return;
  if (keyCode === LEFT_ARROW  && player.tx > 0)      player.tx--;
  if (keyCode === RIGHT_ARROW && player.tx < cols-1) player.tx++;
  if (keyCode === UP_ARROW    && player.ty > 0)      player.ty--;
  if (keyCode === DOWN_ARROW  && player.ty < rows-1) player.ty++;
  updateTerminalText();

  if (keyCode === ENTER) {
    const keyStr = `${player.tx},${player.ty}`;
    if (portalsConfig[keyStr]) {
      currentPortalKey = keyStr;
      document.getElementById('canvasContainer').classList.add('zoomed');
      setTimeout(() => {
        initPortalOverlay(portalsConfig[currentPortalKey]);
      }, ZOOM_DURATION);
      portalState = 'overlay';
    }
  }
}

function mousePressed() {
  const cnv = document.querySelector('canvas');
  if (cnv) cnv.focus();

  const startOverlay = document.getElementById('startOverlay');
  if (startOverlay) {
    startOverlay.style.opacity = '0';
    setTimeout(() => (startOverlay.style.display = 'none'), 500);
  }

  // click center to close overlay
  if (
    portalState === 'overlay' &&
    abs(mouseX - width/2) < tileSize/2 &&
    abs(mouseY - height/2) < tileSize/2
  ) {
    hideOverlay();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateTileSize();
  offscreenBuffer.resizeCanvas(width, height);
}

// Expose p5.js lifecycle
window.preload       = preload;
window.setup         = setup;
window.draw          = draw;
window.keyPressed    = keyPressed;
window.mousePressed  = mousePressed;
window.windowResized = windowResized;
