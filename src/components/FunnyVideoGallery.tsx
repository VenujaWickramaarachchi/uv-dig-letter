"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Heart, Eye, Sparkles } from "lucide-react";

interface VideoCard {
  id: number;
  title: string;
  caption: string;
  src: string;
  initialViews: number;
}

const funnyVideos: VideoCard[] = [
  {
    id: 1,
    title: "The Clumsy Puppy",
    caption: "A little golden fluffball deciding cushions are mountains.",
    src: "dfadj",
    initialViews: 142,
  },
  {
    id: 2,
    title: "Gravity is Optional",
    caption: "A startled cat jumping straight into the second dimension.",
    src: "/videos/funny-2.mp4",
    initialViews: 98,
  },
  {
    id: 3,
    title: "Ripping Paper Joy",
    caption: "Giggling uncontrollably at the sound of tearing napkins.",
    src: "/videos/funny-3.mp4",
    initialViews: 204,
  },
  {
    id: 4,
    title: "The Happy Dance",
    caption: "A short clip of absolute, pure, uncoordinated celebration.",
    src: "/videos/funny-4.mp4",
    initialViews: 76,
  },
  {
    id: 5,
    title: "The Cookie Heist",
    caption: "Caught red-handed trying to reach the top shelf jar.",
    src: "/videos/funny-5.mp4",
    initialViews: 115,
  },
  {
    id: 6,
    title: "Ears in the Wind",
    caption: "A very happy dog enjoying a breezy car window ride.",
    src: "/videos/funny-6.mp4",
    initialViews: 189,
  },
];

function getGoogleDriveFileId(url: string): string | null {
  const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  const queryRegExp = /[?&]id=([a-zA-Z0-9_-]+)/;
  const queryMatch = url.match(queryRegExp);
  if (queryMatch && queryMatch[1]) {
    return queryMatch[1];
  }

  return null;
}

export default function FunnyVideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);

  // Track views and favorites locally in session
  const [views, setViews] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Initialize views
    const initialViewsMap: Record<number, number> = {};
    funnyVideos.forEach((v) => {
      initialViewsMap[v.id] = v.initialViews;
    });
    setViews(initialViewsMap);
  }, []);

  const handlePlayVideo = (video: VideoCard) => {
    setSelectedVideo(video);
    // Increment view count
    setViews((prev) => ({
      ...prev,
      [video.id]: (prev[video.id] || video.initialViews) + 1,
    }));
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening the video
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-gradient-to-b from-[#0a1026] via-[#100d1f] to-[#120e24] text-ivory overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-antique-gold font-serif block mb-4">
            Cozy Corner
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mt-2 tracking-wide uppercase drop-shadow-[0_0_12px_rgba(229,184,168,0.2)]">
            For Emergency Smiles
          </h2>
          <p className="mt-4 text-xs md:text-sm text-rose-gold/70 max-w-md mx-auto leading-relaxed italic">
            When life gets difficult or shadows lengthen, click on any of these funny snippets to lift your heart.
          </p>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {funnyVideos.map((video, index) => {
            const isFav = !!favorites[video.id];
            const currentViews = views[video.id] || video.initialViews;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, borderColor: "rgba(229, 184, 168, 0.4)" }}
                onClick={() => handlePlayVideo(video)}
                className="relative rounded-2xl border border-antique-gold/10 bg-royal-purple/5 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-[360px] cursor-pointer group transition-all duration-300 shadow-xl"
              >
                {/* Visual Thumbnail container */}
                <div className="relative h-48 w-full bg-[#0a0812] border-b border-antique-gold/10 flex items-center justify-center overflow-hidden">

                  {/* Backdrop glowing colors */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-royal-purple/20 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

                  {/* Play Button Overlay */}
                  <div className="absolute w-12 h-12 rounded-full border-2 border-antique-gold/60 bg-[#0B1026]/70 flex items-center justify-center text-antique-gold group-hover:scale-110 group-hover:border-antique-gold group-hover:text-ivory transition-all duration-300 shadow-md z-10">
                    <Play size={18} className="fill-current translate-x-0.5" />
                  </div>

                  {/* Graphic layout placeholder inside card */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-rose-gold/25 pointer-events-none">
                    <Sparkles size={24} className="mb-2 opacity-50" />
                    <span className="text-[9px] uppercase tracking-widest font-serif">Funny Video {video.id}</span>
                  </div>
                </div>

                {/* Caption Detail Panel */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif text-ivory group-hover:text-antique-gold transition-colors tracking-wide">
                      {video.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-2 font-serif leading-relaxed line-clamp-2">
                      {video.caption}
                    </p>
                  </div>

                  {/* Card bottom bar (Views & Favorites) */}
                  <div className="mt-4 flex items-center justify-between border-t border-antique-gold/5 pt-3">
                    {/* Simulated views count */}
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-serif">
                      <Eye size={12} />
                      <span>{currentViews} smiles triggered</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(video.id, e)}
                      className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${isFav
                        ? "bg-rose-500/15 border-rose-500/30 text-rose-400"
                        : "border-antique-gold/10 text-stone-500 hover:border-antique-gold/30 hover:text-rose-gold"
                        }`}
                      title={isFav ? "Favorited" : "Favorite"}
                    >
                      <Heart size={12} className={isFav ? "fill-current" : ""} />
                    </button>
                  </div>
                </div>

                {/* Gold outline shine */}
                <div className="absolute inset-1.5 rounded-[14px] border border-antique-gold/5 pointer-events-none group-hover:border-antique-gold/15 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expandable Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-midnight-blue border border-antique-gold/30 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header bar */}
              <div className="bg-[#0B1026] px-6 py-4 border-b border-antique-gold/10 flex items-center justify-between text-antique-gold font-serif">
                <span className="text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} className="animate-spin duration-3000" />
                  Smile Generator
                </span>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1 rounded-full border border-antique-gold/15 text-antique-gold hover:text-midnight-blue hover:bg-antique-gold transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Video frame wrapper */}
              <div className="w-full aspect-video bg-[#020205] relative flex items-center justify-center">
                {selectedVideo.src && getGoogleDriveFileId(selectedVideo.src) ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${getGoogleDriveFileId(selectedVideo.src)}/preview`}
                    className="w-full h-full border-none z-20 relative rounded-2xl"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* HTML5 video element */}
                    <video
                      src={selectedVideo.src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain relative z-10"
                    />

                    {/* Falling overlay alert if the video is missing */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-rose-gold/40 select-none">
                      <Play size={36} className="mb-4 opacity-50 border border-dashed border-antique-gold/25 p-2 rounded-full w-16 h-16" />
                      <span className="text-sm font-serif font-bold uppercase tracking-wider text-antique-gold">Emergency Smile Video</span>
                      <p className="text-xs text-stone-500 max-w-sm mt-2 font-serif leading-relaxed">
                        Local video `{selectedVideo.src}` is currently a placeholder. Put your funny video MP4 files inside your `public/videos/` directory to play them here!
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Text caption details */}
              <div className="p-6 md:p-8 bg-midnight-blue">
                <h3 className="text-xl font-serif text-antique-gold tracking-wide font-bold">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-stone-300 mt-2 font-serif leading-relaxed">
                  {selectedVideo.caption}
                </p>
              </div>

              <div className="absolute inset-1.5 rounded-[22px] border border-antique-gold/5 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
