import { db } from "./client.ts";

await db.execute(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    template_used TEXT NOT NULL,
    sent_at INTEGER NOT NULL,  -- store as UNIX timestamp
    status TEXT NOT NULL DEFAULT 'sent',
    error_msg TEXT DEFAULT NULL
  );
`);
