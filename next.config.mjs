import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
