import { Game } from "../validators/game";

export type Action = {
  pedra: string;
  lado: "esquerda" | "direita";
};

export type Occurrences = {
  [key: string]: number;
};

export class Turn {
  private _id: number;
  private _possibleActions: Action[] = [];
  private _nextAction: Action | null = null;
  private _occurrences: Occurrences = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
  };
  private _leftmostValue: string | null = null;
  private _rightmostValue: string | null = null;

  private constructor(private readonly _game: Game) {
    this._id = this._game.jogadas.length + 1;
  }

  get id() {
    return this._id;
  }

  get possibleActions() {
    return this._possibleActions;
  }

  get nextAction() {
    return this._nextAction;
  }

  get occurrences() {
    return this._occurrences;
  }

  static create(game: Game) {
    return new Turn(game);
  }

  generateNextAction() {
    this.calculatePossibleActions();

    if (this._possibleActions.length) {
      const validPiecesOnHand = this._possibleActions.map((a) => a.pedra);
      this.calculateOccurrences(validPiecesOnHand, "hand");
      this.calculateOccurrences(this._game.mesa, "table");
      this.findBestAction();
    }

    return this._nextAction;
  }

  private calculatePossibleActions() {
    if (!this._game.mesa.length) {
      this._possibleActions = this._game.mao.map((pedra) => ({
        pedra,
        lado: "esquerda",
      }));

      return;
    }

    this.getTableEdges(this._game.mesa);

    for (const piece of this._game.mao) {
      const values = this.getPieceValues(piece);

      if (values.includes(this._leftmostValue!)) {
        this._possibleActions.push({ pedra: piece, lado: "esquerda" });
      }

      if (values.includes(this._rightmostValue!)) {
        this._possibleActions.push({ pedra: piece, lado: "direita" });
      }
    }
  }

  private getTableEdges(table: string[]) {
    const leftmostPiece = table[0];
    const rightmostPiece = table[table.length - 1];

    this._leftmostValue = this.getPieceValues(leftmostPiece)[0];
    this._rightmostValue = this.getPieceValues(rightmostPiece)[1];
  }

  private getPieceValues(piece: string) {
    return piece.split("-");
  }

  private getPieceRating(piece: string) {
    const values = this.getPieceValues(piece);

    return this._occurrences[values[0]] + this._occurrences[values[1]];
  }

  private calculateOccurrences(pieces: string[], location: "hand" | "table") {
    for (const piece of pieces) {
      const values = this.getPieceValues(piece);
      const isDouble = values[0] === values[1];

      if (location === "hand" && isDouble) {
        this._occurrences[values[0]] += 1000;
      }

      this._occurrences[values[0]] += 1;
      this._occurrences[values[1]] += 1;
    }
  }

  private findBestAction() {
    this._nextAction = this._possibleActions[0];

    for (const possibleAction of this._possibleActions) {
      const possibleActionRating = this.getPieceRating(possibleAction.pedra);
      const nextActionRating = this.getPieceRating(this._nextAction.pedra);

      if (possibleActionRating > nextActionRating) {
        this._nextAction = possibleAction;
      }
    }
  }
}
