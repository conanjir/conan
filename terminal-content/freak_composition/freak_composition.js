var freak;
var ayo;
var jev;
var ladder;


function preload() {
  freak=loadImage("data/freak.jpeg");
  ayo=loadImage("data/ayo.jpeg");
  jev=loadImage("data/jev.jpeg");
  ladder=loadImage("data/ladder.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rect(CENTER, CENTER);
  frameRate(8);
}


function draw() {
  for (let i=0; i<100; i++) {
  //rotate(10);
  background(0, 0, 0, 16);
  image(freak, random(width), random(height), mouseX/3, mouseX/3);
  rotate(mouseY/2);
  image(ayo, width/5, height/2, 1000, 200);
  image(jev, mouseX, mouseY, mouseY/3, 800);
  rotate(mouseX/3);
  image(ladder, width/5, height/6, mouseX/2, 500);

  }
}
