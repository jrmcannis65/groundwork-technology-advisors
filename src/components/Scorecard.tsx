"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";

const questions = [
  {
    section: "Technology visibility",
    text: "Does your leadership team have a shared, written understanding of your current technology environment: what systems you run, how they connect, and where the gaps are?",
    opts: [
      { label: "Yes, documented and current", score: 3, concern: false },
      { label: "Mostly, but it lives in one person's head", score: 1, concern: true },
      { label: "No, we lack a clear picture", score: 0, concern: true },
      { label: "Partially: outdated documentation exists", score: 1, concern: true },
    ],
  },
  {
    section: "Technology visibility",
    text: "When your executive team discusses technology priorities, do they generally agree on what the top three are?",
    opts: [
      { label: "Yes, aligned and documented", score: 3, concern: false },
      { label: "Mostly, but priorities shift frequently", score: 1, concern: true },
      { label: "No: IT and leadership are often misaligned", score: 0, concern: true },
      { label: "We haven't had that conversation formally", score: 0, concern: true },
    ],
  },
  {
    section: "Security & compliance",
    text: "How confident are you in your current security and compliance posture (HIPAA, SOC 2, or other relevant requirements for your industry)?",
    opts: [
      { label: "Yes, recently reviewed", score: 3, concern: false },
      { label: "Reasonably confident, no recent incidents", score: 2, concern: false },
      { label: "Uncertain: it hasn't been formally assessed", score: 0, concern: true },
      { label: "Concerned: we know there are gaps", score: 0, concern: true },
    ],
  },
  {
    section: "Security & compliance",
    text: "Do you have a documented, tested disaster recovery and business continuity plan?",
    opts: [
      { label: "Yes, documented and tested in the past year", score: 3, concern: false },
      { label: "Yes, documented but not recently tested", score: 1, concern: true },
      { label: "No formal plan exists", score: 0, concern: true },
      { label: "Partial: some systems are covered", score: 1, concern: true },
    ],
  },
  {
    section: "Engineering & delivery",
    text: "Does your engineering team consistently deliver on commitments: shipping what they say they'll ship, when they say they'll ship it?",
    opts: [
      { label: "Yes, delivery is reliable and predictable", score: 3, concern: false },
      { label: "Sometimes: velocity varies significantly", score: 1, concern: true },
      { label: "No, we frequently miss or descope", score: 0, concern: true },
      { label: "We're too early-stage to assess this yet", score: 2, concern: false },
    ],
  },
  {
    section: "Engineering & delivery",
    text: "Is your technical debt at a level where it meaningfully slows down new development or creates operational risk?",
    opts: [
      { label: "No, debt is manageable and tracked", score: 3, concern: false },
      { label: "Somewhat: it slows us down occasionally", score: 1, concern: true },
      { label: "Yes, it's a significant drag on the team", score: 0, concern: true },
      { label: "We don't have good visibility into it", score: 0, concern: true },
    ],
  },
  {
    section: "Team & org design",
    text: "Do you have the right technology leadership in place for your current stage of growth?",
    opts: [
      { label: "Yes, strong CTO/CIO and team", score: 3, concern: false },
      { label: "Mostly, but leadership bandwidth is stretched", score: 1, concern: true },
      { label: "No, we have a gap at the leadership level", score: 0, concern: true },
      { label: "We rely on an outsourced or fractional model", score: 2, concern: false },
    ],
  },
  {
    section: "Team & org design",
    text: "Does your technology team structure reflect where you are headed, or where you were 18 months ago?",
    opts: [
      { label: "Reflects where we're headed", score: 3, concern: false },
      { label: "Mostly current: some roles need rethinking", score: 1, concern: true },
      { label: "It's behind: hasn't kept pace with growth", score: 0, concern: true },
      { label: "We haven't formally assessed this", score: 0, concern: true },
    ],
  },
  {
    section: "Strategy & roadmap",
    text: "Do you have a technology roadmap that is practical, prioritized, and actively used by your leadership team?",
    opts: [
      { label: "Yes, current and actively referenced", score: 3, concern: false },
      { label: "We have one but it's rarely referenced", score: 1, concern: true },
      { label: "No formal roadmap exists", score: 0, concern: true },
      { label: "We have priorities but nothing documented", score: 1, concern: true },
    ],
  },
  {
    section: "Strategy & roadmap",
    text: "Overall, how well does your technology environment support the business goals you're trying to achieve in the next 18 months?",
    opts: [
      { label: "Very well: technology is an enabler", score: 3, concern: false },
      { label: "Adequately: it gets the job done", score: 2, concern: false },
      { label: "Poorly: technology is holding us back", score: 0, concern: true },
      { label: "Uncertain: we're not sure what the gaps are", score: 0, concern: true },
    ],
  },
  {
    section: "AI readiness",
    text: "Do you have a clear picture of where AI is already being used across your organization, including tools your staff adopted on their own?",
    opts: [
      { label: "Yes, we have full visibility and a policy in place", score: 3, concern: false },
      { label: "Partially: we know some uses but not all", score: 1, concern: true },
      { label: "No, we have limited visibility into AI adoption", score: 0, concern: true },
      { label: "We have not looked into it formally", score: 0, concern: true },
    ],
  },
  {
    section: "AI readiness",
    text: "Does your organization have governance in place for how AI can and cannot be used, particularly around sensitive or regulated data?",
    opts: [
      { label: "Yes, documented policy exists and staff are aware", score: 3, concern: false },
      { label: "Informally: some guidance exists but nothing formal", score: 1, concern: true },
      { label: "No formal governance or policy exists", score: 0, concern: true },
      { label: "We rely on vendor terms and have not added our own", score: 0, concern: true },
    ],
  },
];

