import { Renderer } from "./renderer.js";
export class Game {
    renderer;
    state;
    tempState;
    width = 230;
    height = 115;
    interval;
    isRunning = false;
    stepCount = 0;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.renderer = new Renderer(width, height);
        this.state = Array.from({ length: this.width }, () => Array.from({ length: this.height }, () => false));
        this.tempState = structuredClone(this.state);
        this.interval = setInterval(() => this.stepLoop(), 20);
        window.requestAnimationFrame(() => this.renderLoop());
    }
    loadPatternPlaintext(patternLocation, atX, atY) {
        fetch("/patterns/" + patternLocation)
            .then((response) => response.text())
            .then((data) => {
            let i = 0;
            let lineIndex = 0;
            while (i < data.length) {
                let j = data.indexOf("\n", i);
                if (j == -1)
                    j = data.length;
                const line = data.substring(i, j);
                i = j + 1;
                if (line[0] == "!")
                    continue;
                for (let charIndex = 0; charIndex < line.length; charIndex++) {
                    this.state[atX + charIndex][atY + lineIndex] = line[charIndex] == "O";
                }
                lineIndex++;
            }
        });
    }
    loadPatternRLE(patternLocation, atX, atY) {
        fetch("/patterns/" + patternLocation)
            .then((response) => response.text())
            .then((data) => {
            let strRunCount = "";
            let lineIndex = 0;
            let colIndex = 0;
            let i = 0;
            while (i < data.length) {
                let j = data.indexOf("\n", i);
                if (j == -1)
                    j = data.length;
                const line = data.substring(i, j);
                i = j + 1;
                if (line[0] == "#")
                    continue;
                if (line[0] == "x")
                    continue; // Ignore the header for now
                for (let charIndex = 0; charIndex < line.length; charIndex++) {
                    const char = line[charIndex];
                    const isNum = !isNaN(parseInt(char, 10));
                    if (isNum) {
                        strRunCount += char;
                    }
                    else if (char === "$") {
                        if (strRunCount === "")
                            strRunCount = "1";
                        lineIndex += parseInt(strRunCount, 10);
                        strRunCount = "";
                        colIndex = 0;
                    }
                    else if (char === "b" || char === "o") {
                        if (strRunCount === "")
                            strRunCount = "1";
                        const runCount = parseInt(strRunCount, 10);
                        strRunCount = "";
                        for (let run = 0; run < runCount; run++) {
                            this.state[atX + colIndex][atY + lineIndex] = char == "o";
                            colIndex++;
                        }
                    }
                }
            }
        });
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
                const minusX = (xIndex - 1 + this.width) % this.width;
                const minusY = (yIndex - 1 + this.height) % this.height;
                const plusX = (xIndex + 1) % this.width;
                const plusY = (yIndex + 1) % this.height;
                const numAliveNeighbours = +this.state[minusX][minusY] +
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