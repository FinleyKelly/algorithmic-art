new p5(flowerGravity, "flowerGravity");

function flowerGravity(p) {
  let points = [];
  let dt;
  let numPoints = 1000;
  let speed = 0.5;
  const size = 400;

  p.setup = function setup() {
    p.createCanvas(size, size);
    // for(i=0;i<100;i++){
    //   draw2(1.0/60.0);
    // }
  };

  function getVelocity(a) {
    return p.createVector(p.sin(a.x / size * 3.0 * p.TAU) * speed * size, p.sin(a.y / size * 3.0 * p.TAU) * speed * size);
  }

  function movePoint(a) {
    let velocity = getVelocity(a);
    return p.createVector(a.x + velocity.x * dt, a.y + velocity.y * dt);
  }

  p.draw = function draw() {
    dt = p.deltaTime / 1000.0;
    draw2(dt);
  };

  function draw2(dt) {
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
