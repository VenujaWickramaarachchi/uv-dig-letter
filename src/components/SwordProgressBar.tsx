"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function SwordProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out progress updates
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setProgressVal(latest);
    });
  }, [smoothProgress]);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-none">
      {/* Scroll percentage label */}
      <span className="text-[10px] uppercase tracking-[0.2em] text-antique-gold/70 mb-3 font-serif">
        {Math.round(progressVal * 100)}%
      </span>

      {/* Sword container */}
      <div className="relative w-12 h-72">
        <svg
          viewBox="0 0 40 240"
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(211,175,55,0.2)]"
        >
          <defs>
            {/* Blade filled gold gradient */}
            <linearGradient id="bladeGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A67C1E" />
            </linearGradient>
            
            {/* Sword silhouette shadow */}
            <linearGradient id="bladeBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1A24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0B090E" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sword Hilt (Pommel, Grip, Guard) at the TOP */}
          {/* Pommel */}
          <circle cx="20" cy="15" r="4.5" fill="#D4AF37" stroke="#8A650F" strokeWidth="1" />
          <circle cx="20" cy="15" r="2" fill="#FFF9E6" />

          {/* Grip */}
          <rect x="18" cy="195" x-offset="0" y-offset="0" width="4" height="24" rx="1.5" fill="#8A650F" stroke="#5C4004" strokeWidth="0.5" transform="translate(0, 19)" />
          {/* Leather wrapping lines on grip */}
          <line x1="18" y1="23" x2="22" y2="26" stroke="#5C4004" strokeWidth="1" />
          <line x1="18" y1="29" x2="22" y2="32" stroke="#5C4004" strokeWidth="1" />
          <line x1="18" y1="35" x2="22" y2="38" stroke="#5C4004" strokeWidth="1" />

          {/* Crossguard */}
          <path
            d="M 6 42 Q 20 45 34 42 Q 20 38 6 42 Z"
            fill="#D4AF37"
            stroke="#8A650F"
            strokeWidth="1"
          />
          {/* Gem in the center of the crossguard */}
          <polygon points="20,38 23,41 20,44 17,41" fill="#E5B8A8" stroke="#D4AF37" strokeWidth="0.5" />

          {/* Blade Backing (Empty blade slots) */}
          {/* Drawing length of the blade from y=43 to y=215 (total height = 172) */}
          <path
            d="M 16 43 L 16 200 L 20 215 L 24 200 L 24 43 Z"
            fill="url(#bladeBg)"
            stroke="#3E2465"
            strokeWidth="1.5"
          />
          
          {/* Fuller line (blood groove) backing */}
          <line x1="20" y1="46" x2="20" y2="198" stroke="#1c1917" strokeWidth="1" />

          {/* Animated Gold Fill (Sword blade fills based on scroll progress) */}
          {/* We will mask or clip this using scroll percentage. We can dynamically adjust heights or use a clip path. */}
          {/* Alternatively, use a clip path with a motion.rect */}
          <clipPath id="swordClip">
            {/* The rect moves downwards or scaleY to show progress */}
            <motion.rect
              x="0"
              y="43"
              width="40"
              height="172"
              transform-origin="top"
              style={{ scaleY: smoothProgress }}
            />
          </clipPath>

          {/* Filled Blade */}
          <g clipPath="url(#swordClip)">
            <path
              d="M 16 43 L 16 200 L 20 215 L 24 200 L 24 43 Z"
              fill="url(#bladeGold)"
              stroke="#FFF9E6"
              strokeWidth="0.5"
            />
            {/* Fuller line highlight */}
            <line x1="20" y1="46" x2="20" y2="198" stroke="#FFF9E6" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* Tip sparkle when 100% full */}
          {progressVal >= 0.99 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              transform="translate(20, 215)"
            >
              <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="#FFF9E6" filter="url(#glow)" />
            </motion.g>
          )}
        </svg>

        {/* Small floating tooltip at sword hilt */}
        <div className="absolute top-2 left-10 w-24 bg-stone-900/80 backdrop-blur-sm border border-antique-gold/20 rounded px-2 py-1 text-[8px] uppercase tracking-widest text-antique-gold opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-help">
          Scroll of Honor
        </div>
      </div>
    </div>
  );
}
