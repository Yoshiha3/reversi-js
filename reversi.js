export default class Reversi {
  #field;
  #turn;
  constructor() {
    this.#field = Array.from({length: 8}, () =>
      Array.from({length: 8}, () => 0)
    );
    this.#turn = 1;
  }

  placeStone(x, y) {
    this.setCell(this.#turn, x, y);
    this.turnChange();
  }

  getFlips(turn, x, y) {

  }

  getFlipByDirection(turn, x, y, dx, dy) {
    const flips = [];

    if(this.getCell(x, y) !== 0) return flips;
    let nx = x + dx;
    let ny = y + dy;
    const opposite = turn === 1 ? 2 : 1;

    while(true) {
      if(!this.isInField(nx, ny)) return [];
      const cellId = this.getCell(nx, ny);

      switch(cellId) {
        case turn:
          return flips;
        case opposite:
          flips.push({
            x: nx,
            y: ny,
            id: cellId
          });
          break;
        default:
          return [];
      }
      
      nx += dx;
      ny += dy;
    }
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