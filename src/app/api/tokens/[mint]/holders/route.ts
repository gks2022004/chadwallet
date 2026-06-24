import { NextResponse } from "next/server";
import { getToken } from "@/lib/jupiter";
import { getHolders } from "@/lib/birdeye";
import { synthHolders, type HolderRow } from "@/lib/synth";

export const revalidate = 30;

export async function GET(_req: Request, ctx: { params: Promise<{ mint: string }> }) {
  const { mint } = await ctx.params;
  const t = await getToken(mint).catch(() => null);
  const supply = t?.circSupply ?? t?.totalSupply ?? 0;
  const price = t?.usdPrice ?? 0;
  const total = t?.holderCount ?? 0;
  const mcap = t?.mcap ?? supply * price;

  const real = await getHolders(mint, 10).catch(() => null);
  if (real && real.length) {
    const rows: HolderRow[] = real.map((h, i) => ({
      rank: i + 1,
      owner: h.owner,
      pct: supply ? (h.uiAmount / supply) * 100 : 0,
      usd: h.uiAmount * price,
    }));
    return NextResponse.json({ holders: rows, total, source: "birdeye" });
  }

  return NextResponse.json({
    holders: synthHolders(mint, mcap || 1_000_000),
    total: total || 1000,
    source: "synthetic",
  });
}
