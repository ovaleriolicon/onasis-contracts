const VOWEL_BEFORE_Y = /[aeiou]/i;

export function pluralize(base: string): string {
  // city → cities, baby → babies. toy → toys, boy → boys, key → keys.
  const beforeY = base.charAt(base.length - 2);
  if (base.endsWith("y") && !VOWEL_BEFORE_Y.test(beforeY)) {
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
