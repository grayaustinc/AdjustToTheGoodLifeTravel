// @ts-check

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const CAN_ANALYZE = process.env.ANALYZE === "true";
import { LicenseWebpackPlugin } from "license-webpack-plugin";
import withPWA from "next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";

function createLicenseWebpackPlugin() {
  const licensePlugin = new LicenseWebpackPlugin({
    perChunkOutput: false,
  });
  return licensePlugin;
}

import envalid from "envalid";

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
  S3_ACCESS_KEY_ID: envalid.str(),
  S3_SECRET_ACCESS_KEY: envalid.str(),

  SESSION_COOKIE_NAME: envalid.str(),
  SESSION_SECRET: envalid.str(),
});

/**
 * @type {import('./runtime-config').PublicRuntimeConfig}
 */
const publicRuntimeConfig = envalid.cleanEnv(process.env, {
  NEXT_PUBLIC_WEBSITE_DOMAIN: envalid.host(),
  NEXT_PUBLIC_STATIC_DOMAIN: envalid.host(),
});

/**
 * @type {import('next').NextConfig}
 **/
const defaultConfig = {
  async generateBuildId() {
    return "AdjustToTheGoodLife";
  },

  images: {
    domains: ["127.0.0.1", "localhost", publicRuntimeConfig.NEXT_PUBLIC_WEBSITE_DOMAIN, publicRuntimeConfig.NEXT_PUBLIC_STATIC_DOMAIN],
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
        //admin users
        source: "/admin/users/",
        destination: "/admin/users/view/1/",
      },
      {
        //admin users
        source: "/admin/users/view/",
        destination: "/admin/users/view/1/",
      },
      {
        //admin mentions
        source: "/admin/mentions/",
        destination: "/admin/mentions/view/1/",
      },
      {
        //admin mentions
        source: "/admin/mentions/view/",
        destination: "/admin/mentions/view/1/",
      },
      {
        //admin blogs
        source: "/admin/blogs/",
        destination: "/admin/blogs/view/1/",
      },
      {
        //admin blogs
        source: "/admin/blogs/view/",
        destination: "/admin/blogs/view/1/",
      },
      {
        //admin locations
        source: "/admin/locations/",
        destination: "/admin/locations/view/1/",
      },
      {
        //admin locations
        source: "/admin/locations/view/",
        destination: "/admin/locations/view/1/",
      },
      {
        //admin testimonials
        source: "/admin/testimonials/",
        destination: "/admin/testimonials/view/1/",
      },
      {
        //admin testimonials
        source: "/admin/testimonials/view/",
        destination: "/admin/testimonials/view/1/",
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
    mode: "production",
  },

  compress: true,
  swcMinify: true,
  optimizeCss: true,
  optimizeImages: true,
  cleanDistDir: true,
  workerThreads: true,
  optimizeFonts: true,
  generateEtags: true,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  excludeDefaultMomentLocales: true,

  webpack(config, { dev, isServer }) {
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
