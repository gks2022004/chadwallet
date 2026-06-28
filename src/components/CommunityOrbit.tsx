"use client";

import { motion } from "framer-motion";

// Avatars placed around the rings; the whole field slowly revolves. They're
// gradient circles so their own rotation is invisible — one rotating layer is
// enough to make them orbit the centre.
const AVATARS = [
  { t: "4%", l: "40%", s: 46, g: "linear-gradient(135deg,#8f90f5,#5457c9)", o: 1 },
  { t: "13%", l: "70%", s: 38, g: "linear-gradient(135deg,#f0a8c0,#b06a8a)", o: 0.9 },
  { t: "44%", l: "92%", s: 54, g: "linear-gradient(135deg,#56c8ed,#2b6cf4)", o: 1 },
  { t: "80%", l: "78%", s: 40, g: "linear-gradient(135deg,#f5d36b,#d98a2b)", o: 0.85 },
  { t: "92%", l: "46%", s: 48, g: "linear-gradient(135deg,#9d7bf0,#5a3fc0)", o: 1 },
  { t: "78%", l: "12%", s: 38, g: "linear-gradient(135deg,#6be0b0,#2b9c7a)", o: 0.85 },
  { t: "40%", l: "2%", s: 52, g: "linear-gradient(135deg,#c08bf0,#6a3fd0)", o: 1 },
  { t: "16%", l: "16%", s: 36, g: "linear-gradient(135deg,#7b9bf5,#4457c9)", o: 0.8 },
];

export default function CommunityOrbit() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 hidden h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 sm:block">
      <div className="orbit-ring absolute inset-0" />
      <div className="orbit-ring absolute inset-16 opacity-60" />
      <div className="orbit-ring absolute inset-32 opacity-40" />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {AVATARS.map((a, i) => (
          <motion.span
            key={i}
            className="orbit-avatar absolute"
            style={{ top: a.t, left: a.l, width: a.s, height: a.s, background: a.g, opacity: a.o }}
            // counter-rotate + a soft bob so each circle stays lively while orbiting
            animate={{ rotate: -360, scale: [1, 1.08, 1] }}
            transition={{
              rotate: { duration: 60, ease: "linear", repeat: Infinity },
              scale: { duration: 4 + i * 0.4, ease: "easeInOut", repeat: Infinity },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
