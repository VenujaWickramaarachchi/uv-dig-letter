"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SceneChoice() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sunset brightening: warm deep orange/red gradient overlay becomes brighter and warmer
  const sunsetBrightness = useTransform(scrollYProgress, [0.1, 0.7], [0.15, 0.5]);
  const roseScale = useTransform(scrollYProgress, [0.2, 0.6], [0, 1.1]);
  const roseRotate = useTransform(scrollYProgress, [0.2, 0.6], [-45, 0]);

  // Letter folding animation (represented by SVG envelope closing)
  // At scroll < 0.4, it's a flat open sheet. From 0.4 to 0.8, the top flap folds down and the letter folds in.
  const letterFoldProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
  const letterScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 0.75]);
  const letterY = useTransform(scrollYProgress, [0.3, 0.7], [0, 30]);

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.75, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35, 0.75, 0.95], [30, 0, 0, -30]);

  return (
    <section
      id="scene-choice"
      ref={containerRef}
      className="relative min-h-[120vh] w-full flex flex-col justify-center items-center py-24 overflow-hidden bg-gradient-to-b from-[#0a1026] via-[#221021] to-[#3a1b18] text-ivory"
    >
      {/* Golden Sunset Brightening Overlay */}
      <motion.div
        style={{
          opacity: sunsetBrightness,
        }}
        className="absolute inset-0 bg-gradient-to-t from-[#ff8c42]/30 via-[#d4af37]/20 to-transparent pointer-events-none z-0"
      />

      {/* Video Backdrop Placeholder */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/sunset-castle.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Narrative grid columns */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: The Choice Story */}
        <div className="text-center md:text-left">
          <motion.span
            style={{ opacity: textOpacity }}
            className="text-xs uppercase tracking-[0.25em] text-antique-gold font-serif block mb-4"
          >
            The Crossroads
          </motion.span>
          <motion.h2
            style={{ opacity: textOpacity, y: textY }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-antique-gold tracking-wide mb-6 uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]"
          >
            The Choice
          </motion.h2>

          <motion.p
            style={{ opacity: textOpacity, y: textY }}
            className="font-serif text-base md:text-xl leading-relaxed text-ivory/90 font-light italic"
          >
            Now, standing at the boundary of a glowing sunset, the ultimate choice remains.
            <br />
            <br />
            The letter lies before you, sealed in wax. The path forward is illuminated by the final, warmest rays of day.
            <br />
            <br />
            To leave the pages empty and remain in the quiet, or to break the seal, pick up the quill, and write a new chapter together. The kingdom is ready.
          </motion.p>
        </div>

        {/* Right Side: Animated Rose & Folding Letter */}
        <div className="flex flex-col items-center justify-center gap-12 relative">
          
          {/* 1. Blooming Rose outline */}
          <motion.div
            style={{ scale: roseScale, rotate: roseRotate }}
            className="w-36 h-36 text-rose-gold drop-shadow-[0_0_15px_rgba(229,184,168,0.4)]"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              {/* Stylized Rose bud and petals */}
              <path d="M50,15 C45,5 25,10 35,30 C45,45 50,55 50,75 C50,55 55,45 65,30 C75,10 55,5 50,15 Z" />
              {/* Overlapping petals */}
              <path d="M50,30 C30,30 40,55 50,65 C60,55 70,30 50,30 Z" opacity="0.8" />
              <path d="M50,22 C42,16 48,32 50,35 C52,32 58,16 50,22 Z" fill="#D4AF37" opacity="0.9" />
              {/* Stem and small leaf */}
              <path d="M50,75 C50,85 45,90 40,95" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <path d="M50,80 Q58,78 60,82 C55,85 52,82 50,80 Z" fill="#D4AF37" />
            </svg>
          </motion.div>

          {/* 2. Folding Letter Box */}
          <motion.div
            style={{ scale: letterScale, y: letterY }}
            className="perspective-1500 w-52 h-36 relative"
          >
            {/* The base envelope body */}
            <div className="absolute inset-0 bg-[#ebdcc0] border border-[#d6c4a1] rounded-lg shadow-lg flex flex-col justify-center items-center p-3 text-[#5c4004] z-10">
              <span className="font-handwritten text-lg font-bold">A Royal Promise</span>
              <div className="w-8 h-[1px] bg-[#5c4004]/30 mt-1" />
            </div>

            {/* Folding Flap (SVG on top) */}
            <motion.div
              style={{
                transformOrigin: "top center",
                rotateX: letterFoldProgress,
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#ebdcc0] border-t border-x border-[#d6c4a1] rounded-t-lg preserve-3d backface-hidden z-20"
            >
              <svg viewBox="0 0 100 50" className="w-full h-full text-[#deb887] fill-current">
                {/* Triangular flap fold */}
                <polygon points="0,0 50,48 100,0" fill="#dfd0b2" stroke="#d6c4a1" strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* Back of envelope (unfolded bottom/side flaps) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#dfd0b2] rounded-b-lg border-b border-x border-[#d6c4a1] z-0 shadow-inner" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
