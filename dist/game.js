import { Renderer } from "./renderer.js";
export class Game {
    renderer;
    state;
    tempState;
    width = 118;
    height = 62;
    interval;
    isRunning = false;
    stepCount = 0;
    constructor() {
        this.renderer = new Renderer();
        this.state = Array.from({ length: this.width }, (i) => (i = Array.from({ length: this.height }, (j) => (j = false))));
        this.tempState = structuredClone(this.state);
        // Set up a glider to start
        this.state[1][0] = true;
        this.state[2][1] = true;
        this.state[0][2] = true;
        this.state[1][2] = true;
        this.state[2][2] = true;
        this.interval = setInterval(() => this.stepLoop(), 20);
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
        this.tempState = structuredClone(this.state);
        for (let xIndex = 0; xIndex < this.width; xIndex++) {
            for (let yIndex = 0; yIndex < this.height; yIndex++) {
                // Loop at edges
                let minusX = (xIndex - 1 + this.width) % this.width;
                let minusY = (yIndex - 1 + this.height) % this.height;
                let plusX = (xIndex + 1) % this.width;
                let plusY = (yIndex + 1) % this.height;
                let numAliveNeighbours = +this.state[minusX][minusY] +
                    +this.state[minusX][yIndex] +
                    +this.state[minusX][plusY] +
                    +this.state[xIndex][minusY] +
                    +this.state[xIndex][plusY] +
                    +this.state[plusX][minusY] +
                    +this.state[plusX][yIndex] +
                    +this.state[plusX][plusY];
                if (numAliveNeighbours < 2) {
                    this.tempState[xIndex][yIndex] = false;
                }
                else if (numAliveNeighbours > 3) {
                    this.tempState[xIndex][yIndex] = false;
                }
                else if (numAliveNeighbours == 3) {
                    this.tempState[xIndex][yIndex] = true;
                }
                // Else if 2 neighbours, nothing changes
            }
        }
        this.state = structuredClone(this.tempState);
    }
}
//# sourceMappingURL=game.js.map