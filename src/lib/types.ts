export type TrendingToken = {
  mint: string;
  name: string;
  symbol: string;
  icon?: string;
  price?: number;
  change24h?: number;
  mcap?: number;
  liquidity?: number;
  volume24h?: number;
  holders?: number;
};

export type TokenDetail = TrendingToken & {
  decimals?: number;
  change1h?: number;
  change5m?: number;
  fdv?: number;
  supply?: number;
  buys24h?: number;
  sells24h?: number;
  traders24h?: number;
};

export type Trade = {
  side: "buy" | "sell";
  amountUsd: number;
  price: number;
  owner: string;
  time: number;
  tx: string;
};
