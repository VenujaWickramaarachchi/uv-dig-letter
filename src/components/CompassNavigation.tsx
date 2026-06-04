"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  shortName: string;
}

const chapters: Chapter[] = [
  { id: "scene-intro", name: "Storybook Intro", shortName: "Intro" },
  { id: "scene-empty-kingdom", name: "Scene I: The Empty Kingdom", shortName: "Kingdom" },
  { id: "scene-arrival", name: "Scene II: The Arrival", shortName: "Arrival" },
  { id: "scene-adventures", name: "Scene III: Our Adventures", shortName: "Adventures" },
  { id: "scene-storm", name: "Scene IV: The Storm", shortName: "Storm" },
  { id: "scene-letter", name: "Scene V: The Letter", shortName: "Letter" },
  { id: "scene-garden", name: "Scene VI: Garden of Memories", shortName: "Garden" },
  { id: "scene-choice", name: "Scene VII: The Choice", shortName: "Choice" },
  { id: "scene-final-letter", name: "To My Princess", shortName: "Final" },
];

export default function CompassNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("scene-intro");

  // Keep track of which chapter is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = chapters.findIndex((c) => c.id === activeChapter);
  // Needle points based on current chapter
  const needleRotation = activeIndex * (360 / chapters.length);

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      setIsOpen(false);
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-6 z-50 select-none">
      <div className="relative flex items-center justify-end">
        {/* Expanded Navigation Ring */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="absolute right-0 top-0 w-80 h-80 rounded-full border border-antique-gold/20 bg-midnight-blue/90 backdrop-blur-xl flex items-center justify-center shadow-2xl"
            >
              {/* Star constellation map background design */}
              <div className="absolute inset-4 rounded-full border border-dashed border-antique-gold/10" />
              <div className="absolute inset-16 rounded-full border border-antique-gold/5" />

              {/* Radial placement of chapter nodes */}
              {chapters.map((ch, idx) => {
                const total = chapters.length;
                const angle = (idx * 2 * Math.PI) / total - Math.PI / 2; // offset by 90deg to start top center
                const radius = 110; // distance from center in px
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                const isActive = ch.id === activeChapter;

                return (
                  <motion.button
                    key={ch.id}
                    onClick={() => handleNavigate(ch.id)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute flex items-center justify-center w-10 h-10 rounded-full text-[10px] font-serif border shadow-md cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-antique-gold text-midnight-blue border-antique-gold font-bold scale-110 drop-shadow-[0_0_8px_#d4af37]"
                        : "bg-midnight-blue/50 text-rose-gold/80 border-antique-gold/30 hover:border-antique-gold hover:text-ivory"
                    }`}
                    title={ch.name}
                  >
                    {ch.shortName[0]}
                    {/* Floating label on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-stone-900 text-ivory text-[9px] px-2 py-0.5 rounded whitespace-nowrap border border-antique-gold/20 pointer-events-none">
                      {ch.name}
                    </div>
                  </motion.button>
                );
              })}

              {/* Decorative Compass Center details in menu */}
              <div className="w-16 h-16 rounded-full border border-antique-gold/20 bg-royal-purple/40 flex items-center justify-center text-[10px] font-serif text-antique-gold tracking-widest uppercase">
                Story
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Compass Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-50 flex items-center justify-center w-14 h-14 rounded-full border-2 border-antique-gold bg-midnight-blue/80 backdrop-blur-md text-antique-gold shadow-2xl cursor-pointer group"
        >
          {/* Compass Dial Face */}
          <div className="absolute inset-1 rounded-full border border-antique-gold/30 flex items-center justify-center">
            {/* Compass wind directions */}
            <span className="absolute top-1 text-[8px] font-serif text-antique-gold/50">N</span>
            <span className="absolute bottom-1 text-[8px] font-serif text-antique-gold/50">S</span>
            <span className="absolute left-1 text-[8px] font-serif text-antique-gold/50">W</span>
            <span className="absolute right-1 text-[8px] font-serif text-antique-gold/50">E</span>
          </div>

          {/* Compass Needle Pointer */}
          <motion.div
            animate={{ rotate: isOpen ? 135 : needleRotation }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-1.5 h-9 bg-gradient-to-b from-rose-gold via-antique-gold to-rose-gold relative flex justify-center items-center rounded-full"
            style={{ transformOrigin: "center" }}
          >
            {/* North Red/Gold Tip */}
            <div className="absolute -top-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-antique-gold" />
            {/* Pivot Center Pin */}
            <div className="w-2.5 h-2.5 rounded-full bg-midnight-blue border border-antique-gold z-10" />
          </motion.div>

          {/* Floating Action Menu Icon Overlay */}
          <div className="absolute -bottom-1 -right-1 bg-antique-gold text-midnight-blue p-1 rounded-full border border-midnight-blue drop-shadow-md">
            {isOpen ? <X size={10} strokeWidth={3} /> : <Compass size={10} strokeWidth={3} className="animate-pulse" />}
          </div>
        </motion.button>
      </div>

      {/* Floating active chapter indicator label */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.6, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute right-16 top-4 bg-midnight-blue/40 border border-antique-gold/10 px-3 py-1.5 rounded-md text-[10px] uppercase font-serif tracking-widest text-antique-gold text-right whitespace-nowrap pointer-events-none"
          >
            {chapters.find((c) => c.id === activeChapter)?.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
