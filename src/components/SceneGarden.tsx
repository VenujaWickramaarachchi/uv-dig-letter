"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { X, Heart, Phone, Gift, Image as ImageIcon, Sparkles, EyeOff } from "lucide-react";

interface GardenNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  xPercent: number; // SVG position X
  yPercent: number; // SVG position Y
  unlockThreshold: number; // scroll progress threshold
}

const gardenNodes: GardenNode[] = [
  {
    id: "node-photo",
    name: "First Photo",
    icon: <ImageIcon className="w-5 h-5" />,
    title: "The First Photo We Shared",
    description: "[PLACEHOLDER: A description of the first photograph sent. The nervous excitement of showing a piece of one's world, locked into a snapshot that captured a smile forever.]",
    image: "/images/memory-1.jpg",
    xPercent: 32,
    yPercent: 62,
    unlockThreshold: 0.3,
  },
  {
    id: "node-call",
    name: "First Call",
    icon: <Phone className="w-5 h-5" />,
    title: "The First Phone Call",
    description: "[PLACEHOLDER: Whispered conversations in the deep dark night, listening to the static and hearing the breath, the gentle awkward silence breaking into familiar comfort.]",
    image: "/images/memory-2.jpg",
    xPercent: 68,
    yPercent: 58,
    unlockThreshold: 0.45,
  },
  {
    id: "node-gift",
    name: "First Gift",
    icon: <Gift className="w-5 h-5" />,
    title: "The First Token of Love",
    description: "[PLACEHOLDER: The delivery of a secret package, an exchange of tokens. A small trinket carrying weightier promises, sealing a connection across the miles.]",
    image: "/images/memory-3.jpg",
    xPercent: 24,
    yPercent: 44,
    unlockThreshold: 0.6,
  },
  {
    id: "node-favorite",
    name: "Favorite Moment",
    icon: <Heart className="w-5 h-5" />,
    title: "Our Absolute Favorite Moment",
    description: "[PLACEHOLDER: The highlight of the fairytale: a perfect confluence of laughter, security, and the simple understanding that they were destined to walk the same forest trail.]",
    image: "/images/memory-4.jpg",
    xPercent: 76,
    yPercent: 40,
    unlockThreshold: 0.7,
  },
  {
    id: "node-special",
    name: "Special Day",
    icon: <Sparkles className="w-5 h-5" />,
    title: "A Golden Celebration",
    description: "[PLACEHOLDER: A date written in gold in the royal archive. A day that was set apart from all others, celebrating the very core of what they built together.]",
    image: "/images/memory-5.jpg",
    xPercent: 35,
    yPercent: 28,
    unlockThreshold: 0.8,
  },
  {
    id: "node-hidden",
    name: "Hidden Memory",
    icon: <EyeOff className="w-5 h-5" />,
    title: "A Hidden Secret",
    description: "[PLACEHOLDER: A quiet secret note that the prince buried deep within the roots of the memory tree. Something meant only for the eyes of the princess when the scroll is fully unrolled.]",
    image: "/images/memory-6.jpg",
    xPercent: 62,
    yPercent: 22,
    unlockThreshold: 0.9,
  },
];

