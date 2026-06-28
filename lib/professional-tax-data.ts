export interface PTSlab {
  minSalary: number;
  maxSalary: number | null;
  monthlyPT: number;
}

export interface StateData {
  name: string;
  slabs: PTSlab[];
  hasFebruaryExtra?: boolean;
  extraFebruaryAmount?: number;
  womenExemptUpto?: number;
  halfYearly?: boolean;
  notes?: string;
}

export const PROFESSIONAL_TAX_DATA: Record<string, StateData> = {
  maharashtra: {
    name: "Maharashtra",
    slabs: [
      { minSalary: 0, maxSalary: 7500, monthlyPT: 0 },
      { minSalary: 7501, maxSalary: 10000, monthlyPT: 175 },
      { minSalary: 10001, maxSalary: null, monthlyPT: 200 },
    ],
    hasFebruaryExtra: true,
    extraFebruaryAmount: 100,
    womenExemptUpto: 25000,
    notes:
      "Women earning ≤ ₹25,000/month are exempt. February PT is ₹300 (₹200 + ₹100 extra) for annual total of ₹2,500.",
  },
  karnataka: {
    name: "Karnataka",
    slabs: [
      { minSalary: 0, maxSalary: 14999, monthlyPT: 0 },
      { minSalary: 15000, maxSalary: 24999, monthlyPT: 150 },
      { minSalary: 25000, maxSalary: null, monthlyPT: 200 },
    ],
    notes: "Annual max: ₹2,400",
  },
  telangana: {
    name: "Telangana",
    slabs: [
      { minSalary: 0, maxSalary: 14999, monthlyPT: 0 },
      { minSalary: 15000, maxSalary: 19999, monthlyPT: 150 },
      { minSalary: 20000, maxSalary: null, monthlyPT: 200 },
    ],
  },
  andhra_pradesh: {
    name: "Andhra Pradesh",
    slabs: [
      { minSalary: 0, maxSalary: 14999, monthlyPT: 0 },
      { minSalary: 15000, maxSalary: 19999, monthlyPT: 150 },
      { minSalary: 20000, maxSalary: null, monthlyPT: 200 },
    ],
  },
  west_bengal: {
    name: "West Bengal",
    slabs: [
      { minSalary: 0, maxSalary: 10000, monthlyPT: 0 },
      { minSalary: 10001, maxSalary: 15000, monthlyPT: 110 },
      { minSalary: 15001, maxSalary: 25000, monthlyPT: 130 },
      { minSalary: 25001, maxSalary: 40000, monthlyPT: 150 },
      { minSalary: 40001, maxSalary: null, monthlyPT: 200 },
    ],
    notes: "Annual max: ₹2,400",
  },
  gujarat: {
    name: "Gujarat",
    slabs: [
      { minSalary: 0, maxSalary: 5999, monthlyPT: 0 },
      { minSalary: 6000, maxSalary: 8999, monthlyPT: 80 },
      { minSalary: 9000, maxSalary: 11999, monthlyPT: 150 },
      { minSalary: 12000, maxSalary: null, monthlyPT: 200 },
    ],
  },
  tamil_nadu: {
    name: "Tamil Nadu",
    slabs: [
      { minSalary: 0, maxSalary: 3500, monthlyPT: 0 },
      { minSalary: 3501, maxSalary: 5000, monthlyPT: 22 },
      { minSalary: 5001, maxSalary: 7500, monthlyPT: 37 },
      { minSalary: 7501, maxSalary: 10000, monthlyPT: 57 },
      { minSalary: 10001, maxSalary: 12500, monthlyPT: 67 },
      { minSalary: 12501, maxSalary: null, monthlyPT: 208 },
    ],
    halfYearly: true,
    notes:
      "Half-yearly basis (April-Sept and Oct-March). Monthly values shown for display only.",
  },
  kerala: {
    name: "Kerala",
    slabs: [
      { minSalary: 0, maxSalary: 1999, monthlyPT: 0 },
      { minSalary: 2000, maxSalary: 3999, monthlyPT: 20 },
      { minSalary: 4000, maxSalary: 5999, monthlyPT: 30 },
      { minSalary: 6000, maxSalary: 8999, monthlyPT: 50 },
      { minSalary: 9000, maxSalary: 11999, monthlyPT: 75 },
      { minSalary: 12000, maxSalary: 17999, monthlyPT: 100 },
      { minSalary: 18000, maxSalary: null, monthlyPT: 125 },
    ],
    halfYearly: true,
    notes: "Half-yearly payment. Monthly values shown for display.",
  },
  madhya_pradesh: {
    name: "Madhya Pradesh",
    slabs: [
      { minSalary: 0, maxSalary: 18749, monthlyPT: 0 },
      { minSalary: 18750, maxSalary: null, monthlyPT: 208 },
    ],
  },
  assam: {
    name: "Assam",
    slabs: [
      { minSalary: 0, maxSalary: 9999, monthlyPT: 0 },
      { minSalary: 10000, maxSalary: 14999, monthlyPT: 150 },
      { minSalary: 15000, maxSalary: null, monthlyPT: 208 },
    ],
  },
  odisha: {
    name: "Odisha",
    slabs: [
      { minSalary: 0, maxSalary: 13304, monthlyPT: 0 },
      { minSalary: 13305, maxSalary: null, monthlyPT: 125 },
    ],
  },
  jharkhand: {
    name: "Jharkhand",
    slabs: [
      { minSalary: 0, maxSalary: 24999, monthlyPT: 0 },
      { minSalary: 25000, maxSalary: 41666, monthlyPT: 100 },
      { minSalary: 41667, maxSalary: null, monthlyPT: 150 },
    ],
  },
  bihar: {
    name: "Bihar",
    slabs: [
      { minSalary: 0, maxSalary: 24999, monthlyPT: 0 },
      { minSalary: 25000, maxSalary: null, monthlyPT: 208 },
    ],
  },
  meghalaya: {
    name: "Meghalaya",
    slabs: [
      { minSalary: 0, maxSalary: 4166, monthlyPT: 0 },
      { minSalary: 4167, maxSalary: 6250, monthlyPT: 16 },
      { minSalary: 6251, maxSalary: 8333, monthlyPT: 25 },
      { minSalary: 8334, maxSalary: null, monthlyPT: 208 },
    ],
  },
  tripura: {
    name: "Tripura",
    slabs: [
      { minSalary: 0, maxSalary: 7500, monthlyPT: 0 },
      { minSalary: 7501, maxSalary: 15000, monthlyPT: 150 },
      { minSalary: 15001, maxSalary: null, monthlyPT: 208 },
    ],
  },
  sikkim: {
    name: "Sikkim",
    slabs: [
      { minSalary: 0, maxSalary: 19999, monthlyPT: 0 },
      { minSalary: 20000, maxSalary: null, monthlyPT: 208 },
    ],
  },
  manipur: {
    name: "Manipur",
    slabs: [
      { minSalary: 0, maxSalary: 5000, monthlyPT: 0 },
      { minSalary: 5001, maxSalary: 9000, monthlyPT: 50 },
      { minSalary: 9001, maxSalary: null, monthlyPT: 100 },
    ],
  },
  mizoram: {
    name: "Mizoram",
    slabs: [
      { minSalary: 0, maxSalary: 4999, monthlyPT: 0 },
      { minSalary: 5000, maxSalary: 8333, monthlyPT: 125 },
      { minSalary: 8334, maxSalary: null, monthlyPT: 208 },
    ],
  },
};

export const NO_PT_STATES = [
  "Delhi",
  "Uttar Pradesh",
  "Rajasthan",
  "Haryana",
  "Punjab",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Chhattisgarh",
  "Nagaland",
  "Arunachal Pradesh",
  "J&K",
  "Ladakh",
] as const;

export const PT_STATE_OPTIONS = Object.entries(PROFESSIONAL_TAX_DATA).map(
  ([key, data]) => ({
    value: key,
    label: data.name,
  }),
);

export const PT_TAX_SAVING_RATE = 0.312;

export const PT_DISCLAIMER =
  "Professional tax rates are set by state governments and may change. PT is deducted by your employer based on their registered office state. Verify with your HR or state commercial tax department.";
