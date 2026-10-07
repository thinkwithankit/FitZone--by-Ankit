import React from 'react';
import { X, Play, Volume2, VolumeX, Flame } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#101118] border border-zinc-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 bg-[#0c0d12]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-base font-bold text-white font-['Outfit']">
              FitZone Experience Reel — Unleash Your Potential
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/X_9VoqR5ojM?autoplay=1&mute=0&controls=1&rel=0&loop=1"
            title="FitZone Gym Showcase Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-[#0e0f16] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-500" />
            <span>State-of-the-art facilities • Certified Coaches • Olympic Lifting Zone</span>
          </div>
          <span className="text-zinc-500 font-mono">Filmed at FitZone Flagship Arena</span>
        </div>
      </div>
    </div>
  );
}
