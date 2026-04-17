import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import HowWeWorkForm from "@/components/HowWeWorkForm";

export const metadata: Metadata = generatePageMetadata(
  "How Technology Consulting Engagements Work",
  "Fixed-fee assessments with specific deliverables. Every engagement starts with a conversation to make sure the scope is right before any work begins.",
  "/how-we-work/"
);

const proofPoints = [
  {
    label: "M&A technology integration",
    summary: "Led technology due diligence and post-close integration for a multi-entity healthcare acquisition.",
    bullets: [
      "The combined entity had two separate IT organizations, overlapping systems, unresolved vendor contracts, and no shared view of the technology environment across both entities.",
      "Scoped the combined environment, identified redundancies and gaps, and assessed vendor concentration risk across both organizations.",
      "Produced the integration roadmap the merged organization used to rationalize systems and consolidate vendors over 18 months.",
    ],
  },
  {
    label: "SOC 2 Type II readiness",
    summary: "Guided three separate organizations through SOC 2 Type II readiness programs, each starting from an informal security posture.",
    bullets: [
      "Each organization was starting with no prior audit experience and an unclear picture of where their gaps were relative to the Trust Services Criteria.",
      "Ran a gap assessment against the applicable criteria, produced a prioritized remediation plan, and managed the readiness process through to audit for each organization.",
      "Each engagement resulted in successful SOC 2 Type II attestation within the agreed timeline.",
    ],
  },
  {
    label: "Technology assessment for a growing nonprofit",
    summary: "Conducted a full technology ecosystem assessment for a regional behavioral health organization with 300-plus staff following a major EHR transition.",
    bullets: [
      "Leadership had no consolidated view of the technology environment after the EHR transition and needed a reliable baseline before setting priorities.",
      "Conducted structured interviews with executive and IT staff, reviewed systems and vendor relationships, and assessed compliance posture across HIPAA and related requirements.",
      "Delivered a landscape document, compliance gap review, executive priorities map, and 18-month roadmap within 90 days. Leadership described it as the first time they had a single, accurate picture of their technology environment.",
    ],
  },
];

const deliverables = [
  {
    num: "1",
    title: "Technology landscape document",
    desc: "A written inventory of every system in use: what it does, how it connects to other systems, where the known gaps and pain points are, and what the organization does and does not control.",
  },
  {
    num: "2",
    title: "Compliance and security review",
    desc: "A structured review of the organization's posture across HIPAA, applicable privacy regulations, and disaster recovery and business continuity. Delivered as a gap inventory with a prioritized action list.",
  },
  {
    num: "3",
    title: "IT team and organizational review",
    desc: "Structured conversations with each member of the IT team to understand workload, capacity, strengths, and gaps. The review surfaces role clarity issues and structural adjustments that can make the existing team more effective without adding headcount.",
  },
  {
    num: "4",
    title: "Executive priorities map",
    desc: "Individual conversations with each executive to understand what they need most from technology in their own words. The process surfaces alignment and misalignment that has been implicit but never documented, giving the leadership team a shared language for technology conversations.",
  },
  {
    num: "5",
    title: "18-month technology roadmap",
    desc: "A practical roadmap organized into near-term actions the existing team can begin immediately, medium-term initiatives addressing the most important gaps, and longer-term investments requiring additional planning. Designed to be realistic and executable from day one.",
  },
];

const timeline = [
  {
    period: "Weeks 1, 3",
    focus: "Introductory conversations with executive team and IT staff. Review of current systems, documentation, and known issues.",
    output: "Preliminary landscape notes shared with CEO",
  },
  {
    period: "Weeks 4, 6",
    focus: "Deeper dives into system configuration, compliance posture, vendor relationships, and team capacity.",
    output: "Executive priorities map drafted for feedback",
  },
  {
    period: "Weeks 7, 9",
    focus: "Synthesis of findings. Draft deliverables prepared and reviewed informally with CEO before finalization.",
    output: "Draft roadmap shared with CEO for review",
  },
  {
    period: "Weeks 10, 12",
    focus: "Final deliverables completed. Presentation to leadership team.",
    output: "All five deliverables delivered",
  },
];

