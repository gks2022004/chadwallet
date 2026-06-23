import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StoreButtons from "@/components/StoreButtons";
import Logo from "@/components/Logo";

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

const QUICK_FEATURES = [
  ["Live", "Token charts, trades and market activity"],
  ["Social", "KOL moves and early trends from X"],
  ["Instant", "Fast swaps routed on Solana"],
  ["Simple", "Apple or Google sign-in, no seed phrase"],
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero-shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[0.82fr_1.18fr] lg:pb-24">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/75 px-3.5 py-2 text-xs font-medium text-muted">
                <span className="live-dot h-2 w-2 rounded-full bg-up" />
                Built for the speed of Solana
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.96] tracking-[-0.065em] sm:text-6xl md:text-7xl">
                Your unfair edge in <span className="text-up">crypto.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Catch early trends, follow winning wallets and trade any token—before the timeline catches up.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#download" className="btn-lime rounded-full px-6 py-3.5 text-sm">
                  Get the app
                </a>
                <Link href="/trade" className="btn-ghost rounded-full px-6 py-3.5 text-sm font-semibold">
                  Trade on web <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-4 text-xs text-muted-2">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["J", "◎", "X"].map((letter) => (
                    <span key={letter} className="grid h-8 w-8 place-items-center rounded-full border-2 border-bg bg-surface-2 font-semibold text-text">
                      {letter}
                    </span>
                  ))}
                </div>
                Live market data · Jupiter routing · Self-custody
              </div>
            </div>

            <div className="hero-product-card">
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

        <section className="border-y border-border-soft bg-bg-2/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
            {QUICK_FEATURES.map(([title, body]) => (
              <div key={title} className="border-border-soft px-3 py-8 even:border-l sm:px-6 lg:border-l lg:first:border-l-0">
                <p className="text-sm font-semibold text-up">{title}</p>
                <p className="mt-1.5 max-w-[15rem] text-xs leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
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
                  <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">{flow.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{flow.body}</p>
                </div>
                <div className={`flow-frame ${index % 2 ? "lg:order-1" : ""}`}>
                  <Image src={flow.image} alt={flow.alt} width={3840} height={2160} className="h-auto w-full" />
                </div>
              </article>
            ))}
          </div>
        </section>

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
              <Link href="/trade" className="mt-6 inline-block text-sm font-bold text-black underline decoration-black/30 underline-offset-4 hover:decoration-black">
                Continue on web ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

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
    </>
  );
}
