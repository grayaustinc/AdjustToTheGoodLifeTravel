// @ts-check
import { patchWebpackConfig } from "next-global-css";
import { LicenseWebpackPlugin } from "license-webpack-plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPWA from "next-pwa";
import envalid from "envalid";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const CAN_ANALYZE = process.env.ANALYZE === "true";

function createLicenseWebpackPlugin() {
  const licensePlugin = new LicenseWebpackPlugin({
    perChunkOutput: false,
  });
  return licensePlugin;
}

/**
 * @type {import('./runtime-config').ServerRuntimeConfig}
 */
const serverRuntimeConfig = envalid.cleanEnv(process.env, {
  ARANGO_URL: envalid.host(),
  ARANGO_USERNAME: envalid.str(),
  ARANGO_PASSWORD: envalid.str(),
  ARANGO_DATABASE_NAME: envalid.str(),
  ARANGO_MAX_SOCKETS: envalid.num(),

  EMAIL_HOST: envalid.host(),
  EMAIL_PORT: envalid.port(),
  EMAIL_SECURE: envalid.bool(),
  EMAIL_TO: envalid.str(),
  EMAIL_USERNAME: envalid.str(),
  EMAIL_PASSWORD: envalid.str(),

  S3_ENDPOINT: envalid.host(),
  S3_BUCKET: envalid.str(),
  S3_ACCESS_KEY_ID: envalid.str(),
  S3_SECRET_ACCESS_KEY: envalid.str(),
  S3_STATIC_DOMAIN: envalid.host(),

  SESSION_COOKIE_NAME: envalid.str(),
  SESSION_SECRET: envalid.str(),
});

/**
 * @type {import('./runtime-config').PublicRuntimeConfig}
 */
const publicRuntimeConfig = envalid.cleanEnv(process.env, {
  NEXT_PUBLIC_WEBSITE_DOMAIN: envalid.url(),
  NEXT_PUBLIC_STATIC_DOMAIN: envalid.url(),
});

/**
 * @type {import('next').NextConfig}
 **/
const defaultConfig = {
  async generateBuildId() {
    return "AdjustToTheGoodLife";
  },

  images: {
    domains: ["127.0.0.1", "localhost", serverRuntimeConfig.S3_STATIC_DOMAIN],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  serverRuntimeConfig: { ...serverRuntimeConfig },

  publicRuntimeConfig: { ...publicRuntimeConfig },

  async rewrites() {
    return [
      {
        //favicon
        source: "/favicon.ico",
        destination: "/favicon/favicon.ico",
      },
      {
        //rss
        source: "/.rss",
        destination: "/rss/",
      },
      {
        //sitemap
        source: "/sitemap.xml",
        destination: "/sitemap/",
      },
      {
        //home
        source: "/",
        destination: "/home/",
      },
      {
        //blogs
        source: "/blogs/",
        destination: "/blogs/1/",
      },
      {
        //testimonials
        source: "/testimonials/",
        destination: "/testimonials/1/",
      },
      {
        //admin
        source: "/admin/",
        destination: "/admin/dashboard/",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/blog/",
        destination: "/blogs/",
        permanent: true,
      },
    ];
  },

  //next-pwa configuration
  pwa: {
    dest: "public",
    register: true,
    disable: !IS_PRODUCTION,
    dynamicStartUrl: false,
    cacheOnFrontEndNav: true,
    buildExcludes: [/media\/.*$/],
    mode: "production",
  },

  compress: false,
  swcMinify: true,
  optimizeCss: true,
  optimizeImages: true,
  cleanDistDir: true,
  workerThreads: true,
  optimizeFonts: true,
  generateEtags: true,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: true,
  productionBrowserSourceMaps: false,
  excludeDefaultMomentLocales: true,

  webpack(config, { dev, isServer }) {
    patchWebpackConfig(config, { isServer });
    if (isServer) return config;
    if (!dev && !isServer) {
      config.plugins?.push(createLicenseWebpackPlugin());
    }
    return config;
  },
};

let nextConfig = defaultConfig;

if (CAN_ANALYZE) {
  const withBundleAnalyzer = bundleAnalyzer({ enabled: true });
  nextConfig = withBundleAnalyzer(nextConfig);
}

nextConfig = withPWA(nextConfig);

export default nextConfig;
