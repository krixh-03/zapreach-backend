// routes/logs.ts
import { Hono } from "hono";
import { db } from "../db/client.ts";

export const logsRoute = new Hono();
logsRoute.get("/", async (c) => {
  const { results } = await db.execute("SELECT * FROM emails;");
  return c.json(results);
});
