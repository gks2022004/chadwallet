"use client";

import Link from "next/link";
import { useTrending } from "@/lib/useTrending";
import { fmtUsd, fmtPct } from "@/lib/format";
import type { TrendingToken } from "@/lib/types";

function TokenPill({ t }: { t: TrendingToken }) {
  const up = (t.change24h ?? 0) >= 0;
  return (
    <Link
      href={`/trade/${t.mint}`}
      className="flex items-center gap-2.5 px-4 py-2 mx-1 rounded-full hover:bg-surface-2 transition-colors shrink-0 border border-transparent hover:border-border"
    >
      {t.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.icon} alt="" width={22} height={22} className="rounded-full" loading="lazy" />
      ) : (
        <span className="w-[22px] h-[22px] rounded-full bg-surface-2 grid place-items-center text-[10px] font-bold">
          {t.symbol?.[0]}
        </span>
      )}
      <span className="font-semibold text-sm">{t.symbol}</span>
      <span className="text-sm text-muted font-mono">{fmtUsd(t.price)}</span>
      <span className={`text-xs font-mono font-semibold ${up ? "text-up" : "text-down"}`}>
        {fmtPct(t.change24h)}
      </span>
    </Link>
  );
}

export default function TokenBanner({
  reverse = false,
  durationSec = 70,
}: {
  reverse?: boolean;
  durationSec?: number;
}) {
  const { tokens } = useTrending();
  const list = tokens.length ? tokens : [];
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const doubled = [...list, ...list];

  return (
    <div className="marquee relative overflow-hidden border-y border-border-soft bg-bg-2/80 backdrop-blur">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-bg-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-bg-2 to-transparent" />
      {list.length === 0 ? (
        <div className="py-2.5 px-4 text-xs text-muted-2 font-mono">loading live markets…</div>
      ) : (
        <div
          className={`marquee-track py-1.5 ${reverse ? "reverse" : ""}`}
          style={{ ["--marquee-dur" as string]: `${durationSec}s` }}
        >
          {doubled.map((t, i) => (
            <TokenPill key={`${t.mint}-${i}`} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}
