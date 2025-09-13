new p5(squareWave, "squareWave");

function squareWave(p) {
  let sketchTime = new SketchTime(p);
  p.setup = function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    sketchTime.setupPauseAndResetButtons();
  };

  const DIMENTIONS = 15;
  const SIZE = 30;

  function getHeight(x, y, t) {
    // return min(p.abs(x - DIMENTIONS/2 + 0.5), p.abs(z - DIMENTIONS/2 + 0.5)) % 2;
    let speed = 1.0;
    return p.sin(x + sketchTime.currentTime * speed) + p.cos(y + sketchTime.currentTime * speed);
  }

  p.draw = function draw() {
    sketchTime.update();
    p.background(200);
    p.directionalLight(250, 250, 250, 1, -1, -1);
    p.ambientLight(100);
    // p.orbitControl()
    p.rotateX(-0.5);
    p.rotateY(p.PI + 0.5);
    p.translate(-DIMENTIONS * SIZE / 2, 0, -DIMENTIONS * SIZE / 2);
    for (x = 0; x < DIMENTIONS; x++) {
      for (z = 0; z < DIMENTIONS; z++) {
        p.push();
        let y = getHeight(x, z, sketchTime.currentTime);
        p.translate(x * SIZE, y * SIZE, z * SIZE);
        // p.fill(255 - y * 50);
        p.noStroke();
        p.box(SIZE, 5 * SIZE, SIZE);
        p.pop();
      }
    }
  };
}
