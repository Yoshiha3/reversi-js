export default class Canvas {
  #canvasWidth;
  #canvasHeight;
  constructor(width = 300, height = 300) {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.#canvasWidth = width;
    this.#canvasHeight = height;

    this.isFill = true;
    this.isStroke = true;

    this.setSize(width, height);
  }

  getSize() {
    return {
      width: this.#canvasWidth,
      height: this.#canvasHeight
    };
  }

  setSize(width, height) {
    this.#canvasWidth = width;
    this.#canvasHeight = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  fill(r, g, b, a = 1) {
    this.isFill = true;
    this.context.fillStyle = `rgba(${r},${g},${b},${a})`;
  }

  noFill() {
    this.isFill = false;
  }

  stroke(r, g, b, a = 1) {
    this.isStroke = true;
    this.context.strokeStyle = `rgba(${r},${g},${b},${a})`;
  }

  noStroke() {
    this.isStroke = false;
  }

  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.#drawColor();
  }

  rect(x, y, width, height) {
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.#drawColor();
  }

  #drawColor() {
    if(this.isStroke) this.context.stroke();
    if(this.isFill) this.context.fill();
  }
}