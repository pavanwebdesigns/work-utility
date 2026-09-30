import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

const CONTACT_TITLE = "Contact — WorkUtilities";
const CONTACT_DESCRIPTION =
  "Contact WorkUtilities or request a new tool. Questions, feedback, and feature requests welcome.";

export const metadata: Metadata = {
  title: {
    absolute: CONTACT_TITLE,
  },
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "https://workutilities.com/contact" },
  openGraph: buildOpenGraph({
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    url: "https://workutilities.com/contact",
    type: "website",
  }),
};

export default function ContactPage() {
  return <ContactPageClient />;
}
