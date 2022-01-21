//node_modules
import metascraper from "metascraper";
import metascraperUrl from "metascraper-url";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperDate from "metascraper-date";

//logger
import logger from "libs/logger";

//libs
import { ServerError } from "libs/errors";

const scraper = metascraper([metascraperUrl(), metascraperImage(), metascraperTitle(), metascraperDate()]);

async function handler(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });

    const html = await response.text();

    const metadata = await scraper({ html, url });

    return metadata;
  } catch (error: any) {
    logger.log("error", error);
    throw new ServerError("Could not retrieve metadata");
  }
}

export default handler;
