"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SceneEmptyKingdom() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll inside this specific 150vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transformations
  const castleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.25]);
  const castleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const starsY = useTransform(scrollYProgress, [0, 1], [-20, 120]);
  const cloudsX1 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const cloudsX2 = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.3, 0.25, 0.1]);

  const lines = [
    "Once, there was a kingdom that stood silent beneath a starless sky.",
    "A fortress built of cold stone, echoing only with the sighs of a lonely prince.",
    "He watched the borders for a light that never came, holding a piece of parchment.",
    "In the quiet halls, he carried a truth he was too proud, or perhaps too afraid, to speak.",
    "The castle battlements stood tall, but they were empty... waiting for a melody to break the silence."
  ];

  return (
    <section
      id="scene-empty-kingdom"
      ref={containerRef}
      className="relative min-h-[150vh] w-full flex flex-col justify-center items-center py-32 overflow-hidden bg-gradient-to-b from-midnight-blue via-[#0d091a] to-royal-purple text-ivory"
    >
      {/* 1. Backdrop Video / Fallback GIF / CSS Gradient */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-25">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/gifs/castle.gif"
        >
          <source src="/videos/empty-kingdom.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img src="/gifs/empty-kingdom.gif" alt="Empty Kingdom" className="w-full h-full object-cover" />
        </video>
        {/* Dark blue vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d091a] via-transparent to-midnight-blue" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Parallax Castle Silhouette Layer */}
      <motion.div
        style={{ scale: castleScale, y: castleY }}
        className="absolute bottom-0 left-0 w-full h-[50vh] z-0 pointer-events-none select-none opacity-20"
      >
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-full absolute bottom-0"
          preserveAspectRatio="none"
        >
          <path
            fill="#050818"
            d="M0,400 L0,220 L120,200 L120,240 L280,240 L280,180 L340,140 L400,180 L400,240 L600,240 L640,80 L680,80 L720,240 L900,240 L940,160 L1020,160 L1060,240 L1200,240 L1200,190 L1300,170 L1380,210 L1440,190 L1440,400 Z"
          />
        </svg>
      </motion.div>

      {/* 3. Parallax Falling Stars / Clouds */}
      <motion.div
        style={{ y: starsY }}
        className="absolute top-10 left-0 w-full h-96 pointer-events-none select-none z-0 opacity-40"
      >
        {/* Shooting Stars / Stars */}
        <svg viewBox="0 0 800 400" className="w-full h-full absolute">
          <line x1="100" y1="50" x2="60" y2="90" stroke="#F9F5EC" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="500" y1="120" x2="450" y2="170" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="720" y1="80" x2="690" y2="110" stroke="#F9F5EC" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Drifting Cloud Layers */}
      <motion.div
        style={{ x: cloudsX1 }}
        className="absolute top-[25%] left-[-20%] w-[60%] h-40 bg-radial-gradient from-soft-lavender/5 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: cloudsX2 }}
        className="absolute bottom-[20%] right-[-20%] w-[50%] h-36 bg-radial-gradient from-[#3E2465]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* 4. Slow Fog Layers */}
      <motion.div
        style={{ opacity: fogOpacity }}
        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-soft-lavender/10 to-transparent blur-2xl pointer-events-none z-10"
      />

      {/* 5. Blue Moonlight Spotlight */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* 6. Narrative Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-antique-gold tracking-wide mb-16 uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        >
          The Empty Kingdom
        </motion.h2>

        {/* Story Text revealed line by line */}
        <div className="flex flex-col gap-12 font-serif text-lg md:text-2xl lg:text-3xl text-ivory/90 leading-relaxed font-light">
          {lines.map((line, idx) => {
            // Each line is revealed at a specific scroll progress window
            const startReveal = 0.1 + idx * 0.12;
            const endReveal = startReveal + 0.15;
            
            // Map scroll opacity & translate
            const lineOpacity = useTransform(scrollYProgress, [startReveal - 0.05, startReveal, endReveal, endReveal + 0.05], [0, 1, 1, 0]);
            const lineY = useTransform(scrollYProgress, [startReveal - 0.05, startReveal, endReveal, endReveal + 0.05], [20, 0, 0, -20]);

            return (
              <motion.p
                key={idx}
                style={{ opacity: lineOpacity, y: lineY }}
                className="max-w-2xl mx-auto px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-light"
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-45 animate-bounce">
        <span className="text-[9px] tracking-[0.25em] text-rose-gold uppercase font-serif">Scroll Deeper</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-rose-gold to-transparent" />
      </div>
    </section>
  );
}
