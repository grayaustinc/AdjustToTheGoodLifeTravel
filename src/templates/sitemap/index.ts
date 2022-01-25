//node_modules
import { GetServerSideProps } from "next";
import getConfig from "next/config";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import formatISO from "date-fns/formatISO";

//libs
import getBlogs from "./get-blogs";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = [
    {
      loc: new URL("/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "monthly",
    },
    {
      loc: new URL("/about/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "monthly",
    },
    {
      loc: new URL("/testimonials/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "monthly",
    },
    {
      loc: new URL("/sandals-beaches-resorts/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "yearly",
    },
    {
      loc: new URL("/contact/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "yearly",
    },
    {
      loc: new URL("/services/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "yearly",
    },
    {
      loc: new URL("/faq/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "yearly",
    },
    {
      loc: new URL("/blogs/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "weekly",
    },
    {
      loc: new URL("/press/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
      changefreq: "monthly",
    },
  ];

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    fields.push({ loc: `${NEXT_PUBLIC_WEBSITE_DOMAIN}/blog/${blog.slug}/`, lastmod: formatISO(blog.modified_time) });
  });

  return getServerSideSitemap(ctx, fields);
};
