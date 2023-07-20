export class Renderer {
    canvas;
    context;
    squareSize = 15;
    numWide = 118;
    numTall = 62;
    constructor() {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        canvas.width = this.numWide * this.squareSize + this.numWide;
        canvas.height = this.numTall * this.squareSize + this.numTall;
        this.renderSquares();
    }
    renderSquares() {
        for (let i = 0; i < this.numWide; i++) {
            for (let j = 0; j < this.numTall; j++) {
                this.context.fillStyle = "#181926";
                this.context.fillRect(i * this.squareSize + i, j * this.squareSize + j, this.squareSize, this.squareSize);
            }
        }
    }
}
//# sourceMappingURL=renderer.js.map