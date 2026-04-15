"use client";
import { useState } from "react";
import Link from "next/link";

const tagStyles: Record<string, { bg: string; color: string }> = {
  ai:          { bg: "#e8f0f7", color: "#1a3a5c" },
  security:    { bg: "#fff3f0", color: "#712b13" },
  strategy:    { bg: "#eaf3de", color: "#27500a" },
  leadership:  { bg: "#faeeda", color: "#633806" },
  engineering: { bg: "#f0eeff", color: "#3c3489" },
};

const tagLabels: Record<string, string> = {
  ai: "AI readiness",
  security: "Security",
  strategy: "Strategy",
  leadership: "Leadership",
  engineering: "Engineering",
};

const featured = {
  href: "/insights/ai-already-in-your-organization",
  category: "ai",
  eyebrow: "Featured",
  title: "AI is already in your organization. The question is whether you know where.",
  excerpt: "Most companies discover their AI exposure the wrong way: a compliance question they cannot answer, a vendor contract with terms nobody read, or a staff member who has been feeding sensitive data into a consumer tool for six months. Getting ahead of it is easier than cleaning it up.",
  meta: "AI readiness · April 2026",
};

const posts = [
  {
    href: "/insights/technology-roadmap-that-gets-used",
    category: "strategy",
    title: "Why most technology roadmaps get built and never used",
    excerpt: "A roadmap that sits in a shared drive is not a roadmap. It is a document. The difference between the two comes down to how it was built and who owns it after it is delivered.",
    date: "April 2026",
  },
  {
    href: "/insights/soc2-what-leaders-need-to-know",
    category: "security",
    title: "SOC 2: what CEOs and CTOs actually need to understand",
    excerpt: "SOC 2 is not a checkbox. It is a signal to your customers and partners that you take security seriously. Here is what the process actually involves and what leadership needs to own.",
    date: "April 2026",
  },
  {
    href: "/insights/fractional-cio-when-it-makes-sense",
    category: "leadership",
    title: "When a fractional CIO makes more sense than a full-time hire",
    excerpt: "The decision is not just about cost. It is about what stage your company is at, what problems you are actually trying to solve, and whether you need leadership bandwidth or leadership depth.",
    date: "April 2026",
  },
  {
    href: "/insights/technical-debt-leadership-view",
    category: "engineering",
    title: "What non-technical leaders need to understand about technical debt",
    excerpt: "Technical debt is not just a developer problem. When it gets bad enough it shows up in missed deadlines, rising costs, and an engineering team that spends more time maintaining the past than building the future.",
    date: "March 2026",
  },
  {
    href: "/insights/ai-governance-starting-point",
    category: "ai",
    title: "A practical starting point for AI governance in a small company",
    excerpt: "You do not need a 40-page policy document. You need a clear answer to three questions: what AI tools are approved, what data can go into them, and who is accountable when something goes wrong.",
    date: "March 2026",
  },
  {
    href: "/insights/it-team-invisible-until-broken",
    category: "leadership",
    title: "Your IT team is invisible until something breaks. That is a problem.",
    excerpt: "If the only time leadership pays attention to the IT team is during an outage or a missed deadline, you are missing most of what they do and most of what they need from you.",
    date: "March 2026",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI readiness" },
  { key: "security", label: "Security" },
  { key: "strategy", label: "Strategy" },
  { key: "leadership", label: "Leadership" },
  { key: "engineering", label: "Engineering" },
];

// Shared placeholder visual (foundation layers mark)
function PostMark({ size = 52 }: { size?: number }) {
  const h = Math.round(size * 40 / 52);
  return (
    <svg width={size} height={h} viewBox="0 0 52 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="0" width="34" height="8" rx="2" fill="#1a3a5c" />
      <rect x="4" y="11" width="44" height="8" rx="2" fill="#1a3a5c" opacity="0.5" />
      <rect x="0" y="22" width="52" height="8" rx="2" fill="#1a3a5c" opacity="0.25" />
    </svg>
  );
}

export default function InsightsContent() {
  const [active, setActive] = useState("all");

  const showFeatured = active === "all" || active === featured.category;
  const visiblePosts = active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              letterSpacing: "0.8px",
              padding: "6px 14px",
              borderRadius: "4px",
              border: active === f.key ? "0.5px solid var(--color-navy)" : "0.5px solid #c0ccd8",
              background: active === f.key ? "var(--color-navy)" : "white",
              color: active === f.key ? "white" : "var(--color-gray)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {showFeatured && (
        <Link
          href={featured.href}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "white",
            border: "0.5px solid #d0dce8",
            borderTop: "2.5px solid var(--color-blue)",
            borderRadius: "8px",
            overflow: "hidden",
            textDecoration: "none",
            color: "inherit",
            marginBottom: "32px",
          }}
          className="post-featured-card"
        >
          <div
            style={{
              background: "var(--color-pale)",
              minHeight: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "var(--color-navy)", opacity: 0.05 }} />
            <div style={{ position: "relative" }}>
              <PostMark size={80} />
            </div>
          </div>
          <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="section-label mb-3">Featured</p>
            <p className="text-xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.35, marginBottom: "12px" }}>
              {featured.title}
            </p>
            <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)", lineHeight: 1.7, marginBottom: "16px" }}>
              {featured.excerpt}
            </p>
            <p className="text-[11px]" style={{ fontFamily: "var(--font-sans)", color: "#999" }}>{featured.meta}</p>
            <span className="text-xs" style={{ display: "inline-block", marginTop: "16px", fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--color-blue)", letterSpacing: "0.3px" }}>
              Read more
            </span>
          </div>
        </Link>
      )}

      {/* Post grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visiblePosts.map((post) => {
          const tag = tagStyles[post.category];
          return (
            <Link
              key={post.href}
              href={post.href}
              style={{
                background: "white",
                border: "0.5px solid #d0dce8",
                borderRadius: "8px",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
              }}
              className="post-card-item"
            >
              <div
                style={{
                  height: "160px",
                  background: "var(--color-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "var(--color-navy)", opacity: 0.04 }} />
                <div style={{ position: "relative" }}>
                  <PostMark />
                </div>
              </div>
              <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span className="text-[9px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", padding: "3px 8px", borderRadius: "3px", background: tag.bg, color: tag.color }}>
                    {tagLabels[post.category]}
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "#999", letterSpacing: "0.3px" }}>{post.date}</span>
                </div>
                <p className="text-sm font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--color-navy)", lineHeight: 1.4, marginBottom: "8px" }}>
                  {post.title}
                </p>
                <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#666", lineHeight: 1.65, flex: 1 }}>
                  {post.excerpt}
                </p>
                <div className="text-[11px]" style={{ marginTop: "12px", paddingTop: "10px", borderTop: "0.5px solid #eef1f5", fontFamily: "var(--font-sans)", color: "var(--color-blue)", fontWeight: 700, letterSpacing: "0.3px" }}>
                  Read more
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Social band */}
      <div
        style={{
          background: "var(--color-navy)",
          borderRadius: "8px",
          padding: "24px 28px",
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p className="text-sm" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            Follow for more
          </p>
          <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            Short takes on technology leadership posted regularly on LinkedIn and Instagram.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <a
            href="https://www.instagram.com/groundworktechnologyadvisors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", letterSpacing: "0.3px", border: "0.5px solid rgba(255,255,255,0.2)", color: "white" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/groundwork-technology-advisors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "5px", fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", letterSpacing: "0.3px", border: "0.5px solid rgba(255,255,255,0.2)", color: "white" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
