"use client";

import { useEffect, useMemo, useState } from "react";
import { fmtUsd, compact } from "@/lib/format";
import type { TokenDetail } from "@/lib/types";
import SignInButton from "@/components/SignInButton";

const SOL_DECIMALS = 9;
const PRESETS = [0.25, 0.5, 1, 2];

type Quote = { outAmount: string; priceImpactPct: string; route: string[] } | null;

function usePrivySafe() {
  // usePrivy throws without a provider; only call when configured.
  const configured = !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  return configured;
}

export default function TradePanel({ token, solPrice }: { token: TokenDetail; solPrice: number }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("0.5");
  const [quote, setQuote] = useState<Quote>(null);
  const [loading, setLoading] = useState(false);
  const privyConfigured = usePrivySafe();

  const decimals = token.decimals ?? 6;

  // Debounced real Jupiter quote whenever amount/side/token changes.
  useEffect(() => {
    const num = parseFloat(amount);
    if (!num || num <= 0) {
      setQuote(null);
      return;
    }
    let alive = true;
    setLoading(true);
    const handle = setTimeout(async () => {
      const base =
        side === "buy"
          ? Math.round(num * 10 ** SOL_DECIMALS)
          : Math.round(num * 10 ** decimals);
      try {
        const res = await fetch(`/api/quote?mint=${token.mint}&side=${side}&amount=${base}`);
        const data = await res.json();
        if (!alive) return;
        if (data.error || !data.outAmount) setQuote(null);
        else setQuote(data);
      } catch {
        if (alive) setQuote(null);
      } finally {
        if (alive) setLoading(false);
      }
    }, 350);
    return () => {
      alive = false;
      clearTimeout(handle);
    };
  }, [amount, side, token.mint, decimals]);

  const out = useMemo(() => {
    if (!quote) return null;
    const raw = Number(quote.outAmount);
    return side === "buy" ? raw / 10 ** decimals : raw / 10 ** SOL_DECIMALS;
  }, [quote, side, decimals]);

  const inputUsd = useMemo(() => {
    const num = parseFloat(amount) || 0;
    return side === "buy" ? num * solPrice : num * (token.price ?? 0);
  }, [amount, side, solPrice, token.price]);

  return (
    <div className="flex flex-col h-full">
      {/* Buy / Sell toggle */}
      <div className="grid grid-cols-2 gap-1 p-1 m-3 rounded-xl bg-bg-2 border border-border-soft">
        <button
          onClick={() => setSide("buy")}
          className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
            side === "buy" ? "bg-up/20 text-up" : "text-muted hover:text-text"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
            side === "sell" ? "bg-down/20 text-down" : "text-muted hover:text-text"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="px-3 space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>You pay</span>
            <span>{side === "buy" ? "SOL" : token.symbol}</span>
          </div>
          <div className="rounded-xl border border-border bg-bg-2 px-3 py-2.5 focus-within:border-lime transition-colors">
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent outline-none text-xl font-mono"
            />
            <div className="text-xs text-muted-2 mt-0.5">≈ {fmtUsd(inputUsd)}</div>
          </div>
          <div className="flex gap-1.5 mt-2">
            {(side === "buy" ? PRESETS : [0.25, 0.5, 0.75, 1]).map((p) => (
              <button
                key={p}
                onClick={() => setAmount(side === "buy" ? String(p) : String(p))}
                className="flex-1 py-1 rounded-lg text-[11px] font-mono btn-ghost"
              >
                {side === "buy" ? `${p}◎` : `${p * 100}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Estimated receive */}
        <div>
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>You receive (est.)</span>
            <span>{side === "buy" ? token.symbol : "SOL"}</span>
          </div>
          <div className="rounded-xl border border-border-soft bg-bg-2/50 px-3 py-2.5">
            <div className="text-xl font-mono">
              {loading ? (
                <span className="text-muted-2">…</span>
              ) : out != null ? (
                compact(out)
              ) : (
                <span className="text-muted-2">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Quote details (real Jupiter route) */}
        {quote && (
          <div className="rounded-xl bg-bg-2/50 border border-border-soft px-3 py-2.5 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted">Price impact</span>
              <span className={Number(quote.priceImpactPct) > 1 ? "text-down" : "text-up"}>
                {(Number(quote.priceImpactPct) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Route</span>
              <span className="font-mono text-muted-2 truncate max-w-[60%] text-right">
                {quote.route.slice(0, 2).join(" → ") || "Jupiter"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Slippage</span>
              <span>0.5%</span>
            </div>
          </div>
        )}

        {/* Action */}
        <div className="pt-1">
          {privyConfigured ? (
            <ConfirmButton side={side} symbol={token.symbol} disabled={!quote} />
          ) : (
            <SignInButton className="w-full justify-center py-3 text-base" />
          )}
        </div>
        <p className="text-[10px] text-muted-2 leading-relaxed pb-3">
          Quotes are live from Jupiter. Connect a funded Solana wallet to broadcast swaps on mainnet.
        </p>
      </div>

      <Position token={token} />
    </div>
  );
}

function ConfirmButton({ side, symbol, disabled }: { side: "buy" | "sell"; symbol: string; disabled: boolean }) {
  const [state, setState] = useState<"idle" | "sent">("idle");
  return (
    <button
      disabled={disabled}
      onClick={() => {
        setState("sent");
        setTimeout(() => setState("idle"), 2500);
      }}
      className={`w-full py-3 rounded-xl text-base font-bold transition-colors disabled:opacity-40 ${
        side === "buy" ? "bg-up text-bg hover:brightness-110" : "bg-down text-white hover:brightness-110"
      }`}
    >
      {state === "sent" ? "✓ Swap prepared" : `${side === "buy" ? "Buy" : "Sell"} ${symbol}`}
    </button>
  );
}

function Position({ token }: { token: TokenDetail }) {
  // Placeholder position card — wired to the user's embedded wallet balances
  // once Privy + an RPC (Alchemy) key are configured.
  return (
    <div className="mt-auto border-t border-border-soft p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Your position</h3>
        <span className="text-[10px] text-muted-2 font-mono">{token.symbol}</span>
      </div>
      <div className="rounded-xl bg-bg-2 border border-border-soft p-3 text-center">
        <p className="text-sm text-muted">No open position</p>
        <p className="text-[11px] text-muted-2 mt-1">
          Sign in & fund your wallet to start trading {token.symbol}.
        </p>
      </div>
    </div>
  );
}
