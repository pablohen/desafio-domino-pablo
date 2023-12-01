import { z } from "zod";
import { pieceErrorMessage, pieceRegex, pieceSchema } from "./piece";

export const gameSchema = z.object({
  jogador: z.number({
    required_error: "jogador is required",
    invalid_type_error: "jogador must be a number",
  }),
  mao: z.array(pieceSchema, {
    required_error: "mao is required",
    invalid_type_error: "mao must be an array",
  }),
  mesa: z.array(pieceSchema, {
    required_error: "mesa is required",
    invalid_type_error: "mesa must be an array",
  }),
  jogadas: z.array(
    z.object({
      jogador: z.number({
        required_error: "jogador is required",
        invalid_type_error: "jogador must be a number",
      }),
      pedra: z
        .string({
          required_error: "pedra is required",
          invalid_type_error: "pedra must be a string",
        })
        .regex(pieceRegex, pieceErrorMessage),
      lado: z
        .string({
          required_error: "lado is required",
          invalid_type_error: "lado must be a string",
        })
        .optional(),
    })
  ),
});

export type Game = z.input<typeof gameSchema>;
