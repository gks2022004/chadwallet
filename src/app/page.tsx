import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StoreButtons from "@/components/StoreButtons";
import TokenBanner from "@/components/TokenBanner";
import Logo from "@/components/Logo";

const FEATURES = [
  {
    title: "Live charts",
    body: "Real-time candles, trades and market depth on every Solana token — straight from the source.",
    icon: <path d="M4 19V5m0 14h16M8 15l3-4 3 3 4-6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Trending radar",
    body: "The hottest, most-traded tokens surface the second they move. Never miss the next runner.",
    icon: <path d="M12 2v3m0 14v3m10-10h-3M5 12H2m15.5-6.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2" strokeLinecap="round" />,
  },
  {
    title: "Social alpha",
    body: "Follow the wallets that win. See KOL moves and early trends before the timeline reacts.",
    icon: <path d="M16 11a4 4 0 1 0-8 0m12 8a6 6 0 0 0-12 0m18 0a5 5 0 0 0-7-4.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Instant swaps",
    body: "Best-price routing across Solana via Jupiter. Buy and sell in a couple of taps, no bridge maze.",
    icon: <path d="M4 7h13l-3-3m6 13H7l3 3" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Self-custody",
    body: "Your keys, your coins. A non-custodial wallet with no seed phrase to write down or lose.",
    icon: <path d="M12 2 4 6v6c0 5 3.4 7.7 8 10 4.6-2.3 8-5 8-10V6l-8-4Zm-2.5 9.5 2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Tap to start",
    body: "Sign in with Apple or Google and you are trading in seconds. No extensions, no friction.",
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const PRODUCT_FLOWS = [
  {
    eyebrow: "01 · spot trading",
    title: "Catch the move. Trade the move.",
    body: "Find what is trending, open a live chart, and buy or sell in a few taps without leaving the signal.",
    image: "/flow/buy-sell-4.png",
    alt: "ChadWallet flow for finding and trading trending tokens",
  },
  {
    eyebrow: "02 · social alpha",
    title: "See the people behind the price.",
    body: "Follow KOL activity, inspect performance, and move from a trader signal to the token chart instantly.",
    image: "/flow/kol-4.png",
    alt: "ChadWallet flow for following KOL traders",
  },
  {
    eyebrow: "03 · wallet",
    title: "Your assets, without the admin.",
    body: "Send, receive, deposit and withdraw from one clean wallet. No seed phrase and no maze of screens.",
    image: "/flow/portfolio-4.png",
    alt: "ChadWallet portfolio and asset management flow",
  },
];

export default function Home() {
  return (
    <div className="space-page">
      <Navbar />
      <TokenBanner durationSec={70} />

      <main>
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section className="hero-shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[0.86fr_1.14fr] lg:pb-28">
            <div className="relative z-10">
              <div className="hero-eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted">
                <span className="live-dot h-2 w-2 rounded-full bg-up" />
                Built for the speed of Solana
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-6xl md:text-7xl">
                Where traders
                <br />
                become <span className="text-up">legends.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                From memecoins to blue-chips, trade any Solana token in seconds. Catch early trends,
                follow winning wallets, and move before the timeline catches up.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#download" className="btn-lime rounded-full px-6 py-3.5 text-sm">
                  Download the app
                </a>
                <Link href="/trade" className="btn-ghost rounded-full px-6 py-3.5 text-sm font-semibold">
                  Start trading <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-4 text-xs text-muted-2">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["J", "◎", "X"].map((letter) => (
                    <span
                      key={letter}
                      className="grid h-8 w-8 place-items-center rounded-full border-2 border-bg bg-surface-2 font-semibold text-text"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                Live market data · Jupiter routing · Self-custody
              </div>
            </div>

            <div className="float hero-product-card">
              <div className="hero-product-topline">
                <Logo size={46} variant="light" showWordmark={false} />
                <span>One app. Every edge.</span>
              </div>
              <Image
                src="/flow/buy-sell-4.png"
                alt="Buy and sell trending tokens in ChadWallet"
                width={3840}
                height={2160}
                priority
                className="hero-product-image"
              />
            </div>
          </div>
        </section>

        {/* ───────────────────────── Feature grid ───────────────────────── */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28">
          <div className="mb-14 max-w-3xl">
            <p className="section-kicker">Everything you need</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              A trading edge that fits in your pocket.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {f.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────── Product flow showcase ───────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mb-16 max-w-3xl">
            <p className="section-kicker">The full flow</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              From signal to position, without losing the moment.
            </h2>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {PRODUCT_FLOWS.map((flow, index) => (
              <article key={flow.title} className="grid items-center gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <p className="section-kicker">{flow.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
                    {flow.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{flow.body}</p>
                </div>
                <div className={`flow-frame ${index % 2 ? "lg:order-1" : ""}`}>
                  <Image src={flow.image} alt={flow.alt} width={3840} height={2160} className="h-auto w-full" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────────────────────── Download CTA ───────────────────────── */}
        <section id="download" className="px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="download-panel mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-7 inline-flex rounded-2xl bg-black p-2">
                <Logo size={58} showWordmark={false} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/55">Available now</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-black sm:text-6xl">
                The market moves fast. Move with it.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-black/65 sm:text-lg">
                Download ChadWallet for iPhone or Android, or open the live trading terminal on the web.
              </p>
              <div className="mt-8">
                <StoreButtons className="download-store-buttons" />
              </div>
              <Link
                href="/trade"
                className="mt-6 inline-block text-sm font-bold text-black underline decoration-black/30 underline-offset-4 hover:decoration-black"
              >
                Continue on web ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      <TokenBanner reverse durationSec={85} />

      <footer className="border-t border-border-soft">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <Logo />
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-2">
              A non-custodial Solana trading wallet. Crypto is volatile—trade responsibly.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/trade" className="hover:text-text">Trade</Link>
            <a href="#features" className="hover:text-text">Features</a>
            <a href="#download" className="hover:text-text">Download</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
