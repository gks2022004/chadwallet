import { fmtUsd, fmtPct, compact, shortAddr } from "@/lib/format";
import type { TokenDetail } from "@/lib/types";

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="px-3.5 py-2 border-l border-border-soft first:border-l-0">
      <div className="text-[10px] uppercase tracking-wide text-muted-2">{label}</div>
      <div className={`text-sm font-mono font-semibold ${accent ?? ""}`}>{value}</div>
    </div>
  );
}

export default function TokenHeader({ token }: { token: TokenDetail }) {
  const up = (token.change24h ?? 0) >= 0;
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 justify-between px-4 py-3 border-b border-border-soft">
      <div className="flex items-center gap-3">
        {token.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={token.icon} alt="" width={40} height={40} className="rounded-full" />
        ) : (
          <span className="w-10 h-10 rounded-full bg-surface-2 grid place-items-center font-bold">
            {token.symbol?.[0]}
          </span>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">{token.symbol}</h1>
            <span className="text-xs text-muted truncate max-w-[140px]">{token.name}</span>
          </div>
          <a
            href={`https://solscan.io/token/${token.mint}`}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono text-muted-2 hover:text-lime"
          >
            {shortAddr(token.mint, 5)} ↗
          </a>
        </div>
        <div className="ml-2">
          <div className="text-2xl font-bold font-mono leading-none">{fmtUsd(token.price)}</div>
          <div className={`text-sm font-mono font-semibold ${up ? "text-up" : "text-down"}`}>
            {fmtPct(token.change24h)} 24h
          </div>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-border-soft bg-bg-2/50">
        <Stat label="MCap" value={"$" + compact(token.mcap)} />
        <Stat label="Liq" value={"$" + compact(token.liquidity)} />
        <Stat label="Vol 24h" value={"$" + compact(token.volume24h)} />
        <Stat label="Holders" value={compact(token.holders)} />
        <Stat label="1h" value={fmtPct(token.change1h)} accent={(token.change1h ?? 0) >= 0 ? "text-up" : "text-down"} />
      </div>
    </div>
  );
}
