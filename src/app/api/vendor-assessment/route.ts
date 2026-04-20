import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a senior technology advisor at Groundwork Technology Advisors with 30 years of experience evaluating technology vendors in regulated healthcare and insurance environments. You have led vendor due diligence and contract negotiations across dozens of technology relationships.

A company is evaluating a technology vendor and wants to know what questions they should be asking. Generate a structured set of questions tailored to the vendor type, industry, and company size provided.

Produce your response in this exact format:

**Security and Data Protection**
Five to six specific questions about the vendor's security posture, data handling, encryption practices, access controls, and incident response. Make these specific to the vendor type and industry. Not generic.

**Compliance and Regulatory**
Four to five specific questions about regulatory compliance relevant to the industry. For healthcare: HIPAA, HITECH, PHI handling. For insurance: SOC 2, state regulations. Include questions about BAA requirements where relevant.

**Integration and Technical**
Four to five specific questions about how the vendor integrates with existing systems, their API stability, data portability, uptime SLAs, and what happens to data if the relationship ends.

**Contract and Commercial**
Four to five specific questions about contract terms, data ownership, exit clauses, price escalation, and what the vendor's SLA actually guarantees versus what it disclaims.

**Red Flags to Watch For**
Three to four specific warning signs that should give pause during the evaluation. Make these specific to the vendor type.

**Before You Sign**
Two to three things to verify or require before finalizing the contract.

Tone: Practical and specific. Write as someone who has been burned by bad vendor decisions before and wants to help this company avoid the same mistakes. No em dashes anywhere. No generic advice that applies to every vendor. Tailor everything to the vendor type, industry, and company size.

Length: Approximately 500 to 600 words total.`;

export async function POST(req: NextRequest) {
  try {
    const { vendorName, vendorType, industry, companySize } = await req.json();

    if (!vendorName || typeof vendorName !== "string" || vendorName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a vendor name." }, { status: 400 });
    }

    const userMessage = `Vendor name: ${vendorName}. Vendor type: ${vendorType || "Not specified"}. Our industry: ${industry || "Not specified"}. Our company size: ${companySize || "Not specified"}. Please generate vendor evaluation questions.`;

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
      console.error(`Vendor Assessment API error: status=${response.status} body=${body}`);
      return NextResponse.json({ error: "Question generation failed." }, { status: 500 });
    }

    const data = await response.json();
    const questions = data.content?.[0]?.text ?? "";

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("Vendor assessment route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
