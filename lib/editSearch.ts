/**
 * Search across the edits, in the words a parent actually types.
 *
 * Gemma's brief: "a parent can go on and type in what they are looking for
 * and bring up the right edits — otherwise they are going to get lost". So it
 * has to cope with how people really search, not with how the edits happen to
 * be titled. Nobody types "After Dark". They type "bonfire", "pramsuit",
 * "coat for a 2 year old" or "M&S".
 *
 * Each edit is searched on everything it contains: its name, what it is for,
 * the description, every look's label and age range, and the name and shop of
 * every piece in it. That is what lets "puddlesuit" find the Muddy Puddles edit
 * and "Next" find every edit with a Next piece in it.
 *
 * The rules, kept deliberately simple so the results are predictable:
 *  - every word typed has to match (so "girls coat" narrows, never widens);
 *  - a word matches the start of a word in the edit, so "pram" finds
 *    "pramsuit" and "wellie" finds "wellies", and a trailing "s" is forgiven;
 *  - a price ("under £40", "£40 or less", "below 30 pounds") is checked against
 *    the edit's lowest outfit total, the same figure the price bands use;
 *  - an age ("2 year old", "18 months", "2yo") is checked against each look's
 *    actual age range, so "5 years" finds a look for 4 to 9 years even though
 *    the number 5 appears nowhere;
 *  - filler ("for", "old", "outfit", "kids") is ignored rather than required;
 *  - a handful of everyday words stand in for each other: jumper and knitwear,
 *    shoes and boots and trainers, Marks and Spencer and M&S.
 *
 * No ranking and no fuzzy spelling. With a few dozen edits, "these are the ones
 * that match, newest first" is clearer than a clever order a parent can't
 * predict.
 */

export type SearchableEdit = {
  /** normalise()d text of everything in the edit. */
  searchText: string;
  /** Each look's age range in months, [from, to]. */
  ages: [number, number][];
  /** Lowest outfit total in the edit; 0 or missing when nothing is priced. */
  low?: number;
};

/** Lower case, accents and apostrophes gone, "M&S" → "ms", "H&M" → "hm",
 *  everything else that isn't a letter or number becomes a space. Used on both
 *  the edit's text and the query, so the two always compare like for like. */
export function normalise(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/([a-z0-9])&([a-z0-9])/g, "$1$2")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** "0–9 months", "3–7 years", "18 months–10 years" → months, or null. */
export function parseAgeRange(s: string): [number, number] | null {
  const t = s.toLowerCase().replace(/[–—]/g, "-");
  const m = t.match(
    /^\s*(\d+(?:\.\d+)?)\s*(months?|mths?|years?|yrs?)?\s*-\s*(\d+(?:\.\d+)?)\s*(months?|mths?|years?|yrs?)\s*$/
  );
  if (!m) return null;
  const unit = (u?: string) => (u && u.startsWith("y") ? 12 : 1);
  const hi = unit(m[4]);
  const lo = m[2] ? unit(m[2]) : hi;
  return [parseFloat(m[1]) * lo, parseFloat(m[3]) * hi];
}

const IGNORE = new Set([
  "a", "an", "and", "the", "for", "of", "my", "to", "with", "in", "on", "some",
  "what", "wear", "old", "outfit", "outfits", "edit", "edits", "look", "looks",
  "clothes", "clothing", "kids", "kid", "children", "childrens", "child",
  "ideas", "idea", "uk", "best", "cute", "little", "things", "stuff", "under", "below",
  "months", "month", "mths", "years", "year", "yrs", "yr", "yo", "age", "aged",
]);

/** Everyday words that should find each other. Each maps to the words it may
 *  match, itself included. */
const ALSO: Record<string, string[]> = {
  jumper: ["jumper", "knit", "knitted", "knitwear", "sweatshirt", "cardigan", "sweater"],
  sweater: ["sweater", "jumper", "knit", "knitted", "knitwear", "sweatshirt"],
  knitwear: ["knitwear", "knit", "knitted", "jumper", "cardigan"],
  coat: ["coat", "jacket", "parka", "puffer", "snowsuit"],
  jacket: ["jacket", "coat", "parka", "puffer"],
  shoes: ["shoes", "shoe", "boots", "trainers", "wellies", "pumps", "booties"],
  shoe: ["shoe", "shoes", "boots", "trainers", "pumps", "booties"],
  boots: ["boots", "boot", "wellies", "booties"],
  trainers: ["trainers", "trainer", "shoes"],
  wellington: ["wellies", "wellington"],
  wellingtons: ["wellies", "wellington"],
  raincoat: ["raincoat", "puddlesuit", "waterproof"],
  rain: ["rain", "puddlesuit", "waterproof", "wellies", "puddles"],
  // Not "pram" on its own: that would make pram boots count as a pramsuit.
  snowsuit: ["snowsuit", "pramsuit"],
  pramsuit: ["pramsuit", "snowsuit"],
  pjs: ["pyjama", "pyjamas", "pjs"],
  pajamas: ["pyjama", "pyjamas"],
  bonfire: ["bonfire", "fireworks"],
  fireworks: ["fireworks", "bonfire"],
  gifts: ["gift", "gifts"],
  present: ["gift", "gifts", "present"],
  presents: ["gift", "gifts", "present"],
  marks: ["ms", "marks"],
  spencer: ["ms", "spencer"],
  spencers: ["ms", "spencer"],
  mands: ["ms"],
  hm: ["hm"],
};

