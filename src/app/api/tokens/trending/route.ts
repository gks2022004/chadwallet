import { NextResponse } from "next/server";
import { getTopTraded } from "@/lib/jupiter";

export const revalidate = 30;

export async function GET() {
  try {
    const tokens = await getTopTraded(40);
    // Drop the obviously non-tradeable / stablecoin noise for the banner & list.
    const cleaned = tokens
      .filter((t) => t.symbol && t.usdPrice && (t.liquidity ?? 0) > 5000)
      .map((t) => ({
        mint: t.id,
        name: t.name,
        symbol: t.symbol,
        icon: t.icon,
        price: t.usdPrice,
        change24h: t.stats24h?.priceChange ?? t.stats6h?.priceChange ?? 0,
        mcap: t.mcap,
        liquidity: t.liquidity,
        volume24h: (t.stats24h?.buyVolume ?? 0) + (t.stats24h?.sellVolume ?? 0),
        holders: t.holderCount,
      }));
    return NextResponse.json({ tokens: cleaned });
  } catch (e) {
    return NextResponse.json({ tokens: [], error: String(e) }, { status: 200 });
  }
}
