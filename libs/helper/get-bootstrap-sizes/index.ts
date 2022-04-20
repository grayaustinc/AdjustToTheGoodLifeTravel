import type { Sizes } from "../sizes";

interface SizeType {
  xs: Sizes;
  sm?: Sizes;
  md?: Sizes;
  lg?: Sizes;
  xl?: Sizes;
  xxl?: Sizes;
}

function bootstrapSizer(data: SizeType): string {
  const sizes: string[] = [];

  if (data.xxl) {
    sizes.push(`(min-width: 1400px) ${data.xxl}px`);
  }
  if (data.xl) {
    sizes.push(`(min-width: 1200px) ${data.xl}px`);
  }
  if (data.lg) {
    sizes.push(`(min-width: 992px) ${data.lg}px`);
  }
  if (data.md) {
    sizes.push(`(min-width: 768px) ${data.md}px`);
  }
  if (data.sm) {
    sizes.push(`(min-width: 576px) ${data.sm}px`);
  }

  sizes.push(`${data.xs}px`);

  return sizes.join(",");
}

export default bootstrapSizer;
