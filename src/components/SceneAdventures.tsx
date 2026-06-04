"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle, Heart, Star, Compass, Gift, HelpCircle } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  sub: string;
  icon: React.ReactNode;
  placeholderText: string;
  image: string;
  color: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "The First Conversation",
    sub: "Where two worlds collided",
    icon: <MessageCircle className="w-8 h-8 text-antique-gold" />,
    placeholderText: "[PLACEHOLDER: A transcript of letters, messages, and late-night texts that sparked a connection between two distant kingdoms. A conversation that went on for hours and felt like minutes.]",
    image: "/images/memory-1.jpg",
    color: "from-royal-purple/20 to-[#120e24]",
  },
  {
    id: 2,
    title: "The First Laugh",
    sub: "Melody that broke the silence",
    icon: <Sparkles className="w-8 h-8 text-rose-gold" />,
    placeholderText: "[PLACEHOLDER: A recollection of the first time they shared a pure, genuine laugh. In that moment, the barriers crumbled, and the prince realized how bright the world could sound.]",
    image: "/images/memory-2.jpg",
    color: "from-[#4c1c36]/20 to-[#120e24]",
  },
  {
    id: 3,
    title: "A Special Day",
    sub: "A promise carved in time",
    icon: <Heart className="w-8 h-8 text-red-400" />,
    placeholderText: "[PLACEHOLDER: Details of a sunlit afternoon when the weather was perfect and they walked side-by-side, creating memories that would be whispered about for years to come.]",
    image: "/images/memory-3.jpg",
    color: "from-antique-gold/10 to-[#120e24]",
  },
  {
    id: 4,
    title: "The Princess",
    sub: "Her grace, her laughter, her light",
    icon: <Star className="w-8 h-8 text-soft-lavender" />,
    placeholderText: "[PLACEHOLDER: A poetical dedication to the Princess herself—describing her warmth, her eyes which hold constellations, and her ability to turn any quiet corner into a sanctuary.]",
    image: "/images/memory-4.jpg",
    color: "from-[#1d2757]/20 to-[#120e24]",
  },
  {
    id: 5,
    title: "Favorite Memory",
    sub: "Locked in a golden locket",
    icon: <Gift className="w-8 h-8 text-rose-300" />,
    placeholderText: "[PLACEHOLDER: A description of a favorite quiet memory: holding hands under the rain, sharing a warm drink, or just looking at the sky in comfortable silence.]",
    image: "/images/memory-5.jpg",
    color: "from-royal-purple/10 to-[#120e24]",
  },
  {
    id: 6,
    title: "Secret Adventure",
    sub: "Only for the stars to know",
    icon: <Compass className="w-8 h-8 text-antique-gold" />,
    placeholderText: "[PLACEHOLDER: An adventure off the beaten path, away from the prying eyes of the kingdom. A secret shared only by the two of them, sealed in their hearts forever.]",
    image: "/images/memory-6.jpg",
    color: "from-[#293d25]/15 to-[#120e24]",
  },
];

export default function SceneAdventures() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section
      id="scene-adventures"
      className="relative min-h-screen w-full py-28 px-4 md:px-12 bg-gradient-to-b from-[#25102a] via-[#120e24] to-[#0c0d1c] text-ivory overflow-hidden"
    >
      {/* Background ambient lighting blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-royal-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-soft-lavender/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-antique-gold font-medium font-serif"
          >
            Chronicles of Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-stone-100 mt-3 tracking-wide"
          >
            Our Adventures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-sm md:text-base text-rose-gold/80 font-light tracking-wide italic"
          >
            Moments that became chapters.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(212, 175, 55, 0.12)",
                borderColor: "rgba(212, 175, 55, 0.5)",
              }}
              onClick={() => setSelectedMemory(memory)}
              className="relative rounded-2xl border border-antique-gold/20 bg-midnight-blue/30 backdrop-blur-md p-6 flex flex-col justify-between h-[380px] cursor-pointer overflow-hidden group transition-all duration-300 shadow-xl"
            >
              {/* Glass Inner Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Card Header */}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-midnight-blue/50 border border-antique-gold/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {memory.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-rose-gold/70 font-serif">
                  Chapter 0{memory.id}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-ivory group-hover:text-antique-gold transition-colors mt-2 tracking-wide">
                  {memory.title}
                </h3>
                <p className="text-xs text-rose-gold/50 italic mt-1 font-serif">
                  {memory.sub}
                </p>
              </div>

              {/* Card visual representation/illustration fallback (looks like parchment or royal stamp) */}
              <div className={`absolute bottom-6 left-6 right-6 h-36 rounded-xl bg-gradient-to-b ${memory.color} border border-antique-gold/10 overflow-hidden flex items-center justify-center group-hover:border-antique-gold/30 transition-colors`}>
                {/* Fallback image mockup inside card */}
                <img
                  src={memory.image}
                  alt={memory.title}
                  onError={(e) => {
                    // Hide image if 404, show decorative card stamp
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />
                
                {/* Fallback stamp/icon */}
                <div className="absolute flex flex-col items-center gap-2 text-antique-gold/30 group-hover:text-antique-gold/50 transition-colors pointer-events-none">
                  <div className="border border-dashed border-antique-gold/20 rounded-full p-3 animate-spin duration-60000">
                    {memory.icon}
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.3em] font-serif">Reveal Seal</span>
                </div>
              </div>

              {/* Fine gold border detail */}
              <div className="absolute inset-2 rounded-xl border border-antique-gold/5 pointer-events-none group-hover:border-antique-gold/15 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expandable Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-midnight-blue border-2 border-antique-gold rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-center overflow-hidden"
            >
              {/* Paper texture background overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#1c1917_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-antique-gold/20 text-antique-gold hover:text-midnight-blue hover:bg-antique-gold transition-colors cursor-pointer z-10"
              >
                <X size={16} />
              </button>

              {/* Glowing header icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-antique-gold/10 border border-antique-gold/30 flex items-center justify-center mb-6 text-antique-gold animate-pulse">
                {selectedMemory.icon}
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-rose-gold/80 font-serif">
                Chapter 0{selectedMemory.id}
              </span>
              
              <h3 className="text-3xl md:text-4xl font-serif text-antique-gold mt-3 mb-2 tracking-wide font-bold uppercase">
                {selectedMemory.title}
              </h3>
              
              <p className="text-sm text-soft-lavender italic mb-8 font-serif">
                {selectedMemory.sub}
              </p>

              {/* Image Preview inside modal */}
              <div className="w-full h-48 md:h-64 rounded-2xl border border-antique-gold/20 overflow-hidden bg-royal-purple/20 mb-8 relative flex items-center justify-center">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-transparent to-transparent opacity-60" />
                
                {/* Fallback pattern */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-rose-gold/50 pointer-events-none">
                  <div className="border-2 border-dashed border-antique-gold/20 p-4 rounded-full mb-3">
                    {selectedMemory.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-antique-gold">Royal Seal Protected</span>
                </div>
              </div>

              {/* Story Content */}
              <p className="font-serif text-base md:text-lg text-ivory/90 leading-relaxed max-w-xl mx-auto italic font-light">
                {selectedMemory.placeholderText}
              </p>

              {/* Tiny decorative border details */}
              <div className="absolute inset-4 rounded-2xl border border-antique-gold/10 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
