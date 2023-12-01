import { Turn } from "../entities/Turn";
import { Game } from "../validators/game";

export class GetPlayerActionUseCase {
  private _turn: Turn;

  private constructor(private readonly _game: Game) {
    this._turn = Turn.create(this._game);
  }

  static create(game: Game) {
    return new GetPlayerActionUseCase(game);
  }

  static execute(game: Game) {
    const getPlayerActionUseCase = this.create(game);

    return getPlayerActionUseCase._turn.generateNextAction();
  }
}
