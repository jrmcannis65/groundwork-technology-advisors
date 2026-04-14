import type { Metadata } from "next";
import { services } from "@/data/services";
import { generatePageMetadata } from "@/lib/metadata";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = generatePageMetadata(
  "Services",
  "Technology consulting services for small and mid-size companies: ecosystem assessments, engineering organization reviews, security and compliance readiness, fractional CIO/CTO services, and technology roadmap development.",
  "/services/"
);

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Services
          </h1>
          <p className="mt-4 text-slate-lighter text-lg max-w-2xl leading-relaxed">
            Each engagement is scoped to a specific outcome. The work focuses on
            delivering something useful—a written assessment, a practical
            roadmap, or consistent senior leadership—rather than a long-term
            dependency.
          </p>
        </div>
      </section>

      {/* Service sections */}
      <div className="bg-white">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={index % 2 === 0 ? "bg-white" : "bg-off-white"}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                {/* Icon + title */}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-lighter flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-navy"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={service.icon}
                      />
                    </svg>
                  </div>
                  <h2 className="text-navy text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                    {service.title}
                  </h2>
                </div>

                {/* Description */}
                <div className="lg:col-span-2 space-y-4">
                  {service.fullDescription.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-charcoal leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
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
