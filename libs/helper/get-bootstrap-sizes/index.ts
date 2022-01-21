const widths = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

export type ImageWidth = typeof widths[number];

function bootstrapSizer(xs: ImageWidth, sm: ImageWidth, md: ImageWidth, lg: ImageWidth, xl: ImageWidth, xxl: ImageWidth) {
  return [`(min-width: 1400px) ${xxl}px`, `(min-width: 1200px) ${xl}px`, `(min-width: 992px) ${lg}px`, `(min-width: 768px) ${md}px`, `(min-width: 576px) ${sm}px`, `${xs}px`].join(
    ","
  );
}

export default bootstrapSizer;
