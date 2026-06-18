"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Download, Home } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { USRulesBadge } from "@/components/USRulesBadge";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";
import {
  amortizationToCsv,
  calculateMortgage,
  formatPayoffDate,
  type DownPaymentMode,
  type LoanTermYears,
  type PropertyTaxMode,
} from "@/lib/mortgage-calculator";

export default function MortgageCalculatorPage() {
  const { symbol, currency } = useUSRulesCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [homePrice, setHomePrice] = useState("500000");
  const [downPaymentMode, setDownPaymentMode] =
    useState<DownPaymentMode>("percent");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [downPaymentDollar, setDownPaymentDollar] = useState("100000");
  const [loanTermYears, setLoanTermYears] = useState<LoanTermYears>(30);
  const [interestRatePercent, setInterestRatePercent] = useState("6.5");
  const [propertyTaxMode, setPropertyTaxMode] =
    useState<PropertyTaxMode>("percent");
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState("6000");
  const [propertyTaxPercent, setPropertyTaxPercent] = useState("1.2");
  const [homeownersInsuranceAnnual, setHomeownersInsuranceAnnual] =
    useState("1800");
  const [hoaMonthly, setHoaMonthly] = useState("0");
  const [pmiRatePercent, setPmiRatePercent] = useState("0.75");
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState("0");
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const result = useMemo(() => {
    return calculateMortgage({
      homePrice: parseNumberInput(homePrice),
      downPaymentMode,
      downPaymentPercent: parseNumberInput(downPaymentPercent),
      downPaymentDollar: parseNumberInput(downPaymentDollar),
      loanTermYears,
      interestRatePercent: parseNumberInput(interestRatePercent),
      propertyTaxMode,
      propertyTaxAnnual: parseNumberInput(propertyTaxAnnual),
      propertyTaxPercent: parseNumberInput(propertyTaxPercent),
      homeownersInsuranceAnnual: parseNumberInput(homeownersInsuranceAnnual),
      hoaMonthly: parseNumberInput(hoaMonthly),
      pmiRatePercent: parseNumberInput(pmiRatePercent),
      extraMonthlyPayment: parseNumberInput(extraMonthlyPayment),
    });
  }, [
    downPaymentDollar,
    downPaymentMode,
    downPaymentPercent,
    extraMonthlyPayment,
    hoaMonthly,
    homePrice,
    homeownersInsuranceAnnual,
    interestRatePercent,
    loanTermYears,
    pmiRatePercent,
    propertyTaxAnnual,
    propertyTaxMode,
    propertyTaxPercent,
  ]);

  const visibleSchedule = result
    ? showFullSchedule
      ? result.schedule
      : result.schedule.slice(0, 12)
    : [];

  const handleDownloadCsv = () => {
    if (!result) return;
    const csv = amortizationToCsv(result.schedule);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amortization-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Home className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Mortgage Calculator — Monthly Payment & Amortization
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate PITI monthly payment, PMI, total interest, payoff date, and
              full amortization schedule with extra-payment simulator.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="mortgage-calculator" />
            </div>
          </div>

          <USRulesBadge toolSlug="mortgage-calculator" />

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <CalculatorField label={`Home Price (${symbol})`} htmlFor="home-price">
              <CalculatorInput
                id="home-price"
                value={homePrice}
                onChange={setHomePrice}
                placeholder="500,000"
              />
            </CalculatorField>

            <CalculatorField label="Down Payment" htmlFor="down-mode">
              <ToggleButtonGroup
                value={downPaymentMode}
                onChange={setDownPaymentMode}
                ariaLabel="Down payment mode"
                options={[
                  { value: "percent", label: "%" },
                  { value: "dollar", label: symbol },
                ]}
              />
            </CalculatorField>

            {downPaymentMode === "percent" ? (
              <CalculatorField label="Down Payment (%)" htmlFor="down-percent">
                <CalculatorInput
                  id="down-percent"
                  value={downPaymentPercent}
                  onChange={setDownPaymentPercent}
                  placeholder="20"
                />
              </CalculatorField>
            ) : (
              <CalculatorField label={`Down Payment (${symbol})`} htmlFor="down-dollar">
                <CalculatorInput
                  id="down-dollar"
                  value={downPaymentDollar}
                  onChange={setDownPaymentDollar}
                  placeholder="100,000"
                />
              </CalculatorField>
            )}

            <CalculatorField label="Loan Term" htmlFor="loan-term">
              <ToggleButtonGroup
                value={String(loanTermYears)}
                onChange={(value) =>
                  setLoanTermYears(Number(value) as LoanTermYears)
                }
                ariaLabel="Loan term"
                options={[
                  { value: "15", label: "15 yr" },
                  { value: "20", label: "20 yr" },
                  { value: "30", label: "30 yr" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Interest Rate (%)" htmlFor="interest-rate">
              <CalculatorInput
                id="interest-rate"
                value={interestRatePercent}
                onChange={setInterestRatePercent}
                placeholder="6.5"
              />
            </CalculatorField>

            <CalculatorField label="Property Tax" htmlFor="tax-mode">
              <ToggleButtonGroup
                value={propertyTaxMode}
                onChange={setPropertyTaxMode}
                ariaLabel="Property tax mode"
                options={[
                  { value: "annual", label: `${symbol}/yr` },
                  { value: "percent", label: "% of value" },
                ]}
              />
            </CalculatorField>

            {propertyTaxMode === "annual" ? (
              <CalculatorField
                label={`Property Tax (${symbol}/year)`}
                htmlFor="tax-annual"
              >
                <CalculatorInput
                  id="tax-annual"
                  value={propertyTaxAnnual}
                  onChange={setPropertyTaxAnnual}
                  placeholder="6,000"
                />
              </CalculatorField>
            ) : (
              <CalculatorField label="Property Tax (%)" htmlFor="tax-percent">
                <CalculatorInput
                  id="tax-percent"
                  value={propertyTaxPercent}
                  onChange={setPropertyTaxPercent}
                  placeholder="1.2"
                />
              </CalculatorField>
            )}

            <CalculatorField
              label={`Homeowners Insurance (${symbol}/year)`}
              htmlFor="insurance"
            >
              <CalculatorInput
                id="insurance"
                value={homeownersInsuranceAnnual}
                onChange={setHomeownersInsuranceAnnual}
                placeholder="1,800"
              />
            </CalculatorField>

            <CalculatorField label={`HOA Fees (${symbol}/month)`} htmlFor="hoa">
              <CalculatorInput
                id="hoa"
                value={hoaMonthly}
                onChange={setHoaMonthly}
                placeholder="0"
              />
            </CalculatorField>

            <CalculatorField label="PMI Rate (% of loan/yr)" htmlFor="pmi">
              <CalculatorInput
                id="pmi"
                value={pmiRatePercent}
                onChange={setPmiRatePercent}
                placeholder="0.75"
              />
              <p className="mt-2 text-xs text-content-muted">
                Applied when down payment is under 20%. Removal shown when loan
                balance reaches 80% LTV — informational only.
              </p>
            </CalculatorField>

            <CalculatorField
              label={`Extra Monthly Payment (${symbol})`}
              htmlFor="extra"
            >
              <CalculatorInput
                id="extra"
                value={extraMonthlyPayment}
                onChange={setExtraMonthlyPayment}
                placeholder="0"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-4xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Total Monthly Payment"
                  value={fmt(result.totalMonthlyPayment, 2)}
                  highlight
                />
                <ResultCard
                  label="Principal & Interest"
                  value={fmt(result.monthlyPrincipalAndInterest, 2)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <p className="py-3 font-semibold text-content-primary">
                  Monthly Payment Breakdown (PITI + PMI + HOA)
                </p>
                <BreakdownRow
                  label="Principal & Interest"
                  value={fmt(result.monthlyPrincipalAndInterest, 2)}
                />
                <BreakdownRow
                  label="Property Tax"
                  value={fmt(result.monthlyPropertyTax, 2)}
                />
                <BreakdownRow
                  label="Homeowners Insurance"
                  value={fmt(result.monthlyInsurance, 2)}
                />
                <BreakdownRow
                  label={result.hasPmi ? "PMI (estimated)" : "PMI (not required)"}
                  value={fmt(result.monthlyPmi, 2)}
                />
                <BreakdownRow label="HOA" value={fmt(result.monthlyHoa, 2)} />
                <BreakdownRow
                  label="Total Monthly"
                  value={fmt(result.totalMonthlyPayment, 2)}
                />
                <p className="border-t border-surface-border py-3 text-xs text-content-muted">
                  Loan amount: {fmt(result.loanAmount, 0)} · Down payment:{" "}
                  {fmt(result.downPayment, 0)} · Payoff:{" "}
                  {formatPayoffDate(result.payoffDate)} · Total interest:{" "}
                  {fmt(result.totalInterestPaid, 0)}
                  {result.hasPmi && result.pmiRemovedMonth
                    ? ` · PMI may drop around month ${result.pmiRemovedMonth}`
                    : ""}
                </p>
              </div>

              {result.extraPaymentSummary && (
                <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-4">
                  <p className="text-sm font-semibold text-content-primary">
                    Extra Payment Impact
                  </p>
                  <p className="mt-2 text-sm text-content-secondary">
                    New payoff:{" "}
                    {formatPayoffDate(result.extraPaymentSummary.newPayoffDate)} ·{" "}
                    {result.extraPaymentSummary.monthsSaved} months saved · Interest
                    saved: {fmt(result.extraPaymentSummary.interestSaved, 0)}
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold text-content-primary">
                    Amortization Schedule
                  </h2>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:bg-surface-card"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download CSV
                    </button>
                    {result.schedule.length > 12 && (
                      <button
                        type="button"
                        onClick={() => setShowFullSchedule((open) => !open)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:bg-surface-card"
                      >
                        {showFullSchedule ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Show first 12
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            Show all {result.schedule.length} months
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`overflow-x-auto ${showFullSchedule ? "max-h-[28rem] overflow-y-auto" : ""}`}
                >
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="sticky top-0 bg-surface-card text-content-secondary">
                      <tr>
                        <th className="px-2 py-2 font-medium">Month</th>
                        <th className="px-2 py-2 font-medium">Payment</th>
                        <th className="px-2 py-2 font-medium">Principal</th>
                        <th className="px-2 py-2 font-medium">Interest</th>
                        <th className="px-2 py-2 font-medium">Extra</th>
                        <th className="px-2 py-2 font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSchedule.map((row) => (
                        <tr
                          key={row.month}
                          className="border-t border-surface-border/60"
                        >
                          <td className="px-2 py-2 text-content-primary">
                            {row.month}
                          </td>
                          <td className="px-2 py-2">{fmt(row.payment, 2)}</td>
                          <td className="px-2 py-2">{fmt(row.principal, 2)}</td>
                          <td className="px-2 py-2">{fmt(row.interest, 2)}</td>
                          <td className="px-2 py-2">
                            {row.extraPayment > 0
                              ? fmt(row.extraPayment, 2)
                              : "—"}
                          </td>
                          <td className="px-2 py-2">
                            {fmt(row.remainingBalance, 2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <RelatedTools currentSlug="mortgage-calculator" />
          <ToolSeoContent slug="mortgage-calculator" />
          <ToolFeedback toolName="Mortgage Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
