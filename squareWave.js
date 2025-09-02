new p5(squareWave, "squareWave");

function squareWave(p) {
  p.setup = function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    // p.normalMaterial()
  };

  const DIMENTIONS = 15;
  const SIZE = 30;

  let t = 0.0;

  function get_height(x, y, t) {
    // return min(p.abs(x - DIMENTIONS/2 + 0.5), p.abs(z - DIMENTIONS/2 + 0.5)) % 2;
    let speed = 1.0;
    return p.sin(x + t * speed) + p.cos(y + t * speed);
  }

  p.draw = function draw() {
    t = t + p.deltaTime * 0.001;
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
        let y = get_height(x, z, t);
        p.translate(x * SIZE, y * SIZE, z * SIZE);
        // p.fill(255 - y * 50);
        p.noStroke();
        p.box(SIZE, 5 * SIZE, SIZE);
        p.pop();
      }
    }
  };
}
