let cam;
let font;
let modes = ["MIRROR", "REM_STATE", "SENTIENT_EYE", "NOISE_OF_SELF", "ECHO_CHAMBER"];
let currentMode = 0;
let faceapi;
let detections = [];
let uiLayer;

function preload() {
    font = loadFont("../data/PressStart2P-Regular.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cam = createCapture(VIDEO);
    cam.size(width, height);
    cam.hide();
  
    uiLayer = createGraphics(width, height);
    uiLayer.pixelDensity(1); // match main canvas
    uiLayer.fill(255, 0, 0);
    uiLayer.textFont(font);
    uiLayer.textSize(10);

    const faceOptions = { withLandmarks: true, withDescriptors: false };
    faceapi = ml5.faceApi(cam, faceOptions, modelReady);
  }
  

function modelReady() {
    console.log('FaceAPI model loaded');
    faceapi.detect(gotResults);
}

  

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    detections = result;
    faceapi.detect(gotResults);
}

function draw() {
    cam.loadPixels();
    background(0);

    uiLayer.clear();
    switch (modes[currentMode]) {
      case "MIRROR": drawMirror(); break;
      case "REM_STATE": drawREMState(); break;
      case "SENTIENT_EYE": drawSentientEye(); break;
      case "NOISE_OF_SELF": drawNoiseOfSelf(); break;
      case "ECHO_CHAMBER": drawEchoChamber(); break;
    }
    drawUI(); 
    image(uiLayer, 0, 0);
}

function drawUI() {
    uiLayer.fill(255, 0, 0); /// red
    uiLayer.text("MODE: " + modes[currentMode], 25, 80);
  }

function drawMirror() {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(cam, 0, 0, width, height);
    pop();
}

function drawREMState() {
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, width, height);

    if (detections.length > 0) {
      let { _x, _y, _width, _height } = detections[0].alignedRect._box;
  
      let sx = constrain(_x, 0, cam.width);
      let sy = constrain(_y, 0, cam.height);
      let sw = constrain(_width, 0, cam.width - sx);
      let sh = constrain(_height, 0, cam.height - sy);
  
      let faceImg = cam.get(sx, sy, sw, sh);
      let faceCenterX = sx + sw / 2;
      let faceCenterY = sy + sh / 2;
      let scaleFactor = calculateScaleFactor(faceCenterX, width);
  
      push();
      translate(faceCenterX, faceCenterY);
      rotate(sin(faceCenterX/100));
      scale(scaleFactor);
      imageMode(CENTER);
      image(faceImg, 0, 0);
      pop();
  
      if (frameCount % 120 < 10) {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
      }
    }
  }
  

function calculateScaleFactor(x, screenWidth) {
    const center = screenWidth / 2;
    const normalizedDistance = (x - center) / center; // Ranges from -1 to 1
    const distanceSquared = normalizedDistance * normalizedDistance; // Ranges from 0 to 1
    const minScale = 1; // Scale at the center
    const maxScale = 2; // Scale at the edges
    return minScale + (maxScale - minScale) * distanceSquared;
}

function drawSentientEye() {
    background(0);
    if (detections.length > 0) {
        let { _x, _y, _width, _height } = detections[0].alignedRect._box;
        let faceCenterX = _x + _width / 2;
        let faceCenterY = _y + _height / 2;
    
        push();
        translate(width / 2, height / 2);
        let scaleFactor = 7 + 0.5 * sin(frameCount * 0.5);
        scale(scaleFactor);
        translate(-faceCenterX, -faceCenterY*0.9);
        image(cam, 0, 0, width, height);
        pop();
    
        // Simulate blinking
        if (frameCount % 120 < 10) {
            fill(0, 0, 0, 150);
            rect(0, 0, width, height);
        }
    }
}

function drawNoiseOfSelf() {
    background(0);
  
    if (detections.length > 0) {
        // Extract face bounding box
        let { _x, _y, _width, _height } = detections[0].alignedRect._box;
  
        // Ensure the face region is within the video bounds
        let sx = constrain(_x, 0, cam.width);
        let sy = constrain(_y, 0, cam.height);
        let sw = constrain(_width, 0, cam.width - sx);
        let sh = constrain(_height, 0, cam.height - sy);
  
         // Get the cropped face image
        let faceImg = cam.get(sx, sy, sw, sh);
  
        // Define the number of rows and columns for tiling
        let cols = 4;
        let rows = 3;
        let tileWidth = width / cols;
        let tileHeight = height / rows;
  
        // Loop through each tile position
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                push();
                translate(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2);
  
                // Apply mirroring based on tile position
                let scaleX = (i % 2 === 0) ? 1 : -1;
                let scaleY = (j % 2 === 0) ? 1 : -1;
                scale(scaleX, scaleY);
  
                // Draw the face image centered in the tile
                imageMode(CENTER);
                image(faceImg, 0, 0, tileWidth, tileHeight);
                pop();
            }
        }
        
    }
}

function drawEchoChamber() {
    background(0);
    if (detections.length > 0) {
      let { _x, _y, _width, _height } = detections[0].alignedRect._box;
      let faceCenterX = _x + _width / 2;
      let faceCenterY = _y + _height / 2;
  
      let cols = 3;
      let rows = 3;
      let w = width / cols;
      let h = height / rows;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          push();
          translate(i * w + w / 2, j * h + h / 2);
          if ((i + j) % 2 === 0) {
            scale(-1, 1);
          }
          image(cam, -w / 2 + (faceCenterX - width / 2) / cols, -h / 2 + (faceCenterY - height / 2) / rows, w, h);
          pop();
        }
      }
    }
  }
  

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        currentMode = (currentMode + 1) % modes.length;
    } 
    else if (keyCode === LEFT_ARROW) {
      currentMode = (currentMode - 1 + modes.length) % modes.length;
    }
}

