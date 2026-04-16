"use client";
import { useState } from "react";
import Image from "next/image";

const tagStyles: Record<string, { bg: string; color: string }> = {
  ai:          { bg: "#e8f0f7", color: "#1a3a5c" },
  security:    { bg: "#fff3f0", color: "#712b13" },
  strategy:    { bg: "#eaf3de", color: "#27500a" },
  leadership:  { bg: "#faeeda", color: "#633806" },
  engineering: { bg: "#f0eeff", color: "#3c3489" },
};

const tagLabels: Record<string, string> = {
  ai: "AI readiness",
  security: "Security",
  strategy: "Strategy",
  leadership: "Leadership",
  engineering: "Engineering",
};

const bgImages: Record<string, string> = {
  ai:          "/assets/brand/backgrounds/bg_dotgrid.svg",
  security:    "/assets/brand/backgrounds/bg_circuit.svg",
  strategy:    "/assets/brand/backgrounds/bg_topo.svg",
  leadership:  "/assets/brand/backgrounds/bg_columns.svg",
  engineering: "/assets/brand/backgrounds/bg_nodes.svg",
};

type Perspective = {
  category: string;
  date: string;
  take: string;
  commentary: string;
  sourceTitle: string;
  sourceHref: string;
  sourcePublisher: string;
};

