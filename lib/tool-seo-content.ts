export type ToolSeoSlug =
  | "pdf-compress"
  | "image-compress"
  | "image-converter"
  | "photo-resizer"
  | "pdf-to-word"
  | "word-to-pdf"
  | "image-to-pdf"
  | "pdf-to-jpg"
  | "bg-remove"
  | "pdf-merge"
  | "pdf-split"
  | "pdf-unlock"
  | "pdf-rotate"
  | "pdf-page-numbers"
  | "pdf-watermark"
  | "qr-code-generator"
  | "word-counter"
  | "age-calculator"
  | "emi-calculator"
  | "gst-calculator"
  | "salary-hike-calculator"
  | "cgpa-to-percentage"
  | "ctc-calculator"
  | "fd-calculator"
  | "sip-calculator"
  | "notice-period-calculator"
  | "percentage-calculator"
  | "password-generator"
  | "unit-converter"
  | "income-tax-calculator"
  | "signature-maker"
  | "rent-receipt-generator"
  | "heic-to-jpg"
  | "webp-to-jpg"
  | "excel-to-pdf"
  | "ppt-to-pdf"
  | "json-formatter"
  | "favicon-generator"
  | "color-picker"
  | "markdown-to-html"
  | "base64"
  | "url-encoder"
  | "text-case-converter"
  | "lorem-ipsum"
  | "aspect-ratio"
  | "random-number"
  | "tip-calculator"
  | "discount-calculator"
  | "binary-converter"
  | "hash-generator"
  | "number-to-words"
  | "pomodoro-timer"
  | "stopwatch"
  | "csv-to-json"
  | "text-diff"
  | "hra-calculator"
  | "character-counter"
  | "bmi-calculator"
  | "calorie-deficit-calculator"
  | "compound-interest"
  | "timezone-converter"
  | "regex-tester"
  | "html-entity"
  | "color-contrast"
  | "jwt-decoder"
  | "epf-calculator"
  | "gratuity-calculator"
  | "lta-calculator"
  | "hourly-to-salary"
  | "keyword-density"
  | "morse-code"
  | "xml-formatter"
  | "inflation-calculator"
  | "sql-formatter"
  | "svg-to-png"
  | "color-palette-extractor"
  | "text-to-speech"
  | "device-info"
  | "uuid-generator"
  | "gpa-calculator"
  | "days-between-dates"
  | "roman-numeral-converter"
  | "leap-year-checker"
  | "paycheck-calculator"
  | "mortgage-calculator"
  | "box-breathing"
  | "cron-generator"
  | "subnet-calculator"
  | "svg-previewer"
  | "audio-recorder"
  | "loan-eligibility"
  | "css-gradient"
  | "timestamp-converter"
  | "json-to-csv"
  | "word-to-jpg"
  | "currency-converter"
  | "crypto-tracker"
  | "dns-lookup"
  | "ip-lookup"
  | "labour-code-calculator"
  | "freelancer-tax-calculator"
  | "tax-regime-comparison"
  | "ppf-calculator"
  | "w2-vs-1099-calculator"
  | "self-employment-tax"
  | "robots-txt-generator"
  | "capital-gains-calculator"
  | "rd-calculator"
  | "glassmorphism-generator"
  | "htaccess-generator";

type ToolSeoEntry = {
  aboutTitle: string;
  aboutParagraphs: string[];
  whenToUseTitle: string;
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  blogGuide?: { href: string; title: string };
};

