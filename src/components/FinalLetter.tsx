"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FinalLetter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 0.95], [30, 0, 0, -25]);

  return (
    <section
      id="scene-final-letter"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-28 px-4 bg-gradient-to-b from-[#3a1b18] via-[#1b1424] to-[#04060d] overflow-hidden"
    >
      {/* Candle Light Glow overlay */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-antique-gold/10 blur-[140px] rounded-full pointer-events-none animate-candle z-0" />
      <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] bg-rose-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Parchment scroll */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative w-full max-w-2xl mx-auto p-12 md:p-24 bg-[#faf4e6] text-stone-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6),_inset_0_0_30px_rgba(100,70,30,0.1)] border border-[#dcd3b8] z-10 overflow-hidden"
      >
        {/* Subtle paper grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Inner gold border */}
        <div className="absolute inset-6 rounded-[22px] border border-antique-gold/30 pointer-events-none" />
        
        {/* Fine dashed outline */}
        <div className="absolute inset-8 rounded-[20px] border border-dashed border-antique-gold/10 pointer-events-none" />

        {/* Letter content */}
        <div className="relative z-10 text-center font-serif flex flex-col items-center">
          
          {/* Header Title */}
          <h2 className="text-3xl md:text-5xl font-serif text-antique-gold tracking-wide uppercase mb-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] font-bold">
            To My Princess
          </h2>

          {/* Letter Body in handwritten Caveat */}
          <div className="font-handwritten text-2xl md:text-3.5xl leading-relaxed text-stone-800 space-y-8 max-w-lg italic font-normal text-left">
            <p>
              [FINAL LETTER OPENING]
              <br />
              If you are reading this, it means you have crossed the starless kingdom, walked through our deepest storms, and unlocked the sleeping branches of our memory garden.
            </p>
            
            <p>
              [FINAL LETTER MIDDLE SECTION]
              <br />
              There is no map for the road ahead, but I know that with you, even the wildest forest becomes a sanctuary. I never stopped loving you, not even for a single heartbeat, and I want to write the rest of our chapters on the same page.
            </p>
            
            <p>
              [FINAL LETTER CLOSING SECTION]
              <br />
              Thank you for returning. Let us blow out the candle and step together into the warm gold of tomorrow.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-16 text-right w-full max-w-md px-4 flex flex-col items-end">
            <span className="text-xs uppercase tracking-widest text-[#a67c1e] font-serif">Signed in devotion,</span>
            <span className="font-handwritten text-3xl md:text-4xl text-stone-900 mt-2 font-bold rotate-[-3deg] block">
              [YOUR NAME]
            </span>
          </div>

        </div>

        {/* Floating small flower petal stamp */}
        <div className="absolute bottom-4 left-6 text-antique-gold/20 font-serif text-xl select-none pointer-events-none">
          ❦
        </div>
      </motion.div>
    </section>
  );
}
