"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

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
          logo: "/chad-logo.svg",
          walletChainType: "solana-only",
        },
        loginMethods: ["google", "apple", "email"],
        embeddedWallets: {
          // Auto-provision a Solana embedded wallet for social sign-ins.
          solana: { createOnLogin: "users-without-wallets" },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
