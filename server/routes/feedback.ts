import { Hono } from 'hono';
import { db } from "../db/client.ts";

// Helper function to get client IP address
function getIP(c: any): string {
  const ip = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown';
  console.log(`Client IP: ${ip}`);
  return ip;
}

export const feedbackRoute = new Hono();

// POST feedback
feedbackRoute.post('/', async (c) => {
  console.log('POST /feedback - Request received');
  
  try {
    const { feedback } = await c.req.json();
    console.log(`Feedback content: ${feedback}`);
    
    const ip = getIP(c);
    
    
    // Check if IP already submitted
    console.log(`Checking for existing submissions from IP: ${ip}`);
    const check = await db.execute({
      sql: "SELECT id FROM feedbacks WHERE ip = ?",
      args: [ip],
    });
    
    if (check.rows.length > 0) {
      console.log(`Duplicate submission from IP: ${ip}`);
      return c.json({ success: false, message: 'Already submitted' }, 400);
    }
    
    // Insert feedback
    console.log(`Inserting new feedback from IP: ${ip}`);
    await db.execute({
      sql: "INSERT INTO feedbacks (ip, text) VALUES (?, ?)",
      args: [ip, feedback],
    });
    
    console.log('Feedback successfully submitted');
    return c.json({ success: true, message: 'Feedback submitted' });
  } catch (error) {
    console.error('Error in POST /feedback:', error);
    return c.json({ 
      success: false, 
      message: 'Failed to submit feedback', 
      error: error instanceof Error ? error.message : String(error) 
    }, 500);
  }
});

// GET all feedback
feedbackRoute.get('/', async (c) => {
  console.log('GET /feedback - Request received');
  
  try {
    console.log('Fetching all feedback from database');
    const result = await db.execute("SELECT text, upvotes FROM feedbacks");
    
    console.log(`Retrieved ${result.rows.length} feedback entries`);
    const feedbacks = result.rows.map((row) => ({
      feedback: row.text, // Fixed column name to match SQL query
      upvotes: row.upvotes,
    }));
    
    return c.json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error in GET /feedback:', error);
    return c.json({ 
      success: false, 
      message: 'Failed to retrieve feedback', 
      error: error instanceof Error ? error.message : String(error) 
    }, 500);
  }
});

feedbackRoute.post('/upvote', async (c) => {
  console.log('POST /feedback/upvote - Request received');
  
  try {
    const { feedback } = await c.req.json();
    console.log(`Upvoting feedback: ${feedback}`);
    
    // Update upvote count
    await db.execute({
      sql: "UPDATE feedbacks SET upvotes = upvotes + 1 WHERE text = ?",
      args: [feedback],
    });
    
    console.log('Feedback upvoted successfully');
    return c.json({ success: true, message: 'Feedback upvoted' });
  } catch (error) {
    console.error('Error in POST /feedback/upvote:', error);
    return c.json({ 
      success: false, 
      message: 'Failed to upvote feedback', 
      error: error instanceof Error ? error.message : String(error) 
    }, 500);
  }
})