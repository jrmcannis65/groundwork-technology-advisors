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
            Each engagement is scoped to a specific outcome. The work focuses on
            delivering something useful: a written assessment, a practical
            roadmap, or consistent senior leadership. Not a long-term
            dependency.
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
                  <Image
                    src={`/assets/brand/services/${service.graphic}`}
                    alt=""
                    width={160}
                    height={160}
                    style={{ width: "160px", height: "160px", objectFit: "contain" }}
                    aria-hidden="true"
                  />
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

      <CallToAction
        heading="Not sure which service fits your situation?"
        body="Most engagements start with a brief conversation to make sure the scope is appropriate before any work or fees are committed. Reach out to discuss what you're working on."
      />
    </>
  );
}
