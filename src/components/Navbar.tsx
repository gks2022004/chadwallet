import Logo from "./Logo";
import SignInButton from "./SignInButton";

const APPLE = "https://apps.apple.com/us/app/chadwallet/id6757367474";
const GOOGLE = "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

function NavBadge({
  href,
  top,
  bottom,
  icon,
}: {
  href: string;
  top: string;
  bottom: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hidden sm:flex items-center gap-2 rounded-lg bg-[#0d0e15] border border-[#1c1d27] px-2.5 py-1.5 hover:border-[#2c2d3a] transition-colors"
    >
      <span className="text-white">{icon}</span>
      <span className="text-left leading-none">
        <span className="block text-[8px] uppercase tracking-wide text-muted-2">{top}</span>
        <span className="block text-xs font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-[4.5rem] flex items-center justify-between">
        <Logo size={36} />
        <div className="flex items-center gap-2.5">
          <NavBadge
            href={APPLE}
            top="Download on the"
            bottom="App Store"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.36 12.78c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.79-3.32.79-.69 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.58 2.17-1.53 2.65-.39 6.57 1.09 8.72.72 1.05 1.58 2.23 2.71 2.19 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.07 2.62-2.13.83-1.22 1.17-2.4 1.19-2.46-.03-.01-2.28-.87-2.3-3.46zM14.19 6.3c.6-.73 1-1.74.89-2.75-.86.03-1.9.57-2.52 1.3-.55.64-1.04 1.67-.91 2.65.96.07 1.94-.49 2.54-1.2z" />
              </svg>
            }
          />
          <NavBadge
            href={GOOGLE}
            top="Get it on"
            bottom="Google Play"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M3.6 2.3c-.2.2-.3.5-.3.9v17.6c0 .4.1.7.3.9l.1.1L13.5 12 3.7 2.2l-.1.1z" fill="#00d3ff" />
                <path d="M16.8 15.3 13.5 12l3.3-3.3 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2z" fill="#ffce00" />
                <path d="M16.8 15.3 13.5 12 3.6 21.8c.4.4 1 .4 1.7.1l11.5-6.6z" fill="#ff3d47" />
                <path d="M16.8 8.7 5.3 2.1c-.7-.4-1.3-.3-1.7.1L13.5 12l3.3-3.3z" fill="#00f076" />
              </svg>
            }
          />
          <SignInButton className="!bg-[#15161d] !text-white !border !border-[#262732] !rounded-lg px-5 py-2 text-sm hover:!bg-[#1d1e27]" />
        </div>
      </nav>
    </header>
  );
}