const TOTAL_QUESTIONS = 12;
const MAX_SCORE = 36;

const shortLabels: Record<string, string> = {
  "Technology visibility: Does your leadership team have a shared, written understanding of your current technology environment: what systems you run, how they connect, and where the gaps are?": "Technology visibility: No shared environment documentation",
  "Technology visibility: When your executive team discusses technology priorities, do they generally agree on what the top three are?": "Technology visibility: Leadership not aligned on priorities",
  "Security & compliance: How confident are you in your current security and compliance posture (HIPAA, SOC 2, or other relevant requirements for your industry)?": "Security and compliance: Posture not recently assessed",
  "Security & compliance: Do you have a documented, tested disaster recovery and business continuity plan?": "Security and compliance: No tested DR/BC plan",
  "Engineering & delivery: Does your engineering team consistently deliver on commitments: shipping what they say they'll ship, when they say they'll ship it?": "Engineering delivery: Inconsistent delivery against commitments",
  "Engineering & delivery: Is your technical debt at a level where it meaningfully slows down new development or creates operational risk?": "Engineering delivery: Technical debt creating drag",
  "Team & org design: Do you have the right technology leadership in place for your current stage of growth?": "Team and org: Technology leadership gap",
  "Team & org design: Does your technology team structure reflect where you are headed, or where you were 18 months ago?": "Team and org: Structure not keeping pace with growth",
  "Strategy & roadmap: Do you have a technology roadmap that is practical, prioritized, and actively used by your leadership team?": "Strategy and roadmap: No active technology roadmap",
  "Strategy & roadmap: Overall, how well does your technology environment support the business goals you're trying to achieve in the next 18 months?": "Strategy and roadmap: Technology not aligned to business goals",
  "AI readiness: Do you have a clear picture of where AI is already being used across your organization, including tools your staff adopted on their own?": "AI readiness: Limited visibility into AI adoption",
  "AI readiness: Does your organization have governance in place for how AI can and cannot be used, particularly around sensitive or regulated data?": "AI readiness: No formal AI governance policy",
};

