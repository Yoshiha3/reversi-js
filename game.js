import Reversi from "./reversi.js";
import Renderer from "./renderer.js";

export default class Game {
  constructor() {
    this.reversi = new Reversi();
    this.renderer = new Renderer(this.reversi);
  }

  render() {
    this.renderer.drawField();
  }
}