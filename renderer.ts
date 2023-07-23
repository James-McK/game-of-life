export class Renderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;

  private squareSize: number = 2;
  private numWide;
  private numTall;
  private pixelGap = 0;

  constructor(width: number, height: number) {
    this.numWide = width;
    this.numTall = height;

    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.gl = this.getRenderingContext();

    const vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, this.getVertexShaderSource())!;

    const fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, this.getFragmentShaderSource())!;

    const program = this.createProgram(this.gl, vertexShader, fragmentShader)!;
  }

  private getRenderingContext() {
    const context = this.canvas.getContext("webgl2")!;

    this.canvas.width = this.numWide * this.squareSize + this.numWide * this.pixelGap;
    this.canvas.height = this.numTall * this.squareSize + this.numTall * this.pixelGap;

    context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight);
    context.clearColor(0.0, 0.0, 0.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    return context;
  }

  private getVertexShaderSource() {
    return `#version 300 es

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;

    // all shaders have a main function
    void main() {

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
    }`;
  }

  private getFragmentShaderSource() {
    return `#version 300 es

    // fragment shaders don't have a default precision so we need
    // to pick one. highp is a good default. It means "high precision"
    precision highp float;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      // Just set the output to a constant reddish-purple
      outColor = vec4(1, 0, 0.5, 1);
    }`;
  }

  private createShader(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return undefined;
  }

  private createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return undefined;
  }

  public async draw(state: boolean[][]) {
    this.clearCanvas();

    state.forEach(async (col, xIndex) => {
      col.forEach(async (cell, yIndex) => {
        this.renderSquare(xIndex, yIndex, cell);
      });
    });
    // for (let xIndex = 0; xIndex < this.numWide; xIndex++) {
    //   for (let yIndex = 0; yIndex < this.numTall; yIndex++) {
    //     this.renderSquare(xIndex, yIndex, state[xIndex]![yIndex]!);
    //   }
    // }
  }

  private clearCanvas() {
    //this.context.fillStyle = "#24273a";
    //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private async renderSquare(xIndex: number, yIndex: number, isAlive: boolean) {
    // if (isAlive) this.context.fillStyle = "#cad3f5";
    // else this.context.fillStyle = "#181926";
    // this.context.fillRect(
    //   xIndex * this.squareSize + xIndex * this.pixelGap,
    //   yIndex * this.squareSize + yIndex * this.pixelGap,
    //   this.squareSize - this.pixelGap,
    //   this.squareSize - this.pixelGap
    // );
  }
}
