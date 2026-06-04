"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Components
import SmoothScroll from "@/components/SmoothScroll";
import FunnyVideoGallery from "@/components/FunnyVideoGallery";
import MemoryGallery from "@/components/MemoryGallery";
import SurpriseChest from "@/components/SurpriseChest";
import StickyNoteBoard from "@/components/StickyNoteBoard";

interface Butterfly {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  angle: number;
  flapSpeed: number;
  color: string;
}

const smileAudioMap: Record<string, string> = {
  "scene-smile-hero": "/audio/garden.mp3",
  "scene-smile-videos": "/audio/adventures.mp3",
  "scene-smile-memories": "/audio/arrival.mp3",
  "scene-smile-chest": "/audio/choice.mp3",
  "scene-smile-board": "/audio/background-music.mp3",
};

export default function SmilePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("scene-smile-hero");
  const activeSectionRef = useRef("scene-smile-hero");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Butterfly Canvas particle loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const butterflies: Butterfly[] = [];
    const colors = [
      "rgba(255, 200, 221, 0.7)",  // Soft petal pink
      "rgba(200, 182, 255, 0.7)",  // Lavender
      "rgba(212, 175, 55, 0.65)",  // Gold
    ];

    // Spawn 10 butterflies
    for (let i = 0; i < 10; i++) {
      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 0.8 - 0.3, // trend upwards
        angle: Math.random() * Math.PI * 2,
        flapSpeed: Math.random() * 0.15 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      butterflies.forEach((b) => {
        // Update position
        b.angle += b.flapSpeed;
        b.x += b.vx + Math.sin(b.angle * 0.5) * 0.4;
        b.y += b.vy;

        // Reset if offscreen
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = b.color;
        
        // Simulating wing flap scale factor
        const wingScale = Math.sin(b.angle);

        // Draw left wing
        ctx.beginPath();
        ctx.ellipse(-b.size * 0.8, -b.size * 0.2, b.size * 0.8 * Math.abs(wingScale), b.size * 1.2, -Math.PI/6, 0, Math.PI * 2);
        ctx.fill();

        // Draw right wing
        ctx.beginPath();
        ctx.ellipse(b.size * 0.8, -b.size * 0.2, b.size * 0.8 * Math.abs(wingScale), b.size * 1.2, Math.PI/6, 0, Math.PI * 2);
        ctx.fill();

        // Draw tiny body
        ctx.fillStyle = "rgba(249, 245, 236, 0.8)";
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 0.2, b.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Play soundtrack on user load
  useEffect(() => {
    // Autoplay audio on load (will fade in)
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeInAudio();
        })
        .catch(() => {
          console.warn("Autoplay blocked by browser. User needs to toggle audio manually.");
        });
    }
  }, []);

  // 3. Scroll tracking logic to detect active section and change music
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const chapters = [
        "scene-smile-hero",
        "scene-smile-videos",
        "scene-smile-memories",
        "scene-smile-chest",
        "scene-smile-board",
      ];

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i]);
        if (el && scrollPosition >= el.offsetTop) {
          if (activeSectionRef.current !== chapters[i]) {
            activeSectionRef.current = chapters[i];
            setActiveSection(chapters[i]);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    let currentVol = 0;
    const targetVol = 0.45;
    const interval = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(interval);
        return;
      }
      currentVol += 0.05;
      if (currentVol >= targetVol) {
        audioRef.current.volume = targetVol;
        clearInterval(interval);
      } else {
        audioRef.current.volume = currentVol;
      }
    }, 50);
  };

  // 4. Crossfade audio when activeSection changes
  useEffect(() => {
    if (!isPlaying || !audioRef.current) return;

    const targetSrc = smileAudioMap[activeSection] || "/audio/garden.mp3";
    const currentSrc = audioRef.current.src;

    // Avoid switching if already playing correct track
    if (currentSrc.endsWith(targetSrc)) {
      return;
    }

    let currentVolume = audioRef.current.volume;
    const fadeOutInterval = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeOutInterval);
        return;
      }

      currentVolume -= 0.05;
      if (currentVolume <= 0) {
        audioRef.current.volume = 0;
        clearInterval(fadeOutInterval);

        // Load new track and play
        audioRef.current.src = targetSrc;
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => fadeInAudio())
          .catch((err) => {
            console.error("Local audio playback failed:", err);
          });
      } else {
        audioRef.current.volume = Math.max(0, currentVolume);
      }
    }, 50);

    return () => clearInterval(fadeOutInterval);
  }, [activeSection, isPlaying]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const targetSrc = smileAudioMap[activeSection] || "/audio/garden.mp3";
        if (!audioRef.current.src.endsWith(targetSrc)) {
          audioRef.current.src = targetSrc;
          audioRef.current.load();
        }
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeInAudio();
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#04060d] text-ivory overflow-x-hidden select-none">
      
      {/* Background Audio tag */}
      <audio
        ref={audioRef}
        src="/audio/garden.mp3"
        loop
        preload="auto"
      />

      {/* Floating Audio Controller */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full border border-antique-gold bg-[#0B1026]/70 backdrop-blur-md text-antique-gold hover:text-rose-gold shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>

      <SmoothScroll>
        
        {/* Page Hero Section */}
        <section id="scene-smile-hero" className="relative h-screen w-full flex flex-col justify-center items-center py-20 px-4 text-center overflow-hidden">
          
          {/* Background Video Backdrop / Fallback Gradient */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-25">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/happy-garden.jpg"
            >
              <source src="/videos/happy-garden.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04060d]/60 to-[#04060d]" />
          </div>

          {/* Golden Morning Sunlight Glow Overlay */}
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

          {/* Local Butterflies Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" />

          {/* Narrative Content */}
          <div className="relative z-20 max-w-3xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{ duration: 1 }}
              className="text-xs uppercase tracking-[0.35em] text-antique-gold font-serif block mb-6"
            >
              Chapter IX: The Princess's Smile
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-serif text-antique-gold tracking-wide leading-tight uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold"
            >
              A Place Made To <br /> Make You Smile
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-6 text-sm md:text-lg text-rose-gold tracking-widest max-w-lg mx-auto font-light leading-relaxed italic"
            >
              "This chapter is reserved for laughter, happiness, and little moments worth keeping."
            </motion.p>
          </div>

          {/* Floating light stars/fireflies */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-antique-gold rounded-full opacity-30 animate-pulse" />
            <div className="absolute top-[45%] left-[75%] w-1 h-1 bg-ivory rounded-full opacity-40 animate-ping duration-2000" />
            <div className="absolute bottom-[35%] left-[65%] w-2 h-2 bg-[#ffc9c9]/25 rounded-full opacity-30 animate-pulse duration-3000" />
          </div>

          {/* Scroll down indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-45 animate-bounce">
            <span className="text-[9px] tracking-[0.25em] text-rose-gold uppercase font-serif">Scroll For Joy</span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-rose-gold to-transparent" />
          </div>
        </section>

        {/* 1. Funny Videos Section */}
        <section id="scene-smile-videos">
          <FunnyVideoGallery />
        </section>

        {/* 2. Happy Memories Gallery */}
        <section id="scene-smile-memories">
          <MemoryGallery />
        </section>

        {/* 3. Surprise Box Box */}
        <section id="scene-smile-chest">
          <SurpriseChest />
        </section>

        {/* 4. Sticky Note Wall Communication Board */}
        <section id="scene-smile-board">
          <StickyNoteBoard />
        </section>

        {/* Footer */}
        <footer className="py-12 bg-[#020205] border-t border-antique-gold/10 text-center text-rose-gold/25 text-xs font-serif font-light tracking-widest relative z-20">
          ❦ THE PRINCESS'S SMILE &bull; FOREVER SAFE WITH US &bull; PRIVATE &bull; NOINDEX ❦
        </footer>

      </SmoothScroll>
    </main>
  );
}
