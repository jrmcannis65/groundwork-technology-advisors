export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  icon: string; // SVG path data
  graphic: string; // filename in /assets/brand/services/
  articleSlug: string; // slug in /articles/
};

export const services: Service[] = [
  {
    id: "technology-ecosystem-assessment",
    title: "Technology Ecosystem Assessment",
    shortDescription:
      "A structured review of your current technology environment covering systems, integrations, vendors, debt, and gaps. Delivered as a prioritized written document.",
    fullDescription: [
      "A structured review of a company's current technology environment including systems, integrations, vendor relationships, technical debt, and known gaps. Delivered as a written document with findings organized by priority.",
      "This engagement is useful for companies that need a clear, objective picture of where their technology stands before making investment decisions, hiring technology leadership, or preparing for a transaction. It is not a sales document and does not advocate for a particular vendor or platform. The goal is an honest inventory of where things are, with observations on what matters most.",
    ],
    icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3",
    graphic: "svc_ecosystem.svg",
    articleSlug: "technology-assessment",
  },
  {
    id: "engineering-organization-assessment",
    title: "Engineering Organization Assessment",
    shortDescription:
      "A review of your engineering team's structure, delivery practices, Agile maturity, and DevOps practices, with specific observations and recommendations.",
    fullDescription: [
      "A review of the engineering team's structure, delivery practices, Agile maturity, DevOps practices, and capacity relative to what the organization is asking of it. Includes specific observations and recommendations on role clarity, team structure, and development priorities.",
      "Useful for leadership teams that want better visibility into their technology organization and an outside perspective on what is and is not working. The engagement involves structured conversations with engineering leaders and, where appropriate, individual contributors, along with a review of how work is planned, tracked, and delivered.",
    ],
    icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
    graphic: "svc_engineering_org.svg",
    articleSlug: "engineering-team-performance",
  },
  {
    id: "technology-role-organizational-design",
    title: "Technology Role and Organizational Design",
    shortDescription:
      "Helping companies think through the right technology roles, reporting structures, and hiring profiles for their current stage of growth.",
    fullDescription: [
      "Helping companies think through the right technology roles, reporting structures, and hiring profiles for their current stage of growth. Includes a review of the current structure, identification of gaps, and recommendations on role definitions and what to look for in future technology hires.",
      "Particularly useful for companies that are not sure whether their current technology leadership structure matches what the business needs next. Many companies reach a point where they have outgrown their current setup but are not certain what the right next step looks like. This engagement helps clarify that question and produces concrete, specific guidance rather than generic frameworks.",
    ],
    icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605",
    graphic: "svc_role_design.svg",
    articleSlug: "when-to-hire-cto",
  },
  {
    id: "security-compliance-readiness",
    title: "Security and Compliance Readiness",
    shortDescription:
      "A practical review of your posture against SOC 2, HIPAA, or NIST requirements. Delivered as a gap inventory with a prioritized list of recommended next steps.",
    fullDescription: [
      "A review of a company's current posture against SOC 2, HIPAA, or NIST requirements depending on what applies to the business. Delivered as a gap inventory with a prioritized list of recommended next steps.",
      "This is not a formal audit and does not produce a compliance certification. It is a practical assessment of where the company stands and what it would take to get audit ready. For companies that have never been through a formal compliance process, this engagement provides a realistic picture of the effort involved and where to focus first.",
    ],
    icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    graphic: "svc_security.svg",
    articleSlug: "soc2-audit-preparation",
  },
  {
    id: "fractional-cio-cto-services",
    title: "Fractional CIO and CTO Services",
    shortDescription:
      "Part-time senior technology leadership on a monthly retainer for companies that are not ready for a full-time executive hire.",
    fullDescription: [
      "Part-time senior technology leadership on a monthly retainer for companies that are not ready for a full-time executive hire. The scope is defined at the start of each engagement based on what the company actually needs, which varies considerably depending on team size, growth stage, and current challenges.",
      "Typically structured at one to two days per week. Some clients need help managing an existing team and setting direction. Others need a senior technology voice in leadership conversations or board meetings. Others are in the middle of a technology transition and need consistent oversight until it is complete. The engagement model is flexible by design because the needs are rarely identical.",
    ],
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z",
    graphic: "svc_fractional.svg",
    articleSlug: "fractional-cio",
  },
  {
    id: "technology-roadmap-development",
    title: "Technology Roadmap Development",
    shortDescription:
      "Working with your leadership team to develop a practical technology roadmap aligned to business priorities. Designed to be actionable by your existing team, not aspirational.",
    fullDescription: [
      "Working with a company's leadership team to develop a practical technology roadmap aligned to business priorities. Starts with structured conversations with key stakeholders to understand what they need from technology, synthesizes those inputs into a prioritized view of technology investments, and produces a phased roadmap organized into near-term actions and longer-term initiatives.",
      "The roadmap is designed to be actionable by the existing team rather than aspirational. The goal is not a slide deck that gets filed away. It is a working document that gives the organization a shared, realistic picture of where technology is going and why.",
    ],
    icon: "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
    graphic: "svc_roadmap.svg",
    articleSlug: "technology-roadmap",
  },
  {
    id: "ai-readiness-assessment",
    title: "AI Readiness Assessment",
    shortDescription:
      "A structured assessment of where your organization stands with AI today: what tools are in use, what governance is missing, and whether your data environment is positioned to get real value from AI investment.",
    fullDescription: [
      "AI is showing up in your organization whether you planned for it or not. Your staff is using it daily. Your vendors are embedding it in the tools you already pay for. The question is no longer whether AI is part of your technology environment. It is whether you have the visibility, governance, and readiness to use it well and avoid the risks that come with using it poorly.",
      "This engagement delivers a written assessment with specific, prioritized recommendations your leadership team can act on. It is structured as a fixed-fee project with scope and fee agreed before work begins, and is typically completed in 30 to 45 days.",
    ],
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
    graphic: "svc_ai.svg",
    articleSlug: "ai-readiness",
  },
];
