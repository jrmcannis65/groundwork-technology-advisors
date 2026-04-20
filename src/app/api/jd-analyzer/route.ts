import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a senior technology leadership advisor at Groundwork Technology Advisors with 30 years of experience hiring and building technology organizations across healthcare, health insurance, behavioral health, and digital product companies.

A company has shared a job description for a senior technology leadership role at the Director level or above, such as Director of Engineering, Director of IT, VP of Engineering, VP of Technology, CTO, or CIO. They want to know whether the role is structured correctly for their stage of growth.

Analyze the job description and produce a structured assessment in this exact format:

**Role Overview**
One sentence summarizing what this role is actually asking for based on the job description.

**What This Role Gets Right**
Two to three specific observations about aspects of the role definition that are appropriate and well-constructed. Reference specific language from the JD.

**Structural Problems**
Two to four specific observations about problems with how the role is defined. Be direct. Common issues include: role scope is too broad or too narrow for the company size, individual contributor work mixed with executive responsibilities in ways that will not work, wrong seniority level for the stated requirements, missing accountability for key areas, or title that does not match the actual scope. Reference specific language from the JD.

**What the Right Profile Actually Looks Like**
Three to four bullet points describing what the ideal candidate for this company at this stage should actually look like, based on the company size and industry provided. Be specific and practical.

**Red Flags for Candidates**
Two to three things a strong candidate should probe in an interview based on how this role is written.

**Whether Groundwork Can Help**
One short paragraph explaining how GTA's Technology Role and Organizational Design service could help this company define the role more precisely before investing in a search. Keep it relevant to their specific situation.

Tone: Direct, honest, and useful. Write as a senior advisor who has hired for these roles before and knows where companies go wrong. Do not be falsely positive. If the role definition is poor, say so clearly. No em dashes anywhere. No corporate filler.

Length: Approximately 450 to 550 words total.`;

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
