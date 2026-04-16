import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import PerspectivesContent from "@/components/PerspectivesContent";

export const metadata: Metadata = generatePageMetadata(
  "Technology Leadership Perspectives",
  "Point-of-view writing on technology leadership, engineering organization, security and compliance, AI readiness, and strategy for small and mid-size companies.",
  "/perspectives/"
);

export default function PerspectivesPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="section-label mb-3">Perspectives</p>
          <h1 style={{ color: "white" }}>Takes on technology leadership</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Point-of-view writing on the topics that matter most to technology leaders at small and mid-size companies. No sponsored content, no product recommendations.
          </p>
          <div className="mt-6">
            <Link
              href="/articles/"
              className="text-xs font-medium"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-ltblue)", letterSpacing: "0.3px" }}
            >
              Read our long-form articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      <PerspectivesContent />
    </>
  );
}
