"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { useMemo, type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  // External Solana wallets (Phantom, Solflare, Backpack, …) for "connect wallet".
  const solanaConnectors = useMemo(() => toSolanaWalletConnectors(), []);

  // Privy needs a real app id. If it isn't configured yet the app still renders
  // (so the landing page works offline-of-Privy); the sign-in button surfaces
  // a friendly notice instead of crashing the tree.
  if (!appId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#c8ff4d",
          logo: "/dark.png",
          walletChainType: "solana-only",
        },
        loginMethods: ["wallet", "google", "apple", "email"],
        embeddedWallets: {
          // Auto-provision a Solana embedded wallet for social sign-ins.
          solana: { createOnLogin: "users-without-wallets" },
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
