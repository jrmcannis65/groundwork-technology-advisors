import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/CallToAction";
import ChatWidget from "@/components/ChatWidget";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Fractional CIO and CTO Services | Groundwork Technology Advisors",
  description:
    "Senior technology leadership for small and mid-size companies. Fixed-fee technology assessments, fractional CIO and CTO services, and practical technology roadmaps. No long-term commitment required.",
  alternates: { canonical: "https://groundworktechnologyadvisors.com/" },
  openGraph: {
    title: "Groundwork Technology Advisors",
    description:
      "Helping small and mid-size companies understand their technology environment and build a clear path forward.",
    url: "https://groundworktechnologyadvisors.com/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 style={{ color: "white", lineHeight: 1.2 }}>
              Building the Technology Foundation That Lets You Scale.
            </h1>
            {/* Accent rule */}
            <div
              className="mt-5 mb-5"
              style={{ height: "1.5px", backgroundColor: "var(--color-ltblue)", maxWidth: "480px" }}
            />
            <p
              className="text-sm leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
            >
              Fractional CIO and CTO leadership for companies where trust, data
              sensitivity, and operational reliability matter. Deepest experience
              in healthcare and insurance, with adjacent work in financial
              services and consumer products and platforms.
            </p>
            <p
              className="text-sm leading-relaxed max-w-2xl mt-4"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.6)" }}
            >
              I work with small and mid-size companies that need senior
              technology leadership without the cost of a full-time hire. My
              engagements are focused, scoped, and grounded in 30 years of
              experience running technology in regulated and high-trust
              environments.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact/?source=home" className="btn-primary">
                Get in touch
              </Link>
              <Link href="/scorecard/" className="btn-hero-outline">
                Start with the scorecard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / credentials ──────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="section-label mb-3">About</p>
              <h2>An outside perspective from someone who has done the work.</h2>
              <div
                className="mt-5 space-y-4 leading-relaxed text-sm"
                style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
              >
                <p>
                  Groundwork Technology Advisors is led by Jon McAnnis, a
                  technology executive with 30 years of experience leading
                  engineering, platform, and product organizations across
                  healthcare, insurance, financial services, and consumer
                  products and platforms. He has served as CIO or CTO at eight
                  organizations and has led post-acquisition technology
                  integration, SOC 2 and HIPAA compliance programs, cloud
                  migrations, and cybersecurity governance in regulated
                  environments.
                </p>
              </div>
              <Link href="/about/" className="link-blue inline-block mt-6 text-sm font-medium">
                More about the firm &rarr;
              </Link>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "30", label: "Years in technology leadership" },
                { stat: "8", label: "CIO or CTO roles held" },
                { stat: "300", label: "Largest engineering team led" },
                { stat: "3×", label: "SOC 2 attestation lead" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white"
                  style={{
                    border: "0.5px solid #d8e4ef",
                    borderTop: "2.5px solid var(--color-blue)",
                    borderRadius: "6px",
                    padding: "16px",
                  }}
                >
                  <p
                    className="text-2xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.stat}
                  </p>
                  <p
                    className="text-[11px]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#5a7a99",
                      marginTop: "4px",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-10">
            <p className="section-label mb-3">Services</p>
            <h2>Services</h2>
            <p
              className="text-sm mt-3 leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
            >
              Engagements are structured around specific deliverables or defined
              retainer scopes. Every engagement starts with a conversation to
              make sure the scope is right before any work begins.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} linkToDetail />
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link href="/services/" className="btn-outline-blue">
              View all services
            </Link>
            <a
              href="/gta_capabilities_onepager.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-ltblue text-sm font-medium"
            >
              Download capabilities overview &darr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Scorecard teaser ─────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-pale)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Self-assessment</p>
            <h2>Is your technology foundation ready for what's next?</h2>
            <p
              className="text-sm mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
            >
              Answer 12 questions about your technology environment and get an
              instant read on where you stand and where the gaps are. Takes
              about 3 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/scorecard/" className="btn-primary">
                Start with the scorecard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI readiness band ────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-navy)", position: "relative", overflow: "hidden" }}>
        {/* Decorative accent layers */}
        <div style={{ position: "absolute", right: 0, top: 0, width: "200px", height: "100%", background: "var(--color-blue)", opacity: 0.08 }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: "90px", height: "100%", background: "var(--color-blue)", opacity: 0.1 }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" style={{ position: "relative" }}>
          <p className="section-label mb-3" style={{ color: "var(--color-ltblue)" }}>AI readiness</p>
          <h2 style={{ color: "white", maxWidth: "480px" }}>
            Most companies are already using AI. Few are ready for what that means.
          </h2>
          <div style={{ height: "1.5px", background: "var(--color-ltblue)", width: "60px", margin: "16px 0 20px", opacity: 0.6 }} />
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.65)", marginBottom: "28px" }}
          >
            AI is showing up in your organization whether you planned for it or not. Your staff is using
            it daily. Your vendors are embedding it in the tools you already pay for. The question is no
            longer whether AI is part of your technology environment. It is whether you have the
            visibility, governance, and readiness to use it well and avoid the risks that come with using
            it poorly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              {
                title: "Visibility",
                body: "Do you know where AI is already in use across your organization, including tools your team adopted without IT involvement?",
              },
              {
                title: "Governance",
                body: "Do you have policies in place for how AI can and cannot be used, particularly around sensitive data and regulated information?",
              },
              {
                title: "Readiness",
                body: "Is your data environment, team structure, and technology foundation positioned to get real value from AI investment?",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "14px 16px",
                }}
              >
                <p className="text-xs" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "white", marginBottom: "6px" }}>
                  {pillar.title}
                </p>
                <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link href="/services/#ai-readiness-assessment" className="btn-primary">
              See the AI Readiness Assessment
            </Link>
          </div>
          <p className="text-[11px]" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.35)", marginTop: "16px", letterSpacing: "0.5px" }}>
            Jon McAnnis is currently pursuing the Chief AI Officer certification through AI CERTs and brings hands-on AI delivery experience across healthcare and behavioral health environments.
          </p>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="section-label mb-3">How engagements work</p>
          <h2 className="mb-10">How engagements work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fixed-fee project",
                description:
                  "A defined assessment with a specific written deliverable at the end. Scope, timeline, and fee are agreed upon before work begins. Appropriate for most assessment engagements.",
              },
              {
                title: "Monthly retainer",
                description:
                  "Ongoing fractional CIO or CTO services at a defined time commitment per week. Scope is set at the start of the engagement and revisited as the relationship evolves.",
              },
              {
                title: "Hourly or daily advisory",
                description:
                  "For companies that need a senior technology perspective on a specific decision or situation without committing to a larger engagement. Available by the hour or day.",
              },
            ].map((model) => (
              <div
                key={model.title}
                className="flex flex-col gap-3"
                style={{ borderTop: "2.5px solid var(--color-blue)", paddingTop: "14px" }}
              >
                <h3
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                  }}
                >
                  {model.title}
                </h3>
                <p
                  className="text-[11px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gray)",
                    lineHeight: 1.75,
                  }}
                >
                  {model.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/how-we-work/" className="link-blue text-sm font-medium">
              More about engagement models &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
      <ChatWidget />
    </>
  );
}
