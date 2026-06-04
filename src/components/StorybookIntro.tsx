"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface StorybookIntroProps {
  onEnter: () => void;
}

export default function StorybookIntro({ onEnter }: StorybookIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Allow the 3D flip animation to finish before fading out and starting the journey
    setTimeout(() => {
      onEnter();
    }, 1800);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#060814]">
      {/* Background Castle Silhouette and Moonlight Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#090b1e] via-[#060814] to-[#04050d]" />
      
      {/* Moonlight Glow Spot */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-soft-lavender/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ivory/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Stylized Vector Castle Silhouette in Background */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] opacity-15 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full absolute bottom-0 object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="#0B1026"
            d="M0,288L60,266.7C120,245,240,203,360,192C480,181,600,203,720,224C840,245,960,267,1080,245.3C1200,224,1320,160,1380,128L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          {/* Spire silhouettes */}
          <path
            fill="#0A0B18"
            d="M200,320 L220,180 L230,180 L250,320 M230,320 L235,120 L245,120 L250,320 M650,320 L670,140 L690,320 M680,320 L685,80 L695,80 L700,320 M1100,320 L1120,160 L1140,320"
          />
        </svg>
      </div>

      {/* Floating Sparkles in Intro */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-antique-gold rounded-full opacity-30 animate-ping" />
        <div className="absolute top-[15%] left-[70%] w-1 h-1 bg-ivory rounded-full opacity-40 animate-pulse duration-1000" />
        <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-rose-gold rounded-full opacity-20 animate-pulse duration-3000" />
        <div className="absolute top-[50%] left-[15%] w-1.5 h-1.5 bg-soft-lavender rounded-full opacity-35 animate-ping duration-2000" />
      </div>

      {/* Intro Main Panel */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-6 text-center">
        {/* Animated Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.35em] text-antique-gold font-serif mb-6"
        >
          A Royal Interactive Fairytale
        </motion.span>

        {/* 3D Book Container */}
        <div className="perspective-1500 w-[280px] sm:w-[350px] h-[380px] sm:h-[450px] relative mb-10 select-none">
          <motion.div
            animate={{
              rotateY: isOpening ? -145 : 0,
              z: isOpening ? 50 : 0,
            }}
            transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: "left center" }}
            className={`w-full h-full rounded-r-2xl preserve-3d shadow-[10px_20px_45px_rgba(0,0,0,0.6)] border-y border-r border-[#695420]/30 absolute inset-0 z-20 ${
              isOpening ? "pointer-events-none" : "cursor-pointer"
            }`}
            onClick={handleOpen}
          >
            {/* FRONT COVER (Outer Face) */}
            <div className="absolute inset-0 rounded-r-xl bg-gradient-to-r from-[#1b1424] via-[#2d1c3a] to-[#1b1424] border-l-8 border-antique-gold/70 backface-hidden p-6 flex flex-col justify-between items-center text-center">
              {/* Gold Filigree Borders */}
              <div className="absolute inset-3 border border-antique-gold/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-antique-gold/15 rounded-lg pointer-events-none" />

              {/* Top crest */}
              <div className="mt-4 text-antique-gold/70 text-xl font-serif">❦</div>

              {/* Book Title */}
              <div className="flex flex-col gap-3 px-2">
                <h1 className="text-xl sm:text-2xl font-serif text-antique-gold font-bold tracking-wider leading-snug uppercase">
                  The Letter
                </h1>
                <span className="text-[10px] sm:text-xs text-rose-gold/60 font-serif italic">
                  the prince
                </span>
                <h2 className="text-lg sm:text-xl font-serif text-antique-gold font-bold tracking-widest leading-snug uppercase">
                  Never Sent
                </h2>
              </div>

              {/* Bottom graphic */}
              <div className="mb-4 text-antique-gold/70 text-lg font-serif">❦</div>
            </div>

            {/* FRONT COVER INSIDE (Inner Face - revealed on open) */}
            <div className="absolute inset-0 rounded-r-xl bg-[#ebdcc0] border-l border-amber-900/10 backface-hidden rotate-y-180 p-6 flex flex-col justify-center items-center text-center shadow-inner">
              <div className="absolute inset-3 border border-amber-900/10 rounded-lg" />
              <p className="font-handwritten text-xl text-amber-950 leading-relaxed max-w-[85%]">
                "Once upon a time, in a kingdom empty of stars..."
              </p>
            </div>
          </motion.div>

          {/* FIRST PAGE OF THE BOOK (Static underneath cover) */}
          <div className="absolute inset-0 w-full h-full rounded-r-xl bg-[#faf4e6] border-y border-r border-[#695420]/10 p-6 flex flex-col justify-between items-center text-center shadow-[inset_15px_0_30px_rgba(0,0,0,0.08)] z-10">
            <div className="absolute inset-3 border border-amber-900/5 rounded-lg" />
            <div className="mt-8 text-amber-800/40 text-xs font-serif">Chapter I</div>
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-amber-950 text-base uppercase font-bold tracking-widest">
                The Journey Begins
              </h3>
              <p className="font-serif text-[10px] text-amber-900/70 leading-relaxed px-4">
                Step inside the memories that were locked away in parchment and sealed with wax.
              </p>
            </div>
            <div className="mb-6 w-8 h-[1px] bg-amber-900/20" />
          </div>
        </div>

        {/* Action Button */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={handleOpen}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-antique-gold bg-antique-gold/10 hover:bg-antique-gold text-antique-gold hover:text-midnight-blue text-sm font-serif font-bold uppercase tracking-widest shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Glow pulse layer */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookOpen size={16} />
                <span>Open The Story</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          animate={{ opacity: isOpening ? 0 : 0.4 }}
          className="mt-6 text-[10px] text-ivory tracking-[0.2em] uppercase font-serif"
        >
          Or click the book to break the seal
        </motion.p>
      </div>
    </div>
  );
}
