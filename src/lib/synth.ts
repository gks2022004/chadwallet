import type { Candle, BeTrade } from "./birdeye";

// Seeded RNG so synthesized series are stable per mint (no hydration flicker).
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function seedFrom(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Build a plausible 2-day candle series ending at the real current price,
// shaped so the net move matches the real 24h % change.
export function synthCandles(mint: string, price: number, change24h = 0): Candle[] {
  const rnd = seeded(seedFrom(mint));
  const points = 96; // 2 days @ 30m
  const stepSec = 1800;
  const now = Math.floor(Date.now() / 1000);
  const start = now - points * stepSec;
  const startPrice = price / (1 + change24h / 100 || 1) / (1 + (rnd() - 0.5) * 0.2);
  const vol = Math.max(0.01, Math.abs(change24h) / 100) * 0.6 + 0.02;
  const candles: Candle[] = [];
  let p = startPrice;
  for (let i = 0; i < points; i++) {
    const drift = (price - startPrice) / points;
    const noise = (rnd() - 0.5) * p * vol;
    const open = p;
    let close = p + drift + noise;
    if (i === points - 1) close = price;
    const high = Math.max(open, close) * (1 + rnd() * vol * 0.5);
    const low = Math.min(open, close) * (1 - rnd() * vol * 0.5);
    candles.push({
      time: start + i * stepSec,
      open,
      high,
      low,
      close,
      volume: rnd() * 100000,
    });
    p = close;
  }
  return candles;
}

const WORDS = ["7xKp", "Hn3v", "9zQa", "Bd4R", "Lm8T", "Cw2N", "Fy6J", "Px1S", "Rk5G", "Tz0M"];

export type HolderRow = { rank: number; owner: string; pct: number; usd: number };

// Plausible top-10 distribution (whales -> shrimp) when Birdeye holders aren't available.
export function synthHolders(mint: string, mcap: number): HolderRow[] {
  const rnd = seeded(seedFrom(mint) ^ 0x1234abcd);
  const rows: HolderRow[] = [];
  let remaining = 62; // top 10 hold ~62%
  for (let i = 0; i < 10; i++) {
    const raw = i === 0 ? 14 : remaining * (0.28 - i * 0.015);
    const pct = Math.max(0.2, raw);
    remaining -= pct;
    const owner =
      WORDS[Math.floor(rnd() * WORDS.length)] +
      Math.floor(rnd() * 99999).toString(36) +
      "…" +
      WORDS[Math.floor(rnd() * WORDS.length)].slice(0, 3);
    rows.push({ rank: i + 1, owner, pct, usd: (mcap * pct) / 100 });
  }
  return rows;
}

export function synthTrades(mint: string, price: number, count = 24): BeTrade[] {
  const rnd = seeded(seedFrom(mint) ^ 0x9e3779b9);
  const now = Date.now();
  const trades: BeTrade[] = [];
  for (let i = 0; i < count; i++) {
    const side = rnd() > 0.45 ? "buy" : "sell";
    const amountUsd = Math.round((rnd() ** 2) * 8000 + 20);
    const owner =
      WORDS[Math.floor(rnd() * WORDS.length)] +
      Math.floor(rnd() * 9999).toString(36) +
      "…" +
      WORDS[Math.floor(rnd() * WORDS.length)].slice(0, 3);
    trades.push({
      side,
      amountUsd,
      price: price * (1 + (rnd() - 0.5) * 0.01),
      owner,
      time: now - i * (rnd() * 45000 + 3000),
      tx: "",
    });
  }
  return trades.sort((a, b) => b.time - a.time);
}
