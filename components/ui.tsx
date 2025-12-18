"use client";

import * as React from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-medium text-neutral-600">{children}</div>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm",
        "outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm",
        "outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }
) {
  const variant = props.variant ?? "secondary";
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition outline-none focus:ring-2 focus:ring-neutral-200";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : variant === "danger"
        ? "bg-red-600 text-white hover:bg-red-500"
        : "border border-neutral-200 bg-white hover:bg-neutral-50";

  return (
    <button {...props} className={[base, styles, props.className ?? ""].join(" ")} />
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-neutral-200 bg-white p-4">{children}</div>;
}

export function Divider() {
  return <div className="my-5 h-px w-full bg-neutral-100" />;
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300"
      />
      {label ? <span className="text-neutral-700">{label}</span> : null}
    </label>
  );
}
