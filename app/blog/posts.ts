export type BlogCategory = "PDF" | "Images" | "Photo";

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
};

export function getCategoryBadgeClass(category: BlogCategory): string {
  switch (category) {
    case "PDF":
      return "bg-tool-pdf/10 text-tool-pdf";
    case "Images":
      return "bg-tool-image/10 text-tool-image";
    case "Photo":
      return "bg-tool-photo/10 text-tool-photo";
  }
}
