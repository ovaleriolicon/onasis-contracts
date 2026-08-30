/**
 * BCP-47-ish locale tag for a pedagogical speakable fragment.
 * Prefer concrete tags (e.g. "es-MX", "en-US"); open string allows future locales.
 */
export type PedagogyLocale = "es-MX" | "en-US" | (string & {});
/**
 * Canonical bilingual (or multilingual) unit for Construction Tutor speakable steps.
 * Display `text` on those steps is derived from segments — not authored separately.
 */
export type PedagogySegment = {
    lang: PedagogyLocale;
    text: string;
};
