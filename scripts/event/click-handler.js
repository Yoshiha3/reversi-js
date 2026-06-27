export default class ClickHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.onCanvasClick = null;
    canvas.addEventListener("click", (e) => {
      const coordinates = this.#getCoordinates(e);
      if(this.onCanvasClick) {
        this.onCanvasClick(coordinates);
      }
    });
  }

  #getCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {x, y};
  }
}