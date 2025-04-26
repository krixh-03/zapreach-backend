import { Hono } from 'hono';
import { sendRoute } from './routes/send.ts';
import { logsRoute } from './routes/logs.ts';
import { feedbackRoute } from './routes/feedback.ts';
import rateLimit from "https://esm.sh/hono-rate-limit@latest";
import {cors} from 'cors'
import { db } from './db/client.ts';
import { basicAuth } from "./middlewares/auth.ts";

// Initialize app
const app = new Hono();

app.use('*', cors()); // Enable CORS for all routes
// app.use('*', basicAuth); // Apply basic auth to all routes

app.use("*", rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Mount routes
app.route('/feedback', feedbackRoute);
app.route('/send', sendRoute);
app.route("/emails", logsRoute);

// Start server (await to make sure the server is up before continuing)
Deno.serve({ port: 8787 }, app.fetch);

// Optional: Debugging (only in dev)
if (Deno.env.get("ENV") === "dev") {
  // Query directly using LibSQL client
  const result = await db.execute("SELECT * FROM emails;");
  console.log("[DEV] Emails in DB:", result);
}
