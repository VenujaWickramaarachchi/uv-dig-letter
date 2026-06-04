"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollLetter() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We track the scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });

  const letterText = 
    "My dearest, \n\n" +
    "Every day spent with you is a new line written in our story. From the quiet mornings shared " +
    "in laughter to the twilight hours where the rest of the world fades into silence, you are my " +
    "constant inspiration. This digital sanctuary is a small window into the universe we have created " +
    "together—a space where our memories are preserved, untouched by time.\n\n" +
    "As you read this and scroll through our journey, remember that each step forward is a promise " +
    "for the future. Thank you for being my warmth in the cold, my anchor in the storm, and my greatest adventure. " +
    "I cherish every detail, every glance, and every heartbeat we share.\n\n" +
    "With all my love, always.";

  const [visibleCount, setVisibleCount] = useState(0);

  // Map the scroll progress of the container to reveal characters
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Clamp latest between 0 and 1
    const progress = Math.max(0, Math.min(1, latest));
    const nextCount = Math.floor(progress * letterText.length);
    setVisibleCount(nextCount);
  });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[120vh] flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950"
    >
      {/* Decorative floral or organic element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[400px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating elegant subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-rose-300 font-medium"
      >
        A scroll-linked letter for you
      </motion.div>

      {/* Letter Container */}
      <div className="relative w-full max-w-2xl mx-auto p-8 md:p-16 rounded-3xl border border-stone-800/60 bg-stone-900/40 backdrop-blur-md shadow-2xl">
        {/* Fine gold border outline decoration */}
        <div className="absolute inset-4 rounded-[20px] border border-rose-300/10 pointer-events-none" />
        
        {/* Letter Text with typewriter effect */}
        <div className="relative z-10 font-serif text-lg md:text-2xl leading-relaxed text-stone-200 whitespace-pre-line tracking-wide">
          {letterText.split("").map((char, index) => {
            const isRevealed = index <= visibleCount;
            return (
              <span
                key={index}
                style={{
                  color: isRevealed ? "#fbeee6" : "#2e2a24",
                  textShadow: isRevealed ? "0 0 8px rgba(251, 238, 230, 0.15)" : "none",
                  transition: "color 0.25s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.25s ease-out"
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Scroll Indicator helper for the letter */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-40">
          <span className="text-[10px] tracking-[0.2em] text-rose-300 uppercase">Scroll down to read</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-rose-300 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
