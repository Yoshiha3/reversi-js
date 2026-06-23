import Reversi from "./reversi.js";
import Renderer from "./renderer.js";
import ClickHandler from "./click-handler.js";

export default class Game {
  constructor() {
    this.reversi = new Reversi();
    this.renderer = new Renderer(this.reversi);
    this.clickHandler = new ClickHandler(
      this.renderer.canvas.canvas
    );

    this.setClickEvent();
  }

  setClickEvent() {
    this.clickHandler.onCanvasClick = (coordinates) => {
      const cellSize = this.renderer.getCellSize();
      const col = Math.floor(coordinates.x / cellSize);
      const row = Math.floor(coordinates.y / cellSize);

      this.reversi.placeStone(col, row);
      this.render();
    };
  }

  render() {
    this.renderer.drawField();
  }
}