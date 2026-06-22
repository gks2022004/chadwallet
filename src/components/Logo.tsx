import Link from "next/link";

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/chad-logo.svg" alt="ChadWallet" width={size} height={size} className="rounded-xl" />
      <span className="text-[1.15rem] font-bold tracking-tight">
        Chad<span className="text-lime">Wallet</span>
      </span>
    </Link>
  );
}
