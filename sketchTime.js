class SketchTime {
  constructor(p) {
    this.p = p;
    this.currentTime = 0;
    this.justPaused = false;
    this.pauseButton = null;
  }

  pause() {
    this.p.noLoop();
    this.pauseButton.html("⏵︎");
  }

  unpause() {
    this.justPaused = true;
    this.p.loop();
    this.pauseButton.html("⏸︎");
  }

  togglePause() {
    if(this.p.isLooping()){
      this.pause();
    } else {
      this.unpause();
    }
  }

  update(speed = 1.0) {
    if(this.justPaused) {
      this.justPaused = false;
      return 0;
    } else {
      this.currentTime += (this.p.deltaTime / 1000.0) * speed;
      return this.p.deltaTime / 1000.0 * speed;
    }
  }

  setupPauseAndResetButtons(reset = () => {}) {
    this.pauseButton = this.p.createButton("⏸︎");
    this.pauseButton.mousePressed(() => {this.togglePause();});
    let resetButton = this.p.createButton("↺");
    resetButton.mousePressed(() => {
      this.currentTime = 0.0;
      reset();
      if(!this.p.isLooping()){
        this.p.redraw();
      }
    });
    this.pause();
  }
}

