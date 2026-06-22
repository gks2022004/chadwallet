import Link from "next/link";
import Navbar from "@/components/Navbar";
import TokenBanner from "@/components/TokenBanner";
import StoreButtons from "@/components/StoreButtons";
import Logo from "@/components/Logo";

const FEATURES = [
  {
    icon: "⚡",
    title: "Trade in seconds",
    body: "From memecoins to blue chips — buy and sell any Solana token instantly with one-tap swaps powered by Jupiter.",
  },
  {
    icon: "🔑",
    title: "No seed phrase",
    body: "Sign in with Apple or Google. ChadWallet spins up a secure embedded wallet for you. No 12 words to lose.",
  },
  {
    icon: "📈",
    title: "Live charts & trades",
    body: "Real-time price charts, holder counts and a live trade feed on every token. See the flow before you ape.",
  },
  {
    icon: "🔔",
    title: "Never miss out",
    body: "Trending banners and movers surface the hottest tokens the moment they start running.",
  },
  {
    icon: "🏆",
    title: "Built for legends",
    body: "Track your positions and PnL in one place. Climb the ranks from degen to certified chad.",
  },
  {
    icon: "🌐",
    title: "Anywhere, gasless",
    body: "Trade from your phone or desktop and never lose a beat. Fees abstracted so you focus on the chart.",
  },
];

const STATS = [
  { k: "Tokens", v: "1M+" },
  { k: "Swaps routed", v: "Jupiter" },
  { k: "Settlement", v: "<1s" },
  { k: "Chain", v: "Solana" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <TokenBanner durationSec={75} />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 aurora" />
          <div className="absolute inset-0 star-field opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-28 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-up live-dot" />
              Live on Solana · powered by real market data
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02]">
              where degens become <span className="text-lime">legends.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-muted">
              From memecoins to viral tokens, trade any crypto in seconds.
              Sign in with Apple or Google — no seed phrase, no friction.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#download" className="btn-lime rounded-2xl px-7 py-3.5 text-base">
                Download app
              </a>
              <Link href="/trade" className="btn-ghost rounded-2xl px-7 py-3.5 text-base">
                Start trading →
              </Link>
            </div>
            <div className="mt-7 flex justify-center">
              <StoreButtons />
            </div>

            {/* floating stat card */}
            <div className="relative mt-20 mx-auto max-w-3xl">
              <div className="float rounded-3xl border border-border bg-surface/80 backdrop-blur p-2 shadow-2xl shadow-black/50">
                <div className="rounded-2xl bg-bg-2 p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                      <div key={s.k} className="text-left">
                        <div className="text-2xl sm:text-3xl font-bold text-lime">{s.v}</div>
                        <div className="text-xs text-muted mt-1 uppercase tracking-wide">{s.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cross-platform ───────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Trade from anywhere.<br />
                <span className="text-gold">Never lose a beat.</span>
              </h2>
              <p className="mt-5 text-lg text-muted max-w-lg">
                Your wallet, positions and watchlist sync across phone and desktop.
                Open ChadWallet on the web to dive into the full trading terminal —
                charts, holders, live trades and instant swaps.
              </p>
              <Link href="/trade" className="inline-block mt-7 btn-lime rounded-2xl px-6 py-3">
                Open the terminal →
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-surface/60 p-6">
              <div className="space-y-3">
                {["BUY 1.5 SOL of BONK", "SELL 60% of WIF", "Position +214%"].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-bg-2 px-4 py-3 border border-border-soft"
                  >
                    <span className="font-mono text-sm">{row}</span>
                    <span className={`text-xs font-semibold ${i === 1 ? "text-down" : "text-up"}`}>
                      {i === 1 ? "filled" : "✓ done"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">never miss out again</h2>
            <p className="mt-4 text-muted text-lg">Everything a chad needs to trade Solana like a pro.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-surface/50 p-6 hover:border-lime/50 hover:bg-surface transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Download CTA ─────────────────────────────────────── */}
        <section id="download" className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-2 px-6 py-16 sm:px-16 text-center">
            <div className="absolute inset-0 aurora opacity-80" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
                Get ChadWallet. Become a legend.
              </h2>
              <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
                Download for iPhone or Android, or jump straight into the web terminal.
              </p>
              <div className="mt-8 flex justify-center">
                <StoreButtons />
              </div>
              <div className="mt-5">
                <Link href="/trade" className="text-sm text-lime hover:underline">
                  or trade on the web →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <TokenBanner reverse durationSec={90} />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-border-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <Logo />
            <p className="text-xs text-muted-2 max-w-sm text-center sm:text-left">
              ChadWallet is a non-custodial trading wallet for Solana. Markets are volatile —
              trade responsibly.
            </p>
          </div>
          <div className="flex items-center gap-7 text-sm text-muted">
            <Link href="/trade" className="hover:text-text">Trade</Link>
            <a href="#features" className="hover:text-text">Features</a>
            <a href="#download" className="hover:text-text">Download</a>
          </div>
        </div>
        <div className="border-t border-border-soft py-5 text-center text-xs text-muted-2">
          © 2026 ChadWallet · Built on Solana
        </div>
      </footer>
    </>
  );
}
