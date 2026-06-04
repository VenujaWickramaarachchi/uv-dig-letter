"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  date: string;
  sizeClass: string;
  parallaxSpeed: number; // multiplier for translation
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    title: "Where time stood still",
    date: "Autumn Solstice",
    sizeClass: "col-span-12 md:col-span-7 h-[450px] md:h-[600px]",
    parallaxSpeed: -30,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    title: "Golden Hour Whispers",
    date: "November Nights",
    sizeClass: "col-span-12 md:col-span-5 h-[300px] md:h-[450px] md:mt-24",
    parallaxSpeed: 20,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507504038482-7621ea701e69?q=80&w=800&auto=format&fit=crop",
    title: "Underneath the fairy lights",
    date: "Midnight Walk",
    sizeClass: "col-span-12 md:col-span-5 h-[350px] md:h-[500px]",
    parallaxSpeed: -15,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1200&auto=format&fit=crop",
    title: "Anchor of my soul",
    date: "Coastline Escape",
    sizeClass: "col-span-12 md:col-span-7 h-[400px] md:h-[550px] md:-mt-12",
    parallaxSpeed: 35,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=800&auto=format&fit=crop",
    title: "Petals of memories",
    date: "Spring Morning",
    sizeClass: "col-span-12 md:col-span-4 h-[300px] md:h-[400px]",
    parallaxSpeed: -25,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&auto=format&fit=crop",
    title: "Endless Horizons",
    date: "Summer Wave",
    sizeClass: "col-span-12 md:col-span-8 h-[350px] md:h-[500px] md:-mt-8",
    parallaxSpeed: 10,
  },
];

function GalleryCard({ item }: { item: GalleryItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate subtle translation offset for the image itself inside its cropped container
  const yParallax = useTransform(scrollYProgress, [0, 1], [item.parallaxSpeed * -0.5, item.parallaxSpeed * 0.5]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-stone-900/60 bg-stone-900/10 group ${item.sizeClass}`}
    >
      {/* Outer motion wrapper for entry fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative overflow-hidden"
      >
        {/* Parallax Image Content */}
        <motion.div 
          style={{ y: yParallax, scale: 1.15 }}
          className="absolute inset-0 w-full h-full select-none"
        >
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:brightness-95 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay vignette grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 opacity-70 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

        {/* Caption Panel */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end z-10">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-rose-300/80 mb-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
            {item.date}
          </span>
          <h3 className="font-serif text-lg md:text-2xl text-stone-100 tracking-wide translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {item.title}
          </h3>
          <div className="w-8 h-[1px] bg-rose-gold mt-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        </div>

        {/* Thin outline border overlay */}
        <div className="absolute inset-0 border border-stone-100/5 group-hover:border-stone-100/10 rounded-2xl pointer-events-none transition-colors duration-500" />
      </motion.div>
    </div>
  );
}

export default function MediaGallery() {
  return (
    <section className="py-28 px-4 md:px-12 lg:px-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Gallery Header */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-900 pb-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-rose-300 font-medium"
            >
              Exquisite Curation
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif text-stone-100 mt-2 tracking-wide"
            >
              Captured Whispers
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-stone-400 max-w-sm font-light leading-relaxed md:text-right"
          >
            A selective collection of silent, high-contrast, emotional vignettes. Moments that define us, caught forever.
          </motion.p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
