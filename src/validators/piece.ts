import { z } from "zod";

export const pieceRegex = /\d-\d/g;
export const pieceErrorMessage =
  "piece format should be digit dash digit, '0-0'";
export const pieceSchema = z.string().regex(pieceRegex, pieceErrorMessage);
