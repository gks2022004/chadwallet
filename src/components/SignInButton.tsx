"use client";

import { usePrivy } from "@privy-io/react-auth";
import { shortAddr } from "@/lib/format";

export default function SignInButton({ className = "" }: { className?: string }) {
  const configured = !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Privy hooks throw if no provider is mounted, so guard on config.
  if (!configured) {
    return (
      <a
        href="https://dashboard.privy.io"
        target="_blank"
        rel="noreferrer"
        title="Set NEXT_PUBLIC_PRIVY_APP_ID in .env.local to enable sign-in"
        className={`btn-lime rounded-xl px-4 py-2 text-sm ${className}`}
      >
        Get started
      </a>
    );
  }
  return <PrivyButton className={className} />;
}

function PrivyButton({ className }: { className?: string }) {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return (
      <button disabled className={`btn-ghost rounded-xl px-4 py-2 text-sm opacity-60 ${className}`}>
        …
      </button>
    );
  }

  if (authenticated) {
    const wallet = user?.wallet?.address;
    const label = wallet
      ? shortAddr(wallet)
      : user?.google?.email || user?.email?.address || user?.apple?.email || "Account";
    return (
      <button
        onClick={logout}
        className={`btn-ghost rounded-xl px-4 py-2 text-sm font-mono ${className}`}
        title="Click to sign out"
      >
        {label}
      </button>
    );
  }

  return (
    <button onClick={login} className={`btn-lime rounded-xl px-4 py-2 text-sm ${className}`}>
      Sign in
    </button>
  );
}
