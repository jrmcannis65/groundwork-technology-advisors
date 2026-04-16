import Link from "next/link";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ArticleLayout({ title, children }: Props) {
  return (
    <>
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="section-label mb-3">Article</p>
          <h1 style={{ color: "white", maxWidth: "720px" }}>{title}</h1>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div style={{ maxWidth: "720px" }}>{children}</div>
        </div>
      </section>
    </>
  );
}

export function ArticleP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-charcoal)",
        lineHeight: 1.8,
        marginBottom: "20px",
      }}
    >
      {children}
    </p>
  );
}

export function ArticleH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base"
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        color: "var(--color-navy)",
        marginTop: "40px",
        marginBottom: "16px",
      }}
    >
      {children}
    </h2>
  );
}

export function ArticleBoldP({
  bold,
  children,
}: {
  bold: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className="text-sm"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-charcoal)",
        lineHeight: 1.8,
        marginBottom: "16px",
      }}
    >
      <strong style={{ color: "var(--color-navy)", fontWeight: 700 }}>
        {bold}
      </strong>{" "}
      {children}
    </p>
  );
}

export function ArticleCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: "48px",
        paddingTop: "24px",
        borderTop: "0.5px solid #d0dce8",
      }}
    >
      <Link
        href={href}
        className="link-blue text-sm font-medium"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children} &rarr;
      </Link>
    </div>
  );
}

export function ArticleAuthor() {
  return (
    <p
      className="text-xs"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-gray)",
        marginTop: "48px",
        paddingTop: "20px",
        borderTop: "0.5px solid #e8eef4",
        fontStyle: "italic",
      }}
    >
      Written by Jon McAnnis, Principal Advisor at Groundwork Technology Advisors.
    </p>
  );
}

export function ArticleDivider() {
  return (
    <div
      style={{
        margin: "40px 0",
        paddingTop: "24px",
        borderTop: "0.5px solid #d0dce8",
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        color: "var(--color-charcoal)",
        lineHeight: 1.8,
      }}
    />
  );
}
