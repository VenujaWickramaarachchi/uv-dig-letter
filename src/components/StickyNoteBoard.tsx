"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Send, Heart, Smile, Sparkles, AlertCircle } from "lucide-react";

interface Note {
  id: number;
  name: string;
  message: string;
  created_at: string;
  is_pinned: number;
  hearts: number;
  roses: number;
  smiles: number;
  sparks: number;
}

// Pastel colors matching sticky notes
const PASTEL_COLORS = [
  "bg-[#fff9db] text-stone-900 border-[#f2e299]", // Yellow
  "bg-[#ffe3e3] text-stone-900 border-[#ffc9c9]", // Pink
  "bg-[#e3faf2] text-stone-900 border-[#b2f2bb]", // Mint
  "bg-[#e8f4fd] text-stone-900 border-[#a5d8ff]", // Blue
  "bg-[#f3f0ff] text-stone-900 border-[#d0bfff]", // Lavender
];

// Rotations
const ROTATIONS = [
  "rotate-[-1.5deg]",
  "rotate-[1.5deg]",
  "rotate-[-2.5deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
  "rotate-[2.5deg]",
];

export default function StickyNoteBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);

  // 1. Fetch notes from MySQL API
  const fetchNotes = async (silent = false) => {
    try {
      if (!silent) setIsConnecting(true);
      const res = await fetch("/api/sticky-notes");
      if (!res.ok) throw new Error("Database returned an error.");
      const data = await res.json();
      setNotes(data);
      setErrorMsg("");
    } catch (err) {
      console.warn("Could not load notes from MySQL Database:", err);
      setErrorMsg("Unable to sync notes with the database at this moment.");
    } finally {
      setIsConnecting(false);
    }
  };

  // 2. Poll every 5 seconds for near-real-time updates
  useEffect(() => {
    fetchNotes();

    const interval = setInterval(() => {
      fetchNotes(true); // silent updates
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 3. Handle message submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    if (message.length > 500) {
      setErrorMsg("Message cannot exceed 500 characters.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/sticky-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save note.");
      }

      const newNote = await res.json();
      // Add note locally to set immediate state before polling
      setNotes((prev) => [newNote, ...prev]);
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to pin note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle reaction increment
  const handleReact = async (id: number, reactionType: "hearts" | "roses" | "smiles" | "sparks") => {
    // Optimistic UI updates
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, [reactionType]: n[reactionType] + 1 } : n
      )
    );

    try {
      await fetch(`/api/sticky-notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reactionType }),
      });
    } catch (err) {
      console.error("Failed to persist reaction on database:", err);
    }
  };

  // Deterministic styles to prevent page shifts
  const getNoteStyle = (id: number) => {
    const colorClass = PASTEL_COLORS[id % PASTEL_COLORS.length];
    const rotateClass = ROTATIONS[id % ROTATIONS.length];
    return { colorClass, rotateClass };
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-gradient-to-b from-[#120e24] via-[#100d1e] to-[#04060d] text-ivory relative border-t border-antique-gold/10">
      
      {/* String Lights Twinkling at top of board */}
      <div className="absolute top-0 left-0 w-full h-8 flex justify-around items-center px-6 pointer-events-none select-none z-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full bg-amber-300 border border-antique-gold/30 filter drop-shadow-[0_0_6px_#d4af37] ${
              i % 3 === 0 ? "animate-pulse" : i % 2 === 0 ? "animate-bounce" : ""
            }`}
            style={{ animationDelay: `${i * 200}ms`, animationDuration: `${1.5 + (i % 3)}s` }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-antique-gold font-serif block mb-4">
            Whisper Board
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-wide uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]">
            The Sticky Note Wall
          </h2>
          <p className="mt-4 text-xs md:text-sm text-rose-gold/70 max-w-md mx-auto leading-relaxed italic">
            Leave a permanent note for the princess. Write a message, a compliment, or a private reminder. Updates automatically in real-time.
          </p>
        </div>

        {/* Database connection warning banner */}
        {errorMsg && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl border border-red-900/30 bg-red-950/20 text-red-200 text-xs flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Board Panel */}
        {/* Corkboard texture with wood border */}
        <div className="min-h-[500px] border-8 border-[#3d2719] bg-[#8B5A2B] rounded-3xl p-6 md:p-10 shadow-2xl relative flex flex-col justify-between overflow-hidden">
          
          {/* Corkboard dots texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#5C4033_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-75 pointer-events-none" />

          {/* Notes display grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12 relative z-10">
            <AnimatePresence initial={false}>
              {notes.map((note) => {
                const { colorClass, rotateClass } = getNoteStyle(note.id);
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    whileHover={{ scale: 1.04, zIndex: 30, rotate: "0deg" }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative w-72 p-6 rounded-md border ${colorClass} ${rotateClass} shadow-[5px_10px_20px_rgba(0,0,0,0.35)] flex flex-col justify-between h-72`}
                  >
                    {/* Metal Pin head on top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <Pin size={18} className="fill-current text-red-700 hover:text-red-650 transition-colors" />
                    </div>

                    {/* Pin-marked badge (If note is pinned) */}
                    {note.is_pinned === 1 && (
                      <span className="absolute top-2 right-2 text-[8px] bg-red-800 text-white font-serif uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm rotate-[10deg]">
                        Pinned
                      </span>
                    )}

                    {/* Note message */}
                    <p className="font-handwritten text-xl leading-relaxed break-words pt-3 font-normal text-stone-900 scrollbar-thin overflow-y-auto pr-1 flex-grow">
                      {note.message}
                    </p>

                    {/* Author block */}
                    <div className="border-t border-stone-900/10 pt-2.5 mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[9px] opacity-60 text-stone-850">
                        <span className="font-serif uppercase font-bold tracking-wider">From: {note.name}</span>
                        <span>
                          {new Date(note.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Note Reactions bar */}
                      <div className="flex items-center gap-3 pt-1 text-stone-800">
                        {/* Hearts */}
                        <button
                          onClick={() => handleReact(note.id, "hearts")}
                          className="flex items-center gap-1 text-[10px] hover:text-red-600 transition-colors cursor-pointer group/btn"
                        >
                          <Heart size={11} className="group-hover/btn:scale-120 group-hover/btn:fill-current transition-all" />
                          <span>{note.hearts}</span>
                        </button>
                        {/* Roses */}
                        <button
                          onClick={() => handleReact(note.id, "roses")}
                          className="flex items-center gap-1 text-[10px] hover:text-emerald-700 transition-colors cursor-pointer group/btn"
                        >
                          <span className="group-hover/btn:scale-120 block transition-transform">🌹</span>
                          <span>{note.roses}</span>
                        </button>
                        {/* Smiles */}
                        <button
                          onClick={() => handleReact(note.id, "smiles")}
                          className="flex items-center gap-1 text-[10px] hover:text-yellow-600 transition-colors cursor-pointer group/btn"
                        >
                          <Smile size={11} className="group-hover/btn:scale-120 transition-all" />
                          <span>{note.smiles}</span>
                        </button>
                        {/* Sparks */}
                        <button
                          onClick={() => handleReact(note.id, "sparks")}
                          className="flex items-center gap-1 text-[10px] hover:text-amber-500 transition-colors cursor-pointer group/btn"
                        >
                          <Sparkles size={11} className="group-hover/btn:scale-120 transition-all" />
                          <span>{note.sparks}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Form to leave a new note */}
          <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto relative z-10 bg-midnight-blue/80 border border-antique-gold/20 p-5 rounded-2xl shadow-xl backdrop-blur-md">
            <h4 className="text-xs uppercase tracking-widest text-antique-gold mb-3 font-serif text-center">
              Leave a Whisper
            </h4>
            
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name / Moniker..."
                maxLength={40}
                className="w-full bg-[#0a0815] border border-antique-gold/25 rounded-lg px-4 py-2 text-ivory placeholder-stone-500 focus:outline-none focus:border-antique-gold text-xs font-light"
                disabled={isSubmitting}
                required
              />

              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a sweet message, comment, or memory (max 500 characters)..."
                  maxLength={500}
                  rows={3}
                  className="w-full bg-[#0a0815] border border-antique-gold/25 rounded-lg px-4 py-2 text-ivory placeholder-stone-500 focus:outline-none focus:border-antique-gold text-xs font-light pr-12 resize-none"
                  disabled={isSubmitting}
                  required
                />
                
                {/* Character Counter */}
                <span className={`absolute bottom-2 right-3 text-[9px] font-mono ${
                  message.length >= 480 ? "text-red-400" : "text-stone-500"
                }`}>
                  {message.length}/500
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-antique-gold hover:bg-antique-gold/90 text-midnight-blue font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shrink-0"
              >
                {isSubmitting ? (
                  <span className="w-3.5 h-3.5 border-2 border-midnight-blue border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pin Whisper</span>
                    <Send size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
