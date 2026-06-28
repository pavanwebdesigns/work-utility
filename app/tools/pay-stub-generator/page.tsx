"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DollarSign, Lock, Plus, Printer, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { USRulesBadge } from "@/components/USRulesBadge";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import {
  CalculatorField,
  CalculatorInput,
} from "@/components/calculator/CalculatorUi";
import {
  PAY_STUB_DISCLAIMER,
  calculatePayStub,
  createEarningRow,
  createOtherDeductionRow,
  earningAmount,
  formatPayDate,
  type EarningRow,
  type OtherDeductionRow,
} from "@/lib/pay-stub-generator";
import { formatCurrency } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";

function fmtMoney(value: number, currency: "USD") {
  return formatCurrency(value, currency, 2);
}

function defaultPayPeriod() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    payDate: end.toISOString().slice(0, 10),
  };
}

const defaults = defaultPayPeriod();

export default function PayStubGeneratorPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => fmtMoney(v, currency);

  const [companyName, setCompanyName] = useState("Acme Corp");
  const [companyAddress, setCompanyAddress] = useState("123 Business Ave, San Francisco, CA 94102");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState("Jane Smith");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("456 Home St, Oakland, CA 94601");
  const [payPeriodStart, setPayPeriodStart] = useState(defaults.start);
  const [payPeriodEnd, setPayPeriodEnd] = useState(defaults.end);
  const [payDate, setPayDate] = useState(defaults.payDate);
  const [ssnLast4, setSsnLast4] = useState("");
  const [department, setDepartment] = useState("");
  const [earnings, setEarnings] = useState<EarningRow[]>([createEarningRow()]);
  const [federalTaxOverride, setFederalTaxOverride] = useState<string | null>(null);
  const [stateTax, setStateTax] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState<OtherDeductionRow[]>([]);

  const calc = useMemo(
    () =>
      calculatePayStub({
        companyName,
        companyAddress,
        companyPhone,
        companyLogo,
        employeeName,
        employeeId,
        employeeAddress,
        payPeriodStart,
        payPeriodEnd,
        payDate,
        ssnLast4,
        department,
        earnings,
        federalTaxOverride:
          federalTaxOverride !== null && federalTaxOverride !== ""
            ? Number(federalTaxOverride)
            : null,
        stateTax: Number(stateTax) || 0,
        otherDeductions,
        ytdGross: null,
        ytdFederalTax: null,
        ytdNet: null,
      }),
    [
      companyAddress,
      companyLogo,
      companyName,
      companyPhone,
      department,
      employeeAddress,
      employeeId,
      employeeName,
      earnings,
      federalTaxOverride,
      otherDeductions,
      payDate,
      payPeriodEnd,
      payPeriodStart,
      ssnLast4,
      stateTax,
    ],
  );

  const updateEarning = (id: string, patch: Partial<EarningRow>) => {
    setEarnings((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCompanyLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center print:hidden">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <DollarSign className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Pay Stub Generator — US Paycheck Creator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Generate a professional US pay stub with earnings and deductions.
              Preview instantly and print or save as PDF.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="pay-stub-generator" />
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-center text-sm text-content-secondary print:hidden">
            <Lock className="mx-auto mb-1 h-4 w-4" />
            Your pay information stays in your browser — nothing is sent to any
            server. Close this page to clear all data.
          </div>

          <USRulesBadge toolSlug="pay-stub-generator" />

          <div className="mx-auto mt-8 grid max-w-5xl gap-8 lg:grid-cols-2 print:hidden">
            <div className="space-y-6">
              <section className="space-y-3">
                <h2 className="font-semibold text-content-primary">Company Details</h2>
                <CalculatorField label="Company Name" htmlFor="company-name">
                  <CalculatorInput id="company-name" value={companyName} onChange={setCompanyName} />
                </CalculatorField>
                <CalculatorField label="Company Address" htmlFor="company-address">
                  <CalculatorInput id="company-address" value={companyAddress} onChange={setCompanyAddress} />
                </CalculatorField>
                <CalculatorField label="Phone (optional)" htmlFor="company-phone">
                  <CalculatorInput id="company-phone" value={companyPhone} onChange={setCompanyPhone} />
                </CalculatorField>
                <CalculatorField label="Logo (optional)" htmlFor="company-logo">
                  <input
                    id="company-logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e.target.files?.[0] ?? null)}
                    className="w-full text-sm"
                  />
                </CalculatorField>
              </section>

              <section className="space-y-3">
                <h2 className="font-semibold text-content-primary">Employee Details</h2>
                <CalculatorField label="Employee Name" htmlFor="employee-name">
                  <CalculatorInput id="employee-name" value={employeeName} onChange={setEmployeeName} />
                </CalculatorField>
                <CalculatorField label="Employee ID (optional)" htmlFor="employee-id">
                  <CalculatorInput id="employee-id" value={employeeId} onChange={setEmployeeId} />
                </CalculatorField>
                <CalculatorField label="Address" htmlFor="employee-address">
                  <CalculatorInput id="employee-address" value={employeeAddress} onChange={setEmployeeAddress} />
                </CalculatorField>
                <div className="grid gap-3 sm:grid-cols-2">
                  <CalculatorField label="Pay Period Start" htmlFor="period-start">
                    <input
                      id="period-start"
                      type="date"
                      value={payPeriodStart}
                      onChange={(e) => setPayPeriodStart(e.target.value)}
                      className="w-full rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm"
                    />
                  </CalculatorField>
                  <CalculatorField label="Pay Period End" htmlFor="period-end">
                    <input
                      id="period-end"
                      type="date"
                      value={payPeriodEnd}
                      onChange={(e) => setPayPeriodEnd(e.target.value)}
                      className="w-full rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm"
                    />
                  </CalculatorField>
                </div>
                <CalculatorField label="Pay Date" htmlFor="pay-date">
                  <input
                    id="pay-date"
                    type="date"
                    value={payDate}
                    onChange={(e) => setPayDate(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm"
                  />
                </CalculatorField>
                <CalculatorField label="Department (optional)" htmlFor="department">
                  <CalculatorInput
                    id="department"
                    value={department}
                    onChange={setDepartment}
                    placeholder="Engineering"
                  />
                </CalculatorField>
                <CalculatorField label="SSN (last 4 digits only)" htmlFor="ssn">
                  <CalculatorInput
                    id="ssn"
                    value={ssnLast4}
                    onChange={(v) => setSsnLast4(v.replace(/\D/g, "").slice(0, 4))}
                    placeholder="1234"
                  />
                </CalculatorField>
                <p className="text-xs text-content-muted">
                  Only last 4 digits shown on stub for security.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-content-primary">Earnings</h2>
                  <button
                    type="button"
                    onClick={() => setEarnings((p) => [...p, createEarningRow("", 0, 0)])}
                    className="inline-flex items-center gap-1 text-sm text-brand-blue"
                  >
                    <Plus className="h-4 w-4" /> Add row
                  </button>
                </div>
                {earnings.map((row) => (
                  <div key={row.id} className="grid gap-2 rounded-lg border border-surface-border p-3 sm:grid-cols-4">
                    <input
                      value={row.type}
                      onChange={(e) => updateEarning(row.id, { type: e.target.value })}
                      placeholder="Type"
                      className="rounded border border-surface-border px-2 py-1 text-sm sm:col-span-4"
                    />
                    <input
                      type="number"
                      value={row.hours}
                      onChange={(e) => updateEarning(row.id, { hours: Number(e.target.value) })}
                      placeholder="Hours"
                      className="rounded border border-surface-border px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      value={row.rate}
                      onChange={(e) => updateEarning(row.id, { rate: Number(e.target.value) })}
                      placeholder="Rate"
                      className="rounded border border-surface-border px-2 py-1 text-sm"
                    />
                    <span className="self-center text-sm font-medium sm:col-span-2">
                      {fmt(earningAmount(row))}
                    </span>
                    {earnings.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setEarnings((p) => p.filter((r) => r.id !== row.id))}
                        className="text-content-muted hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <h2 className="font-semibold text-content-primary">Deductions</h2>
                <CalculatorField label={`Federal Income Tax${calc.federalTaxEstimated ? " (estimated)" : ""}`} htmlFor="federal">
                  <CalculatorInput
                    id="federal"
                    value={federalTaxOverride ?? String(calc.federalTax.toFixed(2))}
                    onChange={(v) => setFederalTaxOverride(v)}
                    placeholder="Auto"
                  />
                </CalculatorField>
                <p className="text-xs text-content-muted">
                  Social Security: {fmt(calc.socialSecurity)} (6.2%) · Medicare:{" "}
                  {fmt(calc.medicare)} (1.45%) — auto-calculated
                </p>
                <CalculatorField label="State Income Tax" htmlFor="state-tax">
                  <CalculatorInput
                    id="state-tax"
                    value={stateTax}
                    onChange={setStateTax}
                    placeholder="0"
                  />
                </CalculatorField>
                <p className="text-xs text-content-muted">
                  Enter your state income tax deduction or 0 if not applicable.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Other Deductions</span>
                  <button
                    type="button"
                    onClick={() =>
                      setOtherDeductions((p) => [...p, createOtherDeductionRow()])
                    }
                    className="text-sm text-brand-blue"
                  >
                    + Add
                  </button>
                </div>
                {otherDeductions.map((d) => (
                  <div key={d.id} className="flex gap-2">
                    <input
                      value={d.label}
                      onChange={(e) =>
                        setOtherDeductions((p) =>
                          p.map((x) =>
                            x.id === d.id ? { ...x, label: e.target.value } : x,
                          ),
                        )
                      }
                      className="flex-1 rounded border border-surface-border px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      value={d.amount}
                      onChange={(e) =>
                        setOtherDeductions((p) =>
                          p.map((x) =>
                            x.id === d.id
                              ? { ...x, amount: Number(e.target.value) }
                              : x,
                          ),
                        )
                      }
                      className="w-24 rounded border border-surface-border px-2 py-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setOtherDeductions((p) => p.filter((x) => x.id !== d.id))
                      }
                    >
                      <Trash2 className="h-4 w-4 text-content-muted" />
                    </button>
                  </div>
                ))}
              </section>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between print:hidden">
                <h2 className="font-semibold text-content-primary">Pay Stub Preview</h2>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
                >
                  <Printer className="h-4 w-4" />
                  Print / Save as PDF
                </button>
              </div>

              <div
                id="pay-stub-preview"
                className="rounded-xl border border-surface-border bg-white p-6 text-gray-900 shadow-sm print:shadow-none"
              >
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    {companyLogo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={companyLogo}
                        alt="Company logo"
                        className="mb-2 h-10 object-contain"
                      />
                    )}
                    <p className="text-lg font-bold">{companyName}</p>
                    <p className="text-xs text-gray-600">{companyAddress}</p>
                    {companyPhone && (
                      <p className="text-xs text-gray-600">{companyPhone}</p>
                    )}
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-semibold">EARNINGS STATEMENT</p>
                    <p>Pay Date: {formatPayDate(payDate)}</p>
                    <p>
                      Period: {formatPayDate(payPeriodStart)} –{" "}
                      {formatPayDate(payPeriodEnd)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-gray-700">Employee</p>
                    <p>{employeeName}</p>
                    <p className="text-gray-600">{employeeAddress}</p>
                    {employeeId && <p>ID: {employeeId}</p>}
                    {department && <p>Dept: {department}</p>}
                    {ssnLast4 && <p>SSN: XXX-XX-{ssnLast4}</p>}
                  </div>
                </div>

                <table className="mt-6 w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-1 text-left">Earnings</th>
                      <th className="py-1 text-right">Hours</th>
                      <th className="py-1 text-right">Rate</th>
                      <th className="py-1 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earnings.map((row) => (
                      <tr key={row.id}>
                        <td className="py-1">{row.type}</td>
                        <td className="py-1 text-right">{row.hours}</td>
                        <td className="py-1 text-right">{fmt(row.rate)}</td>
                        <td className="py-1 text-right">{fmt(earningAmount(row))}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-300 font-semibold">
                      <td colSpan={3} className="py-1">Gross Pay</td>
                      <td className="py-1 text-right">{fmt(calc.grossPay)}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="mt-4 w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-1 text-left">Deductions</th>
                      <th className="py-1 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">Federal Income Tax</td>
                      <td className="py-1 text-right">{fmt(calc.federalTax)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Social Security</td>
                      <td className="py-1 text-right">{fmt(calc.socialSecurity)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Medicare</td>
                      <td className="py-1 text-right">{fmt(calc.medicare)}</td>
                    </tr>
                    {calc.stateTax > 0 && (
                      <tr>
                        <td className="py-1">State Income Tax</td>
                        <td className="py-1 text-right">{fmt(calc.stateTax)}</td>
                      </tr>
                    )}
                    {otherDeductions.map((d) =>
                      d.amount > 0 ? (
                        <tr key={d.id}>
                          <td className="py-1">{d.label}</td>
                          <td className="py-1 text-right">{fmt(d.amount)}</td>
                        </tr>
                      ) : null,
                    )}
                    <tr className="border-t border-gray-300 font-semibold">
                      <td className="py-1">Total Deductions</td>
                      <td className="py-1 text-right">{fmt(calc.totalDeductions)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 rounded-lg bg-gray-100 px-4 py-3 text-center">
                  <p className="text-xs text-gray-600">NET PAY</p>
                  <p className="text-2xl font-bold text-gray-900">{fmt(calc.netPay)}</p>
                </div>

                <p className="mt-4 text-center text-[10px] text-gray-500">
                  This is not an official tax document
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted print:hidden">
            {PAY_STUB_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 print:hidden">
            {[
              { icon: Lock, title: "Browser-only", desc: "No data sent to servers" },
              { icon: Printer, title: "Print to PDF", desc: "Save via browser print" },
              { icon: DollarSign, title: "FICA auto", desc: "SS & Medicare calculated" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-brand-blue" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="print:hidden">
            <RelatedTools currentSlug="pay-stub-generator" />
            <ToolFeedback toolName="Pay Stub Generator" />
            <ToolSeoContent slug="pay-stub-generator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media print {
          header,
          footer,
          nav,
          .print\\:hidden {
            display: none !important;
          }
          #pay-stub-preview {
            border: none;
            box-shadow: none;
            margin: 0 auto;
            max-width: 100%;
          }
          main {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
