export type BlogCategory =
  | "PDF"
  | "Images"
  | "Photo"
  | "Finance"
  | "Developer Tools"
  | "Productivity"
  | "PDF & Documents"
  | "Students & Utilities"
  | "Complete Guide";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  author: string;
  lastUpdated: string;
  featured?: boolean;
  cta: {
    toolName: string;
    toolHref: string;
  };
};

export const PILLAR_POST_SLUGS = new Set([
  "complete-pdf-tools-guide-india",
  "complete-salary-tax-guide-india",
  "complete-government-forms-guide-india",
  "complete-student-tools-guide-india",
  "complete-image-tools-guide-india",
  "complete-developer-tools-guide",
]);

export const blogPosts: BlogPost[] = [
  {
    slug: "complete-pdf-tools-guide-india",
    title: "Complete PDF Tools Guide for Indians — Compress, Merge, Split, Convert (2026)",
    excerpt:
      "Complete guide to free PDF tools in India. Compress, merge, split, convert PDF to Word, unlock password protected PDFs. No signup needed.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "All PDF Tools", toolHref: "/tools" },
  },
  {
    slug: "complete-salary-tax-guide-india",
    title: "Complete Salary & Tax Guide for Indian Employees 2026 — CTC, Tax, SIP & More",
    excerpt:
      "Complete guide to understanding salary, tax, and investments for Indian employees. CTC calculator, income tax, SIP, EMI, and more free tools.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "CTC Calculator", toolHref: "/tools/ctc-calculator" },
  },
  {
    slug: "complete-government-forms-guide-india",
    title: "Complete Guide to Government Forms & Documents in India 2026 — Photo, PDF & More",
    excerpt:
      "Complete guide to photo sizes, PDF requirements, and document preparation for Indian government forms — Aadhaar, PAN, Passport, UPSC, SSC.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer" },
  },
  {
    slug: "complete-student-tools-guide-india",
    title: "Complete Free Tools Guide for Indian Students 2026 — CGPA, Percentage, PDF & More",
    excerpt:
      "Best free online tools for Indian students. Convert CGPA to percentage, count words, calculate marks, resize exam photos, and more.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "All Tools", toolHref: "/tools" },
  },
  {
    slug: "complete-image-tools-guide-india",
    title: "Complete Image & Photo Tools Guide India 2026 — Compress, Resize, Convert Free",
    excerpt:
      "Complete guide to free image tools in India. Compress images, resize photos, convert formats, create QR codes and digital signatures free online.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "All Image Tools", toolHref: "/tools" },
  },
  {
    slug: "complete-developer-tools-guide",
    title: "Complete Developer Tools Guide 2026 — JSON, Base64, Regex, Hash & More",
    excerpt:
      "Free online developer tools: JSON formatter, Base64 encoder, regex tester, hash generator, JWT decoder, and more. No signup, runs in your browser.",
    category: "Complete Guide",
    readTime: "10 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    featured: true,
    cta: { toolName: "JSON Formatter", toolHref: "/tools/json-formatter" },
  },
  {
    slug: "how-to-format-json-online-free",
    title: "How to Format and Validate JSON Online Free",
    excerpt:
      "Format, validate, and beautify JSON online free. Catch syntax errors instantly, minify or pretty-print. Runs in your browser, nothing uploaded.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "JSON Formatter", toolHref: "/tools/json-formatter" },
  },
  {
    slug: "base64-encode-decode-guide",
    title: "Base64 Encode and Decode — Complete Guide",
    excerpt:
      "Encode or decode Base64 online free. Convert text, images, and files to Base64 and back instantly. No signup, runs entirely in your browser.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Base64 Encoder", toolHref: "/tools/base64" },
  },
  {
    slug: "md5-sha256-hash-generator-guide",
    title: "MD5 vs SHA-256 — Free Online Hash Generator Guide",
    excerpt:
      "Generate MD5, SHA-1, and SHA-256 hashes online free. Verify file integrity and checksums instantly. No signup, processes locally in your browser.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Hash Generator", toolHref: "/tools/hash-generator" },
  },
  {
    slug: "how-to-decode-jwt-token-online",
    title: "How to Decode a JWT Token Online — What Each Part Means",
    excerpt:
      "Decode and verify JWT signatures online free. Color-coded panels, claims explainer, expiry badges, and client-side verification in your browser.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "JWT Decoder", toolHref: "/tools/jwt-decoder" },
  },
  {
    slug: "how-to-test-regex-online",
    title: "How to Test Regular Expressions Online — Regex Cheat Sheet",
    excerpt:
      "Test and debug regular expressions online free. Live match highlighting, common patterns, and a quick-reference cheat sheet. No signup needed.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Regex Tester", toolHref: "/tools/regex-tester" },
  },
  {
    slug: "pomodoro-technique-timer-guide",
    title: "The Pomodoro Technique — How to Use a 25-Minute Focus Timer",
    excerpt:
      "Free online Pomodoro timer for focused work. Learn the 25-minute technique, customize intervals, and build a sustainable study or work routine.",
    category: "Productivity",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Pomodoro Timer", toolHref: "/tools/pomodoro-timer" },
  },
  {
    slug: "online-stopwatch-guide",
    title: "Online Stopwatch with Lap Timer — Free, No Signup",
    excerpt:
      "Free online stopwatch with lap timer. Track workouts, study sessions, presentations, and cooking times accurately. No app download, no signup.",
    category: "Productivity",
    readTime: "4 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Stopwatch", toolHref: "/tools/stopwatch" },
  },
  {
    slug: "time-zone-converter-guide",
    title: "Time Zone Converter — Schedule Meetings Across Countries Without the Math",
    excerpt:
      "Convert time between time zones free online. Schedule international meetings, calls, and remote team standups without timezone math mistakes.",
    category: "Productivity",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Time Zone Converter", toolHref: "/tools/timezone-converter" },
  },
  {
    slug: "bmi-calculator-guide",
    title: "BMI Calculator — What Your Body Mass Index Actually Means",
    excerpt:
      "Calculate your BMI free online using metric or imperial units. See WHO weight categories and understand what BMI does and doesn't tell you.",
    category: "Finance",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "BMI Calculator", toolHref: "/tools/bmi-calculator" },
  },
  {
    slug: "compound-interest-calculator-guide",
    title: "Compound Interest Calculator — How Compounding Actually Grows Your Money",
    excerpt:
      "Free compound interest calculator. See exactly how your investment grows over time, and the difference compounding frequency makes to your returns.",
    category: "Finance",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Compound Interest Calculator", toolHref: "/tools/compound-interest" },
  },
  {
    slug: "how-to-convert-pdf-to-jpg-online-free",
    title: "How to Convert PDF to JPG Online Free",
    excerpt:
      "Convert PDF pages to JPG images free online. Each page becomes a separate image, ready to download. No signup, nothing uploaded to a server.",
    category: "PDF",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF to JPG", toolHref: "/tools/pdf-to-jpg" },
  },
  {
    slug: "how-to-convert-image-formats-online",
    title: "How to Convert Image Formats Online — JPG, PNG, WebP Guide 2026",
    excerpt:
      "Complete guide to JPG, PNG, and WebP conversion. When to use each format, quality settings, transparency handling, and a free browser-based converter.",
    category: "Images",
    readTime: "8 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Image Converter", toolHref: "/tools/image-converter" },
  },
  {
    slug: "how-to-convert-webp-to-jpg",
    title: "How to Convert WebP to JPG Online Free",
    excerpt:
      "Convert WebP images to JPG free online. Fix compatibility issues with older apps, devices, and editors that don't support WebP. No signup.",
    category: "Images",
    readTime: "4 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "WebP to JPG", toolHref: "/tools/webp-to-jpg" },
  },
  {
    slug: "how-to-convert-excel-to-pdf-free",
    title: "How to Convert Excel to PDF Online Free",
    excerpt:
      "Convert Excel spreadsheets to PDF free online. Keep formatting consistent for sharing, printing, or submitting reports. No signup, no uploads.",
    category: "PDF & Documents",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Excel to PDF", toolHref: "/tools/excel-to-pdf" },
  },
  {
    slug: "how-to-convert-ppt-to-pdf-free",
    title: "How to Convert PowerPoint to PDF Online Free",
    excerpt:
      "Convert PowerPoint presentations to PDF free online. Share slides without editable access, and keep formatting and fonts identical for everyone.",
    category: "PDF & Documents",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "PPT to PDF", toolHref: "/tools/ppt-to-pdf" },
  },
  {
    slug: "aadhaar-card-photo-size",
    title: "Aadhaar Card Photo Requirements — Why Photos Get Rejected",
    excerpt:
      "Understand why UIDAI rejects Aadhaar photos and how to fix it. File size limits, orientation mistakes, background rules, and hidden rejection reasons explained.",
    category: "Photo",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: {
      toolName: "Photo Resizer",
      toolHref: "/tools/photo-resizer?preset=aadhaar",
    },
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
    slug: "best-free-pdf-tools-online-2026",
    title: "Best Free PDF Tools Online 2026 — No Downloads, No Signup",
    excerpt:
      "Compress, merge, split, and convert PDFs free in your browser. No software install, no account — complete guide to every PDF tool you need.",
    category: "PDF",
    readTime: "6 min read",
    author: "Alex Carter",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Compress", toolHref: "/tools/pdf-compress" },
  },
  {
    slug: "how-to-split-pdf-pages-online-free-2026",
    title: "How to Split PDF Pages Online Free (2026)",
    excerpt:
      "Extract specific pages or split a PDF into individual files free online. Page range syntax, ZIP download, no signup required.",
    category: "PDF",
    readTime: "4 min read",
    author: "Alex Carter",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Split", toolHref: "/tools/pdf-split" },
  },
  {
    slug: "reduce-image-size-without-losing-quality",
    title: "How to Reduce Image Size Without Losing Quality — 5 Methods That Work",
    excerpt:
      "5 proven ways to shrink image files without visible quality loss. JPG vs PNG, target file sizes, social media limits, and a free browser-based compressor.",
    category: "Images",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Image Compress", toolHref: "/tools/image-compress" },
  },
  {
    slug: "how-to-convert-heic-to-jpg-on-windows",
    title: "How to Convert HEIC to JPG on Windows — Free (2026)",
    excerpt:
      "iPhone photos won't open on Windows? Learn what HEIC is and how to convert to JPG free online — no software install, no signup.",
    category: "Images",
    readTime: "5 min read",
    author: "Alex Carter",
    lastUpdated: "June 2026",
    cta: { toolName: "HEIC to JPG", toolHref: "/tools/heic-to-jpg" },
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
    title: "India Passport Photo Rule Change 2026 — What You Need to Know",
    excerpt:
      "India changed passport photo rules from September 2025. Old 2×2 inch square rejected. ICAO standards, e-passport biometrics, and PSP 2.0 AI checking explained.",
    category: "Photo",
    readTime: "7 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: {
      toolName: "Photo Resizer",
      toolHref: "/tools/photo-resizer?preset=passport",
    },
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
    title: "How to Remove Background from a Photo Free (2026)",
    excerpt:
      "Remove photo backgrounds free for Etsy, Amazon, LinkedIn, and product images. AI browser tool — no watermark, no signup, photos stay private.",
    category: "Images",
    readTime: "5 min read",
    author: "Sarah Mitchell",
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
    title: "Home Loan EMI Guide India 2026 — Calculate & Plan Your EMI",
    excerpt:
      "Complete home loan EMI guide for India 2026. Bank rates, FOIR affordability rule, tenure comparison, prepayment impact, and free EMI calculator.",
    category: "Finance",
    readTime: "8 min read",
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
  {
    slug: "epf-calculator-guide-india",
    title: "EPF Calculator Guide — PF Maturity Calculator India",
    excerpt:
      "Calculate your EPF maturity amount free online. See employee vs employer contribution split and year-by-year provident fund growth. No signup.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "EPF Calculator", toolHref: "/tools/epf-calculator" },
  },
  {
    slug: "gratuity-calculation-formula-india",
    title: "Gratuity Calculation Formula India — Free Calculator 2026",
    excerpt:
      "Learn the gratuity calculation formula under Indian law. Calculate your exact gratuity amount and check the ₹20 lakh tax exemption limit free.",
    category: "Finance",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Gratuity Calculator", toolHref: "/tools/gratuity-calculator" },
  },
  {
    slug: "lta-exemption-rules-india",
    title: "LTA Exemption Rules India — How to Claim Leave Travel Allowance",
    excerpt:
      "Complete guide to LTA exemption rules in India. Block-of-4-years rule, eligible travel modes, and free LTA calculator to check your exemption.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "LTA Calculator", toolHref: "/tools/lta-calculator" },
  },
  {
    slug: "hourly-to-salary-calculator-guide",
    title: "Hourly to Salary Calculator — Convert Wage to Annual Pay",
    excerpt:
      "Convert hourly wage to annual salary free online. See daily, weekly, monthly, and yearly pay side by side. Works both directions, no signup.",
    category: "Finance",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Hourly to Salary Calculator", toolHref: "/tools/hourly-to-salary" },
  },
  {
    slug: "inflation-calculator-money-value-guide",
    title: "Inflation Calculator — What Will Your Money Be Worth Later?",
    excerpt:
      "Free inflation calculator for India and US. See future or past value of money, and plan retirement and savings goals with real purchasing power.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Inflation Calculator", toolHref: "/tools/inflation-calculator" },
  },
  {
    slug: "how-to-merge-pdf-on-mobile-india",
    title: "How to Merge PDF Files on Mobile — Free & Easy (2026)",
    excerpt:
      "Step-by-step guide to merge PDF files on Android and iPhone in India. No app download needed, works in browser.",
    category: "PDF & Documents",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Merge", toolHref: "/tools/pdf-merge" },
  },
  {
    slug: "how-to-convert-word-to-pdf-free",
    title: "How to Convert Word to PDF Free Online — No Software Needed (2026)",
    excerpt:
      "Convert Word documents to PDF free online. Works on Windows, Mac, Android, iPhone. No Microsoft Office needed.",
    category: "PDF & Documents",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Word to PDF", toolHref: "/tools/word-to-pdf" },
  },
  {
    slug: "compress-image-under-100kb-india",
    title: "How to Compress Image Under 100KB — For Government Portals & Forms India",
    excerpt:
      "Compress image to under 100KB for UPSC, SSC, Aadhaar, PAN, and other Indian government portal uploads. Free online tool.",
    category: "Images",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Image Compress", toolHref: "/tools/image-compress" },
  },
  {
    slug: "passport-photo-size-requirements-india-guide",
    title: "Passport Photo Size Requirements India — Complete Guide 2026",
    excerpt:
      "Complete guide to Indian passport photo size, dimensions, background, and common rejection reasons. Resize free online.",
    category: "Photo",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer?preset=passport" },
  },
  {
    slug: "how-to-create-digital-signature-india",
    title: "How to Create a Digital Signature Free Online — India Guide 2026",
    excerpt:
      "Create a digital signature free online in India. For PDFs, documents, and forms. No software download needed.",
    category: "PDF & Documents",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Signature Maker", toolHref: "/tools/signature-maker" },
  },
  {
    slug: "aadhaar-photo-size-guide",
    title: "Aadhaar Card Photo Size — Exact Requirements & How to Resize Free",
    excerpt:
      "Aadhaar card photo size is 413×531 pixels, max 50KB. Complete guide to resize your photo for Aadhaar update portal free.",
    category: "Photo",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer?preset=aadhaar" },
  },
  {
    slug: "qr-code-for-small-business-india",
    title: "How to Create QR Code for Your Business in India — Free Guide 2026",
    excerpt:
      "Create QR codes for your shop, business card, UPI payment, WhatsApp, and menu free online. Guide for Indian small businesses.",
    category: "PDF & Documents",
    readTime: "5 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "QR Code Generator", toolHref: "/tools/qr-code-generator" },
  },
  {
    slug: "rent-receipt-for-hra-exemption-india",
    title: "How to Generate Rent Receipt for HRA Exemption — India Tax Guide 2026",
    excerpt:
      "Generate rent receipts for HRA tax exemption. What details are required, when landlord PAN is needed, and how to download PDF free.",
    category: "Finance",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Rent Receipt Generator", toolHref: "/tools/rent-receipt-generator" },
  },
  {
    slug: "cgpa-to-percentage-for-job-applications",
    title: "CGPA to Percentage Conversion for Job Applications — VTU, Anna, CBSE Guide",
    excerpt:
      "Convert CGPA to percentage for job applications, government forms, and visa. VTU formula (×9.5), Anna University, CBSE explained.",
    category: "Finance",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "CGPA to Percentage", toolHref: "/tools/cgpa-to-percentage" },
  },
  {
    slug: "how-to-create-strong-password-guide",
    title: "How to Create a Strong Password — Cybersecurity Guide for Indians 2026",
    excerpt:
      "Learn how to create strong passwords for bank accounts, email, and social media. Includes passphrase generator and password strength checker.",
    category: "PDF & Documents",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Password Generator", toolHref: "/tools/password-generator" },
  },
  {
    slug: "passphrase-generator-guide",
    title: "Passphrase Generator Free — Strong & Memorable Passwords",
    excerpt:
      "Generate strong, memorable passphrases free online. Random word combinations are easier to remember and harder to crack than random characters.",
    category: "PDF & Documents",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Password Generator", toolHref: "/tools/password-generator" },
  },
  {
    slug: "how-to-calculate-percentage-of-marks-india",
    title: "How to Calculate Percentage of Marks — Guide for Indian Students 2026",
    excerpt:
      "Calculate percentage of marks for board exams, entrance tests, and job applications in India. Simple formula with examples.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Percentage Calculator", toolHref: "/tools/percentage-calculator" },
  },
  {
    slug: "how-to-resize-photo-for-government-exams",
    title: "How to Resize Photo for Government Exams — UPSC, SSC, Railway, State PSC (2026)",
    excerpt:
      "Complete photo size guide for UPSC, SSC CGL, Railway RRB, and state PSC exams. Resize free online with exact dimensions.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer" },
  },
  {
    slug: "word-count-for-upsc-essay-writing",
    title: "Word Count for UPSC Essay — How to Practice Writing Within Limits",
    excerpt:
      "UPSC essay word limit guide. How to count words, practice within 1000-1200 word limit, and improve essay writing speed.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Word Counter", toolHref: "/tools/word-counter" },
  },
  {
    slug: "word-counter-online-guide",
    title: "Word Counter Online Free — Count Words, Characters & More",
    excerpt:
      "Free online word counter. Count words, characters, sentences, reading time, keyword density, and social media limits instantly. No signup.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Word Counter", toolHref: "/tools/word-counter" },
  },
  {
    slug: "age-calculator-for-government-forms-india",
    title: "Age Calculator for Government Forms India — Exact Age in Years Months Days",
    excerpt:
      "Calculate your exact age in years, months, and days for government forms, UPSC eligibility, passport, and Aadhaar in India.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Age Calculator", toolHref: "/tools/age-calculator" },
  },
  {
    slug: "best-free-tools-for-indian-students",
    title: "10 Best Free Online Tools Every Indian Student Needs in 2026",
    excerpt:
      "Top free online tools for Indian students — PDF tools, photo resizer, word counter, percentage calculator, and more. No signup required.",
    category: "Students & Utilities",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "All Tools", toolHref: "/tools" },
  },
  {
    slug: "best-free-calculators-for-students-2026",
    title: "Best Free Online Calculators for Students (2026)",
    excerpt:
      "Free calculators for students — grades, loans, SIP, Pomodoro timer, stopwatch, and more. No signup, works on any device.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Percentage Calculator", toolHref: "/tools/percentage-calculator" },
  },
  {
    slug: "how-to-make-passport-size-photo-at-home",
    title: "How to Make Passport Size Photo at Home Free — No Studio Needed (2026)",
    excerpt:
      "Make professional passport size photos at home using your phone. Free online tool to resize and crop to exact dimensions.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Photo Resizer", toolHref: "/tools/photo-resizer?preset=passport" },
  },
  {
    slug: "unit-conversion-guide-indian-students",
    title: "Unit Conversion Guide for Indian Students — Length, Weight, Temperature & More",
    excerpt:
      "Complete unit conversion guide for Indian students. Convert km to miles, kg to lbs, Celsius to Fahrenheit, and more. Free online converter.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Unit Converter", toolHref: "/tools/unit-converter" },
  },
  {
    slug: "how-to-split-pdf-extract-pages-india",
    title: "How to Split a PDF and Extract Pages Free Online — India Guide 2026",
    excerpt:
      "Split PDF files and extract specific pages free online. No signup, works on mobile. Perfect for marksheets, certificates, and bank statements.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Split", toolHref: "/tools/pdf-split" },
  },
  {
    slug: "qr-code-for-college-events-india",
    title: "How to Create QR Code for College Events & Fests — Free Guide India 2026",
    excerpt:
      "Create QR codes for college fest registrations, event links, WhatsApp groups, and UPI payments. Free online QR generator, no signup.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "QR Code Generator", toolHref: "/tools/qr-code-generator" },
  },
  {
    slug: "how-to-combine-images-into-pdf-india",
    title: "How to Combine Multiple Images into One PDF — Free Online Guide India 2026",
    excerpt:
      "Combine multiple photos into one PDF free online. Perfect for submitting ID proofs, certificates, and documents on Indian portals.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "Image to PDF", toolHref: "/tools/image-to-pdf" },
  },
  {
    slug: "tip-calculator-guide",
    title: "Tip Calculator — How to Split a Bill and Calculate Tips Fairly",
    excerpt:
      "Free tip calculator. Calculate tip amount, split the bill between any number of people, and see the total per person instantly. No signup.",
    category: "Finance",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Tip Calculator", toolHref: "/tools/tip-calculator" },
  },
  {
    slug: "developer-data-encoding-tools-guide",
    title: "5 Essential Data Encoding & Conversion Tools for Developers",
    excerpt:
      "Free online tools for URL encoding, binary conversion, HTML entities, CSV to JSON, and XML formatting. No signup, runs entirely in your browser.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "URL Encoder", toolHref: "/tools/url-encoder" },
  },
  {
    slug: "design-tools-for-developers-guide",
    title: "Color and Design Tools Every Developer Needs",
    excerpt:
      "Free online color picker, contrast checker, aspect ratio calculator, and Markdown converter for developers and designers. No signup needed.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Color Picker", toolHref: "/tools/color-picker" },
  },
  {
    slug: "writing-seo-tools-for-content-creators",
    title: "Free Writing and SEO Tools for Content Creators",
    excerpt:
      "Free character counter, text case converter, and keyword density checker for writers and SEO content creators. No signup, instant results.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Character Counter", toolHref: "/tools/character-counter" },
  },
  {
    slug: "useful-text-utility-tools-guide",
    title: "Lorem Ipsum, Number to Words, Text Diff, and Morse Code — Handy Text Utilities Explained",
    excerpt:
      "Free online text tools: Lorem Ipsum generator, number to words converter, text diff checker, and Morse code translator. No signup needed.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Lorem Ipsum Generator", toolHref: "/tools/lorem-ipsum" },
  },
  {
    slug: "how-to-rotate-pdf-pages-online-free",
    title: "How to Rotate PDF Pages Online Free — Fix Sideways Scans (2026)",
    excerpt:
      "Rotate PDF pages online free to fix sideways or upside-down scans. Rotate individual pages or the whole document. Permanent fix, no signup.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Rotate", toolHref: "/tools/pdf-rotate" },
  },
  {
    slug: "how-to-add-page-numbers-to-pdf-free",
    title: "How to Add Page Numbers to PDF Free — Position, Format & Start Number",
    excerpt:
      "Add page numbers to any PDF online free. Choose position, starting number, and format. Skip cover pages. No signup, runs in your browser.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Page Numbers", toolHref: "/tools/pdf-page-numbers" },
  },
  {
    slug: "how-to-add-watermark-to-pdf-free",
    title: "How to Add a Watermark to PDF Free — Text, Logo & Opacity Guide",
    excerpt:
      "Add text or image watermarks to PDFs online free. Mark drafts, confidential docs, or add your logo. Adjustable opacity. No signup needed.",
    category: "PDF",
    readTime: "5 min read",
    author: "Ravi Kumar",
    lastUpdated: "June 2026",
    cta: { toolName: "PDF Watermark", toolHref: "/tools/pdf-watermark" },
  },
  {
    slug: "how-to-create-favicon-online-free",
    title: "How to Create a Favicon Online Free — favicon.ico, PNG Sizes & HTML Tags",
    excerpt:
      "Generate favicon.ico and all standard PNG sizes from any image free online. Get ready-to-paste HTML link tags. No signup needed.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Favicon Generator", toolHref: "/tools/favicon-generator" },
  },
  {
    slug: "calorie-deficit-calculator-guide",
    title: "Calorie Deficit Calculator Guide — BMR, TDEE & Daily Targets Explained",
    excerpt:
      "Understand BMR, TDEE, and calorie deficits using the Mifflin-St Jeor formula. Informational guide with sustainable deficit context. Not medical advice.",
    category: "Finance",
    readTime: "6 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Calorie Deficit Calculator", toolHref: "/tools/calorie-deficit-calculator" },
  },
  {
    slug: "how-to-format-sql-online-free",
    title: "How to Format SQL Online Free — Beautify Queries for Code Review",
    excerpt:
      "Format and beautify SQL queries online free. Auto-indent, capitalize keywords, and minify long queries. No signup, runs in your browser.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "SQL Formatter", toolHref: "/tools/sql-formatter" },
  },
  {
    slug: "how-to-convert-svg-to-png-online",
    title: "How to Convert SVG to PNG Online Free — Any Resolution Guide",
    excerpt:
      "Convert SVG to PNG online free at any resolution. Transparent or solid background. Choose the right export size before converting.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "SVG to PNG", toolHref: "/tools/svg-to-png" },
  },
  {
    slug: "how-to-extract-color-palette-from-image",
    title: "How to Extract a Color Palette from an Image Free Online",
    excerpt:
      "Extract dominant colors from any image with HEX and RGB codes. Great for branding, CSS, and design projects. No signup needed.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Color Palette Extractor", toolHref: "/tools/color-palette-extractor" },
  },
  {
    slug: "free-text-to-speech-online-guide",
    title: "Free Text to Speech Online — Listen to Text in Your Browser",
    excerpt:
      "Convert text to speech free online using your browser's built-in voices. Proofread, practice pronunciation, and preview scripts. Playback only.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Text to Speech", toolHref: "/tools/text-to-speech" },
  },
  {
    slug: "check-device-browser-info-online",
    title: "Check Browser and Device Info Online Free — For Bug Reports",
    excerpt:
      "Check your browser, OS, screen resolution, and viewport details online free. Copy a full report for bug reports and troubleshooting.",
    category: "Students & Utilities",
    readTime: "4 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Device Info", toolHref: "/tools/device-info" },
  },
  {
    slug: "uuid-generator-guide",
    title: "UUID Generator Guide — What UUIDs Are and When to Use Them",
    excerpt:
      "Generate random UUID v4 identifiers online free. Learn what UUIDs are, why they're practically collision-free, and when to use v4 vs other versions.",
    category: "Developer Tools",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "UUID Generator", toolHref: "/tools/uuid-generator" },
  },
  {
    slug: "gpa-calculator-guide",
    title: "GPA Calculator Guide — 4.0 Scale and Weighted GPA Explained",
    excerpt:
      "Free GPA calculator for US students. Learn the standard 4.0 grade-point mapping, weighted vs unweighted GPA, and a worked example with three courses.",
    category: "Students & Utilities",
    readTime: "6 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "GPA Calculator", toolHref: "/tools/gpa-calculator" },
  },
  {
    slug: "days-between-dates-calculator-guide",
    title: "Days Between Dates Calculator Guide — Count Days Free Online",
    excerpt:
      "Calculate the exact number of days between two dates free online. Learn common use cases and which start-date counting convention this tool uses.",
    category: "Productivity",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Days Between Dates", toolHref: "/tools/days-between-dates" },
  },
  {
    slug: "roman-numeral-converter-guide",
    title: "Roman Numeral Converter Guide — Symbols, Rules & Modern Uses",
    excerpt:
      "Convert numbers to Roman numerals or Roman numerals to numbers free online. Learn symbol values, subtractive notation, and where Roman numerals appear today.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Roman Numeral Converter", toolHref: "/tools/roman-numeral-converter" },
  },
  {
    slug: "leap-year-checker-guide",
    title: "Leap Year Checker Guide — The Full Rule with Examples",
    excerpt:
      "Check if any year is a leap year free online. Learn the divisible-by-4/100/400 rule, why 1900 wasn't a leap year, and why we need leap years at all.",
    category: "Productivity",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Leap Year Checker", toolHref: "/tools/leap-year-checker" },
  },
  {
    slug: "us-paycheck-calculator-guide",
    title: "Paycheck Calculator Guide — Gross vs Net, FICA & Tax Brackets",
    excerpt:
      "Free 2026 paycheck calculator guide. Learn gross vs net pay, what FICA funds, why raises never reduce take-home, and how state tax estimates work.",
    category: "Finance",
    readTime: "7 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Paycheck Calculator", toolHref: "/tools/paycheck-calculator" },
  },
  {
    slug: "mortgage-calculator-guide",
    title: "Mortgage Calculator Guide — PITI, PMI & Amortization Explained",
    excerpt:
      "Free mortgage calculator guide. Understand PITI, PMI, why early payments are mostly interest, and how extra payments save thousands over a 30-year loan.",
    category: "Finance",
    readTime: "8 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Mortgage Calculator", toolHref: "/tools/mortgage-calculator" },
  },
  {
    slug: "box-breathing-technique-guide",
    title: "Box Breathing Technique Guide — 4-4-4-4 Stress Relief",
    excerpt:
      "Free box breathing timer with animated guide. Learn the 4-4-4-4 technique used by Navy SEALs, how it calms stress, and when to use 4-7-8 breathing instead.",
    category: "Productivity",
    readTime: "6 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Box Breathing Timer", toolHref: "/tools/box-breathing" },
  },
  {
    slug: "cron-expression-generator-guide",
    title: "Cron Expression Generator Guide — Build Schedules Visually",
    excerpt:
      "Generate and explain cron expressions with a visual builder. Learn the 5 cron fields, common pitfalls, and how to avoid timezone mistakes.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Cron Expression Generator", toolHref: "/tools/cron-generator" },
  },
  {
    slug: "subnet-calculator-guide",
    title: "Subnet Calculator Guide — CIDR Notation & IP Ranges Explained",
    excerpt:
      "Free subnet calculator for IPv4 CIDR. Learn what /24 means, why 2 addresses are subtracted, and common VPC subnet sizes for cloud networks.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Subnet Calculator", toolHref: "/tools/subnet-calculator" },
  },
  {
    slug: "svg-code-previewer-guide",
    title: "SVG Code Previewer Guide — Live Preview & Safe Editing",
    excerpt:
      "Preview SVG code live in your browser. Learn why SVG beats PNG for icons, how to edit colors in code, and when to sanitize untrusted SVG.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "SVG Code Previewer", toolHref: "/tools/svg-previewer" },
  },
  {
    slug: "free-online-audio-recorder-guide",
    title: "Free Online Audio Recorder — Record in Your Browser",
    excerpt:
      "Free online audio recorder. Record from your microphone, play back, and download as WebM. No app install, no server upload, no signup.",
    category: "Students & Utilities",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Audio Recorder", toolHref: "/tools/audio-recorder" },
  },
  {
    slug: "loan-eligibility-calculator-guide",
    title: "Loan Eligibility Calculator India — FOIR Explained",
    excerpt:
      "Check home, personal, or car loan eligibility free online. Learn what FOIR means, why existing EMIs matter, and how banks decide approval beyond income.",
    category: "Finance",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Loan Eligibility Calculator", toolHref: "/tools/loan-eligibility" },
  },
  {
    slug: "css-gradient-generator-guide",
    title: "CSS Gradient Generator Guide — Linear, Radial & Conic",
    excerpt:
      "Create CSS gradients visually and copy ready code. Learn gradient types, color stops, and practical uses for hero sections, buttons, and gradient text.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "CSS Gradient Generator", toolHref: "/tools/css-gradient" },
  },
  {
    slug: "unix-timestamp-converter-guide",
    title: "Unix Timestamp Converter Guide — Epoch Time Explained",
    excerpt:
      "Convert Unix timestamps to readable dates and back. Learn what the Unix epoch is, seconds vs milliseconds, and UTC vs local timezone display.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Unix Timestamp Converter", toolHref: "/tools/timestamp-converter" },
  },
  {
    slug: "how-to-convert-json-to-csv-online-free",
    title: "How to Convert JSON to CSV Online Free",
    excerpt:
      "Convert JSON arrays to CSV for Excel and Google Sheets. Learn required JSON structure, nested object handling, and when to use CSV to JSON instead.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "JSON to CSV Converter", toolHref: "/tools/json-to-csv" },
  },
  {
    slug: "how-to-convert-word-to-jpg-online-free",
    title: "How to Convert Word to JPG Online Free",
    excerpt:
      "Convert DOCX to JPG in your browser. Learn why people share docs as images, formatting limits, and when PDF to JPG works better for complex layouts.",
    category: "PDF & Documents",
    readTime: "6 min read",
    author: "Sarah Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "Word to JPG Converter", toolHref: "/tools/word-to-jpg" },
  },
  {
    slug: "currency-converter-guide",
    title: "Currency Converter Guide — Live ECB Exchange Rates",
    excerpt:
      "Convert currencies with live ECB reference rates. Learn where exchange rates come from, why bank rates differ, and how to use mid-market rates for planning.",
    category: "Finance",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Currency Converter", toolHref: "/tools/currency-converter" },
  },
  {
    slug: "crypto-price-tracker-guide",
    title: "Crypto Price Tracker Guide — Live Bitcoin & Altcoin Prices",
    excerpt:
      "Track live crypto prices free online. Learn what mid-market prices mean, how to read 24h change and market cap, and why this is not financial advice.",
    category: "Finance",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Crypto Price Tracker", toolHref: "/tools/crypto-tracker" },
  },
  {
    slug: "dns-lookup-tool-guide",
    title: "DNS Lookup Tool Guide — Check Any DNS Record Free",
    excerpt:
      "Look up DNS records for any domain free online. Learn what A, MX, TXT, and CNAME records mean, what TTL is, and how to verify DNS propagation.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "DNS Lookup Tool", toolHref: "/tools/dns-lookup" },
  },
  {
    slug: "ip-address-lookup-guide",
    title: "IP Address Lookup Guide — Find Location & ISP Free",
    excerpt:
      "Look up any IP address location, ISP, and timezone online free. Learn how IP geolocation works, its accuracy limits, and IPv4 vs IPv6 basics.",
    category: "Developer Tools",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "IP Address Lookup", toolHref: "/tools/ip-lookup" },
  },
  {
    slug: "fd-calculator-guide-india",
    title: "FD Calculator India — Fixed Deposit Returns Guide",
    excerpt:
      "Calculate fixed deposit maturity amount and interest earned free online. Understand FD rates, TDS, cumulative vs non-cumulative FD, and FD vs SIP for Indian investors.",
    category: "Finance",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "FD Calculator", toolHref: "/tools/fd-calculator" },
  },
  {
    slug: "hra-exemption-calculator-guide",
    title: "HRA Exemption Calculator — How to Claim HRA in India",
    excerpt:
      "Calculate your HRA tax exemption under Section 10(13A) free online. Metro vs non-metro rules, worked examples, old regime requirement, and rent receipt documentation.",
    category: "Finance",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "HRA Calculator", toolHref: "/tools/hra-calculator" },
  },
  {
    slug: "discount-calculator-guide",
    title: "Discount Calculator Online Free — Sale Price & Savings",
    excerpt:
      "Calculate discounted price and total savings instantly. Percentage off, reverse price lookup, stacked discounts, and GST interaction explained for Indian shoppers.",
    category: "Finance",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Discount Calculator", toolHref: "/tools/discount-calculator" },
  },
  {
    slug: "random-number-generator-guide",
    title: "Random Number Generator Online Free — Any Range",
    excerpt:
      "Generate random numbers between any range online free. Single or multiple numbers, no-repeats option, dice rolls, and fair giveaway picks. No signup.",
    category: "Productivity",
    readTime: "6 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Random Number Generator", toolHref: "/tools/random-number" },
  },
  {
    slug: "new-labour-code-2026-salary-guide",
    title: "New Labour Code 2026 Salary Impact — What Changes?",
    excerpt:
      "How India's New Labour Code 2026 affects your take-home salary, PF, and gratuity. The 50% basic salary rule explained with real numbers. Free calculator.",
    category: "Finance",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Labour Code Calculator", toolHref: "/tools/labour-code-calculator" },
  },
  {
    slug: "section-44ada-freelancer-tax-guide",
    title: "Section 44ADA Tax Guide for Freelancers India 2026",
    excerpt:
      "Complete guide to Section 44ADA presumptive taxation for Indian freelancers. ₹75L limit, 50% rule, eligible professions, advance tax, and free calculator.",
    category: "Finance",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "44ADA Tax Calculator", toolHref: "/tools/freelancer-tax-calculator" },
  },
  {
    slug: "old-vs-new-tax-regime-comparison-2026",
    title: "Old vs New Tax Regime India 2026 — Which Is Better?",
    excerpt:
      "Compare old vs new tax regime for FY 2026-27. Side-by-side tax calculation with HRA, 80C, 80D. Find out which regime saves you more money. Free tool.",
    category: "Finance",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Tax Regime Comparison", toolHref: "/tools/tax-regime-comparison" },
  },
  {
    slug: "ppf-calculator",
    title: "PPF Calculator India 2026 — Returns, Interest & Maturity",
    excerpt:
      "Calculate PPF maturity amount, interest, and year-by-year returns at 7.1% rate. Understand 80C benefits, partial withdrawal, loan rules. Free PPF calculator.",
    category: "Finance",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "PPF Calculator", toolHref: "/tools/ppf-calculator" },
  },
  {
    slug: "w2-vs-1099-tax-comparison-guide",
    title: "W-2 vs 1099 Taxes 2026 — What's the Real Difference?",
    excerpt:
      "W-2 employees split FICA taxes with employers. 1099 contractors pay full 15.3% SE tax. See the complete comparison with 2026 tax rates and real numbers.",
    category: "Finance",
    readTime: "8 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "W-2 vs 1099 Calculator", toolHref: "/tools/w2-vs-1099-calculator" },
  },
  {
    slug: "self-employment-tax-calculator-guide-usa",
    title: "Self-Employment Tax 2026 — How to Calculate & Pay Quarterly",
    excerpt:
      "Self-employment tax is 15.3% on 92.35% of net earnings. Calculate your SE tax, income tax, quarterly payments, and the SE tax deduction with 2026 IRS rules.",
    category: "Finance",
    readTime: "8 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Self-Employment Tax Calculator", toolHref: "/tools/self-employment-tax" },
  },
  {
    slug: "robots-txt-generator-guide",
    title: "robots.txt Generator Guide — How to Write & Validate",
    excerpt:
      "Learn how to create a robots.txt file for your website. User-agent rules, allow/disallow syntax, sitemap declaration, and common mistakes. Free generator tool.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "robots.txt Generator", toolHref: "/tools/robots-txt-generator" },
  },
  {
    slug: "capital-gains-tax-calculator-india-guide",
    title: "Capital Gains Tax India 2026 — STCG, LTCG Rates & Calculator",
    excerpt:
      "Complete guide to STCG and LTCG tax rates in India for FY 2026-27. Equity, property, gold, debt fund taxation explained with Budget 2024 changes. Free calculator.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Capital Gains Tax Calculator", toolHref: "/tools/capital-gains-calculator" },
  },
  {
    slug: "rd-calculator-guide-india",
    title: "RD Calculator India — How Recurring Deposits Work 2026",
    excerpt:
      "Calculate RD maturity and interest online free. Understand TDS, quarterly compounding, and how RD compares to FD and SIP. Free recurring deposit calculator.",
    category: "Finance",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "RD Calculator", toolHref: "/tools/rd-calculator" },
  },
  {
    slug: "glassmorphism-css-generator-guide",
    title: "Glassmorphism CSS Generator 2026 — Frosted Glass UI Guide",
    excerpt:
      "Create frosted glass UI effects with CSS backdrop-filter. Learn glassmorphism CSS with live examples, Tailwind classes, Firefox fallback, and performance tips.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Glassmorphism CSS Generator", toolHref: "/tools/glassmorphism-generator" },
  },
  {
    slug: "htaccess-generator-guide",
    title: ".htaccess File Guide 2026 — Redirects, Caching & Security",
    excerpt:
      "Learn how to create an .htaccess file for Apache servers. HTTPS redirects, browser caching, GZIP, custom error pages, and security rules explained.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: ".htaccess Generator", toolHref: "/tools/htaccess-generator" },
  },
  {
    slug: "nps-calculator-guide-india",
    title: "NPS Calculator India — How to Plan Your NPS Retirement",
    excerpt:
      "Complete NPS guide: calculate retirement corpus, monthly pension, and tax savings under Section 80CCD. Compare NPS with PPF and EPF. Free NPS calculator.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "NPS Calculator", toolHref: "/tools/nps-calculator" },
  },
  {
    slug: "401k-calculator-guide-usa",
    title: "401k Calculator 2026 — How Much Will You Have at Retirement?",
    excerpt:
      "Calculate your 401k balance at retirement with 2026 IRS contribution limits. Understand employer match, catch-up contributions, and the power of starting early.",
    category: "Finance",
    readTime: "8 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "401k Calculator", toolHref: "/tools/401k-calculator" },
  },
  {
    slug: "leave-encashment-calculator-guide-india",
    title: "Leave Encashment India 2026 — Rules, Tax Exemption & Calculation",
    excerpt:
      "Understand leave encashment rules in India. ₹25 lakh tax exemption at retirement (Budget 2023). Calculate EL, CL, SL encashment and tax impact. Free calculator.",
    category: "Finance",
    readTime: "7 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Leave Encashment Calculator", toolHref: "/tools/leave-encashment-calculator" },
  },
  {
    slug: "box-shadow-css-generator-guide",
    title: "CSS Box Shadow Generator 2026 — Multi-Layer Shadow Guide",
    excerpt:
      "Create CSS box shadows with live preview. Multi-layer shadows, colored glows, inset shadows explained. Copy CSS or Tailwind. Free visual generator.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Box Shadow CSS Generator", toolHref: "/tools/box-shadow-generator" },
  },
  {
    slug: "cagr-calculator-guide-india",
    title: "CAGR Calculator India — What Is CAGR & How to Use It",
    excerpt:
      "CAGR (Compound Annual Growth Rate) explained simply. Calculate mutual fund returns, compare investments, understand Rule of 72. With real CAGR (inflation-adjusted) concept.",
    category: "Finance",
    readTime: "8 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "CAGR Calculator", toolHref: "/tools/cagr-calculator" },
  },
  {
    slug: "sukanya-samriddhi-yojana-calculator-guide",
    title: "SSY Calculator 2026 — Sukanya Samriddhi Yojana Returns Guide",
    excerpt:
      "Calculate SSY maturity amount at 8.2% interest. Understand deposit rules, partial withdrawal at 18, maturity at 21, and EEE tax benefits. Free SSY calculator.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "SSY Calculator", toolHref: "/tools/ssy-calculator" },
  },
  {
    slug: "advance-tax-calculator-guide-india",
    title: "Advance Tax India FY 2026-27 — Due Dates, Calculation & Penalties",
    excerpt:
      "Everything about advance tax for FY 2026-27. Who must pay, 4 instalment schedule (June/Sep/Dec/March), Section 234B/234C penalties, and 44ADA single-payment rule.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Advance Tax Calculator", toolHref: "/tools/advance-tax-calculator" },
  },
  {
    slug: "color-palette-generator-guide",
    title: "Color Palette Generator for Tailwind CSS — Hex to Full Scale",
    excerpt:
      "Generate a complete Tailwind 50-950 color palette from your brand hex color. CSS variables, Tailwind config, and WCAG contrast check. Free developer tool.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Color Palette Generator", toolHref: "/tools/color-palette-generator" },
  },
  {
    slug: "professional-tax-calculator-guide-india",
    title: "Professional Tax India 2026 — State-wise Slabs & Calculator",
    excerpt:
      "Professional tax slabs for all 18 Indian states for FY 2026-27. Maharashtra, Karnataka, Telangana, West Bengal rates with women's exemption and deduction rules.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Professional Tax Calculator", toolHref: "/tools/professional-tax-calculator" },
  },
  {
    slug: "pay-stub-generator-guide-usa",
    title: "Pay Stub Generator 2026 — Free US Paycheck Stub Creator",
    excerpt:
      "Create free US pay stubs online. Download as PDF instantly. Explains gross pay, deductions (FICA, federal tax), and net pay. For freelancers and small businesses.",
    category: "Finance",
    readTime: "8 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Pay Stub Generator", toolHref: "/tools/pay-stub-generator" },
  },
  {
    slug: "markdown-table-generator-guide",
    title: "Markdown Table Generator — How to Create Tables in Markdown",
    excerpt:
      "Create Markdown tables easily with a visual editor. Learn Markdown table syntax, alignment, and how to convert CSV data to Markdown format. Free tool.",
    category: "Developer Tools",
    readTime: "7 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "Markdown Table Generator", toolHref: "/tools/markdown-table" },
  },
  {
    slug: "http-status-codes-guide",
    title: "HTTP Status Codes Guide 2026 — All Codes Explained",
    excerpt:
      "Every HTTP status code explained: 200 OK, 301 redirect, 404 not found, 401 vs 403, 429 rate limit, 502 bad gateway, 503 unavailable. With developer context.",
    category: "Developer Tools",
    readTime: "9 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "HTTP Status Codes Reference", toolHref: "/tools/http-status-codes" },
  },
  {
    slug: "401k-vs-roth-ira-guide-usa",
    title: "401k vs Roth IRA 2026 — Which Retirement Account Wins?",
    excerpt:
      "Traditional 401k vs Roth 401k vs Roth IRA explained for 2026. Tax bracket math, 2026 contribution limits, Roth 401k RMD elimination, and when each wins. Free calculator.",
    category: "Finance",
    readTime: "10 min read",
    author: "Alex Morgan",
    lastUpdated: "June 2026",
    cta: { toolName: "401k vs Roth IRA Calculator", toolHref: "/tools/401k-vs-roth-ira" },
  },
  {
    slug: "bonus-calculator-guide-india",
    title: "Bonus Calculator India 2026 — Payment of Bonus Act Explained",
    excerpt:
      "How is salary bonus calculated in India? Payment of Bonus Act 1965 rules, ₹21,000 eligibility limit, ₹7,000 wage ceiling, 8.33% minimum, 20% maximum. Free calculator.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Bonus Calculator", toolHref: "/tools/bonus-calculator" },
  },
  {
    slug: "esi-calculator-guide-india",
    title: "ESI Calculator India 2026 — ESIC Contribution Rates & Benefits",
    excerpt:
      "Calculate Employee State Insurance (ESI) contributions for FY 2026-27. ₹21,000 wage ceiling, 0.75% employee + 3.25% employer rates, ESI benefits explained. Free.",
    category: "Finance",
    readTime: "9 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "ESI Calculator", toolHref: "/tools/esi-calculator" },
  },
  {
    slug: "swp-calculator-guide-india",
    title: "SWP Calculator India 2026 — Systematic Withdrawal Plan Guide",
    excerpt:
      "How does SWP work? Calculate corpus needed for ₹25,000/month retirement income. Compare SWP vs FD interest. LTCG tax on SWP explained. Free calculator.",
    category: "Finance",
    readTime: "10 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "SWP Calculator", toolHref: "/tools/swp-calculator" },
  },
  {
    slug: "dividend-yield-calculator-guide-india",
    title: "Dividend Yield Calculator India 2026 — How to Calculate Stock Returns",
    excerpt:
      "What is dividend yield? Calculate current yield, yield on cost, TDS impact, and compare dividend income vs FD returns. India stock market guide. Free calculator.",
    category: "Finance",
    readTime: "10 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "Dividend Yield Calculator", toolHref: "/tools/dividend-yield-calculator" },
  },
  {
    slug: "freelancer-gst-registration-guide-india",
    title: "GST Registration for Freelancers India 2026 — Do You Need It?",
    excerpt:
      "When do Indian freelancers need GST registration? ₹20L threshold for services, ₹10L for NE states, mandatory for inter-state supply. Complete guide with free threshold checker.",
    category: "Finance",
    readTime: "11 min read",
    author: "Priya Sharma",
    lastUpdated: "June 2026",
    cta: { toolName: "GST Threshold Checker", toolHref: "/tools/gst-threshold-checker" },
  },
  {
    slug: "hsa-calculator-guide-usa",
    title: "HSA Calculator 2026 — Limits, Tax Savings & Growth Guide",
    excerpt:
      "2026 HSA contribution limits: $4,300 individual, $8,550 family. Calculate your triple tax savings, HDHP requirements, and 20-year HSA growth projection. Free tool.",
    category: "Finance",
    readTime: "10 min read",
    author: "James Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "HSA Calculator", toolHref: "/tools/hsa-calculator" },
  },
  {
    slug: "json-schema-validator-guide",
    title: "JSON Schema Validator — How to Validate JSON in 2026",
    excerpt:
      "Validate JSON data against a JSON Schema. Understand Draft 7 vs 2020-12, required fields, type checking, and format validation. Free browser-based JSON Schema validator.",
    category: "Developer Tools",
    readTime: "9 min read",
    author: "James Mitchell",
    lastUpdated: "June 2026",
    cta: { toolName: "JSON Schema Validator", toolHref: "/tools/json-schema-validator" },
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
    title: "Aadhaar Card Photo Requirements — Why Photos Get Rejected",
    description:
      "Complete guide to Aadhaar photo requirements 2026. Understand why UIDAI rejects photos and how to prepare a compliant image. Size, format, and common mistakes.",
    keywords:
      "aadhaar card photo requirements, aadhaar photo rejected reason, uidai photo rejection, aadhaar photo upload failed",
  },
  "how-to-compress-pdf-online-free": {
    title: "How to Compress PDF Online Free in 2026 | WorkUtilities",
    description:
      "Compress PDF files online free without losing quality. Reduce PDF size for email, WhatsApp, or government portals. No signup, runs in browser.",
    keywords:
      "compress pdf online free, reduce pdf size, pdf compressor india, pdf too large for email",
  },
  "best-free-pdf-tools-online-2026": {
    title: "Best Free PDF Tools Online 2026 — No Download | WorkUtilities",
    description:
      "Best free online PDF tools in 2026 — compress, merge, split, convert to Word, unlock passwords. No signup, browser-based, private.",
    keywords:
      "best free pdf tools online, pdf merge split compress free, online pdf tools no signup, browser pdf converter 2026",
  },
  "how-to-split-pdf-pages-online-free-2026": {
    title: "How to Split PDF Pages Online Free 2026 | WorkUtilities",
    description:
      "Split PDF files and extract specific pages free online. Page range syntax, ZIP download, browser-based — no signup required.",
    keywords:
      "split pdf pages online free, extract pages from pdf, pdf split page range, split pdf into individual pages",
  },
  "reduce-image-size-without-losing-quality": {
    title: "How to Reduce Image Size Without Losing Quality — 5 Methods That Work",
    description:
      "Learn 5 proven ways to reduce image file size without losing quality. JPG vs PNG compression, target file sizes, social media limits, and a free browser-based tool. No signup.",
    keywords:
      "reduce image size without losing quality, compress image online free, jpg vs png compression, image file size for website",
  },
  "how-to-convert-heic-to-jpg-on-windows": {
    title: "How to Convert HEIC to JPG on Windows Free 2026 | WorkUtilities",
    description:
      "iPhone HEIC photos won't open on Windows? Convert HEIC to JPG free online in seconds. No software install, private browser conversion.",
    keywords:
      "convert heic to jpg windows free, heic to jpeg online, iphone photo windows, heic converter no upload",
  },
  "convert-pdf-to-word-free": {
    title: "Convert PDF to Word Free Online 2026 | WorkUtilities",
    description:
      "Convert PDF to editable Word document free online. No signup, no upload to server. Works in your browser.",
    keywords:
      "convert pdf to word free, pdf to word online india, pdf to docx converter free",
  },
  "passport-size-photo-dimensions-india": {
    title: "India Passport Photo Rule Change 2026 — What You Need to Know",
    description:
      "India changed passport photo rules from September 2025. Old 2×2 inch format rejected. New 35×45mm ICAO standard explained. Passport Seva 2.0 AI checking what it means for applicants.",
    keywords:
      "india passport photo rule change 2025, passport seva 2.0 photo rejection, icao passport photo india, why passport photo rejected",
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
    title: "How to Remove Background from a Photo Free 2026 | WorkUtilities",
    description:
      "Remove photo backgrounds free online with AI. Perfect for Etsy, Amazon, LinkedIn, and product photos. Browser-based, private, no signup.",
    keywords:
      "remove background from photo free, background remover online, etsy product photo white background, ai background removal free",
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
    title: "Home Loan EMI Guide India 2026 — Calculate & Plan Your EMI",
    description:
      "Complete home loan EMI guide for India 2026. Calculate EMI, understand amortisation, compare tenures, and plan prepayment. Free EMI calculator included.",
    keywords:
      "home loan emi guide india 2026, home loan interest rates sbi hdfc, how much emi can i afford, home loan tenure comparison",
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
  "epf-calculator-guide-india": {
    title: "EPF Calculator Guide — PF Maturity Calculator India",
    description:
      "Calculate your EPF maturity amount free online. See employee vs employer contribution split and year-by-year provident fund growth. No signup.",
    keywords:
      "EPF calculator, epf maturity calculator india, employee provident fund guide, epf interest rate epfo, pf retirement corpus",
  },
  "gratuity-calculation-formula-india": {
    title: "Gratuity Calculation Formula India — Free Calculator 2026",
    description:
      "Learn the gratuity calculation formula under Indian law. Calculate your exact gratuity amount and check the ₹20 lakh tax exemption limit free.",
    keywords:
      "gratuity calculation formula, gratuity calculator india, payment of gratuity act, gratuity on resignation, gratuity tax exemption 20 lakh",
  },
  "lta-exemption-rules-india": {
    title: "LTA Exemption Rules India — How to Claim Leave Travel Allowance",
    description:
      "Complete guide to LTA exemption rules in India. Block-of-4-years rule, eligible travel modes, and free LTA calculator to check your exemption.",
    keywords:
      "LTA exemption rules, leave travel allowance india, lta block year 2022 2025, lta calculator india, lta claim documents",
  },
  "hourly-to-salary-calculator-guide": {
    title: "Hourly to Salary Calculator — Convert Wage to Annual Pay",
    description:
      "Convert hourly wage to annual salary free online. See daily, weekly, monthly, and yearly pay side by side. Works both directions, no signup.",
    keywords:
      "hourly to salary calculator, hourly wage to annual salary, convert hourly to yearly, freelance hourly rate comparison, 2080 work hours year",
  },
  "inflation-calculator-money-value-guide": {
    title: "Inflation Calculator — What Will Your Money Be Worth Later?",
    description:
      "Free inflation calculator for India and US. See future or past value of money, and plan retirement and savings goals with real purchasing power.",
    keywords:
      "inflation calculator, inflation calculator india, future value of money, purchasing power inflation, real returns vs inflation",
  },
  "how-to-merge-pdf-on-mobile-india": {
    title: "How to Merge PDF Files on Mobile Free (2026) | WorkUtilities",
    description:
      "Step-by-step guide to merge PDF files on Android and iPhone in India. No app download needed, works in browser.",
    keywords:
      "merge pdf on mobile india, combine pdf android iphone, merge pdf free online mobile, pdf merge browser",
  },
  "how-to-convert-word-to-pdf-free": {
    title: "Convert Word to PDF Free Online 2026 | WorkUtilities",
    description:
      "Convert Word documents to PDF free online. Works on Windows, Mac, Android, iPhone. No Microsoft Office needed.",
    keywords:
      "convert word to pdf free online, docx to pdf india, word to pdf without office, resume pdf converter",
  },
  "compress-image-under-100kb-india": {
    title: "Compress Image Under 100KB for Government Portals India | WorkUtilities",
    description:
      "Compress image to under 100KB for UPSC, SSC, Aadhaar, PAN, and other Indian government portal uploads. Free online tool.",
    keywords:
      "compress image under 100kb india, ssc photo 50kb, government portal image size, reduce image kb limit",
  },
  "passport-photo-size-requirements-india-guide": {
    title: "Passport Photo Size Requirements India 2026 | WorkUtilities",
    description:
      "Complete guide to Indian passport photo size, dimensions, background, and common rejection reasons. Resize free online.",
    keywords:
      "passport photo size india 2026, passport photo requirements mea, indian passport photo dimensions, passport photo resize",
  },
  "how-to-create-digital-signature-india": {
    title: "Create Digital Signature Free Online India 2026 | WorkUtilities",
    description:
      "Create a digital signature free online in India. For PDFs, documents, and forms. No software download needed.",
    keywords:
      "digital signature india free, create signature online, electronic signature pdf india, sign document online",
  },
  "aadhaar-photo-size-guide": {
    title: "Aadhaar Card Photo Size Guide — 413×531 Pixels, 50KB | WorkUtilities",
    description:
      "Aadhaar card photo size is 413×531 pixels, max 50KB. Complete guide to resize your photo for Aadhaar update portal free.",
    keywords:
      "aadhaar photo size 413x531, aadhaar photo 50kb, uidai photo requirements, resize aadhaar photo online",
  },
  "qr-code-for-small-business-india": {
    title: "Create QR Code for Business India 2026 — Free Guide | WorkUtilities",
    description:
      "Create QR codes for your shop, business card, UPI payment, WhatsApp, and menu free online. Guide for Indian small businesses.",
    keywords:
      "qr code for business india, upi qr code generator, shop qr code free, whatsapp qr code business",
  },
  "rent-receipt-for-hra-exemption-india": {
    title: "Rent Receipt for HRA Exemption India 2026 — Generate PDF Free | WorkUtilities",
    description:
      "Generate rent receipts for HRA tax exemption. What details are required, when landlord PAN is needed, and how to download PDF free.",
    keywords:
      "rent receipt hra exemption india, hra rent receipt format, landlord pan rent receipt, generate rent receipt pdf",
  },
  "cgpa-to-percentage-for-job-applications": {
    title: "CGPA to Percentage for Job Applications — VTU, Anna, CBSE | WorkUtilities",
    description:
      "Convert CGPA to percentage for job applications, government forms, and visa. VTU formula (×9.5), Anna University, CBSE explained.",
    keywords:
      "cgpa to percentage job application, vtu cgpa percentage formula, anna university cgpa conversion, naukri cgpa percentage",
  },
  "how-to-create-strong-password-guide": {
    title: "How to Create Strong Password — Cybersecurity Guide India 2026 | WorkUtilities",
    description:
      "Learn how to create strong passwords for bank accounts, email, and social media. Free passphrase generator and password strength checker included.",
    keywords:
      "strong password guide india, passphrase generator, password strength checker, create secure password, password generator free",
  },
  "passphrase-generator-guide": {
    title: "Passphrase Generator Free — Strong & Memorable Passwords | WorkUtilities",
    description:
      "Generate strong, memorable passphrases free online. Random word combinations are easier to remember and harder to crack than random characters. No signup.",
    keywords:
      "passphrase generator, random passphrase generator, correct horse battery staple, memorable password generator, passphrase vs password",
  },
  "how-to-calculate-percentage-of-marks-india": {
    title: "How to Calculate Percentage of Marks — Indian Students 2026 | WorkUtilities",
    description:
      "Calculate percentage of marks for board exams, entrance tests, and job applications in India. Simple formula with examples.",
    keywords:
      "calculate percentage of marks india, class 12 percentage formula, board exam percentage, aggregate percentage calculator",
  },
  "how-to-resize-photo-for-government-exams": {
    title: "Resize Photo for Government Exams India 2026 — UPSC SSC Railway | WorkUtilities",
    description:
      "Complete photo size guide for UPSC, SSC CGL, Railway RRB, and state PSC exams. Resize free online with exact dimensions.",
    keywords:
      "government exam photo size india, ssc cgl photo 50kb, upsc photo dimensions, railway rrb photo resize",
  },
  "word-count-for-upsc-essay-writing": {
    title: "Word Count for UPSC Essay — Practice Within Limits | WorkUtilities",
    description:
      "UPSC essay word limit guide. How to count words, practice within 1000-1200 word limit, and improve essay writing speed.",
    keywords:
      "upsc essay word limit, word count upsc mains, essay writing practice india, upsc gs answer word limit",
  },
  "word-counter-online-guide": {
    title: "Word Counter Online Free — Count Words Instantly | WorkUtilities",
    description:
      "Free online word counter. Count words, characters, sentences, reading time, and keyword density instantly. Perfect for essays, social media, and SEO. No signup.",
    keywords:
      "word counter online, free word counter, character counter online, reading time calculator, keyword density word counter",
  },
  "age-calculator-for-government-forms-india": {
    title: "Age Calculator for Government Forms India 2026 | WorkUtilities",
    description:
      "Calculate your exact age in years, months, and days for government forms, UPSC eligibility, passport, and Aadhaar in India.",
    keywords:
      "age calculator government forms india, upsc age eligibility calculator, age as on date calculator, ssc age limit",
  },
  "best-free-tools-for-indian-students": {
    title: "10 Best Free Online Tools for Indian Students 2026 | WorkUtilities",
    description:
      "Top free online tools for Indian students — PDF tools, photo resizer, word counter, percentage calculator, and more. No signup required.",
    keywords:
      "free tools for students india, online tools for college students, pdf tools students, exam photo resize free",
  },
  "best-free-calculators-for-students-2026": {
    title: "Best Free Online Calculators for Students 2026 | WorkUtilities",
    description:
      "Free online calculators for students — percentage, CGPA, EMI, SIP, Pomodoro timer, stopwatch, and more. No signup, works on mobile.",
    keywords:
      "free calculators for students, student loan emi calculator, pomodoro timer study, cgpa percentage calculator, online calculators college",
  },
  "how-to-make-passport-size-photo-at-home": {
    title: "Make Passport Size Photo at Home Free 2026 | WorkUtilities",
    description:
      "Make professional passport size photos at home using your phone. Free online tool to resize and crop to exact dimensions.",
    keywords:
      "passport size photo at home india, make passport photo phone, passport photo without studio, resize passport photo free",
  },
  "unit-conversion-guide-indian-students": {
    title: "Unit Conversion Guide for Indian Students 2026 | WorkUtilities",
    description:
      "Complete unit conversion guide for Indian students. Convert km to miles, kg to lbs, Celsius to Fahrenheit, and more. Free online converter.",
    keywords:
      "unit conversion guide students, km to miles india, celsius to fahrenheit, kg to lbs luggage limit",
  },
  "how-to-split-pdf-extract-pages-india": {
    title: "Split PDF Extract Pages Free Online India 2026 | WorkUtilities",
    description:
      "Split PDF files and extract specific pages free online. No signup, works on mobile. Perfect for marksheets, certificates, and bank statements.",
    keywords:
      "split pdf extract pages free, pdf split online india, extract page from marksheet pdf, pdf split mobile",
  },
  "qr-code-for-college-events-india": {
    title: "QR Code for College Events India 2026 — Free Guide | WorkUtilities",
    description:
      "Create QR codes for college fest registrations, event links, WhatsApp groups, and UPI payments. Free online QR generator, no signup.",
    keywords:
      "qr code college fest india, event registration qr code, college event qr generator free, fest banner qr code",
  },
  "how-to-combine-images-into-pdf-india": {
    title: "Combine Images into One PDF Free India 2026 | WorkUtilities",
    description:
      "Combine multiple photos into one PDF free online. Perfect for submitting ID proofs, certificates, and documents on Indian portals.",
    keywords:
      "combine images to pdf india, multiple photos one pdf, aadhaar pan pdf upload, image to pdf free online",
  },
  "complete-pdf-tools-guide-india": {
    title: "Complete PDF Tools Guide for Indians 2026 | WorkUtilities",
    description:
      "Complete guide to free PDF tools in India. Compress, merge, split, convert PDF to Word, unlock password protected PDFs. No signup needed.",
    keywords:
      "pdf tools india free, compress merge split pdf online, pdf to word india, government portal pdf tools",
  },
  "complete-salary-tax-guide-india": {
    title: "Complete Salary & Tax Guide for Indian Employees 2026 | WorkUtilities",
    description:
      "Complete guide to understanding salary, tax, and investments for Indian employees. CTC calculator, income tax, SIP, EMI, and more free tools.",
    keywords:
      "salary tax guide india, ctc in hand salary, income tax planning india, sip emi calculator employees",
  },
  "complete-government-forms-guide-india": {
    title: "Complete Government Forms Guide India 2026 | WorkUtilities",
    description:
      "Complete guide to photo sizes, PDF requirements, and document preparation for Indian government forms — Aadhaar, PAN, Passport, UPSC, SSC.",
    keywords:
      "government forms guide india, aadhaar pan passport photo size, upsc ssc document requirements, pdf size government portal",
  },
  "complete-student-tools-guide-india": {
    title: "Complete Student Tools Guide India 2026 | WorkUtilities",
    description:
      "Best free online tools for Indian students. Convert CGPA to percentage, count words, calculate marks, resize exam photos, and more.",
    keywords:
      "student tools india free, cgpa percentage calculator, exam photo resize, upsc essay word count tools",
  },
  "complete-image-tools-guide-india": {
    title: "Complete Image & Photo Tools Guide India 2026 | WorkUtilities",
    description:
      "Complete guide to free image tools in India. Compress images, resize photos, convert formats, create QR codes and digital signatures free online.",
    keywords:
      "image tools india free, compress resize photo online, digital signature qr code india, passport photo tools",
  },
  "complete-developer-tools-guide": {
    title: "Complete Developer Tools Guide 2026 — Free Online Tools",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder, regex tester, hash generator, JWT decoder, and more. No signup, runs in your browser.",
    keywords:
      "free online developer tools, json formatter online, base64 encode decode, regex tester online, jwt decoder free",
  },
  "how-to-format-json-online-free": {
    title: "JSON Formatter & Validator Online Free — No Signup",
    description:
      "Format, validate, and beautify JSON online free. Catch syntax errors instantly, minify or pretty-print. Runs in your browser, nothing uploaded.",
    keywords:
      "JSON formatter online, json validator free, pretty print json, minify json online, format json browser",
  },
  "base64-encode-decode-guide": {
    title: "Base64 Encode & Decode Online Free — Text and Files",
    description:
      "Encode or decode Base64 online free. Convert text, images, and files to Base64 and back instantly. No signup, runs entirely in your browser.",
    keywords:
      "base64 encode decode, base64 encoder online, base64 decoder free, data uri base64, encode file base64",
  },
  "md5-sha256-hash-generator-guide": {
    title: "MD5 & SHA-256 Hash Generator Online Free",
    description:
      "Generate MD5, SHA-1, and SHA-256 hashes online free. Verify file integrity and checksums instantly. No signup, processes locally in your browser.",
    keywords:
      "MD5 SHA256 hash generator, sha256 checksum online, md5 hash generator free, file integrity hash, checksum verifier",
  },
  "how-to-decode-jwt-token-online": {
    title: "JWT Decoder Online Free — Decode & Verify Signatures",
    description:
      "Decode and verify JWT signatures online free. Color-coded panels, claims explainer, expiry badges, and client-side verification. No signup — your secret never leaves your browser.",
    keywords:
      "decode JWT token online, verify jwt signature, jwt decoder free, inspect jwt payload, jwt debugger, json web token decoder",
  },
  "how-to-test-regex-online": {
    title: "Regex Tester Online Free — Test & Debug Regex Patterns",
    description:
      "Test and debug regular expressions online free. Live match highlighting, common patterns, and a quick-reference cheat sheet. No signup needed.",
    keywords:
      "regex tester online, test regular expression free, regex debugger, regex cheat sheet, regex pattern tester",
  },
  "pomodoro-technique-timer-guide": {
    title: "Pomodoro Timer Online Free — 25-Minute Focus Technique",
    description:
      "Free online Pomodoro timer for focused work. Learn the 25-minute technique, customize intervals, and build a sustainable study or work routine.",
    keywords:
      "pomodoro technique timer, pomodoro timer online free, 25 minute focus timer, study timer pomodoro, focus technique",
  },
  "online-stopwatch-guide": {
    title: "Online Stopwatch Free — Precise Timer with Lap Tracking",
    description:
      "Free online stopwatch with lap timer. Track workouts, study sessions, presentations, and cooking times accurately. No app download, no signup.",
    keywords:
      "online stopwatch, stopwatch with lap timer free, browser stopwatch, workout timer online, presentation timer",
  },
  "time-zone-converter-guide": {
    title: "Time Zone Converter Online Free — Schedule Across Countries",
    description:
      "Convert time between time zones free online. Schedule international meetings, calls, and remote team standups without timezone math mistakes.",
    keywords:
      "time zone converter, convert time zones online free, schedule international meeting, IST to EST converter, remote team timezone",
  },
  "bmi-calculator-guide": {
    title: "BMI Calculator Free — Check Your Body Mass Index Online",
    description:
      "Calculate your BMI free online using metric or imperial units. See WHO weight categories and understand what BMI does and doesn't tell you.",
    keywords:
      "BMI calculator, body mass index calculator free, BMI chart WHO categories, calculate BMI metric imperial, BMI meaning",
  },
  "compound-interest-calculator-guide": {
    title: "Compound Interest Calculator Free — See How Money Grows",
    description:
      "Free compound interest calculator. See exactly how your investment grows over time, and the difference compounding frequency makes to your returns.",
    keywords:
      "compound interest calculator, compound interest formula calculator free, rule of 72, investment growth calculator, compounding frequency",
  },
  "how-to-convert-pdf-to-jpg-online-free": {
    title: "PDF to JPG Converter Online Free — No Signup",
    description:
      "Convert PDF pages to JPG images free online. Each page becomes a separate image, ready to download. No signup, nothing uploaded to a server.",
    keywords:
      "PDF to JPG converter, convert PDF to image free online, PDF page to JPG, extract PDF pages as images, PDF to JPEG browser",
  },
  "how-to-convert-image-formats-online": {
    title: "How to Convert Image Formats Online — JPG, PNG, WebP Guide 2026",
    description:
      "Complete guide to converting images between JPG, PNG, and WebP. When to use each format, quality settings explained, transparency handling, and a free browser-based converter. No signup.",
    keywords:
      "convert image formats online, jpg png webp guide, image format converter 2026, png to jpg transparency",
  },
  "how-to-convert-webp-to-jpg": {
    title: "WebP to JPG Converter Online Free — No Signup",
    description:
      "Convert WebP images to JPG free online. Fix compatibility issues with older apps, devices, and editors that don't support WebP. No signup.",
    keywords:
      "WebP to JPG converter, convert WebP to JPEG free, WebP compatibility fix, WebP image converter online, open WebP in photo editor",
  },
  "how-to-convert-excel-to-pdf-free": {
    title: "Excel to PDF Converter Online Free — No Signup",
    description:
      "Convert Excel spreadsheets to PDF free online. Keep formatting consistent for sharing, printing, or submitting reports. No signup, no uploads.",
    keywords:
      "Excel to PDF converter, convert XLSX to PDF free online, spreadsheet to PDF, Excel PDF no upload, Excel report PDF",
  },
  "how-to-convert-ppt-to-pdf-free": {
    title: "PowerPoint to PDF Converter Online Free — No Signup",
    description:
      "Convert PowerPoint presentations to PDF free online. Share slides without editable access, and keep formatting and fonts identical for everyone.",
    keywords:
      "PowerPoint to PDF converter, PPT to PDF free online, convert PPTX to PDF, presentation to PDF no signup, slides to PDF",
  },
  "tip-calculator-guide": {
    title: "Tip Calculator Free — Split Bills & Calculate Tips Online",
    description:
      "Free tip calculator. Calculate tip amount, split the bill between any number of people, and see the total per person instantly. No signup.",
    keywords:
      "tip calculator, split bill calculator, calculate tip online free, restaurant tip calculator, bill splitter",
  },
  "developer-data-encoding-tools-guide": {
    title: "5 Data Encoding Tools for Developers — Free Online",
    description:
      "Free online tools for URL encoding, binary conversion, HTML entities, CSV to JSON, and XML formatting. No signup, runs entirely in your browser.",
    keywords:
      "data encoding tools online, URL encoder, binary converter, HTML entity encoder, CSV to JSON, XML formatter",
  },
  "design-tools-for-developers-guide": {
    title: "Color & Design Tools for Developers — Free Online",
    description:
      "Free online color picker, contrast checker, aspect ratio calculator, and Markdown converter for developers and designers. No signup needed.",
    keywords:
      "color tools for developers, color picker online, WCAG contrast checker, aspect ratio calculator, markdown to HTML",
  },
  "writing-seo-tools-for-content-creators": {
    title: "Free Writing & SEO Tools for Content Creators",
    description:
      "Free character counter, text case converter, and keyword density checker for writers and SEO content creators. No signup, instant results.",
    keywords:
      "writing tools for content creators, character counter, text case converter, keyword density checker, SEO writing tools",
  },
  "useful-text-utility-tools-guide": {
    title: "Text Utility Tools Online Free — Lorem Ipsum & More",
    description:
      "Free online text tools: Lorem Ipsum generator, number to words converter, text diff checker, and Morse code translator. No signup needed.",
    keywords:
      "text utility tools online, lorem ipsum generator, number to words converter, text diff checker, morse code translator",
  },
  "how-to-rotate-pdf-pages-online-free": {
    title: "Rotate PDF Pages Online Free — Fix Sideways Scans | WorkUtilities",
    description:
      "Rotate PDF pages online free — fix sideways or upside-down scanned pages. Rotate individual pages or the whole document. No signup, no uploads.",
    keywords:
      "rotate pdf online, rotate pdf pages free, fix sideways pdf scan, rotate pdf 90 degrees",
  },
  "how-to-add-page-numbers-to-pdf-free": {
    title: "Add Page Numbers to PDF Online Free — No Signup | WorkUtilities",
    description:
      "Add page numbers to any PDF online free. Choose position, starting number, and format like 'Page 1 of 10'. No signup, nothing uploaded.",
    keywords:
      "add page numbers to pdf, pdf page numbering online free, number pdf pages",
  },
  "how-to-add-watermark-to-pdf-free": {
    title: "Add Watermark to PDF Online Free — Text or Logo | WorkUtilities",
    description:
      "Add a text or image watermark to any PDF online free. Mark documents as Draft, Confidential, or add your logo. Adjustable opacity. No signup.",
    keywords:
      "add watermark to pdf, pdf watermark online free, draft confidential watermark pdf",
  },
  "how-to-create-favicon-online-free": {
    title: "Favicon Generator Online Free — Create Favicon.ico & PNG | WorkUtilities",
    description:
      "Generate a favicon from any image free online. Get favicon.ico plus all standard PNG sizes and ready-to-paste HTML tags. No signup needed.",
    keywords:
      "favicon generator, create favicon online free, favicon.ico generator, apple touch icon generator",
  },
  "calorie-deficit-calculator-guide": {
    title: "Calorie Deficit Calculator Guide — BMR, TDEE & Targets | WorkUtilities",
    description:
      "Free calorie deficit calculator using the Mifflin-St Jeor formula. Calculate your BMR, maintenance calories, and a sustainable daily target.",
    keywords:
      "calorie deficit calculator, tdee calculator, bmr calculator, maintenance calories calculator",
  },
  "how-to-format-sql-online-free": {
    title: "SQL Formatter Online Free — Beautify & Format Queries | WorkUtilities",
    description:
      "Format and beautify SQL queries online free. Auto-indent, capitalize keywords, and make long queries readable. No signup, runs in your browser.",
    keywords:
      "sql formatter online, beautify sql, format sql query free, sql pretty print",
  },
  "how-to-convert-svg-to-png-online": {
    title: "SVG to PNG Converter Online Free — Any Resolution | WorkUtilities",
    description:
      "Convert SVG to PNG online free at any resolution. Choose transparent or solid background. No signup, conversion happens in your browser.",
    keywords:
      "svg to png converter, convert svg to png online free, svg png export",
  },
  "how-to-extract-color-palette-from-image": {
    title: "Color Palette Extractor Online Free — From Any Image | WorkUtilities",
    description:
      "Extract a color palette from any image free online. Get HEX and RGB codes for dominant colors. Great for design, branding, and CSS. No signup.",
    keywords:
      "extract color palette from image, color palette extractor, dominant colors from image",
  },
  "free-text-to-speech-online-guide": {
    title: "Text to Speech Online Free — Convert Text to Audio | WorkUtilities",
    description:
      "Free text to speech converter. Type or paste text and listen instantly with natural voices. No signup, works directly in your browser.",
    keywords:
      "text to speech online free, tts converter, read text aloud online",
  },
  "check-device-browser-info-online": {
    title: "Device & Browser Info Checker Online Free — No Signup | WorkUtilities",
    description:
      "Check your browser, OS, screen resolution, and device details online free. Useful for bug reports and troubleshooting. No signup needed.",
    keywords:
      "check browser and device info online, browser info checker, screen resolution checker",
  },
  "uuid-generator-guide": {
    title: "UUID Generator Guide — What UUIDs Are and When to Use Them | WorkUtilities",
    description:
      "Generate random UUID v4 identifiers online free. Learn what UUIDs are, why they're practically collision-free, and when to use v4 vs other versions.",
    keywords:
      "uuid generator guide, what is a uuid, uuid v4 explained, generate uuid online",
  },
  "gpa-calculator-guide": {
    title: "GPA Calculator Guide — 4.0 Scale and Weighted GPA Explained | WorkUtilities",
    description:
      "Free GPA calculator for US students. Learn the standard 4.0 grade-point mapping, weighted vs unweighted GPA, and a worked example with three courses.",
    keywords:
      "gpa calculator guide, 4.0 scale gpa, weighted gpa explained, how to calculate gpa",
  },
  "days-between-dates-calculator-guide": {
    title: "Days Between Dates Calculator Guide — Count Days Free Online | WorkUtilities",
    description:
      "Calculate the exact number of days between two dates free online. Learn common use cases and which start-date counting convention this tool uses.",
    keywords:
      "days between dates guide, date difference calculator, count days between dates",
  },
  "roman-numeral-converter-guide": {
    title: "Roman Numeral Converter Guide — Symbols, Rules & Modern Uses | WorkUtilities",
    description:
      "Convert numbers to Roman numerals or Roman numerals to numbers free online. Learn symbol values, subtractive notation, and where Roman numerals appear today.",
    keywords:
      "roman numeral converter guide, roman numerals explained, number to roman numeral",
  },
  "leap-year-checker-guide": {
    title: "Leap Year Checker Guide — The Full Rule with Examples | WorkUtilities",
    description:
      "Check if any year is a leap year free online. Learn the divisible-by-4/100/400 rule, why 1900 wasn't a leap year, and why we need leap years at all.",
    keywords:
      "leap year checker guide, leap year rule explained, is 2026 a leap year",
  },
  "us-paycheck-calculator-guide": {
    title: "Paycheck Calculator Guide — Gross vs Net Pay & FICA | WorkUtilities",
    description:
      "Free 2026 paycheck calculator guide. Learn gross vs net pay, what FICA funds, why raises never reduce take-home, and how state tax estimates work.",
    keywords:
      "paycheck calculator, take home pay calculator, salary after tax, 2026 tax brackets",
  },
  "mortgage-calculator-guide": {
    title: "Mortgage Calculator Guide — PITI, PMI & Amortization | WorkUtilities",
    description:
      "Free mortgage calculator guide. Understand PITI, PMI, why early payments are mostly interest, and how extra payments save thousands over a 30-year loan.",
    keywords:
      "mortgage calculator, PITI explained, PMI mortgage, amortization schedule",
  },
  "box-breathing-technique-guide": {
    title: "Box Breathing Timer Online — 4-4-4-4 Guided Exercise | WorkUtilities",
    description:
      "Free box breathing timer with animated guide. Practice the 4-4-4-4 breathing technique to reduce stress instantly. No signup, runs in your browser.",
    keywords:
      "box breathing technique, box breathing timer, 4-4-4-4 breathing, stress relief breathing",
  },
  "cron-expression-generator-guide": {
    title: "Cron Expression Generator Online Free — Visual Builder | WorkUtilities",
    description:
      "Generate and explain cron expressions with a visual builder. See next 5 run times, human-readable description, and common presets. No signup.",
    keywords:
      "cron expression generator, cron builder, crontab generator, cron schedule tool",
  },
  "subnet-calculator-guide": {
    title: "Subnet Calculator Online Free — CIDR IP Range Tool | WorkUtilities",
    description:
      "Free subnet calculator for IPv4 CIDR. Find network address, broadcast, usable hosts, IP range, and subnet mask instantly. No signup needed.",
    keywords:
      "subnet calculator, cidr calculator, ip subnet calculator, network address calculator",
  },
  "svg-code-previewer-guide": {
    title: "SVG Code Previewer Online Free — Live Preview & Editor | WorkUtilities",
    description:
      "Preview SVG code live in your browser. Paste SVG markup and see it render instantly. Download, prettify, and test on different backgrounds. No signup.",
    keywords:
      "svg code previewer, svg live preview, svg editor online, svg viewer",
  },
  "free-online-audio-recorder-guide": {
    title: "Online Audio Recorder Free — Record from Browser | WorkUtilities",
    description:
      "Free online audio recorder. Record from your microphone in the browser, play back, and download instantly. No app download or signup required.",
    keywords:
      "online audio recorder, record audio online free, browser microphone recorder, voice recorder online",
  },
  "loan-eligibility-calculator-guide": {
    title: "Loan Eligibility Calculator India — FOIR Guide | WorkUtilities",
    description:
      "Check home, personal or car loan eligibility free online. Based on Indian FOIR guidelines — see max eligible amount and EMI. No signup required.",
    keywords:
      "loan eligibility calculator India, FOIR calculator, home loan eligibility, personal loan eligibility",
  },
  "css-gradient-generator-guide": {
    title: "CSS Gradient Generator Online Free — Copy Ready CSS | WorkUtilities",
    description:
      "Create CSS gradients visually and copy the code instantly. Linear, radial, and conic gradients with live preview and one-click copy. No signup needed.",
    keywords:
      "CSS gradient generator, linear gradient generator, radial gradient CSS, conic gradient online",
  },
  "unix-timestamp-converter-guide": {
    title: "Unix Timestamp Converter — Epoch to Date Online | WorkUtilities",
    description:
      "Convert Unix timestamps to readable dates and back. See current epoch time live. Auto-detects seconds vs milliseconds instantly. No signup needed.",
    keywords:
      "unix timestamp converter, epoch converter, timestamp to date, date to unix timestamp",
  },
  "how-to-convert-json-to-csv-online-free": {
    title: "JSON to CSV Converter Online Free — No Signup | WorkUtilities",
    description:
      "Convert JSON arrays to CSV online free. Paste JSON data and download a spreadsheet-ready CSV file instantly. No signup, runs in your browser.",
    keywords:
      "JSON to CSV converter, convert JSON to CSV online, JSON array to spreadsheet, export JSON to Excel",
  },
  "how-to-convert-word-to-jpg-online-free": {
    title: "Word to JPG Converter Online Free — DOCX to Image | WorkUtilities",
    description:
      "Convert Word documents to JPG images online free. Upload a DOCX file and download as an image. Share docs without editing access. No signup needed.",
    keywords:
      "convert Word to JPG online, DOCX to JPG, Word document to image, docx to jpeg converter",
  },
  "currency-converter-guide": {
    title: "Currency Converter Online Free — Live Exchange Rates | WorkUtilities",
    description:
      "Convert currencies with live exchange rates from the European Central Bank. Free online currency converter — USD, EUR, GBP, INR and more. No signup.",
    keywords:
      "currency converter, exchange rate calculator, live forex rates, USD to INR converter",
  },
  "crypto-price-tracker-guide": {
    title: "Crypto Price Tracker Online Free — Live Bitcoin Prices | WorkUtilities",
    description:
      "Track live cryptocurrency prices free online. Bitcoin, Ethereum, and top 15 cryptos with 24h change, market cap, and USD converter. No signup.",
    keywords:
      "crypto price tracker, bitcoin price live, cryptocurrency prices, crypto market cap",
  },
  "dns-lookup-tool-guide": {
    title: "DNS Lookup Tool Online Free — Check DNS Records | WorkUtilities",
    description:
      "Look up DNS records for any domain free online. Check A, AAAA, CNAME, MX, TXT, NS records instantly. Powered by Cloudflare DNS. No signup.",
    keywords:
      "DNS lookup tool, check DNS records, MX record lookup, domain DNS checker",
  },
  "ip-address-lookup-guide": {
    title: "IP Address Lookup Online Free — Find Location & ISP | WorkUtilities",
    description:
      "Look up any IP address location, ISP, and timezone online free. See your own IP or check any IP address instantly. No signup needed.",
    keywords:
      "IP address lookup, IP geolocation, find my IP, IP location checker",
  },
  "fd-calculator-guide-india": {
    title: "FD Calculator India — Fixed Deposit Returns Guide",
    description:
      "Calculate FD maturity and interest earned free online. Understand FD rates, TDS, and compounding. Free fixed deposit calculator for Indian banks. No signup.",
    keywords:
      "FD calculator India, fixed deposit calculator, FD maturity calculator, FD interest rate India, TDS on FD",
  },
  "hra-exemption-calculator-guide": {
    title: "HRA Exemption Calculator — How to Claim HRA in India",
    description:
      "Calculate your HRA tax exemption under Section 10(13A) free online. Understand metro vs non-metro rules and how to claim HRA in your ITR. No signup.",
    keywords:
      "HRA exemption calculator, HRA tax exemption India, Section 10(13A), HRA metro cities, claim HRA old regime",
  },
  "discount-calculator-guide": {
    title: "Discount Calculator Online Free — Sale Price & Savings",
    description:
      "Calculate discounted price and total savings instantly. Works for percentage off, sale prices, and multi-item discounts. Free discount calculator. No signup.",
    keywords:
      "discount calculator, sale price calculator, percentage off calculator, stacked discount calculator, shopping discount India",
  },
  "random-number-generator-guide": {
    title: "Random Number Generator Online Free — Any Range",
    description:
      "Generate random numbers in any range free online. Single or multiple picks, no-repeats option. Perfect for giveaways, games, and decisions. No signup.",
    keywords:
      "random number generator, random number picker online, giveaway winner picker, dice roller online, random integer generator",
  },
  "new-labour-code-2026-salary-guide": {
    title: "New Labour Code 2026 Salary Impact — What Changes?",
    description:
      "How India's New Labour Code 2026 affects your take-home salary, PF, and gratuity. The 50% basic salary rule explained with real numbers. Free calculator.",
    keywords:
      "new labour code salary impact India 2026, labour code 2026, 50 percent basic salary rule, take home salary impact",
  },
  "section-44ada-freelancer-tax-guide": {
    title: "Section 44ADA Tax Guide for Freelancers India 2026",
    description:
      "Complete guide to Section 44ADA presumptive taxation for Indian freelancers. ₹75L limit, 50% rule, eligible professions, advance tax, and free calculator.",
    keywords:
      "section 44ADA tax calculator India, 44ADA freelancer tax, presumptive taxation India, ITR-4 Sugam",
  },
  "old-vs-new-tax-regime-comparison-2026": {
    title: "Old vs New Tax Regime India 2026 — Which Is Better?",
    description:
      "Compare old vs new tax regime for FY 2026-27. Side-by-side tax calculation with HRA, 80C, 80D. Find out which regime saves you more money. Free tool.",
    keywords:
      "old vs new tax regime comparison 2026, old vs new tax regime India, which tax regime is better 2026",
  },
  "ppf-calculator-guide-india": {
    title: "PPF Calculator India 2026 — Returns, Interest & Maturity",
    description:
      "Calculate PPF maturity amount, interest, and year-by-year returns at 7.1% rate. Understand 80C benefits, partial withdrawal, loan rules. Free PPF calculator.",
    keywords:
      "PPF calculator India 2026, PPF maturity calculator, PPF interest rate 2026, public provident fund calculator",
  },
  "w2-vs-1099-tax-comparison-guide": {
    title: "W-2 vs 1099 Taxes 2026 — What's the Real Difference?",
    description:
      "W-2 employees split FICA taxes with employers. 1099 contractors pay full 15.3% SE tax. See the complete comparison with 2026 tax rates and real numbers.",
    keywords:
      "w2 vs 1099 tax calculator, 1099 vs w2 taxes, contractor tax comparison, self employment vs w2",
  },
  "self-employment-tax-calculator-guide-usa": {
    title: "Self-Employment Tax 2026 — How to Calculate & Pay Quarterly",
    description:
      "Self-employment tax is 15.3% on 92.35% of net earnings. Calculate your SE tax, income tax, quarterly payments, and the SE tax deduction with 2026 IRS rules.",
    keywords:
      "self employment tax calculator 2026, 1099 tax calculator, SE tax quarterly payments, freelancer tax USA",
  },
  "robots-txt-generator-guide": {
    title: "robots.txt Generator Guide — How to Write & Validate",
    description:
      "Learn how to create a robots.txt file for your website. User-agent rules, allow/disallow syntax, sitemap declaration, and common mistakes. Free generator tool.",
    keywords:
      "robots.txt generator, robots txt syntax, block GPTBot robots.txt, create robots.txt file",
  },
  "capital-gains-tax-calculator-india-guide": {
    title: "Capital Gains Tax India 2026 — STCG, LTCG Rates & Calculator",
    description:
      "Complete guide to STCG and LTCG tax rates in India for FY 2026-27. Equity, property, gold, debt fund taxation explained with Budget 2024 changes. Free calculator.",
    keywords:
      "capital gains tax calculator India 2026, STCG LTCG rates India, equity LTCG tax 2026, property capital gains India",
  },
  "rd-calculator-guide-india": {
    title: "RD Calculator India — How Recurring Deposits Work 2026",
    description:
      "Calculate RD maturity and interest online free. Understand TDS, quarterly compounding, and how RD compares to FD and SIP. Free recurring deposit calculator.",
    keywords:
      "RD calculator India, recurring deposit calculator, RD maturity calculator, RD vs FD",
  },
  "glassmorphism-css-generator-guide": {
    title: "Glassmorphism CSS Generator 2026 — Frosted Glass UI Guide",
    description:
      "Create frosted glass UI effects with CSS backdrop-filter. Learn glassmorphism CSS with live examples, Tailwind classes, Firefox fallback, and performance tips.",
    keywords:
      "glassmorphism CSS generator, frosted glass CSS, backdrop-filter generator, Tailwind glassmorphism",
  },
  "htaccess-generator-guide": {
    title: ".htaccess File Guide 2026 — Redirects, Caching & Security",
    description:
      "Learn how to create an .htaccess file for Apache servers. HTTPS redirects, browser caching, GZIP, custom error pages, and security rules explained.",
    keywords:
      "htaccess generator, htaccess redirect HTTPS, apache htaccess file, htaccess caching gzip",
  },
  "nps-calculator-guide-india": {
    title: "NPS Calculator India — How to Plan Your NPS Retirement",
    description:
      "Complete NPS guide: calculate retirement corpus, monthly pension, and tax savings under Section 80CCD. Compare NPS with PPF and EPF. Free NPS calculator.",
    keywords:
      "NPS calculator India, national pension system calculator, NPS corpus calculator, NPS pension 2026",
  },
  "401k-calculator-guide-usa": {
    title: "401k Calculator 2026 — How Much Will You Have at Retirement?",
    description:
      "Calculate your 401k balance at retirement with 2026 IRS contribution limits. Understand employer match, catch-up contributions, and the power of starting early.",
    keywords:
      "401k calculator 2026, retirement savings calculator, 401k contribution limit 2026, employer match calculator",
  },
  "leave-encashment-calculator-guide-india": {
    title: "Leave Encashment India 2026 — Rules, Tax Exemption & Calculation",
    description:
      "Understand leave encashment rules in India. ₹25 lakh tax exemption at retirement (Budget 2023). Calculate EL encashment and tax impact. Free calculator.",
    keywords:
      "leave encashment calculator India, leave encashment tax exemption, EL encashment calculator, 25 lakh exemption",
  },
  "box-shadow-css-generator-guide": {
    title: "CSS Box Shadow Generator 2026 — Multi-Layer Shadow Guide",
    description:
      "Create CSS box shadows with live preview. Multi-layer shadows, colored glows, inset shadows explained. Copy CSS or Tailwind. Free visual generator.",
    keywords:
      "box shadow CSS generator, CSS box-shadow tool, multi-layer shadow generator, Tailwind shadow",
  },
  "cagr-calculator-guide-india": {
    title: "CAGR Calculator India 2026 — What Is CAGR & How to Use It",
    description:
      "CAGR (Compound Annual Growth Rate) explained simply. Calculate mutual fund returns, compare investments, understand Rule of 72. With real CAGR (inflation-adjusted) concept.",
    keywords:
      "CAGR calculator India, compound annual growth rate, mutual fund CAGR, Rule of 72",
  },
  "sukanya-samriddhi-yojana-calculator-guide": {
    title: "SSY Calculator 2026 — Sukanya Samriddhi Yojana Returns Guide",
    description:
      "Calculate SSY maturity amount at 8.2% interest. Understand deposit rules, partial withdrawal at 18, maturity at 21, and EEE tax benefits. Free SSY calculator.",
    keywords:
      "SSY calculator, Sukanya Samriddhi Yojana calculator, SSY maturity calculator 2026",
  },
  "advance-tax-calculator-guide-india": {
    title: "Advance Tax India FY 2026-27 — Due Dates, Calculation & Penalties",
    description:
      "Everything about advance tax for FY 2026-27. Who must pay, 4 instalment schedule (June/Sep/Dec/March), Section 234B/234C penalties, and 44ADA single-payment rule.",
    keywords:
      "advance tax calculator India 2026, advance tax due dates FY 2026-27, Section 234B 234C",
  },
  "color-palette-generator-guide": {
    title: "Color Palette Generator for Tailwind CSS — Hex to Full Scale",
    description:
      "Generate a complete Tailwind 50-950 color palette from your brand hex color. CSS variables, Tailwind config, and WCAG contrast check. Free developer tool.",
    keywords:
      "color palette generator Tailwind, Tailwind color scale generator, hex to Tailwind palette",
  },
  "professional-tax-calculator-guide-india": {
    title: "Professional Tax India 2026 — State-wise Slabs & Calculator",
    description:
      "Professional tax slabs for all 18 Indian states for FY 2026-27. Maharashtra, Karnataka, Telangana, West Bengal rates with women's exemption and deduction rules.",
    keywords:
      "professional tax calculator India, PT slabs Maharashtra, professional tax Karnataka 2026",
  },
  "pay-stub-generator-guide-usa": {
    title: "Pay Stub Generator 2026 — Free US Paycheck Stub Creator",
    description:
      "Create free US pay stubs online. Download as PDF instantly. Explains gross pay, deductions (FICA, federal tax), and net pay. For freelancers and small businesses.",
    keywords:
      "pay stub generator free online, paycheck stub creator, US pay stub maker 2026",
  },
  "markdown-table-generator-guide": {
    title: "Markdown Table Generator — How to Create Tables in Markdown",
    description:
      "Create Markdown tables easily with a visual editor. Learn Markdown table syntax, alignment, and how to convert CSV data to Markdown format. Free tool.",
    keywords:
      "markdown table generator, CSV to markdown table, markdown table syntax",
  },
  "http-status-codes-guide": {
    title: "HTTP Status Codes Guide 2026 — All Codes Explained",
    description:
      "Every HTTP status code explained: 200 OK, 301 redirect, 404 not found, 401 vs 403, 429 rate limit, 502 bad gateway, 503 unavailable. With developer context.",
    keywords:
      "HTTP status codes, 401 vs 403, 404 not found, 429 rate limit, 502 bad gateway",
  },
  "401k-vs-roth-ira-guide-usa": {
    title: "401k vs Roth IRA 2026 — Which Retirement Account Wins?",
    description:
      "Traditional 401k vs Roth 401k vs Roth IRA explained for 2026. Tax bracket math, 2026 contribution limits, Roth 401k RMD elimination, and when each wins. Free calculator.",
    keywords:
      "401k vs Roth IRA 2026, Traditional vs Roth 401k, Roth IRA income limit 2026",
  },
  "bonus-calculator-guide-india": {
    title: "Bonus Calculator India 2026 — Payment of Bonus Act Explained",
    description:
      "How is salary bonus calculated in India? Payment of Bonus Act 1965 rules, ₹21,000 eligibility limit, ₹7,000 wage ceiling, 8.33% minimum, 20% maximum. Free calculator.",
    keywords:
      "bonus calculator India, Payment of Bonus Act, statutory bonus 8.33%",
  },
  "esi-calculator-guide-india": {
    title: "ESI Calculator India 2026 — ESIC Contribution Rates & Benefits",
    description:
      "Calculate Employee State Insurance (ESI) contributions for FY 2026-27. ₹21,000 wage ceiling, 0.75% employee + 3.25% employer rates, ESI benefits explained. Free.",
    keywords:
      "ESI calculator India, ESIC contribution calculator 2026, employee state insurance",
  },
  "swp-calculator-guide-india": {
    title: "SWP Calculator India 2026 — Systematic Withdrawal Plan Guide",
    description:
      "How does SWP work? Calculate corpus needed for ₹25,000/month retirement income. Compare SWP vs FD interest. LTCG tax on SWP explained. Free calculator.",
    keywords:
      "SWP calculator India, systematic withdrawal plan calculator, retirement corpus calculator",
  },
  "dividend-yield-calculator-guide-india": {
    title: "Dividend Yield Calculator India 2026 — How to Calculate Stock Returns",
    description:
      "What is dividend yield? Calculate current yield, yield on cost, TDS impact, and compare dividend income vs FD returns. India stock market guide. Free calculator.",
    keywords:
      "dividend yield calculator India, yield on cost calculator, dividend income TDS India",
  },
  "freelancer-gst-registration-guide-india": {
    title: "GST Registration for Freelancers India 2026 — Do You Need It?",
    description:
      "When do Indian freelancers need GST registration? ₹20L threshold for services, ₹10L for NE states, mandatory for inter-state supply. Complete guide with free threshold checker.",
    keywords:
      "GST registration threshold freelancer India, GST registration for freelancers, GST 20 lakh limit",
  },
  "hsa-calculator-guide-usa": {
    title: "HSA Calculator 2026 — Limits, Tax Savings & Growth Guide",
    description:
      "2026 HSA contribution limits: $4,300 individual, $8,550 family. Calculate your triple tax savings, HDHP requirements, and 20-year HSA growth projection. Free tool.",
    keywords:
      "HSA calculator 2026, health savings account calculator, HSA contribution limits 2026",
  },
  "json-schema-validator-guide": {
    title: "JSON Schema Validator — How to Validate JSON in 2026",
    description:
      "Validate JSON data against a JSON Schema. Understand Draft 7 vs 2020-12, required fields, type checking, and format validation. Free browser-based JSON Schema validator.",
    keywords:
      "JSON Schema validator online, validate JSON against schema, JSON Schema Draft 7",
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
    case "Developer Tools":
      return "bg-tool-image/10 text-tool-image";
    case "Productivity":
      return "bg-tool-convert/10 text-tool-convert";
    case "PDF & Documents":
      return "bg-tool-convert/10 text-tool-convert";
    case "Students & Utilities":
      return "bg-tool-photo/10 text-tool-photo";
    case "Complete Guide":
      return "bg-brand-blue/10 text-brand-blue";
  }
}

export function getBlogPostsForListing(): BlogPost[] {
  const featured = blogPosts.filter((post) => post.featured);
  const regular = blogPosts.filter((post) => !post.featured);
  return [...featured, ...regular];
}
