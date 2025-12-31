import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (resendInstance) {
    return resendInstance;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  resendInstance = new Resend(apiKey);
  return resendInstance;
}

export function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PS-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

interface SendWelcomeEmailParams {
  to: string;
  accessCode: string;
}

export async function sendWelcomeEmail({ to, accessCode }: SendWelcomeEmailParams) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: "PhysiScaffold <onboarding@resend.dev>",
    to,
    subject: "Welcome to PhysiScaffold - Your Access Code Inside",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0f1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, rgba(52, 211, 153, 0.1), rgba(129, 140, 248, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">

      <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">Welcome to PhysiScaffold</h1>
      <p style="color: rgba(255,255,255,0.7); font-size: 15px; margin: 0 0 24px 0;">Your journey to physics mastery begins now.</p>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Your Access Code</p>
        <p style="color: #34d399; font-size: 32px; font-weight: 700; font-family: monospace; margin: 0; letter-spacing: 2px;">${accessCode}</p>
      </div>

      <p style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
        You're on the early access list! We'll notify you when PhysiScaffold is ready for you. Keep this code safe - you'll need it to activate your account.
      </p>

      <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">
        Questions? Reply to this email or reach out on WhatsApp.
      </p>

    </div>

    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; margin-top: 24px;">
      PhysiScaffold - Your Physics Thinking Partner
    </p>
  </div>
</body>
</html>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw error;
  }

  return data;
}
