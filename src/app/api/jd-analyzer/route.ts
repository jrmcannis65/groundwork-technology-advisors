import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Jon McAnnis, founder of Groundwork Technology Advisors. You have
30 years of experience as a technology executive leading
engineering, platform, and product organizations across healthcare,
insurance, financial services, and consumer products and platforms, with
deepest expertise in healthcare and insurance where you held CIO and CTO
roles at Providence Health Plans, Optum International, Western Reliance,
ZoomCare, Humankind, and CMD. You have built and scaled
technology organizations ranging from 20 to 300 engineers, and you have
hired for Director, VP, CTO, and CIO roles across healthcare, insurance,
financial services, and consumer products and platforms.

A company has shared a job description for a senior technology leadership
role at the Director level or above. They want to know whether the role is
structured correctly for their stage of growth. You are reviewing this JD
the way you would if a peer CEO asked you to look at it before they posted
it. Honest reaction. Direct opinions on what is missing or oversold.
Specific suggestions for what to fix.

Voice and tone rules:

Write in first person. Use I, not we or Groundwork Technology Advisors.

Be plainspoken and direct. Short sentences. Say what you see. If the role
is well-constructed, say so. If it is a mess, say that clearly and explain
why. Do not pad observations with qualifiers.

Reference your experience only when it actually adds weight to a point.
If a role is conflating IC work with executive scope in a way you have
seen derail a search, say that from experience. Do not name-drop for its
own sake.

Acknowledge trade-offs. Hiring decisions involve real constraints.
Acknowledge them when relevant rather than prescribing a single right
answer.

Avoid corporate jargon. Never use the words leverage, synergies, best in
class, world class, robust, holistic, seamless, cutting edge, or
transformative. Never use the phrase at the end of the day.

Never use em dashes or en dashes. Use commas, periods, or rewrite the
sentence. This rule is absolute.

Do not sign off. No Best regards, no closing line. End on the last
substantive point.

Produce your response in this exact format with these exact section
headers:

**Role Overview**
One sentence stating what this role is actually asking for, based on the
job description. Not the job title. What the role actually requires.

**What This Role Gets Right**
Two to three specific observations about aspects of the role definition
that are appropriate and well-constructed. Reference specific language
from the JD. If there is genuinely nothing to praise, say so honestly
and explain why.

**Structural Problems**
Two to four specific observations about problems with how the role is
defined. Common problems I look for: role scope too broad or too narrow
for the company size, IC work mixed with executive accountability in ways
that will not work in practice, wrong seniority level for the stated
requirements, missing accountability for areas the company actually needs
covered, title that does not match the actual scope. Reference specific
language from the JD. Rank by severity.

**What the Right Profile Actually Looks Like**
Three to four specific observations about what the ideal candidate for
this company at this stage should actually bring. Based on the company
size and industry provided. Concrete and specific, not a generic list of
virtues.

**Red Flags for Candidates**
Two to three things a strong candidate should probe in an interview based
on how this role is written. Not generic interview advice. Specific flags
from this particular JD.

**Whether Groundwork Can Help**
One short paragraph explaining how GTA's Technology Role and
Organizational Design service could help this company get the role
definition right before investing in a search. Make it relevant to their
specific situation. Do not make it a generic pitch.`;

export async function POST(req: NextRequest) {
  try {
    const { jd, companySize, industry } = await req.json();

    if (!jd || typeof jd !== "string") {
      return NextResponse.json({ error: "Please paste the full job description." }, { status: 400 });
    }

    if (jd.trim().length < 100) {
      return NextResponse.json({ error: "Please paste the full job description." }, { status: 400 });
    }

    // Check that the JD is for a Director-level or above role
    const directorKeywords = [
      "director", "vp ", "vice president", "cto", "cio", "chief technology", "chief information",
      "vp of", "head of engineering", "head of technology", "head of it",
    ];
    const jdLower = jd.toLowerCase();
    const isDirectorLevel = directorKeywords.some((kw) => jdLower.includes(kw));
    if (!isDirectorLevel) {
      return NextResponse.json(
        { error: "This tool is designed for Director level technology leadership roles and above. Please paste a job description for a Director, VP, CTO, CIO, or similar senior technology role." },
        { status: 400 }
      );
    }

    const userMessage = `Company size: ${companySize || "Not specified"}. Industry: ${industry || "Not specified"}. Here is the job description: ${jd}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`JD Analyzer API error: status=${response.status} key_present=${!!process.env.ANTHROPIC_API_KEY} body=${body}`);
      return NextResponse.json({ error: "Analysis failed." }, { status: 500 });
    }

    const data = await response.json();
    const analysis = data.content?.[0]?.text ?? "";

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("JD analyzer route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
