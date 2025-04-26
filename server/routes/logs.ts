// routes/logs.ts
import { Hono } from "hono";
import { db } from "../db/client.ts";

export const logsRoute = new Hono();

logsRoute.get("/", async (c) => {
  try {
    const query = await db.execute("SELECT * FROM emails;");
    console.log("Database response:", query); // Debug the full response
    console.log("Results:", query.rows);   // Debug just the results
    
    if (!query.rows || query.rows.length === 0) {
      return c.json({ message: "No email records found", data: [] });
    }
    
    const emails = query.rows.map((row) => {
      return {
        id: row[0],
        email: row[1],
        status: row[2],
        created_at: row[3],
      };
    });
    return c.json(emails, 200);
  } catch(error) {
    console.error("Error fetching logs:", error);
    return c.text("Error fetching logs", 500);
  }
});