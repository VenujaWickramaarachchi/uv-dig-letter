"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";

const compliments = [
  "Your smile lights up the entire kingdom.",
  "Every single day with you is my favorite memory.",
  "You make the ordinary moments feel like a fairytale.",
  "No storm is too dark when you are by my side.",
  "You are the melody that broke the silent kingdom.",
  "You are the princess of my heart, now and forever.",
  "Your laughter is my absolute favorite song.",
  "Even the stars in the night sky are jealous of your eyes.",
  "I would walk through a thousand storms just to see you smile.",
  "Thank you for writing your chapters next to mine.",
  "You are the most precious treasure in this magical garden.",
  "A single conversation with you changes my whole day.",
  "You make my universe warm, gold, and full of light.",
  "My heart was an empty fortress, until you opened the gates.",
  "I cherish every glance, every word, and every heartbeat we share.",
  "Your kindness is the magic that holds us together.",
  "The prince never sent the letter, but his heart was always yours.",
  "You make everything feel cozy, warm, and full of hope.",
  "Of all the adventures in the world, loving you is my greatest.",
  "You are my anchor in the storm and my light in the darkness."
];

export default function SurpriseChest() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState("");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleOpenChest = () => {
    if (!isOpen) {
      // Pick a random compliment
      const randomIndex = Math.floor(Math.random() * compliments.length);
      setCurrentCompliment(compliments[randomIndex]);
      setIsOpen(true);

      // Generate burst particles
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 160 - 50,
      }));
      setParticles(newParticles);
    } else {
      setIsOpen(false);
      setParticles([]);
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0a1026] via-[#221021] to-[#120f2b] overflow-hidden text-ivory text-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-antique-gold font-serif block mb-4">
          A Gift of Words
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-antique-gold tracking-wide uppercase mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
          The Surprise Chest
        </h2>
        <p className="text-xs md:text-sm text-rose-gold/80 max-w-md mx-auto leading-relaxed mb-16 italic font-light">
          Unlock the golden chest to receive a little token of affection, a sweet compliment, or a romantic reminder.
        </p>

        {/* Chest Wrapper */}
        <div className="relative flex flex-col items-center justify-center min-h-[300px] mb-8">
          
          {/* Explosion Particles */}
          <AnimatePresence>
            {isOpen &&
              particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 50, scale: 0, opacity: 1 }}
                  animate={{ x: p.x, y: p.y, scale: [1, 1.5, 0.5], opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute text-antique-gold pointer-events-none"
                >
                  <Sparkles size={16} className="fill-current" />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Interactive Chest Container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenChest}
            className="w-48 h-48 cursor-pointer relative"
          >
            {/* Base Chest Glow */}
            <div className="absolute inset-4 rounded-full bg-antique-gold/10 blur-xl animate-pulse pointer-events-none" />

            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              {/* Chest Body (Bottom half) */}
              <path d="M15,55 L85,55 C90,55 90,85 85,85 L15,85 C10,85 10,55 15,55 Z" fill="#4a2c11" stroke="#301d0a" strokeWidth="2" />
              {/* Gold borders on bottom */}
              <path d="M15,55 L25,55 L25,85 L15,85 Z" fill="#D4AF37" />
              <path d="M75,55 L85,55 L85,85 L75,85 Z" fill="#D4AF37" />
              <rect x="42" y="55" width="16" height="30" fill="#D4AF37" />
              <circle cx="50" cy="65" r="4" fill="#301d0a" />

              {/* Chest Lid (Top half) */}
              <motion.g
                animate={isOpen ? { rotate: -35, y: -25 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                style={{ transformOrigin: "15px 55px" }}
              >
                {/* Wood arched lid */}
                <path d="M15,55 C15,25 85,25 85,55 Z" fill="#603913" stroke="#301d0a" strokeWidth="2" />
                {/* Gold bands on lid */}
                <path d="M15,55 C15,25 25,25 25,55" fill="none" stroke="#D4AF37" strokeWidth="5" />
                <path d="M75,55 C75,25 85,25 85,55" fill="none" stroke="#D4AF37" strokeWidth="5" />
                <path d="M45,55 C45,25 55,25 55,55" fill="none" stroke="#D4AF37" strokeWidth="5" />
                
                {/* Handles and rivets */}
                <circle cx="50" cy="35" r="3" fill="#D4AF37" />
                {/* Metal Lock plate top hook */}
                <path d="M45,52 L55,52 L52,58 L48,58 Z" fill="#D4AF37" stroke="#301d0a" strokeWidth="1" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Compliment Reveal Modal/Box */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mt-8 max-w-md bg-royal-purple/20 border border-antique-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative"
              >
                <div className="absolute inset-1.5 rounded-[12px] border border-antique-gold/10 pointer-events-none" />
                <Sparkles size={16} className="text-antique-gold mx-auto mb-3 animate-spin duration-3000" />
                
                <p className="font-serif text-lg md:text-xl text-ivory/90 leading-relaxed italic font-light">
                  "{currentCompliment}"
                </p>

                <button
                  onClick={handleOpenChest}
                  className="mt-6 px-4 py-2 rounded-full border border-antique-gold/20 hover:border-antique-gold bg-[#0B1026]/40 hover:bg-antique-gold text-antique-gold hover:text-[#0B1026] text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  Close Chest
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt to open */}
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              onClick={handleOpenChest}
              className="flex items-center gap-2 text-antique-gold text-xs uppercase tracking-widest animate-pulse font-serif cursor-pointer mt-6 border border-antique-gold/20 rounded-full px-4 py-2 hover:bg-antique-gold/10 hover:opacity-100 transition-colors"
            >
              <Gift size={12} />
              Open Surprise
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
