import { calculateAge } from "@/lib/age-calculator";
import { calculateBMI, getBMICategory } from "@/lib/bmi-calculator";
import { calculateCgpaToPercentage } from "@/lib/cgpa-calculator";
import { calculateCompoundInterest } from "@/lib/compound-interest";
import { calculateDiscount } from "@/lib/discount-calculator";
import { calculateEmi } from "@/lib/emi-calculator";
import { calculateFdReturns } from "@/lib/fd-calculator";
import { calculateGst } from "@/lib/gst-calculator";
import { calculateHRA } from "@/lib/hra-calculator";
import { calculateSalaryHike } from "@/lib/salary-hike-calculator";
import { calculateSipReturns } from "@/lib/sip-calculator";
import { calculateTip } from "@/lib/tip-calculator";
import { convertUnit } from "@/lib/unit-converter";
import { calculateNewRegimeTax } from "@/lib/income-tax-calculator";
import { calculateGratuity, GRATUITY_MAX_LIMIT } from "@/lib/gratuity-calculator";
import { DEFAULT_EPF_INTEREST_RATE, EMPLOYER_EPF_CONTRIBUTION_RATE } from "@/lib/epf-calculator";
import { hourlyToSalary } from "@/lib/hourly-to-salary";
import { calculateInflation } from "@/lib/inflation-calculator";
import { calculateNoticeBuyout } from "@/lib/notice-period-calculator";

function d(y: number, m: number, day: number): Date {
  return new Date(y, m - 1, day);
}

function within(actual: number, expected: number, tolerance: number): boolean {
  return Math.abs(actual - expected) <= tolerance;
}

describe("Calculator correctness audit", () => {
  test("1. EMI Calculator", () => {
    const result = calculateEmi(100_000, 10, 12);
    expect(result).not.toBeNull();
    expect(within(result!.emi, 8791.59, 2)).toBe(true);
  });

  test("2. SIP Calculator (annuity-due: FV = P × [(1+i)^n − 1]/i × (1+i))", () => {
    const result = calculateSipReturns(5000, 12, 10);
    expect(result).not.toBeNull();
    expect(within(result!.maturityValue, 1_161_695, 3000)).toBe(true);
  });

  test("3. FD Calculator (quarterly compounding)", () => {
    const result = calculateFdReturns(100_000, 7, 5, "quarterly");
    expect(result).not.toBeNull();
    expect(within(result!.maturityAmount, 141_478, 50)).toBe(true);
  });

  test("4. Compound Interest Calculator (annual, no contributions)", () => {
    const result = calculateCompoundInterest(100_000, 8, 5, "annually", 0);
    expect(within(result.finalAmount, 146_933, 50)).toBe(true);
  });

  test("5. GST Calculator — Add GST mode", () => {
    const result = calculateGst(1000, 18, "add");
    expect(result).not.toBeNull();
    expect(result!.gstAmount).toBe(180);
    expect(result!.totalAmount).toBe(1180);
  });

  test("6. GST Calculator — Extract/Remove GST mode", () => {
    const result = calculateGst(1180, 18, "remove");
    expect(result).not.toBeNull();
    expect(result!.originalAmount).toBeCloseTo(1000, 10);
    expect(result!.gstAmount).toBeCloseTo(180, 10);
  });

  test("7. Salary Hike Calculator", () => {
    const result = calculateSalaryHike(50_000, 20);
    expect(result).not.toBeNull();
    expect(result!.newSalary).toBe(60_000);
    expect(result!.hikeAmount).toBe(10_000);
  });

  test("8. Tip Calculator", () => {
    const result = calculateTip(1000, 10, 4);
    expect(result.tipAmount).toBe(100);
    expect(result.totalAmount).toBe(1100);
    expect(result.perPerson).toBe(275);
  });

  test("9. Discount Calculator", () => {
    const result = calculateDiscount(2000, 25);
    expect(result.discountAmount).toBe(500);
    expect(result.finalPrice).toBe(1500);
  });

  test("10a. HRA Calculator — Metro", () => {
    const result = calculateHRA({
      basicSalary: 40_000,
      dearnessAllowance: 0,
      hraReceived: 20_000,
      rentPaid: 15_000,
      isMetroCity: true,
    });
    expect(result.exemptHRA).toBe(11_000);
    expect(result.taxableHRA).toBe(9_000);
    expect(result.calculation.percentOfBasic).toBe(20_000);
  });

  test("10b. HRA Calculator — Non-metro uses 40% branch", () => {
    const result = calculateHRA({
      basicSalary: 40_000,
      dearnessAllowance: 0,
      hraReceived: 20_000,
      rentPaid: 15_000,
      isMetroCity: false,
    });
    expect(result.calculation.percentOfBasic).toBe(16_000);
    expect(result.exemptHRA).toBe(11_000);
    expect(result.taxableHRA).toBe(9_000);
  });

  test("11. BMI Calculator (metric height in cm; no gender input)", () => {
    const bmi = calculateBMI(70, 175, "metric");
    expect(within(bmi, 22.86, 0.05)).toBe(true);
    expect(getBMICategory(bmi).category).toBe("Normal weight");
    expect(calculateBMI.length).toBe(3);
  });

  test("12a. Unit Converter — 100 km to miles", () => {
    const miles = convertUnit(100, "km", "mi", "length");
    expect(miles).not.toBeNull();
    expect(within(miles!, 62.14, 0.05)).toBe(true);
  });

  test("12b. Unit Converter — 100°C to °F", () => {
    const fahrenheit = convertUnit(100, "c", "f", "temperature");
    expect(fahrenheit).toBe(212);
  });

  test("12c. Unit Converter — 1 kg to lb", () => {
    const pounds = convertUnit(1, "kg", "lb", "weight");
    expect(pounds).not.toBeNull();
    expect(within(pounds!, 2.2046, 0.001)).toBe(true);
  });

  test("13. CGPA to Percentage (VTU formula: CGPA × 9.5)", () => {
    const result = calculateCgpaToPercentage(8.5, "10");
    expect(result).not.toBeNull();
    expect(within(result!.vtuPercentage, 80.75, 0.5)).toBe(true);
    expect(result!.vtuPercentage).toBe(8.5 * 9.5);
  });

  test("14a. Age Calculator — DOB 15 Jun 2000, as-of 17 Jun 2026", () => {
    const result = calculateAge(d(2000, 6, 15), d(2026, 6, 17));
    expect(result).not.toBeNull();
    expect(result!.years).toBe(26);
    expect(result!.months).toBe(0);
    expect(result!.days).toBe(2);
  });

  test("14b. Age Calculator — DOB 20 Jun 2000, as-of 17 Jun 2026", () => {
    const result = calculateAge(d(2000, 6, 20), d(2026, 6, 17));
    expect(result).not.toBeNull();
    expect(result!.years).toBe(25);
    expect(result!.months).toBe(11);
    expect(result!.days).toBe(28);
  });
});

