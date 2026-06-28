export default class Reversi {
  #field;
  #turn;
  constructor() {
    this.#field = Array.from({length: 8}, () =>
      Array.from({length: 8}, () => 0)
    );
    this.#turn = 1;
    this.init();

    this.onGameEnd = null;
    this.onPass = null;
  }

  init() {
    this.setCell(1, 3, 3);
    this.setCell(1, 4, 4);
    this.setCell(2, 4, 3);
    this.setCell(2, 3, 4);
  }

  countStone(id) {
    let count = 0;
    for(let y = 0; y < this.getRows(); y++) {
      for(let x = 0; x < this.getCols(); x++) {
        if(this.getCell(x, y) === id) count++;
      }
    }
    return count;
  }

  placeStone(x, y) {
    const flips = this.getFlips(this.#turn, x, y);
    if(!this.isPlaceable(this.#turn, x, y)) return;

    this.setCell(this.#turn, x, y);
    for(const cell of flips) {
      this.setCell(this.#turn, cell.x, cell.y);
    }

    const opposite = this.#turn === 1 ? 2 : 1;
    const numOfPlaceables = this.getPlaceables(this.#turn).length;
    const numOfOppositePlaceables = this.getPlaceables(opposite).length;

    if(numOfOppositePlaceables > 0) {
      this.turnChange();
      return;
    }

    if(numOfPlaceables > 0) {
      if(this.onPass) {
        this.onPass(opposite);
      }
      return;
    }

    if(this.onGameEnd) {
      this.onGameEnd({
        1: this.countStone(1),
        2: this.countStone(2)
      });
    }
  }

  getPlaceables(turn) {
    const placeables = [];
    for(let y = 0; y < this.getRows(); y++) {
      for(let x = 0; x < this.getCols(); x++) {
        if(this.isPlaceable(turn, x, y)) placeables.push({ x, y });
      }
    }
    return placeables;
  }

  isPlaceable(turn, x, y) {
    const flips = this.getFlips(turn, x, y);
    return flips.length > 0;
  }

  getFlips(turn, x, y) {
    const flips = [];
    if(this.getCell(x, y) !== 0) return flips;
    for(let dx = -1; dx <= 1; dx++) {
      for(let dy = -1; dy <= 1; dy++) {
        if(dx === 0 && dy === 0) continue;
        const flipsByDirection = this.getFlipByDirection(turn, x, y, dx, dy);
        flips.push(...flipsByDirection);
      }
    }
    return flips;
  }

  getFlipByDirection(turn, x, y, dx, dy) {
    const flips = [];
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