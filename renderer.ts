export class Renderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private squareSize: number = 15;
  private numWide = 118;
  private numTall = 62;

  constructor() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d", { alpha: false })!;

    canvas.width = this.numWide * this.squareSize + this.numWide;
    canvas.height = this.numTall * this.squareSize + this.numTall;

    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    this.canvas = canvas;
    this.context = context;
  }

  public async draw(state: boolean[][]) {
    console.log("hi");
    this.clearCanvas();

    for (let xIndex = 0; xIndex < state.length; xIndex++) {
      for (let yIndex = 0; yIndex < state[xIndex]!.length; yIndex++) {
        this.renderSquare(xIndex, yIndex, state[yIndex]![xIndex]!);
      }
    }
  }

  private clearCanvas() {
    this.context.fillStyle = "#24273a";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private async renderSquare(xIndex: number, yIndex: number, isAlive: boolean) {
    if (isAlive) this.context.fillStyle = "#cad3f5";
    else this.context.fillStyle = "#181926";

    this.context.fillRect(
      xIndex * this.squareSize + xIndex,
      yIndex * this.squareSize + yIndex,
      this.squareSize,
      this.squareSize
    );
  }
}
