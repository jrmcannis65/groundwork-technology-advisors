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
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>Contact</h1>
          <p
            className="text-sm mt-4 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            All inquiries receive a response within one business day.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2>Groundwork Technology Advisors</h2>
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
                >
                  Technology consulting for small and mid-size companies.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="section-label mb-1">Email</p>
                  <a
                    href="mailto:info@groundworktechnologyadvisors.com"
                    className="text-sm link-blue break-all"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    info@groundworktechnologyadvisors.com
                  </a>
                </div>
                <div>
                  <p className="section-label mb-1">Phone</p>
                  <a
                    href="tel:+15095590899"
                    className="text-sm link-blue"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    509-559-0899
                  </a>
                </div>
              </div>

              <div
                className="p-5"
                style={{
                  backgroundColor: "var(--color-pale)",
                  border: "0.5px solid #d8e4ef",
                  borderRadius: "6px",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}
                >
                  If you prefer, you can reach out by email or phone directly.
                  Either way, the first conversation is just to understand what
                  you are working on. No commitment required.
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
