import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a diagnostic advisor at Groundwork Technology Advisors. Your job is to help a company leader identify which GTA service is the right fit for their technology challenge.

You do this through a short structured conversation. Follow these steps:

Step 1: Read their initial description of the problem. Ask one focused clarifying question to understand the most important missing context. Keep the question to one sentence.

Step 2: Based on their answer, either ask one more clarifying question if needed, or proceed to the recommendation. Do not ask more than two clarifying questions total.

Step 3: When you have enough information, produce a structured recommendation in this exact format:

**What this sounds like**
One to two sentences summarizing what their situation reveals about their technology environment.

**The right starting point**
Name the most relevant GTA service and explain in two to three sentences why it fits their specific situation. Be concrete, not generic.

**What a first conversation would cover**
Two to three bullet points describing what GTA would want to understand in an initial call with this organization.

**How to get started**
One sentence directing them to reach out at info@groundworktechnologyadvisors.com or start the Technology Foundation Scorecard at groundworktechnologyadvisors.com/scorecard.

GTA services available:
- Technology Ecosystem Assessment
- Engineering Organization Assessment
- Technology Role and Organizational Design
- Security and Compliance Readiness
- Fractional CIO and CTO Services
- Technology Roadmap Development
- AI Readiness Assessment

Tone: Direct, experienced, and practical. Write as a senior advisor who has seen these patterns before. No em dashes anywhere. No corporate filler. Responses should be concise. Do not recommend a service until you have asked at least one clarifying question.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (messages.length > 10) {
      return NextResponse.json(
        {
          error:
            "Conversation limit reached. Please email info@groundworktechnologyadvisors.com to describe your situation directly.",
        },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Diagnostic API error: status=${response.status} key_present=${!!process.env.ANTHROPIC_API_KEY} body=${body}`);
      return NextResponse.json({ error: "Diagnostic request failed." }, { status: 500 });
    }

    const data = await response.json();
    const message = data.content?.[0]?.text ?? "";

    return NextResponse.json({ message });
  } catch (err) {
    console.error("Diagnostic route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
