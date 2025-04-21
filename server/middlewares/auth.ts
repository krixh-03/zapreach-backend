// middlewares/auth.ts
import { HTTPException } from "hono/http-exception";

export const basicAuth = async (c, next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = atob(base64);
  const [username, password] = decoded.split(":");

  const USER = Deno.env.get("AUTH_USER");
  const PASS = Deno.env.get("AUTH_PASS");

  if (username !== USER || password !== PASS) {
    throw new HTTPException(403, { message: "Forbidden" });
  }

  await next();
};
