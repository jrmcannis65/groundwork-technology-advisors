import Link from "next/link";

type Props = {
  heading?: string;
  body?: string;
};

export default function CallToAction({
  heading = "Start with a conversation.",
  body = "If you're not sure which engagement fits your situation, reach out. A brief call is usually enough to figure out whether there's a useful fit.",
}: Props) {
  return (
    <section style={{ backgroundColor: "var(--color-navy)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <h2 style={{ color: "white" }}>{heading}</h2>
          <p
            className="text-sm mt-4 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)" }}
          >
            {body}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link href="/contact/" className="btn-primary">
              Get in touch
            </Link>
            <div
              className="flex flex-col gap-1 text-sm"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)" }}
            >
              <a
                href="mailto:info@groundworktechnologyadvisors.com"
                className="footer-link"
              >
                info@groundworktechnologyadvisors.com
              </a>
              <a href="tel:+15095590899" className="footer-link">
                509-559-0899
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
