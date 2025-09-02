new p5(blackHole, "blackHole");

function blackHole(p) {
  const SIZE = 600;
  const BLACK_HOLE_RADIUS = 70;
  const PLANET_RADIUS = 3;
  const DENSITY = 0.00001;
  const SPEED = 0.2;

  class Planet {
    constructor(position, radius, color) {
      this.position = position.copy();
      this.radius = radius;
      this.color = color;
    }
    screenX(angle) {
      return p.sin(angle) * this.position.x + p.cos(angle) * this.position.z;
    }
    screenY(angle) {
      return this.position.y;
    }
    depth(angle) {
      return p.cos(angle) * this.position.x + -p.sin(angle) * this.position.z;
    }
  }

  let planets = [];
  let time = 0.0;

  p.setup = function setup() {
    p.createCanvas(400, 400);

    for (let i = 0; i < p.pow(SIZE, 3) * DENSITY; i++) {
      let position = p.createVector(p.random(SIZE) - SIZE / 2, p.random(SIZE) - SIZE / 2, p.random(SIZE) - SIZE / 2);
      let horizonalPosition = p.createVector(position.x, 0, position.z);
      if (position.mag() > BLACK_HOLE_RADIUS + PLANET_RADIUS * 2 && horizonalPosition.mag() < SIZE / 2) {
        planets.push(new Planet(position, PLANET_RADIUS, p.color(p.random(256), 100, 100)));
      }
    }
    planets.push(new Planet(p.createVector(0, 0, 0), BLACK_HOLE_RADIUS, p.color(0)));
  };

  p.draw = function draw() {
    time += p.deltaTime / 1000.0;
    let angle = time * SPEED;

    p.background(0);
    planets.sort((a, b) => b.depth(angle) - a.depth(angle));
    p.translate(p.width / 2, p.height / 2);
    for (const planet of planets) {
      p.push();
      p.noStroke();
      p.fill(planet.color);
      p.circle(planet.screenX(angle), planet.screenY(angle), planet.radius * 2);
      p.pop();
    }
  };
}
