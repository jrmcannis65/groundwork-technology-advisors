"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function renderMessage(text: string) {
  return text.split("\n\n").map((block, bi) => {
    const lines = block.split("\n");
    return (
      <div key={bi} style={{ marginBottom: "12px" }}>
        {lines.map((line, li) => {
          if (!line.trim()) return null;
          // Bullet points
          if (line.startsWith("- ")) {
            const inner = line.slice(2).split(/\*\*(.+?)\*\*/g);
            return (
              <div key={li} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                <span style={{ color: "var(--color-blue)", flexShrink: 0, marginTop: "1px" }}>•</span>
                <span className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.6 }}>
                  {inner.map((part, pi) =>
                    pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part
                  )}
                </span>
              </div>
            );
          }
          // Section header: entire line is **bold**
          if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            return (
              <p key={li} className="text-[11px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px", marginTop: bi > 0 ? "4px" : 0 }}>
                {line.slice(2, -2)}
              </p>
            );
          }
          // Regular text with optional inline bold
          const parts = line.split(/\*\*(.+?)\*\*/g);
          return (
            <p key={li} className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", lineHeight: 1.65, marginBottom: "4px" }}>
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

export default function DiagnosticTool() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasRecommendation = messages.some(
    (m) => m.role === "assistant" && m.content.includes("The right starting point")
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setError("");

    const newMessages: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/diagnostic/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please email info@groundworktechnologyadvisors.com to describe your situation directly.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      setError("Something went wrong. Please email info@groundworktechnologyadvisors.com to describe your situation directly.");
    } finally {
      setLoading(false);
    }
  }

  function handleStart() {
    const text = textareaRef.current?.value ?? "";
    if (!text.trim()) return;
    setStarted(true);
    sendMessage(text);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputRef.current?.value ?? "");
    }
  }

  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h1 style={{ color: "white" }}>Technology Problem Diagnostic</h1>
          <p className="text-sm mt-4 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.75)" }}>
            Describe your technology challenge and get a specific recommendation on where to start. Takes about 3 minutes.
          </p>
        </div>
      </section>

      {/* Diagnostic interface */}
      <section style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>

            {/* Intro */}
            {!started && (
              <p className="text-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--color-charcoal)" }}>
                Describe the technology challenge your organization is facing and this tool will help identify where to start. Be as specific as you want about your situation.
              </p>
            )}

            {/* Conversation */}
            {messages.length > 0 && (
              <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "88%",
                        padding: "12px 16px",
                        borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                        background: msg.role === "user" ? "#dbeafe" : "white",
                        border: msg.role === "assistant" ? "0.5px solid #d0dce8" : "none",
                      }}
                    >
                      {msg.role === "user" ? (
                        <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", lineHeight: 1.6, margin: 0 }}>
                          {msg.content}
                        </p>
                      ) : (
                        renderMessage(msg.content)
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "12px 16px", borderRadius: "12px 12px 12px 2px", background: "white", border: "0.5px solid #d0dce8", display: "flex", gap: "5px", alignItems: "center" }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1a3a5c", display: "inline-block", animation: "diag-bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
                      ))}
                      <style>{`@keyframes diag-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }`}</style>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            )}

            {/* CTA after recommendation */}
            {hasRecommendation && (
              <div style={{ marginBottom: "24px", padding: "16px 20px", background: "#e8f0f7", borderRadius: "8px", borderLeft: "3px solid var(--color-blue)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <p className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--color-navy)", margin: 0, lineHeight: 1.5 }}>
                  Ready to talk through your situation?
                </p>
                <Link href="/contact/" className="btn-primary" style={{ flexShrink: 0 }}>
                  Get in touch
                </Link>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-sm" style={{ fontFamily: "var(--font-sans)", color: "#a32d2d", background: "#fcebeb", border: "0.5px solid #f0c0c0", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px" }}>
                {error}
              </div>
            )}

            {/* Initial textarea */}
            {!started && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <textarea
                  ref={textareaRef}
                  rows={4}
                  placeholder="Describe what you're dealing with. For example: our engineering team has been missing deadlines and leadership has lost confidence in our technology roadmap..."
                  className="text-sm"
                  style={{ width: "100%", padding: "12px 14px", border: "0.5px solid #c0ccd8", borderRadius: "6px", fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", background: "white", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
                />
                <button
                  type="button"
                  onClick={handleStart}
                  className="text-sm"
                  style={{ alignSelf: "flex-start", padding: "10px 24px", background: "var(--color-navy)", color: "white", border: "none", borderRadius: "6px", fontFamily: "var(--font-sans)", fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px" }}
                >
                  Start Diagnostic
                </button>
              </div>
            )}

            {/* Follow-up input */}
            {started && !hasRecommendation && !error && (
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Your response..."
                  onKeyDown={handleInputKeyDown}
                  disabled={loading}
                  className="text-sm"
                  style={{ flex: 1, padding: "10px 14px", border: "0.5px solid #c0ccd8", borderRadius: "6px", fontFamily: "var(--font-sans)", color: "var(--color-charcoal)", background: "white", opacity: loading ? 0.6 : 1 }}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(inputRef.current?.value ?? "")}
                  disabled={loading}
                  className="text-sm"
                  style={{ padding: "10px 20px", background: "var(--color-navy)", color: "white", border: "none", borderRadius: "6px", fontFamily: "var(--font-sans)", fontWeight: 600, cursor: loading ? "default" : "pointer", opacity: loading ? 0.5 : 1, whiteSpace: "nowrap" }}
                >
                  Send
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
