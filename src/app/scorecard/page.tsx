import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Scorecard from "@/components/Scorecard";

export const metadata: Metadata = generatePageMetadata(
  "Technology Foundation Scorecard",
  "Answer 12 questions about your technology environment and get an instant assessment of where you stand. Takes about 3 minutes.",
  "/scorecard/"
);

export default function ScorecardPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>Technology Foundation Scorecard</h1>
          <p
            className="text-sm mt-4 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Answer 12 questions and get an instant read on where your technology
            environment stands and where the gaps are.
          </p>
        </div>
      </section>

      {/* Scorecard */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Scorecard />
        </div>
      </section>
    </>
  );
}
