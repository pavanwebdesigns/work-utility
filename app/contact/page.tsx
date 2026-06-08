import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: {
    absolute: "Contact — WorkUtilities",
  },
  description:
    "Contact WorkUtilities or request a new tool. Questions, feedback, and feature requests welcome.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
