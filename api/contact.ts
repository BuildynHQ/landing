import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitize HTML to prevent XSS in email
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, phone } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeMessage = sanitize(message);
  const safePhone = phone ? sanitize(phone) : null;

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    // ── Notification email to you ─────────────────────────────────────────
    await resend.emails.send({
      from: "Buildyn <hello@buildyn.in>",
      to: ["pushkarmhatre007@gmail.com"],
      replyTo: email,
      subject: `🔔 New Enquiry from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Enquiry</title>
        </head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr>
              <td>
                <table width="600" align="center" cellpadding="0" cellspacing="0"
                  style="max-width:600px;width:100%;margin:0 auto;background:#111111;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

                  <!-- Banner -->
                  <tr>
                    <td>
                      <img
                        src="https://buildyn.in/email-banner.png"
                        width="600"
                        alt="Buildyn"
                        style="display:block;width:100%;height:auto;"
                      />
                    </td>
                  </tr>

                  <!-- Header label -->
                  <tr>
                    <td style="padding:32px 36px 0;">
                      <span style="display:inline-block;background:#c0392b;color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;padding:4px 12px;border-radius:4px;text-transform:uppercase;">
                        New Enquiry
                      </span>
                    </td>
                  </tr>

                  <!-- Title -->
                  <tr>
                    <td style="padding:16px 36px 0;">
                      <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                        Someone wants to build something 🔥
                      </h1>
                      <p style="margin:8px 0 0;font-size:13px;color:#666666;">
                        Received on ${timestamp} IST
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:24px 36px;">
                      <div style="border-top:1px solid rgba(255,255,255,0.08);"></div>
                    </td>
                  </tr>

                  <!-- Details -->
                  <tr>
                    <td style="padding:0 36px;">
                      <table width="100%" cellpadding="0" cellspacing="0">

                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#888888;">Name</p>
                            <p style="margin:0;font-size:17px;font-weight:600;color:#ffffff;">${safeName}</p>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#888888;">Email</p>
                            <a href="mailto:${safeEmail}"
                              style="margin:0;font-size:17px;font-weight:600;color:#c0392b;text-decoration:none;">
                              ${safeEmail}
                            </a>
                          </td>
                        </tr>

                        ${
                          safePhone
                            ? `<tr>
                          <td style="padding-bottom:20px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#888888;">Phone</p>
                            <p style="margin:0;font-size:17px;font-weight:600;color:#ffffff;">${safePhone}</p>
                          </td>
                        </tr>`
                            : ""
                        }

                        <tr>
                          <td style="padding-bottom:32px;">
                            <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#888888;">Message</p>
                            <div style="background:#1a1a1a;border-left:3px solid #c0392b;border-radius:0 8px 8px 0;padding:16px 20px;">
                              <p style="margin:0;font-size:15px;color:#dddddd;line-height:1.75;white-space:pre-wrap;">${safeMessage}</p>
                            </div>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Reply CTA -->
                  <tr>
                    <td style="padding:0 36px 36px;">
                      <a href="mailto:${safeEmail}?subject=Re: Your Buildyn Enquiry"
                        style="display:inline-block;background:#c0392b;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.5px;padding:14px 28px;border-radius:6px;text-decoration:none;">
                        Reply to ${safeName} →
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);background:#0d0d0d;">
                      <p style="margin:0;font-size:12px;color:#444444;text-align:center;letter-spacing:1px;">
                        BUILDYN · BUILDYN.IN · hello@buildyn.in
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── Auto-reply to visitor ─────────────────────────────────────────────
    await resend.emails.send({
      from: "Buildyn <hello@buildyn.in>",
      to: [email],
      subject: "We got your message — talk soon.",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>We got your message</title>
        </head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr>
              <td>
                <table width="600" align="center" cellpadding="0" cellspacing="0"
                  style="max-width:600px;width:100%;margin:0 auto;background:#111111;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

                  <!-- Banner -->
                  <tr>
                    <td>
                      <img
                        src="https://buildyn.in/email-banner.png"
                        width="600"
                        alt="Buildyn"
                        style="display:block;width:100%;height:auto;"
                      />
                    </td>
                  </tr>

                  <!-- Greeting -->
                  <tr>
                    <td style="padding:36px 36px 0;">
                      <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">
                        Thank you for reaching out, ${safeName}.
                      </h1>
                    </td>
                  </tr>

                  <!-- Body copy -->
                  <tr>
                    <td style="padding:20px 36px 0;">
                      <p style="margin:0;font-size:16px;color:#cccccc;line-height:1.75;">
                        We've received your enquiry and our team will be in touch within <strong style="color:#ffffff;">24–48 hours.</strong>
                      </p>
                      <p style="margin:20px 0 0;font-size:16px;color:#cccccc;line-height:1.75;">
                        Every great digital presence starts with a single conversation — and this is ours.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:28px 36px;">
                      <div style="border-top:1px solid rgba(255,255,255,0.08);"></div>
                    </td>
                  </tr>

                  <!-- What you submitted -->
                  <tr>
                    <td style="padding:0 36px;">
                      <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#666666;">
                        Your message
                      </p>
                      <div style="background:#1a1a1a;border-left:3px solid #c0392b;border-radius:0 8px 8px 0;padding:16px 20px;">
                        <p style="margin:0;font-size:14px;color:#aaaaaa;line-height:1.75;white-space:pre-wrap;">${safeMessage}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Services row -->
                  <tr>
                    <td style="padding:32px 36px 0;">
                      <p style="margin:0 0 16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#666666;">
                        What we do
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:20%;text-align:center;padding:12px 4px;background:#1a1a1a;border-radius:8px;font-size:11px;color:#aaaaaa;letter-spacing:0.5px;">Websites</td>
                          <td style="width:4%;"></td>
                          <td style="width:20%;text-align:center;padding:12px 4px;background:#1a1a1a;border-radius:8px;font-size:11px;color:#aaaaaa;letter-spacing:0.5px;">Landing Pages</td>
                          <td style="width:4%;"></td>
                          <td style="width:20%;text-align:center;padding:12px 4px;background:#1a1a1a;border-radius:8px;font-size:11px;color:#aaaaaa;letter-spacing:0.5px;">Branding</td>
                          <td style="width:4%;"></td>
                          <td style="width:20%;text-align:center;padding:12px 4px;background:#1a1a1a;border-radius:8px;font-size:11px;color:#aaaaaa;letter-spacing:0.5px;">UI/UX</td>
                          <td style="width:4%;"></td>
                          <td style="width:20%;text-align:center;padding:12px 4px;background:#1a1a1a;border-radius:8px;font-size:11px;color:#aaaaaa;letter-spacing:0.5px;">SEO</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td style="padding:32px 36px;">
                      <a href="https://buildyn.in"
                        style="display:inline-block;background:#c0392b;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.5px;padding:14px 28px;border-radius:6px;text-decoration:none;">
                        Visit buildyn.in →
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);background:#0d0d0d;">
                      <p style="margin:0 0 6px;font-size:12px;color:#444444;text-align:center;letter-spacing:1px;">
                        BUILDYN · Digital Presence, Built to Be Remembered
                      </p>
                      <p style="margin:0;font-size:11px;color:#333333;text-align:center;">
                        hello@buildyn.in · buildyn.in
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}