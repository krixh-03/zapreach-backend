import { Hono } from 'hono'
import { db } from "../db/client.ts";

function getIP(c: any): string {
  return c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown';
}

export const feedbackRoute = new Hono();

// POST feedback
feedbackRoute.post('/', async (c) => {
  const { feedback } = await c.req.json();
  const ip = getIP(c);

  // Check if IP already submitted
  const check = await db.execute({
    sql: "SELECT id FROM feedbacks WHERE ip = ?",
    args: [ip],
  });

  if (check.rows.length > 0) {
    return c.json({ success: false, message: 'Already submitted' }, 400);
  }

  // Insert feedback
  await db.execute({
    sql: "INSERT INTO feedbacks (ip, feedbacks) VALUES (?, ?)",
    args: [ip, feedback],
  });

  return c.json({ success: true, message: 'Feedback submitted' });
});

// GET all feedback
feedbackRoute.get('/', async (c) => {
  const result = await db.execute("SELECT feedbacks, upvotes FROM feedbacks");

  const feedbacks = result.rows.map((row) => ({
    feedback: row.feedback,
    upvotes: row.upvotes,
  }));

  return c.json({ success: true, feedbacks });
});
