//node_modules
import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import formatISO from "date-fns/formatISO";

//helper
import cache from "libs/cache";
import getWebsiteUrl from "libs/helper/get-website-url";

//libs
import getBlogs from "./get-blogs";

const CACHE_KEY = "sitemap-fields";

async function generateFields() {
  const fields: ISitemapField[] = [
    {
      loc: getWebsiteUrl("/"),
      changefreq: "monthly",
    },
    {
      loc: getWebsiteUrl("/about/"),
      changefreq: "monthly",
    },
    {
      loc: getWebsiteUrl("/testimonials/"),
      changefreq: "monthly",
    },
    {
      loc: getWebsiteUrl("/sandals-beaches-resorts/"),
      changefreq: "yearly",
    },
    {
      loc: getWebsiteUrl("/contact/"),
      changefreq: "yearly",
    },
    {
      loc: getWebsiteUrl("/services/"),
      changefreq: "yearly",
    },
    {
      loc: getWebsiteUrl("/faq/"),
      changefreq: "yearly",
    },
    {
      loc: getWebsiteUrl("/blogs/"),
      changefreq: "weekly",
    },
    // {
    //   loc: getWebsiteUrl("/press/"),
    //   changefreq: "monthly",
    // },
  ];

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    fields.push({ loc: getWebsiteUrl(`/blog/${blog.slug}/`), lastmod: formatISO(blog.modified_time) });
  });
  return fields;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let fields = cache.get<ISitemapField[]>(CACHE_KEY);
  if (!fields) {
    fields = await generateFields();
    cache.set(CACHE_KEY, fields, 60 * 60);
  }

  return getServerSideSitemap(ctx, fields);
};
