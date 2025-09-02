new p5(moirePattern, "moirePattern");

function moirePattern(p) {
  let SIZE;
  let max_size;
  let time = 0.0;
  let paused;
  let period;

  p.setup = function setup() {
    SIZE = 400.0;
    max_size = p.sqrt(SIZE * SIZE * 2);
    p.createCanvas(SIZE, SIZE);
    p.createP("Pause");
    paused = p.createCheckbox();
    p.createP("Size");
    period = p.createSlider(2.0, 20.0, 10.0);
  };

  function draw_lines(rotation, period) {
    p.push();

    p.strokeWeight(period / 2);

    p.translate(SIZE / 2, SIZE / 2);
    p.rotate(rotation);
    p.translate(-SIZE / 2, -SIZE / 2);

    p.translate(SIZE / 2, SIZE / 2);
    p.translate(-max_size / 2, -max_size / 2);

    for (i = 0; i < max_size / period; i++) {
      p.line(0, i * period, max_size, i * period);
    }

    p.pop();
  };

  p.draw = function draw() {
    if (!paused.checked()) {
      time += p.deltaTime / 1000.0;
    }
    p.background(220);
    let rotation = time * 0.2;
    let period_value = period.value();
    draw_lines(rotation, period_value);
    draw_lines(rotation + p.TAU / 4, period_value);
    draw_lines(0, 10.0);
    draw_lines(p.TAU / 4, 10.0);
  };
}
