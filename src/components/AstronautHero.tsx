"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// The astronaut is baked into the full space photo, so we gently bob + sway the
// whole scene (slightly zoomed so the transform never reveals edges). Reads as
// the astronaut drifting/jiggling in zero-g.
export default function AstronautHero() {
  return (
    <div className="fomo-hero-bg">
      <motion.div
        className="h-full w-full"
        style={{ scale: 1.08 }}
        animate={{ y: [0, -14, 0, 9, 0], rotate: [0, -1.4, 0, 1.1, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/astronaut.png"
          alt="Astronaut drifting above Earth"
          width={3840}
          height={2560}
          priority
        />
      </motion.div>
    </div>
  );
}
