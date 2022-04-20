const sizes = [64, 96, 128, 256, 384, 640, 750, 1080, 1200, 1920] as const;

export type Sizes = typeof sizes[number];

export default sizes;
