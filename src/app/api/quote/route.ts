import { NextResponse } from "next/server";
import { getQuote, SOL_MINT } from "@/lib/jupiter";

export const revalidate = 0;

// Real Jupiter swap quotes (keyless). Used by the buy/sell panel to show
// expected output, price impact and route for a given SOL <-> token trade.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mint = searchParams.get("mint");
  const side = searchParams.get("side") ?? "buy"; // buy: SOL->token, sell: token->SOL
  const amount = searchParams.get("amount"); // base units
  if (!mint || !amount) {
    return NextResponse.json({ error: "mint and amount required" }, { status: 400 });
  }
  try {
    const quote = await getQuote({
      inputMint: side === "buy" ? SOL_MINT : mint,
      outputMint: side === "buy" ? mint : SOL_MINT,
      amount,
      slippageBps: 50,
    });
    return NextResponse.json({
      inAmount: quote.inAmount,
      outAmount: quote.outAmount,
      priceImpactPct: quote.priceImpactPct,
      route: quote.routePlan?.map((r) => r.swapInfo?.label).filter(Boolean) ?? [],
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 200 });
  }
}
