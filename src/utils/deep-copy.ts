export function deepCopy<T = any>(src: T): T {
  if (Array.isArray(src)) {
    return src.map((element) => deepCopy(element)) as T;
  }
  if (typeof src === "object") {
    return Object.fromEntries(
      Object.entries(src as object).map(([key, item]) => [key, deepCopy(item)])
    ) as T;
  }
  return src;
}
