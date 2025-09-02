new p5(circlesInCircles, "circlesInCircles");

function circlesInCircles(p) {
  let size = 400;
  let radiusDecay = 0.25;
  let time = 0;
  let numCircles;
  let angleOffset;

  p.setup = function setup() {
    p.createCanvas(size, size);
    numCircles = p.createSlider(1, 6, 1, 1);
    p.angleMode(p.RADIANS);
    angleOffset = p.TAU / 4;
  };

  function drawRecursiveCircle(position, radius, angle, depth) {
    p.circle(position.x, position.y, radius * 2);
    if (depth > 0 && radius > 1) {
      for (let i = 0; i < numCircles.value(); i++) {
        let newAngle = angle + angleOffset + i * p.TAU * (1 / numCircles.value());
        let offset = p5.Vector.setMag(p5.Vector.fromAngle(newAngle), radius * (1 - radiusDecay));
        drawRecursiveCircle(p5.Vector.add(position, offset), radius * radiusDecay, newAngle, depth - 1);
      }
    }
  };

  p.draw = function draw() {
    time += p.deltaTime / 1000.0;
    angleOffset = p.TAU * 0.1 * time;
    circleAngle = 0.5 * p.TAU * 1 / numCircles.value();
    if (numCircles.value() == 1) {
      radiusDecay = 0.5;
    } else {
      radiusDecay = p.sin(circleAngle) / (1 + p.sin(circleAngle));
    }
    drawRecursiveCircle(p.createVector(size / 2, size / 2), size / 2, 0, p.floor(p.log(1500) / p.log(numCircles.value())));
  };
}
