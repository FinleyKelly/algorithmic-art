new p5(moirePattern, "moirePattern");

function moirePattern(p) {
  let SIZE;
  let maxSize;
  let time = 0.0;
  let paused;
  let period;

  p.setup = function setup() {
    SIZE = 400.0;
    maxSize = p.sqrt(SIZE * SIZE * 2);
    p.createCanvas(SIZE, SIZE);
    p.createP("Pause");
    paused = p.createCheckbox();
    p.createP("Size");
    period = p.createSlider(2.0, 20.0, 10.0);
  };

  function drawLines(rotation, period) {
    p.push();

    p.strokeWeight(period / 2);

    p.translate(SIZE / 2, SIZE / 2);
    p.rotate(rotation);
    p.translate(-SIZE / 2, -SIZE / 2);

    p.translate(SIZE / 2, SIZE / 2);
    p.translate(-maxSize / 2, -maxSize / 2);

    for (i = 0; i < maxSize / period; i++) {
      p.line(0, i * period, maxSize, i * period);
    }

    p.pop();
  };

  p.draw = function draw() {
    if (!paused.checked()) {
      time += p.deltaTime / 1000.0;
    }
    p.background(220);
    let rotation = time * 0.2;
    let periodValue = period.value();
    drawLines(rotation, periodValue);
    drawLines(rotation + p.TAU / 4, periodValue);
    drawLines(0, 10.0);
    drawLines(p.TAU / 4, 10.0);
  };
}
