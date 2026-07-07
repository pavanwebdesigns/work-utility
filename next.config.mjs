import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://*.railway.app https://api.frankfurter.app https://api.coingecko.com https://cloudflare-dns.com https://ip-api.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@imgly/background-removal"],
  experimental: {
    serverComponentsExternalPackages: ["onnxruntime-web", "onnxruntime-node"],
    staleTimes: {
      dynamic: 30,
      static: 0,
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://workutilities.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer, webpack }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    config.module.rules.push(
      {
        test: /\.wasm$/,
        type: "asset/resource",
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node": false,
      "@imgly/background-removal$": path.resolve(
        __dirname,
        "node_modules/@imgly/background-removal/dist/index.mjs"
      ),
      "onnxruntime-web/webgpu$": path.resolve(
        __dirname,
        "lib/shims/onnxruntime-web-webgpu.mjs"
      ),
      "onnxruntime-web$": path.resolve(
        __dirname,
        "lib/shims/onnxruntime-web.mjs"
      ),
    };

    if (isServer) {
      config.externals = [...(config.externals || []), "onnxruntime-node"];
    } else {
      config.output.globalObject = "self";
      config.resolve.mainFields = ["browser", "module", "main"];
      config.resolve.conditionNames = [
        "browser",
        "import",
        "module",
        "require",
        "default",
      ];
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /ort\.node\.min\.mjs$/,
        })
      );
    }

    return config;
  },
};

export default nextConfig;
