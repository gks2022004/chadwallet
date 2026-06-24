// Read-only Solana RPC helpers (Alchemy). Used to show a connected wallet's
// real SOL + token balances. No signing, no funds movement — queries only.
const RPC = process.env.NEXT_PUBLIC_SOLANA_RPC;

export function hasRpc(): boolean {
  return !!RPC;
}

async function rpc<T>(method: string, params: unknown[]): Promise<T | null> {
  if (!RPC) return null;
  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.result ?? null) as T | null;
  } catch {
    return null;
  }
}

const LAMPORTS_PER_SOL = 1_000_000_000;

export async function getSolBalance(owner: string): Promise<number | null> {
  const r = await rpc<{ value: number }>("getBalance", [owner]);
  return r?.value != null ? r.value / LAMPORTS_PER_SOL : null;
}

// Sum every token account the owner holds for `mint` (usually one).
export async function getTokenBalance(owner: string, mint: string): Promise<number | null> {
  const r = await rpc<{ value: any[] }>("getTokenAccountsByOwner", [
    owner,
    { mint },
    { encoding: "jsonParsed" },
  ]);
  if (!r) return null;
  let total = 0;
  for (const acct of r.value ?? []) {
    total += acct?.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0;
  }
  return total;
}
