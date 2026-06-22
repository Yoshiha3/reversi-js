export default class Reversi {
  #field;
  #turn;
  constructor() {
    this.#field = Array.from({length: 8}, () =>
      Array.from({length: 8}, () => 0)
    );
    this.#turn = 1;
  }

  turnChange() {
    this.#turn = this.#turn === 1 ? 2 : 1;
  }

  getTurn() {
    return this.#turn;
  }

  getCols() {
    return this.#field[0].length;
  }

  getRows() {
    return this.#field.length;
  }

  setCell(id, x, y) {
    if(!this.isInField(x, y)) {
      console.error(`x:${x},y:${y}はフィールド外です`);
      return;
    }
    this.#field[y][x] = id;
  }

  getCell(x, y) {
    if(!this.isInField(x, y)) {
      console.error(`x:${x},y:${y}はフィールド外です`);
      return;
    }
    return this.#field[y][x];
  }

  isInField(x, y) {
    return (
      0 <= x && x < this.getCols() &&
      0 <= y && y < this.getRows()
    );
  }
}