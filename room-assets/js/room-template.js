let angleX = 0;
let angleY = 0;
let sensitivity = 0.009;

let terminals = []; // override in each room
let inspectingTerminal = null;
let overlay;
let font;

function preload() {
  font = loadFont("../data/PressStart2P-Regular.ttf");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.elt.setAttribute('tabindex', '0');
  cnv.elt.focus();

  textFont(font);
  textSize(10);
  noCursor();

  overlay = createDiv('').hide();
  overlay.class('terminal-overlay');
}

function draw() {
  background(10);
  lights();

  angleX += movedX * sensitivity;
  angleY += movedY * sensitivity;
  angleY = constrain(angleY, -PI / 2, PI / 2);
  rotateX(-angleY);
  rotateY(angleX);

  let viewVec = createVector(
    cos(angleY) * sin(angleX),
    sin(angleY),
    -cos(angleY) * cos(angleX)
  ).normalize();

  let targeting = false;

  for (let t of terminals) {
    let terminalVec = createVector(t.x, t.y, t.z).normalize();
    let dot = viewVec.dot(terminalVec);
    let isTargeted = dot > 0.98;

    if (isTargeted) targeting = true;

    // Draw terminal screen
    push();
    translate(t.x, t.y, t.z);
    fill(isTargeted ? 255 : color(255, 0, 0));
    stroke(0);
    plane(220, 120);
    pop();

    // Draw label above terminal, facing the camera
    push();
    let labelPos = createVector(t.x, t.y - 80, t.z);
    translate(labelPos.x, labelPos.y, labelPos.z);
    let toCam = createVector(0, 0, 0).sub(labelPos);
    let rotY = atan2(toCam.x, toCam.z);
    let rotX = asin(toCam.y / toCam.mag());
    rotateY(rotY);
    rotateX(-rotX);

    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(t.label + "\n> press E", 0, 0);
    pop();
  }

  // Update crosshair color
  const crosshair = document.getElementById("crosshair");
  if (crosshair) crosshair.style.color = targeting ? "#ffffff" : "#ff0000";
}

function isLookingAtTerminal(t) {
  let toTerminal = createVector(t.x, t.y, t.z).normalize();
  let viewVec = createVector(
    cos(angleY) * sin(angleX),
    sin(angleY),
    -cos(angleY) * cos(angleX)
  ).normalize();
  return viewVec.dot(toTerminal) > 0.98;
}

function keyPressed(event) {
  if (keyCode === ESCAPE) {
    event.preventDefault();
    inspectingTerminal = null;
    overlay.hide();
    const systemStatus = document.getElementById("systemStatus");
    if (systemStatus) systemStatus.innerText = "> SYSTEM READY";
    const roomOverlay = document.getElementById("roomOverlay");
    if (roomOverlay) roomOverlay.style.display = "none";
  }

  if (key === 'e') {
    
    for (let t of terminals) {
      if (isLookingAtTerminal(t)) {
        inspectingTerminal = t;
        overlay.html(`
          <div class="overlay-close" onclick="closeTerminal()">×</div>
          <iframe src="${t.page}" frameborder="0"></iframe>
        `);
        overlay.show();
        const systemStatus = document.getElementById("systemStatus");
        if (systemStatus) systemStatus.innerText = "> ACCESSING TERMINAL...";
        const roomOverlay = document.getElementById("roomOverlay");
        if (roomOverlay) {
          roomOverlay.style.display = "block";
          setTimeout(() => {
            roomOverlay.style.display = "none";
          }, 2000);
        }
        break;
      }
    }
  }

  if (key === 'q' || key === 'Q') {
    window.location.href = "../index.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let cnv = document.querySelector('canvas');
  if (cnv) cnv.focus();
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    e.preventDefault();
    if (inspectingTerminal) {
      inspectingTerminal = null;
      overlay.hide();
      const roomOverlay = document.getElementById("roomOverlay");
      if (roomOverlay) roomOverlay.style.display = "none";
    }
  }
});

function closeTerminal() {
  inspectingTerminal = null;
  overlay.hide();

  const systemStatus = document.getElementById("systemStatus");
  if (systemStatus) systemStatus.innerText = "> SYSTEM READY";

  const roomOverlay = document.getElementById("roomOverlay");
  if (roomOverlay) roomOverlay.style.display = "none";
}
