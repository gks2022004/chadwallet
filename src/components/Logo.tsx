import Image from "next/image";
import Link from "next/link";

export default function Logo({
  size = 38,
  variant = "dark",
  showWordmark = true,
}: {
  size?: number;
  variant?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="ChadWallet home">
      <Image
        src={variant === "dark" ? "/dark.png" : "/light.png"}
        alt=""
        width={size}
        height={size}
        className="logo-mark"
        priority
      />
      {showWordmark && (
        <span className="text-[1.08rem] font-bold tracking-[-0.035em] text-text">
          chadwallet
        </span>
      )}
    </Link>
  );
}
