export {};

export function clamp(x: number, min: number, max: number) {
  return Math.min(max, Math.max(min, x));
}

export function sign(x: number) {
  if (x < 0) return -1;
  if (x > 0) return +1;
  return 0;
}
