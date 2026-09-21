# Communicative Functions (F1)

Curriculum authorization only. Not consumed by `generateScene` or Hard Gates.

## Catalog

Foundations catalog (9). See `src/pedagogy/communicative-functions.ts`.

| id | label | description |
|---|---|---|
| `describe` | Describe | Say how someone or something is (qualities / states). |
| `express-preference` | Express Preference | Say what you like. |
| `express-desire` | Express Desire | Say what you want. |
| `express-need` | Express Need | Say what you need. |
| `express-possession` | Express Possession | Say what you have. |
| `report-result` | Report Result | Report an outcome or result. |
| `report-activities` | Report Activities | Say what you do or what activities you perform. |
| `report-event` | Report Event | Say that you performed a specific action or that a specific event happened. |
| `ask-information` | Ask Information | Ask a question about authorized content acts. |

Withdrawn (do not revive as aliases): `talk-about-activities`.

`report-activities` (generic / kind) is independent of `report-event` (instance / episodic), `report-result` (outcome), `express-preference`, `express-possession`, and `describe`. The Ecosystem authorizes which of these acts are available; Object Number follows the selected Function. Nouns do not override Function reading.

## Ecosystem.functions

```ts
functions: CommunicativeFunctionId[]
```

**Meaning:** authorized communicative acts for this Ecosystem.

**Not:** weights, selection order, exponents, patterns, prompts, or preferences.

Array order is an editorial hint only.