describe("Government rules calculator audit (FY2025-26)", () => {
  test("Income Tax — New Regime Test A: gross ₹12,75,000 → net tax ₹0", () => {
    const result = calculateNewRegimeTax(1_275_000, "fy-2025-26");
    expect(result).not.toBeNull();
    expect(result!.taxableIncome).toBe(1_200_000);
    expect(result!.taxBeforeRebate).toBe(60_000);
    expect(result!.rebate).toBe(60_000);
    expect(result!.totalTax).toBe(0);
  });

  test("Income Tax — New Regime Test B: gross ₹18,00,000 → total tax ₹1,50,800", () => {
    const result = calculateNewRegimeTax(1_800_000, "fy-2025-26");
    expect(result).not.toBeNull();
    expect(result!.taxableIncome).toBe(1_725_000);
    expect(result!.taxBeforeRebate).toBe(145_000);
    expect(within(result!.totalTax, 150_800, 500)).toBe(true);
  });

  test("Gratuity — ₹50,000/month × 12 years", () => {
    const result = calculateGratuity(50_000, 12);
    expect(within(result.gratuityAmount, 346_153.85, 10)).toBe(true);
    expect(GRATUITY_MAX_LIMIT).toBe(2_000_000);
  });

  test("EPF — default interest rate and employer EPF split", () => {
    expect(DEFAULT_EPF_INTEREST_RATE).toBe(8.25);
    expect(EMPLOYER_EPF_CONTRIBUTION_RATE).toBe(3.67);
  });

  test("Hourly to Salary — $25/hr × 40hr × 52wk", () => {
    const result = hourlyToSalary(25, 40, 52);
    expect(result.annual).toBe(52_000);
  });

  test("Inflation — ₹1L at 6% for 10 years (both directions)", () => {
    const result = calculateInflation(100_000, 10, 6);
    expect(within(result.futureValue, 179_085, 200)).toBe(true);
    expect(within(result.pastValue, 55_839, 200)).toBe(true);
  });

  test("Notice Period Buyout — ₹60,000 salary, 30 days remaining", () => {
    expect(calculateNoticeBuyout(60_000, 30)).toBe(60_000);
  });
});
