import React, { useState } from 'react';
import { ArrowRight, Play, Award, Dumbbell, Calendar, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onOpenJoin, onOpenVideo, stats }) {
  const { theme } = useTheme();

  const highlights = [
    { icon: Award,    title: 'Expert Trainers',       desc: 'Learn from certified and experienced trainers.' },
    { icon: Dumbbell, title: 'Modern Equipment',       desc: 'Train with top quality equipment.' },
    { icon: Calendar, title: 'Flexible Plans',         desc: 'Choose a plan that suits your goals.' },
    { icon: Users,    title: 'Supportive Community',   desc: 'Be part of a motivated fitness community.' },
  ];

  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
      {/* Background Image with overlays — hero always shows the dark photo backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="FitZone Athlete Workout"
          className="w-full h-full object-cover object-right-top md:object-center filter brightness-[0.75] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b10] via-[#0a0b10]/85 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#0a0b10]/35 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0b10] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pt-6 md:pt-12">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-red-500 font-extrabold tracking-[0.22em] text-xs sm:text-sm uppercase font-['Outfit']">
              BE STRONGER EVERYDAY
            </span>
            <span className="w-8 h-[2px] bg-red-500/80" />
          </div>

          {/* Headline — always white on the dark hero */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.04] mb-6 font-['Outfit']">
            BUILD YOUR <br />
            <span className="text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
              BEST VERSION
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 max-w-xl">
            Join FitZone and get expert training, modern equipment and a supportive
            community to achieve your fitness goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-14">
            <button
              onClick={() => onOpenJoin('Premium Plan')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-600/35 hover:shadow-red-600/50 hover:gap-3 transition-all duration-300 group"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenVideo}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-black/50 hover:bg-black/70 text-white font-semibold text-sm sm:text-base border border-white/20 hover:border-red-500/50 backdrop-blur-md transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/20 max-w-lg">
            {[
              { value: stats?.happyMembersCount || '10K+', label: 'Happy Members' },
              { value: stats?.expertTrainersCount || '50+', label: 'Expert Trainers' },
              { value: stats?.yearsExperience || '5+',     label: 'Years Experience' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{value}</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Bar — adapts to light/dark */}
        <div className="mt-16 sm:mt-20 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3.5 p-4 rounded-xl fz-card backdrop-blur-md group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                       style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold theme-heading group-hover:text-red-500 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs theme-text-sec mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
