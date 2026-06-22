// Optional Birdeye Data API integration (free tier, requires API key).
// If BIRDEYE_API_KEY is unset, callers should fall back to synthesized data
// derived from Jupiter's real price/volume so the UI always renders.
// Docs: https://docs.birdeye.so/
const BE = "https://public-api.birdeye.so";

export function hasBirdeye(): boolean {
  return !!process.env.BIRDEYE_API_KEY;
}

async function beget<T>(path: string, revalidate = 20): Promise<T | null> {
  const key = process.env.BIRDEYE_API_KEY;
  if (!key) return null;
  const res = await fetch(`${BE}${path}`, {
    headers: { "X-API-KEY": key, "x-chain": "solana", Accept: "application/json" },
    next: { revalidate },
  });
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number };

export async function getOhlcv(mint: string, type = "15m"): Promise<Candle[] | null> {
  const now = Math.floor(Date.now() / 1000);
  const from = now - 60 * 60 * 24 * 2; // 2 days
  const data = await beget<{ data?: { items?: { unixTime: number; o: number; h: number; l: number; c: number; v: number }[] } }>(
    `/defi/ohlcv?address=${mint}&type=${type}&time_from=${from}&time_to=${now}`,
  );
  const items = data?.data?.items;
  if (!items) return null;
  return items.map((i) => ({ time: i.unixTime, open: i.o, high: i.h, low: i.l, close: i.c, volume: i.v }));
}

export type BeTrade = { side: "buy" | "sell"; amountUsd: number; price: number; owner: string; time: number; tx: string };

export async function getTrades(mint: string, limit = 30): Promise<BeTrade[] | null> {
  const data = await beget<{ data?: { items?: any[] } }>(`/defi/txs/token?address=${mint}&tx_type=swap&limit=${limit}&sort_type=desc`);
  const items = data?.data?.items;
  if (!items) return null;
  return items.map((t) => ({
    side: t.side === "buy" ? "buy" : "sell",
    amountUsd: t.volumeUSD ?? t.volume ?? 0,
    price: t.pricePair ?? t.price ?? 0,
    owner: t.owner ?? t.txHash ?? "",
    time: (t.blockUnixTime ?? 0) * 1000,
    tx: t.txHash ?? "",
  }));
}
