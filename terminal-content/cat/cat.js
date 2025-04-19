let bottomImg, topImg;

function preload()  {
  bottomImg = loadImage('./data/catbw.jpeg');
  topImg = loadImage('./data/cat.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 200, 0);
  image(bottomImg, 0, 0);
  noStroke();
  frameRate(1);
}


function draw() {

}

function mouseDragged() {


  copy(topImg, mouseX, mouseY, 80, 80, mouseX, mouseY, 160, 160);

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
