"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Free",
    tagline: "For trying DeepTrace on real cases",
    monthly: 0,
    annual: 0,
    cta: { label: "Get Started Free", href: "/dashboard" },
    features: [
      "100 verifications / month",
      "Image & text verification",
      "Sandbox access",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For newsrooms and moderation teams",
    monthly: 249,
    annual: 199,
    highlighted: true,
    cta: { label: "Start Pro Trial", href: "/dashboard" },
    features: [
      "5,000 verifications / month",
      "Image, audio, video & text",
      "Full API + webhook access",
      "Exportable audit trails",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For platforms, governments & agencies",
    monthly: null,
    annual: null,
    cta: { label: "Talk to Sales", href: "/contact" },
    features: [
      "Unlimited verifications",
      "Dedicated / on-prem deployment",
      "SSO & audit logging",
      "Custom SLAs & uptime guarantees",
      "Dedicated support engineer",
    ],
  },
];

export function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm", !annual ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-500")}>
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual((v) => !v)}
          className="relative h-6 w-11 rounded-full bg-slate-200 transition-colors dark:bg-slate-800"
        >
          <span
            className={cn(
              "absolute top-1 h-4 w-4 rounded-full bg-slate-900 transition-transform dark:bg-slate-100",
              annual ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
        <span className={cn("text-sm", annual ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-500")}>
          Annual
        </span>
        <span className="rounded-full bg-emerald-600/10 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          Save 20%
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col rounded-lg border bg-white p-6 dark:bg-slate-900",
              tier.highlighted
                ? "border-slate-900 ring-1 ring-slate-900 dark:border-slate-100 dark:ring-slate-100"
                : "border-slate-200 dark:border-slate-800"
            )}
          >
            {tier.highlighted && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-slate-900 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-50 dark:bg-slate-100 dark:text-slate-900">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tier.name}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">{tier.tagline}</p>

            <div className="mt-5">
              {tier.monthly === null ? (
                <span className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">Custom</span>
              ) : (
                <span className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold tabular text-slate-900 dark:text-slate-100">
                    ${annual ? tier.annual : tier.monthly}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-500">/ month</span>
                </span>
              )}
            </div>

            <a
              href={tier.cta.href}
              className={cn(
                "mt-6 flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                tier.highlighted
                  ? "bg-slate-900 text-slate-50 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  : "border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
              )}
            >
              {tier.cta.label}
            </a>

            <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-6 dark:border-slate-800">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
