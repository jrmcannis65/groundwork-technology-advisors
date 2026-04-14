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
    <section className="bg-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
            {heading}
          </h2>
          <p className="text-slate-lighter text-base sm:text-lg mt-4 leading-relaxed">
            {body}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link
              href="/contact/"
              className="inline-block bg-white text-navy font-semibold px-6 py-3 rounded hover:bg-off-white transition-colors text-sm"
            >
              Get in touch
            </Link>
            <div className="flex flex-col gap-1 text-sm text-slate-lighter">
              <a
                href="mailto:info@groundworktechnologyadvisors.com"
                className="hover:text-white transition-colors"
              >
                info@groundworktechnologyadvisors.com
              </a>
              <a
                href="tel:+15095590899"
                className="hover:text-white transition-colors"
              >
                509-559-0899
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
