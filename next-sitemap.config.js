//@ts-check
//TODO add env files to this
//TODO dynamic?
/**
 * @type {import("next-sitemap").IConfig}
 */
const config = {
  changefreq: "weekly",
  priority: 0.7,
  siteUrl: "https://example.com",
  sitemapSize: 5000,
  generateRobotsTxt: true,
  autoLastmod: true,
  exclude: ["/admin/", "/admin/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

module.exports = config;
