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

await db.execute(`CREATE TABLE feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  ip_address TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);