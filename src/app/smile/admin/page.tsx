"use client";

import React, { useState, useEffect } from "react";
import { Lock, Trash2, Pin, ArrowLeft, BarChart3, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";

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

export default function AdminPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync session authorization if password was typed before
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_key");
    if (savedPassword) {
      setPassword(savedPassword);
      verifyAdmin(savedPassword);
    }
  }, []);

  const verifyAdmin = async (pw: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/sticky-notes");
      if (!res.ok) throw new Error("Could not connect to API.");
      
      // Attempt a test fetch to check if the password allows querying if we had it protected.
      // But since fetch is open, we query all notes and store locally.
      const data = await res.json();
      
      // Perform a test delete/patch on mock endpoint or check password against server if needed.
      // Here, we check password validity by matching process.env.ADMIN_PASSWORD in server action.
      // To test password validity immediately, we make a mock PATCH call with invalid note ID.
      // If server returns 401, password is wrong. If 404/400/500/200, password was accepted!
      const testRes = await fetch("/api/sticky-notes/999999", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": pw,
        },
        body: JSON.stringify({ is_pinned: false }),
      });

      if (testRes.status === 401) {
        throw new Error("Invalid Administrator Password.");
      }

      setNotes(data);
      setIsAuthorized(true);
      sessionStorage.setItem("admin_key", pw);
    } catch (err: any) {
      setErrorMsg(err.message || "Authorization failed.");
      setIsAuthorized(false);
      sessionStorage.removeItem("admin_key");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAdmin(password);
  };

  // Toggle Pinned Status
  const handleTogglePin = async (id: number, currentPinned: number) => {
    const targetPinned = currentPinned === 1 ? 0 : 1;
    
    // Optimistically update locally
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_pinned: targetPinned } : n))
    );

    try {
      const res = await fetch(`/api/sticky-notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ is_pinned: targetPinned }),
      });

      if (!res.ok) throw new Error("Failed to pin note.");
    } catch (err) {
      console.error(err);
      // Revert on error
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_pinned: currentPinned } : n))
      );
      alert("Failed to pin note on database. Please check connection.");
    }
  };

  // Delete note
  const handleDeleteNote = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this note?")) return;

    // Save current list for fallback
    const fallbackList = [...notes];
    
    // Optimistically remove note
    setNotes((prev) => prev.filter((n) => n.id !== id));

    try {
      const res = await fetch(`/api/sticky-notes/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": password,
        },
      });

      if (!res.ok) throw new Error("Failed to delete note.");
    } catch (err) {
      console.error(err);
      // Revert on error
      setNotes(fallbackList);
      alert("Failed to delete note on database.");
    }
  };

  // Compute Stats
  const totalNotes = notes.length;
  const pinnedNotesCount = notes.filter((n) => n.is_pinned === 1).length;
  const totalReactions = notes.reduce(
    (acc, n) => acc + n.hearts + n.roses + n.smiles + n.sparks,
    0
  );

  // If not authorized, show Login
  if (!isAuthorized) {
    return (
      <main className="w-full min-h-screen bg-[#04060d] text-ivory flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-md w-full border border-antique-gold/25 bg-midnight-blue/80 p-8 md:p-12 rounded-3xl shadow-2xl relative text-center">
          <div className="absolute inset-1.5 rounded-[22px] border border-antique-gold/5 pointer-events-none" />

          <Lock size={32} className="text-antique-gold mx-auto mb-6 animate-pulse" />
          
          <h1 className="text-2xl font-serif text-antique-gold font-bold tracking-wider uppercase mb-2">
            Royal Archive
          </h1>
          <p className="text-xs text-rose-gold/60 font-serif italic mb-8">
            Enter the administrator passkey to access note coordinates.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password..."
              className="w-full bg-[#0a0815] border border-antique-gold/20 rounded-lg px-4 py-2.5 text-center text-ivory placeholder-stone-600 focus:outline-none focus:border-antique-gold text-xs"
              required
            />

            {errorMsg && (
              <span className="text-[10px] text-red-400 font-serif block mt-1">
                {errorMsg}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-antique-gold hover:bg-antique-gold/90 text-midnight-blue font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Decrypting..." : "Access Control"}
            </button>
          </form>

          <Link
            href="/smile"
            className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-500 hover:text-antique-gold mt-8 transition-colors"
          >
            <ArrowLeft size={10} />
            Back to Smile Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#04060d] text-ivory p-6 md:p-12 font-serif relative">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-antique-gold/20 pb-6 mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-antique-gold tracking-wide uppercase">
              Princess's Smile Panel
            </h1>
            <p className="text-xs text-rose-gold/60 italic mt-1 font-serif">
              Administrative Control Dashboard
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_key");
                setIsAuthorized(false);
              }}
              className="px-4 py-2 border border-red-900/30 hover:border-red-500 bg-red-950/20 text-red-200 text-[10px] uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Lock Panel
            </button>
            <Link
              href="/smile"
              className="px-4 py-2 border border-antique-gold/30 hover:border-antique-gold bg-[#0B1026] text-antique-gold text-[10px] uppercase tracking-widest rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={10} />
              Return
            </Link>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="border border-antique-gold/15 bg-royal-purple/5 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-rose-gold/70 block mb-1">
                Total Whispers
              </span>
              <span className="text-3xl font-bold text-ivory">{totalNotes}</span>
            </div>
            <MessageSquare className="text-antique-gold opacity-50 w-8 h-8" />
          </div>

          {/* Card 2 */}
          <div className="border border-antique-gold/15 bg-royal-purple/5 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-rose-gold/70 block mb-1">
                Total Reactions
              </span>
              <span className="text-3xl font-bold text-ivory">{totalReactions}</span>
            </div>
            <Heart className="text-antique-gold opacity-50 w-8 h-8" />
          </div>

          {/* Card 3 */}
          <div className="border border-antique-gold/15 bg-royal-purple/5 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-rose-gold/70 block mb-1">
                Pinned Notes
              </span>
              <span className="text-3xl font-bold text-ivory">{pinnedNotesCount}</span>
            </div>
            <BarChart3 className="text-antique-gold opacity-50 w-8 h-8" />
          </div>
        </div>

        {/* Management Table */}
        <div className="border border-antique-gold/20 bg-midnight-blue/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-[#0B1026] border-b border-antique-gold/10 font-bold uppercase tracking-wider text-xs text-antique-gold font-serif">
            Active Whispers Registry
          </div>

          {notes.length === 0 ? (
            <div className="py-20 text-center text-stone-500 font-serif text-sm">
              No active sticky notes found in the registry.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif leading-relaxed">
                <thead>
                  <tr className="bg-royal-purple/10 text-rose-gold/80 border-b border-antique-gold/10 uppercase tracking-widest text-[9px]">
                    <th className="px-6 py-4">Pin</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Reactions</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((n) => (
                    <tr key={n.id} className="border-b border-antique-gold/5 hover:bg-royal-purple/5 transition-colors">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePin(n.id, n.is_pinned)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            n.is_pinned === 1
                              ? "text-red-500 hover:text-red-400 bg-red-950/20"
                              : "text-stone-500 hover:text-antique-gold bg-stone-900/30"
                          }`}
                          title={n.is_pinned === 1 ? "Unpin Note" : "Pin Note"}
                        >
                          <Pin size={13} className={n.is_pinned === 1 ? "fill-current" : ""} />
                        </button>
                      </td>
                      <td className="px-6 py-4 font-bold text-ivory">{n.name}</td>
                      <td className="px-6 py-4 max-w-sm font-light text-stone-300 font-serif break-words">
                        {n.message}
                      </td>
                      <td className="px-6 py-4 text-stone-500">
                        {new Date(n.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] text-rose-gold/60 font-mono">
                          ❤️{n.hearts} | 🌹{n.roses} | 😊{n.smiles} | ✨{n.sparks}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="p-1.5 rounded text-stone-500 hover:text-red-500 hover:bg-red-950/20 transition-colors cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
