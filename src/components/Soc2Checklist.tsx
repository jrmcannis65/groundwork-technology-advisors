"use client";
import { useState } from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";

function renderChecklist(text: string) {
  return text.split("\n\n").map((block, bi) => {
    const lines = block.split("\n");
    return (
      <div key={bi} style={{ marginBottom: "18px" }}>
        {lines.map((line, li) => {
          if (!line.trim()) return null;
          // Bullet points
          if (line.startsWith("- ")) {
            const inner = line.slice(2).split(/\*\*(.+?)\*\*/g);
            return (
              <div key={li} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
                <span style={{ color: "var(--color-blue)", flexShrink: 0, marginTop: "2px" }}>•</span>
                <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>
                  {inner.map((part, pi) =>
                    pi % 2 === 1 ? <strong key={pi} style={{ color: "var(--color-navy)" }}>{part}</strong> : part
                  )}
                </span>
              </div>
            );
          }
          // Numbered list items
          const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
          if (numberedMatch) {
            const inner = numberedMatch[2].split(/\*\*(.+?)\*\*/g);
            return (
              <div key={li} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
                <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-blue)", flexShrink: 0, fontWeight: 600, minWidth: "18px" }}>{numberedMatch[1]}.</span>
                <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65 }}>
                  {inner.map((part, pi) =>
                    pi % 2 === 1 ? <strong key={pi} style={{ color: "var(--color-navy)" }}>{part}</strong> : part
                  )}
                </span>
              </div>
            );
          }
          // Section header: **Header**
          if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            return (
              <p key={li} className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                {line.slice(2, -2)}
              </p>
            );
          }
          // Regular text with optional inline bold
          const parts = line.split(/\*\*(.+?)\*\*/g);
          return (
            <p key={li} className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.7, marginBottom: "4px" }}>
              {parts.map((part, pi) =>
                pi % 2 === 1 ? <strong key={pi} style={{ color: "var(--color-navy)" }}>{part}</strong> : part
              )}
            </p>
          );
        })}
      </div>
    );
  });
}

const companySizeOptions = [
  "Under 50 employees",
  "50 to 150 employees",
  "150 to 300 employees",
  "300 to 500 employees",
  "Over 500 employees",
];

const industryOptions = [
  "Healthcare Technology",
  "Digital Health",
  "Health Insurance",
  "Behavioral Health",
  "Clinical Services",
  "Insurance",
  "Insurtech",
  "Financial Services",
  "Consumer Products and Platforms",
  "Regulated SaaS",
];

const currentStatusOptions = [
  "No formal compliance program in place",
  "Informal security practices, nothing documented",
  "Some documentation, no external review",
  "Actively preparing for first audit",
  "Completed Type I, preparing for Type II",
  "Completed Type II, maintaining current program",
];

const timeframeOptions = [
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "12 to 18 months",
  "Longer than 18 months",
  "Exploring, no timeline yet",
];

const securityResourcesOptions = [
  "Yes, dedicated security lead or team",
  "Yes, shared responsibility across IT and engineering",
  "No dedicated security resources",
  "Considering hiring a security lead",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "0.5px solid #c0ccd8",
  borderRadius: "5px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  color: "var(--color-charcoal)",
  background: "white",
  boxSizing: "border-box",
};

export default function Soc2Checklist() {
  const [companySize, setCompanySize] = useState(companySizeOptions[1]);
  const [industry, setIndustry] = useState(industryOptions[0]);
  const [currentStatus, setCurrentStatus] = useState(currentStatusOptions[0]);
  const [timeframe, setTimeframe] = useState(timeframeOptions[2]);
  const [securityResources, setSecurityResources] = useState(securityResourcesOptions[2]);
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setChecklist("");
    setLoading(true);

    try {
      const res = await fetch("/api/soc2-checklist/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companySize, industry, currentStatus, timeframe, securityResources }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please email info@groundworktechnologyadvisors.com.");
        return;
      }

      const data = await res.json();
      setChecklist(data.checklist ?? "");
    } catch {
      setError("Something went wrong. Please email info@groundworktechnologyadvisors.com.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>SOC 2 Readiness Checklist</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Answer five questions about your company and get a prioritized SOC 2 readiness checklist tailored to where you actually are today. Not generic compliance boilerplate.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            <p className="text-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}>
              Answer five questions about your company&apos;s current state, and this tool will generate a prioritized readiness checklist tailored to where you are today. No fluff, no generic compliance boilerplate.
            </p>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "white", border: "0.5px solid #d0dce8", borderRadius: "8px", padding: "24px" }}>

              {/* Top row: Company Size + Industry */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Company Size
                  </label>
                  <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {companySizeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Industry
                  </label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Current Compliance Status */}
              <div>
                <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                  Current Compliance Status
                </label>
                <select value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                  {currentStatusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Bottom row: Target Timeframe + Security Resources */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Target Timeframe
                  </label>
                  <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {timeframeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Dedicated Security Resources
                  </label>
                  <select value={securityResources} onChange={(e) => setSecurityResources(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {securityResourcesOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "#a32d2d", background: "#fcebeb", border: "0.5px solid #f0c0c0", borderRadius: "5px", padding: "10px 12px" }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="text-sm"
                  style={{ padding: "11px 28px", background: "var(--color-navy)", color: "white", border: "none", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 600, cursor: loading ? "default" : "pointer", letterSpacing: "0.3px", opacity: loading ? 0.6 : 1 }}
                >
                  Generate My Checklist
                </button>
              </div>
            </div>

            {/* Loading indicator */}
            <LoadingIndicator message="Building your SOC 2 readiness checklist..." visible={loading} />

            {/* Results */}
            {checklist && (
              <div style={{ marginTop: "32px" }}>
                <div style={{ background: "white", border: "0.5px solid #d0dce8", borderRadius: "8px", padding: "28px" }}>
                  {renderChecklist(checklist)}
                </div>

                {/* CTA */}
                <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
                  <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", margin: 0, lineHeight: 1.6 }}>
                    Want to talk through this in more detail? Reach out directly.
                  </p>
                  <Link href="/contact/" className="btn-primary">
                    Contact Us
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
