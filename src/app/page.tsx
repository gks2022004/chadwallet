import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TokenBanner from "@/components/TokenBanner";
import StoreButtons from "@/components/StoreButtons";
import AstronautHero from "@/components/AstronautHero";
import CommunityOrbit from "@/components/CommunityOrbit";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";

/* ---- leaderboard mock rows (LEADERBOARD card) ---- */
const LEADERS = [
  { rank: "🥇", name: "chadlord", handle: "@chadlord", pnl: "+$1,726,513.19" },
  { rank: "🥈", name: "frank", handle: "@frankdegods", pnl: "+$1,236,362.49" },
  { rank: "🥉", name: "_soljam", handle: "@_soljam", pnl: "+$810,605.83" },
  { rank: "4", name: "irulan", handle: "@irulan", pnl: "+$665,302.12" },
];

/* ---- multichain crystal blobs ---- */
const CRYSTALS = [
  "linear-gradient(135deg,#8f90f5,#5457c9)",
  "linear-gradient(135deg,#56c8ed,#2b9cf4)",
  "linear-gradient(135deg,#f5d36b,#d98a2b)",
  "linear-gradient(135deg,#b07bf0,#6a3fd0)",
];

const BUY_PRESETS = ["$25", "$50", "$100", "$250"];

export default function Home() {
  return (
    <div className="space-page">
      <Navbar />
      <TokenBanner durationSec={70} />

      <main>
        {/* ═══════════════════ Hero ═══════════════════ */}
        <section className="fomo-hero min-h-[88vh]">
          <AstronautHero />
          <div className="fomo-hero-overlay" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-32 pt-10 text-center sm:px-6 sm:pt-16">
            <div className="flex items-center justify-center gap-3">
              <Logo size={56} showWordmark={false} />
            </div>
            <h1 className="brand-wordmark mt-5 text-6xl sm:text-7xl md:text-8xl">chadwallet</h1>
            <p className="hero-shadow mt-5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Trade any Solana token in seconds.
            </p>
            <p className="hero-shadow mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              From memecoins to blue-chips — catch the move, follow the winners, and trade before the
              timeline reacts.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <Link href="/trade" className="btn-accent px-7 py-3 text-sm">
                Start trading
              </Link>
              <a href="#download" className="btn-dark px-7 py-3 text-sm">
                Download app
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ Trade from anywhere ═══════════════════ */}
        <section className="relative bg-bg px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal>
            <p className="eyebrow">Now on the web</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Trade from anywhere.
              <br />
              Never miss a beat.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Open a trade on your phone, finish it on your desktop — one account, everywhere.
            </p>
          </Reveal>

          {/* monitor + phone mockup */}
          <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-4xl">
            <div className="monitor-frame">
              <Image
                src="/flow/buy-sell-4.png"
                alt="ChadWallet web trading terminal"
                width={3840}
                height={2160}
                priority
              />
            </div>
            <div className="monitor-stand" />
            <div className="monitor-base" />

            {/* overlapping phone */}
            <div className="phone-frame absolute -right-2 bottom-6 w-28 sm:w-40 lg:-right-6">
              <Image
                src="/flow/portfolio-4.png"
                alt="ChadWallet mobile app"
                width={3840}
                height={2160}
                className="!aspect-[9/18] object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ Never miss out again ═══════════════════ */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Never miss out again</h2>
            <p className="mt-3 text-base text-muted">The social-first Solana trading app.</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 grid gap-4 md:grid-cols-3">
            {/* 1 — Leaderboard */}
            <div className="fcard">
              <p className="eyebrow">Leaderboard</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Climb the leaderboard.</h3>
              <div className="fcard-inner mt-5 divide-y divide-[#15161f] p-1.5">
                {LEADERS.map((l) => (
                  <div key={l.handle} className="flex items-center gap-2.5 px-2 py-2">
                    <span className="grid h-6 w-6 place-items-center text-xs">{l.rank}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#3a3b6e] to-[#6a6bc0] text-[10px] font-bold">
                      {l.name[0].toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-muted">{l.handle}</span>
                    <span className="font-mono text-[11px] font-semibold text-up">{l.pnl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 — Feed */}
            <div className="fcard">
              <p className="eyebrow">Feed</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Discover &amp; follow top traders.</h3>
              <div className="fcard-inner mt-5 space-y-3 p-3.5">
                {[
                  { who: "remsoulmars", note: "we're so back", tag: "Bonk", val: "+$242.6K" },
                  { who: "collectible", note: "loaded the dip", tag: "PENGU", val: "$34.3K" },
                  { who: "lexodre", note: "scaling in", tag: "SOL", val: "$45.5K" },
                ].map((p) => (
                  <div key={p.who} className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#444] to-[#777] text-[10px] font-bold">
                      {p.who[0].toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold">{p.who}</p>
                      <p className="truncate text-[10px] text-muted-2">{p.note}</p>
                    </div>
                    <span className="rounded-md bg-[#16171f] px-1.5 py-0.5 text-[10px] font-semibold">{p.tag}</span>
                    <span className="font-mono text-[10px] text-up">{p.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 — Alerts */}
            <div className="fcard">
              <p className="eyebrow">Alerts</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Real-time alerts on what winners buy.</h3>
              <div className="fcard-inner mt-5 p-3.5">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#8f90f5] to-[#5457c9] text-sm">🔔</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">BONK is up 5.98%</p>
                      <span className="text-[10px] text-muted-2">9:41 AM</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-muted">
                      <span className="text-up">●</span> 50 top traders bought $88,203.12
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 — Onboarding */}
            <div className="fcard">
              <p className="eyebrow">Easy onboarding</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Create an account in an instant.</h3>
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-semibold text-black">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 12.78c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.79-3.32.79-.69 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.58 2.17-1.53 2.65-.39 6.57 1.09 8.72.72 1.05 1.58 2.23 2.71 2.19 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.07 2.62-2.13.83-1.22 1.17-2.4 1.19-2.46-.03-.01-2.28-.87-2.3-3.46zM14.19 6.3c.6-.73 1-1.74.89-2.75-.86.03-1.9.57-2.52 1.3-.55.64-1.04 1.67-.91 2.65.96.07 1.94-.49 2.54-1.2z" /></svg>
                  Sign in with Apple
                </div>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-[#0d0e15] border border-[#1c1d27] py-2.5 text-sm font-semibold">
                  <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2a11 11 0 0 0 0 9.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2 7.1l3.7 2.8C6.6 7.3 9.1 5.4 12 5.4z"/></svg>
                  Sign in with Google
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-2">No seed phrase. No extensions.</p>
            </div>

            {/* 5 — Multichain / gasless */}
            <div className="fcard">
              <p className="eyebrow">Zero complexity</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Fast &amp; gasless on Solana.</h3>
              <div className="mt-6 flex items-center justify-center gap-3">
                {CRYSTALS.map((g, i) => (
                  <span
                    key={i}
                    className="crystal h-12 w-12"
                    style={{ background: g, transform: `rotate(${i % 2 ? -10 : 10}deg)` }}
                  />
                ))}
              </div>
              <p className="mt-6 text-center text-[11px] text-muted-2">Sub-second swaps, fees that round to zero.</p>
            </div>

            {/* 6 — Apple Pay */}
            <div className="fcard">
              <p className="eyebrow">One tap to buy</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">Fund in a single tap.</h3>
              <div className="fcard-inner mt-5 p-4">
                <div className="text-3xl font-bold tracking-tight">$100</div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {BUY_PRESETS.map((p) => (
                    <span
                      key={p}
                      className={`rounded-lg py-1.5 text-center text-[11px] font-semibold ${
                        p === "$100" ? "bg-accent text-white" : "bg-[#16171f] text-muted"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-sm font-semibold text-black">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 12.78c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.79-3.32.79-.69 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.58 2.17-1.53 2.65-.39 6.57 1.09 8.72.72 1.05 1.58 2.23 2.71 2.19 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.07 2.62-2.13.83-1.22 1.17-2.4 1.19-2.46-.03-.01-2.28-.87-2.3-3.46z" /></svg>
                  Buy with Pay
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ Community ═══════════════════ */}
        <section className="community px-4 py-28 sm:py-36">
          <div className="relative mx-auto max-w-3xl text-center">
            {/* orbiting avatar field */}
            <CommunityOrbit />

            <Reveal className="relative z-10">
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                A wallet for every trader.
              </h2>
              <p className="mt-4 text-sm text-muted sm:text-base">
                Join thousands trading Solana with ChadWallet — make your name on-chain.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href="/trade" className="btn-accent px-7 py-3 text-sm">
                  Start trading
                </Link>
                <a href="#download" className="btn-dark px-7 py-3 text-sm">
                  Download app
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════ Download ═══════════════════ */}
        <section id="download" className="bg-bg px-4 py-20 text-center sm:px-6">
          <Reveal>
            <div className="flex justify-center">
              <Logo size={52} showWordmark={false} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Get ChadWallet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Download for iPhone or Android, or trade right here on the web.
            </p>
            <div className="mt-7 flex justify-center">
              <StoreButtons />
            </div>
          </Reveal>
        </section>
      </main>

      <TokenBanner reverse durationSec={85} />

      {/* ═══════════════════ Footer ═══════════════════ */}
      <footer className="border-t border-border-soft bg-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:px-6">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-2">
              Trade any Solana token in seconds. Crypto is volatile — trade responsibly.
            </p>
            <p className="mt-4 text-[11px] text-muted-2">© 2026 ChadWallet</p>
          </div>
          {[
            { h: "Product", links: [["Trade", "/trade"], ["Features", "#features"], ["Download", "#download"]] },
            { h: "Social", links: [["X / Twitter", "#"], ["Discord", "#"], ["Instagram", "#"]] },
            { h: "Legal", links: [["Privacy Policy", "#"], ["Terms of Service", "#"]] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">{col.h}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-text">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
