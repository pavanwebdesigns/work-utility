import type { ReactNode } from "react";

const inputClassName =
  "w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue [color-scheme:dark]";

const labelClassName = "mb-2 block text-sm font-medium text-content-primary";

export function CalculatorField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function CalculatorInput({
  id,
  value,
  onChange,
  placeholder,
  inputMode = "decimal",
  ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "decimal" | "numeric" | "text";
  ariaLabel?: string;
}) {
  return (
    <input
      id={id}
      type="text"
      inputMode={inputMode}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel ?? placeholder}
      className={inputClassName}
    />
  );
}

export function CalculatorSelect({
  id,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  ariaLabel?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className={inputClassName}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function ResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center sm:p-5 ${
        highlight
          ? "border-brand-blue/30 bg-brand-blue/10"
          : "border-surface-border bg-surface-card"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-content-secondary sm:text-sm">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold text-content-primary sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

export function ToggleButtonGroup<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div
      className="inline-flex w-full rounded-xl border border-surface-border bg-surface-card p-1"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-brand-blue text-white"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function BreakdownRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-surface-border py-3 last:border-b-0">
      <span className="text-sm text-content-secondary">{label}</span>
      <span className="text-sm font-semibold text-content-primary">{value}</span>
    </div>
  );
}
