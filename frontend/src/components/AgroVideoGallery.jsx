import React, { useState } from 'react';
import { VIDEOS } from '../data/initialData';

export default function AgroVideoGallery({ onOpenVideoModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVideos = selectedCategory === 'all' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <section id="video-gallery" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Agro Video & Media Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Watch Our Farm-To-Fork Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Witness our direct agro harvesting, state-of-the-art cleanroom spice grinding, and international container packaging in action.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onOpenVideoModal(video)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Thumbnail with Overlay & Play Icon */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center text-lg shadow-2xl group-hover:scale-125 group-hover:bg-red-500 transition-all duration-300 pl-0.5">
                    ▶
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white border border-white/10">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {video.tag}
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {video.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>Watch Video Stream</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Video Facility Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-3xl shrink-0">
              🎥
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Interested in a Live Virtual Audit of Our Processing Plant?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                International buyers and distributors can book a live video walkthrough of our cleanrooms and testing labs.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenVideoModal(VIDEOS[0])}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm shadow-xl whitespace-nowrap"
          >
            Launch Fullscreen Player
          </button>
        </div>

      </div>
    </section>
  );
}
