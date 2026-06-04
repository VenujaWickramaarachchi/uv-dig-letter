"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Sun, Smile, Heart, Star, Compass, Gift } from "lucide-react";

interface SmileMemory {
  id: number;
  title: string;
  sub: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  color: string;
}

const smileMemories: SmileMemory[] = [
  {
    id: 1,
    title: "The Sunny Picnic",
    sub: "Sandwiches and silly stories",
    icon: <Sun className="w-6 h-6 text-antique-gold" />,
    description: "Remember that warm afternoon we sat under the old oak tree? We completely forgot the utensils and the napkins, but we ended up laughing so hard we forgot to eat. It was the simplest, happiest day.",
    image: "/images/memory-1.jpg",
    color: "from-amber-500/10 to-purple-900/10",
  },
  {
    id: 2,
    title: "Our Late Night Drive",
    sub: "Singing out of tune",
    icon: <Smile className="w-6 h-6 text-rose-gold" />,
    description: "Cruising down the silent highway with no destination in mind. The radio was playing that terrible pop song, and we both sang along at the top of our lungs—completely out of key, and completely happy.",
    image: "/images/memory-2.jpg",
    color: "from-pink-500/10 to-purple-900/10",
  },
  {
    id: 3,
    title: "The Unexpected Rain",
    sub: "Drenched but glowing",
    icon: <Heart className="w-6 h-6 text-rose-300" />,
    description: "We got caught in a sudden downpour without an umbrella. Standing under that tiny shelter, completely soaked from head to toe, sharing a warm look that made the chilly rain feel like the warmest spring day.",
    image: "/images/memory-3.jpg",
    color: "from-[#3e2465]/20 to-stone-900/10",
  },
  {
    id: 4,
    title: "Coffee Shopnapkin Art",
    sub: "Doodles of our future",
    icon: <Star className="w-6 h-6 text-soft-lavender" />,
    description: "Spending a rainy Saturday drawing ridiculous stick figure doodles on napkins. We ended up drawing a blueprint for a magical castle made of pastries. I still have those napkins saved.",
    image: "/images/memory-4.jpg",
    color: "from-[#0B1026]/30 to-rose-900/10",
  },
  {
    id: 5,
    title: "Backyard Stargazing",
    sub: "Counting dreams, not stars",
    icon: <Compass className="w-6 h-6 text-antique-gold" />,
    description: "Lying on that old blanket in the grass. We were supposed to look for constellations, but we ended up just telling each other our biggest secrets and wildest dreams under the glow of the moon.",
    image: "/images/memory-5.jpg",
    color: "from-[#25102a]/30 to-purple-950/10",
  },
  {
    id: 6,
    title: "The Secret Shoreline",
    sub: "Footprints in the sunset",
    icon: <Gift className="w-6 h-6 text-rose-gold" />,
    description: "Walking along the coastline while the sun painted the sky in shades of amber and rose gold. We left a trail of footprints that the tides washed away, but the memory is permanently carved in my heart.",
    image: "/images/memory-6.jpg",
    color: "from-emerald-500/10 to-purple-900/10",
  },
];

export default function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState<SmileMemory | null>(null);

  return (
    <section className="py-24 px-4 md:px-12 bg-gradient-to-b from-[#120e24] via-[#0b0c16] to-[#0a1026] text-ivory overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-antique-gold font-serif block mb-4">
            A Gallery of Joy
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mt-2 tracking-wide uppercase drop-shadow-[0_0_12px_rgba(200,182,255,0.15)]">
            Reasons to Smile
          </h2>
          <p className="mt-4 text-xs md:text-sm text-rose-gold/70 max-w-md mx-auto leading-relaxed italic">
            A small catalog of the moments that make the dark days bright. Hover to see them, click to remember.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smileMemories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                borderColor: "rgba(212, 175, 55, 0.4)",
                boxShadow: "0 10px 25px rgba(212, 175, 55, 0.1)",
              }}
              onClick={() => setSelectedMemory(item)}
              className="relative rounded-2xl border border-antique-gold/10 bg-royal-purple/10 backdrop-blur-sm p-6 flex flex-col justify-between h-[340px] cursor-pointer group transition-all duration-300 shadow-lg overflow-hidden"
            >
              {/* Inner shiny line */}
              <div className="absolute inset-2 rounded-xl border border-antique-gold/5 pointer-events-none group-hover:border-antique-gold/15 transition-colors" />

              <div>
                {/* Header Icon */}
                <div className="w-10 h-10 rounded-full bg-midnight-blue/40 border border-antique-gold/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                <span className="text-[9px] uppercase tracking-[0.25em] text-rose-gold/70 font-serif">
                  Surprise Moment {item.id}
                </span>
                
                <h3 className="text-xl font-serif text-ivory mt-2 tracking-wide group-hover:text-antique-gold transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-rose-gold/50 italic mt-1 font-serif">
                  {item.sub}
                </p>
              </div>

              {/* Decorative Image Fallback Overlay inside card */}
              <div className={`relative h-28 w-full rounded-xl bg-gradient-to-b ${item.color} border border-antique-gold/5 overflow-hidden flex items-center justify-center`}>
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-102 transition-all duration-700 pointer-events-none"
                />
                
                {/* Fallback graphic */}
                <div className="absolute flex flex-col items-center gap-1.5 text-antique-gold/20 group-hover:text-antique-gold/45 transition-colors pointer-events-none">
                  {item.icon}
                  <span className="text-[8px] uppercase tracking-[0.2em] font-serif">Open Memory</span>
                </div>
              </div>

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="relative w-full max-w-xl bg-midnight-blue border border-antique-gold/30 rounded-3xl p-6 md:p-10 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute inset-2 rounded-2xl border border-antique-gold/5 pointer-events-none" />

              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-antique-gold/15 text-antique-gold hover:text-midnight-blue hover:bg-antique-gold transition-colors cursor-pointer z-10"
              >
                <X size={14} />
              </button>

              <div className="w-12 h-12 rounded-full bg-antique-gold/10 border border-antique-gold/20 flex items-center justify-center mx-auto mb-4 text-antique-gold">
                {selectedMemory.icon}
              </div>

              <span className="text-[10px] uppercase tracking-[0.2em] text-rose-gold/70 font-serif">
                Memory Unfolded
              </span>

              <h3 className="text-2xl md:text-3xl font-serif text-antique-gold mt-2 mb-6 tracking-wide font-bold uppercase">
                {selectedMemory.title}
              </h3>

              {/* Graphic container */}
              <div className="w-full h-44 rounded-2xl border border-[#3e2465]/40 overflow-hidden mb-6 bg-[#0B1026] relative flex items-center justify-center">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover opacity-45"
                />
                
                {/* Fallback pattern */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-rose-gold/20 pointer-events-none">
                  {selectedMemory.icon}
                  <span className="text-[9px] uppercase tracking-widest mt-2">Locked in Hearts</span>
                </div>
              </div>

              <p className="font-serif text-ivory/90 text-base leading-relaxed italic font-light max-w-md mx-auto">
                "{selectedMemory.description}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