export default function SceneGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<GardenNode | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Grow calculations for tree trunk and branches
  const trunkLength = useTransform(scrollYProgress, [0.1, 0.4], [900, 0]);
  const branchLeftLength = useTransform(scrollYProgress, [0.3, 0.7], [800, 0]);
  const branchRightLength = useTransform(scrollYProgress, [0.4, 0.85], [800, 0]);
  const foliageOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 0.95]);

  return (
    <section
      id="scene-garden"
      ref={containerRef}
      className="relative min-h-[160vh] w-full flex flex-col justify-start items-center py-28 px-4 bg-gradient-to-b from-[#120e24] via-[#0b0c16] to-[#0a1026] text-ivory overflow-hidden"
    >
      {/* Garden ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-royal-purple/15 via-transparent to-transparent pointer-events-none" />

      {/* Floating flower petals local system */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[20%] left-[10%] w-2 h-2 bg-soft-lavender/20 rounded-full blur-[1px] animate-pulse duration-[3000ms]" />
        <div className="absolute bottom-[40%] right-[15%] w-1.5 h-1.5 bg-rose-gold/15 rounded-full blur-[1px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-antique-gold font-serif"
          >
            The Forest Whispers
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mt-3 tracking-wide uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]">
            Garden of Memories
          </h2>
          <p className="mt-4 text-xs md:text-sm text-rose-gold/70 max-w-md mx-auto leading-relaxed italic">
            Watch the tree grow as you scroll, unlocking the hidden branches of our memories.
          </p>
        </div>

        {/* Dynamic growing SVG Tree and Node wrapper */}
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] max-w-2xl bg-midnight-blue/20 rounded-3xl border border-antique-gold/10 p-4 shadow-inner overflow-hidden">
          
          {/* Subtle constellation grid behind tree */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* SVG Canvas for Tree */}
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(200,182,255,0.15)]"
          >
            {/* Trunk (grows first) */}
            <motion.path
              d="M 200 480 Q 200 350 200 300 Q 200 240 200 180"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="900"
              style={{ strokeDashoffset: trunkLength }}
            />
            {/* Inner trunk sap line glow */}
            <motion.path
              d="M 200 480 Q 200 350 200 300 Q 200 240 200 180"
              fill="none"
              stroke="#FFF9E6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="900"
              style={{ strokeDashoffset: trunkLength }}
              opacity="0.8"
            />

            {/* Left Primary Branch */}
            <motion.path
              d="M 200 300 C 140 280 100 240 80 200"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchLeftLength }}
            />
            {/* Left secondary branch 1 */}
            <motion.path
              d="M 130 265 C 100 280 80 280 50 300"
              fill="none"
              stroke="#C8B6FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchLeftLength }}
              opacity="0.6"
            />
            {/* Left secondary branch 2 */}
            <motion.path
              d="M 100 220 C 80 170 120 160 140 140"
              fill="none"
              stroke="#C8B6FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchLeftLength }}
              opacity="0.6"
            />

            {/* Right Primary Branch */}
            <motion.path
              d="M 200 260 C 260 250 300 200 320 160"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchRightLength }}
            />
            {/* Right secondary branch 1 */}
            <motion.path
              d="M 250 230 C 290 240 320 270 340 300"
              fill="none"
              stroke="#E5B8A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchRightLength }}
              opacity="0.6"
            />
            {/* Right secondary branch 2 */}
            <motion.path
              d="M 280 185 C 310 140 280 120 250 110"
              fill="none"
              stroke="#E5B8A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="800"
              style={{ strokeDashoffset: branchRightLength }}
              opacity="0.6"
            />

            {/* Glowing Foliage / Leaves backdrop (scales/fades as branches complete) */}
            <motion.g style={{ opacity: foliageOpacity }}>
              {/* Left canopy glowing cloud */}
              <circle cx="100" cy="180" r="35" fill="rgba(200,182,255,0.06)" filter="blur(8px)" />
              {/* Right canopy glowing cloud */}
              <circle cx="280" cy="160" r="40" fill="rgba(229,184,168,0.06)" filter="blur(8px)" />
              {/* Center peak canopy glow */}
              <circle cx="200" cy="120" r="30" fill="rgba(212,175,55,0.05)" filter="blur(8px)" />
            </motion.g>
          </svg>

          {/* Interactive nodes overlaid on SVG coordinates */}
          {gardenNodes.map((node) => {
            // Track unlock status based on global scroll position of this container
            return (
              <NodeButton
                key={node.id}
                node={node}
                scrollYProgress={scrollYProgress}
                onClick={() => setSelectedNode(node)}
              />
            );
          })}
        </div>
      </div>

      {/* Glassmorphic Memory Node Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-midnight-blue border border-antique-gold/30 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-2 rounded-2xl border border-antique-gold/5 pointer-events-none" />

              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-antique-gold/15 text-antique-gold hover:text-midnight-blue hover:bg-antique-gold transition-colors cursor-pointer z-10"
              >
                <X size={14} />
              </button>

              <div className="flex items-center gap-3 text-antique-gold font-serif mb-4">
                <div className="p-2 rounded-full bg-antique-gold/10 border border-antique-gold/20">
                  {selectedNode.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em]">Unlocked Leaf Memory</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-ivory mb-6 tracking-wide uppercase font-bold">
                {selectedNode.title}
              </h3>

              {/* Image box mockup */}
              <div className="w-full h-40 rounded-xl border border-[#3e2465]/40 overflow-hidden mb-6 bg-[#0B1026] relative flex items-center justify-center">
                <img
                  src={selectedNode.image}
                  alt={selectedNode.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover opacity-45"
                />
                
                {/* Fallback */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-rose-gold/30 pointer-events-none">
                  {selectedNode.icon}
                  <span className="text-[8px] uppercase tracking-widest mt-2">Chapter Sealed</span>
                </div>
              </div>

              <p className="font-serif text-stone-300 text-sm md:text-base leading-relaxed italic font-light max-w-md mx-auto">
                {selectedNode.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Component to handle individual node button states and visibility mapping
interface NodeButtonProps {
  node: GardenNode;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}

function NodeButton({ node, scrollYProgress, onClick }: NodeButtonProps) {
  const [unlocked, setUnlocked] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= node.unlockThreshold) {
      setUnlocked(true);
    } else {
      setUnlocked(false);
    }
  });

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          onClick={onClick}
          style={{
            left: `${node.xPercent}%`,
            top: `${node.yPercent}%`,
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-antique-gold bg-midnight-blue text-antique-gold shadow-lg cursor-pointer z-30 group hover:shadow-[0_0_15px_#d4af37]"
        >
          {/* Internal Pulse rings */}
          <span className="absolute inset-0 rounded-full border border-antique-gold/40 animate-ping opacity-60" />
          
          <div className="relative z-10 text-antique-gold group-hover:text-rose-gold transition-colors">
            {node.icon}
          </div>

          {/* Floating node label */}
          <span className="absolute top-11 bg-midnight-blue/80 border border-antique-gold/20 rounded px-1.5 py-0.5 text-[8px] uppercase tracking-widest text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {node.name}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
