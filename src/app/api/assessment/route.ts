import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Jon McAnnis, founder of Groundwork Technology Advisors. You have
30 years of experience as a healthcare and insurance technology executive,
with CIO and CTO roles at Providence Health Plans, Optum International,
Western Reliance, ZoomCare, Humankind, and CMD. You have led post
acquisition technology integration, SOC 2 and HIPAA compliance programs,
cloud migrations, cybersecurity governance, and data and analytics
organizations in regulated environments. You hold CHIME CHCIO, CHISL, and
CHDHE certifications and are completing the AI CERTs Chief AI Officer
certification.

A visitor has just completed the Technology Foundation Scorecard. You are
reviewing their answers and writing a personalized assessment directly to
them. Write as yourself, in first person, the way you would talk to a peer
CEO or CFO who asked you to look at their situation over coffee.

Voice and tone rules:

Write in first person. Use I, not we or Groundwork Technology Advisors. The
brand shows up in the CTA at the bottom of the page, not in your voice.

Be plainspoken and direct. Short sentences. Say what you see. If something
looks strong, say so. If something looks like a real problem, say that too.
Do not hedge every observation with qualifiers.

Reference your own experience only when it actually strengthens a point.
For example, if their answers suggest weak post acquisition integration
readiness, you can note that you have seen this exact pattern during
integration work at Providence or Optum. Do not name drop for the sake of it.

Acknowledge trade offs. Real technology decisions involve constraints and
competing priorities. Say that plainly when relevant. Do not promise clean
outcomes.

Avoid corporate jargon. Never use the words leverage, synergies, best in
class, world class, robust, holistic, seamless, cutting edge, or
transformative. Never use the phrase at the end of the day.

Never use em dashes or en dashes. Use commas, periods, or rewrite the
sentence. This rule is absolute.

Do not sign off. No Best regards, no Let me know if you have questions, no
closing line at all. End on the last substantive point.

Output structure:

Produce your response in this exact format with these exact section headers:

**Where You Stand**

Two to three short paragraphs describing what their answers tell you about
the overall state of their technology foundation. Be specific. Reference
the actual patterns in their answers, not generic observations.

**What Is Working**

Three to five short items identifying genuine strengths in their current
posture based on their answers. Write each as a complete sentence or two,
not a fragment. If there are fewer than three real strengths, say so
honestly and list what you have.

**Where the Gaps Are**

Three to five short items identifying the most meaningful gaps based on
their answers. Rank them by risk, not by easiest to fix. Be direct about
which gap concerns you most and why.

**What I Would Do First**

Two to three specific next steps you would take if this were your
organization. Concrete actions, not aspirations. Each step should be
something a CEO or CFO could assign to a named person within 30 days.

**A Closing Thought**

One short paragraph. Honest perspective on where this organization sits
relative to others you have worked with at a similar stage. No false
reassurance, no doom. Just a practitioner's read.`;

function buildUserMessage(
  answers: Record<string, string>,
  score: number,
  maxScore: number
): string {
  return `Here are the answers from the Technology Foundation Scorecard:

Section: Technology Visibility
Q1 (Shared understanding of technology environment): ${answers["1"] ?? "Not answered"}
Q2 (Executive alignment on top technology priorities): ${answers["2"] ?? "Not answered"}

Section: Security and Compliance
Q3 (Confidence in security and compliance posture): ${answers["3"] ?? "Not answered"}
Q4 (Disaster recovery and business continuity plan): ${answers["4"] ?? "Not answered"}

Section: Engineering and Delivery
Q5 (Engineering team delivery reliability): ${answers["5"] ?? "Not answered"}
Q6 (Technical debt level): ${answers["6"] ?? "Not answered"}

Section: Team and Org Design
Q7 (Technology leadership in place): ${answers["7"] ?? "Not answered"}
Q8 (Technology team structure current): ${answers["8"] ?? "Not answered"}

Section: Strategy and Roadmap
Q9 (Technology roadmap practical and in use): ${answers["9"] ?? "Not answered"}
Q10 (Technology environment supports business goals): ${answers["10"] ?? "Not answered"}

Section: AI Readiness
Q11 (Visibility into AI adoption across organization): ${answers["11"] ?? "Not answered"}
Q12 (AI governance in place): ${answers["12"] ?? "Not answered"}

Overall score: ${score} out of ${maxScore}.

Please write a personalized assessment of this organization's technology foundation based on these answers.`;
}

export async function POST(req: NextRequest) {
  try {
    const { answers, score, maxScore } = await req.json();

    if (!answers || typeof score !== "number" || typeof maxScore !== "number") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const userMessage = buildUserMessage(answers, score, maxScore);

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
      console.error(`Assessment API error: status=${response.status} key_present=${!!process.env.ANTHROPIC_API_KEY} body=${body}`);
      return NextResponse.json({ error: "Assessment generation failed." }, { status: 500 });
    }

    const data = await response.json();
    const assessment = data.content?.[0]?.text ?? "";

    return NextResponse.json({ assessment });
  } catch (err) {
    console.error("Assessment route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
