import { Renderer } from "./renderer.js";

export class Game {
  private renderer: Renderer;
  private state: boolean[][];
  private tempState: boolean[][];

  private width = 230;
  private height = 115;

  private interval: number;

  private isRunning: boolean = false;
  private stepCount: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer = new Renderer(width, height);

    this.state = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => false)
    );
    this.tempState = structuredClone(this.state);

    // Set up a glider to start
    // this.state[1]![0] = true;
    // this.state[2]![1] = true;
    // this.state[0]![2] = true;
    // this.state[1]![2] = true;
    // this.state[2]![2] = true;

    this.interval = setInterval(() => this.stepLoop(), 20);

    window.requestAnimationFrame(() => this.renderLoop());
  }

  public loadPatternPlaintext(
    patternLocation: string,
    atX: number,
    atY: number
  ) {
    fetch("/patterns/" + patternLocation)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);

        let i = 0;
        let lineIndex = 0;
        while (i < data.length) {
          let j = data.indexOf("\n", i);
          if (j == -1) j = data.length;
          const line = data.substring(i, j);
          i = j + 1;

          if (line[0] == "!") continue;
          lineIndex++;

          for (let charIndex = 0; charIndex < line.length; charIndex++) {
            console.info(line[charIndex]);

            this.state[atX + charIndex]![atY + lineIndex] =
              line[charIndex] == "O";
          }
        }
      });
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
    this.tempState = structuredClone(this.state);

    for (let xIndex = 0; xIndex < this.width; xIndex++) {
      for (let yIndex = 0; yIndex < this.height; yIndex++) {
        // Loop at edges
        const minusX = (xIndex - 1 + this.width) % this.width;
        const minusY = (yIndex - 1 + this.height) % this.height;

        const plusX = (xIndex + 1) % this.width;
        const plusY = (yIndex + 1) % this.height;

        const numAliveNeighbours =
          +this.state[minusX]![minusY]! +
          +this.state[minusX]![yIndex]! +
          +this.state[minusX]![plusY]! +
          +this.state[xIndex]![minusY]! +
          +this.state[xIndex]![plusY]! +
          +this.state[plusX]![minusY]! +
          +this.state[plusX]![yIndex]! +
          +this.state[plusX]![plusY]!;

        if (numAliveNeighbours < 2) {
          this.tempState[xIndex]![yIndex]! = false;
        } else if (numAliveNeighbours > 3) {
          this.tempState[xIndex]![yIndex]! = false;
        } else if (numAliveNeighbours == 3) {
          this.tempState[xIndex]![yIndex]! = true;
        }
        // Else if 2 neighbours, nothing changes
      }
    }

    this.state = structuredClone(this.tempState);
  }
}
