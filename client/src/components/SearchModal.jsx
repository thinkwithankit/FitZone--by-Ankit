import React, { useState, useEffect } from 'react';
import { Search, X, Dumbbell, User, Calendar, Crown, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onSelectPlan, onSelectTrainer }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchableItems = [
    { title: 'Strength Training', type: 'Program', section: 'services', desc: 'Build strength and muscle with expert guidance' },
    { title: 'Cardio Fitness', type: 'Program', section: 'services', desc: 'Improve stamina and burn calories' },
    { title: 'CrossFit', type: 'Program', section: 'services', desc: 'High intensity workouts for real results' },
    { title: 'Yoga & Flexibility', type: 'Program', section: 'services', desc: 'Increase flexibility and reduce stress' },
    { title: 'Rahul Sharma', type: 'Trainer', section: 'trainers', desc: 'Strength & Conditioning Specialist' },
    { title: 'Priya Mehta', type: 'Trainer', section: 'trainers', desc: 'Yoga & Wellness Coach' },
    { title: 'Aman Verma', type: 'Trainer', section: 'trainers', desc: 'CrossFit Expert & Conditioning' },
    { title: 'Neha Singh', type: 'Trainer', section: 'trainers', desc: 'Cardio & Fitness Specialist' },
    { title: 'Basic Plan', type: 'Membership', section: 'membership', desc: '₹999 / month - Gym Access & Support' },
    { title: 'Premium Plan', type: 'Membership', section: 'membership', desc: '₹1,499 / month - Most Popular' },
    { title: 'Pro Plan', type: 'Membership', section: 'membership', desc: '₹1,999 / month - Unlimited Personal Training' },
    { title: 'Weekly Schedule', type: 'Timetable', section: 'schedule', desc: 'View and book workout slots' },
    { title: 'BMI & Calorie Calculator', type: 'Tool', section: 'schedule', desc: 'Analyze body mass index and daily burn' },
  ];

  const filtered = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems.slice(0, 6);

  const getIcon = (type) => {
    switch (type) {
      case 'Program':
        return Dumbbell;
      case 'Trainer':
        return User;
      case 'Membership':
        return Crown;
      default:
        return Calendar;
    }
  };

  const handleSelect = (item) => {
    onClose();
    const elem = document.getElementById(item.section);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#12141c] border border-zinc-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, trainers, membership plans, or classes..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto divide-y divide-zinc-800/40">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-zinc-500">
              No matching results found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/80 text-zinc-300 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-red-400 font-['Outfit']">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
