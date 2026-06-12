export type ToolSeoSlug =
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
  | "qr-code-generator"
  | "word-counter"
  | "age-calculator";

type ToolSeoEntry = {
  aboutTitle: string;
  aboutParagraphs: string[];
  whenToUseTitle: string;
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const TOOL_SEO_CONTENT: Record<ToolSeoSlug, ToolSeoEntry> = {
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
  },
  "bg-remove": {
    aboutTitle: "About Background Remover Tool",
    aboutParagraphs: [
      "Our free Background Remover instantly cuts out subjects from photos and replaces cluttered backgrounds with clean white or transparent backgrounds. Perfect for passport photos, product listings, and professional headshots.",
      "Processing runs entirely in your browser using client-side AI — your photos are never uploaded to external servers. Personal ID photos, product shots, and profile pictures stay private on your device.",
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
          "Yes. WorkUtilities runs background removal in your browser. Images are not stored on our servers.",
      },
      {
        question: "How to remove background for product photos India?",
        answer:
          "Upload product shots, remove the background, and download white-background PNGs ready for Meesho, Amazon, or your own store.",
      },
    ],
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
  },
  "word-counter": {
    aboutTitle: "About Word Counter Tool",
    aboutParagraphs: [
      "Our free Word Counter instantly counts words, characters, sentences, and paragraphs in any text you paste or type. See reading time estimates and check limits before submitting essays, posts, or assignments.",
      "Everything runs in your browser — your text is never uploaded to a server. Draft essays, cover letters, and confidential notes stay private on your device while you check counts in real time.",
      "Essential for Indian students hitting UPSC essay word limits, college assignment requirements, content writers tracking article length, and social media users checking character counts for posts. Paste from Word, Google Docs, or any editor and get instant stats without installing apps.",
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
          "Count characters for Twitter/X, LinkedIn, and Instagram captions.",
      },
      {
        title: "Email length",
        description:
          "Keep professional emails concise by tracking word and character counts.",
      },
      {
        title: "College assignment requirements",
        description:
          "Match exact word counts specified in syllabus or portal instructions.",
      },
      {
        title: "Content writing",
        description:
          "Track article, blog, and SEO content length while drafting.",
      },
    ],
    faqs: [
      {
        question: "How to count words in a document free?",
        answer:
          "Paste or type your text into the box — word, character, and sentence counts update instantly.",
      },
      {
        question: "What is the word limit for UPSC essay?",
        answer:
          "UPSC essay papers typically specify limits in the notification — often around 1000–1200 words. Use our counter to stay within the stated limit.",
      },
      {
        question: "How many characters are allowed on Twitter/X?",
        answer:
          "Standard posts allow 280 characters. Premium accounts may have higher limits — check your character count here before posting.",
      },
      {
        question: "How to check reading time of an article?",
        answer:
          "Our tool estimates reading time based on word count using average reading speed.",
      },
      {
        question: "Does word counter count spaces?",
        answer:
          "Character counts typically include spaces. Word counts split on whitespace — check both metrics for your specific requirement.",
      },
    ],
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
        question: "How to calculate exact age in years months days?",
        answer:
          "Enter your date of birth and optionally a reference date — the calculator shows precise years, months, and days.",
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
  },
};

export function getToolSeoContent(slug: ToolSeoSlug): ToolSeoEntry {
  return TOOL_SEO_CONTENT[slug];
}
