import Link from "next/link";
import Logo from "./Logo";
import SignInButton from "./SignInButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border-soft">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-7 text-sm text-muted">
          <Link href="/trade" className="hover:text-text transition-colors">Trade</Link>
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#download" className="hover:text-text transition-colors">Download</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/trade" className="btn-ghost rounded-xl px-4 py-2 text-sm hidden sm:block">
            Start trading
          </Link>
          <SignInButton />
        </div>
      </nav>
    </header>
  );
}