const TOOL_SEO_CONTENT: Record<ToolSeoSlug, ToolSeoEntry> = {
  "pdf-compress": {
    aboutTitle: "About PDF Compress Tool",
    aboutParagraphs: [
      "Our free PDF Compress tool reduces file size while keeping documents readable and professional. Whether you need a lighter attachment for email or a PDF that meets a strict upload limit, you can shrink your file in seconds without installing software.",
      "Everything runs entirely in your browser — your PDF is never uploaded to a server. Compression happens on your device using client-side processing, which means your files stay 100% private. No account, no waiting in a queue, and no risk of sensitive documents being stored on third-party servers.",
      "This tool is built for everyday Indian users: students submitting assignments, employees emailing reports, job seekers sending resumes, and anyone filling government forms with tight size limits. It works especially well for NSDL and UTI PAN applications, college admission portals, UPSC and SSC form uploads, and email attachments that must stay under 1MB or 2MB.",
    ],
    whenToUseTitle: "When Should You Compress a PDF?",
    useCases: [
      {
        title: "Email attachment too large",
        description:
          "Gmail allows up to 25MB, but many corporate mail servers cap attachments at 10MB or less.",
      },
      {
        title: "College or university portal limits",
        description:
          "Admission and assignment portals often reject PDFs above 1MB or 2MB.",
      },
      {
        title: "Government portal rejections",
        description:
          "UPSC, SSC, and state PSC portals frequently block oversized PDF uploads.",
      },
      {
        title: "WhatsApp PDF sharing",
        description:
          "Compress before sharing to stay well under WhatsApp's 100MB document limit.",
      },
      {
        title: "Job portal uploads",
        description:
          "Naukri, LinkedIn, and Internshala work best with lightweight resume PDFs.",
      },
    ],
    faqs: [
      {
        question: "How do I compress a PDF file size?",
        answer:
          "Upload your PDF to our free tool, choose compression level, and download the compressed file instantly. No signup required.",
      },
      {
        question: "Will compressing a PDF reduce its quality?",
        answer:
          "Text quality is preserved. Images may compress slightly but remain readable for most documents.",
      },
      {
        question: "Is there a file size limit for PDF compression?",
        answer:
          "No strict limit. Works best for PDFs under 100MB for fastest processing.",
      },
      {
        question: "Is my PDF safe when I compress it online?",
        answer:
          "Yes. Our tool works entirely in your browser. Your file is never uploaded to any server.",
      },
      {
        question: "How to compress PDF under 1MB for email?",
        answer:
          "Move the compression slider toward 10–25% for smaller files. Most scanned PDFs compress well under 1MB at higher reduction levels.",
      },
      {
        question: "How to compress PDF for government portals in India?",
        answer:
          "Use the Portal Upload preset (15%) or slide toward max reduction. Most government portals accept PDFs under 1MB or 2MB.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-compress-pdf-online-free",
      title: "How to compress PDF online free — without losing quality",
    },
  },
  "image-compress": {
    aboutTitle: "About Image Compress Tool",
    aboutParagraphs: [
      "Our free Image Compress tool reduces photo and image file size while keeping visuals sharp enough for everyday use. Upload JPG, PNG, or WebP files and download a lighter version in seconds — perfect when a portal rejects your upload or an email bounces because the attachment is too large.",
      "Compression runs entirely in your browser. Your images are never uploaded to any server, so personal photos, ID scans, and work documents stay private on your device. No signup, no watermarks, and no waiting for cloud processing.",
      "Built for students, job seekers, freelancers, and anyone in India dealing with strict upload limits. Use it before attaching photos to college forms, Naukri or LinkedIn profiles, WhatsApp chats, or government portals that cap files at 50KB, 100KB, or 1MB. Whether you are sharing a screenshot, a passport scan, or a product photo, this tool helps you meet size requirements without installing heavy desktop software.",
    ],
    whenToUseTitle: "When Should You Use Image Compress?",
    useCases: [
      {
        title: "Email attachments",
        description:
          "Shrink large photos before sending assignments, invoices, or reports so they pass corporate email size limits.",
      },
      {
        title: "WhatsApp sharing",
        description:
          "Compress images before sending in chats or groups to upload faster and save mobile data.",
      },
      {
        title: "Website uploads",
        description:
          "Reduce image weight for blogs, portfolios, or CMS uploads without visible quality loss.",
      },
      {
        title: "Naukri or LinkedIn profile photo",
        description:
          "Meet job portal file-size caps while keeping your profile picture clear and professional.",
      },
      {
        title: "College form uploads",
        description:
          "Fit admission and assignment portals that reject oversized JPG or PNG uploads.",
      },
    ],
    faqs: [
      {
        question: "How to compress image without losing quality?",
        answer:
          "Start with Medium compression for a good balance. Text-heavy screenshots and simple graphics compress well with minimal visible change. Adjust the level and compare before/after previews before downloading.",
      },
      {
        question: "What is the best image size for WhatsApp?",
        answer:
          "WhatsApp accepts large files, but photos under 1–2MB upload faster and look sharp on mobile. Compress high-resolution camera photos before sharing.",
      },
      {
        question: "How to reduce image size under 100KB?",
        answer:
          "Use a higher compression level and resize large dimensions first if needed. Simple ID scans and passport-style photos often reach under 100KB easily.",
      },
      {
        question: "Is my image safe when compressed online?",
        answer:
          "Yes. WorkUtilities processes images entirely in your browser. Your file never leaves your device or gets stored on our servers.",
      },
      {
        question: "How to compress image for government portal India?",
        answer:
          "Check the portal’s KB or MB limit, then compress until the file fits. Most Indian government forms accept JPG under 50KB–200KB — our tool helps you hit those targets quickly.",
      },
    ],
    blogGuide: {
      href: "/blog/reduce-image-size-without-losing-quality",
      title: "How to reduce image size without losing quality — 5 methods that work",
    },
  },
  "photo-resizer": {
    aboutTitle: "About Photo Resizer Tool",
    aboutParagraphs: [
      "Our free Photo Resizer lets you crop and resize images to exact pixel dimensions and file sizes required by online forms. Set width and height in pixels or centimetres, choose presets for common Indian documents, and download a ready-to-upload photo in seconds.",
      "Everything happens client-side in your browser — your photo is never sent to a server. That means Aadhaar scans, PAN photos, passport pictures, and job application headshots stay completely private on your device.",
      "Designed for everyday Indian use cases: Aadhaar enrolment and updates, NSDL/UTI PAN applications, passport and visa photos, college admission forms, and profile pictures on Naukri or government exam portals. Built-in presets match common requirements so you do not have to guess dimensions or hunt for Photoshop alternatives on mobile.",
    ],
    whenToUseTitle: "When Should You Use Photo Resizer?",
    useCases: [
      {
        title: "Aadhaar upload",
        description:
          "Resize to the exact dimensions and KB limit UIDAI portals expect for photo updates.",
      },
      {
        title: "PAN card application",
        description:
          "Fit NSDL or UTIITSL photo specs for new PAN or correction requests.",
      },
      {
        title: "Passport photo",
        description:
          "Create 35×45 mm or 2×2 inch passport-size images with correct aspect ratio.",
      },
      {
        title: "Job portal profile",
        description:
          "Resize headshots for Naukri, LinkedIn, Internshala, and company career pages.",
      },
      {
        title: "College admission form",
        description:
          "Match university portal photo dimensions and maximum file size limits.",
      },
    ],
    faqs: [
      {
        question: "How to resize photo for Aadhaar card online?",
        answer:
          "Upload your photo, select the Aadhaar preset or enter required dimensions, crop to fit, and download. Compress if the portal has a KB limit.",
      },
      {
        question: "What is the photo size for PAN card application?",
        answer:
          "PAN applications typically need a recent colour photo around 3.5×2.5 cm with a plain light background. Use our PAN preset and verify the latest NSDL/UTI guidelines.",
      },
      {
        question: "How to resize image to specific KB?",
        answer:
          "Set your target dimensions first, then use compression options to bring the file under the required KB limit shown on the form.",
      },
      {
        question: "What size photo is needed for government exams?",
        answer:
          "UPSC, SSC, and state PSC exams usually specify pixel dimensions and file size on the notification. Match those exact values using custom width/height fields.",
      },
      {
        question: "How to make passport size photo at home free?",
        answer:
          "Take a well-lit photo against a plain wall, upload it here, crop with the passport preset, and download — no studio visit required.",
      },
    ],
    blogGuide: {
      href: "/blog/aadhaar-card-photo-size",
      title: "Aadhaar card photo requirements — why photos get rejected",
    },
  },
  "pdf-to-word": {
    aboutTitle: "About PDF to Word Tool",
    aboutParagraphs: [
      "Our free PDF to Word converter turns PDF documents into editable Word files you can open in Microsoft Word, Google Docs, or LibreOffice. Extract text, update content, and reformat documents without retyping everything from scratch.",
      "Conversion runs in your browser using client-side processing. Your PDF is not uploaded to external servers, keeping resumes, contracts, and confidential reports private on your device.",
      "Ideal for students editing scanned notes, employees updating old reports, job seekers refreshing resumes, and anyone who received a PDF form they need to modify. Common in India for updating government forms, editing office documents shared as PDFs, and converting scanned certificates or mark sheets into editable text.",
    ],
    whenToUseTitle: "When Should You Use PDF to Word?",
    useCases: [
      {
        title: "Editing scanned documents",
        description:
          "Convert scanned PDFs to Word so you can fix typos, add sections, or reformat content.",
      },
      {
        title: "Updating old resumes",
        description:
          "Turn a PDF resume into an editable DOCX to refresh skills, dates, or formatting.",
      },
      {
        title: "Extracting text from PDFs",
        description:
          "Pull readable text from reports, articles, or ebooks for quoting or reuse.",
      },
      {
        title: "Modifying government forms",
        description:
          "Edit PDF forms that were shared as flat files when you need to change details.",
      },
      {
        title: "Editing office reports",
        description:
          "Convert colleague-shared PDF reports into Word for comments, track changes, or updates.",
      },
    ],
    faqs: [
      {
        question: "How to convert PDF to Word without losing formatting?",
        answer:
          "Simple text-based PDFs convert cleanly. Complex layouts with columns or tables may need minor cleanup in Word after conversion.",
      },
      {
        question: "Is PDF to Word conversion free?",
        answer:
          "Yes. WorkUtilities offers free PDF to Word conversion with no signup or daily limits for personal use.",
      },
      {
        question: "Can I edit a PDF after converting to Word?",
        answer:
          "You edit the Word file, not the original PDF. Save your changes as DOCX or export back to PDF when finished.",
      },
      {
        question: "How to convert scanned PDF to Word?",
        answer:
          "Upload the scanned PDF — our tool extracts text where possible. Very low-quality scans may need manual correction after conversion.",
      },
      {
        question: "Is my PDF safe during conversion?",
        answer:
          "Yes. Processing happens entirely in your browser. Your document is never uploaded to our servers.",
      },
    ],
    blogGuide: {
      href: "/blog/convert-pdf-to-word-free",
      title: "How to convert PDF to Word free — without losing formatting",
    },
  },
  "word-to-pdf": {
    aboutTitle: "About Word to PDF Tool",
    aboutParagraphs: [
      "Our free Word to PDF converter turns DOC and DOCX files into polished PDF documents that look the same on every device. Share reports, applications, and assignments without worrying about broken fonts or shifted layouts.",
      "Conversion is client-side — your Word file stays on your device and is never uploaded to a server. That makes it safe for resumes, offer letters, and confidential business documents.",
      "Perfect for Indian professionals sending job applications, students submitting college assignments, and anyone uploading documents to government portals that only accept PDF. PDF preserves formatting when reviewers open files on mobile, Windows, or Mac — a must for Naukri uploads, email attachments, and official submissions.",
    ],
    whenToUseTitle: "When Should You Use Word to PDF?",
    useCases: [
      {
        title: "Sending professional documents",
        description:
          "Share contracts, proposals, and letters that must look identical for every recipient.",
      },
      {
        title: "Job applications",
        description:
          "Submit resumes and cover letters as PDF on Naukri, LinkedIn, or company portals.",
      },
      {
        title: "College submissions",
        description:
          "Convert assignments and project reports to PDF before uploading to LMS portals.",
      },
      {
        title: "Government portals",
        description:
          "Meet PDF-only upload requirements for forms, affidavits, and supporting documents.",
      },
      {
        title: "Preserving formatting",
        description:
          "Lock fonts, spacing, and layout so reviewers see exactly what you designed.",
      },
    ],
    faqs: [
      {
        question: "How to convert Word to PDF free online?",
        answer:
          "Upload your DOC or DOCX file, click convert, and download the PDF instantly. No account required.",
      },
      {
        question: "Why should I convert Word to PDF?",
        answer:
          "PDF prevents accidental edits and keeps formatting consistent across devices, which recruiters and portals prefer.",
      },
      {
        question: "Does Word to PDF preserve formatting?",
        answer:
          "Yes for most standard documents. Complex Word features like advanced macros may not carry over, but typical resumes and reports convert faithfully.",
      },
      {
        question: "How to convert Word to PDF on mobile?",
        answer:
          "Open this page in your phone browser, upload the file from your files app, and download the PDF — no app install needed.",
      },
      {
        question: "Is there a file size limit for Word to PDF?",
        answer:
          "Large documents work best under typical browser memory limits. Very heavy files with many images may take longer but usually convert fine.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-word-to-pdf-free",
      title: "How to convert Word to PDF free online — no software needed",
    },
  },
  "image-to-pdf": {
    aboutTitle: "About Image to PDF Tool",
    aboutParagraphs: [
      "Our free Image to PDF tool converts JPG, PNG, and other photos into a single PDF document. Combine multiple images into one file, arrange page order, and download a print-ready PDF in seconds.",
      "All processing happens in your browser — images never leave your device. That privacy matters when converting Aadhaar scans, bank statements photographed on your phone, or personal ID proofs for online applications.",
      "Built for Indian users who need to submit photo scans as PDFs: Aadhaar and PAN uploads, college document bundles, multi-page ID proof submissions, and phone-camera document scans. No scanner required — snap photos, merge them into one PDF, and upload directly to portals that reject raw image files.",
    ],
    whenToUseTitle: "When Should You Use Image to PDF?",
    useCases: [
      {
        title: "Combining multiple photos",
        description:
          "Merge several JPG or PNG files into one PDF for a single portal upload.",
      },
      {
        title: "Scanning documents with phone",
        description:
          "Photograph pages and convert them into a clean PDF without a physical scanner.",
      },
      {
        title: "Creating photo albums",
        description:
          "Turn a set of images into a shareable PDF album for family or portfolio use.",
      },
      {
        title: "Submitting ID proofs",
        description:
          "Package front and back ID scans into one PDF for KYC or verification forms.",
      },
      {
        title: "Aadhaar or PAN submission",
        description:
          "Convert card photos to PDF when government or bank portals require PDF format.",
      },
    ],
    faqs: [
      {
        question: "How to convert image to PDF free?",
        answer:
          "Upload one or more images, arrange them if needed, and click convert to download your PDF instantly.",
      },
      {
        question: "Can I combine multiple images into one PDF?",
        answer:
          "Yes. Add multiple images and they become separate pages in a single PDF file.",
      },
      {
        question: "How to convert phone camera photo to PDF?",
        answer:
          "Open this tool on your mobile browser, upload photos from your gallery, and download the PDF.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "Common formats like JPG, PNG, and WebP are supported. Upload the format your camera or scanner produces.",
      },
      {
        question: "How to convert Aadhaar card photo to PDF?",
        answer:
          "Photograph or upload your Aadhaar scan, convert to PDF, and verify the file size meets the portal limit before submitting.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-combine-images-into-pdf-india",
      title: "How to combine multiple images into one PDF — free online guide India",
    },
  },
  "bg-remove": {
    aboutTitle: "About Background Remover Tool",
    aboutParagraphs: [
      "Our free Background Remover instantly cuts out subjects from photos and delivers clean transparent PNGs. Perfect for passport photos, product listings, and professional headshots.",
      "Processing runs entirely in your browser using AI — your photos are never uploaded to any server. Personal ID photos, product shots, and profile pictures stay private on your device.",
      "Designed for Indian sellers on Meesho, Amazon, and Flipkart who need clean product images, job seekers updating LinkedIn photos, and anyone preparing passport or visa application pictures with plain white backgrounds. Also useful for Aadhaar-style ID photos and removing distracting home or office backgrounds from official submissions.",
    ],
    whenToUseTitle: "When Should You Use Background Remover?",
    useCases: [
      {
        title: "Product photos for Meesho or Amazon",
        description:
          "Create clean white-background product images that meet marketplace listing guidelines.",
      },
      {
        title: "Passport or visa photos",
        description:
          "Replace busy backgrounds with plain white for passport and visa photo requirements.",
      },
      {
        title: "LinkedIn profile",
        description:
          "Remove distracting backgrounds for a polished professional headshot.",
      },
      {
        title: "ID card photos",
        description:
          "Prepare employee, student, or membership ID photos with uniform backgrounds.",
      },
      {
        title: "Removing cluttered backgrounds",
        description:
          "Clean up casual photos taken at home before using them for official purposes.",
      },
    ],
    faqs: [
      {
        question: "How to remove background from photo free?",
        answer:
          "Upload your image, wait for automatic background detection, choose white or transparent output, and download.",
      },
      {
        question: "How to make white background for passport photo?",
        answer:
          "Upload a well-lit photo, remove the background, and export with a white background. Crop to passport dimensions separately if needed.",
      },
      {
        question: "Can I remove background from Aadhaar photo?",
        answer:
          "You can process any photo, but follow UIDAI guidelines — do not alter official Aadhaar documents unless the portal allows edited photos.",
      },
      {
        question: "Is background remover safe to use online?",
        answer:
          "Yes. WorkUtilities runs background removal entirely in your browser. Images are never uploaded to our servers.",
      },
      {
        question: "How to remove background for product photos India?",
        answer:
          "Upload product shots, remove the background, and download white-background PNGs ready for Meesho, Amazon, or your own store.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-remove-background-from-photo-free",
      title: "How to remove background from a photo free",
    },
  },
  "pdf-merge": {
    aboutTitle: "About PDF Merge Tool",
    aboutParagraphs: [
      "Our free PDF Merge tool combines multiple PDF files into one document in the order you choose. Join salary slips, certificates, bank statements, and report sections without expensive desktop software.",
      "Merging happens entirely in your browser — files are never uploaded to a server. Sensitive financial documents, exam certificates, and work reports stay on your device throughout the process.",
      "Popular with Indian employees combining monthly salary slips for loan applications, students bundling mark sheets and certificates for admissions, and professionals creating single PDFs from scattered report pages. Upload from phone or laptop, drag to reorder, and download one merged file ready for email or portal upload.",
    ],
    whenToUseTitle: "When Should You Use PDF Merge?",
    useCases: [
      {
        title: "Combining salary slips",
        description:
          "Merge 3–6 months of payslips into one PDF for home loan or credit card applications.",
      },
      {
        title: "Merging multiple certificates",
        description:
          "Bundle degree, internship, and course certificates for job or admission submissions.",
      },
      {
        title: "Combining bank statements",
        description:
          "Join separate statement PDFs from your bank into one file for visa or loan processing.",
      },
      {
        title: "Creating project reports",
        description:
          "Combine cover page, chapters, and appendices into a single submission PDF.",
      },
      {
        title: "Combining admit cards",
        description:
          "Merge exam admit cards with instructions or ID proofs for a complete download package.",
      },
    ],
    faqs: [
      {
        question: "How to merge PDF files free online?",
        answer:
          "Upload two or more PDFs, arrange the order, click merge, and download the combined file instantly.",
      },
      {
        question: "Can I merge more than 2 PDFs?",
        answer:
          "Yes. Add as many PDF files as you need and reorder them before merging.",
      },
      {
        question: "How to combine salary slips into one PDF?",
        answer:
          "Upload each month’s payslip PDF, put them in chronological order, merge, and download for your loan or HR submission.",
      },
      {
        question: "Does merging PDFs reduce quality?",
        answer:
          "No. Merging combines pages without recompressing content, so text and images stay at original quality.",
      },
      {
        question: "How to merge PDF on mobile?",
        answer:
          "Open this page in your mobile browser, select PDFs from your files, merge, and save the result.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-merge-pdf-files-free",
      title: "How to merge PDF files free online — combine multiple PDFs in seconds",
    },
  },
  "pdf-split": {
    aboutTitle: "About PDF Split Tool",
    aboutParagraphs: [
      "Our free PDF Split tool extracts individual pages or ranges from a PDF document. Pull out one page from a mark sheet, separate bank statement months, or save just your admit card without downloading the entire file.",
      "Splitting runs client-side in your browser — your PDF never leaves your device. That privacy is essential for financial statements, exam documents, and confidential work files.",
      "Built for Indian students extracting a single page from full mark sheets, employees splitting large annual reports, and anyone who needs one page from a multi-page PDF for upload to a portal with strict file limits. No account required — upload, select pages, and download instantly.",
    ],
    whenToUseTitle: "When Should You Use PDF Split?",
    useCases: [
      {
        title: "Extracting one page from marksheet",
        description:
          "Save only the semester or year you need instead of uploading the full document.",
      },
      {
        title: "Splitting large reports",
        description:
          "Separate chapters or sections from lengthy PDF reports for focused sharing.",
      },
      {
        title: "Extracting admit card page",
        description:
          "Pull just the admit card page from a combined exam notification PDF.",
      },
      {
        title: "Separating bank statement pages",
        description:
          "Split multi-month statement PDFs into individual months for separate uploads.",
      },
      {
        title: "Sharing specific pages only",
        description:
          "Send one relevant page instead of an entire confidential document.",
      },
    ],
    faqs: [
      {
        question: "How to split a PDF file free online?",
        answer:
          "Upload your PDF, choose pages or ranges to extract, and download the split files instantly.",
      },
      {
        question: "How to extract one page from a PDF?",
        answer:
          "Select the single page number you need and download it as a separate PDF file.",
      },
      {
        question: "Can I split PDF on mobile?",
        answer:
          "Yes. Use your phone browser to upload a PDF, pick pages, and download the result.",
      },
      {
        question: "How to separate pages from a PDF?",
        answer:
          "Use page range selection to extract consecutive pages or individual pages into new PDF files.",
      },
      {
        question: "Is there a limit on PDF size for splitting?",
        answer:
          "Very large PDFs may take longer in the browser but generally work. Stay under typical file limits for fastest performance.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-split-pdf-pages-online-free-2026",
      title: "How to split PDF pages online free",
    },
  },
  "pdf-unlock": {
    aboutTitle: "About Remove PDF Password Tool",
    aboutParagraphs: [
      "Our free Remove PDF Password tool unlocks password-protected PDF files when you know the correct password. Open bank statements, salary slips, and archived documents, then save an unprotected copy for printing or further editing.",
      "Unlocking happens entirely in your browser — your PDF and password are never sent to a server. Financial documents and personal records stay private on your device during the process.",
      "Commonly used in India to open password-protected bank statement PDFs from HDFC, SBI, and other banks, unlock salary slip PDFs from employers, remove print restrictions from old documents, and access archived files you have the password for. You must know the correct password — this tool cannot crack unknown passwords.",
    ],
    whenToUseTitle: "When Should You Use Remove PDF Password?",
    useCases: [
      {
        title: "Opening bank statement PDFs",
        description:
          "Remove password protection from downloaded e-statements when you know the password.",
      },
      {
        title: "Unlocking salary slip PDFs",
        description:
          "Save unprotected copies of employer payslips for loan or visa applications.",
      },
      {
        title: "Accessing old locked documents",
        description:
          "Open archived PDFs you encrypted years ago when you still have the password.",
      },
      {
        title: "Removing protection for printing",
        description:
          "Create a copy you can print freely when the original blocks printing.",
      },
      {
        title: "Preparing files for merging",
        description:
          "Unlock PDFs before combining them with other documents in a merge tool.",
      },
    ],
    faqs: [
      {
        question: "How to remove password from PDF free?",
        answer:
          "Upload the protected PDF, enter the correct password, and download the unlocked version.",
      },
      {
        question: "How to open a password protected PDF?",
        answer:
          "You need the original password. Enter it in our tool to unlock and save an open copy.",
      },
      {
        question: "How to unlock bank statement PDF India?",
        answer:
          "Use the password printed on your bank’s statement email or net banking instructions, then unlock here and save.",
      },
      {
        question: "Is it safe to remove PDF password online?",
        answer:
          "Yes with WorkUtilities — processing is client-side only. Your file and password never leave your browser.",
      },
      {
        question: "What if I forgot my PDF password?",
        answer:
          "This tool requires the correct password. If forgotten, contact the document sender or bank — we cannot recover lost passwords.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-unlock-password-protected-pdf",
      title: "How to open a password protected PDF free — unlock PDF online",
    },
  },
  "qr-code-generator": {
    aboutTitle: "About QR Code Generator Tool",
    aboutParagraphs: [
      "Our free QR Code Generator creates scannable QR codes for URLs, text, WiFi, contact cards, UPI payments, and WhatsApp links. Customize colours and size, then download as PNG for print or digital use.",
      "Generation runs in your browser — no data is sent to external servers. Your business links, payment details, and contact information stay private while you design codes locally.",
      "Perfect for Indian shop owners adding UPI payment QR codes at counters, restaurants printing table menu codes, freelancers sharing WhatsApp contact links on business cards, and small businesses creating marketing QR codes for flyers and packaging. Download high-quality PNG files ready for print shops or social media.",
    ],
    whenToUseTitle: "When Should You Use QR Code Generator?",
    useCases: [
      {
        title: "Business cards",
        description:
          "Add a QR code linking to your website, portfolio, or contact page on printed cards.",
      },
      {
        title: "Shop menus",
        description:
          "Let customers scan a code to view your full menu on their phone.",
      },
      {
        title: "UPI payment QR",
        description:
          "Create payment QR codes for Google Pay, PhonePe, Paytm, or any UPI ID.",
      },
      {
        title: "WhatsApp link QR",
        description:
          "Generate a code that opens a WhatsApp chat with your business number.",
      },
      {
        title: "Restaurant table QR codes",
        description:
          "Place scannable codes on tables for contactless menu and ordering links.",
      },
    ],
    faqs: [
      {
        question: "How to create QR code free online?",
        answer:
          "Enter your URL, text, or payment details, customize if needed, and download the PNG instantly.",
      },
      {
        question: "How to make WhatsApp QR code?",
        answer:
          "Use the WhatsApp option, enter your phone number with country code, and download the QR code.",
      },
      {
        question: "Can I create QR code for UPI payment?",
        answer:
          "Yes. Enter your UPI ID or payment link to generate a scannable code for in-store payments.",
      },
      {
        question: "How to download QR code as PNG?",
        answer:
          "Click download after generating — the PNG is ready for print, stickers, or digital sharing.",
      },
      {
        question: "Do QR codes expire?",
        answer:
          "Static QR codes do not expire. They work as long as the linked URL, UPI ID, or phone number remains valid.",
      },
    ],
    blogGuide: {
      href: "/blog/qr-code-for-small-business-india",
      title: "How to create QR code for your business in India — free guide",
    },
  },
  "word-counter": {
    aboutTitle: "About Word Counter Tool",
    aboutParagraphs: [
      "Our free Word Counter instantly counts words, characters (with and without spaces), sentences, paragraphs, and lines in any text you paste or type. See reading time, speaking time, keyword density, and social media platform limits update in real time.",
      "Everything runs in your browser — your text is never uploaded to a server. Draft essays, cover letters, and confidential notes stay private on your device while you check counts instantly.",
      "Essential for students hitting essay word limits, content writers tracking SEO article length, social media managers checking Twitter/X and LinkedIn character limits, and professionals keeping emails concise. Paste from Word, Google Docs, or any editor without installing apps.",
    ],
    whenToUseTitle: "When Should You Use Word Counter?",
    useCases: [
      {
        title: "Checking essay word count",
        description:
          "Verify UPSC, SSC, or college essay length before submission deadlines.",
      },
      {
        title: "Social media character limits",
        description:
          "Check progress against Twitter/X, LinkedIn, Instagram, and Meta description limits.",
      },
      {
        title: "Content writing & SEO",
        description:
          "Track article length and top keyword density while drafting blog posts.",
      },
      {
        title: "Presentation timing",
        description:
          "Estimate speaking time at 130 words per minute for speeches and scripts.",
      },
      {
        title: "Email and report length",
        description:
          "Keep professional writing concise with live word and character counts.",
      },
    ],
    faqs: [
      {
        question: "How accurate is the word count?",
        answer:
          "The tool counts whitespace-separated tokens the same way Microsoft Word and Google Docs do — dates with slashes and currency amounts with symbols count as one word each.",
      },
      {
        question: "What counts as a sentence?",
        answer:
          "The tool splits on terminal punctuation (period, question mark, exclamation mark) — a paragraph with no punctuation reads as a single sentence.",
      },
      {
        question: "What are stop words in keyword density?",
        answer:
          'Common words like "the", "a", "is", "in" are excluded from keyword density analysis since they appear in almost every text and don\'t reflect the actual topics covered.',
      },
      {
        question: "Why do reading time and speaking time differ?",
        answer:
          "Reading speed averages around 200 words per minute silently; speaking aloud is slower at around 130 words per minute — so a 1,000-word piece takes about 5 minutes to read but nearly 8 minutes to speak.",
      },
      {
        question: "Is word counter free?",
        answer:
          "Yes. WorkUtilities Word Counter is free with no signup and runs entirely in your browser.",
      },
    ],
    blogGuide: {
      href: "/blog/word-counter-online-guide",
      title: "Word counter online guide — counts, reading time, and platform limits",
    },
  },
  "age-calculator": {
    aboutTitle: "About Age Calculator Tool",
    aboutParagraphs: [
      "Our free Age Calculator computes your exact age in years, months, and days from any birth date. See how many days until your next birthday and get precise age figures for forms and applications.",
      "Calculations run entirely in your browser — no birth date or personal data is sent to any server. Your information stays private on your device.",
      "Designed for Indian users filling government forms with strict age eligibility, parents checking school admission age cutoffs, passport applicants verifying age requirements, and employees calculating years of service or retirement timelines. Essential for Aadhaar updates, exam eligibility, and any form asking for age as of a specific date.",
    ],
    whenToUseTitle: "When Should You Use Age Calculator?",
    useCases: [
      {
        title: "Government form age proof",
        description:
          "Calculate exact age as of the cutoff date specified on UPSC, SSC, or state exam notifications.",
      },
      {
        title: "Passport application",
        description:
          "Verify age requirements for minor or adult passport categories before applying.",
      },
      {
        title: "School admission age check",
        description:
          "Confirm your child meets the minimum or maximum age for nursery or Class 1 admission.",
      },
      {
        title: "Retirement calculation",
        description:
          "Work out years and months remaining until a planned retirement date.",
      },
      {
        title: "Aadhaar age verification",
        description:
          "Double-check age details before updating Aadhaar or linked documents.",
      },
    ],
    faqs: [
      {
        question: "How to calculate age for government job applications in India?",
        answer:
          "Enter your date of birth, then set the 'Calculate age as of' date to the exam cutoff date mentioned in the notification (e.g. 01/01/2026). The calculator gives your exact age in years, months, and days — the format required by UPSC, SSC, Railway, and state PSC applications.",
      },
      {
        question: "How to calculate age for government forms India?",
        answer:
          "Use the exam notification cutoff date as your reference date to match official eligibility calculations.",
      },
      {
        question: "What age is required for passport application?",
        answer:
          "Minors and adults have different requirements. Calculate exact age to determine which passport category and documents apply.",
      },
      {
        question: "How to check age for Aadhaar card?",
        answer:
          "Enter the birth date on your Aadhaar and verify the calculated age matches before submitting updates.",
      },
      {
        question: "How many days until my next birthday?",
        answer:
          "Our calculator shows days remaining until your upcoming birthday from today’s date.",
      },
    ],
    blogGuide: {
      href: "/blog/age-calculator-for-government-forms-india",
      title: "Age calculator for government forms India — exact age in years months days",
    },
  },
  "image-converter": {
    aboutTitle: "About Image Converter Tool",
    aboutParagraphs: [
      "Our free Image Converter (Image to JPG/PNG) changes image formats in seconds — convert PNG to JPG, WebP to JPG, JPG to PNG, and more without installing software. Get the right format for email, portals, and social media with a simple upload and download flow.",
      "Conversion runs entirely in your browser. Your images are never uploaded to any server, so screenshots, ID scans, and personal photos stay private on your device. No account, no watermarks, and no waiting in a cloud queue.",
      "Built for Indian users who need JPG instead of PNG for smaller email attachments, WebP converted for older systems, or PNG for documents that require lossless quality. Common uses include government portal uploads that specify JPG only, college form submissions, WhatsApp-friendly formats, and social media posts where certain platforms prefer specific file types.",
    ],
    whenToUseTitle: "When Should You Use Image Converter?",
    useCases: [
      {
        title: "Converting WebP to JPG for email",
        description:
          "Many email clients handle JPG more reliably than WebP — convert before attaching photos.",
      },
      {
        title: "PNG to JPG to reduce size",
        description:
          "Shrink large PNG screenshots and graphics by converting to compressed JPG.",
      },
      {
        title: "Converting screenshots for document submission",
        description:
          "Turn phone screenshots into JPG files accepted by college and office portals.",
      },
      {
        title: "Format change for government portals",
        description:
          "Switch to JPG or PNG when Indian government forms specify an exact image format.",
      },
      {
        title: "Social media uploads",
        description:
          "Convert to the format Instagram, LinkedIn, or Facebook handles best before posting.",
      },
    ],
    faqs: [
      {
        question: "How to convert PNG to JPG free online?",
        answer:
          "Upload your PNG file, select JPG as the output format, and download the converted image instantly.",
      },
      {
        question: "How to convert WebP to JPG?",
        answer:
          "Upload the WebP image, choose JPG output, and download — no browser extension required.",
      },
      {
        question: "Why should I convert image to JPG?",
        answer:
          "JPG files are smaller and widely supported by email, portals, and older devices compared to PNG or WebP.",
      },
      {
        question: "Does converting PNG to JPG reduce quality?",
        answer:
          "JPG uses lossy compression, so some fine detail may soften. Photos and screenshots usually look fine; text-heavy images may show slight artifacts.",
      },
      {
        question: "How to convert image format on mobile?",
        answer:
          "Open this page in your phone browser, upload from your gallery, pick the output format, and download.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-image-formats-online",
      title: "How to convert image formats online — JPG, PNG, WebP",
    },
  },
  "emi-calculator": {
    aboutTitle: "About EMI Calculator",
    aboutParagraphs: [
      "Our free EMI Calculator helps you calculate monthly loan instalments for home loans, car loans, personal loans, and education loans in seconds. Enter the loan amount, annual interest rate, and tenure in years or months to see your exact EMI, total interest payable, and total repayment amount instantly.",
      "The calculator uses the standard reducing-balance EMI formula used by Indian banks including SBI, HDFC, ICICI, Axis, and NBFCs. Adjust loan amount or tenure to compare scenarios before applying — useful when planning a home purchase in Mumbai, Bangalore, or tier-2 cities, or when evaluating pre-approved personal loan offers.",
      "Everything runs client-side in your browser. Your loan details are never uploaded to any server, so salary, credit, and financial planning data stay completely private on your device. No signup, no ads interrupting results, and no data stored anywhere.",
    ],
    whenToUseTitle: "When Should You Use EMI Calculator?",
    useCases: [
      {
        title: "Home loan planning",
        description:
          "Estimate EMI before visiting a bank to know how much house you can afford based on monthly income.",
      },
      {
        title: "Car loan check",
        description:
          "Compare EMIs for different car loan amounts and tenures before buying a new or used vehicle.",
      },
      {
        title: "Personal loan EMI",
        description:
          "Check monthly outflow for medical emergencies, weddings, or debt consolidation loans.",
      },
      {
        title: "Education loan",
        description:
          "Plan repayment for study abroad or domestic higher education loans with moratorium periods in mind.",
      },
      {
        title: "Comparing banks",
        description:
          "Run the same loan inputs at different interest rates to see which bank offer saves the most interest.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate EMI for a home loan in India?",
        answer:
          "Enter your home loan amount (e.g. ₹50 lakhs), annual interest rate (e.g. 8.5%), and tenure in years (e.g. 20 years) — the calculator instantly shows your monthly EMI, total interest payable, and full payment breakdown using the standard formula: EMI = P×r×(1+r)^n / ((1+r)^n−1).",
      },
      {
        question: "What is the EMI for 20 lakh loan?",
        answer:
          "It depends on interest rate and tenure. At 8.5% for 20 years, EMI is roughly ₹17,356. Use our calculator with your exact bank rate for a precise figure.",
      },
      {
        question: "How to reduce EMI amount?",
        answer:
          "Increase down payment to reduce principal, choose a longer tenure, negotiate a lower interest rate, or make part-prepayments when allowed by your lender.",
      },
      {
        question: "Which bank has lowest home loan interest rate?",
        answer:
          "Rates change frequently and vary by credit score and profile. Compare offers from SBI, HDFC, ICICI, and housing finance companies using the same loan inputs in our calculator.",
      },
      {
        question: "What happens if I miss an EMI payment?",
        answer:
          "Banks charge late fees and report delays to credit bureaus, which can hurt your CIBIL score. Repeated misses may lead to recovery action. Contact your lender immediately if you expect a delay.",
      },
    ],
    blogGuide: {
      href: "/blog/home-loan-emi-guide-india",
      title: "Home loan EMI guide India — calculate and plan your EMI",
    },
  },
  "gst-calculator": {
    aboutTitle: "About GST Calculator",
    aboutParagraphs: [
      "Our free GST Calculator adds or removes Goods and Services Tax from any amount using standard Indian GST slabs — 5%, 12%, 18%, and 28%. Enter a base price to see GST amount and total, or enter a GST-inclusive price to extract the pre-tax value and tax component instantly.",
      "Built for shop owners, freelancers, e-commerce sellers, and service providers across India who need quick billing calculations without opening a spreadsheet. Supports both exclusive (GST added on top) and inclusive (GST extracted from total) modes, matching how invoices are prepared under CGST + SGST for intra-state or IGST for inter-state transactions.",
      "All calculations run entirely in your browser. Invoice amounts and business figures are never sent to any server, keeping your billing data private. No account required — ideal for quick checks at a shop counter or while preparing GST invoices on mobile.",
    ],
    whenToUseTitle: "When Should You Use GST Calculator?",
    useCases: [
      {
        title: "Invoice calculation",
        description:
          "Add GST to line items when preparing bills for clients or customers.",
      },
      {
        title: "Shop billing",
        description:
          "Quickly calculate GST-inclusive totals at retail counters for daily sales.",
      },
      {
        title: "Freelancer GST",
        description:
          "Compute GST on professional services billed to Indian clients at 18%.",
      },
      {
        title: "E-commerce sellers",
        description:
          "Work out tax components on product listings for Amazon, Flipkart, or Meesho.",
      },
      {
        title: "Service providers",
        description:
          "Calculate GST on consulting, IT, legal, or maintenance service invoices.",
      },
    ],
    faqs: [
      {
        question: "How to calculate GST on a product?",
        answer:
          "Multiply the base price by the GST rate and divide by 100. For example, 18% GST on ₹1,000 = ₹180, making the total ₹1,180. Our calculator does this instantly for any amount and rate.",
      },
      {
        question: "What is CGST and SGST?",
        answer:
          "For intra-state sales in India, GST is split equally into Central GST (CGST) and State GST (SGST). For inter-state sales, Integrated GST (IGST) applies instead of CGST + SGST.",
      },
      {
        question: "How to remove GST from total amount?",
        answer:
          "Use inclusive mode: divide the total by (1 + rate/100). On ₹1,180 at 18%, the base is ₹1,000 and GST is ₹180.",
      },
      {
        question: "What is the GST rate for software services?",
        answer:
          "Most IT and software services attract 18% GST in India. Verify the specific HSN/SAC code on your invoice for exact classification.",
      },
      {
        question: "Is GST applicable on salary?",
        answer:
          "No. Salary is not a supply of goods or services under GST law. GST applies to business transactions, not employee wages.",
      },
    ],
    blogGuide: {
      href: "/blog/gst-for-freelancers-india",
      title: "GST for freelancers in India — when to register and how to calculate",
    },
  },
  "salary-hike-calculator": {
    aboutTitle: "About Salary Hike Calculator",
    aboutParagraphs: [
      "Our free Salary Hike Calculator shows your new salary and hike percentage after an appraisal or job offer. Enter your current CTC or in-hand salary and the proposed new amount to see the exact percentage increase, monthly difference, and annual gain in rupees.",
      "Essential during appraisal season in Indian IT companies, startups, and corporate roles when comparing counter-offers or evaluating whether a promotion meets market standards. Works for both percentage-based hikes (e.g. 15% increment) and absolute salary jumps when switching employers.",
      "Calculations happen entirely in your browser — your salary figures never leave your device. No signup or data storage, so confidential compensation details from offer letters and HR discussions stay private while you plan negotiations.",
    ],
    whenToUseTitle: "When Should You Use Salary Hike Calculator?",
    useCases: [
      {
        title: "Appraisal planning",
        description:
          "Calculate what a 10%, 15%, or 20% hike means in rupees before your review meeting.",
      },
      {
        title: "Offer letter comparison",
        description:
          "Compare current CTC with a new employer offer to see the real percentage jump.",
      },
      {
        title: "Negotiation prep",
        description:
          "Know your target hike percentage in advance when discussing compensation with HR.",
      },
      {
        title: "Increment calculation",
        description:
          "Verify that your annual increment matches what was communicated in the appraisal letter.",
      },
      {
        title: "HR planning",
        description:
          "HR teams can quickly model budget impact of proposed hike percentages across bands.",
      },
    ],
    faqs: [
      {
        question: "How to calculate salary hike percentage?",
        answer:
          "Formula: ((New Salary − Old Salary) / Old Salary) × 100. If your salary rises from ₹8 lakh to ₹9 lakh, the hike is 12.5%.",
      },
      {
        question: "What is a good salary hike in India?",
        answer:
          "It varies by industry and performance. IT sector averages 8–15% for steady performers; high performers may get 20%+. Switching jobs often yields 25–40% jumps.",
      },
      {
        question: "How to negotiate salary hike?",
        answer:
          "Research market rates on Naukri or Glassdoor, document achievements, and ask for a specific number. Use this calculator to show the rupee impact of your request.",
      },
      {
        question: "How to calculate in-hand salary after hike?",
        answer:
          "Hike percentage on CTC does not equal in-hand increase due to PF, tax, and variable pay. Use our CTC Calculator after applying the hike for a closer in-hand estimate.",
      },
      {
        question: "What is the average salary hike in IT sector India?",
        answer:
          "Recent trends show 8–12% average increments for IT services, with product companies and high-demand skills offering higher hikes. Top performers often exceed 15–20%.",
      },
    ],
    blogGuide: {
      href: "/blog/salary-hike-negotiation-guide-india",
      title: "How to negotiate salary hike in India — appraisal season guide",
    },
  },
  "cgpa-to-percentage": {
    aboutTitle: "About CGPA to Percentage",
    aboutParagraphs: [
      "Our free CGPA to Percentage converter transforms your cumulative grade point average into the percentage format required by job portals, government forms, and university applications across India. Supports common conversion formulas used by CBSE, VTU, Anna University, Mumbai University, and other boards.",
      "Enter your CGPA on the standard 10-point scale and select your university formula or use the generic multiplier to get an instant percentage equivalent. Essential when Naukri, government exams, or scholarship forms ask for percentage but your mark sheet only shows CGPA.",
      "Conversion runs entirely in your browser — your academic records are never uploaded to any server. Results stay private on your device, with no account or data storage required.",
    ],
    whenToUseTitle: "When Should You Use CGPA to Percentage?",
    useCases: [
      {
        title: "Job applications",
        description:
          "Convert CGPA to percentage when filling Naukri, LinkedIn, or company career portal forms.",
      },
      {
        title: "Government forms",
        description:
          "Meet percentage requirements on SSC, UPSC, and state PSC applications that do not accept CGPA.",
      },
      {
        title: "College admissions",
        description:
          "Convert scores for postgraduate or transfer applications that specify percentage cutoffs.",
      },
      {
        title: "Scholarship forms",
        description:
          "Apply for merit scholarships that list eligibility in percentage rather than grade points.",
      },
      {
        title: "Visa applications",
        description:
          "Provide percentage equivalents when submitting academic credentials for study or work visas.",
      },
    ],
    faqs: [
      {
        question: "How to convert CGPA to percentage for job applications?",
        answer:
          "Check if the employer specifies a formula. Many use CGPA × 9.5 (CBSE) or CGPA × 10. Enter your CGPA and select the matching formula in our tool.",
      },
      {
        question: "What is the CGPA to percentage formula for VTU?",
        answer:
          "Visvesvaraya Technological University commonly uses: Percentage = (CGPA − 0.75) × 10. Verify with your latest VTU notification as formulas can update.",
      },
      {
        question: "How to convert Anna University CGPA to percentage?",
        answer:
          "Anna University often uses Percentage = CGPA × 10 for the 10-point scale. Confirm with your consolidated mark sheet or university circular.",
      },
      {
        question: "What is 7.5 CGPA in percentage?",
        answer:
          "Using CGPA × 9.5 (CBSE): 71.25%. Using CGPA × 10: 75%. Select your university formula in our calculator for the accurate figure.",
      },
      {
        question: "Does every company accept CGPA instead of percentage?",
        answer:
          "Many modern companies accept CGPA, but government jobs, older forms, and some MNC portals still require percentage. Convert when the form field does not allow CGPA entry.",
      },
    ],
    blogGuide: {
      href: "/blog/cgpa-to-percentage-for-job-applications",
      title: "CGPA to percentage conversion for job applications",
    },
  },
  "ctc-calculator": {
    aboutTitle: "About CTC Calculator",
    aboutParagraphs: [
      "Our free CTC Calculator breaks down your Cost to Company into estimated in-hand monthly salary after standard deductions. Enter your annual CTC, basic salary percentage, HRA, and other components to see approximate take-home pay, employer PF, employee PF, and professional tax.",
      "Designed for Indian job seekers evaluating offer letters from IT companies, startups, and corporates where CTC figures include PF, gratuity, insurance, and variable pay that do not reach your bank account monthly. Understand the gap between ₹12 LPA on paper and what actually gets credited each month.",
      "All calculations run client-side in your browser. Salary and offer details are never sent to any server, keeping confidential compensation data private while you compare offers or prepare for negotiation.",
    ],
    whenToUseTitle: "When Should You Use CTC Calculator?",
    useCases: [
      {
        title: "Offer letter evaluation",
        description:
          "Decode a new job offer to see realistic monthly in-hand before accepting.",
      },
      {
        title: "Job comparison",
        description:
          "Compare two offers with different CTC structures on an in-hand basis, not headline numbers.",
      },
      {
        title: "Salary negotiation",
        description:
          "Ask for in-hand increase specifically when HR quotes only CTC figures.",
      },
      {
        title: "PF planning",
        description:
          "See employee and employer PF contributions deducted from your structured salary.",
      },
      {
        title: "Tax planning",
        description:
          "Estimate taxable income components before investing in 80C or choosing tax regime.",
      },
    ],
    faqs: [
      {
        question: "How to calculate in-hand salary from CTC?",
        answer:
          "Subtract annual PF (employee + employer if counted in CTC), gratuity provision, insurance, and variable pay from CTC, then divide by 12. Our calculator models standard Indian salary structures automatically.",
      },
      {
        question: "What percentage of CTC is in-hand salary?",
        answer:
          "Typically 65–75% for most Indian salaried roles, but it varies widely. High PF basic percentages and large variable components reduce in-hand further.",
      },
      {
        question: "How much PF is deducted from salary?",
        answer:
          "Employee contributes 12% of basic (+ DA). Employer also contributes 12% but only part may appear in your payslip. PF applies when basic exceeds ₹15,000 unless opted in at full basic.",
      },
      {
        question: "What is professional tax in Telangana?",
        answer:
          "Telangana professional tax is up to ₹2,500 per year for salaried employees, deducted monthly from salary based on income slabs set by the state.",
      },
      {
        question: "How to calculate take home salary with PF?",
        answer:
          "Start with gross monthly salary, subtract employee PF (12% of basic), professional tax, and TDS/income tax. Our CTC Calculator estimates this breakdown from your annual CTC input.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-calculate-in-hand-salary-from-ctc",
      title: "How to calculate in-hand salary from CTC — a real guide for Indian employees",
    },
  },
  "fd-calculator": {
    aboutTitle: "About FD Calculator",
    aboutParagraphs: [
      "Our free FD Calculator computes fixed deposit maturity amount, total interest earned, and effective returns for lump-sum investments. Enter deposit amount, annual interest rate, and tenure in months or years to see how your money grows with quarterly compounding as used by most Indian banks.",
      "Compare scenarios across SBI, HDFC, ICICI, post office FD, and small finance banks before locking in a rate. Supports regular FD and senior citizen rate inputs — senior citizens typically earn 0.25–0.50% extra at most banks in India.",
      "Calculations run entirely in your browser. Your investment amounts and financial plans are never uploaded to any server, keeping savings goals and bank choices completely private on your device.",
    ],
    whenToUseTitle: "When Should You Use FD Calculator?",
    useCases: [
      {
        title: "Retirement planning",
        description:
          "Project FD maturity value for lump sums set aside for post-retirement income.",
      },
      {
        title: "Emergency fund",
        description:
          "Calculate returns on 6–12 month FD parking for your emergency corpus.",
      },
      {
        title: "Comparing banks",
        description:
          "Run the same deposit at different rates to find the best maturity amount before booking.",
      },
      {
        title: "Tax saving FD",
        description:
          "Estimate returns on 5-year tax-saving FD under Section 80C before investing.",
      },
      {
        title: "Senior citizen FD",
        description:
          "Model higher senior citizen rates offered by banks for parents or retirees.",
      },
    ],
    faqs: [
      {
        question: "Which bank gives highest FD interest rate in India?",
        answer:
          "Rates change frequently. Small finance banks and some NBFCs often offer higher rates than major banks. Always compare current rates on bank websites and use our calculator with the exact rate offered.",
      },
      {
        question: "How to calculate FD maturity amount?",
        answer:
          "Maturity = P × (1 + r/n)^(n×t), where P is principal, r is annual rate, n is compounding frequency, and t is years. Indian bank FDs typically compound quarterly.",
      },
      {
        question: "Is FD interest taxable in India?",
        answer:
          "Yes. FD interest is added to your income and taxed per your slab. TDS applies if interest exceeds ₹40,000/year (₹50,000 for senior citizens) unless Form 15G/15H is submitted.",
      },
      {
        question: "What is the best FD tenure for maximum returns?",
        answer:
          "Longer tenures often offer slightly higher rates, but locking too long reduces liquidity. Match tenure to your goal — 1–3 years for medium-term, 5 years for 80C tax-saving FD.",
      },
      {
        question: "Can I break FD before maturity?",
        answer:
          "Yes, but banks charge a penalty (typically 0.5–1% on the rate) and may pay lower interest for the actual period held. Partial withdrawal rules vary by bank.",
      },
    ],
    blogGuide: {
      href: "/blog/fd-calculator-guide-india",
      title: "FD calculator India — fixed deposit returns guide",
    },
  },
  "sip-calculator": {
    aboutTitle: "About SIP Calculator",
    aboutParagraphs: [
      "Our free SIP Calculator projects mutual fund returns for monthly Systematic Investment Plans. Enter monthly investment amount, expected annual return, and investment period to see estimated corpus, total invested, and wealth gained through compounding.",
      "Essential for Indian investors planning retirement, child education, or a home down payment through SIPs in equity, hybrid, or index mutual funds. While past returns do not guarantee future performance, the calculator helps set realistic expectations for long-term wealth creation at 10–12% average equity returns.",
      "All projections run client-side in your browser. Your investment amounts and financial goals are never sent to any server, keeping personal finance plans completely private with no signup required.",
    ],
    whenToUseTitle: "When Should You Use SIP Calculator?",
    useCases: [
      {
        title: "Retirement planning",
        description:
          "Estimate how much a ₹10,000/month SIP grows over 20–25 years for retirement corpus.",
      },
      {
        title: "Child education fund",
        description:
          "Project SIP returns to fund school or college fees 10–15 years from now.",
      },
      {
        title: "Home down payment",
        description:
          "Calculate corpus needed for a 20% home loan down payment and required monthly SIP.",
      },
      {
        title: "Wealth creation",
        description:
          "Visualise long-term compounding from consistent monthly mutual fund investments.",
      },
      {
        title: "Comparing MF returns",
        description:
          "Model different expected return rates to understand best and conservative scenarios.",
      },
    ],
    faqs: [
      {
        question: "How much SIP is needed for 1 crore?",
        answer:
          "At 12% annual return over 20 years, roughly ₹10,000/month reaches ₹1 crore. At 15 years, you need about ₹20,000/month. Use our calculator with your exact timeline and return assumption.",
      },
      {
        question: "What is the minimum SIP amount?",
        answer:
          "Most Indian mutual funds allow SIPs starting at ₹500/month. Some funds and platforms support ₹100. Check individual fund minimums on Groww, Zerodha Coin, or AMC websites.",
      },
      {
        question: "Is SIP better than FD in India?",
        answer:
          "SIPs in equity funds historically beat FD returns over 7+ years but carry market risk. FDs offer guaranteed returns. Choose based on risk tolerance and time horizon.",
      },
      {
        question: "How to start SIP in India?",
        answer:
          "Complete KYC, choose a mutual fund on Groww, Zerodha, Paytm Money, or an AMC website, and set up auto-debit SIP from your bank account.",
      },
      {
        question: "What is the best SIP plan for 2025?",
        answer:
          "There is no single best plan — it depends on goals and risk. Broad index funds and diversified flexi-cap funds are popular for long-term investors. Consult a SEBI-registered advisor for personalised advice.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-start-sip-india-beginners-guide",
      title: "How to start a SIP in India — beginner's guide for salaried employees",
    },
  },
  "notice-period-calculator": {
    aboutTitle: "About Notice Period Calculator",
    aboutParagraphs: [
      "Our free Notice Period Calculator computes your last working day based on resignation date and notice period length. Enter when you submitted or plan to submit resignation and your contractual notice duration to see the exact exit date, accounting for weekends and company policies.",
      "Built for Indian employees navigating standard 30, 60, or 90-day notice periods common in IT services, product companies, and corporates. Essential when coordinating a new job joining date, planning notice buyout with your employer, or confirming last day for full and final settlement.",
      "Date calculations run entirely in your browser — resignation dates and employment details are never uploaded to any server. Your career transition plans stay private on your device.",
    ],
    whenToUseTitle: "When Should You Use Notice Period Calculator?",
    useCases: [
      {
        title: "Resignation planning",
        description:
          "Know your exact last working day before submitting resignation to HR.",
      },
      {
        title: "Joining date negotiation",
        description:
          "Align new employer joining date with your calculated notice period end date.",
      },
      {
        title: "Notice buyout calculation",
        description:
          "See how many days of salary buyout applies if leaving before notice ends.",
      },
      {
        title: "New job offer timing",
        description:
          "Check if a new offer start date fits your current employer notice timeline.",
      },
      {
        title: "HR planning",
        description:
          "HR teams can verify employee last working days for handover and F&F processing.",
      },
    ],
    faqs: [
      {
        question: "How to calculate last working day?",
        answer:
          "Add your notice period (in days or months) to your resignation acceptance date. Our calculator handles calendar days and shows the resulting last working day.",
      },
      {
        question: "Can I negotiate notice period in India?",
        answer:
          "Yes. Many employers agree to shorten notice or accept buyout, especially when you have a joining date pressure. Negotiate with HR — it is not always legally fixed if both parties agree.",
      },
      {
        question: "What is notice period buyout?",
        answer:
          "Paying your employer for unserved notice days instead of working them. The amount is typically basic salary for remaining notice days, as per your appointment letter.",
      },
      {
        question: "What happens if I don't serve notice period?",
        answer:
          "Employers may withhold experience letters, recover buyout from full and final settlement, or mark you as absconding. This can affect background verification at future employers.",
      },
      {
        question: "Is notice period counted in experience?",
        answer:
          "Yes, if you serve it properly and receive a relieving letter. Absconding or termination may affect how future employers count the tenure.",
      },
    ],
    blogGuide: {
      href: "/blog/notice-period-buyout-india-guide",
      title: "What is notice period buyout? How to calculate and negotiate in India",
    },
  },
  "percentage-calculator": {
    aboutTitle: "About Percentage Calculator",
    aboutParagraphs: [
      "Our free Percentage Calculator handles every common percentage problem — find what percent one number is of another, calculate percentage increase or decrease, add or subtract a percentage, and compute marks percentage for exams. Get instant results without memorising formulas.",
      "Designed for Indian students calculating exam scores, shoppers checking discounts during sales, employees verifying hike percentages, and anyone working with GST or interest rates. Supports quick answers for board exam mark sheets, Flipkart/Amazon discount tags, and salary increment verification.",
      "All calculations run client-side in your browser. Numbers you enter are never sent to any server, keeping exam scores, salary figures, and business data completely private.",
    ],
    whenToUseTitle: "When Should You Use Percentage Calculator?",
    useCases: [
      {
        title: "Exam marks calculation",
        description:
          "Convert raw marks to percentage for CBSE, state board, or university results.",
      },
      {
        title: "Discount calculation",
        description:
          "Find final price after 10%, 20%, or 50% off during online or shop sales.",
      },
      {
        title: "Salary hike percentage",
        description:
          "Calculate percentage increase between old and new salary figures quickly.",
      },
      {
        title: "GST calculation",
        description:
          "Compute tax percentage on bills when you need a quick percentage check.",
      },
      {
        title: "Interest rates",
        description:
          "Work out interest as a percentage of principal for loans or investments.",
      },
    ],
    faqs: [
      {
        question: "How to calculate percentage of marks?",
        answer:
          "Divide marks obtained by total marks and multiply by 100. Example: 425/500 × 100 = 85%.",
      },
      {
        question: "How to calculate discount percentage?",
        answer:
          "Discount % = ((Original Price − Sale Price) / Original Price) × 100. Or enter original price and discount % in our tool to get the sale price directly.",
      },
      {
        question: "What is percentage increase formula?",
        answer:
          "Percentage increase = ((New Value − Old Value) / Old Value) × 100. A rise from 80 to 100 is a 25% increase.",
      },
      {
        question: "How to calculate percentage in Excel?",
        answer:
          "Use =A1/B1*100 for 'A as % of B', or =(B1-A1)/A1*100 for increase. Our online tool gives the same results without Excel.",
      },
      {
        question: "How to find what percentage one number is of another?",
        answer:
          "Divide the part by the whole and multiply by 100. Example: 30 is 60% of 50 because 30/50 × 100 = 60%.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-calculate-percentage-of-marks-india",
      title: "How to calculate percentage of marks — guide for Indian students",
    },
  },
  "password-generator": {
    aboutTitle: "About Password Generator",
    aboutParagraphs: [
      "Our free Password Generator creates strong, random passwords with custom length and character options. Choose uppercase, lowercase, numbers, and symbols to meet bank, email, and workplace password policies — then copy with one click.",
      "Weak passwords like names, birthdays, or 'password123' are the top cause of account hacks in India. A random 12–16 character password with mixed characters dramatically reduces breach risk for Gmail, net banking, UPI apps, and corporate VPN accounts.",
      "Password generation runs entirely in your browser using cryptographically secure random values. Passwords are never sent to any server, logged, or stored — they exist only on your device until you copy them to your password manager or account settings.",
    ],
    whenToUseTitle: "When Should You Use Password Generator?",
    useCases: [
      {
        title: "Creating bank passwords",
        description:
          "Generate strong passwords meeting net banking complexity requirements.",
      },
      {
        title: "Email security",
        description:
          "Create unique Gmail or Outlook passwords not reused across other sites.",
      },
      {
        title: "Social media accounts",
        description:
          "Secure Instagram, Facebook, and LinkedIn with random high-entropy passwords.",
      },
      {
        title: "Work system passwords",
        description:
          "Meet corporate IT password policies for VPN, SAP, and internal tools.",
      },
      {
        title: "WiFi passwords",
        description:
          "Generate strong WPA2/WPA3 router passwords for home or office networks.",
      },
    ],
    faqs: [
      {
        question: "How to create a strong password?",
        answer:
          "Use at least 12 characters mixing uppercase, lowercase, numbers, and symbols. Avoid dictionary words, names, and patterns. Our generator creates these automatically.",
      },
      {
        question: "What makes a password secure?",
        answer:
          "Length, randomness, and uniqueness. A 16-character random password is far harder to crack than an 8-character word with substitutions.",
      },
      {
        question: "How long should a password be?",
        answer:
          "Minimum 12 characters for important accounts; 16+ for banking and email. Longer passwords exponentially increase brute-force difficulty.",
      },
      {
        question: "Should I use a password manager?",
        answer:
          "Yes. Password managers store unique strong passwords for every account so you only remember one master password. Bitwarden and Google Password Manager are popular free options in India.",
      },
      {
        question: "Is online password generator safe?",
        answer:
          "Yes with client-side generators like WorkUtilities — passwords are created in your browser and never transmitted. Avoid generators that send passwords to a server.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-create-strong-password-guide",
      title: "How to create a strong password — cybersecurity guide for Indians",
    },
  },
  "unit-converter": {
    aboutTitle: "About Unit Converter",
    aboutParagraphs: [
      "Our free Unit Converter converts length, weight, temperature, area, volume, and data size units instantly. Switch between metric and imperial systems — kilometres to miles, kg to pounds, Celsius to Fahrenheit, square feet to square metres, and GB to MB — with accurate conversion factors.",
      "Useful for Indian cooks following international recipes, travellers checking distance and temperature abroad, property buyers comparing sq ft and sq m, and IT professionals converting data storage units. No app install needed — works on mobile and desktop browsers.",
      "All conversions run client-side in your browser. Values you enter are never uploaded to any server, keeping personal measurements and calculations completely private.",
    ],
    whenToUseTitle: "When Should You Use Unit Converter?",
    useCases: [
      {
        title: "Cooking measurements",
        description:
          "Convert cups, tablespoons, grams, and ounces when following recipes online.",
      },
      {
        title: "Travel distance",
        description:
          "Switch kilometres to miles when planning trips to the US, UK, or other countries.",
      },
      {
        title: "Weather temperature",
        description:
          "Convert Celsius to Fahrenheit to understand foreign weather forecasts.",
      },
      {
        title: "Property area",
        description:
          "Convert square feet to square metres when comparing flats in India and abroad.",
      },
      {
        title: "Data size conversion",
        description:
          "Convert GB, MB, KB, and TB for file sizes, storage plans, and bandwidth.",
      },
    ],
    faqs: [
      {
        question: "How do I convert km to miles or kg to lbs?",
        answer:
          "Select the category (Length or Weight), choose your input unit (km or kg), enter the value, and the converter instantly shows all equivalent values — including miles, feet, inches for length, or lbs, grams, ounces for weight.",
      },
      {
        question: "How many square feet in one square meter?",
        answer:
          "1 square metre = 10.764 square feet. A 1,000 sq ft flat is approximately 92.9 sq m.",
      },
      {
        question: "How to convert Celsius to Fahrenheit?",
        answer:
          "Formula: F = (C × 9/5) + 32. Example: 25°C = 77°F. Enter Celsius in our tool for instant Fahrenheit.",
      },
      {
        question: "How many liters in a gallon?",
        answer:
          "1 US gallon = 3.785 litres. 1 UK (imperial) gallon = 4.546 litres. Our tool supports both where applicable.",
      },
      {
        question: "How to convert kg to pounds?",
        answer:
          "Multiply kg by 2.20462. Example: 70 kg = 154.32 lbs. Use our weight converter for precise results.",
      },
    ],
    blogGuide: {
      href: "/blog/unit-conversion-guide-indian-students",
      title: "Unit conversion guide for Indian students — length, weight, temperature and more",
    },
  },
  "income-tax-calculator": {
    aboutTitle: "About Income Tax Calculator",
    aboutParagraphs: [
      "Our free Income Tax Calculator compares tax liability under India's Old Regime and New Regime for FY 2024-25 and FY 2025-26. Enter annual income, age group, and deductions to see side-by-side tax, cess, rebate u/s 87A, and take-home estimates with slab-wise breakdown.",
      "Essential for salaried employees, freelancers, and professionals deciding which regime to choose at the start of the financial year. Accounts for standard deduction, 80C, 80D, HRA, home loan interest, and NPS under the old regime, plus updated new regime slabs with ₹75,000 standard deduction for FY 2025-26.",
      "All tax calculations run entirely in your browser. Your income and deduction figures are never uploaded to any server — critical for confidential salary and investment planning data during ITR season in India.",
    ],
    whenToUseTitle: "When Should You Use Income Tax Calculator?",
    useCases: [
      {
        title: "Tax planning",
        description:
          "Estimate annual tax before the March investment deadline for 80C and 80D.",
      },
      {
        title: "Old vs new regime comparison",
        description:
          "See which regime saves more tax for your specific income and deductions.",
      },
      {
        title: "Investment planning",
        description:
          "Model how ELSS, PPF, and NPS deductions reduce tax under the old regime.",
      },
      {
        title: "Form 16 verification",
        description:
          "Cross-check TDS deducted by employer against calculated tax liability.",
      },
      {
        title: "ITR filing prep",
        description:
          "Prepare estimated tax figures before filing on the Income Tax e-filing portal.",
      },
    ],
    faqs: [
      {
        question: "Which tax regime is better old or new in 2025-26?",
        answer:
          "It depends on deductions. Salaried employees with high 80C, HRA, and home loan interest often save under the old regime. Those with minimal deductions may pay less under the new regime with higher rebate limits.",
      },
      {
        question: "How to save income tax in India legally?",
        answer:
          "Use Section 80C (₹1.5L), 80D health insurance, HRA, home loan interest u/s 24(b), and NPS 80CCD(1B). Choose the regime that maximises these benefits.",
      },
      {
        question: "What is the income tax slab for 2025-26?",
        answer:
          "New regime slabs: 0–₹4L nil, 4–8L at 5%, 8–12L at 10%, 12–16L at 15%, 16–20L at 20%, 20–24L at 25%, above ₹24L at 30%, plus 4% cess.",
      },
      {
        question: "Is income up to 12 lakh tax free in new regime?",
        answer:
          "With rebate u/s 87A (up to ₹60,000 for FY 2025-26), many taxpayers with income up to ₹12 lakh pay zero tax under the new regime after rebate, subject to exact income and surcharge rules.",
      },
      {
        question: "How to calculate income tax on salary?",
        answer:
          "Add salary, bonus, and allowances, subtract standard deduction and exemptions, apply slab rates, add 4% cess, and subtract rebate u/s 87A. Our calculator automates this for both regimes.",
      },
    ],
    blogGuide: {
      href: "/blog/old-vs-new-tax-regime-india-2025",
      title: "Old regime vs new tax regime 2025-26 — which one saves more money?",
    },
  },
  "signature-maker": {
    aboutTitle: "About Signature Maker",
    aboutParagraphs: [
      "Our free Signature Maker lets you create a digital signature by drawing on canvas, typing your name in cursive fonts, or uploading and cropping an existing signature image. Download as PNG with transparent background or JPG with white background, and copy to clipboard instantly.",
      "Perfect for signing PDF documents, freelancer contracts, business emails, and online forms without printing and scanning. Choose from elegant Google Fonts like Dancing Script and Great Vibes, or draw naturally with mouse or touch on mobile.",
      "Everything runs client-side in your browser — your signature image is never uploaded to any server. Personal signatures stay private on your device, with no watermarks or account required.",
    ],
    whenToUseTitle: "When Should You Use Signature Maker?",
    useCases: [
      {
        title: "Digital documents",
        description:
          "Add a signature image to PDF agreements, offer letters, and declarations.",
      },
      {
        title: "PDF signing",
        description:
          "Create a signature PNG to overlay on PDFs before sharing or uploading.",
      },
      {
        title: "Business emails",
        description:
          "Embed a professional signature image in email footers and proposals.",
      },
      {
        title: "Freelancer contracts",
        description:
          "Sign service agreements and invoices digitally without a scanner.",
      },
      {
        title: "Online forms",
        description:
          "Upload a signature image when portals require signed declarations.",
      },
    ],
    faqs: [
      {
        question: "How to create a digital signature free?",
        answer:
          "Draw your signature on our canvas, type your name in a cursive font, or upload a photo. Download as PNG or JPG — completely free with no signup.",
      },
      {
        question: "Is digital signature legally valid in India?",
        answer:
          "Class 3 Digital Signatures under the IT Act are legally valid for e-filing and contracts. Image signatures on PDFs are widely accepted informally but may not replace DSC for all government filings.",
      },
      {
        question: "How to add signature to PDF?",
        answer:
          "Download your signature as PNG, open the PDF in Adobe Acrobat, Preview, or an online PDF editor, and insert the image on the signature line.",
      },
      {
        question: "How to make signature on phone?",
        answer:
          "Open our Signature Maker on your mobile browser, use the Draw tab, and sign with your finger on the touch canvas.",
      },
      {
        question: "What is the difference between digital and electronic signature?",
        answer:
          "Digital signatures use encryption and certificate authority verification (DSC). Electronic signatures include typed names, drawn signatures, and image uploads — simpler but with varying legal weight.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-create-digital-signature-india",
      title: "How to create a digital signature free online — India guide",
    },
  },
  "rent-receipt-generator": {
    aboutTitle: "About Rent Receipt Generator",
    aboutParagraphs: [
      "Our free Rent Receipt Generator creates professional rent receipts for HRA tax exemption and landlord records. Fill tenant name, landlord name, rent amount, month, payment mode, property address, and optional landlord PAN — then download a formatted PDF instantly.",
      "Built for salaried employees in India claiming House Rent Allowance (HRA) under Section 10(13A). Generate receipts for one month or bulk-generate January through December before the March ITR deadline. Meets common requirements for employer reimbursement and income tax proof submission.",
      "Receipt generation runs entirely in your browser using client-side PDF creation. Rent amounts and landlord details are never uploaded to any server, keeping sensitive housing and tax information private on your device.",
    ],
    whenToUseTitle: "When Should You Use Rent Receipt Generator?",
    useCases: [
      {
        title: "HRA tax exemption proof",
        description:
          "Create monthly rent receipts to submit to your employer for HRA exemption.",
      },
      {
        title: "March deadline",
        description:
          "Bulk-generate all 12 months of receipts before the financial year ends.",
      },
      {
        title: "New city accommodation",
        description:
          "Start documenting rent from day one when relocating for a new job.",
      },
      {
        title: "Company reimbursement",
        description:
          "Provide formatted receipts when HR requires rent proof for HRA processing.",
      },
      {
        title: "IT return proof",
        description:
          "Keep rent receipts as supporting documents for HRA claims in ITR filing.",
      },
    ],
    faqs: [
      {
        question: "How to make rent receipt for HRA exemption?",
        answer:
          "Enter tenant and landlord details, rent amount, month, and address. Download the PDF receipt and submit to your employer with your HRA declaration form.",
      },
      {
        question: "Is rent receipt mandatory for HRA claim?",
        answer:
          "Yes for rent above ₹3,000/month. Employers and tax authorities require rent receipts as proof of payment for HRA exemption.",
      },
      {
        question: "What details should be in rent receipt India?",
        answer:
          "Tenant name, landlord name, property address, rent amount, month/year, payment mode, receipt number, and landlord signature. PAN is required if annual rent exceeds ₹1 lakh.",
      },
      {
        question: "Do I need landlord PAN for rent receipt?",
        answer:
          "Yes if annual rent paid exceeds ₹1,00,000. Include landlord PAN on the receipt for employer records and tax compliance.",
      },
      {
        question: "How to download rent receipt as PDF?",
        answer:
          "Fill the form, select months, and click Download PDF. Our tool generates a print-ready PDF instantly in your browser.",
      },
    ],
    blogGuide: {
      href: "/blog/rent-receipt-for-hra-exemption-india",
      title: "How to generate rent receipt for HRA exemption — India tax guide",
    },
  },
  "pdf-to-jpg": {
    aboutTitle: "About PDF to JPG Tool",
    aboutParagraphs: [
      "Our free PDF to JPG tool converts PDF pages into high-quality JPG images you can share, upload, or edit. Extract individual pages from certificates, mark sheets, and documents without needing desktop software.",
      "Conversion happens entirely in your browser — your PDF is never uploaded to a server. Sensitive documents like bank statements, exam certificates, and work reports stay private on your device throughout the process.",
      "Ideal for Indian users who need to share a single certificate page on WhatsApp, upload a PDF page as an image to a portal that rejects PDFs, or extract visual content from scanned documents. Students, job seekers, and professionals use it daily to turn PDF pages into lightweight JPG files for quick sharing and mobile-friendly uploads.",
    ],
    whenToUseTitle: "When Should You Use PDF to JPG?",
    useCases: [
      {
        title: "Converting PDF pages for WhatsApp sharing",
        description:
          "Share a certificate or document page as a JPG image instead of a full PDF file.",
      },
      {
        title: "Extracting certificate page as image",
        description:
          "Save your degree or course certificate page as a JPG for profile or form uploads.",
      },
      {
        title: "Sharing a single page without the full file",
        description:
          "Send only the relevant page when the entire PDF is too large or confidential.",
      },
      {
        title: "Uploading to image-only portals",
        description:
          "Convert PDF content to JPG when a form accepts images but not PDF documents.",
      },
      {
        title: "Previewing PDF content on mobile",
        description:
          "Turn pages into images that open instantly in any gallery or messaging app.",
      },
    ],
    faqs: [
      {
        question: "How to convert PDF to JPG free online?",
        answer:
          "Upload your PDF, select the pages you want, and download them as JPG images instantly.",
      },
      {
        question: "How to extract images from a PDF?",
        answer:
          "Each PDF page is rendered as a separate JPG file you can download individually or as a batch.",
      },
      {
        question: "How to convert PDF page to image for WhatsApp?",
        answer:
          "Convert the page to JPG, download it, and attach the image in WhatsApp like any photo.",
      },
      {
        question: "Can I convert multiple PDF pages to JPG?",
        answer:
          "Yes. Select multiple pages or convert the entire PDF — each page becomes its own JPG file.",
      },
      {
        question: "Is PDF to JPG conversion safe online?",
        answer:
          "Yes with WorkUtilities — processing is client-side only. Your PDF never leaves your browser.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-pdf-to-jpg-online-free",
      title: "How to convert PDF to JPG online free",
    },
  },
  "heic-to-jpg": {
    aboutTitle: "About HEIC to JPG Converter",
    aboutParagraphs: [
      "Our free HEIC to JPG converter turns iPhone photos into universally compatible JPG or PNG files. HEIC (High Efficiency Image Container) is Apple's default photo format — great for storage on your phone, but many Windows PCs, older apps, and government portals cannot open it.",
      "Conversion runs entirely in your browser. Your photos never leave your device, so family pictures, ID scans, and personal images stay private. No signup, no watermarks, and no waiting for cloud processing.",
      "Perfect for Indian users transferring iPhone photos to a Windows laptop, uploading images to job portals or college forms, sharing photos on WhatsApp with friends on Android, or attaching pictures to email when the recipient cannot view HEIC files.",
    ],
    whenToUseTitle: "When Should You Use HEIC to JPG?",
    useCases: [
      {
        title: "Windows PC compatibility",
        description:
          "Open iPhone photos on Windows without installing extra HEIC codecs.",
      },
      {
        title: "Job portal uploads",
        description:
          "Convert HEIC profile photos to JPG before uploading to Naukri or LinkedIn.",
      },
      {
        title: "WhatsApp sharing",
        description:
          "Send iPhone photos as JPG so Android users can view them without issues.",
      },
      {
        title: "Government forms",
        description:
          "Meet JPG-only upload requirements on portals that reject HEIC files.",
      },
      {
        title: "Email attachments",
        description:
          "Attach photos in a format every email client and recipient can open.",
      },
    ],
    faqs: [
      {
        question: "How to convert HEIC to JPG free online?",
        answer:
          "Upload your HEIC file, choose JPG or PNG output, click convert, and download instantly. No account required.",
      },
      {
        question: "Why can't Windows open iPhone photos?",
        answer:
          "iPhones save photos as HEIC by default. Windows needs a codec or converter — this tool converts HEIC to JPG in your browser.",
      },
      {
        question: "Is HEIC to JPG conversion safe?",
        answer:
          "Yes with WorkUtilities — conversion is client-side only. Your photo never leaves your browser.",
      },
      {
        question: "Should I convert to JPG or PNG?",
        answer:
          "Choose JPG for smaller file size and photos. Choose PNG if you need lossless quality or transparency.",
      },
      {
        question: "Does this work on Android?",
        answer:
          "Yes. Open this page in Chrome or any modern mobile browser and convert HEIC files from your gallery or files app.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-heic-to-jpg-on-windows",
      title: "How to convert HEIC to JPG on Windows — free",
    },
  },
  "webp-to-jpg": {
    aboutTitle: "About WebP to JPG Converter",
    aboutParagraphs: [
      "Our free WebP to JPG converter changes modern WebP images into JPG or PNG files that work everywhere. WebP offers excellent compression for websites, but many desktop apps, older software, and upload portals still require traditional formats.",
      "Conversion uses the Canvas API in your browser — fast, private, and with no server upload. Your images stay on your device throughout the process.",
      "Useful for designers, developers, students, and anyone in India who downloaded a WebP image from the web and needs to open it in Paint, Photoshop, or upload it to a form that only accepts JPG or PNG.",
    ],
    whenToUseTitle: "When Should You Use WebP to JPG?",
    useCases: [
      {
        title: "Opening WebP in older software",
        description:
          "Convert WebP downloads to JPG for apps that do not support WebP natively.",
      },
      {
        title: "Website asset conversion",
        description:
          "Turn WebP graphics into JPG or PNG for clients or print workflows.",
      },
      {
        title: "Form uploads",
        description:
          "Meet JPG-only requirements on government and college portals.",
      },
      {
        title: "Social media posts",
        description:
          "Convert WebP images before uploading to platforms that prefer JPG.",
      },
      {
        title: "Email and documents",
        description:
          "Embed converted images in Word, PowerPoint, or PDF attachments.",
      },
    ],
    faqs: [
      {
        question: "How to convert WebP to JPG free?",
        answer:
          "Upload your WebP file, select JPG or PNG, click convert, and download. The entire process runs in your browser.",
      },
      {
        question: "What is WebP format?",
        answer:
          "WebP is a modern image format developed by Google. It compresses well but is not supported by all apps and upload portals.",
      },
      {
        question: "WebP to JPG or PNG — which is better?",
        answer:
          "JPG is smaller and ideal for photos. PNG is lossless and better for graphics with sharp edges or transparency.",
      },
      {
        question: "Is WebP conversion private?",
        answer:
          "Yes. WorkUtilities processes WebP files locally in your browser — nothing is uploaded to a server.",
      },
      {
        question: "Can I convert multiple WebP files?",
        answer:
          "Convert one file at a time on this page. For batch JPG/PNG/WebP conversion, try our Image Converter tool.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-webp-to-jpg",
      title: "How to convert WebP to JPG online free",
    },
  },
  "excel-to-pdf": {
    aboutTitle: "About Excel to PDF Converter",
    aboutParagraphs: [
      "Our free Excel to PDF converter turns .xlsx and .xls spreadsheets into shareable PDF documents. Each worksheet becomes a section in the PDF, making it easy to send reports, invoices, and data tables without worrying about the recipient's Excel version.",
      "Conversion runs in your browser using client-side libraries. Your spreadsheet data is never uploaded to any server — ideal for salary sheets, financial reports, and confidential business data.",
      "Built for Indian professionals sharing monthly reports with managers, students submitting assignment data, freelancers sending invoices, and anyone uploading spreadsheets to portals that only accept PDF format.",
    ],
    whenToUseTitle: "When Should You Use Excel to PDF?",
    useCases: [
      {
        title: "Sharing reports",
        description:
          "Send Excel reports as PDF so recipients see the same layout on any device.",
      },
      {
        title: "Job and college submissions",
        description:
          "Convert assignment spreadsheets to PDF before uploading to LMS portals.",
      },
      {
        title: "Invoice sharing",
        description:
          "Turn Excel invoice templates into PDF for clients and accountants.",
      },
      {
        title: "Archiving data",
        description:
          "Save spreadsheet snapshots as PDF for long-term records.",
      },
      {
        title: "Government uploads",
        description:
          "Meet PDF-only requirements when portals reject Excel attachments.",
      },
    ],
    faqs: [
      {
        question: "How to convert Excel to PDF free online?",
        answer:
          "Upload your .xlsx or .xls file, click Convert to PDF, and download instantly. No signup required.",
      },
      {
        question: "Are all sheets included in the PDF?",
        answer:
          "Yes. Each worksheet in your Excel file is converted and included in the output PDF.",
      },
      {
        question: "Will formatting be preserved?",
        answer:
          "Text and basic table structure are preserved. Complex formatting, charts, and embedded images may not render perfectly.",
      },
      {
        question: "Is Excel to PDF conversion safe?",
        answer:
          "Yes with WorkUtilities — your file is processed locally in your browser and never sent to a server.",
      },
      {
        question: "What Excel formats are supported?",
        answer:
          "Both .xlsx (Excel 2007+) and .xls (older Excel format) files up to 20MB are supported.",
      },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-excel-to-pdf-free",
      title: "How to convert Excel to PDF online free",
    },
  },
  "ppt-to-pdf": {
    aboutTitle: "About PPT to PDF Converter",
    aboutParagraphs: [
      "Our free PPT to PDF converter turns PowerPoint presentations into shareable PDF documents. Each slide becomes a PDF page with extracted text content — ideal for sending presentations to clients, professors, or colleagues who may not have PowerPoint installed.",
      "Conversion runs entirely in your browser using JSZip and jsPDF. Your presentation never leaves your device, keeping business decks, college project slides, and confidential materials private.",
      "Built for Indian students submitting presentation assignments, professionals sharing pitch decks, and teachers distributing lecture slides. Note: this tool extracts text from .pptx files — images, animations, and complex layouts may not appear in the PDF.",
    ],
    whenToUseTitle: "When Should You Use PPT to PDF?",
    useCases: [
      { title: "Sharing presentations", description: "Send slides as PDF so anyone can open them without PowerPoint." },
      { title: "College submissions", description: "Upload presentation assignments to LMS portals that accept PDF only." },
      { title: "Client deliverables", description: "Share pitch decks and reports in a universal, non-editable format." },
      { title: "Printing slides", description: "Convert to PDF before printing handouts or lecture notes." },
      { title: "Archiving decks", description: "Save presentation text content as PDF for long-term records." },
    ],
    faqs: [
      { question: "How to convert PPT to PDF free online?", answer: "Upload your .pptx file, click Convert to PDF, and download instantly. No account required." },
      { question: "Does this support .ppt files?", answer: "Only .pptx (modern PowerPoint format) is supported in the browser. Save legacy .ppt files as .pptx first." },
      { question: "Are images included in the PDF?", answer: "This tool extracts slide text. Images, charts, and animations are not rendered in the output PDF." },
      { question: "Is PPT to PDF conversion safe?", answer: "Yes with WorkUtilities — your file is processed locally in your browser and never uploaded to a server." },
      { question: "How many slides can I convert?", answer: "There is no slide limit. Files up to 50MB are supported." },
    ],
    blogGuide: {
      href: "/blog/how-to-convert-ppt-to-pdf-free",
      title: "How to convert PowerPoint to PDF online free",
    },
  },
  "json-formatter": {
    aboutTitle: "About JSON Formatter Tool",
    aboutParagraphs: [
      "Our free JSON Formatter beautifies, validates, and minifies JSON data instantly. Paste messy API responses, config files, or debug output and get clean, readable JSON with proper indentation.",
      "Everything runs in your browser — no data is sent to any server. That makes it safe for API keys, internal configs, and production JSON payloads you need to inspect quickly.",
      "Essential for Indian developers, DevOps engineers, students learning APIs, and anyone working with JSON from REST APIs, Firebase, MongoDB exports, or package.json files.",
    ],
    whenToUseTitle: "When Should You Use JSON Formatter?",
    useCases: [
      { title: "API debugging", description: "Format API responses to find errors and understand nested data." },
      { title: "Config files", description: "Beautify JSON configs before committing to version control." },
      { title: "Minifying JSON", description: "Remove whitespace for production API payloads." },
      { title: "Validating JSON", description: "Check if a JSON string is valid before using it in code." },
      { title: "Learning JSON", description: "Understand JSON structure with readable indentation." },
    ],
    faqs: [
      { question: "How to format JSON online free?", answer: "Paste your JSON in the input panel. Valid JSON is automatically formatted with proper indentation." },
      { question: "How to minify JSON?", answer: "Click the Minify button to remove all whitespace and compress your JSON to a single line." },
      { question: "How to check if JSON is valid?", answer: "Paste your JSON — a green 'Valid JSON' indicator appears when syntax is correct. Errors show the exact problem." },
      { question: "Is my JSON data safe?", answer: "Yes. All processing happens locally in your browser. Nothing is uploaded." },
      { question: "What JSON features are supported?", answer: "Standard JSON syntax including objects, arrays, strings, numbers, booleans, and null values." },
    ],
    blogGuide: {
      href: "/blog/how-to-format-json-online-free",
      title: "How to format and validate JSON online free",
    },
  },
  "color-picker": {
    aboutTitle: "About Color Picker Tool",
    aboutParagraphs: [
      "Our free Color Picker lets you select any color and instantly get HEX, RGB, and HSL values. Perfect for web designers, developers, and content creators who need exact color codes for CSS, Figma, or brand guidelines.",
      "All conversions happen in your browser with no server upload. Save up to 10 colors to your palette for quick access during a design session.",
      "Useful for Indian freelancers building websites, students working on UI projects, social media creators matching brand colors, and anyone converting between color formats.",
    ],
    whenToUseTitle: "When Should You Use Color Picker?",
    useCases: [
      { title: "Web development", description: "Get HEX and RGB values for CSS stylesheets and Tailwind config." },
      { title: "Design handoff", description: "Convert colors between HEX, RGB, and HSL for design-to-dev workflows." },
      { title: "Brand colors", description: "Save and reuse brand palette colors across projects." },
      { title: "Social media graphics", description: "Match exact colors for Canva, Instagram, or YouTube thumbnails." },
      { title: "Accessibility checks", description: "Adjust HSL lightness to improve text contrast on backgrounds." },
    ],
    faqs: [
      { question: "How to convert HEX to RGB?", answer: "Enter a HEX code or use the color picker — RGB values update automatically." },
      { question: "How to convert RGB to HEX?", answer: "Adjust the R, G, B sliders or inputs and the HEX code updates in real time." },
      { question: "What is HSL color format?", answer: "HSL stands for Hue, Saturation, Lightness — useful for adjusting color brightness without changing the hue." },
      { question: "Can I save colors?", answer: "Yes. Click 'Save current color' to add up to 10 colors to your palette." },
      { question: "Is the color picker free?", answer: "Yes. WorkUtilities Color Picker is completely free with no signup." },
    ],
    blogGuide: {
      href: "/blog/design-tools-for-developers-guide",
      title: "Color and design tools every developer needs",
    },
  },
  "markdown-to-html": {
    aboutTitle: "About Markdown to HTML Converter",
    aboutParagraphs: [
      "Our free Markdown to HTML converter transforms Markdown syntax into clean HTML with a live preview. Write headings, lists, code blocks, and links in Markdown and see the rendered output instantly.",
      "Conversion uses the marked library in your browser. Your content stays private on your device — ideal for blog drafts, README files, and documentation you do not want to send to third-party servers.",
      "Perfect for Indian developers writing GitHub READMEs, technical bloggers drafting posts, students formatting assignments, and anyone converting Markdown notes to HTML for CMS uploads.",
    ],
    whenToUseTitle: "When Should You Use Markdown to HTML?",
    useCases: [
      { title: "Blog writing", description: "Draft in Markdown and copy HTML for WordPress or CMS editors." },
      { title: "README files", description: "Preview how GitHub-flavored Markdown renders before pushing." },
      { title: "Documentation", description: "Convert Markdown docs to HTML for internal wikis or help pages." },
      { title: "Email templates", description: "Generate HTML from Markdown for newsletter content." },
      { title: "Learning HTML", description: "See how Markdown syntax maps to HTML elements." },
    ],
    faqs: [
      { question: "How to convert Markdown to HTML free?", answer: "Type or paste Markdown in the left panel. HTML is generated in real time. Click Copy HTML to get the output." },
      { question: "What Markdown syntax is supported?", answer: "Standard Markdown including headings, bold, italic, lists, code blocks, blockquotes, and links." },
      { question: "Can I preview the rendered output?", answer: "Yes. Switch to the Preview tab to see how your Markdown looks when rendered." },
      { question: "Is Markdown conversion private?", answer: "Yes. All conversion happens locally in your browser." },
      { question: "Can I copy just the text content?", answer: "Yes. Use 'Copy Preview Text' to copy the rendered text without HTML tags." },
    ],
    blogGuide: {
      href: "/blog/design-tools-for-developers-guide",
      title: "Color and design tools every developer needs",
    },
  },
  "base64": {
    aboutTitle: "About Base64 Encoder Decoder",
    aboutParagraphs: [
      "Our free Base64 tool encodes and decodes text and files instantly. Convert strings to Base64 for APIs, data URIs, and email attachments — or decode Base64 back to readable text.",
      "All processing runs in your browser. Text and files never leave your device, making it safe for tokens, credentials, and sensitive data you need to encode or inspect.",
      "Essential for Indian developers working with REST APIs, JWT tokens, image data URIs, email MIME encoding, and anyone debugging Base64 strings from logs or API responses.",
    ],
    whenToUseTitle: "When Should You Use Base64?",
    useCases: [
      { title: "API development", description: "Encode authorization headers and payload data for API testing." },
      { title: "Data URIs", description: "Encode small images or files as Base64 for inline HTML embedding." },
      { title: "Debugging", description: "Decode Base64 strings from logs to read the original content." },
      { title: "File encoding", description: "Convert any file up to 5MB to Base64 text." },
      { title: "Email MIME", description: "Encode text content for email attachment workflows." },
    ],
    faqs: [
      { question: "How to encode text to Base64?", answer: "Select Encode mode, paste your text, and the Base64 output appears instantly. Click Copy Output." },
      { question: "How to decode Base64?", answer: "Select Decode mode, paste the Base64 string, and the original text appears in the output panel." },
      { question: "Can I encode files to Base64?", answer: "Yes. In Encode mode, switch to File input and upload any file up to 5MB." },
      { question: "Is Base64 encoding reversible?", answer: "Yes. Base64 is a encoding scheme, not encryption. Decoding always recovers the original data." },
      { question: "Is Base64 conversion safe online?", answer: "Yes with WorkUtilities — all encoding and decoding happens locally in your browser." },
    ],
    blogGuide: {
      href: "/blog/base64-encode-decode-guide",
      title: "Base64 encode and decode complete guide",
    },
  },
  "url-encoder": {
    aboutTitle: "About URL Encoder Decoder",
    aboutParagraphs: [
      "Our free URL Encoder converts special characters in URLs and text to percent-encoded format (e.g. spaces become %20). Decode encoded URLs back to readable text instantly.",
      "Supports both encodeURIComponent (for URL components like query parameters) and encodeURI (for full URLs). Everything runs in your browser — no data is sent to any server.",
      "Essential for Indian developers building web apps, API integrations, form submissions, and anyone fixing broken links with special characters in Hindi or Unicode text.",
    ],
    whenToUseTitle: "When Should You Use URL Encoder?",
    useCases: [
      { title: "Query parameters", description: "Encode search terms and form values for safe URL usage." },
      { title: "API requests", description: "Encode special characters in REST API URLs and parameters." },
      { title: "Fixing broken links", description: "Decode percent-encoded URLs to read the original text." },
      { title: "Email links", description: "Encode URLs with spaces or special characters for email templates." },
      { title: "Web development", description: "Test encodeURIComponent vs encodeURI behavior quickly." },
    ],
    faqs: [
      { question: "How to encode a URL online free?", answer: "Paste your text, choose Encode mode, select Component or Full URI, and copy the output instantly." },
      { question: "What is percent encoding?", answer: "Percent encoding replaces unsafe URL characters with % followed by two hex digits. Spaces become %20." },
      { question: "encodeURI vs encodeURIComponent?", answer: "encodeURIComponent encodes more characters — use for query values. encodeURI preserves URL structure characters like / and ?." },
      { question: "How to decode a URL?", answer: "Switch to Decode mode, paste the encoded string, and the original text appears in the output panel." },
      { question: "Is URL encoding safe online?", answer: "Yes with WorkUtilities — all encoding happens locally in your browser." },
    ],
    blogGuide: {
      href: "/blog/developer-data-encoding-tools-guide",
      title: "5 essential data encoding tools for developers",
    },
  },
  "text-case-converter": {
    aboutTitle: "About Text Case Converter",
    aboutParagraphs: [
      "Our free Text Case Converter transforms text into 11 different case formats simultaneously — uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more.",
      "Type or paste once and see all formats update in real time. Copy any format with one click. Perfect for variable naming, content formatting, and code generation.",
      "Built for Indian developers, content writers, students, and SEO professionals who need quick text transformations without installing desktop tools.",
    ],
    whenToUseTitle: "When Should You Use Text Case Converter?",
    useCases: [
      { title: "Variable naming", description: "Convert text to camelCase, PascalCase, or snake_case for code." },
      { title: "Content formatting", description: "Apply title case or sentence case to headings and paragraphs." },
      { title: "File naming", description: "Generate kebab-case or dot.case filenames from plain text." },
      { title: "Constants", description: "Create CONSTANT_CASE for environment variables and config keys." },
      { title: "Path segments", description: "Convert titles to path/case for URL slugs." },
    ],
    faqs: [
      { question: "How to convert text to uppercase online?", answer: "Paste your text and the UPPERCASE card updates instantly. Click the copy button on any card." },
      { question: "What is camelCase?", answer: "camelCase joins words without spaces, capitalizing all except the first word. Example: helloWorld." },
      { question: "How to convert to snake_case?", answer: "Paste your text — the snake_case card shows words joined by underscores automatically." },
      { question: "Does it support multiple formats at once?", answer: "Yes. All 11 case formats update simultaneously as you type." },
      { question: "Is the text case converter free?", answer: "Yes. WorkUtilities Text Case Converter is completely free with no signup." },
    ],
    blogGuide: {
      href: "/blog/writing-seo-tools-for-content-creators",
      title: "Free writing and SEO tools for content creators",
    },
  },
  "lorem-ipsum": {
    aboutTitle: "About Lorem Ipsum Generator",
    aboutParagraphs: [
      "Our free Lorem Ipsum Generator creates placeholder text for website mockups, design comps, and document templates. Choose paragraphs, sentences, or individual words.",
      "Generate classic lorem ipsum text that starts with 'Lorem ipsum dolor sit amet' or fully random Latin-style placeholder words. Copy the output with one click.",
      "Perfect for Indian designers, developers, students, and agencies filling layout templates before real content is ready.",
    ],
    whenToUseTitle: "When Should You Use Lorem Ipsum Generator?",
    useCases: [
      { title: "Website mockups", description: "Fill hero sections, cards, and footers with realistic placeholder text." },
      { title: "Design presentations", description: "Show clients how layouts look with proper text density." },
      { title: "Document templates", description: "Add filler paragraphs to Word or PDF templates." },
      { title: "Typography testing", description: "Test fonts and line heights with varied paragraph lengths." },
      { title: "College projects", description: "Populate UI assignments and portfolio projects quickly." },
    ],
    faqs: [
      { question: "How to generate lorem ipsum free?", answer: "Choose paragraphs, sentences, or words, set the count, and click Generate. Text is created instantly." },
      { question: "What is lorem ipsum?", answer: "Lorem ipsum is standard placeholder text used in design and publishing since the 1500s. It has no meaningful content." },
      { question: "How many paragraphs can I generate?", answer: "Up to 20 paragraphs, 50 sentences, or 500 words per generation." },
      { question: "Can I start with 'Lorem ipsum'?", answer: "Yes. Keep the checkbox enabled to always begin with the classic opening phrase." },
      { question: "Is lorem ipsum generator free?", answer: "Yes. WorkUtilities Lorem Ipsum Generator is free with unlimited generations." },
    ],
    blogGuide: {
      href: "/blog/useful-text-utility-tools-guide",
      title: "Lorem Ipsum, number to words, text diff, and Morse code explained",
    },
  },
  "aspect-ratio": {
    aboutTitle: "About Aspect Ratio Calculator",
    aboutParagraphs: [
      "Our free Aspect Ratio Calculator finds the simplified ratio from width and height, or calculates missing dimensions from a known ratio. Essential for image resizing, video production, and responsive design.",
      "Includes common presets like 16:9 (YouTube), 9:16 (Reels), 1:1 (Instagram), and 4:5 (portrait). Visual preview shows the shape of your current ratio.",
      "Built for Indian content creators, photographers, web designers, and students working on video, social media, and image optimization projects.",
    ],
    whenToUseTitle: "When Should You Use Aspect Ratio Calculator?",
    useCases: [
      { title: "YouTube thumbnails", description: "Confirm 16:9 dimensions before uploading custom thumbnails." },
      { title: "Instagram posts", description: "Calculate 1:1 or 4:5 dimensions for feed and portrait posts." },
      { title: "Image resizing", description: "Find the correct height when you know width and target ratio." },
      { title: "Video editing", description: "Set export dimensions for 9:16 vertical or 21:9 cinematic formats." },
      { title: "Responsive design", description: "Calculate container dimensions for CSS aspect-ratio properties." },
    ],
    faqs: [
      { question: "How to calculate aspect ratio?", answer: "Enter width and height in pixels. The simplified ratio (e.g. 16:9) appears instantly." },
      { question: "How to find height from width and ratio?", answer: "Use Calculate Dimensions, enter your ratio and known width. Height is calculated automatically." },
      { question: "What is 16:9 aspect ratio?", answer: "16:9 is widescreen format used for HD TV, YouTube, and most modern displays. 1920×1080 is a common 16:9 resolution." },
      { question: "What ratios are supported?", answer: "Any custom ratio plus presets: 16:9, 4:3, 1:1, 3:2, 9:16, 4:5, 2:1, and 21:9." },
      { question: "Is aspect ratio calculator free?", answer: "Yes. WorkUtilities Aspect Ratio Calculator is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/design-tools-for-developers-guide",
      title: "Color and design tools every developer needs",
    },
  },
  "random-number": {
    aboutTitle: "About Random Number Generator",
    aboutParagraphs: [
      "Our free Random Number Generator creates random integers, number lists, UUIDs, and dice rolls instantly. Customize min, max, count, and uniqueness for lists.",
      "Four modes: Single (one random number), List (multiple numbers), UUID (unique identifiers), and Dice (d4 through d20). All generation uses cryptographically adequate Math.random() in your browser.",
      "Useful for Indian teachers picking random students, developers testing apps, gamers rolling dice, and anyone needing quick random values for contests or simulations.",
    ],
    whenToUseTitle: "When Should You Use Random Number Generator?",
    useCases: [
      { title: "Contests and giveaways", description: "Pick a random winner from a number range." },
      { title: "Testing apps", description: "Generate random test data and UUIDs for development." },
      { title: "Board games", description: "Roll virtual dice when physical dice are not available." },
      { title: "Classroom activities", description: "Randomly select students or generate practice problems." },
      { title: "Unique IDs", description: "Generate UUIDs for database records or session tokens." },
    ],
    faqs: [
      { question: "How to generate random numbers online?", answer: "Choose Single mode, set min and max, click Generate. A random integer appears instantly." },
      { question: "How to generate a list of random numbers?", answer: "Use List mode, set range and count, optionally enable 'No duplicates', then click Generate List." },
      { question: "How to roll dice online?", answer: "Switch to Dice mode, pick d4 through d20, set number of dice, and click Roll Dice." },
      { question: "How to generate a UUID?", answer: "Switch to UUID mode and click Generate UUID. A version 4 UUID is created instantly." },
      { question: "Are random numbers truly random?", answer: "Numbers are generated using JavaScript Math.random() in your browser — suitable for games and testing, not cryptographic security." },
    ],
    blogGuide: {
      href: "/blog/random-number-generator-guide",
      title: "Random number generator online free — any range",
    },
  },
  "tip-calculator": {
    aboutTitle: "About Tip Calculator",
    aboutParagraphs: [
      "Our free Tip Calculator helps you calculate tip amount and split bills between friends instantly. Works with both INR and USD — switch currency from the header toggle.",
      "Select from common tip presets (5%, 10%, 15%, 18%, 20%, 25%) or enter a custom percentage. Split the total among any number of people to see per-person and tip-per-person amounts.",
      "Perfect for restaurant dining, delivery orders, salon visits, and group outings in India and abroad. No app download — works on any phone or desktop browser.",
    ],
    whenToUseTitle: "When Should You Use Tip Calculator?",
    useCases: [
      { title: "Restaurant dining", description: "Calculate 15–20% tip on your bill before paying." },
      { title: "Group outings", description: "Split the total bill and tip evenly among friends." },
      { title: "Delivery orders", description: "Figure out a fair tip for food delivery services." },
      { title: "Travel abroad", description: "Switch to USD and use standard US tipping guidelines." },
      { title: "Quick math", description: "Avoid mental math errors when calculating tips on the go." },
    ],
    faqs: [
      { question: "How much should I tip?", answer: "In the US, 15–20% is standard for restaurants. In India, tipping is optional but 10% is common at upscale restaurants." },
      { question: "How to split a bill with tip?", answer: "Enter the bill amount, choose tip percentage, set number of people, and see per-person totals instantly." },
      { question: "Does it work with INR and USD?", answer: "Yes. Use the currency toggle in the header to switch between ₹ INR and $ USD." },
      { question: "Can I use a custom tip percentage?", answer: "Yes. Click a preset or type any custom percentage in the input field." },
      { question: "Is the tip calculator free?", answer: "Yes. WorkUtilities Tip Calculator is completely free with no signup." },
    ],
    blogGuide: {
      href: "/blog/tip-calculator-guide",
      title: "Tip calculator — how to split a bill and calculate tips fairly",
    },
  },
  "discount-calculator": {
    aboutTitle: "About Discount Calculator",
    aboutParagraphs: [
      "Our free Discount Calculator finds sale prices, discount percentages, and original prices in three modes. Calculate how much you save during sales and shopping.",
      "Three calculation modes: percentage off (original + discount% → final price), find percentage (original + final → discount%), and find original price (final + discount% → original).",
      "Built for shoppers during Amazon sales, Flipkart Big Billion Days, and everyday bargain hunting. Supports INR and USD via the global currency toggle.",
    ],
    whenToUseTitle: "When Should You Use Discount Calculator?",
    useCases: [
      { title: "Online shopping", description: "Verify sale prices during festival sales and flash deals." },
      { title: "Retail bargaining", description: "Calculate the actual discount when a shopkeeper quotes a final price." },
      { title: "Price comparison", description: "Find the original price from a discounted final price." },
      { title: "Business pricing", description: "Set discount percentages and preview final selling prices." },
      { title: "Quick savings check", description: "See exactly how much money you save with quick preset buttons." },
    ],
    faqs: [
      { question: "How to calculate discount percentage?", answer: "Use Find % mode, enter original and final prices, and the discount percentage is calculated automatically." },
      { question: "How to find sale price after discount?", answer: "Use % Off mode, enter original price and discount percentage. Final price and savings appear instantly." },
      { question: "How to find original price from sale price?", answer: "Use Original Price mode, enter the final price and discount percentage to reverse-calculate the original." },
      { question: "What quick discount presets are available?", answer: "5%, 10%, 20%, 25%, 30%, 50%, and 70% — click any preset to apply instantly." },
      { question: "Is the discount calculator free?", answer: "Yes. WorkUtilities Discount Calculator is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/discount-calculator-guide",
      title: "Discount calculator online free — sale price and savings",
    },
  },
  "binary-converter": {
    aboutTitle: "About Binary Converter",
    aboutParagraphs: [
      "Our free Binary Converter converts between binary, decimal, hexadecimal, and octal number systems instantly. Type in any base and all four formats update in real time.",
      "Built for computer science students, developers, and electronics engineers who work with different number bases daily. All conversion runs locally in your browser.",
      "Features copy buttons for each format, input validation with helpful error messages, and clickable example numbers for quick testing.",
    ],
    whenToUseTitle: "When Should You Use Binary Converter?",
    useCases: [
      { title: "Programming", description: "Convert between hex color codes and decimal values." },
      { title: "Computer science", description: "Practice binary, octal, and hex conversions for exams." },
      { title: "Networking", description: "Convert IP address octets and subnet masks between formats." },
      { title: "Embedded systems", description: "Work with register values in different number bases." },
      { title: "Debugging", description: "Decode hex dumps and binary flags during development." },
    ],
    faqs: [
      { question: "How to convert decimal to binary?", answer: "Enter a decimal number in the Decimal card. Binary, hex, and octal values update automatically." },
      { question: "How to convert hex to decimal?", answer: "Type a hex value (0–9, A–F) in the Hexadecimal card. All other formats convert instantly." },
      { question: "What characters are valid for each base?", answer: "Binary: 0–1, Octal: 0–7, Decimal: 0–9, Hex: 0–9 and A–F." },
      { question: "Can I copy converted values?", answer: "Yes. Click the copy button on any card to copy that format to your clipboard." },
      { question: "Is binary conversion free online?", answer: "Yes. WorkUtilities Binary Converter is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/developer-data-encoding-tools-guide",
      title: "5 essential data encoding tools for developers",
    },
  },
  "hash-generator": {
    aboutTitle: "About Hash Generator",
    aboutParagraphs: [
      "Our free Hash Generator creates MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files instantly. All four algorithms run simultaneously in your browser.",
      "Text input hashes in real time as you type. Upload a file to hash its contents. Copy any hash format with one click. No data is sent to any server.",
      "Essential for Indian developers verifying file integrity, testing API checksums, debugging authentication flows, and learning how hash functions work.",
    ],
    whenToUseTitle: "When Should You Use Hash Generator?",
    useCases: [
      { title: "File integrity", description: "Generate SHA-256 checksums to verify downloaded files." },
      { title: "API development", description: "Test hash-based authentication and signature verification." },
      { title: "Password hashing demo", description: "Understand how hash functions transform input (not for production passwords)." },
      { title: "Debugging", description: "Compare hash outputs when troubleshooting data pipelines." },
      { title: "Learning", description: "See how MD5, SHA-1, SHA-256, and SHA-512 differ for the same input." },
    ],
    faqs: [
      { question: "How to generate SHA-256 hash online?", answer: "Type your text in the input area. All four hashes including SHA-256 appear instantly." },
      { question: "How to hash a file?", answer: "Click 'Or hash a file', select your file, then click Generate Hashes." },
      { question: "Is MD5 safe for passwords?", answer: "No. MD5 and SHA-1 are not recommended for security. Use SHA-256 or SHA-512 for cryptographic purposes." },
      { question: "Are hashes reversible?", answer: "No. Hash functions are one-way — you cannot recover the original text from a hash." },
      { question: "Is hash generation private?", answer: "Yes. All hashing happens locally in your browser. Text and files never leave your device." },
    ],
    blogGuide: {
      href: "/blog/md5-sha256-hash-generator-guide",
      title: "MD5 vs SHA-256 hash generator guide",
    },
  },
  "number-to-words": {
    aboutTitle: "About Number to Words Converter",
    aboutParagraphs: [
      "Our free Number to Words Converter spells out numbers in English using Indian (crore, lakh) or International (billion, million) number systems.",
      "Live comma formatting as you type — Indian style (1,00,000) or International style (100,000). Optional currency suffix adds Rupees or Dollars based on your currency setting.",
      "Perfect for writing cheques, invoices, legal documents, and formal letters in India. Supports numbers up to 9,99,99,99,999 in Indian system.",
    ],
    whenToUseTitle: "When Should You Use Number to Words?",
    useCases: [
      { title: "Cheque writing", description: "Spell out amounts on bank cheques in words." },
      { title: "Invoices", description: "Add amount in words to formal invoices and receipts." },
      { title: "Legal documents", description: "Write property values and contract amounts in words." },
      { title: "Education", description: "Learn Indian and International number naming systems." },
      { title: "Formal letters", description: "Convert large numbers to words for official correspondence." },
    ],
    faqs: [
      { question: "How to convert number to words in Indian system?", answer: "Select Indian System, type your number, and see words with crore and lakh units." },
      { question: "What is the difference between Indian and International?", answer: "Indian uses crore (10 million) and lakh (100 thousand). International uses billion and million." },
      { question: "Can I add Rupees or Dollars suffix?", answer: "Yes. Enable the currency suffix checkbox to append Rupees (INR) or Dollars (USD)." },
      { question: "What is the maximum number supported?", answer: "Indian system: up to 9,99,99,99,999. International: up to 999,999,999,999." },
      { question: "Is number to words converter free?", answer: "Yes. WorkUtilities Number to Words is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/useful-text-utility-tools-guide",
      title: "Lorem Ipsum, number to words, text diff, and Morse code explained",
    },
  },
  "pomodoro-timer": {
    aboutTitle: "About Pomodoro Timer",
    aboutParagraphs: [
      "Our free Pomodoro Timer helps you work in focused 25-minute sessions with short and long breaks. The Pomodoro Technique boosts productivity by balancing deep work with regular rest.",
      "Customize work duration, break lengths, and sessions before a long break. Visual circular progress, session tracking, and audio notifications keep you on schedule.",
      "Perfect for students, remote workers, freelancers, and anyone who struggles with distractions. No app install — works in any browser on phone or desktop.",
    ],
    whenToUseTitle: "When Should You Use Pomodoro Timer?",
    useCases: [
      { title: "Deep work", description: "Focus on coding, writing, or studying without distractions." },
      { title: "Exam preparation", description: "Break revision into manageable 25-minute blocks." },
      { title: "Remote work", description: "Structure your workday with timed focus and break cycles." },
      { title: "Creative projects", description: "Maintain momentum on design, content, or art projects." },
      { title: "Avoiding burnout", description: "Take regular breaks to stay fresh throughout the day." },
    ],
    faqs: [
      { question: "What is the Pomodoro Technique?", answer: "Work for 25 minutes, take a 5-minute break, repeat. After 4 sessions, take a longer 15-minute break." },
      { question: "Can I customize timer durations?", answer: "Yes. Open Settings to change work, short break, long break, and sessions before long break." },
      { question: "Does the timer work in the background?", answer: "Yes. The browser tab title shows remaining time. Keep the tab open for accurate timing." },
      { question: "Is there a sound when the timer ends?", answer: "Yes. A short beep plays when each session completes." },
      { question: "Is the Pomodoro timer free?", answer: "Yes. WorkUtilities Pomodoro Timer is completely free with no signup." },
    ],
    blogGuide: {
      href: "/blog/pomodoro-technique-timer-guide",
      title: "The Pomodoro Technique — how to use a focus timer",
    },
  },
  stopwatch: {
    aboutTitle: "About Online Stopwatch",
    aboutParagraphs: [
      "Our free online Stopwatch provides precise timing with centisecond accuracy and unlimited lap recording. Start, stop, lap, and reset instantly in your browser.",
      "Lap times are displayed in a sortable table with fastest and slowest laps highlighted. View total time, lap count, and statistics when stopped.",
      "Ideal for workouts, cooking, presentations, experiments, and any activity where you need accurate split times without installing an app.",
    ],
    whenToUseTitle: "When Should You Use Stopwatch?",
    useCases: [
      { title: "Fitness training", description: "Time intervals and record lap splits during workouts." },
      { title: "Cooking", description: "Track multiple dishes with lap times for each step." },
      { title: "Presentations", description: "Practice and time each section of your talk." },
      { title: "Sports", description: "Record split times for running, swimming, or cycling." },
      { title: "Experiments", description: "Measure precise durations in lab or DIY projects." },
    ],
    faqs: [
      { question: "How accurate is the online stopwatch?", answer: "The stopwatch updates every 10ms, displaying centiseconds (hundredths of a second)." },
      { question: "How to record lap times?", answer: "Click Start, then press Lap while running. Each lap records split and total time." },
      { question: "Can I see fastest and slowest laps?", answer: "Yes. Fastest lap is highlighted green and slowest in red when you have multiple laps." },
      { question: "How to reset the stopwatch?", answer: "Stop the timer first, then click Reset to clear time and laps." },
      { question: "Is the stopwatch free online?", answer: "Yes. WorkUtilities Stopwatch is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/online-stopwatch-guide",
      title: "Online stopwatch with lap timer guide",
    },
  },
  "csv-to-json": {
    aboutTitle: "About CSV to JSON Converter",
    aboutParagraphs: [
      "Our free CSV to JSON Converter transforms comma-separated data into formatted JSON instantly. Paste CSV text or upload a .csv file — no server upload required.",
      "Auto-detect delimiter, support for comma, semicolon, tab, and pipe separators. Toggle header row and whitespace trimming. Preview results as JSON or HTML table.",
      "Built for Indian developers, data analysts, and students working with spreadsheet exports from Excel, Google Sheets, and government portals.",
    ],
    whenToUseTitle: "When Should You Use CSV to JSON?",
    useCases: [
      { title: "API development", description: "Convert CSV test data to JSON for API payloads." },
      { title: "Data migration", description: "Transform spreadsheet exports for database imports." },
      { title: "Quick inspection", description: "Preview CSV structure as a formatted table." },
      { title: "Config files", description: "Convert tabular config data to JSON format." },
      { title: "Learning", description: "Understand how CSV maps to JSON objects." },
    ],
    faqs: [
      { question: "How to convert CSV to JSON online?", answer: "Paste your CSV data or upload a file. JSON output appears instantly on the right panel." },
      { question: "Does it handle quoted commas?", answer: "Yes. Values wrapped in double quotes are parsed correctly, including commas inside quotes." },
      { question: "Can I change the delimiter?", answer: "Yes. Use Auto-detect or manually select comma, semicolon, tab, or pipe." },
      { question: "Is my CSV data uploaded to a server?", answer: "No. All conversion happens locally in your browser." },
      { question: "Is CSV to JSON conversion free?", answer: "Yes. WorkUtilities CSV to JSON is free with no file limits." },
    ],
    blogGuide: {
      href: "/blog/developer-data-encoding-tools-guide",
      title: "5 essential data encoding tools for developers",
    },
  },
  "text-diff": {
    aboutTitle: "About Text Diff Checker",
    aboutParagraphs: [
      "Our free Text Diff Checker compares two texts and highlights added, removed, and unchanged lines. Use split view or unified diff format.",
      "Auto-compare as you type with 500ms debounce, or click Compare for instant results. Line numbers and color-coded highlights make differences easy to spot.",
      "Essential for developers reviewing code changes, writers comparing document versions, and students checking assignment edits.",
    ],
    whenToUseTitle: "When Should You Use Text Diff?",
    useCases: [
      { title: "Code review", description: "Compare two versions of code snippets or config files." },
      { title: "Document editing", description: "See what changed between two drafts of text." },
      { title: "Plagiarism check", description: "Quickly spot differences between two similar texts." },
      { title: "Data validation", description: "Verify that two text exports match or find discrepancies." },
      { title: "Learning Git", description: "Understand how diff output shows changes between versions." },
    ],
    faqs: [
      { question: "How to compare two texts online?", answer: "Paste original text on the left and modified text on the right. Differences highlight automatically." },
      { question: "What is split vs unified view?", answer: "Split shows original and modified side by side. Unified shows all changes in one column with + and - prefixes." },
      { question: "Does it compare line by line?", answer: "Yes. The diff algorithm compares texts line by line using longest common subsequence." },
      { question: "Is my text sent to a server?", answer: "No. All comparison runs locally in your browser." },
      { question: "Is text diff checker free?", answer: "Yes. WorkUtilities Text Diff is free with no character limits." },
    ],
    blogGuide: {
      href: "/blog/useful-text-utility-tools-guide",
      title: "Lorem Ipsum, number to words, text diff, and Morse code explained",
    },
  },
  "hra-calculator": {
    aboutTitle: "About HRA Calculator",
    aboutParagraphs: [
      "Our free HRA Calculator computes House Rent Allowance exemption and taxable amount as per Section 10(13A) of the Indian Income Tax Act.",
      "Enter basic salary, DA, HRA received, rent paid, and metro/non-metro city. See the three exemption conditions and which minimum applies.",
      "Essential for salaried employees in India planning taxes, filing returns, and comparing old vs new tax regime HRA benefits.",
    ],
    whenToUseTitle: "When Should You Use HRA Calculator?",
    useCases: [
      { title: "Tax planning", description: "Estimate how much HRA is exempt before the financial year ends." },
      { title: "Salary negotiation", description: "Understand tax impact of HRA component in your CTC." },
      { title: "ITR filing", description: "Verify exempt HRA amount for income tax return." },
      { title: "Rent receipts", description: "Cross-check HRA exemption with monthly rent paid." },
      { title: "Metro vs non-metro", description: "See how 50% vs 40% rule affects your exemption." },
    ],
    faqs: [
      { question: "How is HRA exemption calculated?", answer: "Exemption is the minimum of: actual HRA received, 50%/40% of Basic+DA, and rent paid minus 10% of Basic+DA." },
      { question: "Which cities are metro for HRA?", answer: "Mumbai, Delhi, Kolkata, and Chennai are metro cities (50% rule). All others use 40%." },
      { question: "Do I need rent receipts for HRA?", answer: "Yes, for HRA above ₹3,000/month you typically need rent receipts and landlord PAN for claims above ₹1 lakh annually." },
      { question: "Can I claim HRA if I live with parents?", answer: "Yes, if you pay rent to parents and have proper rent receipts. The rent must be genuine and documented." },
      { question: "Is HRA calculator free?", answer: "Yes. WorkUtilities HRA Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/hra-exemption-calculator-guide",
      title: "HRA exemption calculator — how to claim HRA in India",
    },
  },
  "character-counter": {
    aboutTitle: "About Character Counter",
    aboutParagraphs: [
      "Our free Character Counter counts characters, words, sentences, and paragraphs in real time as you type. Perfect for essays, social media posts, meta descriptions, and SEO content limits.",
      "All counting happens in your browser — your text never leaves your device. No signup, no limits, and instant results.",
      "Built for students, writers, marketers, and developers who need accurate text statistics for assignments, tweets, LinkedIn posts, and website copy.",
    ],
    whenToUseTitle: "When Should You Use Character Counter?",
    useCases: [
      { title: "Essay limits", description: "Stay within character or word limits for school and college assignments." },
      { title: "Social media", description: "Count characters for Twitter/X, Instagram captions, and LinkedIn posts." },
      { title: "SEO meta tags", description: "Keep title tags and meta descriptions within recommended lengths." },
      { title: "Content writing", description: "Track paragraph and sentence counts for readability." },
      { title: "Translation work", description: "Compare character counts between source and translated text." },
    ],
    faqs: [
      { question: "How do I count characters online?", answer: "Paste or type your text. Character, word, sentence, and paragraph counts update instantly." },
      { question: "Does it count spaces?", answer: "Yes. We show both total characters and characters without spaces." },
      { question: "Is character counter free?", answer: "Yes. WorkUtilities Character Counter is completely free with no signup." },
      { question: "Is my text private?", answer: "Yes. All counting happens locally in your browser. Nothing is uploaded." },
      { question: "What's the difference from Word Counter?", answer: "Character Counter focuses on character and paragraph stats. Word Counter also shows reading time." },
    ],
    blogGuide: {
      href: "/blog/writing-seo-tools-for-content-creators",
      title: "Free writing and SEO tools for content creators",
    },
  },
  "bmi-calculator": {
    aboutTitle: "About BMI Calculator",
    aboutParagraphs: [
      "Our free BMI Calculator computes your Body Mass Index using metric (kg/cm) or imperial (lbs/inches) units. Get instant BMI value, category, and healthy weight range.",
      "BMI is a widely used screening tool for weight categories. Results include a visual scale showing where you fall across underweight, normal, overweight, and obese ranges.",
      "Useful for health awareness, fitness planning, and general wellness tracking. Remember BMI does not account for muscle mass or body composition.",
    ],
    whenToUseTitle: "When Should You Use BMI Calculator?",
    useCases: [
      { title: "Health check", description: "Get a quick BMI reading for general wellness awareness." },
      { title: "Fitness goals", description: "Track BMI changes alongside diet and exercise programs." },
      { title: "Medical forms", description: "Calculate BMI before filling health or insurance forms." },
      { title: "Weight planning", description: "See your healthy weight range based on height." },
      { title: "Unit conversion", description: "Switch between metric and imperial units easily." },
    ],
    faqs: [
      { question: "How is BMI calculated?", answer: "Metric: weight (kg) ÷ height (m)². Imperial: (weight in lbs ÷ height in inches²) × 703." },
      { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered normal weight for adults." },
      { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in muscular people. It does not distinguish muscle from fat." },
      { question: "Can I use kg and cm?", answer: "Yes. Select Metric mode for kilograms and centimeters." },
      { question: "Is BMI calculator free?", answer: "Yes. WorkUtilities BMI Calculator is free with no signup required." },
    ],
    blogGuide: {
      href: "/blog/bmi-calculator-guide",
      title: "BMI calculator — what your body mass index means",
    },
  },
  "compound-interest": {
    aboutTitle: "About Compound Interest Calculator",
    aboutParagraphs: [
      "Our free Compound Interest Calculator shows how investments grow over time with compounding. Enter principal, annual rate, years, compounding frequency, and optional monthly contributions.",
      "See final amount, total interest earned, total contributions, and a year-by-year growth table. Supports annual, semi-annual, quarterly, monthly, and daily compounding.",
      "Ideal for Indian investors planning SIPs, fixed deposits, mutual funds, and long-term savings goals with compound growth projections.",
    ],
    whenToUseTitle: "When Should You Use Compound Interest Calculator?",
    useCases: [
      { title: "Investment planning", description: "Project how a lump sum grows with compound interest." },
      { title: "SIP comparison", description: "Add monthly contributions to model recurring investments." },
      { title: "FD returns", description: "Estimate maturity value with different compounding frequencies." },
      { title: "Retirement savings", description: "See long-term growth over 10, 20, or 30 years." },
      { title: "Financial education", description: "Understand the power of compounding for students." },
    ],
    faqs: [
      { question: "What is compound interest?", answer: "Interest calculated on both the initial principal and accumulated interest from previous periods." },
      { question: "How often should interest compound?", answer: "More frequent compounding (monthly vs annually) yields slightly higher returns at the same rate." },
      { question: "Can I add monthly contributions?", answer: "Yes. Enter an optional monthly contribution to model recurring investments." },
      { question: "What rate should I use?", answer: "Use your expected annual return rate. FD rates are typically 6–8%, equity may be higher long-term." },
      { question: "Is compound interest calculator free?", answer: "Yes. WorkUtilities Compound Interest Calculator is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/compound-interest-calculator-guide",
      title: "Compound interest calculator — how compounding grows money",
    },
  },
  "timezone-converter": {
    aboutTitle: "About Time Zone Converter",
    aboutParagraphs: [
      "Our free Time Zone Converter lets you convert any date and time between world time zones. Compare multiple cities side by side with live clock updates.",
      "Choose from popular zones including IST, EST, GMT, JST, and more. Add multiple target cities as chips and see converted times instantly.",
      "Perfect for scheduling international meetings, coordinating with remote teams, and tracking family or colleagues across time zones.",
    ],
    whenToUseTitle: "When Should You Use Time Zone Converter?",
    useCases: [
      { title: "Meeting scheduling", description: "Find overlapping hours for calls across US, India, and Europe." },
      { title: "Remote work", description: "Convert deadlines and standup times for distributed teams." },
      { title: "Travel planning", description: "Know local time at your destination before you arrive." },
      { title: "Event coordination", description: "Convert webinar or launch times for global audiences." },
      { title: "Family abroad", description: "Check what time it is for relatives in other countries." },
    ],
    faqs: [
      { question: "How do I convert IST to EST?", answer: "Set your source time and zone to IST, then add America/New_York as a comparison zone." },
      { question: "Does it handle daylight saving?", answer: "Yes. The tool uses IANA time zones which automatically account for DST." },
      { question: "Can I compare multiple cities?", answer: "Yes. Add as many target time zones as you need using the Add button." },
      { question: "Do live clocks update?", answer: "Yes. Current time in each zone updates every second." },
      { question: "Is time zone converter free?", answer: "Yes. WorkUtilities Time Zone Converter is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/time-zone-converter-guide",
      title: "Time zone converter — schedule across countries",
    },
  },
  "regex-tester": {
    aboutTitle: "About Regex Tester",
    aboutParagraphs: [
      "Our free Regex Tester lets you write, test, and debug regular expressions with live match highlighting. Supports global, case-insensitive, multiline, and dotall flags.",
      "See matches with index positions and capture groups. Load common patterns for email, URL, phone numbers, dates, and hex colors with one click.",
      "Essential for developers, QA engineers, and students learning pattern matching for validation, parsing, and text processing.",
    ],
    whenToUseTitle: "When Should You Use Regex Tester?",
    useCases: [
      { title: "Form validation", description: "Test email, phone, and URL patterns before deploying." },
      { title: "Log parsing", description: "Debug regex patterns against sample log lines." },
      { title: "Data extraction", description: "Find and verify capture groups in structured text." },
      { title: "Learning regex", description: "Experiment with patterns and see matches instantly." },
      { title: "Code review", description: "Validate regex used in production code against edge cases." },
    ],
    faqs: [
      { question: "What regex flags are supported?", answer: "g (global), i (case-insensitive), m (multiline), and s (dotall)." },
      { question: "How do I test an email regex?", answer: "Click the Email quick-load pill or enter your pattern, then paste test strings." },
      { question: "Why is my regex invalid?", answer: "Check for unescaped special characters and unclosed groups or brackets." },
      { question: "Are matches highlighted?", answer: "Yes. All matches are highlighted in the test string with index and group details below." },
      { question: "Is regex tester free?", answer: "Yes. WorkUtilities Regex Tester is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/how-to-test-regex-online",
      title: "How to test regular expressions online",
    },
  },
  "html-entity": {
    aboutTitle: "About HTML Entity Encoder/Decoder",
    aboutParagraphs: [
      "Our free HTML Entity tool encodes and decodes HTML entities instantly. Convert special characters like <, >, &, and quotes to safe HTML entities and back.",
      "Real-time conversion as you type with encode and decode modes. Includes a reference table of common HTML entities.",
      "Essential for web developers, content editors, and anyone working with HTML, XML, or CMS content that requires escaped characters.",
    ],
    whenToUseTitle: "When Should You Use HTML Entity Encoder?",
    useCases: [
      { title: "Web development", description: "Escape user input before rendering in HTML templates." },
      { title: "CMS content", description: "Fix special characters in blog posts and product descriptions." },
      { title: "Debugging", description: "Decode garbled entity strings from APIs or databases." },
      { title: "Email templates", description: "Encode symbols that break HTML email rendering." },
      { title: "Security", description: "Prevent XSS by encoding dangerous characters in output." },
    ],
    faqs: [
      { question: "What is an HTML entity?", answer: "A character reference like &lt; that represents a special character in HTML." },
      { question: "How do I encode < and >?", answer: "Switch to Encode mode and type your text. < becomes &lt; and > becomes &gt;." },
      { question: "Can I decode entities back?", answer: "Yes. Switch to Decode mode and paste encoded text." },
      { question: "What entities are supported?", answer: "Common entities including ampersand, angle brackets, quotes, copyright, and euro symbol." },
      { question: "Is HTML entity tool free?", answer: "Yes. WorkUtilities HTML Entity Encoder/Decoder is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/developer-data-encoding-tools-guide",
      title: "5 essential data encoding tools for developers",
    },
  },
  "color-contrast": {
    aboutTitle: "About Color Contrast Checker",
    aboutParagraphs: [
      "Our free Color Contrast Checker calculates WCAG contrast ratios between foreground and background colors. Test AA and AAA compliance for normal and large text.",
      "Pick colors with native color pickers or enter hex values. See a live text preview and pass/fail badges for each WCAG level.",
      "Essential for web designers, developers, and accessibility auditors ensuring readable text for all users.",
    ],
    whenToUseTitle: "When Should You Use Color Contrast Checker?",
    useCases: [
      { title: "Web accessibility", description: "Verify text meets WCAG 2.1 AA or AAA contrast requirements." },
      { title: "Brand colors", description: "Test brand palette combinations before launching a site." },
      { title: "UI design", description: "Check button text and link colors against backgrounds." },
      { title: "Dark mode", description: "Ensure readable contrast in dark theme designs." },
      { title: "Compliance audits", description: "Document contrast ratios for accessibility reports." },
    ],
    faqs: [
      { question: "What is a good contrast ratio?", answer: "WCAG AA requires 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 and 4.5:1." },
      { question: "What counts as large text?", answer: "18pt (24px) regular or 14pt (18.5px) bold text qualifies as large." },
      { question: "Can I swap foreground and background?", answer: "Yes. Click Swap colors to reverse the two colors instantly." },
      { question: "What color formats work?", answer: "Enter 6-digit hex values like #000000 and #FFFFFF." },
      { question: "Is color contrast checker free?", answer: "Yes. WorkUtilities Color Contrast Checker is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/design-tools-for-developers-guide",
      title: "Color and design tools every developer needs",
    },
  },
  "jwt-decoder": {
    aboutTitle: "About JWT Decoder",
    aboutParagraphs: [
      "Our free JWT Decoder inspects JSON Web Tokens with jwt.io-style color-coded header, payload, and signature panels. See claims with expanded labels, expiry badges, and human-readable timestamps.",
      "Verify HMAC, RSA, and ECDSA signatures client-side using the Web Crypto API — your secret or public key never leaves your browser.",
      "Essential for developers debugging OAuth, API authentication, and session tokens during development and testing.",
    ],
    whenToUseTitle: "When Should You Use JWT Decoder?",
    useCases: [
      { title: "API debugging", description: "Inspect token claims when authentication fails." },
      { title: "Signature verification", description: "Confirm a token is genuine with your secret or public key." },
      { title: "Expiry checks", description: "See if a token is expired with clear valid/expired badges." },
      { title: "OAuth development", description: "Verify issuer, audience, and scope claims in tokens." },
      { title: "Learning JWT", description: "Understand JWT structure with labeled claims and a demo token." },
    ],
    faqs: [
      { question: "Does this verify JWT signatures?", answer: "Yes — for HMAC (HS256/384/512), RSA (RS256/384/512, PS256), and ECDSA (ES256/384/512) algorithms. Verification runs entirely in your browser using the Web Crypto API." },
      { question: "Is it safe to paste JWT tokens and secrets?", answer: "Decoding and verification are local in your browser. Your secret never leaves this page — but avoid pasting production secrets on shared machines." },
      { question: "What do the JWT claim abbreviations mean?", answer: "Common claims include iss (Issuer), sub (Subject), aud (Audience), exp (Expiration Time), nbf (Not Before), iat (Issued At), and jti (JWT ID)." },
      { question: "How do I know if a token expired?", answer: "The payload panel shows a green valid badge or red expired badge based on the exp claim, with a human-readable expiry date." },
      { question: "Is JWT decoder free?", answer: "Yes. WorkUtilities JWT Decoder is free with no signup required." },
    ],
    blogGuide: {
      href: "/blog/how-to-decode-jwt-token-online",
      title: "How to decode a JWT token online",
    },
  },
  "epf-calculator": {
    aboutTitle: "About EPF Calculator",
    aboutParagraphs: [
      "Our free EPF Calculator estimates Employee Provident Fund maturity based on basic salary, current balance, age, and interest rate.",
      "Includes employee 12% contribution and employer 3.67% EPF portion with monthly compounding and annual salary increments.",
      "Essential for salaried employees in India planning retirement savings and understanding long-term PF growth.",
    ],
    whenToUseTitle: "When Should You Use EPF Calculator?",
    useCases: [
      { title: "Retirement planning", description: "Project EPF corpus at retirement age." },
      { title: "Salary negotiation", description: "Understand PF component impact on take-home pay." },
      { title: "Job change", description: "Estimate maturity with current balance and remaining years." },
      { title: "Financial goals", description: "See how increments affect long-term EPF growth." },
      { title: "Tax planning", description: "Plan EPF withdrawals and retirement corpus." },
    ],
    faqs: [
      { question: "What is the default EPF interest rate?", answer: "The calculator defaults to 8.25% but you can edit it to match current EPFO rates." },
      { question: "How is employer contribution calculated?", answer: "3.67% of basic salary goes to EPF; 8.33% goes to EPS as per current rules." },
      { question: "Does it include salary increments?", answer: "Yes. Enter annual increment % to model salary growth over your career." },
      { question: "What retirement age is used?", answer: "Default is 58 years, which you can change based on your plans." },
      { question: "Is EPF calculator free?", answer: "Yes. WorkUtilities EPF Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/epf-calculator-guide-india",
      title: "EPF calculator guide — PF maturity calculator India",
    },
  },
  "gratuity-calculator": {
    aboutTitle: "About Gratuity Calculator",
    aboutParagraphs: [
      "Our free Gratuity Calculator computes gratuity amount as per Payment of Gratuity Act 1972 formula for covered establishments.",
      "Enter last drawn salary (Basic + DA) and years of service. See formula used, rounded years, and tax-free limit applied.",
      "Useful for employees in India planning resignation, retirement, or understanding statutory gratuity benefits.",
    ],
    whenToUseTitle: "When Should You Use Gratuity Calculator?",
    useCases: [
      { title: "Retirement", description: "Estimate gratuity payout on retirement." },
      { title: "Resignation", description: "Know expected gratuity after 5+ years of service." },
      { title: "HR planning", description: "Calculate gratuity liability for employees." },
      { title: "Tax planning", description: "Understand ₹20 lakh tax-free gratuity limit." },
      { title: "Job offers", description: "Factor gratuity into total compensation." },
    ],
    faqs: [
      { question: "What is the gratuity formula?", answer: "Covered: (15 × Salary × Years) / 26. Not covered: (15 × Salary × Years) / 30." },
      { question: "Minimum years for gratuity?", answer: "5 years of continuous service, except death or disability." },
      { question: "What is the tax-free limit?", answer: "₹20,00,000 as per current rules for eligible employees." },
      { question: "Is partial year counted?", answer: "Service over 6 months in the last year is rounded up to a full year." },
      { question: "Is gratuity calculator free?", answer: "Yes. WorkUtilities Gratuity Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/gratuity-calculation-formula-india",
      title: "Gratuity calculation formula India — free calculator",
    },
  },
  "lta-calculator": {
    aboutTitle: "About LTA Calculator",
    aboutParagraphs: [
      "Our free LTA Calculator computes Leave Travel Allowance tax exemption as per Indian income tax rules.",
      "Enter annual LTA received and actual eligible travel expenses to see exempt and taxable amounts.",
      "Helps salaried employees in India maximize LTA tax benefits during the current 2026–2029 block period.",
    ],
    whenToUseTitle: "When Should You Use LTA Calculator?",
    useCases: [
      { title: "Tax planning", description: "Estimate LTA exemption before filing ITR." },
      { title: "Travel claims", description: "Verify exempt amount against actual fare expenses." },
      { title: "Salary structure", description: "Understand LTA component in your CTC." },
      { title: "Block year planning", description: "Plan 2 journeys per 4-year block optimally." },
      { title: "HR compliance", description: "Validate LTA exemption calculations." },
    ],
    faqs: [
      { question: "What expenses qualify for LTA?", answer: "Air, rail, or bus fare for self and family — not hotel, food, or local transport." },
      { question: "How many trips are allowed?", answer: "Maximum 2 journeys in a block of 4 calendar years. The current block is 2026–2029." },
      { question: "How is exemption calculated?", answer: "Minimum of LTA received and actual eligible travel expense." },
      { question: "Is LTA available under the New Tax Regime?", answer: "No. LTA exemption applies only under the Old Tax Regime — under the New Regime, LTA is fully taxable." },
      { question: "Is LTA available every year?", answer: "LTA exemption is limited to 2 trips per 4-year block, not every year." },
      { question: "Is LTA calculator free?", answer: "Yes. WorkUtilities LTA Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/lta-exemption-rules-india",
      title: "LTA exemption rules India — how to claim leave travel allowance",
    },
  },
  "hourly-to-salary": {
    aboutTitle: "About Hourly to Salary Calculator",
    aboutParagraphs: [
      "Our free Hourly to Salary Calculator converts hourly wage to daily, weekly, bi-weekly, monthly, and annual salary.",
      "Also works in reverse — enter annual salary to get equivalent hourly rate. Customize hours per week and weeks per year.",
      "Perfect for freelancers, contractors, part-time workers, and anyone comparing job offers across pay structures.",
    ],
    whenToUseTitle: "When Should You Use Hourly to Salary Calculator?",
    useCases: [
      { title: "Job comparison", description: "Compare hourly contract rate vs salaried offers." },
      { title: "Freelancing", description: "Set hourly rates to reach annual income goals." },
      { title: "Part-time work", description: "Calculate annual income from part-time hourly pay." },
      { title: "Overtime planning", description: "Understand full-time equivalent earnings." },
      { title: "Budgeting", description: "Convert paycheck periods for monthly budgets." },
    ],
    faqs: [
      { question: "How is annual salary calculated?", answer: "Hourly rate × hours per week × weeks per year." },
      { question: "What are default hours?", answer: "40 hours per week and 52 weeks per year (standard full-time US)." },
      { question: "Can I convert salary to hourly?", answer: "Yes. Switch to Salary → Hourly mode and enter annual salary." },
      { question: "Does it support INR and USD?", answer: "Yes. Use the currency toggle in the header for your preferred symbol." },
      { question: "Is hourly to salary calculator free?", answer: "Yes. WorkUtilities calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/hourly-to-salary-calculator-guide",
      title: "Hourly to salary calculator — convert wage to annual pay",
    },
  },
  "keyword-density": {
    aboutTitle: "About Keyword Density Checker",
    aboutParagraphs: [
      "Our free Keyword Density Checker analyzes word frequency and density in your content for SEO optimization.",
      "See top 20 keywords with count and density percentage. Optionally exclude common stop words and set minimum word length.",
      "Essential for content writers, bloggers, and SEO professionals optimizing articles for search engines.",
    ],
    whenToUseTitle: "When Should You Use Keyword Density Checker?",
    useCases: [
      { title: "SEO optimization", description: "Check if target keywords appear at optimal frequency." },
      { title: "Content audit", description: "Analyze existing articles for keyword overuse." },
      { title: "Blog writing", description: "Balance keyword usage while writing new posts." },
      { title: "Competitor analysis", description: "Study keyword patterns in competitor content." },
      { title: "Academic writing", description: "Identify most frequent terms in essays." },
    ],
    faqs: [
      { question: "What is ideal keyword density?", answer: "Generally 1-2% for primary keywords, but focus on natural writing over exact percentages." },
      { question: "What are stop words?", answer: "Common words like 'the', 'and', 'is' that are excluded from analysis by default." },
      { question: "How is density calculated?", answer: "(keyword count / total words) × 100." },
      { question: "Is my content uploaded?", answer: "No. All analysis happens locally in your browser." },
      { question: "Is keyword density checker free?", answer: "Yes. WorkUtilities Keyword Density Checker is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/writing-seo-tools-for-content-creators",
      title: "Free writing and SEO tools for content creators",
    },
  },
  "morse-code": {
    aboutTitle: "About Morse Code Converter",
    aboutParagraphs: [
      "Our free Morse Code Converter translates text to Morse code and decodes Morse back to text instantly.",
      "Includes a collapsible Morse alphabet reference for letters A-Z and digits 0-9. Copy output with one click.",
      "Fun and educational tool for ham radio enthusiasts, scouts, students, and anyone learning Morse code.",
    ],
    whenToUseTitle: "When Should You Use Morse Code Converter?",
    useCases: [
      { title: "Learning Morse", description: "Practice encoding and decoding messages." },
      { title: "Ham radio", description: "Quickly convert messages for amateur radio." },
      { title: "Education", description: "Teach Morse code in classrooms and scouting." },
      { title: "Puzzles", description: "Decode Morse clues in escape rooms and games." },
      { title: "Emergency signals", description: "Learn SOS (... --- ...) and basic signals." },
    ],
    faqs: [
      { question: "How do I write Morse code?", answer: "Dots (.) and dashes (-) separated by spaces between letters." },
      { question: "What is SOS in Morse?", answer: "... --- ... (three dots, three dashes, three dots)." },
      { question: "Are numbers supported?", answer: "Yes. Digits 0-9 have standard Morse representations." },
      { question: "Is conversion instant?", answer: "Yes. Output updates in real time as you type." },
      { question: "Is Morse code converter free?", answer: "Yes. WorkUtilities Morse Code Converter is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/useful-text-utility-tools-guide",
      title: "Lorem Ipsum, number to words, text diff, and Morse code explained",
    },
  },
  "xml-formatter": {
    aboutTitle: "About XML Formatter",
    aboutParagraphs: [
      "Our free XML Formatter beautifies, minifies, and validates XML data in your browser.",
      "Format mode adds indentation for readability. Minify removes whitespace. Validate checks for syntax errors.",
      "Essential for developers working with APIs, config files, RSS feeds, and SOAP services.",
    ],
    whenToUseTitle: "When Should You Use XML Formatter?",
    useCases: [
      { title: "API debugging", description: "Pretty-print XML API responses for inspection." },
      { title: "Config files", description: "Format messy XML configuration files." },
      { title: "RSS/Atom feeds", description: "Validate and beautify feed XML." },
      { title: "SOAP services", description: "Format SOAP request and response envelopes." },
      { title: "Learning XML", description: "Understand XML structure with proper indentation." },
    ],
    faqs: [
      { question: "Does it validate XML?", answer: "Yes. Use Validate mode to check for syntax errors with detailed error messages." },
      { question: "Can I minify XML?", answer: "Yes. Minify mode removes unnecessary whitespace between tags." },
      { question: "Is my XML uploaded?", answer: "No. All processing happens locally in your browser." },
      { question: "What if XML is invalid?", answer: "A red error card shows the parser error message." },
      { question: "Is XML formatter free?", answer: "Yes. WorkUtilities XML Formatter is free with no limits." },
    ],
    blogGuide: {
      href: "/blog/developer-data-encoding-tools-guide",
      title: "5 essential data encoding tools for developers",
    },
  },
  "inflation-calculator": {
    aboutTitle: "About Inflation Calculator",
    aboutParagraphs: [
      "Our free Inflation Calculator shows how inflation affects money value over time with future and past value modes.",
      "Pre-fills average inflation rates for India (6.5%) and US (3.2%) based on currency. Shows purchasing power loss visually.",
      "Essential for financial planning, retirement savings goals, and understanding real vs nominal value of money.",
    ],
    whenToUseTitle: "When Should You Use Inflation Calculator?",
    useCases: [
      { title: "Retirement planning", description: "See how much you'll need in future rupees or dollars." },
      { title: "Savings goals", description: "Adjust targets for inflation over decades." },
      { title: "Historical comparison", description: "Find past equivalent of today's amount." },
      { title: "Investment returns", description: "Compare nominal vs real returns after inflation." },
      { title: "Education costs", description: "Project future education expenses with inflation." },
    ],
    faqs: [
      { question: "What is future value mode?", answer: "Shows how much money you'll need in the future to match today's purchasing power." },
      { question: "What is past value mode?", answer: "Shows what a today's amount was worth X years ago in real terms." },
      { question: "What inflation rate should I use?", answer: "India: ~6.5%, US: ~3.2% historical averages. Edit to match your expectation." },
      { question: "What is purchasing power loss?", answer: "The percentage of value eroded by inflation over the selected period." },
      { question: "Is inflation calculator free?", answer: "Yes. WorkUtilities Inflation Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/inflation-calculator-money-value-guide",
      title: "Inflation calculator — what will your money be worth later?",
    },
  },
  "pdf-rotate": {
    aboutTitle: "About PDF Rotate Tool",
    aboutParagraphs: [
      "Our free PDF Rotate tool fixes sideways or upside-down scanned pages. Rotate individual pages or the entire document by 90°, 180°, or 270° with live thumbnail preview.",
      "Rotation is applied permanently in the downloaded file — not just a temporary viewer adjustment. Processing runs entirely in your browser with no upload to any server.",
      "Ideal for correcting scanner orientation mistakes, phone camera scans converted to PDF, and merged documents with mixed page orientations.",
    ],
    whenToUseTitle: "When Should You Use PDF Rotate?",
    useCases: [
      { title: "Sideways scanner output", description: "Fix pages fed into a scanner in the wrong orientation." },
      { title: "Phone photo scans", description: "Correct camera photos converted to PDF at the wrong angle." },
      { title: "Mixed merged PDFs", description: "Rotate individual pages after combining documents from different sources." },
      { title: "Upside-down pages", description: "Flip a single misoriented page without re-scanning." },
      { title: "Print preparation", description: "Ensure all pages print upright before sending to a printer." },
    ],
    faqs: [
      { question: "Does rotating change the actual PDF or just the display?", answer: "It changes the actual page orientation in the saved file — permanent in the downloaded PDF." },
      { question: "Can I rotate just one page?", answer: "Yes. Each page can be rotated independently, or rotate all pages at once." },
      { question: "Will rotation reduce quality?", answer: "No. Rotation changes orientation metadata, not the underlying content." },
      { question: "Why are scans often sideways?", answer: "Usually due to landscape scanner feed or sideways phone camera capture before PDF conversion." },
      { question: "Is PDF rotate free?", answer: "Yes. WorkUtilities PDF Rotate is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-rotate-pdf-pages-online-free", title: "How to rotate PDF pages online free" },
  },
  "pdf-page-numbers": {
    aboutTitle: "About PDF Page Numbers Tool",
    aboutParagraphs: [
      "Our free PDF Page Numbers tool adds consistent numbering to every page. Choose position, starting number, format, and optionally skip a cover page.",
      "Runs entirely in your browser — your document is never uploaded to a server. Download a numbered PDF ready for reports, theses, contracts, and legal filings.",
      "Supports bottom-center, top-right, and all six standard positions. Formats include plain numbers, 'Page X', and 'Page X of Y'.",
    ],
    whenToUseTitle: "When Should You Use PDF Page Numbers?",
    useCases: [
      { title: "Reports and theses", description: "Add consistent page numbers before submission or printing." },
      { title: "Legal documents", description: "Number contracts and filings for page-specific references." },
      { title: "Appendix continuation", description: "Start numbering from a custom number when continuing a larger set." },
      { title: "Cover page skip", description: "Leave the title page unnumbered while numbering the body." },
      { title: "Merged documents", description: "Add numbers after combining multiple PDFs into one file." },
    ],
    faqs: [
      { question: "Can I start from a number other than 1?", answer: "Yes. Set a custom starting number for appendices or continuations." },
      { question: "Can I skip the cover page?", answer: "Yes. Enable 'skip first page' to leave the title page unnumbered." },
      { question: "What's 'Page X of Y' format?", answer: "Shows current page and total page count for reader orientation." },
      { question: "Can I remove numbers later?", answer: "Re-process the original unnumbered file rather than editing the numbered PDF." },
      { question: "Is page numbering free?", answer: "Yes. WorkUtilities PDF Page Numbers is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-add-page-numbers-to-pdf-free", title: "How to add page numbers to PDF free" },
  },
  "pdf-watermark": {
    aboutTitle: "About PDF Watermark Tool",
    aboutParagraphs: [
      "Our free PDF Watermark tool adds text or image watermarks to every page. Mark documents as Draft, Confidential, or brand them with your company logo.",
      "Adjust opacity, rotation, font size, color, and tiled diagonal placement. All processing happens in your browser — files stay on your device.",
      "Text watermarks support custom labels. Image watermarks accept PNG or JPG logos with scalable size and opacity control.",
    ],
    whenToUseTitle: "When Should You Use PDF Watermark?",
    useCases: [
      { title: "Draft review", description: "Mark pre-approval documents as DRAFT before sharing." },
      { title: "Confidential sharing", description: "Stamp sensitive documents before internal distribution." },
      { title: "Brand outgoing PDFs", description: "Add a company logo watermark before sending to clients." },
      { title: "Copyright marking", description: "Signal ownership on shared creative work." },
      { title: "Tiled protection", description: "Use diagonal tiled watermarks that are harder to crop out." },
    ],
    faqs: [
      { question: "What opacity should I use?", answer: "Moderate opacity (20–40%) balances visibility without obscuring content." },
      { question: "Why diagonal placement?", answer: "Tiled diagonal watermarks are harder to crop out than corner marks." },
      { question: "Can I use a logo?", answer: "Yes. Upload a PNG or JPG image as your watermark." },
      { question: "Does watermark equal copyright?", answer: "It signals status or ownership but isn't legal copyright registration." },
      { question: "Is PDF watermark free?", answer: "Yes. WorkUtilities PDF Watermark is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-add-watermark-to-pdf-free", title: "How to add watermark to PDF free" },
  },
  "favicon-generator": {
    aboutTitle: "About Favicon Generator",
    aboutParagraphs: [
      "Our free Favicon Generator creates a complete favicon package from any image. Get favicon.ico, standard PNG sizes (16, 32, 180, 192, 512), and ready-to-paste HTML link tags.",
      "Upload a square image — 512×512 recommended — and download a ZIP with all files. Preview how your icon looks in a browser tab before downloading.",
      "Essential for web developers, indie makers, and anyone launching a site who needs proper icons for browser tabs, iOS bookmarks, and Android/PWA installs.",
    ],
    whenToUseTitle: "When Should You Use Favicon Generator?",
    useCases: [
      { title: "New website launch", description: "Generate all required favicon sizes in one step." },
      { title: "Rebrand", description: "Update favicons when your logo changes." },
      { title: "PWA setup", description: "Get 192×192 and 512×512 icons for progressive web apps." },
      { title: "iOS bookmarks", description: "Create the 180×180 Apple touch icon." },
      { title: "Quick prototyping", description: "Paste HTML link tags into your head without manual resizing." },
    ],
    faqs: [
      { question: "What image size to start with?", answer: "A square image at least 512×512px produces the cleanest smaller sizes." },
      { question: "Why multiple sizes?", answer: "Browser tabs, iOS, and Android each expect different specific icon dimensions." },
      { question: "Where to add favicon tags?", answer: "Place files in your site root or assets folder and paste the link tags in your HTML head." },
      { question: "Will a detailed logo work?", answer: "Complex logos often become illegible at 16×16 — simpler shapes work best." },
      { question: "Is favicon generator free?", answer: "Yes. WorkUtilities Favicon Generator is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-create-favicon-online-free", title: "How to create a favicon online free" },
  },
  "calorie-deficit-calculator": {
    aboutTitle: "About Calorie Deficit Calculator",
    aboutParagraphs: [
      "Our free Calorie Deficit Calculator estimates BMR and TDEE using the Mifflin-St Jeor formula, then shows a daily calorie target based on your goal.",
      "Supports metric and imperial units, five activity levels, and four goal options from maintenance to aggressive deficit. Results include BMR, maintenance calories, and target intake.",
      "This tool provides general estimates for informational purposes only — not medical or nutritional advice. Consult a healthcare professional for personalized guidance.",
    ],
    whenToUseTitle: "When Should You Use Calorie Deficit Calculator?",
    useCases: [
      { title: "Maintenance estimate", description: "Find your approximate daily maintenance calories (TDEE)." },
      { title: "Deficit planning", description: "See what a moderate 500 cal/day deficit looks like numerically." },
      { title: "Activity comparison", description: "Compare how activity level changes your maintenance estimate." },
      { title: "Unit flexibility", description: "Switch between metric (kg/cm) and imperial (lbs/in)." },
      { title: "Educational reference", description: "Understand how BMR and TDEE relate to each other." },
    ],
    faqs: [
      { question: "What's the difference between BMR and TDEE?", answer: "BMR is calories at complete rest. TDEE adds activity level for maintenance calories." },
      { question: "How big a deficit is reasonable?", answer: "A moderate ~500 cal/day deficit is commonly cited as more sustainable than aggressive deficits." },
      { question: "Is Mifflin-St Jeor exact?", answer: "It's a widely used estimate, but individual metabolism varies." },
      { question: "Should I consult a doctor?", answer: "Yes, especially with health conditions, pregnancy, or history of disordered eating." },
      { question: "Is this calculator free?", answer: "Yes. WorkUtilities Calorie Deficit Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/calorie-deficit-calculator-guide", title: "Calorie deficit calculator guide — BMR, TDEE, and daily targets" },
  },
  "sql-formatter": {
    aboutTitle: "About SQL Formatter",
    aboutParagraphs: [
      "Our free SQL Formatter beautifies queries with keyword capitalization, indentation, and line breaks before major clauses. Toggle minify mode to collapse SQL to a single line.",
      "Runs entirely in your browser — your queries are never uploaded. Useful before code review, documentation, or sharing SQL in chat.",
      "Supports common statement types including SELECT, INSERT, UPDATE, DELETE, and CREATE TABLE. This is a formatting pass, not a syntax validator.",
    ],
    whenToUseTitle: "When Should You Use SQL Formatter?",
    useCases: [
      { title: "Code review prep", description: "Make long queries readable before sharing in a PR." },
      { title: "Debugging", description: "See query structure clearly when tracing JOINs and subqueries." },
      { title: "Documentation", description: "Format SQL snippets for wikis and README files." },
      { title: "Minify for logs", description: "Collapse formatted SQL to one line for constrained paste areas." },
      { title: "Learning SQL", description: "See standard indentation conventions applied to your queries." },
    ],
    faqs: [
      { question: "Does this validate SQL syntax?", answer: "No — it formats for readability without checking syntax or dialect-specific rules." },
      { question: "Will formatting change execution?", answer: "No — only whitespace, line breaks, and keyword case change." },
      { question: "Does it work for MySQL and PostgreSQL?", answer: "Basic keyword formatting works across dialects; exotic syntax may format imperfectly." },
      { question: "Can I minify SQL?", answer: "Yes — switch to minify mode for a single-line compact query." },
      { question: "Is SQL formatter free?", answer: "Yes. WorkUtilities SQL Formatter is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-format-sql-online-free", title: "How to format SQL online free" },
  },
  "svg-to-png": {
    aboutTitle: "About SVG to PNG Converter",
    aboutParagraphs: [
      "Our free SVG to PNG Converter exports vector graphics as raster PNG at any resolution. Choose 1x, 2x, 4x scale or a custom width, with transparent or solid background.",
      "Upload an SVG file or paste SVG code, preview the graphic, and download PNG instantly in your browser.",
      "Ideal when platforms require raster images, for social sharing, or embedding logos where SVG isn't accepted.",
    ],
    whenToUseTitle: "When Should You Use SVG to PNG?",
    useCases: [
      { title: "Platform uploads", description: "Convert SVG logos for sites that only accept PNG." },
      { title: "High-res export", description: "Export at 2x or 4x for retina displays." },
      { title: "Transparent logos", description: "Preserve transparency for icons on colored backgrounds." },
      { title: "Social media", description: "Share vector artwork where SVG isn't rendered." },
      { title: "App assets", description: "Generate fixed-size PNG assets from SVG source." },
    ],
    faqs: [
      { question: "Why convert SVG to PNG?", answer: "Many platforms don't support SVG and require a raster format like PNG." },
      { question: "What resolution should I pick?", answer: "Export at the largest size you need — PNG can't be upscaled cleanly later." },
      { question: "Does PNG support transparency?", answer: "Yes — choose transparent background to preserve it." },
      { question: "Will SVG text render correctly?", answer: "Usually yes if fonts are embedded or available in the browser." },
      { question: "Is SVG to PNG free?", answer: "Yes. WorkUtilities converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-convert-svg-to-png-online", title: "How to convert SVG to PNG online" },
  },
  "color-palette-extractor": {
    aboutTitle: "About Color Palette Extractor",
    aboutParagraphs: [
      "Our free Color Palette Extractor analyzes an uploaded image and returns 6 dominant colors with HEX and RGB codes. Click any swatch to copy.",
      "Processing happens entirely in your browser — images are never uploaded to a server.",
      "Great for pulling brand colors from logos, matching palettes to reference photos, or starting a design color scheme.",
    ],
    whenToUseTitle: "When Should You Use Color Palette Extractor?",
    useCases: [
      { title: "Brand colors", description: "Extract a palette from a logo for consistent design." },
      { title: "Website theming", description: "Match site colors to a reference image." },
      { title: "CSS variables", description: "Copy HEX codes directly into stylesheets." },
      { title: "Mood boards", description: "Build a palette from inspiration images." },
      { title: "Design handoff", description: "Share dominant colors from a client asset quickly." },
    ],
    faqs: [
      { question: "How are dominant colors determined?", answer: "Pixel colors are analyzed and similar tones clustered to find the most prominent groups." },
      { question: "Can I use colors in CSS?", answer: "Yes — copy HEX codes directly, but verify contrast for text/background pairs." },
      { question: "Why might colors differ slightly?", answer: "Extraction summarizes gradients into representative swatches — it's an approximation." },
      { question: "How many colors are returned?", answer: "Six dominant colors by default." },
      { question: "Is palette extractor free?", answer: "Yes. WorkUtilities tool is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-extract-color-palette-from-image", title: "How to extract a color palette from an image" },
  },
  "text-to-speech": {
    aboutTitle: "About Text to Speech",
    aboutParagraphs: [
      "Our free Text to Speech tool reads your text aloud using your browser's built-in Web Speech API voices. Adjust speed and pitch, then play or stop.",
      "No external API or signup — voices come from your device and browser. Playback only; the Web Speech API does not support exporting audio files.",
      "Useful for proofreading, accessibility, language practice, and previewing scripts before recording.",
    ],
    whenToUseTitle: "When Should You Use Text to Speech?",
    useCases: [
      { title: "Proofreading", description: "Hear awkward phrasing you might miss when reading silently." },
      { title: "Accessibility", description: "Listen to content when reading on screen is difficult." },
      { title: "Language practice", description: "Hear pronunciation with available system voices." },
      { title: "Script preview", description: "Preview how announcements or narration will sound." },
      { title: "Multitasking", description: "Listen to pasted notes while doing other tasks." },
    ],
    faqs: [
      { question: "Why do voices differ by device?", answer: "The tool uses your browser/OS built-in speech engine — voices vary by platform." },
      { question: "Can I download audio?", answer: "No — the Web Speech API supports playback only, not audio file export in standard browsers." },
      { question: "Does it work offline?", answer: "Some voices work offline; others may need connectivity depending on your browser." },
      { question: "Can TTS help proofreading?", answer: "Yes — hearing text aloud often reveals awkward phrasing more clearly." },
      { question: "Is text to speech free?", answer: "Yes. WorkUtilities Text to Speech is free with no signup." },
    ],
    blogGuide: { href: "/blog/free-text-to-speech-online-guide", title: "Free text to speech online guide" },
  },
  "device-info": {
    aboutTitle: "About Device & Browser Info",
    aboutParagraphs: [
      "Our free Device & Browser Info tool displays your browser name, OS, screen resolution, viewport, pixel ratio, timezone, and user agent — then lets you copy the full report.",
      "Uses standard navigator and screen APIs already available to any website. Nothing hidden is collected — information is shown back to you for bug reports and troubleshooting.",
      "Essential when support teams ask what browser and screen size you're using.",
    ],
    whenToUseTitle: "When Should You Use Device Info?",
    useCases: [
      { title: "Bug reports", description: "Paste exact browser/OS details for developers." },
      { title: "Support tickets", description: "Answer environment questions accurately." },
      { title: "Responsive testing", description: "Check viewport and pixel ratio on your device." },
      { title: "Browser verification", description: "Confirm which browser you're actually running." },
      { title: "QA documentation", description: "Record test environment details quickly." },
    ],
    faqs: [
      { question: "Why is this useful for bugs?", answer: "Developers need exact browser/OS/screen info to reproduce issues." },
      { question: "Is extra data collected?", answer: "No — only standard APIs any website can access, displayed for you." },
      { question: "Why does resolution look unexpected?", answer: "High-DPI displays report device pixel ratio separately from physical pixels." },
      { question: "Does it detect location?", answer: "No — only technical browser/device info and timezone setting." },
      { question: "Is device info checker free?", answer: "Yes. WorkUtilities tool is free with no signup." },
    ],
    blogGuide: { href: "/blog/check-device-browser-info-online", title: "Check device and browser info online" },
  },
  "uuid-generator": {
    aboutTitle: "About UUID Generator",
    aboutParagraphs: [
      "Our free UUID Generator creates random UUID v4 identifiers instantly in your browser. Generate one UUID or bulk-create up to 100 at once.",
      "Toggle uppercase/lowercase and include or remove hyphens. Copy a single UUID or copy all with one click. Uses crypto.randomUUID() when available.",
      "Essential for developers creating database primary keys, API request IDs, session tokens, and distributed system identifiers without a central counter.",
    ],
    whenToUseTitle: "When Should You Use UUID Generator?",
    useCases: [
      { title: "Database keys", description: "Generate unique primary keys without a central ID server." },
      { title: "API development", description: "Create request IDs and correlation tokens for distributed tracing." },
      { title: "Session tokens", description: "Generate session or transaction identifiers independently." },
      { title: "Testing", description: "Bulk-generate UUIDs for seeding test data." },
      { title: "Prototyping", description: "Quickly create sample identifiers for mock APIs and schemas." },
    ],
    faqs: [
      { question: "What is a UUID used for?", answer: "UUIDs are commonly used as unique identifiers for database records, API requests, and distributed systems where IDs need to be generated independently without a central counter or coordination." },
      { question: "Can two UUIDs ever be the same?", answer: "Theoretically possible but practically negligible — the random UUID v4 address space is large enough that accidental duplicates are astronomically unlikely even at massive scale." },
      { question: "What's the difference between UUID v4 and other versions?", answer: "v4 is randomly generated (what this tool produces), while other versions like v1 incorporate timestamp/MAC address data or are derived from names — different versions suit different use cases." },
      { question: "Do I need hyphens in a UUID?", answer: "Hyphens are the standard display format (8-4-4-4-12 character groups), but some systems accept or require UUIDs without hyphens — this tool supports both." },
      { question: "Is UUID generation private?", answer: "Yes. All UUIDs are generated locally in your browser. Nothing is sent to any server." },
    ],
    blogGuide: { href: "/blog/uuid-generator-guide", title: "UUID generator guide — what UUIDs are and when to use them" },
  },
  "gpa-calculator": {
    aboutTitle: "About GPA Calculator",
    aboutParagraphs: [
      "Our free GPA Calculator computes weighted GPA on the standard US 4.0 scale. Add courses with letter grades and credit hours to get your cumulative GPA instantly.",
      "Supports the full standard grade-point mapping from A (4.0) through F (0.0), including plus/minus grades. Add or remove course rows dynamically.",
      "Ideal for US college students tracking semester or cumulative GPA, and anyone comparing grades on the 4.0 letter-grade system.",
    ],
    whenToUseTitle: "When Should You Use GPA Calculator?",
    useCases: [
      { title: "Semester planning", description: "Estimate your GPA before final grades are posted." },
      { title: "Cumulative GPA", description: "Add courses from multiple semesters for an overall weighted average." },
      { title: "What-if scenarios", description: "See how a different grade would affect your GPA." },
      { title: "Scholarship tracking", description: "Monitor GPA against minimum requirements." },
      { title: "Transfer planning", description: "Calculate GPA across courses from different terms." },
    ],
    faqs: [
      { question: "How is GPA calculated?", answer: "Each letter grade converts to a grade point (e.g. A=4.0, B=3.0), multiplied by that course's credit hours, summed across all courses, then divided by total credit hours — giving a credit-weighted average." },
      { question: "What's the difference between weighted and unweighted GPA?", answer: "Unweighted GPA treats every course equally regardless of credit hours or difficulty. Weighted GPA (what most colleges use) factors in credit hours, and some high schools additionally weight by course difficulty (AP/Honors courses count for more)." },
      { question: "Does a B+ always equal 3.3 grade points?", answer: "This is the most common standard mapping, though some institutions use slightly different scales — check your specific school's grading policy if precision matters for an official record." },
      { question: "Can I calculate GPA across multiple semesters?", answer: "Yes — add all courses from every semester you want included; the calculator will compute a single cumulative weighted GPA across everything entered." },
      { question: "Is GPA calculator free?", answer: "Yes. WorkUtilities GPA Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/gpa-calculator-guide", title: "GPA calculator guide — 4.0 scale and weighted GPA explained" },
  },
  "days-between-dates": {
    aboutTitle: "About Days Between Dates Calculator",
    aboutParagraphs: [
      "Our free Days Between Dates Calculator finds the exact number of calendar days between any two dates, with a years/months/days breakdown.",
      "Uses end date minus start date — the start date is not counted as a full elapsed day. Leap years are handled automatically through actual calendar dates.",
      "Also shows a relative framing to today — days from now or days ago — useful for countdowns, contract durations, and planning.",
    ],
    whenToUseTitle: "When Should You Use Days Between Dates?",
    useCases: [
      { title: "Event countdowns", description: "Count days until a deadline, trip, or exam." },
      { title: "Contract durations", description: "Calculate exact day count for leases and agreements." },
      { title: "Elapsed time", description: "See how many days since a past event." },
      { title: "Project timelines", description: "Measure duration between project milestones." },
      { title: "Planning", description: "Figure out how long between two dates for scheduling." },
    ],
    faqs: [
      { question: "Does the calculator count the start date as day 1?", answer: "No — the day count is end date minus start date, so the start date itself is not counted as a full elapsed day. For example, Jan 1 to Jan 3 equals 2 days, not 3." },
      { question: "Can I calculate days between a past date and today?", answer: "Yes — set one date to today and the other to any past or future date to see days elapsed or days remaining." },
      { question: "Does this account for leap years automatically?", answer: "Yes — the calculation uses actual calendar dates, so leap years are automatically factored into the day count correctly." },
      { question: "Can I use this to calculate exact contract or lease duration?", answer: "Yes — entering the start and end dates of an agreement gives you the precise day count, useful for contracts, leases, or any duration-based agreement." },
      { question: "Is days between dates calculator free?", answer: "Yes. WorkUtilities calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/days-between-dates-calculator-guide", title: "Days between dates calculator guide" },
  },
  "roman-numeral-converter": {
    aboutTitle: "About Roman Numeral Converter",
    aboutParagraphs: [
      "Our free Roman Numeral Converter converts numbers to Roman numerals and Roman numerals back to numbers instantly. Supports the standard 1–3999 range.",
      "Uses proper subtractive notation (IV for 4, IX for 9, etc.) and validates Roman input with round-trip checking to reject invalid combinations.",
      "Useful for students, writers, and anyone decoding movie sequels, clock faces, outlines, or formal document numbering.",
    ],
    whenToUseTitle: "When Should You Use Roman Numeral Converter?",
    useCases: [
      { title: "Education", description: "Learn and verify Roman numeral notation." },
      { title: "Writing", description: "Add Roman numerals to outlines and formal documents." },
      { title: "Decoding", description: "Convert Super Bowl numbers, monarch titles, or clock faces." },
      { title: "Quick reference", description: "Look up any number from 1 to 3999 in Roman form." },
      { title: "Validation", description: "Check whether a Roman numeral string is well-formed." },
    ],
    faqs: [
      { question: "Why is 4 written as IV instead of IIII?", answer: "Roman numerals use subtractive notation for certain combinations — placing a smaller numeral before a larger one means subtraction, so IV represents 5-1=4, following the standard convention rather than repeating I four times." },
      { question: "What's the largest number you can write in standard Roman numerals?", answer: "Basic Roman numeral notation practically extends to 3999 (MMMCMXCIX) using the standard symbols — numbers beyond that require special notation not commonly used in everyday contexts." },
      { question: "Where are Roman numerals still commonly used today?", answer: "Movie and event sequels (Super Bowl LVIII), clock faces, formal document section numbering, and royal/papal numbering (like Elizabeth II) are common modern uses." },
      { question: "Can all numbers be converted to Roman numerals?", answer: "Within the standard range (1 to 3999), yes — every whole number has a valid Roman numeral representation using the standard symbol and subtractive notation rules." },
      { question: "Is Roman numeral converter free?", answer: "Yes. WorkUtilities converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/roman-numeral-converter-guide", title: "Roman numeral converter guide" },
  },
  "leap-year-checker": {
    aboutTitle: "About Leap Year Checker",
    aboutParagraphs: [
      "Our free Leap Year Checker tells you instantly whether any year is a leap year, with a clear explanation of which rule applies.",
      "Covers the full three-part rule: divisible by 4, except century years, except those divisible by 400. Also shows the next and previous leap years.",
      "Useful for calendar questions, trivia, date calculations, and understanding why 1900 was not a leap year but 2000 was.",
    ],
    whenToUseTitle: "When Should You Use Leap Year Checker?",
    useCases: [
      { title: "Calendar questions", description: "Quickly verify if a year has February 29." },
      { title: "Date calculations", description: "Understand leap year context for day-count math." },
      { title: "Education", description: "Learn the full leap year rule with real examples." },
      { title: "Trivia", description: "Settle debates about century-year exceptions." },
      { title: "Planning", description: "Find the next or previous leap year from any given year." },
    ],
    faqs: [
      { question: "What is the leap year rule?", answer: "A year is a leap year if divisible by 4, EXCEPT century years (divisible by 100), which are only leap years if also divisible by 400." },
      { question: "Why was 1900 not a leap year but 2000 was?", answer: "Both are divisible by 100, but 2000 is also divisible by 400 (making it a leap year), while 1900 is not divisible by 400 (so the century exception applies, making it not a leap year)." },
      { question: "Why do we need leap years at all?", answer: "Earth's orbit takes approximately 365.25 days, not exactly 365 — without leap years, the calendar would gradually drift out of sync with the seasons over centuries." },
      { question: "How often do leap years occur?", answer: "Roughly every 4 years, with the exception of century years not divisible by 400 — making leap years occur 97 times every 400 years rather than exactly 100 times." },
      { question: "Is leap year checker free?", answer: "Yes. WorkUtilities Leap Year Checker is free with no signup." },
    ],
    blogGuide: { href: "/blog/leap-year-checker-guide", title: "Leap year checker guide — the full rule explained" },
  },
  "paycheck-calculator": {
    aboutTitle: "About Paycheck Calculator",
    aboutParagraphs: [
      "Our free 2026 Paycheck Calculator estimates your take-home pay after federal income tax, FICA (Social Security and Medicare), pre-tax deductions, and a simplified state tax estimate.",
      "Uses precise 2026 IRS federal brackets and standard deductions (Rev. Proc. 2025-32). FICA includes the Social Security wage base and Additional Medicare thresholds.",
      "Supports annual or hourly salary input, all common pay frequencies, filing status, and optional 401(k), health insurance, and HSA deductions.",
    ],
    whenToUseTitle: "When Should You Use Paycheck Calculator?",
    useCases: [
      { title: "Job offer comparison", description: "See estimated net pay before accepting a new salary." },
      { title: "Raise planning", description: "Understand how a raise affects take-home after progressive tax brackets." },
      { title: "Budgeting", description: "Convert annual salary to per-paycheck amounts for monthly budgets." },
      { title: "401(k) decisions", description: "See how pre-tax retirement contributions lower federal tax." },
      { title: "Relocation", description: "Compare take-home between no-income-tax and taxed states." },
    ],
    faqs: [
      { question: "Why is my federal tax bracket different from my effective tax rate?", answer: "Your tax bracket is the rate on your highest dollar of income, but the US system is progressive — lower portions of your income are taxed at lower rates first, so your effective (average) rate is always lower than your top bracket." },
      { question: "Will a raise ever reduce my take-home pay?", answer: "No — only the income that falls within a higher bracket is taxed at that bracket's rate; the rest continues being taxed at the lower rates it always was. A raise always increases take-home pay, even if part of it lands in a higher bracket." },
      { question: "What's the difference between federal income tax and FICA?", answer: "Federal income tax funds general government operations and is based on your tax bracket. FICA (Social Security and Medicare taxes) is a separate flat-rate payroll tax that funds those specific programs, calculated differently from income tax." },
      { question: "How accurate is the state tax shown?", answer: "Federal tax and FICA are calculated precisely from current IRS figures. State tax is a simplified flat-rate estimate (or zero, for the 9 no-income-tax states) — for an exact figure, check your specific state's tax tables." },
      { question: "Is paycheck calculator free?", answer: "Yes. WorkUtilities Paycheck Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/us-paycheck-calculator-guide", title: "Paycheck calculator guide — gross vs net, FICA, and tax brackets" },
  },
  "mortgage-calculator": {
    aboutTitle: "About Mortgage Calculator",
    aboutParagraphs: [
      "Our free Mortgage Calculator shows your full monthly payment — principal, interest, property taxes, insurance, PMI, and HOA — not just P&I.",
      "Includes a complete amortization schedule with CSV download and an extra-payment simulator showing interest saved and months shaved off.",
      "PMI is auto-estimated when down payment is under 20%, with informational guidance on when equity may reach the 80% LTV threshold.",
    ],
    whenToUseTitle: "When Should You Use Mortgage Calculator?",
    useCases: [
      { title: "Home shopping", description: "See true monthly cost including taxes, insurance, and PMI." },
      { title: "Down payment decisions", description: "Compare 10% vs 20% down and PMI impact." },
      { title: "Rate shopping", description: "Model how interest rate changes affect payment and total interest." },
      { title: "Extra payment planning", description: "See how additional monthly payments shorten the loan." },
      { title: "Amortization review", description: "Understand how principal vs interest shifts over 15–30 years." },
    ],
    faqs: [
      { question: "What does PITI mean in a mortgage payment?", answer: "PITI stands for Principal, Interest, Taxes, and Insurance — the four components that typically make up a full monthly mortgage payment, beyond just the loan repayment itself." },
      { question: "Why do I have to pay PMI?", answer: "Private Mortgage Insurance is generally required when your down payment is under 20% of the home price. It protects the lender if you default, not you directly, and can usually be removed once you've built enough equity." },
      { question: "Why is most of my early mortgage payment interest instead of principal?", answer: "Interest is calculated on your remaining loan balance, which is highest early in the loan — so a larger share of each payment goes to interest at first, gradually shifting toward principal as the balance shrinks." },
      { question: "How much can extra payments actually save?", answer: "Even a modest extra amount paid early in a 30-year loan can meaningfully shorten the payoff timeline and reduce total interest, since it directly reduces the balance that future interest is calculated on — the calculator's extra-payment simulator shows the exact effect for your numbers." },
      { question: "Is mortgage calculator free?", answer: "Yes. WorkUtilities Mortgage Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/mortgage-calculator-guide", title: "Mortgage calculator guide — PITI, PMI, and amortization explained" },
  },
  "box-breathing": {
    aboutTitle: "About Box Breathing Timer",
    aboutParagraphs: [
      "Our free Box Breathing Timer guides you through the classic 4-4-4-4 pattern with an animated visual cue, phase labels, and an accurate countdown per phase.",
      "Adjust phase durations from 3–8 seconds or use the 4-7-8 preset. Start, pause, reset, and track completed rounds — all in your browser with no signup.",
      "Used by Navy SEALs and high-performance teams, box breathing activates the parasympathetic nervous system to reduce acute stress and improve focus.",
    ],
    whenToUseTitle: "When Should You Use Box Breathing?",
    useCases: [
      { title: "Before presentations", description: "Center yourself with a few cycles before a meeting or talk." },
      { title: "Anxiety management", description: "Ground yourself during acute stress with a fixed breathing pattern." },
      { title: "Sleep wind-down", description: "Use as part of a bedtime routine to shift toward calm." },
      { title: "Post-stress recovery", description: "Recover after an argument or stressful situation." },
      { title: "Focus reset", description: "Break up long work sessions with a quick breathing reset." },
    ],
    faqs: [
      { question: "What is box breathing?", answer: "Box breathing is a controlled breathing technique involving four equal phases — inhale, hold, exhale, hold — each lasting the same number of counts (commonly 4 seconds each). It's widely used to manage stress and improve focus." },
      { question: "How many rounds of box breathing should I do?", answer: "Most sources suggest starting with 4 rounds (one full cycle is about 16 seconds), which takes roughly a minute, and working up to however many feel comfortable. Even a few cycles can produce a noticeable calming effect." },
      { question: "What's the difference between box breathing and 4-7-8 breathing?", answer: "Box breathing uses equal counts for all four phases (4-4-4-4 or similar). The 4-7-8 technique uses different durations — inhale 4, hold 7, exhale 8 — with a longer exhale, which some people find produces a stronger relaxation effect." },
      { question: "Can box breathing help with anxiety?", answer: "Controlled breathing techniques like box breathing are commonly used as a tool for managing acute stress and anxiety, and the technique is well-regarded in both military and clinical wellness contexts — though it's not a substitute for professional mental health treatment if anxiety is persistent or severe." },
      { question: "Is box breathing timer free?", answer: "Yes. WorkUtilities Box Breathing Timer is free with no signup." },
    ],
    blogGuide: { href: "/blog/box-breathing-technique-guide", title: "Box breathing technique guide — 4-4-4-4 stress relief" },
  },
  "cron-generator": {
    aboutTitle: "About Cron Expression Generator",
    aboutParagraphs: [
      "Our free Cron Expression Generator builds standard 5-field Unix cron expressions with a visual field editor, common presets, and instant human-readable descriptions.",
      "See the next 5 scheduled run times based on today's date, and paste existing expressions to parse them back to plain English.",
      "Essential for Linux crontab, CI/CD pipelines, database backups, and cloud schedulers like AWS EventBridge and Kubernetes CronJobs.",
    ],
    whenToUseTitle: "When Should You Use Cron Expression Generator?",
    useCases: [
      { title: "Crontab setup", description: "Build and verify Linux scheduled task expressions." },
      { title: "CI/CD pipelines", description: "Configure build and deployment schedules." },
      { title: "Cloud schedulers", description: "Generate cron for AWS EventBridge or Kubernetes CronJobs." },
      { title: "Debugging schedules", description: "Parse an existing expression to understand what it does." },
      { title: "Learning cron syntax", description: "See how field values map to human-readable descriptions." },
    ],
    faqs: [
      { question: "What does `0 9 * * 1-5` mean in cron?", answer: "It runs at 9:00 AM every weekday (Monday through Friday). The fields are Minute (0), Hour (9), Day of Month (*=any), Month (*=any), Day of Week (1-5=Monday to Friday)." },
      { question: "What's the difference between `*/5` and `0,5,10,15...` in a cron expression?", answer: "Both can produce similar schedules, but `*/5` means \"every 5 minutes starting from 0\" and will fire at 0, 5, 10...55. An explicit list gives you more control over exactly which minutes are included." },
      { question: "Why does my cron job run at the wrong time?", answer: "Cron uses the server's system timezone, not your local timezone — if your server runs on UTC and you expected 9 AM IST, you'd need to set the job for 3:30 AM UTC instead (IST is UTC+5:30)." },
      { question: "Does this generator work for AWS EventBridge or Kubernetes cron?", answer: "Standard 5-field cron syntax (what this tool generates) is compatible with most Linux systems and many cloud schedulers. AWS EventBridge uses a 6-field format with a seconds field — note this if you're targeting AWS specifically." },
      { question: "Is cron expression generator free?", answer: "Yes. WorkUtilities Cron Expression Generator is free with no signup." },
    ],
    blogGuide: { href: "/blog/cron-expression-generator-guide", title: "Cron expression generator guide — build schedules visually" },
  },
  "subnet-calculator": {
    aboutTitle: "About Subnet Calculator",
    aboutParagraphs: [
      "Our free Subnet Calculator computes network address, broadcast address, subnet mask, wildcard mask, total hosts, usable hosts, and IP range from any IPv4 CIDR notation.",
      "Also supports reverse conversion from dotted-decimal subnet mask to CIDR prefix, with binary representations and a quick-reference subnet table.",
      "Essential for network engineers, DevOps professionals, and anyone configuring cloud VPCs, firewalls, and router subnets.",
    ],
    whenToUseTitle: "When Should You Use Subnet Calculator?",
    useCases: [
      { title: "Cloud VPC design", description: "Plan AWS, GCP, or Azure subnet sizes and IP ranges." },
      { title: "Firewall rules", description: "Determine network boundaries for access control lists." },
      { title: "Network troubleshooting", description: "Verify whether an IP falls within a given subnet." },
      { title: "Certification study", description: "Practice subnet math for CCNA and cloud certifications." },
      { title: "Router configuration", description: "Convert between CIDR and dotted-decimal subnet masks." },
    ],
    faqs: [
      { question: "What does /24 mean in an IP address like 192.168.1.0/24?", answer: "The /24 is CIDR notation, meaning the first 24 bits identify the network, leaving 8 bits for host addresses. This gives 256 total IP addresses (2^8), with 254 usable after reserving the network and broadcast addresses." },
      { question: "Why are 2 addresses subtracted from the total to get usable hosts?", answer: "The first address is the network address (identifies the subnet itself, not assignable to devices), and the last address is the broadcast address (used to send to all devices on the subnet at once) — both are reserved and can't be assigned to individual hosts." },
      { question: "What's the difference between a subnet mask and a CIDR prefix?", answer: "They express the same information in different formats. A /24 CIDR prefix is equivalent to a 255.255.255.0 subnet mask — CIDR is more compact and widely used today, while dotted-decimal subnet masks are the older format, still used in some device configuration interfaces." },
      { question: "Which CIDR prefix should I use for a small office network?", answer: "/24 (256 addresses, 254 usable) is the most common choice for small networks, providing enough addresses for typical office use while keeping the subnet manageable. For very small segments (like point-to-point links), /30 (4 addresses, 2 usable) is common." },
      { question: "Is subnet calculator free?", answer: "Yes. WorkUtilities Subnet Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/subnet-calculator-guide", title: "Subnet calculator guide — CIDR notation and IP ranges explained" },
  },
  "svg-previewer": {
    aboutTitle: "About SVG Code Previewer",
    aboutParagraphs: [
      "Our free SVG Code Previewer renders SVG markup live as you type or paste — split-pane editor with instant preview, no external libraries required.",
      "Sanitizes input by stripping script tags, event handlers, and other XSS vectors before rendering. Toggle backgrounds, prettify code, copy, and download as .svg.",
      "Ideal for checking Figma/Illustrator exports, debugging broken SVG, and editing colors or dimensions directly in code.",
    ],
    whenToUseTitle: "When Should You Use SVG Code Previewer?",
    useCases: [
      { title: "Export verification", description: "Check SVG from design tools before embedding in code." },
      { title: "Manual editing", description: "Tweak fill, stroke, width, and height and see results instantly." },
      { title: "Debugging", description: "Fix SVG that doesn't display correctly by inspecting the markup." },
      { title: "Background testing", description: "Preview icons on light, dark, or transparent backgrounds." },
      { title: "Code formatting", description: "Prettify minified SVG for readability before committing." },
    ],
    faqs: [
      { question: "What is SVG and why is it used for web icons?", answer: "SVG (Scalable Vector Graphics) is a code-based image format that stores shapes mathematically rather than as pixels, allowing it to scale to any size without losing quality — ideal for icons, logos, and UI elements that need to look sharp on all screen resolutions including high-DPI/Retina displays." },
      { question: "Can I edit SVG colors and sizes without an image editor?", answer: "Yes — SVG is just XML/text, so you can directly edit the fill, stroke, width, and height attributes in the code and see the result instantly in a live previewer." },
      { question: "Is it safe to paste SVG code from the internet into a previewer?", answer: "Exercise caution — SVG can contain embedded JavaScript that may run when rendered. A good SVG previewer sanitizes the input by stripping script tags and event handlers before rendering; this tool does that. Still, only paste SVG from trusted sources." },
      { question: "How is SVG different from PNG?", answer: "SVG stores images as mathematical descriptions of shapes (lines, curves, fills) while PNG stores a fixed grid of pixels. SVG scales perfectly at any size, PNG loses quality when scaled up — but PNG handles photographic images better than SVG, which is best suited for icons, logos, and geometric illustrations." },
      { question: "Is SVG code previewer free?", answer: "Yes. WorkUtilities SVG Code Previewer is free with no signup." },
    ],
    blogGuide: { href: "/blog/svg-code-previewer-guide", title: "SVG code previewer guide — live preview and safe editing" },
  },
  "audio-recorder": {
    aboutTitle: "About Audio Recorder",
    aboutParagraphs: [
      "Our free Online Audio Recorder captures microphone input directly in your browser using the MediaRecorder API — record, pause, resume, play back, and download.",
      "Recordings stay entirely on your device. Nothing is uploaded to any server. Session recordings are in-memory only and lost on page close.",
      "Downloads as WebM audio — a modern open format natively supported by most browsers. Includes a live timer and visual recording indicator.",
    ],
    whenToUseTitle: "When Should You Use Audio Recorder?",
    useCases: [
      { title: "Voice notes", description: "Capture a quick reminder without opening a separate app." },
      { title: "Voice messages", description: "Record a short audio clip to share or transcribe later." },
      { title: "Mic testing", description: "Verify your microphone works before a video call." },
      { title: "Quick dictation", description: "Record an idea when typing isn't convenient." },
      { title: "Short project audio", description: "Capture audio without installing desktop software." },
    ],
    faqs: [
      { question: "Do I need to install anything to record audio in the browser?", answer: "No — this tool uses your browser's built-in microphone API. Just allow microphone access when prompted and you can start recording immediately." },
      { question: "Is my recorded audio uploaded anywhere?", answer: "No — recordings are processed entirely in your browser and stay on your device. Nothing is sent to any server, which also means recordings are lost when you close or refresh the page." },
      { question: "What format does the recording download in?", answer: "Recordings download as WebM audio, a modern open format natively supported by most browsers. If you need MP3 specifically, many free converters can convert WebM to MP3 after downloading." },
      { question: "Why is the browser asking for microphone permission?", answer: "Accessing your microphone requires explicit permission for privacy and security reasons — your browser prompts you once per site. The permission is only used while you're actively recording and can be revoked anytime from your browser's privacy settings." },
      { question: "Is audio recorder free?", answer: "Yes. WorkUtilities Audio Recorder is free with no signup." },
    ],
    blogGuide: { href: "/blog/free-online-audio-recorder-guide", title: "Free online audio recorder — record in your browser" },
  },
  "loan-eligibility": {
    aboutTitle: "About Loan Eligibility Calculator",
    aboutParagraphs: [
      "Our free Loan Eligibility Calculator estimates how much you can borrow based on FOIR (Fixed Obligation to Income Ratio) guidelines used by most Indian banks.",
      "Enter monthly take-home income, existing EMIs, desired loan amount, interest rate, and tenure to see max eligible loan at 40% and 50% FOIR, EMI for your desired amount, and eligibility status.",
      "Always shows results in ₹ regardless of region toggle, with an India banking guidelines badge. Includes a clear disclaimer that CIBIL score, employment type, and lender policies also affect approval.",
    ],
    whenToUseTitle: "When Should You Use Loan Eligibility Calculator?",
    useCases: [
      { title: "Home loan planning", description: "Estimate max home loan before visiting a bank branch." },
      { title: "Personal loan check", description: "See if your income supports the loan amount you need." },
      { title: "Car loan budgeting", description: "Compare desired EMI against FOIR limits before applying." },
      { title: "Refinance assessment", description: "Check how existing EMIs affect room for a new loan." },
      { title: "Pre-application research", description: "Use FOIR math as a starting reference before formal approval." },
    ],
    faqs: [
      { question: "What is FOIR and why does it affect loan eligibility?", answer: "FOIR is the percentage of your monthly income committed to EMI payments. Most Indian banks require this to stay within 40-50%, so existing EMIs directly reduce how much additional loan you qualify for." },
      { question: "Will this give me the exact amount a bank will approve?", answer: "No — this is an estimate based on income-to-EMI ratio guidelines. Actual bank approval also considers your CIBIL score, employment type, age, and specific bank policies. Use this as a starting reference." },
      { question: "Does CIBIL score affect eligibility?", answer: "Yes significantly — a score above 750 typically gets best rates and easier approvals, while lower scores may result in higher rates or rejection regardless of income. This calculator doesn't model CIBIL." },
      { question: "What's the difference between home loan and personal loan eligibility?", answer: "Home loans allow higher amounts (property acts as collateral) at lower rates with longer tenures. Personal loans are unsecured, have higher rates, shorter tenures, and lower maximum amounts relative to income." },
      { question: "Is loan eligibility calculator free?", answer: "Yes. WorkUtilities Loan Eligibility Calculator is free with no signup." },
    ],
    blogGuide: { href: "/blog/loan-eligibility-calculator-guide", title: "Loan eligibility calculator India — FOIR explained" },
  },
  "css-gradient": {
    aboutTitle: "About CSS Gradient Generator",
    aboutParagraphs: [
      "Our free CSS Gradient Generator builds linear, radial, and conic gradients visually with draggable color stops, angle control, and a prominent live preview.",
      "Six built-in presets (sunset, ocean, midnight, pastel dawn, forest, candy) let you start immediately. Copy the exact background CSS property with one click.",
      "All processing runs in your browser — no signup, no server upload. Perfect for hero backgrounds, buttons, cards, and gradient text effects.",
    ],
    whenToUseTitle: "When Should You Use CSS Gradient Generator?",
    useCases: [
      { title: "Hero sections", description: "Create full-width gradient backgrounds without image files." },
      { title: "Button styling", description: "Design hover states and branded gradient buttons." },
      { title: "Card backgrounds", description: "Add soft pastel or bold gradient card fills." },
      { title: "Gradient text", description: "Copy CSS for background-clip text effects." },
      { title: "Quick prototyping", description: "Iterate gradient colors and angles before adding to code." },
    ],
    faqs: [
      { question: "What is a CSS gradient?", answer: "A CSS gradient is a smooth color transition defined in code rather than as an image file, making it infinitely scalable and requiring zero extra file downloads." },
      { question: "What's the difference between linear, radial, and conic gradients?", answer: "Linear gradients transition along a straight line at an angle. Radial gradients radiate outward from a center point. Conic gradients transition around a center point, like a color wheel or pie chart." },
      { question: "Can I use CSS gradients for colored text?", answer: "Yes — apply a gradient as a background, then use background-clip: text and color: transparent to create gradient-colored text, a popular modern design effect." },
      { question: "Is the generated CSS compatible with all browsers?", answer: "Modern CSS gradients are well-supported across all current browsers — vendor prefixes like -webkit- were needed for older browsers but are rarely necessary today." },
      { question: "Is CSS gradient generator free?", answer: "Yes. WorkUtilities CSS Gradient Generator is free with no signup." },
    ],
    blogGuide: { href: "/blog/css-gradient-generator-guide", title: "CSS gradient generator guide — linear, radial, and conic" },
  },
  "timestamp-converter": {
    aboutTitle: "About Unix Timestamp Converter",
    aboutParagraphs: [
      "Our free Unix Timestamp Converter shows the current epoch time live (seconds and milliseconds) with copy buttons — the most-used feature, placed first.",
      "Convert timestamps to human-readable dates in UTC and your local timezone with auto-detection of 10-digit seconds vs 13-digit milliseconds.",
      "Convert date-time picker inputs back to Unix timestamps. All outputs have copy-to-clipboard buttons. Runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use Unix Timestamp Converter?",
    useCases: [
      { title: "API debugging", description: "Decode timestamp fields from JSON API responses." },
      { title: "Database queries", description: "Convert stored epoch values to readable dates." },
      { title: "Log analysis", description: "Translate Unix timestamps in server logs." },
      { title: "JavaScript development", description: "Compare Date.now() milliseconds with server seconds." },
      { title: "Live epoch reference", description: "Copy current Unix time for test data or cron jobs." },
    ],
    faqs: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC — a universal, timezone-agnostic way to represent a specific moment in time." },
      { question: "Why do some timestamps have 10 digits and others 13?", answer: "A 10-digit timestamp counts seconds since the Unix epoch; a 13-digit timestamp counts milliseconds. JavaScript's Date.now() returns milliseconds while many server-side APIs use seconds." },
      { question: "Is a Unix timestamp always UTC?", answer: "The timestamp itself is timezone-agnostic — it refers to a specific moment globally. The timezone only matters when converting to a human-readable date for display." },
      { question: "What is the Unix epoch?", answer: "January 1, 1970 at 00:00:00 UTC — the reference point from which all Unix timestamps are counted." },
      { question: "Is unix timestamp converter free?", answer: "Yes. WorkUtilities Unix Timestamp Converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/unix-timestamp-converter-guide", title: "Unix timestamp converter guide — epoch explained" },
  },
  "json-to-csv": {
    aboutTitle: "About JSON to CSV Converter",
    aboutParagraphs: [
      "Our free JSON to CSV Converter transforms a JSON array of objects into spreadsheet-ready CSV with object keys as headers and each object as a row.",
      "Nested objects are flattened one level with dot notation; deeper nesting is stringified with clear warnings — never silently broken output.",
      "Preview CSV before downloading, copy to clipboard, or download as .csv. The natural complement to our CSV to JSON tool.",
    ],
    whenToUseTitle: "When Should You Use JSON to CSV Converter?",
    useCases: [
      { title: "API data export", description: "Turn JSON API responses into Excel-ready spreadsheets." },
      { title: "Reporting", description: "Share flat data with non-developers who use Google Sheets." },
      { title: "Data pipelines", description: "Quickly convert test JSON fixtures to CSV format." },
      { title: "Product analytics", description: "Export user records from JSON logs to spreadsheet columns." },
      { title: "Reverse of CSV to JSON", description: "Complete the round-trip with our CSV to JSON tool." },
    ],
    faqs: [
      { question: "What JSON structure works best for CSV conversion?", answer: "A flat array of objects where every object has the same keys — for example, an array of user records each with name, email, and age fields. This maps cleanly to CSV rows and columns." },
      { question: "What happens to nested objects in the JSON?", answer: "Nested objects (objects inside objects) don't have a natural flat-CSV equivalent — the converter flattens one level with dot notation or stringifies deeper fields. Check the output preview to confirm the result matches your expectation." },
      { question: "Can I open the downloaded CSV directly in Excel?", answer: "Yes — the downloaded .csv file can be opened directly in Excel, Google Sheets, or any spreadsheet application." },
      { question: "What if I need to go the other direction — CSV to JSON?", answer: "Use the CSV to JSON tool, also available on this site." },
      { question: "Is JSON to CSV converter free?", answer: "Yes. WorkUtilities JSON to CSV Converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-convert-json-to-csv-online-free", title: "How to convert JSON to CSV online free" },
  },
  "word-to-jpg": {
    aboutTitle: "About Word to JPG Converter",
    aboutParagraphs: [
      "Our free Word to JPG Converter uploads a .docx file and converts it to a JPG image entirely in your browser using mammoth.js and html2canvas.",
      "Works best with simple document layouts. Complex formatting (custom fonts, advanced tables) may not render perfectly — with an honest on-page note and PDF-to-JPG alternative linked.",
      "Outputs a single continuous JPG of the full rendered document height — multi-page documents become one tall image, not separate files per page.",
    ],
    whenToUseTitle: "When Should You Use Word to JPG Converter?",
    useCases: [
      { title: "Share without edits", description: "Send a document as a non-editable JPG image." },
      { title: "Social media posts", description: "Embed document content where only images are accepted." },
      { title: "Email signatures", description: "Include letterhead or certificate visuals as images." },
      { title: "Quick previews", description: "Create a visual thumbnail without requiring Word installed." },
      { title: "Simple letters", description: "Convert basic formatted letters to shareable images." },
    ],
    faqs: [
      { question: "Why would I convert a Word doc to a JPG?", answer: "Common reasons include sharing without allowing edits, embedding in a presentation or email where images are needed, or creating a visual preview without the recipient needing Word installed." },
      { question: "What happens to complex formatting in conversion?", answer: "Simple formatting (text, basic tables, headings) generally converts well. Complex elements like custom fonts, advanced table styles, or embedded objects may not render perfectly in a browser-based converter." },
      { question: "What's a better option for complex documents?", answer: "Save from Word as PDF first, then use the PDF to JPG tool on this site — PDF-to-image conversion typically gives cleaner results for complex layouts." },
      { question: "Can I convert multiple pages?", answer: "The tool outputs your document as a single continuous JPG image covering the full rendered document height. Multi-page documents become one tall image, not separate JPG files per page." },
      { question: "Is Word to JPG converter free?", answer: "Yes. WorkUtilities Word to JPG Converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/how-to-convert-word-to-jpg-online-free", title: "How to convert Word to JPG online free" },
  },
  "currency-converter": {
    aboutTitle: "About Currency Converter",
    aboutParagraphs: [
      "Our free Currency Converter uses European Central Bank reference exchange rates via the Frankfurter API — updated each business day and cached for one hour on our server.",
      "Select a base currency, enter an amount, and see converted values for USD, EUR, GBP, INR, JPY, AUD, CAD, CHF, CNY, SGD, AED, and SAR simultaneously.",
      "Rates are mid-market reference values for planning — not exact bank or money transfer quotes, which include spreads and fees.",
    ],
    whenToUseTitle: "When Should You Use Currency Converter?",
    useCases: [
      { title: "Travel planning", description: "Estimate costs abroad before your trip." },
      { title: "International shopping", description: "Compare prices listed in foreign currencies." },
      { title: "Freelancer invoicing", description: "Convert client rates between currencies." },
      { title: "Salary comparisons", description: "Compare international job offers in a common currency." },
      { title: "Quick reference", description: "Check ECB benchmark rates without opening a forex platform." },
    ],
    faqs: [
      { question: "Where do the exchange rates come from?", answer: "Rates are sourced from the European Central Bank's reference rates, a widely used official benchmark updated each business day." },
      { question: "Why is the rate I get from my bank different?", answer: "The rates shown are mid-market reference rates. Banks and money transfer services add their own spread or fee on top, so the actual rate you receive for a transaction will differ." },
      { question: "How often are the rates updated?", answer: "ECB reference rates are updated each business day (Monday through Friday, excluding ECB holidays). Weekend rates reflect Friday's closing rate." },
      { question: "Can I use this for exact transaction planning?", answer: "Use it as a reference and planning tool — for the exact rate on a specific transaction, check directly with your bank or transfer service at the time of the transaction." },
      { question: "Is currency converter free?", answer: "Yes. WorkUtilities Currency Converter is free with no signup." },
    ],
    blogGuide: { href: "/blog/currency-converter-guide", title: "Currency converter guide — ECB exchange rates explained" },
  },
  "crypto-tracker": {
    aboutTitle: "About Crypto Price Tracker",
    aboutParagraphs: [
      "Our free Crypto Price Tracker shows live prices for Bitcoin, Ethereum, and 15 top cryptocurrencies via CoinGecko — with 24h change, market cap, and volume.",
      "Prices refresh every 5 minutes (cached on our server) with a manual refresh button. Includes a simple crypto-to-USD and crypto-to-INR converter.",
      "Prices are aggregated mid-market reference values — not financial advice. Cryptocurrency markets are highly volatile.",
    ],
    whenToUseTitle: "When Should You Use Crypto Price Tracker?",
    useCases: [
      { title: "Price monitoring", description: "Check current crypto prices without opening an exchange." },
      { title: "Portfolio reference", description: "See 24h momentum across major coins at a glance." },
      { title: "Quick conversion", description: "Convert a crypto amount to USD or INR instantly." },
      { title: "Market overview", description: "Compare market cap and volume across top cryptocurrencies." },
      { title: "Research starting point", description: "Use as a reference before deeper analysis on exchange platforms." },
    ],
    faqs: [
      { question: "Where do the prices come from?", answer: "Prices are sourced from CoinGecko, which aggregates data across major cryptocurrency exchanges to provide a representative mid-market price." },
      { question: "Why does the price here differ slightly from what I see on a specific exchange?", answer: "This shows an aggregated mid-market price across multiple exchanges. Individual exchange prices vary slightly based on their own order books and liquidity." },
      { question: "How often are prices updated?", answer: "Prices refresh approximately every 5 minutes. Use the refresh button for the latest data. For second-by-second trading data, use a dedicated exchange platform." },
      { question: "Is this financial advice?", answer: "No — this is a reference price tracker only. Cryptocurrency prices are highly volatile; never make financial decisions based solely on a single tool's data." },
      { question: "Is crypto price tracker free?", answer: "Yes. WorkUtilities Crypto Price Tracker is free with no signup." },
    ],
    blogGuide: { href: "/blog/crypto-price-tracker-guide", title: "Crypto price tracker guide — live Bitcoin and altcoin prices" },
  },
  "dns-lookup": {
    aboutTitle: "About DNS Lookup Tool",
    aboutParagraphs: [
      "Our free DNS Lookup Tool queries A, AAAA, CNAME, MX, TXT, NS, and SOA records via Cloudflare DNS over HTTPS — fast, reliable, and no signup.",
      "Run a single record type or query all common types at once. Results show name, type, TTL, and value with copy-to-clipboard on each row.",
      "Essential for verifying DNS propagation, debugging email delivery, and confirming CDN or nameserver configuration.",
    ],
    whenToUseTitle: "When Should You Use DNS Lookup Tool?",
    useCases: [
      { title: "DNS propagation checks", description: "Verify record changes have taken effect after an update." },
      { title: "Email debugging", description: "Inspect MX and TXT (SPF/DKIM) records for delivery issues." },
      { title: "CDN verification", description: "Confirm CNAME points to the correct CDN endpoint." },
      { title: "Domain transfers", description: "Check NS records after moving to a new registrar." },
      { title: "DevOps troubleshooting", description: "Quick DNS inspection without terminal dig commands." },
    ],
    faqs: [
      { question: "What is a DNS record?", answer: "DNS records are instructions stored in DNS servers that tell the internet how to handle requests for a domain — where to find its website (A record), which servers handle its email (MX record), and more." },
      { question: "Why might results look different from another DNS lookup tool?", answer: "DNS results can vary slightly between different DNS resolvers and depend on which nameserver is queried. This tool uses Cloudflare's DNS resolver, which is one of the most accurate and up-to-date." },
      { question: "What is TTL in DNS?", answer: "TTL (Time to Live) is how many seconds other DNS servers should cache this record before asking again for a fresh copy — lower TTL means changes propagate faster, higher TTL reduces DNS query load." },
      { question: "How long do DNS changes take to propagate?", answer: "It depends on the TTL of the old record — if the previous TTL was 3600 seconds (1 hour), propagation can take up to an hour. Lower TTL values (like 300 seconds) allow changes to spread more quickly." },
      { question: "Is DNS lookup tool free?", answer: "Yes. WorkUtilities DNS Lookup Tool is free with no signup." },
    ],
    blogGuide: { href: "/blog/dns-lookup-tool-guide", title: "DNS lookup tool guide — record types explained" },
  },
  "ip-lookup": {
    aboutTitle: "About IP Address Lookup",
    aboutParagraphs: [
      "Our free IP Address Lookup shows your public IP on page load or lets you look up any IPv4 address — country, region, city, ISP, timezone, and coordinates.",
      "My IP mode detects your public IP via ipify in the browser, then geolocates it through our Railway server — ensuring you see your IP, not the server's.",
      "Geolocation is approximate based on ISP registration data — not your precise street-level location.",
    ],
    whenToUseTitle: "When Should You Use IP Address Lookup?",
    useCases: [
      { title: "Find my IP", description: "See your current public IP address instantly." },
      { title: "Server log analysis", description: "Identify where traffic originates in access logs." },
      { title: "Network debugging", description: "Verify geo-routing and ISP assignment." },
      { title: "Security review", description: "Look up suspicious IP addresses from alerts." },
      { title: "Geo-restriction testing", description: "Confirm which country an IP resolves to." },
    ],
    faqs: [
      { question: "How accurate is IP geolocation?", answer: "IP geolocation is approximate — typically accurate to country level and often to city level, but not to exact street address. The location shown is based on where your ISP registered the IP block, which may differ from your actual physical location." },
      { question: "Why does my IP show a different city than where I am?", answer: "IP addresses are assigned in blocks to ISPs, and the registered location of that block may be a different city than where you're physically located — especially if your ISP routes traffic through a regional hub." },
      { question: "What's the difference between a public and private IP address?", answer: "Your public IP is visible to the internet and assigned by your ISP. Private IP addresses (like 192.168.x.x) are used within your local network and not visible externally — this tool shows public IPs only." },
      { question: "Can I look up my phone's IP address?", answer: "Yes — visiting this tool on your phone will show your phone's current public IP (assigned by your mobile carrier or WiFi network)." },
      { question: "Is IP address lookup free?", answer: "Yes. WorkUtilities IP Address Lookup is free with no signup." },
    ],
    blogGuide: { href: "/blog/ip-address-lookup-guide", title: "IP address lookup guide — geolocation explained" },
  },
  "labour-code-calculator": {
    aboutTitle: "About New Labour Code 2026 Salary Calculator",
    aboutParagraphs: [
      "Our free New Labour Code 2026 Salary Calculator shows how the 50% basic salary rule affects your monthly take-home, PF contributions, and gratuity accrual — side by side with your current salary structure.",
      "Enter your annual CTC, current basic percentage, city type, and PF preference. Results update instantly as you type — no signup, no data stored.",
      "Based on Code on Wages 2019 provisions (notified November 2025, enforcement from April 2026). Total CTC stays the same — only the distribution between cash and long-term benefits changes.",
    ],
    whenToUseTitle: "When Should You Use the Labour Code Salary Calculator?",
    useCases: [
      { title: "Salary restructuring preview", description: "See how a higher basic affects your payslip before HR implements changes." },
      { title: "PF impact", description: "Estimate increased PF corpus from higher basic wages under the new code." },
      { title: "Take-home planning", description: "Understand monthly cash reduction vs long-term retirement savings trade-off." },
      { title: "Gratuity projection", description: "See how gratuity accrual increases with higher basic salary." },
      { title: "HR discussions", description: "Prepare informed questions for your payroll team with exact numbers." },
    ],
    faqs: [
      { question: "Will my take-home salary reduce under the New Labour Code?", answer: "For most employees whose basic salary is currently below 50% of CTC, take-home pay will decrease slightly while PF and gratuity savings increase. Total CTC remains unchanged — only the distribution between monthly cash and long-term benefits shifts." },
      { question: "Does the 50% basic rule apply to everyone?", answer: "Yes, for all employees covered under the Code on Wages once it is implemented. However, employees whose current basic is already at or above 50% of CTC will see minimal or no change." },
      { question: "When does the New Labour Code come into effect?", answer: "The Code on Wages was officially notified on 21 November 2025, with enforcement rolling out from April 2026. Implementation timelines vary by state as labour is a concurrent subject under the Constitution." },
      { question: "How does the New Labour Code affect PF contributions?", answer: "PF is calculated as 12% of basic wages. Since the new code mandates a higher basic (at least 50% of CTC), PF contributions — from both employee and employer — increase, building a larger retirement corpus." },
      { question: "Is this labour code calculator free?", answer: "Yes. WorkUtilities New Labour Code Salary Calculator is free with no signup and runs entirely in your browser." },
    ],
    blogGuide: {
      href: "/blog/new-labour-code-2026-salary-guide",
      title: "New Labour Code 2026 salary impact — 50% basic rule explained",
    },
  },
  "freelancer-tax-calculator": {
    aboutTitle: "About Section 44ADA Freelancer Tax Calculator",
    aboutParagraphs: [
      "Our free Section 44ADA Freelancer Tax Calculator estimates presumptive tax for specified professions in India — IT, medical, legal, architecture, CA, interior design, and film professionals.",
      "Check eligibility (₹50L or ₹75L limit based on digital receipts), compare 44ADA vs regular books, and see effective tax rate under new or old regime instantly.",
      "No signup, no upsell — privacy-first calculation for freelancers planning ITR-4 filing and advance tax.",
    ],
    whenToUseTitle: "When Should You Use the 44ADA Tax Calculator?",
    useCases: [
      { title: "Freelancer tax planning", description: "Estimate tax on presumptive income before filing season." },
      { title: "Eligibility check", description: "Verify if your receipts and profession qualify for Section 44ADA." },
      { title: "44ADA vs books", description: "Compare presumptive taxation with actual expense method." },
      { title: "Regime selection", description: "See whether old or new regime gives lower tax under 44ADA." },
      { title: "Advance tax reminder", description: "Plan 100% advance tax payment by 15 March under 44ADA." },
    ],
    faqs: [
      { question: "What is the Section 44ADA limit for FY 2026-27?", answer: "₹75 lakhs if 95% or more of your gross receipts are through digital/banking channels. ₹50 lakhs if cash receipts exceed 5% of total receipts. If your gross receipts exceed the applicable limit, 44ADA is not available and regular taxation with books and audit applies." },
      { question: "Can I claim 80C deductions under Section 44ADA?", answer: "Yes — deductions under Chapter VI-A (80C, 80D, 80G, etc.) are available under the old tax regime even when opting for 44ADA. Under the new tax regime, most deductions are not claimable. Choose your regime based on which gives you lower tax." },
      { question: "Do I need to maintain books of accounts under Section 44ADA?", answer: "No — if you declare 50% or more of gross receipts as taxable income and stay within the ₹75L limit, you are exempt from maintaining books and getting a tax audit under Section 44ADA." },
      { question: "What professions are eligible for Section 44ADA?", answer: "Specified professions under Section 44AA(1): legal practice, medical practitioners, engineers, architects, accountants (CA, CMA, CS), technical consultants, interior decorators, film artists (actors, directors, producers), and IT professionals. General consultancy and trading are not eligible." },
      { question: "Is the 44ADA tax calculator free?", answer: "Yes. WorkUtilities Section 44ADA Freelancer Tax Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/section-44ada-freelancer-tax-guide",
      title: "Section 44ADA tax guide for freelancers India 2026",
    },
  },
  "tax-regime-comparison": {
    aboutTitle: "About Old vs New Tax Regime Comparison",
    aboutParagraphs: [
      "Our free Old vs New Tax Regime Comparison tool calculates tax under both regimes side by side — enter your salary once and see HRA, 80C, 80D, and standard deduction impact instantly.",
      "Unlike single-regime calculators, this tool gives a clear verdict on which regime saves you more money for FY 2026-27.",
      "Results update in real time as you type. No signup, no ads — privacy-first tax comparison for salaried employees in India.",
    ],
    whenToUseTitle: "When Should You Use Tax Regime Comparison?",
    useCases: [
      { title: "Regime selection", description: "Decide old vs new regime before submitting Form 12BB to HR." },
      { title: "HRA impact", description: "See how HRA exemption affects old regime tax vs zero under new regime." },
      { title: "80C planning", description: "Understand whether your ₹1.5L 80C investments justify staying on old regime." },
      { title: "Break-even analysis", description: "Find at what income level new regime starts winning for your profile." },
      { title: "ITR filing prep", description: "Confirm optimal regime before filing your return." },
    ],
    faqs: [
      { question: "Should I choose old or new tax regime in 2026?", answer: "It depends on your deductions. If you have significant 80C investments (PPF, ELSS, LIC), HRA in a metro city, or home loan interest, the old regime often saves more. If you have fewer deductions or income up to ₹12 lakh, the new regime's zero-tax rebate makes it advantageous." },
      { question: "What is the standard deduction in new regime for FY 2026-27?", answer: "₹75,000 for salaried employees under the new tax regime for FY 2026-27, increased from ₹50,000. The old regime continues with ₹50,000 standard deduction." },
      { question: "Is HRA tax exemption available in new regime?", answer: "No — HRA exemption under Section 10(13A) is only available under the old tax regime. Under the new regime, you cannot claim HRA exemption regardless of actual rent paid." },
      { question: "What income level is better off with new regime?", answer: "For income up to ₹12 lakh, the new regime's Section 87A rebate makes tax liability zero — making it clearly better. Above ₹12 lakh, comparison depends on your specific deductions. Use the side-by-side calculator to find your exact breakeven point." },
      { question: "Is tax regime comparison free?", answer: "Yes. WorkUtilities Old vs New Tax Regime Comparison is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/old-vs-new-tax-regime-comparison-2026",
      title: "Old vs new tax regime comparison India 2026",
    },
  },
  "ppf-calculator": {
    aboutTitle: "About PPF Calculator",
    aboutParagraphs: [
      "Our free PPF Calculator projects maturity value, total interest earned, and a year-by-year balance table for Public Provident Fund accounts in India.",
      "Includes partial withdrawal eligibility (from year 7), loan against PPF rules (years 3–6), and 5-year extension block simulation for tenures beyond 15 years.",
      "Uses current 7.1% rate (Q2 FY 2026-27) — editable for future rate changes. No signup, runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use the PPF Calculator?",
    useCases: [
      { title: "Retirement planning", description: "Project PPF corpus at 15, 20, or 30 years with annual investments." },
      { title: "80C planning", description: "See tax saved on PPF investments under old regime (EEE status)." },
      { title: "Withdrawal planning", description: "Check when partial withdrawal becomes eligible and maximum amount." },
      { title: "Loan planning", description: "Understand loan against PPF eligibility window and limits." },
      { title: "Extension planning", description: "Model 5-year extension blocks after initial 15-year lock-in." },
    ],
    faqs: [
      { question: "What is the current PPF interest rate in 2026?", answer: "The PPF interest rate for Q2 FY 2026-27 (July–September 2026) is 7.1% per annum, compounded annually. The rate is set by the government each quarter and has remained unchanged since April 2020." },
      { question: "Can I invest more than ₹1.5 lakh in PPF per year?", answer: "No — the maximum annual investment in PPF is ₹1,50,000. Any amount above this is returned without interest. The minimum annual investment to keep the account active is ₹500." },
      { question: "When can I withdraw money from PPF before maturity?", answer: "Partial withdrawals are allowed from the 7th financial year onwards (i.e. from the year after completing 6 full years). You can withdraw up to 50% of the balance at the end of the 4th year (or the year immediately preceding the withdrawal, whichever is lower). Only one partial withdrawal is permitted per financial year." },
      { question: "Is PPF better than FD for tax saving?", answer: "PPF offers Exempt-Exempt-Exempt (EEE) tax status — principal invested is 80C deductible, interest is tax-free, and maturity amount is tax-free. FD interest is fully taxable at your income slab rate. For long-term tax-efficient savings, PPF generally outperforms FD especially for higher tax bracket investors, though PPF has a 15-year lock-in." },
      { question: "Is the PPF calculator free?", answer: "Yes. WorkUtilities PPF Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/ppf-calculator-guide-india",
      title: "PPF calculator India — returns, interest & maturity guide",
    },
  },
  "w2-vs-1099-calculator": {
    aboutTitle: "About W-2 vs 1099 Tax Calculator",
    aboutParagraphs: [
      "Our free W-2 vs 1099 Tax Calculator shows the minimum 1099 rate needed to match your W-2 take-home pay — after self-employment tax, lost benefits, and business expenses.",
      "Enter your W-2 salary, employer health insurance, 401(k) match, and PTO days. See side-by-side W-2 breakdown and step-by-step 1099 equivalence calculation.",
      "Federal-only estimates using 2026 IRS brackets and FICA rules. No signup, runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use the W-2 vs 1099 Calculator?",
    useCases: [
      { title: "Contract rate negotiation", description: "Know your break-even 1099 rate before accepting a contract offer." },
      { title: "Freelance transition", description: "Compare leaving a salaried job for independent contracting." },
      { title: "Side gig planning", description: "Understand the tax gap between W-2 and 1099 income." },
      { title: "Benefits valuation", description: "See the cash value of employer health, 401(k), and PTO." },
      { title: "Hourly rate conversion", description: "Convert minimum 1099 annual rate to an hourly bill rate." },
    ],
    faqs: [
      { question: "How much more should a 1099 contractor charge than a W-2 salary?", answer: "As a general rule, a 1099 contractor needs to earn 25-40% more than an equivalent W-2 salary to end up with the same take-home pay, after self-employment tax, lost benefits, and business expenses." },
      { question: "Does a 1099 worker pay more tax than a W-2 employee?", answer: "Yes — 1099 contractors pay self-employment tax at 15.3% on 92.35% of net income, roughly double the 7.65% W-2 employees pay. However, 1099 workers can deduct business expenses, 50% of SE tax, and potentially 20% via QBI." },
      { question: "What is the QBI deduction?", answer: "Section 199A allows eligible self-employed individuals to deduct up to 20% of qualified business income from taxable income. Most freelancers qualify, with phase-outs at higher income levels." },
      { question: "How do 1099 workers pay taxes?", answer: "Through quarterly estimated tax payments — due April 15, June 17, September 16, and January 15. Required if you expect to owe more than $1,000 in federal taxes." },
      { question: "Is this calculator free?", answer: "Yes. WorkUtilities W-2 vs 1099 Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/w2-vs-1099-tax-comparison-guide",
      title: "W-2 vs 1099 tax comparison guide — 2026 rates explained",
    },
  },
  "self-employment-tax": {
    aboutTitle: "About Self-Employment Tax Calculator",
    aboutParagraphs: [
      "Our free Self-Employment Tax Calculator computes SE tax, federal income tax, total tax burden, and quarterly payment amounts with 2026 IRS due dates.",
      "See step-by-step calculation: 92.35% SE tax base, Social Security cap, Medicare, SE tax deduction, standard deduction, and optional QBI.",
      "Includes quarterly payment schedule for April, June, September, and January deadlines. No signup required.",
    ],
    whenToUseTitle: "When Should You Use the SE Tax Calculator?",
    useCases: [
      { title: "Freelancer tax planning", description: "Estimate total tax before filing season." },
      { title: "Quarterly payments", description: "Calculate how much to pay each quarter to avoid penalties." },
      { title: "Side income", description: "Combine W-2 wages with freelance income for accurate SE tax." },
      { title: "SE tax deduction", description: "See how deducting 50% of SE tax reduces income tax." },
      { title: "Effective rate", description: "Know your true tax rate on net self-employment income." },
    ],
    faqs: [
      { question: "What is the self-employment tax rate for 2026?", answer: "15.3% — 12.4% Social Security plus 2.9% Medicare on 92.35% of net SE income. Social Security applies only to the first $184,500 of combined wages and SE income." },
      { question: "Can I deduct self-employment tax?", answer: "Yes — deduct 50% of SE tax as an above-the-line deduction on Form 1040, reducing AGI." },
      { question: "When are quarterly payments due in 2026?", answer: "April 15 (Q1), June 17 (Q2), September 16 (Q3), and January 15, 2027 (Q4)." },
      { question: "What is the $400 SE tax threshold?", answer: "Net SE earnings below $400/year are exempt from self-employment tax." },
      { question: "Is this calculator free?", answer: "Yes. WorkUtilities Self-Employment Tax Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/self-employment-tax-calculator-guide-usa",
      title: "Self-employment tax guide USA — calculate & pay quarterly",
    },
  },
  "robots-txt-generator": {
    aboutTitle: "About robots.txt Generator",
    aboutParagraphs: [
      "Our free robots.txt Generator builds a valid robots.txt file with user-agent rules, allow/disallow paths, crawl-delay, and sitemap URL — with live preview.",
      "One-click presets for WordPress, Next.js/Vercel, allow-all, block-all, and AI crawler blocking (GPTBot, CCBot).",
      "Copy to clipboard or download as robots.txt instantly. No signup, runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use robots.txt Generator?",
    useCases: [
      { title: "New website launch", description: "Create a robots.txt before going live." },
      { title: "Block admin areas", description: "Prevent crawlers from indexing /admin/ or /wp-admin/." },
      { title: "Block AI crawlers", description: "Add GPTBot, CCBot, and Meta AI blocking rules." },
      { title: "Next.js / Vercel", description: "Apply standard _next and /api/ disallow patterns." },
      { title: "Sitemap declaration", description: "Add your sitemap.xml URL for search engines." },
    ],
    faqs: [
      { question: "What is a robots.txt file?", answer: "A text file at your domain root that tells crawlers which pages to crawl, following the Robots Exclusion Protocol." },
      { question: "Does robots.txt block pages from search results?", answer: "No — it prevents crawling but not indexing if other sites link to the page. Use noindex for that." },
      { question: "How do I block GPTBot?", answer: "Add User-agent: GPTBot and Disallow: / to your robots.txt. Reputable AI companies honor this." },
      { question: "Can I allow some pages while blocking others?", answer: "Yes — Allow rules override Disallow when both match. More specific rules take precedence." },
      { question: "Is this generator free?", answer: "Yes. WorkUtilities robots.txt Generator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/robots-txt-generator-guide",
      title: "robots.txt generator guide — syntax & validation",
    },
  },
  "capital-gains-calculator": {
    aboutTitle: "About Capital Gains Tax Calculator India",
    aboutParagraphs: [
      "Our free Capital Gains Tax Calculator handles all major asset types in one interface — listed equity, equity MFs, property, gold, debt MFs, and unlisted shares.",
      "Auto-classifies STCG vs LTCG based on purchase and sale dates. Shows property indexation choice for acquisitions before July 23, 2024 (Budget 2024 rules).",
      "Uses FY 2026-27 rates unchanged from Budget 2024. No signup, runs entirely in your browser — your financial data stays private.",
    ],
    whenToUseTitle: "When Should You Use the Capital Gains Calculator?",
    useCases: [
      { title: "Equity sale planning", description: "Estimate STCG (20%) or LTCG (12.5% after ₹1.25L exemption) before selling shares." },
      { title: "Property sale", description: "Compare 12.5% without indexation vs 20% with indexation for pre-July 2024 acquisitions." },
      { title: "Debt MF redemption", description: "Understand slab-rate taxation on debt funds purchased after April 2023." },
      { title: "Gold jewellery sale", description: "Calculate LTCG at 12.5% or STCG at your income slab rate." },
      { title: "Tax planning", description: "See effective tax rate and net profit after tax before executing a sale." },
    ],
    faqs: [
      { question: "What is the LTCG tax rate on equity shares in India for 2026?", answer: "Long-term capital gains on listed equity shares and equity mutual funds held for more than 12 months are taxed at 12.5% on gains exceeding ₹1.25 lakh per financial year under Section 112A. This rate was set in Budget 2024 and remains unchanged for FY 2026-27." },
      { question: "What changed in capital gains tax after Budget 2024?", answer: "Budget 2024 made significant changes: STCG on equity rose from 15% to 20%, LTCG on equity rose from 10% to 12.5%, the annual exemption increased from ₹1 lakh to ₹1.25 lakh, and the indexation benefit was removed for most assets. These rates are unchanged for FY 2026-27." },
      { question: "How are short-term capital gains on property taxed in India?", answer: "STCG on property sold within 24 months is added to your total income and taxed at your applicable income tax slab rate (up to 30% plus cess). There is no special flat rate for property STCG, unlike equity shares." },
      { question: "Can I still use indexation for property sold in 2026?", answer: "Yes, but only for immovable property acquired before July 23, 2024. For such property, you can choose between paying 20% with indexation or 12.5% without — whichever results in lower tax. Property acquired on or after July 23, 2024 can only be taxed at 12.5% without indexation." },
      { question: "Is this calculator free?", answer: "Yes. WorkUtilities Capital Gains Tax Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/capital-gains-tax-calculator-india-guide",
      title: "Capital gains tax India 2026 — STCG, LTCG rates & calculator guide",
    },
  },
  "rd-calculator": {
    aboutTitle: "About RD Calculator India",
    aboutParagraphs: [
      "Our free RD Calculator projects recurring deposit maturity value using the standard quarterly compounding formula used by most Indian banks.",
      "Shows total deposited, interest earned, quarter-by-quarter breakdown, TDS notes, and RD vs FD comparison for the same total investment.",
      "Adjust monthly deposit (₹500–₹1 lakh), rate, and tenure (3 months to 10 years). No signup, runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use the RD Calculator?",
    useCases: [
      { title: "Monthly savings planning", description: "Project RD maturity before opening an account at your bank." },
      { title: "RD vs FD decision", description: "Compare lump-sum FD returns vs spread RD deposits for the same total amount." },
      { title: "Interest estimation", description: "See exact interest earned with quarterly compounding breakdown." },
      { title: "TDS planning", description: "Understand when bank TDS applies and Form 15G/15H requirements." },
      { title: "Tenure comparison", description: "Slide tenure from 3 months to 10 years to find optimal maturity." },
    ],
    faqs: [
      { question: "How is RD interest calculated in India?", answer: "RD interest in India is calculated using quarterly compounding. The bank applies interest at one-quarter of the annual rate every three months on the running balance. The standard formula used is M = R × [(1+i)^n − 1] / [1 − (1+i)^(-1/3)], where R is monthly deposit, i is quarterly interest rate, and n is number of quarters." },
      { question: "Is RD interest taxable in India?", answer: 'Yes — RD interest is fully taxable as "Income from Other Sources" at your applicable slab rate. Banks deduct 10% TDS if your total interest (across all deposits at that bank) exceeds ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G or 15H to avoid TDS if your total income is below the taxable limit.' },
      { question: "Which is better — RD or FD?", answer: "If you have a lump sum available, FD typically gives slightly higher returns since the full amount earns interest from day one. If you want to save regularly from monthly income, RD is ideal — it enforces discipline and earns better returns than a regular savings account. For long-term wealth creation with market-linked returns, SIP in equity mutual funds historically outperforms both." },
      { question: "What is the minimum deposit in an RD?", answer: "Most Indian banks allow RD deposits starting from ₹100-₹500 per month, with no maximum limit. The minimum tenure is typically 6 months, and some banks offer RD tenures up to 10 years." },
      { question: "Is this calculator free?", answer: "Yes. WorkUtilities RD Calculator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/rd-calculator-guide-india",
      title: "RD calculator India — how recurring deposits work",
    },
  },
  "glassmorphism-generator": {
    aboutTitle: "About Glassmorphism CSS Generator",
    aboutParagraphs: [
      "Our free Glassmorphism CSS Generator creates frosted glass UI effects with live preview and three export formats — pure CSS, Tailwind classes, and CSS variables.",
      "Adjust blur, transparency, saturation, color tint, border radius, border, and shadow. Six presets plus gradient, photo, and dark preview backgrounds.",
      "Firefox @supports fallback included automatically. No signup, runs entirely in your browser.",
    ],
    whenToUseTitle: "When Should You Use the Glassmorphism Generator?",
    useCases: [
      { title: "UI card design", description: "Create frosted glass cards for dashboards and landing pages." },
      { title: "Modal overlays", description: "Generate semi-transparent modal backgrounds with blur." },
      { title: "Navigation bars", description: "Build Apple-style translucent nav bars with backdrop-filter." },
      { title: "Tailwind projects", description: "Export Tailwind utility classes with arbitrary value syntax." },
      { title: "Design tokens", description: "Export CSS variables for consistent glass styling across a design system." },
    ],
    faqs: [
      { question: "What CSS property creates the glassmorphism effect?", answer: "The glassmorphism effect is primarily created by backdrop-filter: blur() combined with a semi-transparent background (rgba). The blur applies to everything behind the element, creating a frosted glass appearance. You also need a subtle border and box-shadow to give the element definition." },
      { question: "Does glassmorphism work in Firefox?", answer: "As of 2026, Firefox has limited backdrop-filter support — it's disabled by default and requires users to enable a flag in about:config. Always implement a fallback using @supports: if backdrop-filter isn't supported, show a higher-opacity background so text remains readable without the blur effect." },
      { question: "How do I add glassmorphism in Tailwind CSS?", answer: "Use Tailwind's backdrop utilities: backdrop-blur-md for blur, bg-white/20 for 20% opacity background, and rounded-2xl for border radius. Some custom blur values may require arbitrary syntax like [backdrop-filter:blur(16px)]. The pure CSS approach gives you more precise control." },
      { question: "Is glassmorphism bad for performance?", answer: "backdrop-filter is GPU-intensive because each glass element requires a separate blur calculation on the GPU. Using 3-5 glass elements on a page is generally fine. Using 10+ glass elements, or animating the blur value, can cause performance issues especially on mobile. Use sparingly on key UI elements only." },
      { question: "Is this generator free?", answer: "Yes. WorkUtilities Glassmorphism CSS Generator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/glassmorphism-css-generator-guide",
      title: "Glassmorphism CSS generator 2026 — frosted glass UI guide",
    },
  },
  "htaccess-generator": {
    aboutTitle: "About .htaccess Generator",
    aboutParagraphs: [
      "Our free .htaccess Generator builds Apache configuration rules with toggles for HTTPS redirect, www handling, custom error pages, browser caching, GZIP, IP blocking, and file protection.",
      "Live preview updates as you toggle rules. Copy to clipboard or download as .htaccess instantly. Inline help explains what each rule does.",
      "No signup, runs entirely in your browser. Note: .htaccess only works on Apache — not Nginx.",
    ],
    whenToUseTitle: "When Should You Use the .htaccess Generator?",
    useCases: [
      { title: "HTTPS migration", description: "Force all HTTP traffic to HTTPS with a permanent 301 redirect." },
      { title: "WWW canonicalization", description: "Choose force www, remove www, or no change." },
      { title: "Performance tuning", description: "Enable browser caching and GZIP compression for static assets." },
      { title: "Custom error pages", description: "Route 404, 403, and 500 errors to branded pages." },
      { title: "Basic security", description: "Block IPs, disable directory listing, protect .env files." },
    ],
    faqs: [
      { question: "What is an .htaccess file?", answer: "An .htaccess file is a directory-level configuration file used on Apache web servers. It lets you configure URL redirects, browser caching, GZIP compression, custom error pages, and access controls for a specific directory, without needing to modify the main server configuration." },
      { question: "Does .htaccess work on Nginx?", answer: "No — .htaccess is specific to Apache servers. Nginx uses server-block configuration files instead. If your hosting uses Nginx (common on modern cloud hosting), .htaccess rules will be ignored. Check with your host which web server they use." },
      { question: "How do I redirect HTTP to HTTPS using .htaccess?", answer: 'Add these lines to your .htaccess file: "RewriteEngine On / RewriteCond %{HTTPS} off / RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]". This permanently redirects all HTTP requests to HTTPS using a 301 redirect.' },
      { question: "Will incorrect .htaccess rules break my site?", answer: "Yes — a syntax error in .htaccess can cause a 500 Internal Server Error for your entire site or directory. Always back up your existing .htaccess before making changes, and test changes on a staging environment first. Most errors come from incorrect RewriteRule syntax or unclosed tags." },
      { question: "Is this generator free?", answer: "Yes. WorkUtilities .htaccess Generator is free with no signup." },
    ],
    blogGuide: {
      href: "/blog/htaccess-generator-guide",
      title: ".htaccess file guide 2026 — redirects, caching & security",
    },
  },
};

export function getToolSeoContent(slug: ToolSeoSlug): ToolSeoEntry {
  return TOOL_SEO_CONTENT[slug];
}
