"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function SceneLetter() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the letter block relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"],
  });

  const letterText =
    "To my Princess,\n\n" +
    "I write this under the soft, flickering light of a single candle, in a silence that holds only the memory of your voice. There are words that got lost in the noise of our storms—words that my pride withheld, and my throat refused to shape.\n\n" +
    "I never wanted a kingdom that did not have you in it. Every grand tower, every stone archway, and every blooming garden is but a hollow shell without your laughter to breathe life into them.\n\n" +
    "I hope this parchment finds you, and that you can feel the truth hidden between these ink strokes. I was wrong. I would dismantle every wall of this castle just to see you walk through the gates once more.\n\n" +
    "Yours, always.";

  const [visibleCount, setVisibleCount] = useState(0);
  const [isWriting, setIsWriting] = useState(false);

  // Sync scroll progress with character length reveal
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.max(0, Math.min(1, latest));
    const nextCount = Math.floor(progress * letterText.length);
    
    if (nextCount > visibleCount) {
      setVisibleCount(nextCount);
      setIsWriting(true);
      
      // Stop writing wiggle after a short timeout of inactive scrolling
      const timer = setTimeout(() => setIsWriting(false), 150);
      return () => clearTimeout(timer);
    }
  });

  const revealedText = letterText.slice(0, visibleCount);

  return (
    <section
      id="scene-letter"
      ref={containerRef}
      className="relative min-h-[140vh] w-full flex flex-col justify-center items-center py-32 px-4 bg-gradient-to-b from-[#120f1c] via-[#0d0914] to-[#120e24] overflow-hidden"
    >
      {/* Candlelight Glow Overlay */}
      <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none animate-candle z-0" />

      {/* Narrative Section Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-antique-gold font-serif"
        >
          Unspoken Truths
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-serif text-ivory mt-3 tracking-wide uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
          The Letter
        </h2>
      </div>

      {/* Antique Parchment Letter Container */}
      <div className="relative w-full max-w-2xl mx-auto p-10 md:p-20 rounded-3xl bg-[#f4ebd0] text-stone-900 shadow-[0_25px_60px_rgba(0,0,0,0.5),_inset_0_0_40px_rgba(139,94,26,0.15)] border-2 border-[#d6c4a1] overflow-hidden z-10">
        
        {/* Subtle Paper Texture Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        {/* Fine gold/brown outline boundary decoration inside letter */}
        <div className="absolute inset-6 rounded-[22px] border border-[#d6c4a1]/50 pointer-events-none" />

        {/* Written Ink text block */}
        <div className="relative z-10 font-handwritten text-2xl md:text-3xl leading-relaxed text-stone-850 whitespace-pre-line tracking-wide font-normal">
          {revealedText}
          
          {/* Custom Writing Cursor (Quill Pen SVG) */}
          <span className="inline-block relative w-0 h-0 vertical-align-middle">
            <motion.span
              animate={
                isWriting
                  ? {
                      rotate: [12, -8, 12],
                      y: [-1, 2, -1],
                      x: [0, 2, 0],
                    }
                  : { rotate: 12, y: 0 }
              }
              transition={{
                repeat: Infinity,
                duration: 0.25,
                ease: "linear",
              }}
              className="absolute -top-12 -left-2 w-12 h-12 origin-bottom-left text-[#5c4004] filter drop-shadow-[2px_4px_3px_rgba(0,0,0,0.15)] pointer-events-none select-none z-30"
            >
              {/* Quill SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                {/* Feathers */}
                <path d="M70,10 C50,15 40,30 35,50 C38,47 43,45 45,45 C35,60 30,70 25,85 L20,90 L22,85 C28,75 32,60 30,55 C33,58 35,60 37,60 C40,40 55,20 70,10 Z" />
                {/* Quill Shaft */}
                <path d="M22,85 L18,92 L20,92 L24,86 Z" />
                {/* Feather slits */}
                <line x1="45" y1="40" x2="35" y2="45" stroke="#f4ebd0" strokeWidth="1" />
                <line x1="55" y1="30" x2="43" y2="38" stroke="#f4ebd0" strokeWidth="1" />
                <line x1="62" y1="20" x2="52" y2="28" stroke="#f4ebd0" strokeWidth="1" />
              </svg>
            </motion.span>
          </span>
        </div>

        {/* Wax Seal at the Bottom Right (Revealed when progress reaches 90%+) */}
        {visibleCount >= letterText.length - 20 && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 0.9, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 pointer-events-none select-none z-10"
          >
            {/* Wax Seal SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-red-700 fill-current filter drop-shadow-[2px_5px_8px_rgba(0,0,0,0.3)]">
              {/* Outer seal puddle */}
              <path d="M50,10 Q65,12 75,25 Q90,40 85,55 Q88,75 75,85 Q60,95 45,85 Q20,90 15,70 Q10,50 20,30 Q35,10 50,10 Z" opacity="0.9" />
              {/* Inner stamp circle */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="#900" strokeWidth="2" strokeDasharray="3 2" />
              {/* Stamp Crest crown monogram */}
              <path d="M40,60 L60,60 L65,45 L50,53 L35,45 Z M42,40 Q40,40 40,42 Q40,44 42,44 Q44,44 44,42 Q44,40 42,40 Z M50,45 Q48,45 48,47 Q48,49 50,49 Q52,49 52,47 Q52,45 50,45 Z M58,40 Q56,40 56,42 Q56,44 58,44 Q60,44 60,42 Q60,40 58,40 Z" fill="#900" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Floating Dust Particles locally for the letter candlelight atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[35%] left-[25%] w-0.5 h-0.5 bg-antique-gold/20 rounded-full animate-ping duration-3000" />
        <div className="absolute top-[45%] left-[65%] w-1 h-1 bg-antique-gold/15 rounded-full animate-pulse duration-[5000ms]" />
        <div className="absolute top-[60%] left-[35%] w-0.5 h-0.5 bg-antique-gold/25 rounded-full animate-pulse duration-[4000ms]" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-45">
        <span className="text-[10px] tracking-[0.2em] text-antique-gold uppercase font-serif">Scroll down to write</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-antique-gold to-transparent animate-bounce" />
      </div>
    </section>
  );
}
