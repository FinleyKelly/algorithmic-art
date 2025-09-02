new p5(hexagonTerrain, "hexagonTerrain");

function hexagonTerrain(p) {
  let cam;
  p.setup = function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    p.colorMode(p.HSL, 255);
    cam = p.createCamera();
    cam.setPosition(300, -300, 0);
    cam.lookAt(0, 0, 0);
    p.setCamera(cam);
  };

  p.draw = function draw() {
    p.background(220);
    p.orbitControl();
    // print(cam.centerX);
    for (let i = -10; i < 10; i++) {
      for (let j = -10; j < 10; j++) {
        let x = p.sqrt(3) * i + p.sqrt(3) / 2 * j;
        let y = 3.0 / 2.0 * j;
        let distance = (p.abs(i) + p.abs(j) + p.abs(-i - j)) / 2.0;
        if (distance <= 3) {
          p.push();
          let z = p.noise(x / 15.0 + 1000.0 + cam.centerX * 0.01, y / 15.0 + 1000.0 + cam.centerZ * 0.01);
          let centerZ = p.noise(1000.0 + cam.centerX * 0.01, 1000.0 + cam.centerZ * 0.01);
          let hexColor = p.color(
            p.noise(x / 5.0 + 500.0 + cam.centerX * 0.01, y / 5.0 + 500.0 + cam.centerZ * 0.01) * 255.0,
            100,
            100,
          );
          p.translate(x * 20 + cam.centerX, z * 500 + cam.centerY - centerZ * 500, y * 20 + cam.centerZ);
          p.noStroke();
          p.fill(hexColor);
          p.cylinder(20.0, 100.0, 7);
          p.pop();
        }
      }
    }
    // p.cylinder(100.0, 100.0, 7);
  };
}