const outcomes = [
  {
    label: "Clarity",
    text: "A complete, written picture of the technology environment shared across the full leadership team",
  },
  {
    label: "Prioritization",
    text: "A ranked list of technology investments with clear rationale, ending the debate about where to focus first",
  },
  {
    label: "Compliance confidence",
    text: "A documented gap inventory and action plan giving leadership an honest picture of their risk posture",
  },
  {
    label: "Team alignment",
    text: "Surfaced misalignment between what executives needed from technology and what the IT team understood those needs to be",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "280px",
            backgroundImage: "url('/assets/brand/backgrounds/bg_topo.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.07,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18" style={{ position: "relative" }}>
          <p className="section-label mb-3">Scope and methodology</p>
          <h1 style={{ color: "white" }}>How We Work</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            The scope, deliverables, and timeline below are grounded in real engagements conducted
            over 30 years in technology leadership roles across healthcare, health insurance, and
            behavioral health organizations.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-8"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)", paddingTop: "16px" }}
          >
            {[
              { label: "Typical engagement type", value: "Fixed-fee assessment" },
              { label: "Typical duration", value: "60 to 90 days" },
              { label: "Who it is for", value: "CEOs and CTOs, 50 to 500 staff" },
              { label: "Starting point", value: "A brief conversation to confirm fit" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", marginBottom: "2px" }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "white", fontWeight: 600 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Background</p>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-charcoal)",
                lineHeight: 1.75,
                borderLeft: "3px solid var(--color-blue)",
                paddingLeft: "16px",
              }}
            >
              The methodology described on this page is grounded in real experience. As an incoming
              CIO at a regional health plan that had recently completed an acquisition, one of the
              first responsibilities was a structured assessment of the combined technology environment
              across both entities. That engagement shaped the approach Groundwork now brings to
              similar situations. The deliverables, timeline, and outcomes described here reflect what
              that work produced and what it made possible.
            </p>
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-2">Experience behind the approach</p>
          <p
            className="text-sm mb-8 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", lineHeight: 1.7 }}
          >
            The methodology described on this page draws from engagements like these, conducted over 30 years in technology leadership.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {proofPoints.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "white",
                  border: "0.5px solid #d0dce8",
                  borderTop: "2.5px solid var(--color-blue)",
                  borderRadius: "8px",
                  padding: "18px 20px",
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    lineHeight: 1.35,
                    marginBottom: "8px",
                  }}
                >
                  {p.label}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gray)",
                    lineHeight: 1.7,
                    marginBottom: "10px",
                  }}
                >
                  {p.summary}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {p.bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "7px" }} />
                      <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", lineHeight: 1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The situation */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">The situation</p>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-charcoal)",
                lineHeight: 1.75,
                borderLeft: "3px solid var(--color-blue)",
                paddingLeft: "16px",
              }}
            >
              The organization was a regional health plan that had recently acquired a smaller
              competitor. The combined entity had two separate IT organizations, overlapping systems,
              unresolved vendor contracts, and a technology roadmap that had been paused during the
              deal. Leadership needed a clear picture of what they had, what was at risk, and what to
              prioritize before committing to a post-merger integration plan. No single person had
              visibility across both environments, and the board was asking questions the existing
              team could not yet answer.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-4">What a 90-day assessment engagement delivers</p>
          {/* Note box */}
          <div
            className="max-w-3xl mb-8"
            style={{
              background: "white",
              border: "0.5px solid #d0dce8",
              borderLeft: "3px solid var(--color-ltblue)",
              borderRadius: "6px",
              padding: "14px 18px",
            }}
          >
            <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", lineHeight: 1.65 }}>
              The following describes the scope and deliverables from that engagement, structured as a replicable approach Groundwork brings to similar situations. Organization details have been generalized. Actual scope, timeline, and fee for any Groundwork engagement are agreed upon before work begins.
            </p>
          </div>
          <div className="max-w-3xl space-y-4">
            {deliverables.map((d) => (
              <div
                key={d.num}
                style={{
                  background: "white",
                  border: "0.5px solid #d0dce8",
                  borderRadius: "8px",
                  padding: "16px 18px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="text-[11px]"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#e8f0f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  {d.num}
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      marginBottom: "4px",
                    }}
                  >
                    {d.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-gray)",
                      lineHeight: 1.65,
                    }}
                  >
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-4">How the work typically unfolds</p>
          <div className="max-w-3xl overflow-x-auto">
            <table className="text-xs" style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr>
                  {["Timeframe", "Focus", "Output"].map((h) => (
                    <th
                      key={h}
                      className="text-[10px]"
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        background: "#e8f0f7",
                        color: "var(--color-navy)",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeline.map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: i < timeline.length - 1 ? "0.5px solid #d0dce8" : "none",
                        color: "var(--color-blue)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.period}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: i < timeline.length - 1 ? "0.5px solid #d0dce8" : "none",
                        color: "var(--color-charcoal)",
                        verticalAlign: "top",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.focus}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: i < timeline.length - 1 ? "0.5px solid #d0dce8" : "none",
                        color: "var(--color-charcoal)",
                        verticalAlign: "top",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-4">Engagement models</p>
          <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Fixed-fee project",
                desc: "A defined assessment with a specific written deliverable at the end. Scope, timeline, and fee are agreed upon before work begins. Appropriate for most assessment engagements.",
              },
              {
                title: "Monthly retainer",
                desc: "Ongoing fractional CIO or CTO services at a defined time commitment per week. Scope is set at the start of the engagement and revisited as the relationship evolves.",
              },
              {
                title: "Hourly or daily advisory",
                desc: "For companies that need a senior technology perspective on a specific decision or situation without committing to a larger engagement. Available by the hour or day.",
              },
            ].map((m) => (
              <div
                key={m.title}
                style={{
                  background: "white",
                  border: "0.5px solid #d0dce8",
                  borderTop: "2.5px solid var(--color-blue)",
                  borderRadius: "8px",
                  padding: "18px 20px",
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    lineHeight: 1.35,
                    marginBottom: "10px",
                  }}
                >
                  {m.title}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gray)",
                    lineHeight: 1.7,
                  }}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-4">What organizations walk away with</p>
          <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                style={{
                  background: "var(--color-pale)",
                  borderRadius: "6px",
                  padding: "14px 16px",
                }}
              >
                <p
                  className="text-[10px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "#5a7a99",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {o.label}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-navy)",
                    lineHeight: 1.55,
                    fontWeight: 600,
                  }}
                >
                  {o.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/services/" className="link-blue text-sm font-medium">
              View all services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <HowWeWorkForm />
    </>
  );
}
