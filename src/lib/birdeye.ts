// Optional Birdeye Data API integration (free tier, requires API key).
// If BIRDEYE_API_KEY is unset, callers should fall back to synthesized data
// derived from Jupiter's real price/volume so the UI always renders.
// Docs: https://docs.birdeye.so/
const BE = "https://public-api.birdeye.so";

export function hasBirdeye(): boolean {
  return !!process.env.BIRDEYE_API_KEY;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Free-tier Birdeye allows ~1 req/sec, so the chart + trades calls that fire
// together on page load can collide and 429. Retry once after a short backoff
// before giving up (callers then fall back to a last-good cache or synthetic).
async function beget<T>(path: string, revalidate = 30, retries = 2): Promise<T | null> {
  const key = process.env.BIRDEYE_API_KEY;
  if (!key) return null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BE}${path}`, {
      headers: { "X-API-KEY": key, "x-chain": "solana", Accept: "application/json" },
      next: { revalidate },
    });
    if (res.status === 429) {
      if (attempt < retries) {
        await sleep(700 * (attempt + 1));
        continue;
      }
      return null;
    }
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  }
  return null;
}

// Last-good real data per mint, so a transient 429 keeps showing live data
// (not the synthetic demo series) until the next successful refresh.
const lastGood = new Map<string, unknown>();
function remember<T>(key: string, value: T | null): T | null {
  if (value && (!Array.isArray(value) || value.length)) lastGood.set(key, value);
  return value ?? (lastGood.get(key) as T | undefined) ?? null;
}

export type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number };

export async function getOhlcv(mint: string, type = "15m"): Promise<Candle[] | null> {
  const now = Math.floor(Date.now() / 1000);
  const from = now - 60 * 60 * 24 * 2; // 2 days
  const data = await beget<{ data?: { items?: { unixTime: number; o: number; h: number; l: number; c: number; v: number }[] } }>(
    `/defi/ohlcv?address=${mint}&type=${type}&time_from=${from}&time_to=${now}`,
  );
  const items = data?.data?.items;
  const candles = items?.map((i) => ({ time: i.unixTime, open: i.o, high: i.h, low: i.l, close: i.c, volume: i.v })) ?? null;
  return remember(`ohlcv:${mint}:${type}`, candles);
}

export type BeTrade = { side: "buy" | "sell"; amountUsd: number; price: number; owner: string; time: number; tx: string };

export async function getTrades(mint: string, limit = 30): Promise<BeTrade[] | null> {
  const data = await beget<{ data?: { items?: any[] } }>(`/defi/txs/token?address=${mint}&tx_type=swap&limit=${limit}&sort_type=desc`);
  const items = data?.data?.items;
  const trades: BeTrade[] | null =
    items?.map((t) => {
      // USD value of the trade = token amount * its USD price (try both legs).
      const usd =
        (t.to?.uiAmount ?? 0) * (t.to?.price ?? 0) ||
        (t.from?.uiAmount ?? 0) * (t.from?.price ?? 0) ||
        0;
      return {
        side: t.side === "buy" ? "buy" : "sell",
        amountUsd: usd,
        price: t.tokenPrice ?? t.pricePair ?? 0,
        owner: t.owner ?? t.txHash ?? "",
        time: (t.blockUnixTime ?? 0) * 1000,
        tx: t.txHash ?? "",
      } as BeTrade;
    }) ?? null;
  return remember(`trades:${mint}`, trades);
}

export type BeHolder = { owner: string; uiAmount: number };

export async function getHolders(mint: string, limit = 10): Promise<BeHolder[] | null> {
  const data = await beget<{ data?: { items?: any[] } }>(
    `/defi/v3/token/holder?address=${mint}&offset=0&limit=${limit}`,
  );
  const items = data?.data?.items;
  const holders: BeHolder[] | null =
    items?.map((h) => ({ owner: h.owner ?? "", uiAmount: h.ui_amount ?? 0 })) ?? null;
  return remember(`holders:${mint}`, holders);
}
