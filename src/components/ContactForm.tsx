"use client";

import { useState, FormEvent } from "react";

// Replace YOUR_FORM_ID with your Formspree form ID after registering at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqanajg";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await response.json().catch(() => ({}));
        setErrorMessage(
          json?.error || "Something went wrong. Please try again or email directly."
        );
        setState("error");
      }
    } catch {
      setErrorMessage(
        "Unable to submit the form. Please email info@groundworktechnologyadvisors.com directly."
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-off-white border border-slate-lighter rounded-lg p-8 text-center">
        <svg
          className="w-10 h-10 text-navy mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="text-navy font-semibold text-lg">Message received.</h3>
        <p className="text-charcoal mt-2 text-sm">
          You will hear back within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-lighter rounded bg-white text-charcoal text-sm placeholder:text-slate focus:outline-none focus:border-slate focus:ring-1 focus:ring-slate transition-colors";
  const labelClass = "block text-sm font-medium text-charcoal mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-slate">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-slate">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-slate">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Briefly describe what you're working on and what kind of help you're looking for."
          className={`${inputClass} resize-y`}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-block bg-navy text-white font-semibold px-6 py-3 rounded hover:bg-navy-light transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
