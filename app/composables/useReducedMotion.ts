export const prefersReducedMotion = (): boolean =>
  import.meta.client && matchMedia('(prefers-reduced-motion: reduce)').matches