const perspectives: Perspective[] = [
  {
    category: "ai",
    date: "April 2026",
    take: "Most companies will discover their AI exposure through a compliance question they cannot answer, not a strategic planning session.",
    commentary: "Shadow AI adoption follows the same pattern as shadow IT from fifteen years ago, except the data exposure risks are considerably higher. Staff are using consumer AI tools with sensitive client data because the tools are good and no one told them not to. The problem is not malice; it is the absence of policy in a fast-moving environment. The organizations that get ahead of this are not the ones that ban AI outright. They are the ones that define what is and is not acceptable, audit what is already in use, and set clear expectations before something goes wrong.",
    sourceTitle: "The Risks of Shadow AI in the Workplace",
    sourceHref: "https://rbj.net/2026/03/10/managing-shadow-ai-workplace/",
    sourcePublisher: "Rochester Business Journal",
  },
  {
    category: "security",
    date: "April 2026",
    take: "SOC 2 is not a checkbox. Organizations that treat it as one find out the hard way.",
    commentary: "I have guided three organizations through SOC 2 Type II. In each case, leadership came in thinking it was primarily a documentation project. It is not. SOC 2 requires that controls are designed, implemented, and operating effectively over time. That means process changes, tooling decisions, and sustained operational discipline, not just a policy binder. The organizations that succeed are the ones that treat the readiness process as a genuine improvement to their security posture, not a certification to hang on the wall. The ones that treat it as paperwork usually fail their first audit.",
    sourceTitle: "SOC 2 Compliance in 2026: What Startups and SMEs Need to Know",
    sourceHref: "https://securifyai.co/blog/soc-2-compliance-in-2026-what-startups-smes-need-to-know/",
    sourcePublisher: "SecurifyAI",
  },
  {
    category: "strategy",
    date: "April 2026",
    take: "A technology roadmap that lives in a shared drive is not a roadmap. It is a document that someone spent time creating.",
    commentary: "The difference between a roadmap that gets used and one that does not comes down to two things: who was in the room when it was built, and who owns it after it is delivered. When the roadmap is built by a consultant working from interviews and handed to a leadership team that was not deeply involved in the synthesis, it rarely survives first contact with Q2 priorities. The roadmap has to reflect how the organization actually makes decisions, not how it says it does. That means the building process matters as much as the output.",
    sourceTitle: "Whatever Happened to the Three-Year IT Roadmap?",
    sourceHref: "https://www.cio.com/article/3618308/whatever-happened-to-the-three-year-it-roadmap.html",
    sourcePublisher: "CIO.com",
  },
  {
    category: "leadership",
    date: "March 2026",
    take: "The decision to hire a fractional CIO is not primarily about cost. It is about what stage the company is at and what kind of problem needs solving.",
    commentary: "A full-time CIO hire makes sense when you need someone to build and own a technology organization over the long term. A fractional arrangement makes sense when you need experienced judgment applied to a specific set of decisions over a defined period. These are not the same thing, and using the wrong model creates problems in both directions. I have seen companies bring in full-time leaders too early, before the scope of the role was clear, and I have seen companies use fractional arrangements to avoid making a hire they actually needed. The starting question is not how much the person will cost. It is what outcome you are trying to produce and over what timeframe.",
    sourceTitle: "How to Make Fractional Leadership Work",
    sourceHref: "https://hbr.org/podcast/2025/08/how-to-make-fractional-leadership-work",
    sourcePublisher: "Harvard Business Review",
  },
  {
    category: "engineering",
    date: "March 2026",
    take: "Technical debt is not a developer problem. When it gets bad enough, it becomes a leadership problem that shows up in financial results.",
    commentary: "Non-technical leaders often hear about technical debt as an internal engineering complaint, and they tune it out. That is a mistake. Technical debt accumulates when teams make expedient decisions under deadline pressure and never revisit them. At a certain threshold it stops being a background friction and starts affecting delivery timelines, incident rates, and the ability to hire and retain good engineers. By the time it shows up in missed commitments and escalating infrastructure costs, the underlying problem has been compounding for years. The conversation leaders should be having is not how to eliminate debt. It is how to understand the current level and what the team needs to stop making it worse.",
    sourceTitle: "How to Manage Tech Debt in the AI Era",
    sourceHref: "https://sloanreview.mit.edu/article/how-to-manage-tech-debt-in-the-ai-era/",
    sourcePublisher: "MIT Sloan Management Review",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI readiness" },
  { key: "security", label: "Security" },
  { key: "strategy", label: "Strategy" },
  { key: "leadership", label: "Leadership" },
  { key: "engineering", label: "Engineering" },
];

export default function PerspectivesContent() {
  const [active, setActive] = useState("all");

  const visible = active === "all" ? perspectives : perspectives.filter((p) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              letterSpacing: "0.8px",
              padding: "6px 14px",
              borderRadius: "4px",
              border: active === f.key ? "0.5px solid var(--color-navy)" : "0.5px solid #c0ccd8",
              background: active === f.key ? "var(--color-navy)" : "white",
              color: active === f.key ? "white" : "var(--color-gray)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Perspective cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((p, i) => {
          const tag = tagStyles[p.category];
          return (
            <div
              key={i}
              style={{
                background: "white",
                border: "0.5px solid #d0dce8",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card image */}
              <Image
                src={bgImages[p.category]}
                alt=""
                width={400}
                height={140}
                style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px 6px 0 0", display: "block" }}
                aria-hidden="true"
              />

              {/* Card content */}
              <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Tag + date */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="text-[9px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", padding: "3px 8px", borderRadius: "3px", background: tag.bg, color: tag.color }}>
                    {tagLabels[p.category]}
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "#999" }}>{p.date}</span>
                </div>

                {/* Take */}
                <p className="text-sm font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--color-navy)", lineHeight: 1.4 }}>
                  {p.take}
                </p>

                {/* Commentary */}
                <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", lineHeight: 1.7, flex: 1 }}>
                  {p.commentary}
                </p>

                {/* Source card */}
                <a
                  href={p.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "4px",
                    padding: "10px 12px",
                    background: "var(--color-pale)",
                    border: "0.5px solid #d0dce8",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "#5a7a99", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "2px" }}>
                      {p.sourcePublisher}
                    </p>
                    <p className="text-xs" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.sourceTitle}
                    </p>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="var(--color-blue)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social band */}
      <div
        style={{
          background: "var(--color-navy)",
          borderRadius: "8px",
          padding: "24px 28px",
          marginTop: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p className="text-sm" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            Follow for more
          </p>
          <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            Short takes on technology leadership posted regularly on LinkedIn.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <a
            href="https://www.linkedin.com/company/groundwork-technology-advisors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", letterSpacing: "0.3px", border: "0.5px solid rgba(255,255,255,0.2)", color: "white" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
