import Link from "next/link";
import Logo from "@/components/Logo";
import SignInButton from "@/components/SignInButton";
import TokenBanner from "@/components/TokenBanner";
import TokenHeader from "@/components/trade/TokenHeader";
import PriceChart from "@/components/trade/PriceChart";
import TrendingList from "@/components/trade/TrendingList";
import ActivityPanel from "@/components/trade/ActivityPanel";
import TradePanel from "@/components/trade/TradePanel";
import { getToken, SOL_MINT } from "@/lib/jupiter";
import type { TokenDetail } from "@/lib/types";

export const revalidate = 15;

async function loadToken(mint: string): Promise<TokenDetail | null> {
  const t = await getToken(mint).catch(() => null);
  if (!t) return null;
  return {
    mint: t.id,
    name: t.name,
    symbol: t.symbol,
    icon: t.icon,
    decimals: t.decimals,
    price: t.usdPrice,
    change24h: t.stats24h?.priceChange ?? t.stats6h?.priceChange ?? 0,
    change1h: t.stats1h?.priceChange ?? 0,
    mcap: t.mcap,
    fdv: t.fdv,
    liquidity: t.liquidity,
    holders: t.holderCount,
    supply: t.circSupply ?? t.totalSupply,
    volume24h: (t.stats24h?.buyVolume ?? 0) + (t.stats24h?.sellVolume ?? 0),
    buys24h: t.stats24h?.numBuys,
    sells24h: t.stats24h?.numSells,
    traders24h: t.stats24h?.numTraders,
  };
}

export default async function TradePage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const [token, sol] = await Promise.all([loadToken(mint), getToken(SOL_MINT).catch(() => null)]);
  const solPrice = sol?.usdPrice ?? 0;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* compact terminal header */}
      <header className="shrink-0 glass border-b border-border-soft">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-6">
            <Logo size={28} />
            <Link href="/" className="text-sm text-muted hover:text-text hidden sm:block">
              ← Home
            </Link>
          </div>
          <SignInButton />
        </div>
      </header>

      <TokenBanner durationSec={80} />

      {token ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] overflow-hidden">
          {/* Left: trending */}
          <aside className="hidden lg:block border-r border-border-soft overflow-hidden bg-bg-2/30">
            <TrendingList active={token.mint} />
          </aside>

          {/* Middle: header + chart + activity */}
          <section className="flex flex-col overflow-hidden min-w-0">
            <TokenHeader token={token} />
            <div className="h-[44%] min-h-[260px] border-b border-border-soft p-2">
              <PriceChart mint={token.mint} />
            </div>
            <div className="flex-1 overflow-hidden">
              <ActivityPanel token={token} />
            </div>
          </section>

          {/* Right: trade + position */}
          <aside className="border-l border-border-soft overflow-y-auto thin-scroll bg-bg-2/30 hidden lg:flex lg:flex-col">
            <TradePanel token={token} solPrice={solPrice} />
          </aside>
        </div>
      ) : (
        <div className="flex-1 grid place-items-center text-center px-6">
          <div>
            <p className="text-lg font-semibold">Token not found</p>
            <p className="text-muted mt-1 text-sm">We couldn&apos;t load market data for this mint.</p>
            <Link href="/trade" className="inline-block mt-4 btn-lime rounded-xl px-5 py-2.5">
              Back to trending
            </Link>
          </div>
        </div>
      )}

      {/* Mobile: trade panel below (lg hides it in the sidebar) */}
      {token && (
        <div className="lg:hidden border-t border-border-soft bg-bg-2 max-h-[55vh] overflow-y-auto thin-scroll">
          <TradePanel token={token} solPrice={solPrice} />
        </div>
      )}
    </div>
  );
}
