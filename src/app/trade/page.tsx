import { redirect } from "next/navigation";
import { getTopTraded } from "@/lib/jupiter";

// Default trading view: jump to the hottest liquid token right now.
const BONK = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";

export default async function TradeIndex() {
  let mint = BONK;
  try {
    const top = await getTopTraded(20);
    const pick = top.find((t) => (t.liquidity ?? 0) > 50000 && (t.holderCount ?? 0) > 1000);
    if (pick) mint = pick.id;
  } catch {
    /* fall back to BONK */
  }
  redirect(`/trade/${mint}`);
}
