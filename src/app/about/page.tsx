import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = generatePageMetadata(
  "About",
  "Groundwork Technology Advisors is a technology consulting firm founded by a senior technology executive with 30 years of experience leading IT and engineering organizations across healthcare services, health insurance, behavioral health, and digital product companies.",
  "/about/"
);

const experience = [
  {
    service: "Technology Ecosystem Assessment",
    detail:
      "The firm's principal has conducted technology landscape assessments at multiple organizations as part of CIO onboarding and strategic planning cycles, producing documented inventories of systems, integrations, vendor relationships, and technical debt that served as the foundation for multi-year technology roadmaps.",
  },
  {
    service: "Engineering Organization Assessment",
    detail:
      "Has built and led engineering organizations ranging from 20 to 300 people across eight CIO and CTO roles. Has assessed and restructured engineering teams, clarified roles and accountability frameworks, and implemented delivery practices that measurably improved output quality and predictability. At one organization, elevated system uptime from 75 percent to 98.5 percent through engineering culture and process improvements. At another, drove Agile delivery efficiency from 65 percent to 95 percent across a 300-person engineering team.",
  },
  {
    service: "Technology Role and Organizational Design",
    detail:
      "Has hired and developed technology leadership teams across multiple organizations at different stages of growth, from early-stage startups to established enterprise organizations. Has defined technology org structures and hiring profiles appropriate to each company's growth stage and strategic priorities.",
  },
  {
    service: "Security and Compliance Readiness",
    detail:
      "Has led SOC 2 attestation at three separate organizations while serving simultaneously as CISO and CIO. Has built NIST-aligned cybersecurity programs from the ground up. Has deep experience with HIPAA compliance in clinical and insurance environments, and has prepared organizations for regulatory audits and maintained compliance in CMS-regulated Medicare Advantage and Medicaid environments.",
  },
  {
    service: "Fractional CIO and CTO Services",
    detail:
      "Has served in CIO and CTO roles at organizations that did not previously have a technology executive, building technology functions and leadership capability in environments where none existed. Understands what it takes to provide senior technology direction in organizations with lean teams and constrained resources.",
  },
  {
    service: "Technology Roadmap Development",
    detail:
      "Has developed and executed multi-year technology roadmaps across multiple organizations, translating business strategy into technology investment priorities. Has led stakeholder alignment processes with C-suite partners including CEOs, CFOs, CMOs, and COOs to ensure roadmaps reflect organizational priorities rather than technology team assumptions.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>About</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Groundwork Technology Advisors is a technology consulting firm
            founded by a senior technology executive with 30 years of experience
            leading IT and engineering organizations across healthcare services,
            health insurance, behavioral health, and digital product companies.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div
            className="text-sm max-w-3xl space-y-5 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
          >
            <p>
              Groundwork Technology Advisors was founded by Jon McAnnis, a technology executive based in eastern Washington with 30 years of experience leading IT and engineering organizations.
            </p>
            <p>
              The firm's principal has served as CIO or CTO at eight
              organizations over a 30-year career, with engineering and
              technology teams ranging from 20 to 300 people. That experience
              spans a 55-site urgent and primary care system, a Medicare
              Advantage and Medicaid insurance company with approximately $2 to
              $3 billion in revenue, a behavioral health technology company
              serving employer clients, and several earlier-stage digital product
              and healthcare services companies.
            </p>
            <p>
              Across those roles, the work has included building technology
              organizations from scratch, restructuring teams that were
              underperforming, leading technology due diligence and
              post-acquisition integration, and maintaining compliance in
              heavily regulated clinical and insurance environments.
            </p>
            <p>
              Credentials include CHIME certification as a Healthcare CIO,
              Information Security Leader, and Digital Health Executive, a
              master's degree in Engineering and Technology Management, and the
              Chief AI Officer certification (AI CERTs, in progress).
            </p>
          </div>
        </div>
      </section>

      {/* Experience by service area */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="mb-12">Experience across each service area</h2>
          <div className="space-y-10">
            {experience.map((item, index) => (
              <div
                key={item.service}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 ${
                  index < experience.length - 1 ? "pb-10" : ""
                }`}
                style={
                  index < experience.length - 1
                    ? { borderBottom: "0.5px solid #d8e4ef" }
                    : {}
                }
              >
                <h3>{item.service}</h3>
                <p
                  className="text-sm lg:col-span-2 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why the firm exists */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="mb-6">Why Groundwork Technology Advisors exists</h2>
            <div
              className="text-sm space-y-5 leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
            >
              <p>
                Many small and mid-size companies are making technology
                decisions without a clear picture of where they stand today or a
                practical plan for where they are going. An experienced outside
                perspective can help with both.
              </p>
              <p>
                That is what Groundwork Technology Advisors is designed to
                provide. The firm works with a small number of clients at a time
                and structures engagements around specific deliverables: a
                written assessment, a practical roadmap, or consistent senior
                leadership on a retainer basis. Not open-ended
                relationships that extend beyond their useful life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        heading="Have a question or want to discuss a potential engagement?"
        body="Reach out by email or phone. Most conversations start with a brief call to understand the situation before discussing whether there is a useful fit."
      />
    </>
  );
}
