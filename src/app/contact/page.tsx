import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = generatePageMetadata(
  "Contact",
  "Get in touch with Groundwork Technology Advisors. All inquiries receive a response within one business day.",
  "/contact/"
);

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-slate-lighter text-lg max-w-xl leading-relaxed">
            All inquiries receive a response within one business day.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-navy font-semibold text-lg">
                  Groundwork Technology Advisors
                </h2>
                <p className="text-charcoal text-sm mt-1 leading-relaxed">
                  Technology consulting for small and mid-size companies.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-slate text-xs font-semibold uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@groundworktechnologyadvisors.com"
                    className="text-navy text-sm hover:text-navy-light transition-colors break-all"
                  >
                    info@groundworktechnologyadvisors.com
                  </a>
                </div>
                <div>
                  <p className="text-slate text-xs font-semibold uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+15095590899"
                    className="text-navy text-sm hover:text-navy-light transition-colors"
                  >
                    509-559-0899
                  </a>
                </div>
              </div>

              <div className="bg-off-white border border-slate-lighter rounded-lg p-5">
                <p className="text-charcoal text-sm leading-relaxed">
                  If you prefer, you can reach out by email or phone directly.
                  Either way, the first conversation is just to understand what
                  you are working on—no commitment required.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
