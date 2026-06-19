import Canvas from "./canvas.js";

export default class Renderer {
  #cellSize;
  constructor(reversi) {
    this.reversi = reversi;
    this.canvas = new Canvas(600, 600);
    this.#cellSize = Math.min(
      this.canvas.getSize().width,
      this.canvas.getSize().height
    ) / Math.max(
      reversi.getCols(),
      reversi.getRows()
    );
    this.blackCellId = 1;
    this.whiteCellId = 2;
  }

  drawField() {
    this.#drawBackground();
    this.#drawCells();
  }
  
  #drawBackground() {
    this.canvas.fill(0, 180, 0);
    const canvasSize = this.canvas.getSize();
    this.canvas.rect(0, 0, canvasSize.width, canvasSize.height);
  }

  #drawCells() {
    for(let y = 0; y < this.reversi.getRows(); y++) {
      for(let x = 0; x < this.reversi.getCols(); x++) {
        switch(this.reversi.getCell(x, y)) {
          case this.blackCellId:
            this.canvas.fill(0, 0, 0);
            break;
          case this.whiteCellId:
            this.canvas.fill(255, 255, 255);
            break;
          default:
            this.canvas.noFill();
        }

        this.canvas.circle(
          x * this.#cellSize + this.#cellSize / 2,
          y * this.#cellSize + this.#cellSize / 2,
          this.#cellSize / 2
        );
      }
    }
  }
}