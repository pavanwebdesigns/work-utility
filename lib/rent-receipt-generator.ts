export type PaymentMode = "Cash" | "Bank Transfer" | "UPI" | "Cheque";

export type RentReceiptInput = {
  tenantName: string;
  landlordName: string;
  rentalAmount: number;
  month: string;
  year: string;
  paymentMode: PaymentMode;
  propertyAddress: string;
  landlordPan?: string;
  receiptNumber: string;
};

export const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const PAYMENT_MODES: PaymentMode[] = [
  "Cash",
  "Bank Transfer",
  "UPI",
  "Cheque",
];

export function formatReceiptDate(month: string, year: string): string {
  const monthIndex = MONTH_OPTIONS.indexOf(month as (typeof MONTH_OPTIONS)[number]);
  const safeMonth = monthIndex >= 0 ? monthIndex : 0;
  const date = new Date(Number(year), safeMonth, 1);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getDefaultReceiptNumber(): string {
  const now = new Date();
  return `RR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-001`;
}

export async function generateRentReceiptPdf(
  receipts: RentReceiptInput[]
): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  receipts.forEach((receipt, index) => {
    if (index > 0) doc.addPage();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    let y = 24;

    doc.setDrawColor(180);
    doc.rect(margin - 4, 16, pageWidth - margin * 2 + 8, 250);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("RENT RECEIPT", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt No: ${receipt.receiptNumber}`, margin, y);
    doc.text(`Date: ${formatReceiptDate(receipt.month, receipt.year)}`, pageWidth - margin, y, {
      align: "right",
    });
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.text("Received From:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(receipt.tenantName, margin + 30, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Landlord:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(receipt.landlordName, margin + 30, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Amount:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Rs. ${receipt.rentalAmount.toLocaleString("en-IN")} /-`,
      margin + 30,
      y
    );
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Period:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${receipt.month} ${receipt.year}`, margin + 30, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Payment Mode:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(receipt.paymentMode, margin + 30, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Property Address:", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    const addressLines = doc.splitTextToSize(receipt.propertyAddress, pageWidth - margin * 2);
    doc.text(addressLines, margin, y);
    y += addressLines.length * 5 + 8;

    if (receipt.landlordPan) {
      doc.setFont("helvetica", "bold");
      doc.text("Landlord PAN:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(receipt.landlordPan, margin + 30, y);
      y += 10;
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(
      "This is to certify that the above rent has been received for the stated period.",
      margin,
      y
    );
    y += 18;

    doc.setDrawColor(120);
    doc.circle(pageWidth - margin - 18, y, 12);
    doc.setFontSize(8);
    doc.text("Stamp / Seal", pageWidth - margin - 18, y + 1, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.line(margin, y + 18, margin + 60, y + 18);
    doc.text("Landlord Signature", margin, y + 24);

    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text("Generated with WorkUtilities Rent Receipt Generator", pageWidth / 2, 280, {
      align: "center",
    });
    doc.setTextColor(0);
  });

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

export function formatRentAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
