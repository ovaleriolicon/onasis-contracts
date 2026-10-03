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

## Governing verb

`COMMUNICATIVE_FUNCTION_GOVERNING_VERBS` is the editorial assignment of which lemmas may be a Function's verb1. `verbGovernsFunction` is the check. A Function in that map admits a lemma on the list and does not admit any other lemma, even when `semantics.type` matches another Function's class. `express-preference` admits `like`. `express-desire` admits `want`. `express-need` admits `need`. `express-possession` admits `have`. `describe` admits `be`.

`VerbSemanticType` stays a coarse filter and is not sufficient admission. `COMMUNICATIVE_FUNCTION_GOVERNING_ACTS` and `verbGoverningActFitsFunction` apply only when the Function names no governing lemmas. `ask-information` accepts every declared verb semantic type, because it asks about authorized content acts. `report-activities` and `report-event` accept the activity acts (`movement`, `consumption`, `communication`, `perception`, `creation`, `change`). Preference, necessity, possession, state, and existence do not govern them. `report-result` accepts `change` and `creation`.

## Ecosystem.functions

```ts
functions: CommunicativeFunctionId[]
```

**Meaning:** authorized communicative acts for this Ecosystem.

**Not:** weights, selection order, exponents, patterns, prompts, or preferences.

Array order is an editorial hint only.
