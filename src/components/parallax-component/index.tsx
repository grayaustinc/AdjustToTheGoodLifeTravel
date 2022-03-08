//node_modules
import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useFirstMountState } from "react-use";
import NextImage from "next/image";

//utils
import { isScrolledIntoView, getRelativePosition, getImageHeight } from "./utils";

//components
import ParallaxChildren from "./components/parallax-children-component";

//styles
import styles from "./styles/parallax.module.scss";

interface ParallaxProps {
  bgImage: StaticImageData;
  bgImageAlt: string;
  strength: number;
  priority?: boolean;
  quality?: number;
}

const ParallaxComponent: FunctionComponent<ParallaxProps> = ({ bgImage, bgImageAlt, strength, children, priority, quality }) => {
  const firstMount = useFirstMountState();
  const image = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    if (!content.current) return;
    if (!isScrolledIntoView(content.current, 100)) return;

    const percentage = getRelativePosition(content.current);
    const { height } = content.current.getBoundingClientRect();

    const inverse = strength < 0;
    const pos = (inverse ? strength : 0) - strength * percentage;
    if (!image.current) return;
    image.current.style.transform = `translate(0, ${pos}px)`;
    image.current.style.height = `${getImageHeight(strength, height)}px`;
  }, [image, content, strength]);

  useEffect(() => {
    document.addEventListener("resize", update);
    document.addEventListener("scroll", update);
    update();
    return () => {
      document.removeEventListener("resize", update);
      document.removeEventListener("scroll", update);
    };
  }, [update]);

  if (firstMount) {
    update();
  }

  return (
    <div ref={content} className={styles["content"]}>
      <div ref={image} className={styles["wrapper"]}>
        <NextImage className={styles["image"]} src={bgImage} alt={bgImageAlt} quality={quality || 80} sizes="2048px" objectFit="cover" layout="responsive" priority={priority} />
      </div>
      <ParallaxChildren>{children}</ParallaxChildren>
    </div>
  );
};

export default ParallaxComponent;
