import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/CallToAction";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title:
    "Groundwork Technology Advisors | Building the Technology Foundation That Lets You Scale",
  description:
    "Groundwork Technology Advisors helps small and mid-size companies understand their technology environment, strengthen their engineering practices, and build a clear path forward.",
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
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Building the Technology Foundation That Lets You Scale.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-lighter leading-relaxed max-w-2xl">
              Groundwork Technology Advisors helps small and mid-size companies
              understand their technology environment, strengthen their
              engineering practices, and build a clear path forward.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services/"
                className="inline-block bg-white text-navy font-semibold px-6 py-3 rounded hover:bg-off-white transition-colors text-sm"
              >
                View services
              </Link>
              <Link
                href="/contact/"
                className="inline-block border border-slate-light text-white font-semibold px-6 py-3 rounded hover:border-white transition-colors text-sm"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About summary */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-navy text-2xl sm:text-3xl font-semibold tracking-tight">
                An outside perspective from someone who has done the work.
              </h2>
              <div className="mt-5 space-y-4 text-charcoal leading-relaxed">
                <p>
                  Groundwork Technology Advisors is led by a senior technology
                  executive with 30 years of experience across healthcare
                  services, health insurance, digital product companies, and
                  behavioral health organizations, including CIO and CTO roles
                  at eight organizations.
                </p>
                <p>
                  Many small and mid-size companies are making technology
                  decisions without a clear picture of where they stand or where
                  they are going. An experienced outside perspective can help
                  clarify both—without the overhead of a full-time executive
                  hire.
                </p>
              </div>
              <Link
                href="/about/"
                className="inline-block mt-6 text-sm font-medium text-navy hover:text-navy-light transition-colors"
              >
                More about the firm &rarr;
              </Link>
            </div>

            <div className="bg-off-white rounded-lg p-6 sm:p-8 space-y-5">
              <h3 className="text-navy font-semibold text-base">
                Background at a glance
              </h3>
              <ul className="space-y-3">
                {[
                  "30 years in technology leadership roles",
                  "CIO or CTO at eight organizations",
                  "Teams ranging from 20 to 300 people",
                  "Healthcare services, insurance, behavioral health",
                  "SOC 2 attestation lead at three organizations",
                  "Technology due diligence and post-acquisition integration",
                  "CHIME-certified Healthcare CIO, CISO, Digital Health Executive",
                  "Master's degree in Engineering and Technology Management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                    <svg
                      className="w-4 h-4 text-slate mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-10">
            <h2 className="text-navy text-2xl sm:text-3xl font-semibold tracking-tight">
              Services
            </h2>
            <p className="mt-3 text-charcoal leading-relaxed max-w-2xl">
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
          <div className="mt-10">
            <Link
              href="/services/"
              className="inline-block text-sm font-medium text-navy border border-navy rounded px-5 py-2.5 hover:bg-navy hover:text-white transition-colors"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* How engagements work */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-navy text-2xl sm:text-3xl font-semibold tracking-tight mb-10">
            How engagements work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
                bg: "bg-blue-50",
                stroke: "text-blue-700",
                title: "Fixed-fee project",
                description:
                  "A defined assessment with a specific written deliverable at the end. Scope, timeline, and fee are agreed upon before work begins. Appropriate for most assessment engagements.",
              },
              {
                icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
                bg: "bg-teal-50",
                stroke: "text-teal-700",
                title: "Monthly retainer",
                description:
                  "Ongoing fractional CIO or CTO services at a defined time commitment per week. Scope is set at the start of the engagement and revisited as the relationship evolves.",
              },
              {
                icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                bg: "bg-amber-50",
                stroke: "text-amber-700",
                title: "Hourly or daily advisory",
                description:
                  "For companies that need a senior technology perspective on a specific decision or situation without committing to a larger engagement. Available by the hour or day.",
              },
            ].map((model) => (
              <div key={model.title} className="flex flex-col gap-4">
                <div className={`w-14 h-14 rounded-xl ${model.bg} flex items-center justify-center flex-shrink-0`}>
                  <svg
                    className={`w-7 h-7 ${model.stroke}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={model.icon} />
                  </svg>
                </div>
                <h3 className="text-navy font-semibold text-base">{model.title}</h3>
                <p className="text-charcoal text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/engagement-models/"
              className="inline-block text-sm font-medium text-navy hover:text-navy-light transition-colors"
            >
              More about engagement models &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToAction />
    </>
  );
}
