export function getWindowHeight() {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.body.firstElementChild;
  return w.innerHeight || e.clientHeight || g?.clientHeight || 0;
}

export function isScrolledIntoView(element: HTMLElement, offset = 0) {
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top - offset;
  const elementBottom = rect.bottom + offset;
  return elementTop <= getWindowHeight() && elementBottom >= 0;
}

export function getPercentage(start: number, end: number, current: number) {
  const distance = end - start;
  const displacement = current - start;
  return displacement / distance || 0;
}

export function getRelativePosition(node: HTMLElement) {
  const { top, height } = node.getBoundingClientRect();
  const parentHeight = getWindowHeight();
  const maxHeight = height > parentHeight ? height : parentHeight;
  const y = Math.round(top > maxHeight ? maxHeight : top);

  return getPercentage(0, maxHeight, y);
}

export function getImageHeight(strength: number, height: number) {
  const inverse = strength < 0;
  const factor = inverse ? 2 : 1;
  const strengthWithFactor = factor * Math.abs(strength);
  return Math.floor(height + strengthWithFactor);
}
