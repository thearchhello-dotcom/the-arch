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

  /**
   * PROVISIONAL — not registered yet. thearch.co.uk is parked by a broker, so
   * this may end up being thearchedit.co.uk instead. Change it here and the
   * sitemap, robots.txt, page metadata and every social image follow.
   */
  domain: "https://thearch.co.uk",

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
