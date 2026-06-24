import { NextResponse } from "next/server";
import { getSolBalance, getTokenBalance, hasRpc } from "@/lib/solana";

// Read-only: returns a wallet's SOL balance and (optionally) its balance of one
// token mint. Never signs or sends anything.
export const revalidate = 0;

export async function GET(req: Request, ctx: { params: Promise<{ address: string }> }) {
  const { address } = await ctx.params;
  const mint = new URL(req.url).searchParams.get("mint");

  if (!hasRpc()) {
    return NextResponse.json({ sol: null, token: null, source: "no-rpc" });
  }

  const [sol, token] = await Promise.all([
    getSolBalance(address).catch(() => null),
    mint ? getTokenBalance(address, mint).catch(() => null) : Promise.resolve(null),
  ]);

  return NextResponse.json({ sol, token, source: "rpc" });
}
