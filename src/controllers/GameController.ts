import { Context } from "hono";
import { GetPlayerActionUseCase } from "../use-cases/GetPlayerActionUseCase";
import { Game } from "../validators/game";

export class GameController {
  static async getPlayerAction(c: Context) {
    const game = (await c.req.json()) as Game;

    const action = GetPlayerActionUseCase.execute(game);

    if (!action) {
      console.log("passo.");
      return c.json({});
    }

    console.log("jogada:", action);
    return c.json(action);
  }
}
