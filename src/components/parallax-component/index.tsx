//node_modules
import React, { CSSProperties, FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import assign from "lodash/assign";
import { useMedia } from "react-use";
import NextImage, { StaticImageData } from "next/image";

//utils
import { isScrolledIntoView, getRelativePosition, getImageHeight } from "./utils";

//components
import ParallaxChildren from "./components/parallax-children-component";

//styles
import styles from "./styles/parallax.module.scss";

//sizes
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

interface ParallaxProps {
  bgImage: StaticImageData;
  bgImageAlt: string;
  strength: number;
  priority?: boolean;
  quality?: number;
}

const sizes = getBootstrapSizes({ xs: 1080, md: 1200, xl: 1920 });

function calculateStyle(strength: number, height: number, percentage: number) {
  const inverse = strength < 0;
  const pos = (inverse ? strength : 0) - strength * percentage;
  const style: CSSProperties = {
    transform: `translate(0, ${pos}px)`,
    height: `${getImageHeight(strength, height)}px`,
  };
  return style;
}

const ParallaxComponent: FunctionComponent<PropsWithChildren<ParallaxProps>> = ({ bgImage, bgImageAlt, strength, children, priority, quality }) => {
  const motion = useMedia("(prefers-reduced-motion)", false);

  const image = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const initialStyle = calculateStyle(strength, bgImage.height, 0.5);

  const update = useCallback(() => {
    if (!content.current) return;
    if (!isScrolledIntoView(content.current, 100)) return;

    const percentage = getRelativePosition(content.current);
    const { height } = content.current.getBoundingClientRect();

    if (!image.current) return;
    const style = calculateStyle(strength, height, percentage);
    assign(image.current.style, style);
  }, [image, content, strength]);

  useEffect(() => {
    if (motion === false) {
      update();
      document.addEventListener("resize", update);
      document.addEventListener("scroll", update);
      return () => {
        document.removeEventListener("resize", update);
        document.removeEventListener("scroll", update);
      };
    }
  }, [motion, update]);

  return (
    <div ref={content} className={styles["content"]}>
      <div ref={image} className={styles["wrapper"]} style={initialStyle}>
        <NextImage
          className={styles["image"]}
          src={bgImage}
          alt={bgImageAlt}
          quality={quality || 80}
          sizes={sizes}
          objectFit="cover"
          layout="responsive"
          placeholder={priority ? "empty" : "blur"}
          priority={priority}
        />
      </div>
      <ParallaxChildren>{children}</ParallaxChildren>
    </div>
  );
};

export default ParallaxComponent;
