export type BlogCategory =
  | "PDF"
  | "Images"
  | "Photo"
  | "Finance"
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
      "Learn how to create strong passwords for bank accounts, email, and social media. Free password generator tool included.",
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
      "Learn how to create strong passwords for bank accounts, email, and social media. Free password generator tool included.",
    keywords:
      "strong password guide india, create secure password, password generator free, net banking password tips",
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
