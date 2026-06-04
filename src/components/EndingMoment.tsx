"use client";

import { motion } from "framer-motion";

export default function EndingMoment() {
  return (
    <section
      id="scene-ending"
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#04060d] text-ivory overflow-hidden"
    >
      {/* Subtle blue spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-royal-purple/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Starry night sky detail */}
      <div className="absolute inset-0 z-0 opacity-35 pointer-events-none select-none">
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <circle cx="150" cy="80" r="1" fill="#FFF" />
          <circle cx="450" cy="180" r="1.5" fill="#D4AF37" className="animate-ping duration-[4000ms]" />
          <circle cx="680" cy="120" r="0.75" fill="#FFF" />
          <circle cx="280" cy="220" r="1" fill="#FFF" />
          <circle cx="520" cy="90" r="1" fill="#FFF" />
          <circle cx="100" cy="350" r="1.25" fill="#D4AF37" />
          <circle cx="750" cy="300" r="1" fill="#FFF" />
        </svg>
      </div>

      {/* Castle in the distance silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] opacity-10 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full absolute bottom-0 object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="#060814"
            d="M0,320 L0,200 L80,180 L160,200 L160,240 L280,240 L340,120 L400,240 L600,240 L640,60 L700,240 L880,240 L920,150 L1000,240 L1200,240 L1200,180 L1300,150 L1440,200 L1440,320 Z"
          />
        </svg>
      </div>

      {/* Center Cinematic text */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl px-6 text-center">
        
        {/* Cinematic pause */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.65 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-lg md:text-2xl font-serif text-rose-gold italic tracking-wide mb-12"
        >
          "And perhaps...
          <br />
          this is not the end of the story."
        </motion.p>

        {/* Major Title: The End */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-serif text-antique-gold tracking-[0.15em] uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] font-bold"
        >
          The End
        </motion.h2>

        {/* Small subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="mt-6 text-xs uppercase tracking-[0.4em] text-soft-lavender font-serif"
        >
          Or maybe just the beginning.
        </motion.p>

        {/* Scroll back to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 3.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-16 px-6 py-2.5 rounded-full border border-antique-gold/30 hover:border-antique-gold bg-midnight-blue/50 text-[10px] uppercase tracking-widest text-antique-gold transition-all duration-300 cursor-pointer"
        >
          Reopen the Storybook
        </motion.button>
      </div>

      {/* Decorative details */}
      <div className="absolute top-10 text-[9px] uppercase tracking-[0.5em] text-rose-gold/20 font-serif">
        The Letter The Prince Never Sent
      </div>
    </section>
  );
}
