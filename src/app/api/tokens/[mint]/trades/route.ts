import { NextResponse } from "next/server";
import { getToken } from "@/lib/jupiter";
import { getTrades } from "@/lib/birdeye";
import { synthTrades } from "@/lib/synth";

export const revalidate = 5;

export async function GET(_req: Request, ctx: { params: Promise<{ mint: string }> }) {
  const { mint } = await ctx.params;
  const real = await getTrades(mint, 30).catch(() => null);
  if (real && real.length) {
    return NextResponse.json({ trades: real, source: "birdeye" });
  }
  const t = await getToken(mint).catch(() => null);
  const price = t?.usdPrice ?? 1;
  return NextResponse.json({ trades: synthTrades(mint, price, 24), source: "synthetic" });
}
