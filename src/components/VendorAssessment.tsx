"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";

function renderQuestions(text: string) {
  return text.split("\n\n").map((block, bi) => {
    const lines = block.split("\n");
    return (
      <div key={bi} style={{ marginBottom: "18px" }}>
        {lines.map((line, li) => {
          if (!line.trim()) return null;
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
          if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            return (
              <p key={li} className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                {line.slice(2, -2)}
              </p>
            );
          }
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

const vendorTypeOptions = [
  "EHR or Clinical System",
  "Cloud Infrastructure",
  "SaaS Business Application",
  "Data Analytics Platform",
  "Cybersecurity Tool",
  "Communication or Collaboration Tool",
  "Payment Processor",
  "AI or Automation Tool",
  "Other",
];

const industryOptions = [
  "Healthcare Technology",
  "Digital Health",
  "Health Insurance",
  "Behavioral Health",
  "Clinical Services",
  "Regulated SaaS",
  "Other",
];

const companySizeOptions = [
  "Under 50 employees",
  "50 to 150 employees",
  "150 to 300 employees",
  "300 to 500 employees",
  "Over 500 employees",
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

export default function VendorAssessment() {
  const [vendorType, setVendorType] = useState(vendorTypeOptions[0]);
  const [industry, setIndustry] = useState(industryOptions[0]);
  const [companySize, setCompanySize] = useState(companySizeOptions[1]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const vendorRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const vendorName = vendorRef.current?.value ?? "";
    if (vendorName.trim().length < 2) {
      setError("Please enter a vendor name.");
      return;
    }
    setError("");
    setQuestions("");
    setLoading(true);

    try {
      const res = await fetch("/api/vendor-assessment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorName, vendorType, industry, companySize }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please email info@groundworktechnologyadvisors.com.");
        return;
      }

      const data = await res.json();
      setQuestions(data.questions ?? "");
    } catch {
      setError("Something went wrong. Please email info@groundworktechnologyadvisors.com.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    const plain = questions
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/^- /gm, "• ");
    navigator.clipboard.writeText(plain).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>Vendor Security Assessment Questions</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Enter a technology vendor you are evaluating and this tool will generate a structured set of questions to ask them, organized by security, compliance, integration, and contract risk. Tailored to your industry and company size.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "white", border: "0.5px solid #d0dce8", borderRadius: "8px", padding: "24px" }}>

              {/* Vendor name */}
              <div>
                <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                  Vendor Name
                </label>
                <input
                  ref={vendorRef}
                  type="text"
                  placeholder="e.g. Salesforce, Epic, Veeva"
                  style={inputStyle}
                />
              </div>

              {/* Dropdowns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Vendor Type
                  </label>
                  <select value={vendorType} onChange={(e) => setVendorType(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {vendorTypeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Your Industry
                  </label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ maxWidth: "calc(50% - 8px)" }}>
                <label className="text-xs" style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--color-navy)", letterSpacing: "0.5px", marginBottom: "6px" }}>
                  Company Size
                </label>
                <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                  {companySizeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
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
                  Generate Questions
                </button>
              </div>
            </div>

            {/* Loading indicator */}
            <LoadingIndicator message="Generating vendor evaluation questions..." visible={loading} />

            {/* Results */}
            {questions && (
              <div style={{ marginTop: "32px" }}>
                <div style={{ background: "white", border: "0.5px solid #d0dce8", borderRadius: "8px", padding: "28px" }}>
                  {renderQuestions(questions)}
                </div>

                {/* Copy button */}
                <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs"
                    style={{ padding: "8px 18px", background: "transparent", color: "var(--color-navy)", border: "1px solid var(--color-navy)", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px" }}
                  >
                    {copied ? "Copied!" : "Copy Questions"}
                  </button>
                </div>

                {/* CTA */}
                <div style={{ marginTop: "20px", padding: "16px 20px", background: "#e8f0f7", borderRadius: "8px", borderLeft: "3px solid var(--color-blue)" }}>
                  <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", margin: 0, lineHeight: 1.6 }}>
                    Need help with a full vendor review or technology assessment?{" "}
                    <Link href="/contact/" className="link-blue" style={{ fontWeight: 600 }}>
                      Get in touch.
                    </Link>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
