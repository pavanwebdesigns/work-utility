import Link from "next/link";

type ToolLink = {
  href: string;
  label: string;
};

const defaultLinks: ToolLink[] = [
  { href: "/tools/pdf-merge", label: "PDF Merge" },
  { href: "/tools/pdf-split", label: "PDF Split" },
  { href: "/tools/image-compress", label: "Image Compress" },
];

export function ToolComingSoon({ links = defaultLinks }: { links?: ToolLink[] }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 text-5xl">🔧</div>
      <h2 className="mb-3 text-2xl font-semibold text-content-primary">
        We&apos;re Upgrading This Tool
      </h2>
      <p className="mb-6 max-w-md text-gray-400">
        This tool is currently being improved for better results. It will be back
        soon!
      </p>
      <p className="text-sm text-gray-500">Meanwhile, try our other tools:</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:bg-gray-800"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
