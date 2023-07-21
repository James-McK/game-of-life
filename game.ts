import { Renderer } from "./renderer.js";

export class Game {
  private renderer: Renderer;
  private state: boolean[][];

  private width = 118;
  private height = 62;

  private interval: number;

  private isRunning: boolean = false;
  private stepCount: number = 0;

  constructor() {
    this.renderer = new Renderer();

    this.state = Array.from(
      { length: this.width },
      (i) => (i = Array.from({ length: this.height }, (j) => (j = false)))
    );

    this.interval = setInterval(() => this.stepLoop(), 50);

    window.requestAnimationFrame(() => this.renderLoop());
  }

  public play() {
    this.isRunning = true;
  }

  private async renderLoop() {
    this.renderer.draw(this.state);

    window.requestAnimationFrame(() => this.renderLoop());
  }

  private async stepLoop() {
    if (this.isRunning) this.step();
  }

  private async step() {
    this.stepCount++;

    this.state![Math.floor(this.stepCount / this.width)]![
      this.stepCount % this.width
    ] = true;
  }
}
