// Every piece of site-wide detail lives here so it's changed in one place
// rather than hunted down across a dozen components.

export const site = {
  name: "The Arch",
  tagline: "Little finds for little people.",

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

  /**
   * FALSE until you're ready to be found. While it's false, robots.txt tells
   * every search engine to stay away and the pages carry a "noindex" tag, so
   * nothing gets picked up by Google or Pinterest — the link still works for
   * anyone you send it to. Flip to true when you want the world to see it.
   */
  isPublic: false,

  /** When the legal pages were last reviewed. Bump it when you change them. */
  policiesUpdated: "7 September 2026",

  /**
   * Newsletter form POST target. Empty until a provider is chosen — the signup
   * block renders an honest "opening soon" state rather than a form that
   * silently swallows addresses. Paste the form action URL from Buttondown,
   * Kit/ConvertKit or Mailchimp here and it goes live.
   */
  newsletterEndpoint: "",

  /**
   * The affiliate networks currently applied to or live. Named explicitly on
   * the disclosure page — both Awin and Sovrn expect the disclosure to say who
   * you actually work with, not just that affiliate links exist.
   */
  networks: [] as string[],
} as const;
