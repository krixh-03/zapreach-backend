import { createClient } from "@libsql/client";

const url = Deno.env.get("TURSO_DB_URL");
const authToken = Deno.env.get("TURSO_DB_TOKEN");

if (!url || !authToken) {
  throw new Error(
    "Missing TURSO_DB_URL or TURSO_DB_TOKEN environment variables."
  );
}

export const db = createClient({
  url,
  authToken,
});
