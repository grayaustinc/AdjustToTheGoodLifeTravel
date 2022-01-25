//import node_modules
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Tooltip, Nav, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";
import urljoin from "proper-url-join";
import clipboardy from "clipboardy";

//helpers
import getWebsiteUrl from "libs/helper/get-website-url";
import getImageAbsoluteUrl from "libs/helper/get-image-absolute-url";

//types
import type { ImageType } from "libs/arangodb/collections/blogs";

//styles
import style from "../blog.module.scss";

interface ShareLinksProps {
  title: string;
  description: string;
  slug: string;
  image?: ImageType | null;
}

const ShareLinksComponent: FunctionComponent<ShareLinksProps> = ({ title, description, slug, image }) => {
  const [show, setShow] = useState(false);
  const target = useRef<HTMLAnchorElement>(null);

  const src = getImageAbsoluteUrl(image, 1200);
  const e_src = src ? encodeURIComponent(src) : null;
  const url = getWebsiteUrl(`/blog/${slug}/`);
  const e_url = encodeURIComponent(url);
  const e_desc = encodeURIComponent(description);

  const facebookHref = urljoin("https://www.facebook.com/sharer/sharer.php", `?u=${e_url}`);
  const twitterHref = urljoin("https://twitter.com/intent/tweet", `?url=${e_url}`, `?text=${e_desc}`);
  const pinterestHref = urljoin("https://pinterest.com/pin/create/button/", `?url=${e_url}`, `?description=${e_desc}`, e_src ? `?media=${e_src}` : "");
  const linkedinHref = urljoin("https://www.linkedin.com/shareArticle", "?mini=true", `?url=${e_url}`);

  const copyToClipboard = useCallback(() => {
    clipboardy.write(url).then(() => {
      setShow(true);
    });
  }, [setShow]);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div>
      <div className={style["header"]}>Share Links</div>
      <Nav className="justify-content-center">
        <Nav.Link ref={target} onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faLink} color="#000000" />
          <span className="mx-1 my-auto text-black">Link</span>
        </Nav.Link>
        <Overlay target={target} show={show} placement="bottom">
          <Tooltip>Copied!</Tooltip>
        </Overlay>
        <Nav.Link href={facebookHref} rel="noopener nofollow" target="_blank">
          <FontAwesomeIcon icon={faFacebook} color="#4267B2" />
          <span className="mx-1 my-auto text-black">Facebook</span>
        </Nav.Link>
        <Nav.Link href={twitterHref} rel="noopener nofollow" target="_blank">
          <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
          <span className="mx-1 my-auto text-black">Twitter</span>
        </Nav.Link>
        <Nav.Link href={pinterestHref} rel="noopener nofollow" target="_blank">
          <FontAwesomeIcon icon={faPinterest} color="#E60023" />
          <span className="mx-1 my-auto text-black">Pinterest</span>
        </Nav.Link>
        <Nav.Link href={linkedinHref} rel="noopener nofollow" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} color="#0072b1" />
          <span className="mx-1 my-auto text-black">Linkedin</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default React.memo(ShareLinksComponent);
