import { Renderer } from "./renderer.js";

export class Game {
  private renderer: Renderer;

  constructor() {
    this.renderer = new Renderer();

    window.requestAnimationFrame(() => this.renderLoop());
  }

  private async renderLoop() {
    let r1 = [false, true, false, false];
    let r2 = [false, true, false, false];
    let r3 = [false, true, true, true];
    let r4 = [false, false, false, false];

    let state = [r1, r2, r3, r4];

    this.renderer.draw(state);

    window.requestAnimationFrame(() => this.renderLoop());
  }
}
