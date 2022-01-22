//node_modules
import { GetServerSideProps } from "next";
import RSS from "rss";
import getConfig from "next/config";
import formatDate from "date-fns/format";

//libs
import getBlogs from "./get-blogs";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const feed = new RSS({
    title: "Adjust to the Good Life Travel Blogs",
    description: "A list of all of the currently known blogs",
    feed_url: `${NEXT_PUBLIC_WEBSITE_DOMAIN}/rss.xml`,
    site_url: NEXT_PUBLIC_WEBSITE_DOMAIN,
    ttl: 24 * 60,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.description,
      url: `${NEXT_PUBLIC_WEBSITE_DOMAIN}/blog/${blog.slug}/`,
      date: formatDate(blog.published_time, "MMMM dd, yyyy"),
    });
  });

  ctx.res.setHeader("Content-Type", "application/rss+xml");
  ctx.res.write(feed.xml());
  ctx.res.end();

  return {
    props: {},
  };
};
