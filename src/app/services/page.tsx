import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { generatePageMetadata } from "@/lib/metadata";
import CallToAction from "@/components/CallToAction";
import AIReadinessForm from "@/components/AIReadinessForm";

export const metadata: Metadata = generatePageMetadata(
  "Technology Consulting Services",
  "Technology ecosystem assessments, engineering organization reviews, security and compliance readiness, AI readiness assessments, and fractional CIO and CTO services for small and mid-size companies.",
  "/services/"
);

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>Services</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Every engagement is fixed-scope and fixed-fee. You know the
            deliverable and the cost before work starts. Engagements typically
            run three to twelve weeks depending on scope. Below is what I offer
            most often, with the understanding that every client situation is
            different and scope is always defined together before anything
            begins.
          </p>
        </div>
      </section>

      {/* Service sections */}
      <div>
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--color-pale)" }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                {/* Graphic + title */}
                <div className="flex flex-col gap-4">
                  <Link href={`/articles/${service.articleSlug}/`} style={{ cursor: "pointer" }}>
                    <Image
                      src={`/assets/brand/services/${service.graphic}`}
                      alt=""
                      width={160}
                      height={160}
                      style={{ width: "160px", height: "160px", objectFit: "contain" }}
                      aria-hidden="true"
                    />
                  </Link>
                  <h2 className="text-sm">{service.title}</h2>
                </div>

                {/* Description */}
                <div className="lg:col-span-2 space-y-4">
                  {service.fullDescription.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-charcoal)",
                        lineHeight: 1.75,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}

                  <div style={{ paddingTop: "4px" }}>
                    <Link
                      href={`/articles/${service.articleSlug}/`}
                      className="link-blue text-xs font-medium"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Further reading &rarr;
                    </Link>
                  </div>

                  {service.id === "technology-ecosystem-assessment" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "A written inventory of every system in use, how it connects, and what the organization does and does not control",
                          "A vendor relationship review covering contracts, concentration risk, and performance gaps",
                          "A technical debt assessment with observations on what is slowing delivery or creating operational risk",
                          "A prioritized findings document organized by what matters most, not by category",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: "16px" }}>
                        <Link href="/vendor-assessment/" className="link-blue text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                          Generate vendor evaluation questions &rarr;
                        </Link>
                      </div>
                    </div>
                  )}

                  {service.id === "engineering-organization-assessment" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "A structured review of team composition, role clarity, and capacity relative to current demands",
                          "An assessment of delivery practices including sprint planning, Agile maturity, and CI/CD pipeline health",
                          "Specific observations on what is working, what is not, and what changes would have the most impact",
                          "A written recommendations document the leadership team can act on without an engineering background",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.id === "technology-role-organizational-design" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "A review of the current technology org structure and where it does not match the company's current stage",
                          "Role definitions and reporting structure recommendations specific to the company's situation",
                          "A hiring profile for any technology leadership role the company needs to fill next",
                          "Guidance on what to look for in candidates that is grounded in the company's actual environment",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: "16px" }}>
                        <Link href="/jd-analyzer/" className="link-blue text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                          Analyze a Director or VP level technology role before you search &rarr;
                        </Link>
                      </div>
                    </div>
                  )}

                  {service.id === "security-compliance-readiness" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "A gap inventory against the applicable framework, SOC 2, HIPAA, or NIST, with findings organized by severity",
                          "An honest assessment of what it would take to get audit ready and how long it would realistically take",
                          "A prioritized remediation list the leadership team can use to assign ownership and track progress",
                          "A written deliverable leadership can share with auditors, insurers, or board members as evidence of active remediation",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <Link href="/vendor-assessment/" className="link-blue text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                          Generate vendor security questions &rarr;
                        </Link>
                        <Link href="/soc2-checklist/" className="link-blue text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                          Get a personalized SOC 2 readiness checklist &rarr;
                        </Link>
                      </div>
                    </div>
                  )}

                  {service.id === "fractional-cio-cto-services" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "Senior technology leadership available one to two days per week without a full-time executive salary",
                          "Ongoing ownership of technology strategy, vendor relationships, and engineering team direction",
                          "A senior technology voice in leadership meetings, board conversations, and key vendor negotiations",
                          "Continuity of technology direction during a leadership transition or gap",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.id === "technology-roadmap-development" && (
                    <div style={{ marginTop: "8px" }}>
                      <p className="section-label mb-3">What this engagement delivers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          "Structured stakeholder conversations with each executive to surface what they actually need from technology",
                          "A prioritized technology investment plan organized into near-term actions and longer-term initiatives",
                          "A phased roadmap document the existing team can execute against without outside help",
                          "Alignment across leadership on technology priorities, ending the recurring debate about where to focus",
                        ].map((item, i) => (
                          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-blue)", flexShrink: 0, marginTop: "8px" }} />
                            <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.id === "ai-readiness-assessment" && (
                    <>
                      <div style={{ marginTop: "8px" }}>
                        <p className="section-label mb-3">What this engagement delivers</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                          {[
                            "An inventory of AI tools and capabilities already in use across your organization, including shadow adoption your IT team may not be tracking",
                            "An honest assessment of your data environment and whether it supports the AI use cases you are considering",
                            "A governance gap review covering acceptable use policy, data handling, vendor AI terms, and regulatory exposure",
                            "A prioritized set of recommendations organized by what to do first, what to defer, and what to avoid",
                          ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  background: "var(--color-blue)",
                                  flexShrink: 0,
                                  marginTop: "8px",
                                }}
                              />
                              <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", borderTop: "0.5px solid #e8eef4", paddingTop: "12px" }}>
                        Fixed-fee engagement. Scope and fee agreed before work begins. Typically completed in 30 to 45 days.
                      </p>
                      <AIReadinessForm />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div style={{ maxWidth: "560px" }}>
            <h2 style={{ color: "white" }}>Not sure which service fits your situation?</h2>
            <p
              className="text-sm mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
            >
              Most engagements start with a brief conversation to make sure the scope is appropriate before any work or fees are committed. Or describe your challenge and get a specific recommendation in about 3 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link href="/contact/?source=home" className="btn-primary">
                Get in touch
              </Link>
              <Link href="/diagnostic/" className="btn-hero-outline">
                Try the Problem Diagnostic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
