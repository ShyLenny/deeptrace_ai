"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const REASONS = ["General inquiry", "Enterprise / pilot", "Request a demo", "Support"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-6 py-16 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
        <h3 className="mt-4 text-sm font-semibold text-emerald-900 dark:text-emerald-400">Message sent</h3>
        <p className="mt-1.5 max-w-sm text-sm text-emerald-900/80 dark:text-emerald-200/80">
          We reply to every message within one business day. You&apos;ll hear from us at the
          address you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Jordan Rivera"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="jordan@newsroom.org"
          />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Meridian News Desk"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reason for contact</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {REASONS.map((reason, i) => (
            <label
              key={reason}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600 has-[:checked]:border-slate-900 has-[:checked]:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:has-[:checked]:border-slate-100 dark:has-[:checked]:text-slate-100"
            >
              <input type="radio" name="reason" value={reason} defaultChecked={i === 0} className="accent-slate-900 dark:accent-slate-100" />
              {reason}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Tell us about your use case and current volume."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
