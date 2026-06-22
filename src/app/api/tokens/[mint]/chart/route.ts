import { NextResponse } from "next/server";
import { getToken } from "@/lib/jupiter";
import { getOhlcv } from "@/lib/birdeye";
import { synthCandles } from "@/lib/synth";

export const revalidate = 20;

export async function GET(_req: Request, ctx: { params: Promise<{ mint: string }> }) {
  const { mint } = await ctx.params;
  // Prefer real Birdeye OHLCV; fall back to a series shaped to the real price.
  const real = await getOhlcv(mint).catch(() => null);
  if (real && real.length) {
    return NextResponse.json({ candles: real, source: "birdeye" });
  }
  const t = await getToken(mint).catch(() => null);
  const price = t?.usdPrice ?? 1;
  const change = t?.stats24h?.priceChange ?? 0;
  return NextResponse.json({ candles: synthCandles(mint, price, change), source: "synthetic" });
}
