"use client";

import Link from "next/link";
import { useTrending } from "@/lib/useTrending";
import { fmtUsd, fmtPct, compact } from "@/lib/format";

export default function TrendingList({ active }: { active: string }) {
  const { tokens, loading } = useTrending(20000);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-b border-border-soft">
        <h2 className="text-sm font-semibold">🔥 Trending</h2>
        <span className="text-[10px] text-muted-2 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-up live-dot" /> live
        </span>
      </div>
      <div className="flex-1 overflow-y-auto thin-scroll">
        {loading && tokens.length === 0 && (
          <div className="p-3 space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-surface-2/50 animate-pulse" />
            ))}
          </div>
        )}
        {tokens.map((t, i) => {
          const up = (t.change24h ?? 0) >= 0;
          const isActive = t.mint === active;
          return (
            <Link
              key={t.mint}
              href={`/trade/${t.mint}`}
              className={`flex items-center gap-2.5 px-3 py-2.5 border-b border-border-soft/50 hover:bg-surface-2 transition-colors ${
                isActive ? "bg-surface-2 border-l-2 border-l-lime" : ""
              }`}
            >
              <span className="text-[11px] text-muted-2 w-4 tabular-nums">{i + 1}</span>
              {t.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.icon} alt="" width={28} height={28} className="rounded-full" loading="lazy" />
              ) : (
                <span className="w-7 h-7 rounded-full bg-surface-2 grid place-items-center text-[10px] font-bold">
                  {t.symbol?.[0]}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm truncate">{t.symbol}</span>
                  <span className="text-xs font-mono">{fmtUsd(t.price)}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-2">MC {compact(t.mcap)}</span>
                  <span className={`text-[11px] font-mono font-semibold ${up ? "text-up" : "text-down"}`}>
                    {fmtPct(t.change24h)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
