import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    // Email notification to you
    await resend.emails.send({
      from: "Buildyn <hello@buildyn.in>",
      to: ["pushkarmhatre007@gmail.com"],
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;">
          <h2>New Buildyn Enquiry</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="padding:16px;background:#f5f5f5;border-radius:8px;">
            ${message}
          </div>
        </div>
      `,
    });

    // Auto reply to visitor
    await resend.emails.send({
      from: "Buildyn <hello@buildyn.in>",
      to: [email],
      subject: "We've received your enquiry",
      html: `
        <div
          style="
            background:#0a0a0a;
            color:#ffffff;
            padding:40px;
            font-family:Arial,sans-serif;
          "
        >
          <div style="text-align:center;">
            <img
              src="https://buildyn.in/logo.png"
              width="110"
              alt="Buildyn"
            />
          </div>

          <h1
            style="
              margin-top:30px;
              text-align:center;
              color:#ffffff;
            "
          >
            Thank you for reaching out.
          </h1>

          <p
            style="
              font-size:16px;
              line-height:1.7;
              margin-top:24px;
            "
          >
            Hi ${name},
          </p>

          <p
            style="
              font-size:16px;
              line-height:1.7;
            "
          >
            We've successfully received your enquiry and
            will get back to you within 24-48 hours.
          </p>

          <p
            style="
              font-size:16px;
              line-height:1.7;
            "
          >
            Every project starts with a conversation.
            We're looking forward to learning more about yours.
          </p>

          <div
            style="
              margin:32px 0;
              border-top:1px solid rgba(255,255,255,0.12);
            "
          ></div>

          <p
            style="
              font-size:14px;
              color:#bdbdbd;
              line-height:1.7;
            "
          >
            Expected response time:
            <strong style="color:white;">
              Within 24-48 hours
            </strong>
          </p>

          <p
            style="
              margin-top:32px;
              font-size:14px;
              color:#bdbdbd;
            "
          >
            BUILDYN<br />
            Digital Presence, Built to Be Remembered
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Resend Error:", error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}