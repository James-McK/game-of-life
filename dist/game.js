import { Renderer } from "./renderer.js";
export class Game {
    renderer;
    state;
    width = 118;
    height = 62;
    interval;
    isRunning = false;
    stepCount = 0;
    constructor() {
        this.renderer = new Renderer();
        this.state = Array.from({ length: this.width }, (i) => (i = Array.from({ length: this.height }, (j) => (j = false))));
        this.interval = setInterval(() => this.stepLoop(), 50);
        window.requestAnimationFrame(() => this.renderLoop());
    }
    play() {
        this.isRunning = true;
    }
    async renderLoop() {
        this.renderer.draw(this.state);
        window.requestAnimationFrame(() => this.renderLoop());
    }
    async stepLoop() {
        if (this.isRunning)
            this.step();
    }
    async step() {
        this.stepCount++;
        this.state[Math.floor(this.stepCount / this.width)][this.stepCount % this.width] = true;
    }
}
//# sourceMappingURL=game.js.map