//node_modules
import { GetServerSideProps } from "next";
import RSS from "rss";
import formatDate from "date-fns/format";

//helper
import cache from "libs/cache";
import getWebsiteUrl from "libs/helper/get-website-url";

//libs
import getBlogs from "./get-blogs";

const CACHE_KEY = "rss-xml";

async function generateXML() {
  const feed = new RSS({
    title: "Adjust to the Good Life Travel Blogs",
    description: "A list of all of the currently known blogs",
    feed_url: getWebsiteUrl("/rss/"),
    site_url: getWebsiteUrl("/"),
    ttl: 60,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.description,
      url: getWebsiteUrl(`/blog/${blog.slug}/`),
      date: formatDate(blog.published_time, "MMMM dd, yyyy"),
    });
  });

  return feed.xml();
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let xml = cache.get<string>(CACHE_KEY);
  if (!xml) {
    xml = await generateXML();
    cache.set(CACHE_KEY, xml, 60 * 60);
  }

  ctx.res.setHeader("Content-Type", "application/rss+xml");
  ctx.res.write(xml);
  ctx.res.end();

  return {
    props: {},
  };
};
