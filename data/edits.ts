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
    slug: "the-nursery-edit-26",
    title: "The Nursery Edit",
    section: "nursery",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    draft: true,
    palette: ["#D9CDBB", "#E8E0D2", "#A89684", "#6B5A47"],
    description:
      "A whole nursery, priced up. The cot, the mattress, the changing unit, the chair, and what the lot actually comes to — because everyone tells you what to buy and nobody tells you what it costs.",
    // The site's format applied to something far bigger than an outfit. Three
    // complete nurseries at three budgets rather than a list of nice things,
    // so the totals do the same work here that they do everywhere else.
    //
    // Labels and tier count are Gemma's to set once she has seen what Mamas &
    // Papas, Tutti Bambini and Momcozy actually carry. The noun field is what
    // prints above each total, so these say "The whole nursery" rather than
    // "The whole outfit".
    looks: [
      { label: "The basics", noun: "nursery", productIds: [] },
      { label: "The middle", noun: "nursery", productIds: [] },
      { label: "The dream one", noun: "nursery", productIds: [] },
    ],
  },
  {
    slug: "after-dark-26",
    title: "After Dark",
    section: "outfits",
    season: "Autumn 2026",
    plannedFor: "Bonfire night, 5 November",
    palette: ["#8A9A7B", "#E8E0D2", "#5C6B54", "#A89684"],
    boardImage: "/edits/after-dark-26-board.webp",
    description:
      "Warm, cosy layers for standing outside in the dark watching fireworks. Four outfits, every piece linked, and the shops sell several of them as sets so there is less to click than there is to see.",
    // Ages follow the narrowest piece in each look, not the widest. The H&M
    // knit sets stop at 6-9 months while the pramsuits run to two years, and
    // quoting the wider range would send someone to a page where half the
    // outfit cannot be bought in their size.
    looks: [
      { label: "Baby Girl", ages: "0–9 months", productIds: ["ms-floral-cord-pramsuit", "hm-knit-set-green-floral"] },
      { label: "Baby Boy", ages: "0–9 months", productIds: ["mp-colour-block-pramsuit", "hm-knit-set-striped", "next-suede-pull-on-boots"] },
      { label: "Girls", ages: "3–7 years", productIds: ["next-waterproof-fur-lined-coat", "next-cream-spot-set", "hm-chunky-chelsea-beige"] },
      { label: "Boys", ages: "4–9 years", productIds: ["hm-teddy-jacket-navy-block", "hm-urban-kit-hoodie", "hm-brushed-cargo-joggers", "mm-levis-dereck-trainers"] },
    ],
  },
  {
    slug: "the-knitwear-edit-26",
    title: "Knit Picks",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    palette: ["#6B4A38", "#E8D8CC", "#C9B7A4", "#F0E6D8"],
    boardImage: "/edits/the-knitwear-edit-26-board-v2.webp",
    description:
      "One knitted piece per look, dressed around with what you would actually put on top — because nobody wears head to toe knitwear. Four outfits, every piece linked, and the shops sell most of them as sets so there is less to click than there is to see.",
    // Several of these links cover more than one garment: both M&S knitted
    // outfits include their booties, and the H&M set is the top and the skirt
    // together. Ten pieces on the board, eight links to buy them.
    looks: [
      { label: "Baby Boy", ages: "0–12 months", productIds: ["ms-knit-3piece-brown", "ms-borg-jacket-mushroom"] },
      { label: "Baby Girl", ages: "0–12 months", productIds: ["ms-knit-2piece-pink", "ms-borg-jacket-cream"] },
      { label: "Girls", ages: "18 months–10 years", productIds: ["hm-rib-knit-set-brown", "next-western-boots-mink", "ms-ivory-bow"] },
      { label: "Boys", ages: "3 months–7 years", productIds: ["next-checkerboard-jumper", "next-cord-barrel-trousers", "next-chelsea-boots-brown"] },
    ],
  },
  {
    slug: "autumn-edit-26",
    title: "The Autumn Edit '26",
    season: "Autumn 2026",
    plannedFor: "Empty — needs real pieces before it can be built",
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
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
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
    title: "Little Boo",
    season: "Autumn 2026",
    plannedFor: "Now — the third and last of the Halloween run",
    boardImage: "/edits/baby-halloween-26-board.png",
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
      { label: "Newborn", ages: "0–6 months", productIds: ["next-neutral-halloween-sleepsuit", "next-pumpkin-slip-on-shoes"] },
      { label: "Baby", ages: "6–12 months", productIds: ["next-blue-pumpkin-set", "next-neutral-baby-trainers"] },
      { label: "Toddler", ages: "12–18 months", productIds: ["ms-halloween-pumpkin-sweatshirt", "ms-cord-trousers", "ms-first-walker-trainers"] },
    ],
  },

  // ---------------------------------------------------------------------------
  // THE REST OF THE RUN — two more dated, then the evergreen angles.
  // ---------------------------------------------------------------------------

  {
    slug: "puddles-and-wellies-26",
    title: "The 'Muddy Puddles' Edit",
    season: "Autumn 2026",
    plannedFor: "October half term",
    boardImage: "/edits/puddles-and-wellies-26-board.png",
    palette: ["#5B7B7A", "#C96849", "#E7E1CE", "#3F3A33"],
    description:
      "Half term, and the weather has made its decision. A puddlesuit and a pair of wellies each — which is the whole outfit for a day like that, and nothing else needs thinking about.",
    looks: [
      { label: "Baby", ages: "3 months–7 years", productIds: ["next-neutral-puddlesuit", "next-lion-ankle-wellies"] },
      { label: "Girls", ages: "3 months–7 years", productIds: ["next-sage-puddlesuit", "mw-colour-changing-wellies"] },
      { label: "Boys", ages: "3 months–7 years", productIds: ["next-cool-vibes-puddlesuit", "debenhams-shaun-wellies"] },
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
    slug: "pramsuits-26",
    title: "Wrapped Up",
    season: "Autumn 2026",
    plannedFor: "October onwards — pramsuits sell from the first cold week",
    boardImage: "/edits/pramsuits-26-board.png",
    palette: ["#D9CDBB", "#7E93A3", "#F1E9D8", "#3A342F"], // oat, winter blue, cream, charcoal
    description:
      "Pramsuits for babies — three to choose from in each of girls, boys and unisex, at three different prices, with what each one costs. This is the buy everyone leaves until the first properly cold morning.",
    // A shortlist edit, like Get Cosy. Split by colour rather than by age:
    // most pramsuits span 0-24 months anyway, so three age bands would have
    // been the same cream suit three times over, and "unisex" is its own
    // search — for a gift, or before anyone knows.
    looks: [
      { label: "Baby Girl", ages: "0–24 months", kind: "shortlist", productIds: ["george-pink-borg-snowsuit", "hm-padded-pramsuit-cherries", "next-checkerboard-allinone"] },
      { label: "Baby Boy", ages: "0–24 months", kind: "shortlist", productIds: ["hm-padded-jersey-pramsuit", "next-blue-stripe-pramsuit", "ms-borg-double-zip-pramsuit"] },
      { label: "Unisex", ages: "0–24 months", kind: "shortlist", productIds: ["hm-pile-pramsuit-ears", "next-little-one-pramsuit", "mp-faux-fur-pramsuit"] },
    ],
  },

  {
    slug: "first-coats-26",
    title: "Get Cosy",
    season: "Autumn 2026",
    plannedFor: "Any time — no date attached",
    boardImage: "/edits/first-coats-26-board.png",
    palette: ["#5B7B7A", "#C96849", "#E7E1CE", "#2E2A26"],
    description:
      "The coat sets the tone of everything underneath it from now until March, and it's the one thing worth taking a minute over. Three to choose from for each of them, at three different prices, with what each one actually costs.",
    // The first shortlist edit rather than an outfit one: three coats are
    // alternatives, not a set, so the page gives a range instead of a total.
    // Same format works later for wellies, school shoes, party dresses.
    looks: [
      { label: "Baby", ages: "0–2 years", kind: "shortlist", productIds: ["matalan-cream-bear-coat", "next-blue-stripe-fleece", "next-brown-spot-borg-jacket"] },
      { label: "Girls", ages: "0–8 years", kind: "shortlist", productIds: ["ms-borg-colourblock-jacket", "next-red-gingham-coat", "ms-gingham-puffer-coat"] },
      { label: "Boys", ages: "1–8 years", kind: "shortlist", productIds: ["matalan-cutsew-padded-coat", "next-colourblock-fleece", "zara-checkerboard-jacket"] },
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
    boardImage: "/edits/girl-power-26-board.png",
    palette: ["#C8102E", "#1A1A1A", "#E7A9BE", "#C9A227"], // union red, black, baby pink, gold
    description:
      "Five looks, one each: sporty, scary, baby, ginger and posh. Nineties girl group energy worn as actual clothes — a tracksuit, a leopard print, a pastel knit, a red dress, something black and sleek. Nothing dressing-up-box about any of it.",
    // `note` deliberately left off — Gemma writes those.
    //
    // Five looks rather than three, which is the one edit that justifies a new
    // board layout: you cannot do this with four. Girls-only, which balances
    // the boys-only Hot Wheels edit, and Baby is a real baby rather than a
    // fifth older girl.
    //
    // GEMMA'S DIRECTION, 11 Sep — one anchor piece each, everything else plain:
    //   Sporty  three stripes, a tracksuit. MandM Direct is where adidas is
    //           cheapest, and it is on Awin.
    //   Scary   leopard print
    //   Baby    pastel, soft, nothing loud
    //   Ginger  union jack
    //   Posh    a co-ord, black and sleek
    looks: [
      { label: "Scary", ages: "2–8 years", productIds: ["hm-flounce-cardigan-red", "hm-leopard-denim-dress", "hm-ribbed-cotton-top-white", "schuh-spezial-burgundy"] },
      { label: "Baby", ages: "0–2 years", productIds: ["next-ecru-peplum-tshirt", "zara-striped-culotte-jeans", "hm-quilted-jacket-mole", "hm-ballet-pumps-pink"] },
      { label: "Ginger", ages: "2–8 years", productIds: ["ms-bow-top-ivory", "tu-denim-pleat-skirt", "tu-red-frill-cardigan", "next-ri-patent-maryjane"] },
      { label: "Posh", ages: "2–8 years", productIds: ["george-black-heart-pinafore", "zara-peter-pan-tshirt", "next-black-button-cardigan", "next-black-velvet-maryjane"] },
      { label: "Sporty", ages: "2–8 years", productIds: ["adidas-denim-set", "adidas-liberty-spezial"] },
    ],
  },
  {
    slug: "the-britpop-edit-26",
    title: "The 'R Kid' Edit",
    season: "Autumn 2026",
    plannedFor: "While the tour talk is still going — it dates the moment it stops",
    boardImage: "/edits/the-britpop-edit-26-board.png",
    palette: ["#4A5240", "#1C2B4A", "#F1E9D8", "#A6382C"], // parka olive, navy, cream, red
    description:
      "Britpop, sized down. Parkas, three stripes and proper adidas — the Manchester look that never really went away, and is back now two brothers are speaking again. It works just as well on a girl as a boy.",
    note:
      "There's been a fair bit of hype about a certain Manchester band coming again, so this one's for all the Britpop parents wanting to revisit the adidas — only smaller this time. Half the appeal is that it matches what their mam and dad are already wearing.",
    // Named for the sound, not the band. A band's name in the title would read
    // as though they were involved in it, and there's a clothing label called
    // Oasis besides.
    looks: [
      { label: "Baby", ages: "3 months–3 years", productIds: ["next-green-borg-parka", "tu-red-beanie", "adidas-denim-tee-set", "adidas-campus-00s-red"] },
      { label: "Girls", ages: "2–8 years", productIds: ["next-stripe-rib-tshirt", "zara-padded-jacket", "ms-denim-mom-jeans", "adidas-gazelle-indoor-maroon"] },
      { label: "Boys", ages: "2–8 years", productIds: ["next-superdry-everest-parka", "adidas-sst-tracksuit-navy", "adidas-samba-og-white"] },
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
