const url = Deno.env.get("TURSO_DB_URL");
const authToken = Deno.env.get("TURSO_DB_TOKEN");

console.log("TURSO_DB_URL:", JSON.stringify(url));
console.log("TURSO_DB_TOKEN:", authToken ? "set" : "not set");

if (!url || !authToken) {
  throw new Error(
    "Missing TURSO_DB_URL or TURSO_DB_TOKEN environment variables."
  );
}
