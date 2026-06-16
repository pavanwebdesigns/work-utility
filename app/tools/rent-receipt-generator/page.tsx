"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, FileText, Printer, Receipt } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
} from "@/components/calculator/CalculatorUi";
import { parseNumberInput } from "@/lib/format-inr";
import {
  MONTH_OPTIONS,
  PAYMENT_MODES,
  formatReceiptDate,
  formatRentAmount,
  generateRentReceiptPdf,
  getDefaultReceiptNumber,
  type PaymentMode,
  type RentReceiptInput,
} from "@/lib/rent-receipt-generator";

const currentYear = new Date().getFullYear();

export default function RentReceiptGeneratorPage() {
  const [tenantName, setTenantName] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [rentalAmount, setRentalAmount] = useState("15000");
  const [month, setMonth] = useState<string>(MONTH_OPTIONS[new Date().getMonth()]);
  const [year, setYear] = useState(String(currentYear));
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("UPI");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [landlordPan, setLandlordPan] = useState("");
  const [receiptNumber, setReceiptNumber] = useState(getDefaultReceiptNumber());
  const [selectedMonths, setSelectedMonths] = useState<string[]>([MONTH_OPTIONS[new Date().getMonth()]]);
  const [isGenerating, setIsGenerating] = useState(false);

  const previewReceipt: RentReceiptInput = useMemo(
    () => ({
      tenantName: tenantName || "Tenant Name",
      landlordName: landlordName || "Landlord Name",
      rentalAmount: parseNumberInput(rentalAmount),
      month,
      year,
      paymentMode,
      propertyAddress: propertyAddress || "Property address will appear here",
      landlordPan: landlordPan || undefined,
      receiptNumber,
    }),
    [
      landlordName,
      landlordPan,
      month,
      paymentMode,
      propertyAddress,
      receiptNumber,
      rentalAmount,
      tenantName,
      year,
    ]
  );

  const receiptsToGenerate = useMemo(() => {
    return selectedMonths.map((selectedMonth, index) => ({
      ...previewReceipt,
      tenantName: tenantName || "Tenant Name",
      landlordName: landlordName || "Landlord Name",
      propertyAddress: propertyAddress || "Property address will appear here",
      month: selectedMonth,
      receiptNumber: `${receiptNumber}-${String(index + 1).padStart(2, "0")}`,
    }));
  }, [landlordName, previewReceipt, propertyAddress, receiptNumber, selectedMonths, tenantName]);

  const toggleMonth = (value: string) => {
    setSelectedMonths((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleDownload = async () => {
    if (!tenantName || !landlordName || !propertyAddress || selectedMonths.length === 0) {
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generateRentReceiptPdf(receiptsToGenerate);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download =
        selectedMonths.length > 1
          ? `rent-receipts-${year}.pdf`
          : `rent-receipt-${month}-${year}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10 print:hidden">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center print:hidden">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Receipt className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Rent Receipt Generator — Create & Download Rent Receipt PDF Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate professional rent receipts for HRA claims. Download PDF
              for one or multiple months instantly.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="rent-receipt-generator" />
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2 print:hidden">
            <div className="space-y-4">
              <CalculatorField label="Tenant Name" htmlFor="tenant-name">
                <CalculatorInput id="tenant-name" value={tenantName} onChange={setTenantName} placeholder="Tenant full name" inputMode="text" />
              </CalculatorField>
              <CalculatorField label="Landlord Name" htmlFor="landlord-name">
                <CalculatorInput id="landlord-name" value={landlordName} onChange={setLandlordName} placeholder="Landlord full name" inputMode="text" />
              </CalculatorField>
              <CalculatorField label="Rental Amount (₹)" htmlFor="rental-amount">
                <CalculatorInput id="rental-amount" value={rentalAmount} onChange={setRentalAmount} placeholder="15,000" />
              </CalculatorField>
              <div className="grid gap-4 sm:grid-cols-2">
                <CalculatorField label="Month" htmlFor="rent-month">
                  <CalculatorSelect
                    id="rent-month"
                    value={month}
                    onChange={(value) => {
                      setMonth(value);
                      if (!selectedMonths.includes(value)) {
                        setSelectedMonths([value]);
                      }
                    }}
                    options={MONTH_OPTIONS.map((item) => ({ value: item, label: item }))}
                    ariaLabel="Rent month"
                  />
                </CalculatorField>
                <CalculatorField label="Year" htmlFor="rent-year">
                  <CalculatorInput id="rent-year" value={year} onChange={setYear} placeholder={String(currentYear)} />
                </CalculatorField>
              </div>
              <CalculatorField label="Payment Mode" htmlFor="payment-mode">
                <CalculatorSelect
                  id="payment-mode"
                  value={paymentMode}
                  onChange={(value) => setPaymentMode(value as PaymentMode)}
                  options={PAYMENT_MODES.map((item) => ({ value: item, label: item }))}
                  ariaLabel="Payment mode"
                />
              </CalculatorField>
              <CalculatorField label="Property Address" htmlFor="property-address">
                <textarea
                  id="property-address"
                  value={propertyAddress}
                  onChange={(event) => setPropertyAddress(event.target.value)}
                  rows={3}
                  placeholder="Flat/House number, street, city, state, PIN"
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue"
                />
              </CalculatorField>
              <CalculatorField label="Landlord PAN (optional)" htmlFor="landlord-pan">
                <CalculatorInput id="landlord-pan" value={landlordPan} onChange={setLandlordPan} placeholder="ABCDE1234F" inputMode="text" />
              </CalculatorField>
              <CalculatorField label="Receipt Number" htmlFor="receipt-number">
                <CalculatorInput id="receipt-number" value={receiptNumber} onChange={setReceiptNumber} placeholder={getDefaultReceiptNumber()} inputMode="text" />
              </CalculatorField>

              <div>
                <p className="mb-2 block text-sm font-medium text-content-primary">
                  Generate for Multiple Months
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {MONTH_OPTIONS.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-content-secondary"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMonths.includes(item)}
                        onChange={() => toggleMonth(item)}
                        className="accent-brand-blue"
                      />
                      {item.slice(0, 3)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-2 rounded-xl bg-tool-convert px-4 py-3 font-semibold text-white disabled:opacity-70"
                >
                  <Download className="h-4 w-4" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 font-semibold text-content-primary"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-border bg-white p-6 text-black shadow-lg">
              <div className="border border-gray-300 p-5">
                <h2 className="text-center text-xl font-bold">RENT RECEIPT</h2>
                <div className="mt-4 flex justify-between text-xs text-gray-600">
                  <span>Receipt No: {previewReceipt.receiptNumber}</span>
                  <span>{formatReceiptDate(previewReceipt.month, previewReceipt.year)}</span>
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <p><strong>Received From:</strong> {previewReceipt.tenantName}</p>
                  <p><strong>Landlord:</strong> {previewReceipt.landlordName}</p>
                  <p><strong>Amount:</strong> {formatRentAmount(previewReceipt.rentalAmount)}</p>
                  <p><strong>Period:</strong> {previewReceipt.month} {previewReceipt.year}</p>
                  <p><strong>Payment Mode:</strong> {previewReceipt.paymentMode}</p>
                  <p><strong>Property Address:</strong> {previewReceipt.propertyAddress}</p>
                  {previewReceipt.landlordPan && (
                    <p><strong>Landlord PAN:</strong> {previewReceipt.landlordPan}</p>
                  )}
                </div>
                <p className="mt-6 text-xs italic text-gray-600">
                  This is to certify that the above rent has been received for the stated period.
                </p>
                <div className="mt-10 flex items-end justify-between">
                  <div>
                    <div className="h-16 w-16 rounded-full border border-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">Stamp / Seal</p>
                  </div>
                  <div>
                    <div className="h-px w-32 bg-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">Landlord Signature</p>
                  </div>
                </div>
                <p className="mt-8 text-center text-[10px] text-gray-400">
                  Generated with WorkUtilities Rent Receipt Generator
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 print:hidden">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: FileText, title: "Fill Details", description: "Enter tenant, landlord, rent, and address" },
                { step: "02", icon: Receipt, title: "Preview Receipt", description: "Review the professional receipt layout" },
                { step: "03", icon: Download, title: "Download PDF", description: "Generate one or multiple months instantly" },
              ].map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="rent-receipt-generator" />
          <ToolFeedback toolName="Rent Receipt Generator" />
          <ToolSeoContent slug="rent-receipt-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
