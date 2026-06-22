# ChadWallet

> where degens become legends — a fomo.family-style trading wallet for Solana.

A Next.js app with a marketing **landing page** and a full **trading terminal**,
powered by **real Solana market data** (no mock JSON — live prices, trending
tokens and swap quotes from Jupiter).

## What's built

### Landing page (`/`)
- ChadWallet brand, cosmic-dark theme, hero "where degens become legends"
- **Rotating token banners** top & bottom — real trending Solana tokens with
  live price + 24h change. **Tapping any token opens its trading page.**
- Sign in with **Apple / Google via Privy** (embedded Solana wallet, no seed phrase)
- iOS + Android app-store download buttons (real ChadWallet store links)
- Features grid, cross-platform section, footer

### Trading terminal (`/trade` and `/trade/[mint]`)
- **Left** — live trending tokens list (click to switch markets)
- **Middle** — token header (price, MCap, liquidity, volume, holders),
  candlestick + volume chart (lightweight-charts), and a tabbed
  **Live trades / Holders** panel
- **Right** — **Buy / Sell** panel with **real-time Jupiter swap quotes**
  (expected output, price impact, route) and a position card

## Real data sources (all free tier)

| Data | Source | Key needed? |
|------|--------|-------------|
| Trending tokens, price, MCap, liquidity, volume, holders | Jupiter Token API (lite) | keyless |
| Buy/sell quotes, price impact, route | Jupiter Swap API (lite) | keyless |
| OHLCV candles + live trade feed | Birdeye Data API | optional* |
| Wallet balances / broadcasting swaps | Alchemy RPC + Privy | optional |

\* Without a Birdeye key, the chart and trade feed fall back to a series shaped
to the **real** current price/volume so the UI always renders. Add the key for
true historical OHLCV and on-chain trades.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — add keys to unlock sign-in & OHLCV
npm run dev
```

Open http://localhost:3000. The landing page and trending data work immediately
with no keys. Add `NEXT_PUBLIC_PRIVY_APP_ID` to enable Apple/Google sign-in.

## Environment variables

See [`.env.local.example`](.env.local.example):

- `NEXT_PUBLIC_PRIVY_APP_ID` — Privy app id (Apple/Google login + Solana wallet)
- `BIRDEYE_API_KEY` — real OHLCV + trades
- `NEXT_PUBLIC_SOLANA_RPC` — Alchemy Solana RPC for balances/broadcast

## Architecture

```
src/
  app/
    page.tsx                  landing page
    trade/page.tsx            redirect -> hottest token
    trade/[mint]/page.tsx     trading terminal (server-rendered token data)
    api/tokens/trending       Jupiter top-traded proxy
    api/tokens/[mint]         token detail
    api/tokens/[mint]/chart   OHLCV (Birdeye -> synthetic fallback)
    api/tokens/[mint]/trades  trade feed (Birdeye -> synthetic fallback)
    api/quote                 real Jupiter swap quote
  components/                 navbar, banners, store buttons, trade/*
  lib/                        jupiter, birdeye, synth, format, types
```

## Brand assets

The logo is a placeholder SVG (`public/chad-logo.svg`). Drop the official
ChadWallet assets in `public/` and update `Logo.tsx` to use them.

## Deploy

Built for Vercel — push to a repo, import, set the env vars above, deploy.
Jupiter/Birdeye are called server-side via API routes so keys stay private.

## Roadmap / follow-ups

- Execute swaps end-to-end (Jupiter swap-build + Privy `sendTransaction`)
- Real holder list & PnL from Alchemy `getTokenAccounts`
- Watchlist & price alerts, leaderboard
- Wire official brand assets
