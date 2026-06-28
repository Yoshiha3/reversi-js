export default class StatusView {
  #blackStoneCountOutput;
  #blackTurnNotification;
  #blackWin;
  #blackLose;
  #blackPass;
  #whiteStoneCountOutput;
  #whiteTurnNotification;
  #whiteWin;
  #whiteLose;
  #whitePass;
  constructor() {
    this.#blackStoneCountOutput = document.getElementById("black-stone-count");
    this.#blackTurnNotification = document.getElementById("black-turn-notification");
    this.#blackWin = document.getElementById("black-win");
    this.#blackLose = document.getElementById("black-lose");
    this.#blackPass = document.getElementById("black-pass");
    this.#whiteStoneCountOutput = document.getElementById("white-stone-count");
    this.#whiteTurnNotification = document.getElementById("white-turn-notification");
    this.#whiteWin = document.getElementById("white-win");
    this.#whiteLose = document.getElementById("whitek-lose");
    this.#whitePass = document.getElementById("white-pass");
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

  showPass(color) {
    switch(color) {
      case "black":
        this.#blackPass.style.display = "inline";
        break;
      case "white":
        this.#whitePass.style.display = "inline";
        break;
      default:
        console.error(`不明な色が引数で渡されました(color: ${color})`);
    }
  }

  clearPass() {
    this.#blackPass.style.display = "none";
    this.#whitePass.style.display = "none";
  }
}