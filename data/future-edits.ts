import type { Edit } from "@/lib/types";

/**
 * THE PARKING LOT
 * ===============
 * Good edit ideas that are tied to a time of year that hasn't come round yet.
 *
 * Nothing in this file is imported by the site — it has no effect on anything
 * until you move an entry into `data/edits.ts`. It's a notebook, not code that
 * runs.
 *
 * When its month arrives: cut the entry, paste it into the `edits` array in
 * data/edits.ts, and build it like any other draft.
 */

export const futureEdits: Edit[] = [
  {
    // Displaced by Halloween — term had already started by the time the run was
    // planned, so this belongs to next August instead.
    slug: "back-to-school-27",
    title: "Back to School, Softly",
    season: "Summer 2027",
    plannedFor: "Mid-August — before term starts, not after",
    draft: true,
    palette: ["#8C9A7E", "#E6DCCB", "#3F4A3C", "#F7F1E3"],
    description:
      "The first term, and everything needs to work together before eight in the morning. A simple outfit in colours that don't fight each other — and one good coat that pulls it together.",
    looks: [{ label: "Boys", ages: "2–7 years", productIds: [] }],
  },

  {
    // Evergreen, so no rush — parked to keep the current run at ten.
    slug: "the-weekend-edit-26",
    title: "The Weekend Edit",
    season: "Any season",
    plannedFor: "Any time — a spare idea if you want one",
    draft: true,
    palette: ["#8FA383", "#E6DCCB", "#DE8468", "#3F4A3C"],
    description:
      "No uniform, no occasion, nowhere in particular to be. An outfit for a muddy Saturday that still looks like something in the photographs.",
    looks: [{ label: "Boys", ages: "2–7 years", productIds: [] }],
  },

  {
    // THE BIG ONE. November and December earn more affiliate income than the
    // rest of the year combined, so this single page is worth more than most of
    // the outfit edits put together. Note the looks aren't outfits here — a
    // gift guide is sectioned by budget, which the `label` field allows.
    slug: "christmas-gift-guide-26",
    title: "The Christmas Gift Guide",
    season: "Winter 2026",
    plannedFor: "Early November — publish before the 10th",
    draft: true,
    palette: ["#7C2E3B", "#8FA383", "#E3A83B", "#F1E9D8"],
    description:
      "Presents for babies and children that don't end up at the back of a cupboard by February — sorted by what you want to spend.",
    note:
      "I wrote this one for myself as much as anyone. Every year I leave it too late and panic-buy something plastic.",
    looks: [
      { label: "Stocking fillers, under £10", productIds: [] },
      { label: "Under £25", productIds: [] },
      { label: "The main present", productIds: [] },
    ],
  },

  {
    slug: "party-season-26",
    title: "The Party Edit",
    season: "Winter 2026",
    plannedFor: "Late November / early December",
    draft: true,
    palette: ["#7C2E3B", "#E3A83B", "#F1E9D8", "#3F3A33"],
    description:
      "Nativities, parties and one photograph that gets sent to everybody. Proper occasion dressing that a child can still eat a sausage roll in.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "the-in-between-26",
    title: "The In-Between",
    season: "Winter 2026",
    plannedFor: "Boxing Day to New Year",
    draft: true,
    palette: ["#9AA8A5", "#D9CFC0", "#6B5A47", "#F7F1E3"],
    description:
      "The strange soft week between Christmas and New Year, where nobody knows what day it is. Comfortable enough for the sofa, decent enough for visitors.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "proper-cold-27",
    title: "Proper Cold",
    season: "Winter 2027",
    plannedFor: "January",
    draft: true,
    palette: ["#4A5A6B", "#C7CFD4", "#2E2A26", "#B7A695"],
    description:
      "January in the north, when the school run happens in the dark at both ends. Real insulation, thumb-holes, and hats that stay on.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "growing-out-of-it-27",
    title: "Growing Out of It",
    season: "Winter 2027",
    plannedFor: "February half term",
    draft: true,
    palette: ["#A88C7D", "#E6DCCB", "#8FA383", "#4A372A"],
    description:
      "The mid-winter restock, when sleeves are suddenly two inches short. What's worth replacing now, what can wait until spring, and where the sales are actually worth it.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "first-signs-27",
    title: "First Signs",
    season: "Spring 2027",
    plannedFor: "March",
    draft: true,
    palette: ["#A9BE9C", "#F3E4D6", "#E3A83B", "#6B5A47"],
    description:
      "Cold mornings, warm afternoons, and a coat carried home rather than worn. Everything here layers off as easily as it layers on.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },

  {
    slug: "out-all-day-27",
    title: "Out All Day",
    season: "Spring 2027",
    plannedFor: "Easter holidays",
    draft: true,
    palette: ["#7FA6B5", "#F1E9D8", "#DE8468", "#3F4A3C"],
    description:
      "Easter holidays and the first proper days outside. Built for a picnic, a beach in Cumbria that turns out to be freezing, and grass stains.",
    looks: [
      { label: "Baby", ages: "0–18 months", productIds: [] },
      { label: "Girls", ages: "2–7 years", productIds: [] },
      { label: "Boys", ages: "2–7 years", productIds: [] },
    ],
  },
];
