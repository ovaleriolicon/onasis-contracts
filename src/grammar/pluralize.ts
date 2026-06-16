export function pluralize(base: string): string {
  if (base.endsWith("y")) {
    return base.slice(0, -1) + "ies";
  }

  if (
    base.endsWith("s") ||
    base.endsWith("sh") ||
    base.endsWith("ch") ||
    base.endsWith("x") ||
    base.endsWith("z")
  ) {
    return base + "es";
  }

  return base + "s";
}
