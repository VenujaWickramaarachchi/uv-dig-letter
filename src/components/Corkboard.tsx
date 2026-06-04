"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Send, Pin, Sparkles, Trash2 } from "lucide-react";

interface Note {
  id: string;
  message: string;
  created_at: string;
}

// Preset pastel color choices for sticky notes
const PASTEL_COLORS = [
  "bg-rose-100/90 text-rose-850 border-rose-200/50",      // Blush Pink
  "bg-orange-100/90 text-amber-900 border-amber-200/50",  // Peach Warmth
  "bg-teal-100/90 text-teal-950 border-teal-200/50",      // Soft Mint
  "bg-violet-100/90 text-violet-950 border-violet-200/50", // Soft Lavender
  "bg-yellow-100/90 text-yellow-950 border-yellow-200/50" // Warm Honey
];

// Preset rotations
const ROTATIONS = [
  "rotate-[-1.5deg]",
  "rotate-[1.5deg]",
  "rotate-[-2.5deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
  "rotate-[3deg]"
];

// Fallback initial/default notes for immediate visual satisfaction
const FALLBACK_NOTES: Note[] = [
  {
    id: "fb-1",
    message: "Remember our midnight walk in the rain? Best hot chocolate of my life. ❤️",
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: "fb-2",
    message: "You have the most beautiful soul. So glad we created this space.",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "fb-3",
    message: "Let's plan that cabin trip soon! Just you, me, and the pine trees. 🌲",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export default function Corkboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSupabaseReady, setIsSupabaseReady] = useState(true);

  // Fetch initial notes from Supabase
  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setNotes(data);
      } else {
        // Fallback to local default notes if db is empty
        setNotes(FALLBACK_NOTES);
      }
    } catch (err) {
      console.warn("Could not load notes from Supabase database. Using fallback notes:", err);
      setIsSupabaseReady(false);
      setNotes(FALLBACK_NOTES);
    }
  };

  useEffect(() => {
    fetchNotes();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("corkboard_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newNote = payload.new as Note;
            setNotes((prev) => {
              // Ensure we don't duplicate and remove fallback notes if real db notes come in
              const filtered = prev.filter(n => !n.id.startsWith("fb-"));
              return [...filtered, newNote];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Submit note handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const tempId = `temp-${Date.now()}`;
    const newNoteObj: Note = {
      id: tempId,
      message: message.trim(),
      created_at: new Date().toISOString()
    };

    try {
      if (!isSupabaseReady || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")) {
        // Safe Client-only fallback behavior
        setNotes((prev) => {
          const filtered = prev.filter(n => !n.id.startsWith("fb-"));
          return [...filtered, newNoteObj];
        });
        setMessage("");
      } else {
        const { error } = await supabase
          .from("notes")
          .insert([{ message: message.trim() }]);

        if (error) throw error;
        setMessage("");
        // Note: Real-time channel insertion listener will handle state addition.
      }
    } catch (err) {
      console.error("Error inserting note into database:", err);
      // Fallback addition in case insert fails
      setNotes((prev) => {
        const filtered = prev.filter(n => !n.id.startsWith("fb-"));
        return [...filtered, newNoteObj];
      });
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Deterministically get styling based on note ID or string hashes to prevent render shift
  const getNoteStyle = (id: string, index: number) => {
    // Generate simple sum of characters
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash += id.charCodeAt(i);
    }
    const colorClass = PASTEL_COLORS[hash % PASTEL_COLORS.length];
    const rotateClass = ROTATIONS[(hash + index) % ROTATIONS.length];
    return { colorClass, rotateClass };
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-stone-950 relative border-t border-stone-900">
      {/* Dynamic Grid Background representing physical corkboard studs/stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1917_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Corkboard Title Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-300 font-medium">Shared Thoughts</span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-100 mt-3 tracking-wide">
            The Corkboard
          </h2>
          <p className="mt-4 text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
            Leave a physical sticky note in our virtual corkboard. Type a sweet message, planning date, or memory to pin forever.
          </p>
        </div>

        {/* Database Alert Banner (if Supabase is missing) */}
        {!isSupabaseReady && (
          <div className="mb-8 p-4 rounded-xl border border-amber-900/30 bg-amber-950/20 text-amber-200/90 text-xs md:text-sm text-center font-light">
            ✨ Sandbox Mode: Supabase DB is currently offline/not configured. Notes will save locally to your session!
          </div>
        )}

        {/* Sticky Notes Corkboard Panel */}
        <div className="min-h-[400px] border border-stone-800/80 bg-stone-900/10 backdrop-blur-sm rounded-3xl p-8 shadow-inner relative flex flex-col justify-between">
          
          {/* Corkboard board wood frame overlay effect */}
          <div className="absolute inset-0 border border-stone-900 rounded-[22px] pointer-events-none" />
          
          {/* Notes Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mb-12">
            <AnimatePresence initial={false}>
              {notes.map((note, index) => {
                const { colorClass, rotateClass } = getNoteStyle(note.id, index);
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    whileHover={{ scale: 1.05, zIndex: 30, rotate: "0deg" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`relative w-64 p-6 rounded-sm border ${colorClass} ${rotateClass} shadow-[4px_8px_16px_rgba(0,0,0,0.3)] transition-all duration-300`}
                  >
                    {/* Metal Pin Head Decoration */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-rose-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <Pin size={18} className="fill-current text-rose-500 hover:text-rose-600 transition-colors" />
                    </div>

                    {/* Sticky Note Content */}
                    <p className="font-handwritten text-2xl md:text-3xl leading-relaxed break-words pt-2 text-stone-950 font-normal">
                      {note.message}
                    </p>

                    {/* Note timestamp */}
                    <div className="mt-4 flex items-center justify-between text-[10px] opacity-50 text-stone-800">
                      <span>
                        {new Date(note.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <Sparkles size={10} className="text-rose-600" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* New Note Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-stone-950/70 border border-stone-850 rounded-full shadow-lg">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a little message..."
                maxLength={100}
                className="w-full bg-transparent px-5 py-3 text-stone-100 placeholder-stone-500 focus:outline-none text-sm font-light"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-450 hover:bg-rose-500 border border-rose-400/20 text-stone-100 font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shrink-0"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-stone-100 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pin note</span>
                    <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-stone-500 text-center mt-3 font-light">
              Maximum 100 characters. Notes sync immediately on submit.
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}
