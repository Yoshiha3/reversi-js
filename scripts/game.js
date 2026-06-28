import Reversi from "./logic/reversi.js";
import Renderer from "./render/renderer.js";
import ClickHandler from "./event/click-handler.js";
import StatusView from "./render/status-view.js";

export default class Game {
  constructor() {
    this.reversi = new Reversi();
    this.renderer = new Renderer(this.reversi);
    this.clickHandler = new ClickHandler(
      this.renderer.canvas.canvas
    );
    this.statusView = new StatusView();

    this.setClickEvent();
    this.setPassEvent();
  }

  setClickEvent() {
    this.clickHandler.onCanvasClick = (coordinates) => {
      const cellSize = this.renderer.getCellSize();
      const col = Math.floor(coordinates.x / cellSize);
      const row = Math.floor(coordinates.y / cellSize);

      this.statusView.clearPass();
      this.reversi.placeStone(col, row);
      this.render();
    };
  }

  setPassEvent() {
    this.reversi.onPass = (turn) => {
      const passColor = turn === 1 ? "black" : "white";
      this.statusView.showPass(passColor);
    };
  }

  render() {
    this.renderer.drawField();

    const turnColor = this.reversi.getTurn() === 1 ? "black" : "white";
    this.statusView.clearTurnNotification();
    this.statusView.showTurnNotification(turnColor);

    this.statusView.setStoneCount(
      "black",
      this.reversi.countStone(1)
    );
    this.statusView.setStoneCount(
      "white",
      this.reversi.countStone(2)
    );
  }
}