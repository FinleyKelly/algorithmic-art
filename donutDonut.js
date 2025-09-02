new p5(donutDonut, "donutDonut");

function donutDonut(p) {
  let time = 0.0;
  let amount = 6;
  let speed = 0.1;
  let radius = 15.0;
  let torusThickness = 7.0;

  p.setup = function setup() {
    p.createCanvas(400, 400, p.WEBGL);
  };

  p.draw = function draw() {
    time += p.deltaTime / 1000.0;
    p.background(220);
    p.normalMaterial();

    p.rotateY(p.TAU * time * 0.1);

    for (i = 0; i < amount; i++) {
      p.push();
      let angle = p.TAU * (i / (amount * 2.0));
      p.rotateZ(angle);
      p.translate(0, 200.0 * p.sin(angle + p.TAU * time * speed), 0);
      p.sphere(radius);
      p.pop();
    }
    for (i = 0; i < amount * 2; i++) {
      p.push();
      let angle = p.TAU * (i / (amount * 2.0));
      p.rotateZ(angle);
      p.translate(0, 100.0, 0);
      p.rotateX(p.TAU / 4.0);
      p.torus(radius + torusThickness / 2.0, torusThickness);
      p.pop();
    }
  };
}
