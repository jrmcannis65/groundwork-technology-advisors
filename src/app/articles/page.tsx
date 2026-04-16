import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { articles } from "@/data/articles";

export const metadata: Metadata = generatePageMetadata(
  "Articles",
  "Long-form writing on technology leadership, fractional CIO and CTO services, engineering organization, security and compliance, AI readiness, and technology roadmaps.",
  "/articles/"
);

export default function ArticlesPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="section-label mb-3">Articles</p>
          <h1 style={{ color: "white" }}>Long-form thinking on technology leadership</h1>
          <p
            className="text-sm mt-4 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}
          >
            Practical writing on the decisions and challenges that technology leaders at small and mid-size companies face most often.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}/`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "white",
                    border: "0.5px solid #d0dce8",
                    borderLeft: "3px solid var(--color-blue)",
                    borderRadius: "6px",
                    padding: "20px 24px",
                    transition: "border-color 0.15s",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      lineHeight: 1.4,
                      marginBottom: "8px",
                    }}
                  >
                    {article.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-gray)",
                      lineHeight: 1.65,
                    }}
                  >
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
