import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-lighter mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-base">
              Groundwork Technology Advisors
            </p>
            <p className="text-slate-lighter text-sm mt-1">
              Building the Technology Foundation That Lets You Scale.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
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
        <div className="mt-8 pt-6 border-t border-navy-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate">
          <p>&copy; {year} Groundwork Technology Advisors LLC. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/services/" className="hover:text-white transition-colors">Services</Link>
            <Link href="/about/" className="hover:text-white transition-colors">About</Link>
            <Link href="/engagement-models/" className="hover:text-white transition-colors">Engagement Models</Link>
            <Link href="/contact/" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
