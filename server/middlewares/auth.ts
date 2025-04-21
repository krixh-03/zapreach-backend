export const basicAuth = async (c, next) => {
  console.log("Auth middleware called");
  console.log("Auth middleware called for path:", c.req.path);
  const authHeader = c.req.header("Authorization");
  console.log("Auth header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    console.log("Missing or invalid auth header");
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  
  const base64 = authHeader.split(" ")[1];
  const decoded = atob(base64);
  const [username, password] = decoded.split(":");
  
  const USER = Deno.env.get("AUTH_USER");
  const PASS = Deno.env.get("AUTH_PASS");
  console.log("Expected:", USER, PASS);
  console.log("Received:", username, password);
  
  if (username !== USER || password !== PASS) {
    console.log("Authentication failed");
    throw new HTTPException(403, { message: "Forbidden" });
  }
  
  console.log("Authentication successful");
  await next();
};