import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { GameController } from "../controllers/GameController";
import { gameSchema } from "../validators/game";

export const gameRoutes = new Hono();

gameRoutes.post(
  "/",
  zValidator("json", gameSchema),
  GameController.getPlayerAction
);
