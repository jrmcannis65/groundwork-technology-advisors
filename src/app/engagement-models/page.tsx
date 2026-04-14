import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CallToAction from "@/components/CallToAction";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata(
  "Engagement Models",
  "Groundwork Technology Advisors works with clients on three models: fixed-fee project engagements, monthly retainers for fractional CIO or CTO services, and hourly or daily advisory.",
  "/engagement-models/"
);

const models = [
  {
    number: "01",
    title: "Fixed-fee project",
    subtitle: "Defined scope. Specific deliverable. Agreed fee.",
    description: [
      "Most assessment engagements—technology ecosystem reviews, engineering organization assessments, security and compliance readiness reviews, roadmap development—are structured as fixed-fee projects. The scope, timeline, and fee are defined before any work begins.",
      "At the end of the engagement you receive a written deliverable: a structured assessment, a gap inventory, a phased roadmap, or whatever the engagement was designed to produce. There is no ambiguity about what you are getting or what it costs.",
      "Fixed-fee projects are appropriate when there is a specific question to answer or a specific output you need. They work well for companies preparing for a transaction, evaluating a technology investment, or trying to get an honest picture of where their technology organization stands.",
    ],
    fit: "Good fit for: pre-transaction due diligence, leadership evaluating a technology investment, companies that need a specific written output with a defined endpoint.",
  },
  {
    number: "02",
    title: "Monthly retainer",
    subtitle: "Fractional CIO or CTO services at a defined time commitment.",
    description: [
      "For companies that need ongoing senior technology leadership without a full-time hire, the retainer model provides consistent access to a senior technology executive at a defined number of days per week. Typically structured at one to two days per week depending on the company's needs.",
      "The scope is defined at the start of the engagement based on what the company actually needs. That varies considerably. Some clients need help managing an existing engineering team and setting direction. Others need a senior technology voice in leadership conversations, board meetings, or investor updates. Others are in the middle of a transition—a platform migration, a post-acquisition integration, a leadership gap—and need consistent oversight until it is resolved.",
      "Retainers are reviewed periodically and can be adjusted as the situation changes. The goal is to be useful for as long as there is a genuine need, not to extend the engagement indefinitely.",
    ],
    fit: "Good fit for: companies between technology executives, PE-backed companies that need technology leadership during a growth phase, organizations managing a specific technology transition.",
  },
  {
    number: "03",
    title: "Hourly or daily advisory",
    subtitle: "A senior technology perspective on a specific decision or situation.",
    description: [
      "Some companies do not need a structured engagement or an ongoing relationship. They have a specific decision in front of them—evaluating a vendor, assessing a technology acquisition target, reviewing a proposed architecture, or getting an outside perspective on a hire—and they need a qualified opinion from someone who has been in that situation before.",
      "Hourly and daily advisory is available for exactly that. There is no minimum commitment and no requirement to structure a larger engagement. You get billed for the time you use.",
      "This model is also useful for companies that want to start with a limited interaction before committing to a larger project or retainer.",
    ],
    fit: "Good fit for: specific technology decisions with a defined scope, vendor or acquisition evaluations, one-time consultations on a hire or architecture question.",
  },
];

export default function EngagementModelsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Engagement Models
          </h1>
          <p className="mt-4 text-slate-lighter text-lg max-w-2xl leading-relaxed">
            Three ways to work together, depending on what the situation
            calls for. The goal is to match the engagement structure to the
            actual need rather than defaulting to one size.
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-16 sm:space-y-20">
            {models.map((model, index) => (
              <div
                key={model.number}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 ${
                  index < models.length - 1
                    ? "pb-16 sm:pb-20 border-b border-slate-lighter"
                    : ""
                }`}
              >
                {/* Label + title */}
                <div className="flex flex-col gap-3">
                  <span className="text-slate text-sm font-mono">
                    {model.number}
                  </span>
                  <h2 className="text-navy text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                    {model.title}
                  </h2>
                  <p className="text-slate text-sm leading-relaxed">
                    {model.subtitle}
                  </p>
                </div>

                {/* Description */}
                <div className="lg:col-span-2 space-y-4">
                  {model.description.map((paragraph, i) => (
                    <p key={i} className="text-charcoal leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  <div className="mt-6 p-4 bg-off-white rounded-lg border border-slate-lighter">
                    <p className="text-sm text-charcoal">
                      <span className="font-medium text-navy">
                        Good fit for:{" "}
                      </span>
                      {model.fit.replace("Good fit for: ", "")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-style section */}
      <section className="bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-navy text-2xl font-semibold tracking-tight mb-10">
            Common questions
          </h2>
          <div className="max-w-3xl space-y-8">
            {[
              {
                q: "How does an engagement typically start?",
                a: "With a brief phone call to understand what you are working on and whether there is a useful fit. No fee for that conversation. If it makes sense to move forward, we define the scope and agree on the fee before any work begins.",
              },
              {
                q: "Do you work with companies outside of healthcare?",
                a: "Yes. The services listed here apply across industries. Healthcare is where most of my experience sits, but the work of assessing a technology environment, building a roadmap, or providing fractional technology leadership translates across sectors.",
              },
              {
                q: "What is the typical timeline for a project engagement?",
                a: "Assessment engagements typically run two to four weeks depending on the complexity of the environment and stakeholder availability. Roadmap development usually takes three to five weeks. Timelines are defined as part of scope before work begins.",
              },
              {
                q: "Is there a minimum commitment for retainer engagements?",
                a: "Retainers are typically structured with a three-month minimum to allow enough time for the engagement to be useful. After that, month-to-month. There is no pressure to continue beyond when the need exists.",
              },
            ].map((item) => (
              <div key={item.q} className="flex flex-col gap-2">
                <h3 className="text-navy font-semibold text-base">{item.q}</h3>
                <p className="text-charcoal text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        heading="Not sure which model fits your situation?"
        body="A brief call is usually enough to figure out what kind of engagement makes sense—or whether it makes sense at all."
      />
    </>
  );
}
