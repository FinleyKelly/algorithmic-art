new p5(flowerGravity, "flowerGravity");

function flowerGravity(p) {
  let sketchTime = new SketchTime(p);
  let points = [];
  let dt;
  let numPoints = 1000;
  let speed = 0.5;
  const size = 400;

  function init() {
    points = [];
    p.background(220, 220, 220);
  }

  p.setup = function setup() {
    p.createCanvas(size, size);
    sketchTime.setupPauseAndResetButtons(init);
    init();
  };

  function getVelocity(a) {
    return p.createVector(p.sin(a.x / size * 3.0 * p.TAU) * speed * size, p.sin(a.y / size * 3.0 * p.TAU) * speed * size);
  }

  function movePoint(a) {
    let velocity = getVelocity(a);
    return p.createVector(a.x + velocity.x * dt, a.y + velocity.y * dt);
  }

  p.draw = function draw() {
    dt = sketchTime.update();
    p.background(220, 220, 220, dt * 255);
    while (points.length < numPoints) {
      points.push(p.createVector(p.random(size), p.random(size)));
    }
    for (let point of points) {
      let endPoint = movePoint(point);
      p.line(point.x, point.y, endPoint.x, endPoint.y);
      // p.noStroke();
      // p.fill(100);
      // p.circle(point.x, point.y, 2);
    }
    points = points.filter((a) => getVelocity(a).mag() > 0.1).map(movePoint);
  };
}
