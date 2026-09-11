import type { Edit } from "@/lib/types";

/**
 * THE EDITS
 * =========
 * Newest first — the order here is the order they appear on /edits, so the top
 * of this list is what people see first.
 *
 * THREE OUTFITS PER EDIT — Baby, Girls, Boys — so every board covers everyone,
 * whichever child a reader has. Baby is deliberately not split by gender:
 * baby clothes are largely neutral, so two near-identical outfits would be
 * padding rather than coverage.
 *
 * It is also the bigger job: roughly four pieces per outfit means ~16 products
 * per edit. Build them one outfit at a time rather than trying to finish a
 * whole board in a sitting.
 *
 * Timing: Halloween is at the top because the stock is already in shops and
 * people are already buying. Then half term, then bonfire night. The rest are
 * angles rather than seasons — a price point, a category — so they can go out
 * in any order without looking out of step with the weather.
 *
 * Ideas tied to later in the year are parked in `data/future-edits.ts`.
 *
 * To publish a draft:
 *   1. Add the real pieces to data/products.ts (unique ids, real prices)
 *   2. List those ids in the `look` below
 *   3. Delete the `draft: true` line
 *   (A Canva board is optional — the edit draws itself from its palette.)
 */

export const edits: Edit[] = [
  {
    slug: "autumn-edit-26",
    title: "The Autumn Edit '26",
    season: "Autumn 2026",
    plannedFor: "Needs real products — currently sample data",
    draft: true,
    palette: ["#B7A695", "#8FA383", "#F7F1E3", "#4A372A"], // taupe, sage, cream, chocolate
    description:
      "Where it all starts — full autumn outfits in taupe, sage and chocolate, built from the shops most of us already use.",
    // Optional: design a board in Canva from public/edits/board-template.png,
    // export it as PNG into public/edits/, then point this at it, e.g.:
    // boardImage: "/edits/autumn-edit-26-board.png",
    note:
      "This is the first edit I've put together, and I kept coming back to the same three colours all autumn. Nothing here is complicated, which is rather the point.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: ["bg-jumper", "bg-dungarees", "bg-bonnet"] },
      { label: "Girls", ages: "2–7 years", productIds: ["g-cardigan", "g-skirt", "g-shoes"] },
      { label: "Boys", ages: "2–7 years", productIds: ["b-jumper", "b-trousers", "b-beanie", "b-boots"] },
    ],
  },

  // ---------------------------------------------------------------------------
  // HALLOWEEN — the shops are already full of it and people are already buying.
  // Two edits rather than one, because "spooky" for a seven-year-old and
  // "spooky" for a baby are completely different things.
  // ---------------------------------------------------------------------------

  {
    slug: "halloween-at-next-26",
    title: "Halloween at Next",
    season: "Autumn 2026",
    plannedFor: "Now — the stock is already in shops",
    boardImage: "/edits/halloween-at-next-26-board-v2.png",
    palette: ["#C4622E", "#2E2A26", "#F1E9D8", "#6B4A5A"],
    description:
      "Halloween that isn't a costume — pumpkin tones and a bit of black, in pieces that carry on being worn right through November. Every piece is from Next, so it's one delivery and one returns slip rather than three.",
    note:
      "I started dressing mine in Halloween bits in early September, which tells you everything about how long the season really is now.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: ["next-pumpkin-sleepsuit", "next-pumpkin-cardigan", "next-pumpkin-booties"] },
      { label: "Girls", ages: "2–7 years", productIds: ["koko-pumpkin-sweatshirt", "next-pumpkin-pie-cardigan", "next-spot-barrel-jeans", "next-white-hightops"] },
      { label: "Boys", ages: "3–7 years", productIds: ["next-ghost-tshirt", "next-black-cargos", "next-ecru-fleece", "next-black-trainers"] },
    ],
  },

  {
    slug: "little-pumpkins-26",
    title: "The Little Pumpkin",
    season: "Autumn 2026",
    plannedFor: "Now — alongside the Halloween edit",
    boardImage: "/edits/little-pumpkins-26-board.png",
    palette: ["#C0703F", "#2F4A42", "#F1E9D8", "#B4835A"], // rust, forest cord, cream, tan
    description:
      "Pumpkins, but the loud ones. Bold prints rather than sweet little motifs, so it works for a six-year-old boy as well as it does for a baby. Everyday clothes with a pumpkin on, not a costume.",
    note:
      "One pumpkin piece per outfit and keep everything else plain — that's the whole trick. Two prints in one outfit and it stops being clothes and starts being fancy dress.",
    looks: [
      { label: "Baby", ages: "0–3 years", productIds: ["ms-pumpkin-sweat-set", "ms-borg-jacket-ears", "ms-borg-pram-boots"] },
      { label: "Girls", ages: "2–7 years", productIds: ["george-pumpkin-picker-knit", "hm-cord-skirt", "hm-overlock-socks", "ms-suede-ankle-boots"] },
      { label: "Boys", ages: "3–7 years", productIds: ["matalan-skating-pumpkin-sweat", "tu-checkerboard-beanie", "next-black-wide-jeans", "next-neutral-trainers"] },
    ],
  },

  {
    slug: "baby-halloween-26",
    title: "Baby's First Halloween",
    season: "Autumn 2026",
    plannedFor: "Now — the third and last of the Halloween run",
    draft: true,
    palette: ["#D4854E", "#F1E9D8", "#3A342F", "#A8907A"], // soft pumpkin, cream, near-black, oat
    description:
      "Halloween for babies, split by age rather than by boy and girl — because what fits a newborn doesn't fit a crawler, and baby clothes are neutral anyway. Nothing scratchy, nothing that has to come off for a nap.",
    note:
      "I've loved the Halloween clothes this year — so much that one board turned into three. This one's all baby, because that's the section I'm in every week anyway.",
    // Baby only, three ages. Baby is the strongest category on the site —
    // they outgrow everything, other people buy the presents, and nobody
    // agonises over £9 — so it earns a board of its own rather than one
    // outfit on a board shared with older children.
    looks: [
      { label: "Newborn", ages: "0–6 months", productIds: [] },
      { label: "Baby", ages: "6–12 months", productIds: [] },
      { label: "Toddling", ages: "12–18 months", productIds: [] },
    ],
  },

  // ---------------------------------------------------------------------------
  // THE REST OF THE RUN — two more dated, then the evergreen angles.
  // ---------------------------------------------------------------------------

  {
    slug: "puddles-and-wellies-26",
    title: "Puddles & Wellies",
    season: "Autumn 2026",
    plannedFor: "October half term",
    draft: true,
    palette: ["#5B7B7A", "#C96849", "#E7E1CE", "#3F3A33"],
    description:
      "Half term, and the weather has made its decision. Bright wellies, layered colours, and outfits that look better muddy than clean.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "after-dark-26",
    title: "After Dark",
    season: "Autumn 2026",
    plannedFor: "Early November — bonfire night",
    draft: true,
    palette: ["#2E2A26", "#E3A83B", "#C96849", "#B7A695"],
    description:
      "Bonfire night, and standing still in a field for an hour. Layers, warm hands, and the small mercy of something reflective.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "under-forty-26",
    title: "Everything Under £40",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#C96849", "#E6DCCB", "#8FA383", "#4A372A"],
    description:
      "Four complete outfits, head to toe, none of them over £40. Considered doesn't have to mean expensive — and because every look here is totalled up, you can see that rather than take my word for it.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "the-knitwear-edit-26",
    title: "The Knitwear Edit",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#B7A695", "#8FA383", "#E6DCCB", "#6B5A47"],
    description:
      "Four outfits built around the jumper. Texture, colour, and what to put underneath — because once the knit is right, the rest mostly decides itself.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "first-coats-26",
    title: "First Coats",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#5B7B7A", "#C96849", "#E7E1CE", "#2E2A26"],
    description:
      "The coat sets the tone of everything underneath it from now until March. Four outfits styled around four very different coats, to show how much that one choice changes.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "the-newborn-edit-26",
    title: "The Newborn Edit",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#E8DDD3", "#CFD8D3", "#F7F1E3", "#A88C7D"],
    description:
      "The first few months, when nothing needs to be smart and everything needs to be soft. Gentle colours and simple shapes, in the sizes that actually get worn.",
    // The one board that isn't four outfits, on purpose: "Girls" and "Boys"
    // mean four-to-eight-year-olds, and a newborn edit with a seven-year-old's
    // outfit in it doesn't hold together. Everywhere else keeps all four.
    looks: [
      { label: "Baby", ages: "Newborn–6 months", productIds: [] },
    ],
  },

  {
    slug: "to-infinity-and-beyond-26",
    title: "To Infinity and Beyond",
    season: "Autumn 2026",
    plannedFor: "Any time — the first of the character edits",
    draft: true,
    palette: ["#79A8C9", "#F1E9D8", "#C4452F", "#E3B23C"], // cloud blue, cloud white, Woody red, Buzz yellow
    description:
      "Toy Story, worn as clothes rather than costume. Cloud blue, Woody's red and a bit of yellow — character pieces mixed with plain ones, so the whole outfit still works on a Tuesday.",
    note:
      "Toy Story seems to be the one every child finds sooner or later. The trick is one character piece per outfit and plain everything else — otherwise it starts to look like a dressing-up box.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "girl-power-26",
    title: "Girl Power",
    season: "Autumn 2026",
    plannedFor: "While the reunion talk is live — same window as The 'R Kid' Edit",
    draft: true,
    palette: ["#C8102E", "#1A1A1A", "#E7A9BE", "#C9A227"], // union red, black, baby pink, gold
    description:
      "Five looks, one each: sporty, scary, baby, ginger and posh. Nineties girl group energy worn as actual clothes — a tracksuit, a leopard print, a pastel knit, a red dress, something black and sleek. Nothing dressing-up-box about any of it.",
    // `note` deliberately left off — Gemma writes those.
    //
    // Five looks rather than three, which is the one edit that justifies a new
    // board layout: you cannot do this with four. Girls-only, which balances
    // the boys-only Hot Wheels edit, and Baby is a real baby rather than a
    // fifth older girl.
    looks: [
      { label: "Sporty", ages: "4–8 years", productIds: [] },
      { label: "Scary", ages: "4–8 years", productIds: [] },
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Ginger", ages: "4–8 years", productIds: [] },
      { label: "Posh", ages: "4–8 years", productIds: [] },
    ],
  },
  {
    slug: "the-britpop-edit-26",
    title: "The 'R Kid' Edit",
    season: "Autumn 2026",
    plannedFor: "While the tour talk is still going — it dates the moment it stops",
    draft: true,
    palette: ["#4A5240", "#1C2B4A", "#F1E9D8", "#A6382C"], // parka olive, navy, cream, red
    description:
      "Britpop, sized down. Parkas, three stripes and bucket hats — the look that keeps coming back round, for people who weren't there the first time. It works just as well on a girl as a boy.",
    note:
      "There's been a fair bit of hype about a certain Manchester band coming back, so this one's for all the Britpop parents wanting to revisit the adidas — only smaller this time. Half the appeal is that it matches what their dad is already wearing.",
    // Named for the sound, not the band. A band's name in the title would read
    // as though they were involved in it, and there's a clothing label called
    // Oasis besides.
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "hot-wheels-26",
    title: "The Hot Wheels Edit",
    season: "Autumn 2026",
    plannedFor: "Any time — the second character edit",
    draft: true,
    palette: ["#E5401C", "#1B4F8A", "#F1E9D8", "#F2B10A"], // flame orange, racing blue, cream, yellow
    description:
      "One for the car-obsessed. Three outfits across the ages rather than one, all built the same way: a Hot Wheels piece and plain everything else, so it reads as clothes rather than merchandise.",
    note:
      "Some children want one thing and only that thing, and there's no talking them out of it. This is for them — and it still looks decent in a photograph.",
    // Boys only, and deliberately three ages rather than three genders. A single
    // outfit leaves a board mostly empty; three gives the same shape as every
    // other edit and answers "will it work for mine?" at the same time.
    looks: [
      { label: "Toddler", ages: "18 months–3 years", productIds: [] },
      { label: "Little", ages: "3–5 years", productIds: [] },
      { label: "Big", ages: "5–8 years", productIds: [] },
    ],
  },

  {
    slug: "the-varsity-edit-26",
    title: "The Varsity Edit",
    season: "Autumn 2026",
    plannedFor: "Any time — autumn through spring",
    draft: true,
    palette: ["#24344D", "#F1E9D8", "#A6382C", "#C08A2E"], // navy, cream, varsity red, mustard
    description:
      "Baseball jackets, rugby stripes and cord — preppy without the school uniform. It suits a girl and a boy equally, and it carries on working long after the season it was bought for.",
    note:
      "This is the one they'll actually choose off the pile. A baseball jacket over almost anything looks put together, which is the entire reason I keep buying them.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "sunday-best-26",
    title: "Sunday Best",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#7C6A82", "#F1E9D8", "#C7B9A4", "#3F3A33"],
    description:
      "For a christening, a birthday, or lunch somewhere with tablecloths. Smarter than everyday, without tipping over into fussy.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },
];

/** Drafts are visible while developing so you can preview work in progress,
 *  and hidden everywhere in the built site. */
const showDrafts = process.env.NODE_ENV === "development";

/** What the live site renders. Use this, not `edits`, in pages. */
export const publishedEdits: Edit[] = edits.filter((e) => showDrafts || !e.draft);

export function getEdit(slug: string) {
  return publishedEdits.find((e) => e.slug === slug);
}

/** Progress towards the ten edits needed before applying to affiliate networks. */
export const EDIT_TARGET = 10;
export const liveEditCount = edits.filter((e) => !e.draft).length;
