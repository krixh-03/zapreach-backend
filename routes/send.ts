import { Hono } from "hono";
import Papa from "papaparse";
import { Resend } from "resend"; // Correct import
import * as dotenv from "dotenv";
import { db } from "../db/client.ts";
import { cors } from "https://deno.land/x/hono@v3.11.6/middleware.ts";



// Load environment variables
await dotenv.load({ export: true });


export const sendRoute = new Hono();
export const testsendRoute = new Hono();

sendRoute.use("*", cors()); // ✅ CORS enabled for all routes

type Lead = {
  name: string;
  email: string;
};

// Environment variables
const apiKey = Deno.env.get("RESEND_API_KEY");
const senderEmail = Deno.env.get("FROM_EMAIL");
// const internalApiKey = Deno.env.get("API_KEY");

if (!apiKey || !senderEmail) {
  throw new Error("Missing RESEND_API_KEY, FROM_EMAIL in .env");
}

// Initialize Resend client
const resend = new Resend(apiKey);

// /send route
sendRoute.post("/", async (c) => {
  //const providedApiKey = c.req.header("x-api-key");
  //if (providedApiKey !== internalApiKey) {
    //return c.text("Unauthorized no x api key", 401);
  //}

  const formData = await c.req.formData();
  const file = formData.get("csv") as File;
  const template = formData.get("template") as string;
  const subjectTemplate = formData.get("subject") as string || "Hello {{name}}!, this might help you!";

  if (!file || !template) {
    return c.text("Missing CSV or template", 400);
  }

  if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
    return c.text("Invalid file type. Only CSV allowed.", 400);
  }

  if (file.size > 2 * 1024 * 1024) {
    return c.text("File too large. Max 2MB allowed.", 400);
  }

  const text = await file.text();
  const result = Papa.parse(text, { header: true, skipEmptyLines: true });

  const leads = (result.data as Lead[]).filter(
    (lead): lead is Lead => !!lead.name && !!lead.email
  );

  console.log("Parsed leads:", leads);
  console.log("Email template:", template);

  for (const lead of leads) {
    const { name, email } = lead;
    await sendEmail(name, email, template, subjectTemplate);
  }

  return c.text("Emails sent successfully!");
});

// Email sending function
async function sendEmail(name: string, toEmail: string, template: string, subjectTemplate: string) {
  try {
    if(!template || template.trim() === "") {
      return c.text("❌ Template is empty or invalid.");
    }
  

    const subject = subjectTemplate.replace(/\{\{\s*name\s*\}\}/gi, name);
    const body = template.replace(/\{\{\s*name\s*\}\}/gi, name);


    const data = await resend.emails.send({
      from: senderEmail,
      to: toEmail,
      subject: subject,
      html: body,
    });

    let status = "sent";
    let errorMsg = null;
    if (!data || data.error) {
      status = "failed";
      errorMsg = data?.error?.message || "Unknown error";
    }

    await db.execute(
      `INSERT INTO emails (name, email, template_used, sent_at, status, error_msg)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [ name, toEmail, template, Math.floor(Date.now()/1000), status, errorMsg ]
    );

    console.log(`✅ Email sent to ${toEmail}`);
    console.log(`from ${senderEmail}`)
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

testsendRoute.post("/", async (c) => {
  try {
    // Parse JSON body
    const { email, subject, body } = await c.req.json();

    if (!email || !subject || !body) {
      return c.text("Missing email, subject, or body", 400);
    }

    // Use "Test User" as the name for placeholder replacement
    const name = "Test User";
    const subjectFinal = subject.replace(/\{\{\s*name\s*\}\}/gi, name);
    const bodyFinal = body.replace(/\{\{\s*name\s*\}\}/gi, name);

    // Send the email using your existing sendEmail logic
    const data = await resend.emails.send({
      from: senderEmail,
      to: email,
      subject: subjectFinal,
      html: bodyFinal,
    });

    let status = "sent";
    let errorMsg = null;
    if (!data || data.error) {
      status = "failed";
      errorMsg = data?.error?.message || "Unknown error";
    }

    // Log to DB
    await db.execute(
      `INSERT INTO emails (name, email, template_used, sent_at, status, error_msg)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [name, email, body, Math.floor(Date.now() / 1000), status, errorMsg]
    );

    if (status === "sent") {
      return c.text("Test email sent successfully!");
    } else {
      return c.text(`Failed to send test email: ${errorMsg}`, 500);
    }
  } catch (err) {
    console.error("❌ Error in /send-test:", err);
    return c.text("Internal server error", 500);
  }
});