function buildReportHTML(
  nameVal: string,
  companyVal: string,
  emailVal: string,
  score: string,
  band: string,
  bandBg: string,
  bandColor: string,
  rawConcerns: string,
  rec: string
): string {
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const concernItems = rawConcerns
    ? rawConcerns.split(" | ").map((c) => {
        const short = shortLabels[c] || c;
        const parts = short.split(": ");
        return `<tr><td style="padding:8px 12px;border-bottom:0.5px solid #e8eef4;color:#5a7a99;font-size:11px;white-space:nowrap;vertical-align:top">${parts[0] || ""}</td><td style="padding:8px 12px;border-bottom:0.5px solid #e8eef4;font-size:12px;color:#2c2c2c">${parts[1] || short}</td></tr>`;
      }).join("")
    : `<tr><td colspan="2" style="padding:8px 12px;font-size:12px;color:#3b6d11">No significant gaps identified</td></tr>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Technology Foundation Scorecard - ${companyVal || nameVal}</title>`
    + `<style>body{font-family:Arial,Helvetica,sans-serif;background:#f5f5f3;margin:0;padding:24px;color:#2c2c2c}.report{max-width:680px;margin:0 auto;background:white;border-radius:8px;overflow:hidden;border:0.5px solid #d0dce8}.rh{background:#1a3a5c;padding:24px 28px;position:relative;overflow:hidden}.rha{position:absolute;right:0;top:0;width:80px;height:100%;background:#2e7ab8;opacity:0.15}.rm{display:flex;align-items:center;gap:12px;margin-bottom:14px}.rfirm{font-family:Georgia,serif;font-size:16px;font-weight:700;color:white}.rfsub{font-size:10px;color:rgba(255,255,255,0.55);letter-spacing:0.5px}.rtitle{font-family:Georgia,serif;font-size:19px;font-weight:700;color:white;margin-bottom:4px}.rdate{font-size:11px;color:rgba(255,255,255,0.45)}.rb{padding:24px 28px}.sl{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2e7ab8;margin:20px 0 10px}.ig{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ic{background:#f0f5fa;border-radius:6px;padding:10px 12px}.il{font-size:10px;color:#5a7a99;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:3px}.iv{font-size:13px;font-weight:700;color:#1a3a5c}.sb{display:inline-block;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-top:6px}.ct{width:100%;border-collapse:collapse;border:0.5px solid #d0dce8}.ct th{text-align:left;padding:8px 12px;background:#e8f0f7;color:#1a3a5c;font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase}.recbox{background:#e8f0f7;border-radius:6px;border-left:3px solid #2e7ab8;padding:14px 16px;margin-top:4px}.rectitle{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a3a5c;margin-bottom:6px}.rectext{font-size:12px;color:#1a3a5c;line-height:1.65}.rf{background:#1a3a5c;padding:12px 28px;display:flex;justify-content:space-between;align-items:center}.rfl{font-size:10px;color:rgba(255,255,255,0.5)}.rfr{font-size:10px;color:#4a9fd4}</style>`
    + `</head><body><div class="report">`
    + `<div class="rh"><div class="rha"></div>`
    + `<div class="rm"><svg width="40" height="30" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="0" width="26" height="8" rx="2" fill="white"/><rect x="3" y="11" width="34" height="8" rx="2" fill="white" opacity="0.6"/><rect x="0" y="22" width="40" height="8" rx="2" fill="white" opacity="0.3"/></svg>`
    + `<div><div class="rfirm">Groundwork Technology Advisors</div><div class="rfsub">groundworktechnologyadvisors.com</div></div></div>`
    + `<div class="rtitle">Technology Foundation Scorecard Results</div>`
    + `<div class="rdate">Completed ${dateStr}</div></div>`
    + `<div class="rb">`
    + `<div class="sl">Respondent</div>`
    + `<div class="ig"><div class="ic"><div class="il">Name</div><div class="iv">${nameVal}</div></div>`
    + `<div class="ic"><div class="il">Company</div><div class="iv">${companyVal || "Not provided"}</div></div></div>`
    + `<div class="sl" style="margin-top:16px">Score</div>`
    + `<div class="ig">`
    + `<div class="ic"><div class="il">Foundation score</div><div class="iv" style="font-size:28px">${score}</div>`
    + `<div class="sb" style="background:${bandBg};color:${bandColor}">${band}</div></div>`
    + `<div class="ic"><div class="il">Assessment</div><div class="iv" style="font-size:12px;font-weight:400;line-height:1.55;margin-top:2px">Based on 12 questions across technology visibility, security and compliance, engineering delivery, team and org design, and AI readiness.</div></div></div>`
    + `<div class="sl" style="margin-top:16px">Gaps identified</div>`
    + `<table class="ct"><thead><tr><th>Area</th><th>Gap</th></tr></thead><tbody>${concernItems}</tbody></table>`
    + `<div class="sl" style="margin-top:16px">Recommendation</div>`
    + `<div class="recbox"><div class="rectitle">Where Groundwork can help</div><div class="rectext">${rec}</div></div>`
    + `</div>`
    + `<div class="rf"><div class="rfl">Prepared by Groundwork Technology Advisors LLC</div><div class="rfr">info@groundworktechnologyadvisors.com</div></div>`
    + `</div></body></html>`;
}

