// Server-side helpers for Jupiter's free "lite" API (no API key required).
// Docs: https://developers.jup.ag/docs/
const JUP = "https://lite-api.jup.ag";

export const SOL_MINT = "So11111111111111111111111111111111111111112";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export type JupStats = {
  priceChange?: number;
  buyVolume?: number;
  sellVolume?: number;
  numBuys?: number;
  numSells?: number;
  numTraders?: number;
};

export type JupToken = {
  id: string; // mint
  name: string;
  symbol: string;
  icon?: string;
  decimals: number;
  circSupply?: number;
  totalSupply?: number;
  holderCount?: number;
  fdv?: number;
  mcap?: number;
  usdPrice?: number;
  liquidity?: number;
  stats5m?: JupStats;
  stats1h?: JupStats;
  stats6h?: JupStats;
  stats24h?: JupStats;
};

async function jget<T>(path: string, revalidate = 30): Promise<T> {
  const res = await fetch(`${JUP}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Jupiter ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export function getTopTraded(limit = 30): Promise<JupToken[]> {
  return jget<JupToken[]>(`/tokens/v2/toptraded/24h?limit=${limit}`);
}

export async function searchTokens(query: string): Promise<JupToken[]> {
  return jget<JupToken[]>(`/tokens/v2/search?query=${encodeURIComponent(query)}`);
}

export async function getToken(mint: string): Promise<JupToken | null> {
  const list = await jget<JupToken[]>(`/tokens/v2/search?query=${mint}`, 15);
  return list.find((t) => t.id === mint) ?? list[0] ?? null;
}

export type JupQuote = {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  priceImpactPct: string;
  routePlan?: { swapInfo?: { label?: string } }[];
};

export async function getQuote(params: {
  inputMint: string;
  outputMint: string;
  amount: number | string; // in base units of inputMint
  slippageBps?: number;
}): Promise<JupQuote> {
  const q = new URLSearchParams({
    inputMint: params.inputMint,
    outputMint: params.outputMint,
    amount: String(params.amount),
    slippageBps: String(params.slippageBps ?? 50),
  });
  return jget<JupQuote>(`/swap/v1/quote?${q.toString()}`, 0);
}
