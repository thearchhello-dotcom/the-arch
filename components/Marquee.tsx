// A strip of words that slides past, borrowed from the sites Gemma rates.
//
// It does two jobs. It is the only thing on the page that moves, which is a
// large part of why those sites feel alive and this one felt like a printed
// page. And it is where the site says out loud that it is not only outfits —
// coats, wellies, pramsuits and, in time, toys and gifts.
//
// The list is rendered twice and the track is moved by exactly half its width,
// so the second copy lands where the first began and the loop is seamless.
// prefers-reduced-motion already kills the animation site-wide in globals.css.
const WORDS = [
  "outfits",
  "coats",
  "wellies",
  "pramsuits",
  "knitwear",
  "pyjamas",
  "first shoes",
  "toys",
  "gifts",
  "every price added up",
];

export default function Marquee() {
  const run = (key: string) => (
    <span key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="font-display text-[19px] sm:text-[22px] font-semibold text-ink whitespace-nowrap">
            {word}
          </span>
          {/* The dot from the logo lockup, doing duty as a separator. */}
          <span className="mx-5 sm:mx-7 block h-[7px] w-[7px] rounded-pill bg-ink/45" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="bg-pop-coral overflow-hidden py-3.5 sm:py-4">
      <div className="flex w-max animate-[marquee_42s_linear_infinite]">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
