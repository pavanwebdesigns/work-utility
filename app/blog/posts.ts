export type BlogCategory = "PDF" | "Images" | "Photo" | "Finance";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  author: string;
  lastUpdated: string;
  cta: {
    toolName: string;
    toolHref: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "aadhaar-card-photo-size",
    title: "Aadhaar Card Photo Size: The Complete Guide (2026)",
    excerpt:
      "Getting your Aadhaar photo size wrong means a wasted trip to the enrollment center. Here are the exact dimensions, tips, and a free tool to resize in seconds.",
    category: "Photo",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer" },
  },
  {
    slug: "how-to-compress-pdf-online-free",
    title: "How to Compress PDF Online Free — Without Losing Quality",
    excerpt:
      "When your PDF is too large for email or a government portal, here is the fastest way to reduce file size without ruining the document.",
    category: "PDF",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Compress", toolHref: "/tools/pdf-compress" },
  },
  {
    slug: "reduce-image-size-without-losing-quality",
    title: "How to Reduce Image Size Without Losing Quality (2026)",
    excerpt:
      "Large image files slow down uploads and eat mobile data. Learn how to compress JPG, PNG, and WebP images the right way.",
    category: "Images",
    readTime: "5 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Image Compress", toolHref: "/tools/image-compress" },
  },
  {
    slug: "convert-pdf-to-word-free",
    title: "How to Convert PDF to Word Free — Without Losing Formatting",
    excerpt:
      "Need to edit a PDF? Converting to Word is the fastest approach. Here is what works, what does not, and how to do it privately.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF to Word", toolHref: "/tools/pdf-to-word" },
  },
  {
    slug: "passport-size-photo-dimensions-india",
    title: "Passport Size Photo — Exact Dimensions & Guidelines for India",
    excerpt:
      "Indian passport photo requirements are specific. Wrong background, wrong size, or wrong expression can get your application rejected. Get it right the first time.",
    category: "Photo",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer" },
  },
  {
    slug: "how-to-compress-pdf-under-1mb",
    title: "How to Compress PDF Under 1MB — Free & Easy (2026)",
    excerpt:
      "Government portals rejecting your PDF? Step-by-step guide to compress under 1MB for UPSC, SSC, email, and job applications in India.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Compress", toolHref: "/tools/pdf-compress" },
  },
  {
    slug: "how-to-merge-pdf-files-free",
    title: "How to Merge PDF Files Free Online — Combine Multiple PDFs in Seconds",
    excerpt:
      "Combine salary slips, certificates, and ID proofs into one PDF. Free online merge with no signup — perfect for job and loan applications in India.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Merge", toolHref: "/tools/pdf-merge" },
  },
  {
    slug: "how-to-remove-background-from-photo-free",
    title: "How to Remove Background from Photo Free Online — No Signup (2026)",
    excerpt:
      "Remove photo backgrounds free for Meesho listings, LinkedIn profiles, passport photos, and product images. No watermark, runs in your browser.",
    category: "Images",
    readTime: "5 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Background Remover", toolHref: "/tools/bg-remove" },
  },
  {
    slug: "how-to-unlock-password-protected-pdf",
    title: "How to Open a Password Protected PDF Free — Unlock PDF Online (2026)",
    excerpt:
      "Open bank statements, salary slips, and locked PDFs free online. Remove PDF password in your browser — no software needed.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Remove PDF Password", toolHref: "/tools/pdf-unlock" },
  },
  {
    slug: "resize-photo-for-government-forms-india",
    title: "How to Resize Photo for Government Forms in India — Aadhaar, PAN, Passport (2026)",
    excerpt:
      "Complete guide to photo size for Aadhaar, PAN, passport, driving licence, and government exams. Dimensions, KB limits, and free resize tool.",
    category: "Photo",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer" },
  },
  {
    slug: "how-to-calculate-in-hand-salary-from-ctc",
    title: "How to Calculate In-Hand Salary from CTC — A Real Guide for Indian Employees",
    excerpt:
      "Learn how to calculate your actual in-hand salary from CTC. Understand PF, professional tax, and HRA deductions with real examples.",
    category: "Finance",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "CTC Calculator", toolHref: "/tools/ctc-calculator" },
  },
  {
    slug: "old-vs-new-tax-regime-india-2025",
    title: "Old Regime vs New Tax Regime 2025-26 — Which One Actually Saves More Money?",
    excerpt:
      "Confused between old and new tax regime? Real examples showing which regime saves more tax for different salary levels in India 2025-26.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Income Tax Calculator", toolHref: "/tools/income-tax-calculator" },
  },
  {
    slug: "how-to-start-sip-india-beginners-guide",
    title: "How to Start a SIP in India — Beginner's Guide for Salaried Employees (2025)",
    excerpt:
      "Complete guide to starting SIP in India. How much to invest, which funds to choose, and how to calculate returns. Free SIP calculator included.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "SIP Calculator", toolHref: "/tools/sip-calculator" },
  },
  {
    slug: "notice-period-buyout-india-guide",
    title: "What is Notice Period Buyout? How to Calculate and Negotiate in India",
    excerpt:
      "Complete guide to notice period buyout in India. How to calculate buyout amount, when companies allow it, and how to negotiate early exit.",
    category: "Finance",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Notice Period Calculator", toolHref: "/tools/notice-period-calculator" },
  },
  {
    slug: "how-to-save-income-tax-india-legally",
    title: "How to Save Income Tax Legally in India — 10 Deductions Salaried Employees Miss",
    excerpt:
      "Save more income tax in India with these 10 legal deductions. 80C, 80D, HRA, home loan and more explained simply for salaried employees.",
    category: "Finance",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Income Tax Calculator", toolHref: "/tools/income-tax-calculator" },
  },
  {
    slug: "home-loan-emi-guide-india",
    title: "Home Loan EMI Calculator Guide — How Much Can You Actually Afford in India?",
    excerpt:
      "Before taking a home loan in India, calculate how much EMI you can afford. Real examples with SBI, HDFC home loan rates 2025.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "EMI Calculator", toolHref: "/tools/emi-calculator" },
  },
  {
    slug: "gst-for-freelancers-india",
    title: "GST for Freelancers in India — When to Register and How to Calculate (2025)",
    excerpt:
      "Complete GST guide for Indian freelancers. When GST registration is mandatory, how to calculate GST on invoices, and file returns.",
    category: "Finance",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "GST Calculator", toolHref: "/tools/gst-calculator" },
  },
  {
    slug: "how-to-read-salary-slip-india",
    title: "How to Read Your Salary Slip — Every Component Explained for Indian Employees",
    excerpt:
      "Learn to read your Indian salary slip. Understand Basic, HRA, PF, TDS, gross and net salary with real examples.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "CTC Calculator", toolHref: "/tools/ctc-calculator" },
  },
  {
    slug: "fd-vs-sip-india-comparison",
    title: "FD vs SIP — Where Should You Invest Your First ₹5,000 in India?",
    excerpt:
      "FD or SIP — which is better for Indian investors in 2025? Real comparison of returns, risk, and liquidity for salaried employees.",
    category: "Finance",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "SIP Calculator", toolHref: "/tools/sip-calculator" },
  },
  {
    slug: "salary-hike-negotiation-guide-india",
    title: "How to Negotiate Salary Hike in India — Appraisal Season Guide 2025",
    excerpt:
      "Practical guide to salary hike negotiation in India. How to calculate expected hike, what to say to HR, and when to consider switching jobs.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Salary Hike Calculator", toolHref: "/tools/salary-hike-calculator" },
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
) as Record<string, BlogPost>;

