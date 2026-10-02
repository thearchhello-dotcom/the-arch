// Every piece of site-wide detail lives here so it's changed in one place
// rather than hunted down across a dozen components.

export const site = {
  name: "The Arch",
  /** Changed 25 September 2026. The old line, "Little finds for little
   *  people", was almost word for word the bio of an established Instagram
   *  account (Little Finds Edit, "Little finds for your little ones") that
   *  also uses a rainbow arch logo. This one uses The Arch's own name, plays
   *  on "all under one roof" (pieces from many shops, in one place), and says
   *  "things" rather than "looks" so it covers prams, nursery and gifts too. */
  tagline: "All the little things, under one arch.",

  /** First name only, on purpose — this is the name shown publicly everywhere
   *  on the site. Your full name stays private: affiliate networks and the
   *  domain registrar hold it in your account, not on the page. */
  owner: "Gemma",
  location: "Cumbria, UK",
  email: "thearchhello@gmail.com",

  /** Registered 8 Sep 2026 with 123-reg, two years, auto-renewing. */
  domain: "https://thearchedits.co.uk",

  /** The address printed on mood boards and social images. */
  displayDomain: "thearchedits.co.uk",

  /** Profiles that are genuinely The Arch. They go into the structured data
   *  as sameAs, which is how Google and the AI assistants tell this brand
   *  apart from every bar, venue and church also called "The Arch" — Mark's
   *  point that one consistent identity matters more than any single link.
   *  Only real, live profiles belong here; leave one empty rather than guess. */
  socials: {
    instagram: "https://www.instagram.com/thearch.edits/",
    pinterest: "https://www.pinterest.com/thearchedits/",
  },

  /**
   * FALSE until you're ready to be found. While it's false, robots.txt tells
   * every search engine to stay away and the pages carry a "noindex" tag, so
   * nothing gets picked up by Google or Pinterest — the link still works for
   * anyone you send it to. Flip to true when you want the world to see it.
   */
  isPublic: true,

  /** Google Analytics 4, set up by Gemma on 28 September 2026 in the
   *  thearchhello@gmail.com account. Not a secret: it appears in the page
   *  source of every site that uses GA. Empty string switches GA off. */
  gaMeasurementId: "G-YLBQ42HXXP",

  /** Master switch for retailer photographs. A kill switch, not the rule.
   *
   *  The rule now lives per retailer, in canShowImage() in lib/affiliate.ts:
   *  a shop's pictures appear once that shop has approved Gemma, and not
   *  before, because approval is precisely what changes the licensing. It is
   *  the same list that drives the tracked links, so a shop whose links earn
   *  is a shop whose pictures show.
   *
   *  Setting this to false turns every photograph off everywhere at once,
   *  whatever the programmes say — worth having if a retailer ever objects.
   *
   *  The other rule is not affected by any of this. Clothes, never children:
   *  a photograph has to be a laydown before its address is stored at all.
   *  The images rule at the top of data/products.ts has the full reasoning. */
  showProductImages: true,

  /** When the legal pages were last reviewed. Bump it when you change them. */
  policiesUpdated: "2 October 2026",

  /**
   * Newsletter form POST target: the Kit form "The Arch sign-up" (form 9994567).
   * Kit sends the double opt-in confirmation email itself. If this is ever
   * emptied the signup block goes back to an honest "opening soon" state.
   */
  newsletterEndpoint: "https://app.kit.com/forms/9994567/subscriptions",

  /**
   * The affiliate networks currently applied to or live. Named explicitly on
   * the disclosure page — both Awin and Sovrn expect the disclosure to say who
   * you actually work with, not just that affiliate links exist.
   */
  networks: [] as string[],
} as const;
