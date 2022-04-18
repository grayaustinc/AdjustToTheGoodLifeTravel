//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";

//helpers
import getImageAbsoluteUrl from "libs/helper/get-image-absolute-url";
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/e3eb5953b1c0982710657979b7a22c1e.png";

//types
import type { ModifiedBlogDocumentData } from "src/templates/blog/[slug]/types";

interface ImageType {
  src: string;
  srcType: string;
}

interface PropsType {
  blog: ModifiedBlogDocumentData;
}

const MetaComponent: FunctionComponent<PropsType> = ({ blog }) => {
  const canonical = useCanonical();
  const src = getImageAbsoluteUrl(blog.image, 1200) || getImageLoaderAbsoluteSrc(STATIC_IMAGE.src, 1200);

  const published = new Date(blog.published_time).toISOString();
  const modified = new Date(blog.modified_time).toISOString();

  return (
    <>
      <NextSeo
        title={blog.title}
        description={blog.description}
        canonical={canonical}
        noindex={false}
        nofollow={false}
        openGraph={{
          type: "article",
          site_name: "Adjust to the Good Life Travel",
          url: canonical,
          title: blog.title,
          description: blog.description,
          article: {
            section: "Travel",
            publishedTime: published,
            modifiedTime: modified,
          },
          images: [
            {
              url: src,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <ArticleJsonLd
        keyOverride="json-article"
        type="Blog"
        url={canonical}
        title={blog.title}
        description={blog.description}
        images={[src]}
        datePublished={published}
        dateModified={modified}
        authorName={blog.authors}
      />
    </>
  );
};

export default React.memo(MetaComponent);
