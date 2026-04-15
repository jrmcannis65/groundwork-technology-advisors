"use client";
import { useState } from "react";

type State = "idle" | "submitting" | "success";

export default function AIReadinessForm() {
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mjgjgejn", {
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
    <div
      style={{
        marginTop: "18px",
        paddingTop: "16px",
        borderTop: "0.5px solid #e8eef4",
      }}
    >
      <p
        className="text-[11px]"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--color-navy)",
          marginBottom: "4px",
        }}
      >
        Start with a conversation
      </p>
      <p
        className="text-sm"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-gray)",
          marginBottom: "12px",
          lineHeight: 1.6,
        }}
      >
        If AI readiness is on your radar, reach out. A brief call is usually
        enough to figure out whether there is a useful fit.
      </p>

      {state === "success" ? (
        <div
          className="text-sm"
          style={{
            fontFamily: "var(--font-sans)",
            color: "#3b6d11",
            background: "#eaf3de",
            padding: "10px 12px",
            borderRadius: "5px",
          }}
        >
          Thanks, we will be in touch shortly.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}
        >
          <input type="hidden" name="inquiry_source" value="AI Readiness Assessment" />
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
            type="text"
            name="company"
            placeholder="Company"
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
              gridColumn: "1 / 3",
            }}
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="text-sm"
            style={{
              gridColumn: "1 / 3",
              padding: "9px",
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
  );
}
