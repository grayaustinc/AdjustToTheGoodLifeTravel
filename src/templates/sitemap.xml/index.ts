import { GetServerSideProps } from "next";
import getConfig from "next/config";
import { getServerSideSitemap } from "next-sitemap";

//libs
import getSlugs from "./get-slugs";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [
    {
      loc: new URL("", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/about/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/testimonials/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/sandals-beaches-resorts/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/contact/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/services/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/faq/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/blogs/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
    {
      loc: new URL("/press/", NEXT_PUBLIC_WEBSITE_DOMAIN).href,
    },
  ];

  const slugs = await getSlugs();

  slugs.forEach((slug) => {
    fields.push({ loc: `${NEXT_PUBLIC_WEBSITE_DOMAIN}/blog/${slug}/` });
  });

  return getServerSideSitemap(ctx, fields);
};
