export type WwwMode = "none" | "force-www" | "remove-www";

export type HtaccessConfig = {
  httpsRedirect: boolean;
  wwwMode: WwwMode;
  error404: string;
  error403: string;
  error500: string;
  browserCaching: boolean;
  gzip: boolean;
  blockIps: string;
  disableDirectoryListing: boolean;
  protectFiles: string;
};

export const DEFAULT_HTACCESS: HtaccessConfig = {
  httpsRedirect: true,
  wwwMode: "none",
  error404: "",
  error403: "",
  error500: "",
  browserCaching: false,
  gzip: false,
  blockIps: "",
  disableDirectoryListing: true,
  protectFiles: ".env\nconfig.php",
};

export const HTACCESS_RULE_INFO: Record<
  keyof HtaccessConfig,
  { title: string; help: string }
> = {
  httpsRedirect: {
    title: "Redirect HTTP to HTTPS",
    help: "Forces all HTTP traffic to HTTPS with a permanent 301 redirect — essential for security and SEO in 2026.",
  },
  wwwMode: {
    title: "WWW redirect",
    help: "Choose whether to force www, remove www, or leave URLs unchanged.",
  },
  error404: {
    title: "404 Not Found page",
    help: "Path to your custom 404 error page (e.g. /404.html).",
  },
  error403: {
    title: "403 Forbidden page",
    help: "Path to your custom 403 error page.",
  },
  error500: {
    title: "500 Server Error page",
    help: "Path to your custom 500 error page.",
  },
  browserCaching: {
    title: "Browser caching",
    help: "Sets cache expiry headers for static assets using mod_expires — speeds up repeat visits.",
  },
  gzip: {
    title: "GZIP compression",
    help: "Compresses text assets before sending using mod_deflate — reduces bandwidth.",
  },
  blockIps: {
    title: "Block IP addresses",
    help: "Deny access from specific IP addresses — one IP per line.",
  },
  disableDirectoryListing: {
    title: "Disable directory listing",
    help: "Prevents visitors from browsing folder contents when no index file exists.",
  },
  protectFiles: {
    title: "Protect sensitive files",
    help: "Block direct access to sensitive files like .env or config.php — one pattern per line.",
  },
};

function escapePattern(pattern: string): string {
  return pattern.trim().replace(/\./g, "\\.");
}

export function generateHtaccess(config: HtaccessConfig): string {
  const sections: string[] = [];

  const needsRewrite =
    config.httpsRedirect || config.wwwMode !== "none";

  if (needsRewrite) {
    const lines = ["# URL Rewrites", "RewriteEngine On"];

    if (config.httpsRedirect) {
      lines.push(
        "",
        "# Redirect HTTP to HTTPS",
        "RewriteCond %{HTTPS} off",
        "RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]",
      );
    }

    if (config.wwwMode === "force-www") {
      lines.push(
        "",
        "# Force www",
        "RewriteCond %{HTTP_HOST} !^www\\. [NC]",
        "RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]",
      );
    } else if (config.wwwMode === "remove-www") {
      lines.push(
        "",
        "# Remove www",
        "RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]",
        "RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]",
      );
    }

    sections.push(lines.join("\n"));
  }

  const errorDocs: string[] = [];
  if (config.error404.trim()) {
    errorDocs.push(`ErrorDocument 404 ${config.error404.trim()}`);
  }
  if (config.error403.trim()) {
    errorDocs.push(`ErrorDocument 403 ${config.error403.trim()}`);
  }
  if (config.error500.trim()) {
    errorDocs.push(`ErrorDocument 500 ${config.error500.trim()}`);
  }
  if (errorDocs.length) {
    sections.push(["# Custom error pages", ...errorDocs].join("\n"));
  }

  if (config.browserCaching) {
    sections.push(`# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`);
  }

  if (config.gzip) {
    sections.push(`# GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json text/plain
</IfModule>`);
  }

  const ips = config.blockIps
    .split("\n")
    .map((ip) => ip.trim())
    .filter(Boolean);
  if (ips.length) {
    sections.push(
      [
        "# Block specific IPs",
        "Order Deny,Allow",
        ...ips.map((ip) => `Deny from ${ip}`),
      ].join("\n"),
    );
  }

  if (config.disableDirectoryListing) {
    sections.push(`# Disable directory browsing\nOptions -Indexes`);
  }

  const patterns = config.protectFiles
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  if (patterns.length) {
    const joined = patterns.map(escapePattern).join("|");
    sections.push(`# Protect sensitive files
<FilesMatch "(${joined})$">
  Order Allow,Deny
  Deny from all
</FilesMatch>`);
  }

  return sections.join("\n\n") + (sections.length ? "\n" : "");
}
