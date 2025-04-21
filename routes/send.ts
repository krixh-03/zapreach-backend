import { Hono } from "hono";
import Papa from "papaparse";
import { Resend } from "resend"; // Correct import
import * as dotenv from "dotenv";

// Load environment variables
await dotenv.load({ export: true });


export const sendRoute = new Hono();

type Lead = {
  name: string;
  email: string;
};

// Environment variables
const apiKey = Deno.env.get("RESEND_API_KEY");
const senderEmail = Deno.env.get("FROM_EMAIL");
const internalApiKey = Deno.env.get("API_KEY");

if (!apiKey || !senderEmail || !internalApiKey) {
  throw new Error("Missing RESEND_API_KEY, FROM_EMAIL, or API_KEY in .env");
}

// Initialize Resend client
const resend = new Resend(apiKey);

// /send route
sendRoute.post("/", async (c) => {
  const providedApiKey = c.req.header("x-api-key");
  if (providedApiKey !== internalApiKey) {
    return c.text("Unauthorized", 401);
  }

  const formData = await c.req.formData();
  const file = formData.get("csv") as File;
  const template = formData.get("template") as string;

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
    await sendEmail(name, email, template);
  }

  return c.text("Emails sent successfully!");
});

// Email sending function
async function sendEmail(name: string, toEmail: string, template: string) {
  try {
    const subject = `Hello ${name}, here's your message!`;
    const body = template.replace("{name}", name);

    await resend.emails.send({
      from: senderEmail,
      to: toEmail,
      subject: subject,
      html: body,
    });

    console.log(`✅ Email sent to ${toEmail}`);
    console.log(`from ${senderEmail}`)
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}
