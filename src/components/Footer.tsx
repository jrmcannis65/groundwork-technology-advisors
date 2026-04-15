import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-navy)",
        borderTop: "1px solid var(--color-blue)",
        color: "white",
      }}
      className="mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <p className="font-semibold text-base">Groundwork Technology Advisors</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              Building the Technology Foundation That Lets You Scale.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <a href="mailto:info@groundworktechnologyadvisors.com" className="footer-link">
              info@groundworktechnologyadvisors.com
            </a>
            <a href="tel:+15095590899" className="footer-link">
              509-559-0899
            </a>
            <a href="https://groundworktechnologyadvisors.com" className="footer-link">
              groundworktechnologyadvisors.com
            </a>
          </div>
        </div>
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)" }}
        >
          <p>&copy; {year} Groundwork Technology Advisors LLC. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/services/" className="footer-link">Services</Link>
            <Link href="/about/" className="footer-link">About</Link>
            <Link href="/how-we-work/" className="footer-link">How We Work</Link>
            <Link href="/contact/" className="footer-link">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
