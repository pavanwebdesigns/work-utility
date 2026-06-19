import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Online Audio Recorder Free — Record from Browser",
  },
  description:
    "Record audio from your microphone in the browser. Pause, resume, timer, and download sessions as WebM. No upload — works locally in your browser.",
  keywords:
    "online audio recorder, record audio browser, free voice recorder, webm audio recorder",
  openGraph: {
    title: "Online Audio Recorder Free — Record from Browser",
    description:
      "Free browser audio recorder with pause, resume, and WebM download.",
    url: "https://workutilities.com/tools/audio-recorder",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/audio-recorder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
