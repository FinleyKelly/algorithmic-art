new p5(circleSpiral, "circleSpiral");

function circleSpiral(p) {
  let progress = 0.0;
  let density;
  let speed;
  let decayHalfLife;
  let arcType;
  let arcTypeSize = "Size";
  let arcTypeTime = "Time";
  let arcSize;
  let arcTime;
  let frameRate = 120.0;
  let stepTime = 1.0 / frameRate;
  let canvasSize = 400;

  p.setup = function setup() {
    p.createCanvas(canvasSize, canvasSize);
    p.frameRate(frameRate);
    p.createP("Circle density");
    density = p.createSlider(0.5, 10.0, 6.0, 0.0001);
    p.createP("Speed");
    speed = p.createSlider(0, 0.05, 0.02, 0.0001);
    // p.createP("Decay half life");
    // decayHalfLife = p.createSlider(0.0, 600.0, 60.0, 0.0001);
    p.createP("Arc type");
    arcType = p.createRadio("Time");
    arcType.option(arcTypeSize);
    arcType.option(arcTypeTime);
    arcType.selected("Size");
    p.createP("Arc size");
    arcSize = p.createSlider(0.0, p.TAU, p.TAU / 30.0, 0.0001);
    p.createP("Arc time");
    arcTime = p.createSlider(0.0, 0.1, 0.02, 0.0001);
  };

  function getAngle(i, time) {
    return i * p.TAU * time;
  }

  function getDistance(i) {
    return i * density.value();
  }

  p.draw = function draw() {
    progress += stepTime * speed.value();
    // p.background(220, 220, 220, 255.0 * stepTime * decayHalfLife.value() / 2.0);
    p.background(220, 220, 220);
    p.noFill();
    p.stroke(0, 0, 0);
    p.strokeWeight(1);
    let numberOfArcs = canvasSize / 2.0 * Math.sqrt(2) / density.value();
    for (i = 0; i < numberOfArcs; i++) {
      let angle = getAngle(i, progress);
      let lastAngle;
      if (arcType.value() == arcTypeTime) {
        lastAngle = getAngle(i, progress - arcTime.value());
      } else if (arcType.value() == arcTypeSize) {
        lastAngle = angle - arcSize.value();
      }
      let distance = getDistance(i);
      p.arc(canvasSize / 2.0, canvasSize / 2.0, distance * 2.0, distance * 2.0, angle, lastAngle);
    }
  };
}
