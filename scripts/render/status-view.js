export default class StatusView {
  #blackStoneCountOutput;
  #whiteStoneCountOutput;
  #blackTurnNotification;
  #whiteTurnNotification;
  constructor() {
    this.#blackStoneCountOutput = document.getElementById("black-stone-count");
    this.#whiteStoneCountOutput = document.getElementById("white-stone-count");
    this.#blackTurnNotification = document.getElementById("black-turn-notification");
    this.#whiteTurnNotification = document.getElementById("white-turn-notification");
  }

  showTurnNotification(color) {
    switch(color) {
      case "black":
        this.#blackTurnNotification.style.visibility = "visible";
        break;
      case "white":
        this.#whiteTurnNotification.style.visibility = "visible";
        break;
      default:
        console.error(`不明な色が引数で渡されました(color: ${color})`);
    }
  }

  clearTurnNotification() {
    this.#blackTurnNotification.style.visibility = "hidden";
    this.#whiteTurnNotification.style.visibility = "hidden";
  }

  setStoneCount(color, count) {
    switch(color) {
      case "black":
        this.#blackStoneCountOutput.textContent = count;
        break;
      case "white":
        this.#whiteStoneCountOutput.textContent = count;
        break;
      default:
        console.error(`不明な色が引数で渡されました(color: ${color})`);
    }
  }
}