"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Global and core components
import SmoothScroll from "@/components/SmoothScroll";
import MagicCanvas from "@/components/MagicCanvas";
import SwordProgressBar from "@/components/SwordProgressBar";
import CompassNavigation from "@/components/CompassNavigation";
import StorybookIntro from "@/components/StorybookIntro";

// Fairytale narrative scenes
import SceneEmptyKingdom from "@/components/SceneEmptyKingdom";
import SceneArrival from "@/components/SceneArrival";
import SceneAdventures from "@/components/SceneAdventures";
import SceneStorm from "@/components/SceneStorm";
import SceneLetter from "@/components/SceneLetter";
import SceneGarden from "@/components/SceneGarden";
import SceneChoice from "@/components/SceneChoice";
import FinalLetter from "@/components/FinalLetter";
import EndingMoment from "@/components/EndingMoment";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock scroll on mount, unlock when entered
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [entered]);

  // Smooth volume fade-in handler
  const fadeInAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let currentVol = 0;
    const targetVol = 0.45; // comfortable background level
    
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
    }, 150);
  };

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeInAudio();
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
          // Try playing again or keep it muted until explicit toggle
        });
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeInAudio();
          })
          .catch((err) => {
            console.error("Audio playback error:", err);
          });
      }
    }
  };

  // Fallback to online romantic piano loop if the local placeholder audio is missing
  const handleAudioError = () => {
    console.warn("Local background music missing or failed. Using online royalty-free fallback.");
    if (audioRef.current && audioRef.current.src !== "https://assets.mixkit.co/music/preview/mixkit-ambient-piano-loop-85.mp3") {
      audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-ambient-piano-loop-85.mp3";
      if (entered) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeInAudio();
          })
          .catch((err) => console.log("Fallback audio play failed:", err));
      }
    }
  };

  return (
    <main className={`relative w-full ${entered ? "min-h-screen" : "h-screen overflow-hidden"}`}>
      
      {/* Hidden Audio Tag playing fairytale loop */}
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
        onError={handleAudioError}
      />

      {/* Floating Ambient Music Control (Visible after entry) */}
      <AnimatePresence>
        {entered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full border border-antique-gold bg-midnight-blue/70 backdrop-blur-md text-antique-gold hover:text-rose-gold shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            title={isPlaying ? "Mute Music" : "Play Music"}
          >
            {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-screen Storybook Intro Overlay */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50"
          >
            <StorybookIntro onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Journey Content with Smooth Scroll & Global Particles */}
      {entered && (
        <SmoothScroll>
          {/* Performance Optimized Canvas Particle Overlay (Fireflies, Petals, Stars, Trails) */}
          <MagicCanvas />

          {/* Compass Navigation Quick-travel */}
          <CompassNavigation />

          {/* Golden Sword Scroll Progress Bar */}
          <SwordProgressBar />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            {/* Intro Anchor for active scene detection at top */}
            <div id="scene-intro" className="absolute top-0 w-full h-[1px] pointer-events-none" />

            {/* Scene 1: The Empty Kingdom */}
            <SceneEmptyKingdom />

            {/* Scene 2: The Arrival */}
            <SceneArrival />

            {/* Scene 3: Our Adventures (Memory Gallery) */}
            <SceneAdventures />

            {/* Scene 4: The Storm */}
            <SceneStorm />

            {/* Scene 5: The Letter */}
            <SceneLetter />

            {/* Scene 6: The Garden of Memories (Interactive Tree) */}
            <SceneGarden />

            {/* Scene 7: The Choice */}
            <SceneChoice />

            {/* Scene 8: Final Letter Section */}
            <FinalLetter />

            {/* Outro/Credits Scene */}
            <EndingMoment />
            
            {/* Footer */}
            <footer className="py-12 bg-[#04060d] border-t border-antique-gold/10 text-center text-rose-gold/30 text-xs font-serif font-light tracking-widest relative z-20">
              ❦ THE LETTER THE PRINCE NEVER SENT &bull; A DIGITAL SANCTUARY &bull; PRIVATE &bull; NOINDEX ❦
            </footer>
          </motion.div>
        </SmoothScroll>
      )}

    </main>
  );
}
