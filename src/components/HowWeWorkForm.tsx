"use client";
import { useState } from "react";

type State = "idle" | "submitting" | "success";

export default function HowWeWorkForm() {
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xaqanajg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
      } else {
        form.submit();
      }
    } catch {
      form.submit();
    }
  }

  return (
    <section style={{ backgroundColor: "var(--color-pale)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          className="max-w-3xl"
          style={{
            background: "#e8f0f7",
            borderRadius: "8px",
            padding: "24px 28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: "1", minWidth: "200px" }}>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "var(--color-navy)",
                marginBottom: "6px",
              }}
            >
              Does this sound like your organization?
            </p>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-charcoal)",
                lineHeight: 1.6,
              }}
            >
              Every engagement starts with a conversation to make sure the scope
              is right. No pitch — just an honest discussion about whether there
              is a useful fit.
            </p>
          </div>

          {state === "success" ? (
            <div
              className="text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#3b6d11",
                background: "#eaf3de",
                padding: "12px 16px",
                borderRadius: "5px",
                alignSelf: "center",
              }}
            >
              Thanks, we will be in touch shortly.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "7px", minWidth: "220px" }}
            >
              <input type="hidden" name="inquiry_source" value="Sample Engagement Page" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="text-sm"
                style={{
                  padding: "8px 11px",
                  border: "0.5px solid #c0ccd8",
                  borderRadius: "5px",
                  fontFamily: "var(--font-sans)",
                  background: "white",
                  color: "var(--color-charcoal)",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="text-sm"
                style={{
                  padding: "8px 11px",
                  border: "0.5px solid #c0ccd8",
                  borderRadius: "5px",
                  fontFamily: "var(--font-sans)",
                  background: "white",
                  color: "var(--color-charcoal)",
                }}
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="text-sm"
                style={{
                  padding: "9px 16px",
                  background: "var(--color-navy)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                  opacity: state === "submitting" ? 0.6 : 1,
                }}
              >
                Get in touch
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
