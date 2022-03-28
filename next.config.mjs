// @ts-check
import { patchWebpackConfig } from "next-global-css";
import { LicenseWebpackPlugin } from "license-webpack-plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import urlJoin from "proper-url-join";
import envalid from "envalid";

function createLicenseWebpackPlugin() {
  const licensePlugin = new LicenseWebpackPlugin({
    perChunkOutput: false,
  });
  return licensePlugin;
}

const env = envalid.cleanEnv(process.env, {
  ANALYZE: envalid.bool({ default: false }),

  ARANGO_URL: envalid.url(),
  ARANGO_USERNAME: envalid.str(),
  ARANGO_PASSWORD: envalid.str(),
  ARANGO_DATABASE_NAME: envalid.str(),
  ARANGO_MAX_SOCKETS: envalid.num({ default: 1 }),

  EMAIL_HOST: envalid.host(),
  EMAIL_PORT: envalid.port(),
  EMAIL_SECURE: envalid.bool(),
  EMAIL_TO: envalid.str(),
  EMAIL_USERNAME: envalid.str(),
  EMAIL_PASSWORD: envalid.str(),

  S3_ENDPOINT: envalid.url(),
  S3_BUCKET: envalid.str(),
  S3_ACCESS_KEY_ID: envalid.str(),
  S3_SECRET_ACCESS_KEY: envalid.str(),
  S3_STATIC_URL: envalid.url(),

  SESSION_COOKIE_NAME: envalid.str(),
  SESSION_SECRET: envalid.str(),
  SESSION_SECURE: envalid.bool({ devDefault: false, default: true }),

  ANALYTICS_DISABLED: envalid.bool({ devDefault: true, default: false }),

  WEBSITE_DOMAIN: envalid.url(),
});

/**
 * @type {import('./runtime-config').ServerRuntimeConfig}
 */
const serverRuntimeConfig = {
  ARANGO_URL: env.ARANGO_URL,
  ARANGO_USERNAME: env.ARANGO_USERNAME,
  ARANGO_PASSWORD: env.ARANGO_PASSWORD,
  ARANGO_DATABASE_NAME: env.ARANGO_DATABASE_NAME,
  ARANGO_MAX_SOCKETS: env.ARANGO_MAX_SOCKETS,

  EMAIL_HOST: env.EMAIL_HOST,
  EMAIL_PORT: env.EMAIL_PORT,
  EMAIL_SECURE: env.EMAIL_SECURE,
  EMAIL_TO: env.EMAIL_TO,
  EMAIL_USERNAME: env.EMAIL_USERNAME,
  EMAIL_PASSWORD: env.EMAIL_PASSWORD,

  S3_ENDPOINT: env.S3_ENDPOINT,
  S3_BUCKET: env.S3_BUCKET,
  S3_ACCESS_KEY_ID: env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: env.S3_SECRET_ACCESS_KEY,
  S3_STATIC_URL: env.S3_STATIC_URL,

  SESSION_COOKIE_NAME: env.SESSION_COOKIE_NAME,
  SESSION_SECRET: env.SESSION_SECRET,
  SESSION_SECURE: env.SESSION_SECURE,
};

/**
 * @type {import('./runtime-config').PublicRuntimeConfig}
 */
const publicRuntimeConfig = {
  ANALYTICS_DISABLED: env.ANALYTICS_DISABLED,

  WEBSITE_DOMAIN: env.WEBSITE_DOMAIN,
};

/**
 * @type {import('next').NextConfig}
 **/
const defaultConfig = {
  async generateBuildId() {
    return "AdjustToTheGoodLife";
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  serverRuntimeConfig: serverRuntimeConfig,

  publicRuntimeConfig: publicRuntimeConfig,

  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon/favicon.ico",
      },
      {
        source: "/.rss",
        destination: "/rss/",
      },
      {
        source: "/sitemap.xml",
        destination: "/sitemap/",
      },
      {
        source: "/",
        destination: "/home/",
      },
      {
        source: "/blogs/",
        destination: "/blogs/1/",
      },
      {
        source: "/testimonials/",
        destination: "/testimonials/1/",
      },
      {
        //static image rewrite
        source: "/static/:slug*",
        destination: urlJoin(env.S3_STATIC_URL, ":slug*"),
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/testimonials/1/",
        destination: "/testimonials/",
        permanent: true,
      },
      {
        source: "/blogs/1/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/admin/",
        destination: "/admin/dashboard/",
        permanent: true,
      },
    ];
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

if (env.ANALYZE) {
  const withBundleAnalyzer = bundleAnalyzer({ enabled: true });
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
