new p5(donutDonut, "donutDonut");

function donutDonut(p) {
  let sketchTime = new SketchTime(p);
  let amount = 6;
  let speed = 0.1;
  let radius = 15.0;
  let torusThickness = 7.0;

  p.setup = function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    sketchTime.setupPauseAndResetButtons();
  };

  p.draw = function draw() {
    sketchTime.update()
    p.background(220);
    p.normalMaterial();

    p.rotateY(p.TAU * sketchTime.currentTime * 0.1);

    for (i = 0; i < amount; i++) {
      p.push();
      let angle = p.TAU * (i / (amount * 2.0));
      p.rotateZ(angle);
      p.translate(0, 200.0 * p.sin(angle + p.TAU * sketchTime.currentTime * speed), 0);
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
