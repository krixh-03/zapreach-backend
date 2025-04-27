// client.ts
import { createClient } from "@libsql/client";

// Read the .env file directly and parse it manually
const envText = await Deno.readTextFile("./.env"); 
const envVars = {};

envText.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

export const db = createClient({
  url: envVars.TURSO_DB_URL,
  authToken: envVars.TURSO_DB_TOKEN,
});