import Reversi from "./logic/reversi.js";
import Renderer from "./render/renderer.js";
import ClickHandler from "./event/click-handler.js";
import StatusView from "./render/status-view.js";

export default class Game {
  #isInGame;
  constructor() {
    this.reversi = new Reversi();
    this.renderer = new Renderer(this.reversi);
    this.clickHandler = new ClickHandler(
      this.renderer.canvas.canvas
    );
    this.statusView = new StatusView();
    this.#isInGame = true;

    this.setClickEvent();
    this.setPassEvent();
    this.setGameEndEvent();
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

  setGameEndEvent() {
    this.reversi.onGameEnd = (status) => {
      if(status[1] > status[2]) {
        this.statusView.showWinOrLose("black");
      } else if(status[2] > status[1]) {
        this.statusView.showWinOrLose("white");
      } else {
        this.statusView.showDraw();
      }
      this.statusView.clearTurnNotification();
      this.#isInGame = false;
    };
  }

  render() {
    this.renderer.drawField();

    if(this.#isInGame) {
      const turnColor = this.reversi.getTurn() === 1 ? "black" : "white";
      this.statusView.clearTurnNotification();
      this.statusView.showTurnNotification(turnColor);
    }

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