/** Words that mean an age as well as being words: "newborn" finds a look
 *  labelled Newborn, and also any look whose range covers a newborn. */
const AGE_WORDS: Record<string, [number, number]> = {
  // Tight on purpose: almost every edit has a baby look starting at 0, so
  // anything wider made "newborn" return everything.
  newborn: [0, 1],
  newborns: [0, 1],
  baby: [0, 12],
  babies: [0, 12],
  toddler: [12, 36],
  toddlers: [12, 36],
};

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, eighteen: 18,
};

export type ParsedQuery = {
  /** The most the parent wants to spend, in pounds, if the query said so. */
  maxPrice: number | null;
  /** The age asked for, in months, if the query contained one. */
  age: number | null;
  /** Words still to match, each with the alternatives it may match. */
  words: string[][];
  /** True when there is nothing left to filter on. */
  empty: boolean;
};

/** "under £40", "below 30 pounds", "£40 or less", "up to 25". Without a £ or
 *  "pounds", a bare number only counts as a price when it is over 12 and not
 *  followed by a unit, so "under 2 years" stays an age. */
const PRICE =
  /(?:\b(?:under|below|less than|cheaper than|up to|max|maximum|within)\s*)?(£\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*(?:pounds|quid)\b|\d+(?:\.\d+)?)(?:\s*(?:or less|or under|and under|max|maximum)\b)?/;

function takePrice(raw: string): { price: number | null; rest: string } {
  const t = raw.toLowerCase();
  const re = new RegExp(PRICE.source, "g");
  for (const m of t.matchAll(re)) {
    const tok = m[1];
    const hasCue =
      /£|pounds|quid/.test(tok) ||
      /^(?:under|below|less than|cheaper than|up to|max|maximum|within)/.test(m[0]) ||
      /(?:or less|or under|and under|max|maximum)$/.test(m[0]);
    if (!hasCue) continue;
    const n = parseFloat(tok.replace(/[^\d.]/g, ""));
    const after = t.slice((m.index ?? 0) + m[0].length);
    const plain = !/£|pounds|quid/.test(tok);
    if (plain && (n <= 12 || /^\s*(?:years?|yrs?|months?|mths?|yo|m|y)\b/.test(after))) continue;
    return { price: n, rest: (t.slice(0, m.index) + " " + after).trim() };
  }
  return { price: null, rest: raw };
}

export function parseQuery(raw: string): ParsedQuery {
  const { price: maxPrice, rest } = takePrice(raw);
  let q = normalise(rest);
  for (const [w, n] of Object.entries(NUMBER_WORDS)) {
    q = q.replace(new RegExp(`\\b${w}\\b`, "g"), String(n));
  }

  // An age: a number, optionally with a unit, optionally followed by "old".
  // "2 year old", "2yo", "18 months", "18m", or a bare "3" read as years.
  let age: number | null = null;
  const m = q.match(
    /\b(\d+(?:\.\d+)?)\s*(months|month|mths|mth|mos|mo|m|years|year|yrs|yr|yo|y)?\b(?:\s*old)?/
  );
  if (m) {
    const n = parseFloat(m[1]);
    const u = m[2] ?? "";
    // With no unit, a small number is years and a large one months: nobody
    // on a children's site means an 18 year old.
    age = u.startsWith("m") ? n : u ? n * 12 : n > 12 ? n : n * 12;
    q = (q.slice(0, m.index) + " " + q.slice((m.index ?? 0) + m[0].length)).trim();
  }

  const words = q
    .split(" ")
    .filter((w) => w && !IGNORE.has(w))
    .map((w) => {
      const alts = new Set(ALSO[w] ?? [w]);
      // Forgive a trailing "s": "coats" can match "coat", "pumpkins" "pumpkin".
      if (w.length > 3 && w.endsWith("s")) alts.add(w.slice(0, -1));
      return [...alts];
    });

  return { maxPrice, age, words, empty: maxPrice === null && age === null && words.length === 0 };
}

export function matches(query: ParsedQuery, edit: SearchableEdit): boolean {
  if (query.empty) return true;

  if (query.maxPrice !== null && !((edit.low ?? 0) > 0 && (edit.low ?? 0) <= query.maxPrice)) return false;

  if (query.age !== null) {
    const a = query.age;
    if (!edit.ages.some(([lo, hi]) => a >= lo && a <= hi)) return false;
  }

  const words = edit.searchText.split(" ");
  return query.words.every((alts) => {
    const inText = alts.some((alt) => words.some((w) => w.startsWith(alt)));
    if (inText) return true;
    // An age word with no literal match still matches on the age ranges.
    const range = alts.map((alt) => AGE_WORDS[alt]).find(Boolean);
    return range ? edit.ages.some(([lo, hi]) => lo <= range[1] && hi >= range[0]) : false;
  });
}
