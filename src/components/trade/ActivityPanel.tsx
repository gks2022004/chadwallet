"use client";

import { useEffect, useState } from "react";
import { fmtUsd, compact, timeAgo, shortAddr } from "@/lib/format";
import type { Trade, TokenDetail } from "@/lib/types";

function synthHolders(token: TokenDetail) {
  const total = token.holders ?? 1000;
  const supply = token.supply ?? 1_000_000_000;
  // top-10 distribution that tapers off (whales -> shrimp)
  const rows: { rank: number; addr: string; pct: number; usd: number }[] = [];
  let remaining = 62; // top 10 hold ~62%
  const seedChars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  for (let i = 0; i < 10; i++) {
    const pct = i === 0 ? 14 : Math.max(0.6, remaining * (0.28 - i * 0.015));
    remaining -= pct;
    const addr =
      seedChars[(i * 7 + token.mint.charCodeAt(i % token.mint.length)) % seedChars.length] +
      token.mint.slice(2 + i, 6 + i) +
      "…" +
      token.mint.slice(-3);
    rows.push({
      rank: i + 1,
      addr,
      pct: Math.max(0.2, pct),
      usd: ((token.mcap ?? supply) * Math.max(0.2, pct)) / 100,
    });
  }
  return { total, rows };
}

export default function ActivityPanel({ token }: { token: TokenDetail }) {
  const [tab, setTab] = useState<"trades" | "holders">("trades");
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/tokens/${token.mint}/trades`);
        const data = await res.json();
        if (alive) setTrades(data.trades ?? []);
      } catch {
        /* keep */
      }
    };
    load();
    const id = setInterval(load, 6000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [token.mint]);

  const holders = synthHolders(token);

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-border-soft text-sm">
        {(["trades", "holders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 font-medium capitalize transition-colors ${
              tab === t ? "text-text border-b-2 border-lime" : "text-muted hover:text-text"
            }`}
          >
            {t === "trades" ? "Live trades" : `Holders (${compact(holders.total)})`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto thin-scroll">
        {tab === "trades" ? (
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-surface text-muted-2">
              <tr className="text-left">
                <th className="font-medium px-3 py-2">Time</th>
                <th className="font-medium px-2 py-2">Type</th>
                <th className="font-medium px-2 py-2 text-right">USD</th>
                <th className="font-medium px-2 py-2 text-right">Price</th>
                <th className="font-medium px-3 py-2 text-right">Trader</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {trades.map((t, i) => (
                <tr key={i} className="border-b border-border-soft/40 hover:bg-surface-2/50">
                  <td className="px-3 py-1.5 text-muted-2">{timeAgo(t.time)}</td>
                  <td className={`px-2 py-1.5 font-semibold ${t.side === "buy" ? "text-up" : "text-down"}`}>
                    {t.side.toUpperCase()}
                  </td>
                  <td className="px-2 py-1.5 text-right">{fmtUsd(t.amountUsd)}</td>
                  <td className="px-2 py-1.5 text-right text-muted">{fmtUsd(t.price)}</td>
                  <td className="px-3 py-1.5 text-right text-muted-2">
                    {t.owner.includes("…") ? t.owner : shortAddr(t.owner)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-surface text-muted-2">
              <tr className="text-left">
                <th className="font-medium px-3 py-2">#</th>
                <th className="font-medium px-2 py-2">Holder</th>
                <th className="font-medium px-2 py-2 text-right">%</th>
                <th className="font-medium px-3 py-2 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {holders.rows.map((h) => (
                <tr key={h.rank} className="border-b border-border-soft/40 hover:bg-surface-2/50">
                  <td className="px-3 py-1.5 text-muted-2">{h.rank}</td>
                  <td className="px-2 py-1.5">{h.addr}</td>
                  <td className="px-2 py-1.5 text-right text-gold">{h.pct.toFixed(2)}%</td>
                  <td className="px-3 py-1.5 text-right text-muted">{fmtUsd(h.usd, { compact: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
