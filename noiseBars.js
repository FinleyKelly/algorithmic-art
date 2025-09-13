new p5(noiseBars, "noiseBars");

function noiseBars(p) {
  let sketchTime = new SketchTime(p);
  let gridSize = 50;
  let canvasSize = 400;
  let nosieScale = 0.008;

  p.setup = function setup() {
    p.createCanvas(canvasSize, canvasSize);
    sketchTime.setupPauseAndResetButtons();
    p.noiseDetail(1, 0);
  };

  p.draw = function draw() {
    sketchTime.update();
    p.background(220);
    for (x = 0; x < gridSize; x++) {
      for (y = 0; y < gridSize; y++) {
        let screenSpaceX = x * (canvasSize / gridSize);
        let screenSpaceY = y * (canvasSize / gridSize);
        let noiseValue = p.noise(screenSpaceX * nosieScale, screenSpaceY * nosieScale, sketchTime.currentTime);
        p.push();
        p.translate((canvasSize / gridSize) * 0.5, (canvasSize / gridSize) * 0.5);
        p.translate(screenSpaceX, screenSpaceY);
        p.rotate(noiseValue * p.TAU);
        p.strokeWeight(2.0);
        p.line(-(canvasSize / gridSize) * 0.5, 0, (canvasSize / gridSize) * 0.5, 0);
        // p.fill(noiseValue * 255.0);
        // p.noStroke();
        // square(0, 0, (canvasSize/gridSize));
        p.pop();
      }
    }
  };
}
