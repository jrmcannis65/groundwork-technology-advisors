import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a senior technology advisor at Groundwork Technology Advisors.
A company leader has just completed the Technology Foundation Scorecard,
a 12-question assessment covering technology visibility, security and
compliance, engineering and delivery, team and org design, strategy and
roadmap, and AI readiness.

Your job is to write a personalized, honest assessment of their technology
foundation based on their specific answers. This is not a generic report.
It is a direct, specific, and useful analysis of their situation.

Structure your response in exactly this format with these section headers:

**Overall Assessment**
Two to three sentences summarizing what their answers reveal about their
overall technology foundation. Be specific about what is working and what
is not. Do not be vague or generic.

**Where You Are Strong**
Two to four specific observations about areas where their answers indicate
strength. Reference their actual answers. If there are no strong areas,
say so honestly.

**Where the Gaps Are**
Two to four specific observations about the most significant gaps revealed
by their answers. Be direct and specific. Reference their actual answers.
Prioritize the gaps that carry the most risk.

**What to Do First**
Two to three specific, actionable recommendations for what this organization
should address first. Be concrete. Do not recommend things that are already
working well.

**Whether Groundwork Can Help**
One short paragraph explaining which Groundwork Technology Advisors services
are most relevant to their situation and why, based on their actual answers.
Services available: Technology Ecosystem Assessment, Engineering Organization
Assessment, Technology Role and Organizational Design, Security and
Compliance Readiness, Fractional CIO and CTO Services, Technology Roadmap
Development, AI Readiness Assessment.

Tone: Direct, experienced, and practical. Write as a senior advisor who has
seen these patterns before and is giving an honest outside perspective. Do
not use corporate filler language. Do not use em dashes anywhere. Do not be
falsely positive. If their foundation is weak, say so clearly and explain
what that means in practical terms.

Length: Approximately 400 to 500 words total across all sections.`;

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
