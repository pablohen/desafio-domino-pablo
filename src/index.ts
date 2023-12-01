import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { gameRoutes } from "./routes/game";

const app = new Hono();
const port = 8000;

app.use("*", cors());
app.use("*", logger());

app.route("/", gameRoutes);

serve({
  fetch: app.fetch,
  port,
});
