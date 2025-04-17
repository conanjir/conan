let tileSize;
let cols = 16;
let rows = 16;
let player = {
  x: 8,
  y: 8,
  tx: 8,
  ty: 8,
  animSpeed: 0.15
};
let grid = [];
let font;
let skyTex;
let floorTex;
let terminalDiv;
let rm = 5;
let portals = {
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
  const mCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  console.log("Sketch loaded");
  calculateTileSize();
  mCanvas.elt.style = 
    "width: 480px; height: 270x; image-rendering: pixelated";
  noStroke();

  
  setupGrid();
  player.x = player.tx;
  player.y = player.ty;

  updateTerminalText(); // initial display

  rectMode(CENTER);
  noCursor();
}

function draw() {
  background(0);
  //world
  drawSkybox();
  drawVoid();
  drawFloor();
  drawGrid();
  console.log("Player tile:", player.tx, player.ty, tileSize);
  noCursor();

}

function updateTerminalText() {
  let px = player.tx;
  let py = player.ty;
  let key = `${px},${py}`;

  if (portals[key]) {
    let label = portals[key].label;
    terminalDiv.textContent = `> PRESS ENTER TO ACCESS: ${label}`;
  } else {
    terminalDiv.textContent = "SYS: IDLE";
  }
}


function drawSkybox() {
  push();
  resetMatrix(); // No transforms from previous functions
  noStroke();
  texture(skyTex);

  // Tilt skybox using mouse, same as grid
  let rotateXAmount = map(mouseY, 0, height, -PI / 16, PI / 16);
  let rotateYAmount = map(mouseX, 0, width, -PI / 16, PI / 16);
  rotateX(-rotateXAmount*rm);
  rotateY(rotateYAmount*rm);
  rotateX(PI/2);

  // Draw a big sky sphere behind everything
  sphere(3000, 64, 64); // Large enough to surround world
  pop();
}

function calculateTileSize() {
  tileSize = min(floor(windowWidth / cols/1.5), floor(windowHeight / rows/1.5));
}

function drawVoid() {
  push();
  let rotateXAmount = map(mouseY, 0, height, -PI / 16, PI / 16);
  let rotateYAmount = map(mouseX, 0, width, -PI / 16, PI / 16);
  rotateX(-rotateXAmount*rm);
  rotateY(rotateYAmount*rm);
  noStroke();
  fill(0);
  translate(0, 0, -501);
  box(cols * tileSize * 4, rows * tileSize * 4, 10); // black void platform
  pop();
}
function setupGrid() {
  grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = 0;
    }
  }
  grid[3][3] = 1;
  grid[5][10] = 1;
  grid[12][6] = 1;
}

function drawFloor() {
  push();

  // Match grid tilt
  let rotateXAmount = map(mouseY, 0, height, -PI / 16, PI / 16);
  let rotateYAmount = map(mouseX, 0, width, -PI / 16, PI / 16);
  rotateX(-rotateXAmount*rm);
  rotateY(rotateYAmount*rm);

  // Move floor below grid
  translate(0, 0, -150);

  // Texture
  noStroke();
  noSmooth();
  texture(floorTex);

  // Draw floor plane to match grid size
  let w = cols * tileSize;
  let h = rows * tileSize;
  box(cols * tileSize*rm, rows * tileSize*rm, 300); // ← thick box instead of plane


  pop();
}

function drawGrid() {
  push();

  // Tilt based on mouse position
  let rotateXAmount = map(mouseY, 0, height, -PI / 16, PI / 16);
  let rotateYAmount = map(mouseX, 0, width, -PI / 16, PI / 16);
  rotateX(-rotateXAmount * rm);
  rotateY(rotateYAmount * rm);

  // Center the grid
  translate(-cols * tileSize / 2, -rows * tileSize / 2);
 
  // Draw grid tiles
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tile = grid[y][x];
      let isAccessTile = tile === 1;
      let isPlayerHere = (round(player.x) === x && round(player.y) === y); // ✅ fix float comparison

      push();

      // Center of the tile
      let baseX = x * tileSize + tileSize / 2;
      let baseY = y * tileSize + tileSize / 2;

      // Bounce access tile if player is standing on it
      let zOffset = (isAccessTile && isPlayerHere) ? sin(frameCount * 0.3) * 10 : 0;

      translate(baseX, baseY, zOffset);

      if (isAccessTile) {
        stroke("0")
        strokeWeight("2")
        if (isPlayerHere) {
          fill(color(255, 0, 0));
          noStroke();
        } else {
          fill(0);
        }
        box(tileSize, tileSize, 100);
      } else { 
        stroke("white");
        strokeWeight("2");
        noFill();
        rectMode(CENTER);
        rect(0, 0, tileSize, tileSize);
      }

      pop();
    }
  }

  // ✅ Animate player position
  player.x = lerp(player.x, player.tx, player.animSpeed);
  player.y = lerp(player.y, player.ty, player.animSpeed);

  // ✅ Draw the player sphere on top of grid
  push();
  translate(
    player.x * tileSize + tileSize / 2,
    player.y * tileSize + tileSize / 2,
    tileSize * 0.3 + sin(frameCount * 0.3) * 2 // subtle bounce
  );
  fill(255, 0, 0);
  noStroke();
  sphere(tileSize * 0.5, 8, 8);
  pop();

  pop(); // End tilt
}




function keyPressed() {
  if (keyCode === LEFT_ARROW && player.tx > 0) {
    player.tx--;
  }
  if (keyCode === RIGHT_ARROW && player.tx < cols - 1) {
    player.tx++;
  }
  if (keyCode === UP_ARROW && player.ty > 0) {
    player.ty--;
  }
  if (keyCode === DOWN_ARROW && player.ty < rows - 1) {
    player.ty++;
  }

  updateTerminalText();

  // ENTER to access
  if (keyCode === ENTER) {
    let key = `${player.tx},${player.ty}`;
    if (portals[key]) {
      window.location.href = portals[key].url;
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
