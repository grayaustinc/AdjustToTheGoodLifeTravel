//import node_modules
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Tooltip, Nav, Overlay, Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faPinterest, faTwitter, faReddit, faTumblr } from "@fortawesome/free-brands-svg-icons";
import urlJoin from "proper-url-join";
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
  const url = getWebsiteUrl(`/blog/${slug}/`);

  const facebookHref = urlJoin("https://www.facebook.com/sharer/sharer.php", { query: { u: url } });
  const redditHref = urlJoin("https://www.reddit.com/submit", { query: { title: title, url: url } });
  const twitterHref = urlJoin("https://twitter.com/intent/tweet", { query: { url: url, text: title } });
  const pinterestHref = urlJoin("https://pinterest.com/pin/create/button/", { query: { url: url, description: description, media: src || "" } });
  const linkedinHref = urlJoin("https://www.linkedin.com/sharing/share-offsite/", { query: { url: url } });
  const tumblrHref = urlJoin("https://www.tumblr.com/widgets/share/tool", { query: { canonicalUrl: url, title: title, caption: description } });

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
    <Container className={style["share"]}>
      <div className={style["header"]}>Share Links</div>
      <Nav className="justify-content-center">
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link ref={target} className="text-center" onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faLink} color="#000000" />
            <span className="mx-1 my-auto text-black">Link</span>
          </Nav.Link>
        </Col>
        <Overlay target={target} show={show} placement="bottom">
          <Tooltip>Copied!</Tooltip>
        </Overlay>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={facebookHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faFacebook} color="#4267B2" />
            <span className="mx-1 my-auto text-black">Facebook</span>
          </Nav.Link>
        </Col>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={twitterHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
            <span className="mx-1 my-auto text-black">Twitter</span>
          </Nav.Link>
        </Col>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={pinterestHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faPinterest} color="#E60023" />
            <span className="mx-1 my-auto text-black">Pinterest</span>
          </Nav.Link>
        </Col>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={tumblrHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faTumblr} color="#000000" />
            <span className="mx-1 my-auto text-black">Tumblr</span>
          </Nav.Link>
        </Col>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={linkedinHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} color="#0072b1" />
            <span className="mx-1 my-auto text-black">LinkedIn</span>
          </Nav.Link>
        </Col>
        <Col xs="auto" sm={4} md={3} lg="auto">
          <Nav.Link href={redditHref} className="text-center" rel="noopener nofollow" target="_blank">
            <FontAwesomeIcon icon={faReddit} color="#FF4500" />
            <span className="mx-1 my-auto text-black">Reddit</span>
          </Nav.Link>
        </Col>
      </Nav>
    </Container>
  );
};

export default React.memo(ShareLinksComponent);
