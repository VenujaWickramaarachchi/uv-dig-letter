"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface LandingViewProps {
  onEnter: () => void;
}

export default function LandingView({ onEnter }: LandingViewProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-fit-cover opacity-30 select-none pointer-events-none"
        poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop"
      >
        <source
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3356a90da2e7ee082531e2c76f&profile_id=139&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950 pointer-events-none" />

      {/* Landing Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full mx-4 p-8 md:p-12 text-center rounded-2xl border border-stone-800/40 bg-stone-900/60 backdrop-blur-xl shadow-2xl"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs uppercase tracking-[0.25em] text-rose-300 font-medium"
        >
          Welcome to
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-3 text-4xl md:text-5xl font-serif text-rose-gold tracking-wide leading-tight"
        >
          Our Digital Sanctuary
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-4 text-sm md:text-base text-stone-300 leading-relaxed font-light"
        >
          A private, living archive of our moments, shared thoughts, and the love that blooms day by day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(226, 180, 189, 0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-rose-300/10 hover:bg-rose-300/15 border border-rose-300/20 text-rose-200 text-sm font-medium tracking-wider uppercase transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Button background pulse glow */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Play size={14} className="fill-current text-rose-300 group-hover:translate-x-0.5 transition-transform duration-300" />
            <span>Tap to begin our journey</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