type FormState = "idle" | "submitting" | "success" | "error";
type AssessmentState = "idle" | "loading" | "success" | "error";

function renderAssessment(text: string) {
  return text.split("\n\n").map((block, bi) => {
    const lines = block.split("\n");
    return (
      <div key={bi} style={{ marginBottom: "20px" }}>
        {lines.map((line, li) => {
          if (!line.trim()) return null;
          // Section header: entire line is **bold**
          if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            return (
              <p
                key={li}
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  color: "#555",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                {line.slice(2, -2)}
              </p>
            );
          }
          // Regular text with optional inline **bold**
          const parts = line.split(/\*\*(.+?)\*\*/g);
          return (
            <p
              key={li}
              className="text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-charcoal)",
                lineHeight: 1.7,
                marginBottom: "4px",
              }}
            >
              {parts.map((part, pi) =>
                pi % 2 === 1 ? (
                  <strong key={pi} style={{ color: "var(--color-navy)" }}>
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
            </p>
          );
        })}
      </div>
    );
  });
}

export default function Scorecard() {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(TOTAL_QUESTIONS).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [assessmentState, setAssessmentState] = useState<AssessmentState>("idle");
  const [assessment, setAssessment] = useState<string>("");
  const [emailDelivered, setEmailDelivered] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;

  function selectAnswer(qi: number, oi: number) {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  }

  function restart() {
    setAnswers(new Array(TOTAL_QUESTIONS).fill(null));
    setShowResults(false);
    setFormState("idle");
    setAssessmentState("idle");
    setAssessment("");
    setEmailDelivered(false);
  }

  async function handleSeeResults() {
    if (!allAnswered) return;

    let total = 0;
    questions.forEach((q, i) => {
      total += q.opts[answers[i] as number].score;
    });

    const answersMap: Record<string, string> = {};
    questions.forEach((q, i) => {
      answersMap[`${i + 1}`] = q.opts[answers[i] as number].label;
    });

    setShowResults(true);
    setAssessmentState("loading");

    try {
      const res = await fetch("/api/assessment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersMap, score: total, maxScore: MAX_SCORE }),
      });
      if (res.ok) {
        const data = await res.json();
        setAssessment(data.assessment ?? "");
        setAssessmentState("success");
      } else {
        setAssessmentState("error");
      }
    } catch {
      setAssessmentState("error");
    }
  }

  async function handleFormSubmit(
    pct: number,
    band: string,
    bandBg: string,
    bandColor: string,
    rec: string,
    concernAreasSummary: string
  ) {
    setFormState("submitting");
    const nameVal = nameRef.current?.value ?? "";
    const companyVal = companyRef.current?.value ?? "";
    const emailVal = emailRef.current?.value ?? "";

    const scoreStr = `${pct}%`;
    const gapsIdentified = concernAreasSummary
      ? concernAreasSummary.split(" | ").map((c) => shortLabels[c] || c).join("\n")
      : "None flagged";

    // Use cached assessment from state, or fetch fresh if not yet available
    let aiText = assessment;
    if (!aiText) {
      try {
        let total = 0;
        const answersMap: Record<string, string> = {};
        questions.forEach((q, i) => {
          if (answers[i] !== null && answers[i] !== undefined) {
            total += q.opts[answers[i] as number].score;
            answersMap[`${i + 1}`] = q.opts[answers[i] as number].label;
          }
        });
        const aiRes = await fetch("/api/assessment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersMap, score: total, maxScore: MAX_SCORE }),
        });
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          aiText = aiData.assessment ?? "";
        }
      } catch {
        // proceed without AI section
      }
    }

    // Send visitor results email via Resend, with one retry on failure
    let delivered = false;
    if (emailVal && aiText) {
      const sendResultsPayload = JSON.stringify({
        name: nameVal,
        email: emailVal,
        score: Math.round((pct / 100) * MAX_SCORE),
        maxScore: MAX_SCORE,
        band,
        assessment: aiText,
      });

      async function attemptSend(): Promise<boolean> {
        try {
          const r = await fetch("/api/send-results/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: sendResultsPayload,
          });
          const d = await r.json();
          return d.ok === true;
        } catch {
          return false;
        }
      }

      delivered = await attemptSend();
      if (!delivered) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        delivered = await attemptSend();
      }
      setEmailDelivered(delivered);
    }

    const baseHTML = buildReportHTML(nameVal, companyVal, emailVal, scoreStr, band, bandBg, bandColor, concernAreasSummary, rec);

    const aiSectionHtml = aiText
      ? `<hr style="margin: 32px 0; border-color: #1a3a5c;" />`
        + `<h2 style="color: #1a3a5c; font-size: 20px; margin-bottom: 16px;">Personalized Assessment</h2>`
        + `<div style="font-family: Georgia, serif; font-size: 15px; line-height: 1.7; color: #1a1a1a;">`
        + aiText.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>")
        + `</div>`
      : "";

    const reportHTML = aiSectionHtml
      ? baseHTML.replace("</body></html>", aiSectionHtml + "</body></html>")
      : baseHTML;

    const reportBlob = new Blob([reportHTML], { type: "text/html" });
    const safeName = (companyVal || nameVal).replace(/[^a-zA-Z0-9]/g, "-");
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `GTA-Scorecard-${safeName}-${dateStr}.html`;

    const data = new FormData();
    data.append("_subject", `Scorecard: ${pct}% (${band}) ${companyVal || nameVal}`);
    data.append("Full Name", nameVal);
    data.append("Company", companyVal || "Not provided");
    data.append("Email", emailVal);
    data.append("Score", scoreStr);
    data.append("Result", band);
    data.append("Gaps Identified", gapsIdentified);
    data.append("Source", "Technology Foundation Scorecard");
    data.append("email_delivered", delivered ? "yes" : "no");
    data.append("assessment_text", aiText || "Not available");
    data.append("attachment", reportBlob, fileName);

    try {
      const res = await fetch("https://formspree.io/f/xpqkqjky", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  // ── Results view ────────────────────────────────────────────────
  if (showResults) {
    let total = 0;
    const concerns: { section: string; text: string }[] = [];
    const strengths: string[] = [];

    questions.forEach((q, i) => {
      if (answers[i] === null || answers[i] === undefined) return;
      const opt = q.opts[answers[i] as number];
      if (!opt) return;
      total += opt.score;
      if (opt.concern) {
        concerns.push({ section: q.section, text: q.text.split("?")[0] + "?" });
      } else if (opt.score === 3) {
        strengths.push(q.section);
      }
    });

    const pct = Math.round((total / MAX_SCORE) * 100);
    const aiConcerns = concerns.filter((c) => c.section === "AI readiness");
    const uniqueStrengths = [...new Set(strengths)];

    let band: string, bandBg: string, bandColor: string, rec: string, recTitle: string;
    if (pct >= 80) {
      band = "Strong foundation";
      bandBg = "#eaf3de";
      bandColor = "#3b6d11";
      recTitle = "Where Groundwork can help";
      rec = "Your technology environment is in solid shape. An outside perspective can help validate your roadmap, stress-test your compliance posture, or prepare for a period of accelerated growth or M&A activity.";
    } else if (pct >= 55) {
      band = "Gaps worth addressing";
      bandBg = "#faeeda";
      bandColor = "#854f0b";
      recTitle = "Where Groundwork can help";
      rec = "You have a working technology environment, but the gaps identified above carry real risk as you scale. A Technology Ecosystem Assessment or Roadmap engagement would give you a clear, prioritized picture of what to address first.";
    } else {
      band = "Foundation needs attention";
      bandBg = "#fcebeb";
      bandColor = "#a32d2d";
      recTitle = "Where Groundwork can help";
      rec = "Your technology environment has significant gaps that are likely already affecting your ability to execute. A structured assessment is the right first step — it gives leadership a shared, honest picture and a practical roadmap before investing in fixes.";
    }

    const concernAreasSummary = concerns.map((c) => `${c.section}: ${c.text}`).join(" | ");

    return (
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        <div style={{ background: "white", border: "0.5px solid #d0dce8", borderRadius: "12px", padding: "24px" }}>
          {/* Score header */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "16px", borderBottom: "0.5px solid #d0dce8", paddingBottom: "16px" }}>
            <div>
              <div className="text-5xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, lineHeight: 1, color: "var(--color-navy)" }}>
                {pct}<span className="text-xl" style={{ color: "#888" }}>%</span>
              </div>
              <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#666", marginTop: "4px" }}>
                Technology foundation score
              </div>
              <div className="text-[11px]" style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", marginTop: "10px", background: bandBg, color: bandColor }}>
                {band}
              </div>
            </div>
            <div className="text-xs" style={{ flex: 1, fontFamily: "var(--font-sans)", color: "#666", lineHeight: 1.6, paddingBottom: "4px" }}>
              Based on {answeredCount} responses across 5 dimensions: technology visibility, security &amp; compliance, engineering delivery, strategy, and AI readiness.
            </div>
          </div>

          {/* AI assessment or fallback */}
          <LoadingIndicator message="Generating your personalized assessment..." visible={assessmentState === "loading"} />

          {assessmentState === "success" && assessment && (
            <div style={{ marginTop: "8px" }}>
              {renderAssessment(assessment)}
            </div>
          )}

          {(assessmentState === "error" || assessmentState === "idle") && (
            <>
              {assessmentState === "error" && (
                <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#666", background: "#f5f7fa", border: "0.5px solid #d0dce8", borderRadius: "6px", padding: "10px 12px", marginBottom: "12px" }}>
                  Personalized analysis unavailable. Please email{" "}
                  <a href="mailto:info@groundworktechnologyadvisors.com" style={{ color: "var(--color-blue)" }}>
                    info@groundworktechnologyadvisors.com
                  </a>{" "}
                  for a direct assessment.
                </div>
              )}

              {concerns.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Areas to address
                  </div>
                  {concerns.slice(0, 5).map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 12px", borderRadius: "6px", marginBottom: "6px", background: "#fff8f6", alignItems: "flex-start" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d85a30", marginTop: "4px", flexShrink: 0 }} />
                      <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#712b13", lineHeight: 1.55 }}>
                        {c.section} — {c.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {uniqueStrengths.length > 0 && (
                <div style={{ marginTop: "12px", marginBottom: "8px" }}>
                  <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Strengths
                  </div>
                  {uniqueStrengths.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 12px", borderRadius: "6px", marginBottom: "6px", background: "#eaf3de", alignItems: "flex-start" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3b6d11", marginTop: "4px", flexShrink: 0 }} />
                      <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#27500a", lineHeight: 1.55 }}>{s}</div>
                    </div>
                  ))}
                </div>
              )}

              {aiConcerns.length > 0 && (
                <div style={{ marginTop: "10px", padding: "14px 16px", background: "#f0f5fa", borderRadius: "8px", borderLeft: "3px solid var(--color-ltblue)" }}>
                  <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--color-navy)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                    AI readiness gaps identified
                  </div>
                  <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", lineHeight: 1.6 }}>
                    Your responses indicate gaps in AI visibility or governance. An AI Readiness Assessment would give you a clear picture of where AI is already in use, what governance is needed, and where genuine opportunity exists.{" "}
                    <Link href="/services/#ai-readiness-assessment" className="link-blue">
                      Learn more about this engagement.
                    </Link>
                  </div>
                </div>
              )}

              <div style={{ marginTop: "16px", padding: "14px 16px", background: "#e8f0f7", borderRadius: "8px", borderLeft: "3px solid var(--color-blue)" }}>
                <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--color-navy)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                  {recTitle}
                </div>
                <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", lineHeight: 1.6 }}>
                  {rec}
                </div>
              </div>
            </>
          )}

          {/* Formspree email capture */}
          <div style={{ marginTop: "20px", padding: "20px", background: "#f0f5fa", borderRadius: "8px", border: "0.5px solid #d0dce8" }}>
            <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--color-navy)", marginBottom: "4px" }}>
              Get your results by email
            </div>
            <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", marginBottom: "14px", lineHeight: 1.6 }}>
              Enter your details and we will send you a summary along with some thoughts on next steps based on your score.
            </p>

            {formState === "success" ? (
              <div className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "#3b6d11", background: "#eaf3de", padding: "10px 12px", borderRadius: "5px" }}>
                Thanks, we will be in touch shortly.
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {formState === "error" && (
                  <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#a32d2d", background: "#fcebeb", padding: "8px 10px", borderRadius: "5px" }}>
                    Something went wrong. Please email info@groundworktechnologyadvisors.com directly.
                  </div>
                )}
                <input
                  ref={nameRef}
                  type="text"
                  name="Full Name"
                  placeholder="Your name"
                  required
                  className="text-sm"
                  style={{ padding: "9px 12px", border: "0.5px solid #c0ccd8", borderRadius: "5px", fontFamily: "var(--font-sans)", background: "white", color: "var(--color-charcoal)" }}
                />
                <input
                  ref={companyRef}
                  type="text"
                  name="Company"
                  placeholder="Company name"
                  className="text-sm"
                  style={{ padding: "9px 12px", border: "0.5px solid #c0ccd8", borderRadius: "5px", fontFamily: "var(--font-sans)", background: "white", color: "var(--color-charcoal)" }}
                />
                <input
                  ref={emailRef}
                  type="email"
                  name="Email"
                  placeholder="Email address"
                  required
                  className="text-sm"
                  style={{ padding: "9px 12px", border: "0.5px solid #c0ccd8", borderRadius: "5px", fontFamily: "var(--font-sans)", background: "white", color: "var(--color-charcoal)" }}
                />
                <button
                  type="button"
                  onClick={() => handleFormSubmit(pct, band, bandBg, bandColor, rec, concernAreasSummary)}
                  disabled={formState === "submitting"}
                  className="text-sm"
                  style={{ padding: "10px", background: "var(--color-navy)", color: "white", border: "none", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", letterSpacing: "0.3px", opacity: formState === "submitting" ? 0.6 : 1 }}
                >
                  Send my results
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="text-xs" style={{ marginTop: "12px", textAlign: "center", fontFamily: "var(--font-sans)" }}>
            <button
              onClick={restart}
              className="text-xs"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-blue)", fontFamily: "var(--font-sans)", textDecoration: "underline", padding: 0 }}
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Questions view ───────────────────────────────────────────────
  let lastSection = "";

  return (
    <div style={{ maxWidth: "660px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "var(--color-navy)", borderRadius: "8px", padding: "20px 24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
          <svg width="44" height="32" viewBox="0 0 44 32" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="0" width="28" height="8" rx="2" fill="white" />
            <rect x="4" y="11" width="36" height="8" rx="2" fill="white" opacity="0.6" />
            <rect x="0" y="22" width="44" height="8" rx="2" fill="white" opacity="0.3" />
          </svg>
          <div>
            <div className="text-lg" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "white" }}>
              Technology Foundation Scorecard
            </div>
            <div className="text-[11px]" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Groundwork Technology Advisors
            </div>
          </div>
        </div>
        <div className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, borderTop: "0.5px solid rgba(255,255,255,0.15)", paddingTop: "10px" }}>
          12 questions for CEOs and CTOs. Takes about 3 minutes. Your score identifies where your technology environment is strong and where it may be holding your growth back.
        </div>
        <div style={{ height: "3px", background: "rgba(255,255,255,0.15)", borderRadius: "2px", marginTop: "14px" }}>
          <div style={{ height: "3px", background: "var(--color-ltblue)", borderRadius: "2px", width: `${(answeredCount / TOTAL_QUESTIONS) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <div className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.45)", marginTop: "5px", letterSpacing: "0.5px" }}>
          {answeredCount} of {TOTAL_QUESTIONS} answered
        </div>
      </div>

      {/* Questions */}
      {questions.map((q, i) => {
        const showSectionLabel = q.section !== lastSection;
        lastSection = q.section;
        return (
          <div key={i}>
            {showSectionLabel && (
              <div className="text-[9px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-blue)", margin: "20px 0 10px" }}>
                {q.section}
              </div>
            )}
            <div style={{ background: "white", border: "0.5px solid #d0dce8", borderRadius: "8px", padding: "14px 16px", marginBottom: "8px" }}>
              <div className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", lineHeight: 1.6, marginBottom: "10px", fontWeight: 600 }}>
                {i + 1}. {q.text}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {q.opts.map((opt, j) => {
                  const selected = answers[i] === j;
                  const isConcern = selected && opt.concern;
                  return (
                    <button
                      key={j}
                      onClick={() => selectAnswer(i, j)}
                      className="text-[11.5px]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        padding: "7px 10px",
                        borderRadius: "6px",
                        border: selected ? (isConcern ? "0.5px solid #d85a30" : "0.5px solid var(--color-blue)") : "0.5px solid #c0ccd8",
                        background: selected ? (isConcern ? "#fff3f0" : "#e8f0f7") : "#f5f7fa",
                        color: selected ? (isConcern ? "#712b13" : "var(--color-navy)") : "#444",
                        fontWeight: selected ? 600 : 400,
                        cursor: "pointer",
                        lineHeight: 1.4,
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Submit */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button
          type="button"
          onClick={handleSeeResults}
          className="text-sm"
          style={{ width: "100%", padding: "12px", background: "var(--color-navy)", color: "white", border: "none", borderRadius: "6px", fontFamily: "var(--font-sans)", fontWeight: 600, cursor: allAnswered ? "pointer" : "default", letterSpacing: "0.3px", opacity: allAnswered ? 1 : 0.4, transition: "opacity 0.2s" }}
        >
          See my results
        </button>
      </div>
    </div>
  );
}