export const blogSeoMetadata: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  "aadhaar-card-photo-size": {
    title: "Aadhaar Card Photo Size: Complete Guide 2026 | WorkUtilities",
    description:
      "Official Aadhaar card photo size is 35mm × 35mm (213×213 pixels). Learn exact requirements, common mistakes, and how to resize your photo free online.",
    keywords:
      "aadhaar card photo size, aadhaar photo dimensions, aadhaar photo resize online, uidai photo requirements",
  },
  "how-to-compress-pdf-online-free": {
    title: "How to Compress PDF Online Free in 2026 | WorkUtilities",
    description:
      "Compress PDF files online free without losing quality. Reduce PDF size for email, WhatsApp, or government portals. No signup, runs in browser.",
    keywords:
      "compress pdf online free, reduce pdf size, pdf compressor india, pdf too large for email",
  },
  "reduce-image-size-without-losing-quality": {
    title: "Reduce Image Size Without Losing Quality (2026) | WorkUtilities",
    description:
      "Compress JPG, PNG, WebP images online free. Reduce image file size for WhatsApp, websites, and uploads without visible quality loss.",
    keywords:
      "reduce image size online free, compress image without losing quality, jpg compressor india",
  },
  "convert-pdf-to-word-free": {
    title: "Convert PDF to Word Free Online 2026 | WorkUtilities",
    description:
      "Convert PDF to editable Word document free online. No signup, no upload to server. Works in your browser.",
    keywords:
      "convert pdf to word free, pdf to word online india, pdf to docx converter free",
  },
  "passport-size-photo-dimensions-india": {
    title: "Passport Size Photo Dimensions India 2026 | WorkUtilities",
    description:
      "Official Indian passport photo size is 51mm × 51mm. Complete guide with dimensions for all Indian documents — Aadhaar, PAN, Visa, Driving License.",
    keywords:
      "passport size photo dimensions india, indian passport photo size, passport photo requirements 2026",
  },
  "how-to-compress-pdf-under-1mb": {
    title: "How to Compress PDF Under 1MB Free (2026) | WorkUtilities",
    description:
      "Step-by-step guide to compress PDF under 1MB for email, government portals, and job applications in India. Free online tool, no signup.",
    keywords:
      "compress pdf under 1mb, pdf size limit india, upsc pdf upload size, government portal pdf compress",
  },
  "how-to-merge-pdf-files-free": {
    title: "How to Merge PDF Files Free Online (2026) | WorkUtilities",
    description:
      "Combine multiple PDF files into one free online. No signup, no watermark. Perfect for salary slips, certificates, and government document submissions in India.",
    keywords:
      "merge pdf files free online, combine pdf india, merge salary slips pdf, pdf merge no signup",
  },
  "how-to-remove-background-from-photo-free": {
    title: "Remove Background from Photo Free Online (2026) | WorkUtilities",
    description:
      "Remove background from any photo free online. Perfect for passport photos, LinkedIn profile, product images, and Meesho/Amazon seller photos in India.",
    keywords:
      "remove background from photo free, background remover india, meesho product photo white background",
  },
  "how-to-unlock-password-protected-pdf": {
    title: "Open Password Protected PDF Free Online (2026) | WorkUtilities",
    description:
      "Open and remove password from PDF files free online. Works for bank statements, salary slips, and other password protected PDFs in India. No software needed.",
    keywords:
      "unlock password protected pdf, open bank statement pdf india, remove pdf password free online",
  },
  "resize-photo-for-government-forms-india": {
    title: "Resize Photo for Government Forms India 2026 | WorkUtilities",
    description:
      "Complete guide to photo size requirements for Indian government forms. Aadhaar, PAN card, passport, driving licence photo dimensions and KB limits. Free resize tool.",
    keywords:
      "resize photo for government forms india, aadhaar photo size pixels, pan card photo kb limit, passport photo resize online",
  },
  "how-to-calculate-in-hand-salary-from-ctc": {
    title: "How to Calculate In-Hand Salary from CTC — Real Guide 2026 | WorkUtilities",
    description:
      "Learn how to calculate your actual in-hand salary from CTC. Understand PF, professional tax, and HRA deductions with real examples for Indian employees.",
    keywords:
      "in hand salary from ctc, ctc to take home salary india, pf deduction calculator, salary breakdown india",
  },
  "old-vs-new-tax-regime-india-2025": {
    title: "Old vs New Tax Regime 2025-26 India — Which Saves More? | WorkUtilities",
    description:
      "Confused between old and new tax regime? Real examples showing which regime saves more tax for different salary levels in India 2025-26.",
    keywords:
      "old vs new tax regime 2025, new tax regime india 2025-26, income tax regime comparison, tax savings india",
  },
  "how-to-start-sip-india-beginners-guide": {
    title: "How to Start SIP in India — Beginner Guide 2025 | WorkUtilities",
    description:
      "Complete guide to starting SIP in India. How much to invest, which funds to choose, and how to calculate returns. Free SIP calculator included.",
    keywords:
      "how to start sip india, sip for beginners india, mutual fund sip guide, sip calculator india",
  },
  "notice-period-buyout-india-guide": {
    title: "Notice Period Buyout India — Calculate & Negotiate | WorkUtilities",
    description:
      "Complete guide to notice period buyout in India. How to calculate buyout amount, when companies allow it, and how to negotiate early exit.",
    keywords:
      "notice period buyout india, notice period calculator, early exit notice period, job switch notice period",
  },
  "how-to-save-income-tax-india-legally": {
    title: "How to Save Income Tax Legally in India — 10 Deductions | WorkUtilities",
    description:
      "Save more income tax in India with these 10 legal deductions. 80C, 80D, HRA, home loan and more explained simply for salaried employees.",
    keywords:
      "save income tax india, tax deductions salaried employees, 80c 80d hra exemption, income tax planning india",
  },
  "home-loan-emi-guide-india": {
    title: "Home Loan EMI Guide India 2025 — How Much Can You Afford? | WorkUtilities",
    description:
      "Before taking a home loan in India, calculate how much EMI you can afford. Real examples with SBI, HDFC home loan rates 2025.",
    keywords:
      "home loan emi calculator india, sbi hdfc home loan emi, how much emi can i afford, home loan guide india",
  },
  "gst-for-freelancers-india": {
    title: "GST for Freelancers India 2025 — When to Register | WorkUtilities",
    description:
      "Complete GST guide for Indian freelancers. When GST registration is mandatory, how to calculate GST on invoices, and file returns.",
    keywords:
      "gst for freelancers india, freelance gst registration, gst on freelance invoice, gst calculator india",
  },
  "how-to-read-salary-slip-india": {
    title: "How to Read Salary Slip India — Every Component Explained | WorkUtilities",
    description:
      "Learn to read your Indian salary slip. Understand Basic, HRA, PF, TDS, gross and net salary with real examples.",
    keywords:
      "how to read salary slip india, salary slip components, basic hra pf tds explained, payslip guide india",
  },
  "fd-vs-sip-india-comparison": {
    title: "FD vs SIP India 2025 — Where to Invest ₹5,000? | WorkUtilities",
    description:
      "FD or SIP — which is better for Indian investors in 2025? Real comparison of returns, risk, and liquidity for salaried employees.",
    keywords:
      "fd vs sip india, fixed deposit vs mutual fund sip, where to invest 5000 rupees india, fd sip comparison",
  },
  "salary-hike-negotiation-guide-india": {
    title: "Salary Hike Negotiation India 2025 — Appraisal Guide | WorkUtilities",
    description:
      "Practical guide to salary hike negotiation in India. How to calculate expected hike, what to say to HR, and when to consider switching jobs.",
    keywords:
      "salary hike negotiation india, appraisal negotiation tips, how to ask for salary hike, salary increment india 2025",
  },
};

export function getCategoryBadgeClass(category: BlogCategory): string {
  switch (category) {
    case "PDF":
      return "bg-tool-pdf/10 text-tool-pdf";
    case "Images":
      return "bg-tool-image/10 text-tool-image";
    case "Photo":
      return "bg-tool-photo/10 text-tool-photo";
    case "Finance":
      return "bg-brand-blue/10 text-brand-blue";
  }
}
