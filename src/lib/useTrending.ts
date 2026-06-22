"use client";

import { useEffect, useState } from "react";
import type { TrendingToken } from "./types";

let cache: TrendingToken[] | null = null;

export function useTrending(pollMs = 30000) {
  const [tokens, setTokens] = useState<TrendingToken[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/tokens/trending");
        const data = await res.json();
        if (alive && data.tokens?.length) {
          cache = data.tokens;
          setTokens(data.tokens);
        }
      } catch {
        /* keep stale */
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, pollMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [pollMs]);

  return { tokens, loading };
}
