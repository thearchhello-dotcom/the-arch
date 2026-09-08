import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description:
    "What The Arch collects, what it doesn't, and how cookies and affiliate tracking work on this site.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Prose
        eyebrow="Privacy"
        title="Privacy & cookies"
        intro="What's collected, what isn't, and what you can do about it."
        updated={site.policiesUpdated}
      >
        <h2>Who runs this site</h2>
        <p>
          The Arch is a personal publication run by {site.owner}, based in {site.location}.
          For data protection purposes that makes her the data controller. She can be reached at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>What this site collects</h2>
        <p>
          Very little, and none of it deliberately identifying. The Arch has no accounts, no
          logins, no comments and no shop &mdash; there is nowhere to hand over personal
          information, and no database storing it.
        </p>
        <h3>If you email</h3>
        <p>
          Your message and address sit in an ordinary email inbox, used only to reply to you. They
          aren&apos;t added to any list without you asking.
        </p>
        <h3>If you sign up to the newsletter</h3>
        <p>
          Your email address is stored with the email provider used to send it, solely to send you
          the weekly edit. There&apos;s an unsubscribe link on every email, and unsubscribing
          removes you. Your address is never sold, rented or passed to anyone else.
        </p>
        <h3>Hosting and server logs</h3>
        <p>
          Like every website, the host records basic technical information when a page is served
          &mdash; IP address, browser type, and which page was requested. This is standard security
          and diagnostics logging, kept briefly by the host and not used to build a profile of you.
        </p>

        <h2>Cookies</h2>
        <p>There are three kinds of cookie this site may involve.</p>
        <ul>
          <li>
            <strong>Essential.</strong> One small item stored in your browser remembering the cookie
            choice you made, so you&apos;re not asked on every page. Nothing else depends on it.
          </li>
          <li>
            <strong>Analytics.</strong> Aggregated counts of which edits get read, used to decide
            what to write next. These load only if you accept them.
          </li>
          <li>
            <strong>Affiliate tracking.</strong> If you click through to a retailer, that retailer
            (or their affiliate network) may set a cookie so a purchase can be credited back here.
            That cookie is set by <strong>them</strong>, on <strong>their</strong> site, under their
            privacy policy &mdash; not by The Arch. It records that a click came from this
            site; it does not tell us who you are or what you bought.
          </li>
        </ul>
        <p>
          You can change your mind at any time by clearing this site&apos;s data in your browser
          settings, which resets the banner. Blocking cookies entirely won&apos;t break anything
          here.
        </p>

        <h2>What is never done</h2>
        <ul>
          <li>Your data is never sold, rented or traded. Not to anyone, ever.</li>
          <li>There is no advertising network on this site and no ad-targeting profile built.</li>
          <li>No content on this site is directed at children, and no data is knowingly collected from anyone under 13.</li>
        </ul>

        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask what personal data is held about you, ask for it to be
          corrected, ask for it to be deleted, or object to it being used. In practice that mostly
          means your newsletter subscription or an email you sent. Write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and it will be handled within one month.
        </p>
        <p>
          If you&apos;re unhappy with how a request was handled, you can complain to the
          Information Commissioner&apos;s Office at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener">
            ico.org.uk
          </a>
          .
        </p>

        <h2>Other sites</h2>
        <p>
          This site links out to retailers constantly. Once you follow a link you&apos;re on their
          site under their rules &mdash; their privacy policy governs what happens next, and The Arch has no control over or responsibility for it.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the date at the top changes with it. Material changes will be
          noted on the homepage.
        </p>
      </Prose>
      <Footer />
    </>
  );
}
