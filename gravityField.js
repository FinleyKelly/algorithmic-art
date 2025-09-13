new p5(gravityField, "gravityField");

function gravityField(p) {
  let sketchTime = new SketchTime(p);
  const SCREEN_SIZE = 400;
  const GRID_SIZE = 40;
  let gridSpacing = SCREEN_SIZE / GRID_SIZE

  function drawGrid() {
    for (let i = 0; i < GRID_SIZE + 1; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        let horizontalStart = transform(p.createVector(i * gridSpacing, j * gridSpacing));
        let horizontalEnd = transform(p.createVector(i * gridSpacing, j * gridSpacing + gridSpacing));
        let verticalStart = transform(p.createVector(j * gridSpacing, i * gridSpacing));
        let verticalEnd = transform(p.createVector(j * gridSpacing + gridSpacing, i * gridSpacing));
        p.line(horizontalStart.x, horizontalStart.y, horizontalEnd.x, horizontalEnd.y);
        p.line(verticalStart.x, verticalStart.y, verticalEnd.x, verticalEnd.y);
      }
    }
  }

  function transform(v) {
    let attractors = [
      p.createVector(SCREEN_SIZE / 2 + p.sin(sketchTime.currentTime) * 100, SCREEN_SIZE / 2 + p.cos(sketchTime.currentTime) * 100),
      p.createVector(SCREEN_SIZE / 2 + p.sin(sketchTime.currentTime + p.TAU / 2) * 100, SCREEN_SIZE / 2 + p.cos(sketchTime.currentTime + p.TAU / 2) * 100),
    ];
    function calculateOffet(attractor) {
      let difference = p5.Vector.sub(attractor, v);
      let direction = p5.Vector.normalize(difference);
      let distance = difference.mag();
      if (distance > 0) {
        return p5.Vector.setMag(direction, Math.min(500 * distance ** -1, distance));
      } else {
        return p.createVector(0, 0);
      }
    }
    let offsets = attractors.map(calculateOffet);
    let finalPosition = offsets.reduce(
      (acc, cur) => p5.Vector.add(acc, cur),
      v,
    );
    return p.createVector(finalPosition.x, finalPosition.y);
  }

  p.setup = function setup() {
    p.createCanvas(SCREEN_SIZE, SCREEN_SIZE);
    sketchTime.setupPauseAndResetButtons();
  };

  p.draw = function draw() {
    sketchTime.update()
    p.background(220);
    drawGrid();
  };
}
