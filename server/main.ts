// main.ts
import { Hono } from 'hono';
import { sendRoute } from "./routes/send.ts";

const app = new Hono();

app.route("/send", sendRoute);

Deno.serve(app.fetch);
