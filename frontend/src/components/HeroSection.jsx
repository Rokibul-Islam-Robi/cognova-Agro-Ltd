import React, { useState, useRef } from 'react';
import { COMPANY_INFO, VIDEOS } from '../data/initialData';

export default function HeroSection({ onExploreClick, onRequestQuoteClick, onOpenVideoModal }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeVideo = VIDEOS[currentVideoIndex] || VIDEOS[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      
      {/* Background Agro Video Player */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          key={activeVideo.url}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.1] transition-opacity duration-1000"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={activeVideo.poster}
        >
          <source src={activeVideo.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Dual Gradients & Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
      </div>

      {/* Floating Video Controls in Bottom-Right */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-xl px-3 py-2 rounded-2xl border border-white/20 shadow-2xl">
        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Agro Cam
        </span>

        {/* Video Scene Switcher Buttons */}
        <div className="flex items-center gap-1">
          {VIDEOS.map((v, idx) => (
            <button
              key={v.id}
              onClick={() => handleSelectVideo(idx)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                currentVideoIndex === idx 
                  ? 'bg-amber-500 text-slate-950 shadow' 
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              {v.tag}
            </button>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-slate-950 transition-colors"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero Core Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-bold mb-6 shadow-xl animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Since 1982 • ISO 22000 & Halal Certified Global Agro Exporter</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Purity From Bengal’s Fields To{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300">
            Global Dining Tables
          </span>
        </h1>

        {/* Subtitle with Corporate Weight */}
        <p className="mt-5 text-sm sm:text-lg md:text-xl text-slate-200/90 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow">
          Prome Agro Foods Limited produces over 1 million tons of authentic spices, cold-pressed mustard oil, aromatic Chinigura rice, and gourmet snacks annually, exported proudly to 32+ nations worldwide.
        </p>

        {/* Hero Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-700/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>🌾 Explore All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => onOpenVideoModal(activeVideo)}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/30 text-white font-bold text-sm sm:text-base backdrop-blur-md shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs shadow-md">
              ▶
            </div>
            <span>Watch Factory Tour</span>
          </button>

          <button
            onClick={onRequestQuoteClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>🚢 B2B Export Quote</span>
          </button>
        </div>

        {/* 4 Floating Live Metric Badges */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-xl text-center hover:border-emerald-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">32+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Export Countries</div>
            <p className="text-[10px] text-slate-300 mt-0.5">USA, UK, UAE, KSA, EU</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-xl text-center hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">1M Tons</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Annual Capacity</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Ultra-modern Cleanrooms</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-xl text-center hover:border-emerald-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">5x CIP</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Govt. Honor</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Chairman CIP Award Winner</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-xl text-center hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">3,000+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Workforce</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Direct Agro Employment</p>
          </div>

        </div>

      </div>
    </section>
  );
}
