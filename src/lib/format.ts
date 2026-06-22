export function fmtUsd(n?: number, opts: { compact?: boolean } = {}): string {
  if (n == null || !isFinite(n)) return "—";
  if (opts.compact) {
    return "$" + compact(n);
  }
  if (n < 0.01 && n > 0) {
    // show small token prices with enough precision
    return "$" + n.toPrecision(4);
  }
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 1 ? 6 : 2,
  });
}

export function compact(n?: number): string {
  if (n == null || !isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}

export function fmtPct(n?: number): string {
  if (n == null || !isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function shortAddr(a?: string, n = 4): string {
  if (!a) return "—";
  return `${a.slice(0, n)}…${a.slice(-n)}`;
}

export function timeAgo(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
