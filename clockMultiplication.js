new p5(clockMultiplication, "clockMultiplication");

function clockMultiplication(p) {
  let sketchTime = new SketchTime(p);
  const SIZE = 400;
  let points;
  let transparancy;
  let strokeWidth;
  let speed;

  p.setup = function setup() {
    p.createCanvas(SIZE, SIZE);
    sketchTime.setupPauseAndResetButtons();
    // multiplier = p.createSlider(0.0, 10.0, 0.0, 0.1)
    p.createP("Points");
    points = p.createSlider(0, 2000, 250);
    p.createP("Transparancy");
    transparancy = p.createSlider(0, 255, 255);
    p.createP("Line width");
    strokeWidth = p.createSlider(1, 10, 1);
    p.createP("Speed");
    speed = p.createSlider(0, 100.0, 1.0);
  };

  function get_position(x) {
    return p5.Vector.add(
      p5.Vector.rotate(p.createVector(0, SIZE / 2), p.TAU * x / p.float(points.value())),
      p.createVector(SIZE / 2, SIZE / 2),
    );
  }

  function draw_line(a, b) {
    let a_position = get_position(a);
    let b_position = get_position(b);
    p.line(a_position.x, a_position.y, b_position.x, b_position.y);
    p.frameRate(30);
  };

  p.draw = function draw() {
    sketchTime.update(speed.value());
    p.background(220);
    p.circle(SIZE / 2, SIZE / 2, SIZE);
    p.strokeWeight(strokeWidth.value());
    p.stroke(0, 0, 0, transparancy.value());
    for (a = 0; a < points.value(); a++) {
      draw_line(a, a * sketchTime.currentTime);
    }
  };
}
