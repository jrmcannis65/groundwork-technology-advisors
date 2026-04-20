import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function renderAssessmentHtml(text: string): string {
  return text
    .split("\n\n")
    .map((block) => {
      const lines = block.split("\n").filter((l) => l.trim());
      if (!lines.length) return "";

      const rendered = lines
        .map((line) => {
          if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            const inner = line.slice(2, -2);
            return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#555;letter-spacing:1px;text-transform:uppercase;margin:20px 0 6px 0;">${inner}</p>`;
          }
          if (line.startsWith("- ")) {
            const inner = line
              .slice(2)
              .replace(/\*\*(.+?)\*\*/g, "<strong style=\"color:#1a3a5c;\">$1</strong>");
            return `<div style="display:flex;gap:10px;margin-bottom:6px;"><span style="color:#2e7ab8;flex-shrink:0;margin-top:2px;">&#8226;</span><span style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c2c2c;line-height:1.65;">${inner}</span></div>`;
          }
          const inlined = line.replace(/\*\*(.+?)\*\*/g, "<strong style=\"color:#1a3a5c;\">$1</strong>");
          return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c2c2c;line-height:1.7;margin:0 0 4px 0;">${inlined}</p>`;
        })
        .join("");

      return `<div style="margin-bottom:18px;">${rendered}</div>`;
    })
    .join("");
}

function buildEmailHtml(
  name: string,
  score: number,
  maxScore: number,
  band: string,
  assessment: string
): string {
  const pct = Math.round((score / maxScore) * 100);
  const assessmentHtml = renderAssessmentHtml(assessment);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Technology Foundation Scorecard Results</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:8px;overflow:hidden;border:1px solid #d0dce8;">

        <!-- Header -->
        <tr>
          <td style="background:#1a3a5c;padding:24px 32px;">
            <p style="margin:0 0 4px 0;font-family:Georgia,serif;font-size:18px;font-weight:700;color:white;">Groundwork Technology Advisors</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:0.5px;text-transform:uppercase;">Technology Foundation Scorecard Results</p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <p style="margin:0 0 12px 0;font-size:15px;line-height:1.7;color:#2c2c2c;">Hi ${name},</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#2c2c2c;">Thanks for completing the Technology Foundation Scorecard. Below is your personalized assessment based on the answers you provided.</p>
          </td>
        </tr>

        <!-- Score block -->
        <tr>
          <td style="padding:20px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="background:#f0f5fa;border-radius:6px;padding:16px 20px;width:100%;">
              <tr>
                <td>
                  <p style="margin:0 0 4px 0;font-size:11px;color:#5a7a99;text-transform:uppercase;letter-spacing:0.5px;">Your score</p>
                  <p style="margin:0 0 10px 0;font-family:Georgia,serif;font-size:32px;font-weight:700;color:#1a3a5c;">${pct}<span style="font-size:18px;color:#888;">%</span></p>
                  <p style="margin:0 0 4px 0;font-size:11px;color:#5a7a99;text-transform:uppercase;letter-spacing:0.5px;">Your band</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#1a3a5c;">${band}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Assessment -->
        <tr>
          <td style="padding:0 32px 8px 32px;border-top:1px solid #e8eef4;padding-top:20px;">
            ${assessmentHtml}
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:16px 32px 28px 32px;">
            <p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#2c2c2c;">If you want to talk through any of this in more depth, reach out directly. Initial conversations are typically 20 to 30 minutes by phone.</p>
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1a3a5c;border-radius:5px;">
                  <a href="https://groundworktechnologyadvisors.com/contact" style="display:inline-block;padding:11px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:white;text-decoration:none;letter-spacing:0.3px;">Book a Conversation</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e8eef4;">
            <p style="margin:0 0 2px 0;font-size:14px;font-weight:700;color:#1a3a5c;">Jon McAnnis</p>
            <p style="margin:0 0 2px 0;font-size:13px;color:#555;">Founder, Groundwork Technology Advisors</p>
            <p style="margin:0 0 2px 0;font-size:13px;color:#555;">
              <a href="mailto:info@groundworktechnologyadvisors.com" style="color:#2e7ab8;text-decoration:none;">info@groundworktechnologyadvisors.com</a>
            </p>
            <p style="margin:0 0 2px 0;font-size:13px;color:#555;">509-559-0899</p>
            <p style="margin:0;font-size:13px;">
              <a href="https://groundworktechnologyadvisors.com" style="color:#2e7ab8;text-decoration:none;">groundworktechnologyadvisors.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, score, maxScore, band, assessment } = body;

    if (!name || !email || score === undefined || maxScore === undefined || !band || !assessment) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = buildEmailHtml(name, score, maxScore, band, assessment);

    await resend.emails.send({
      from: "Jon McAnnis <info@groundworktechnologyadvisors.com>",
      to: email,
      replyTo: "info@groundworktechnologyadvisors.com",
      subject: "Your Technology Foundation Scorecard Results",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-results route error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }
}
