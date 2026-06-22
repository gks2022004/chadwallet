import { NextResponse } from "next/server";
import { getToken } from "@/lib/jupiter";

export const revalidate = 15;

export async function GET(_req: Request, ctx: { params: Promise<{ mint: string }> }) {
  const { mint } = await ctx.params;
  try {
    const t = await getToken(mint);
    if (!t) return NextResponse.json({ error: "not found" }, { status: 404 });
    const s = t.stats24h ?? t.stats6h ?? {};
    return NextResponse.json({
      token: {
        mint: t.id,
        name: t.name,
        symbol: t.symbol,
        icon: t.icon,
        decimals: t.decimals,
        price: t.usdPrice,
        change24h: t.stats24h?.priceChange ?? t.stats6h?.priceChange ?? 0,
        change1h: t.stats1h?.priceChange ?? 0,
        change5m: t.stats5m?.priceChange ?? 0,
        mcap: t.mcap,
        fdv: t.fdv,
        liquidity: t.liquidity,
        holders: t.holderCount,
        supply: t.circSupply ?? t.totalSupply,
        volume24h: (s.buyVolume ?? 0) + (s.sellVolume ?? 0),
        buys24h: s.numBuys,
        sells24h: s.numSells,
        traders24h: s.numTraders,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
