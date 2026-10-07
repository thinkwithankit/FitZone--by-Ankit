import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function Services({ onOpenJoin }) {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 'strength', title: 'Strength Training',
      description: 'Build strength and muscle with expert guidance.',
      image: '/images/strength.jpg',
      duration: '60 Mins', calories: '450 - 650 kcal', level: 'All Levels', trainer: 'Rahul Sharma',
      details: [
        'Progressive overload resistance training',
        'Compound lifts (Squat, Deadlift, Bench Press)',
        'Hypertrophy and functional power development',
        'Form correction and injury prevention protocol',
      ],
    },
    {
      id: 'cardio', title: 'Cardio Fitness',
      description: 'Improve stamina and burn calories.',
      image: '/images/cardio.jpg',
      duration: '45 Mins', calories: '500 - 750 kcal', level: 'Beginner to Advanced', trainer: 'Neha Singh',
      details: [
        'Curved treadmill endurance sprints',
        'High-intensity interval conditioning (HIIT)',
        'Cardiovascular heart rate zone training',
        'Stamina building and rapid fat oxidation',
      ],
    },
    {
      id: 'crossfit', title: 'CrossFit',
      description: 'High intensity workouts for real results.',
      image: '/images/crossfit.jpg',
      duration: '50 Mins', calories: '600 - 850 kcal', level: 'Intermediate to Pro', trainer: 'Aman Verma',
      details: [
        'Metabolic conditioning (MetCon) circuits',
        'Battle ropes, kettlebell swings & plyometrics',
        'Olympic barbell complexes and gymnastic rings',
        'Daily WOD challenges',
      ],
    },
    {
      id: 'yoga', title: 'Yoga & Flexibility',
      description: 'Increase flexibility and reduce stress.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
      duration: '55 Mins', calories: '250 - 400 kcal', level: 'All Levels', trainer: 'Priya Mehta',
      details: [
        'Asana flows for joint mobility and deep decompression',
        'Breathwork (Pranayama) and stress reduction',
        'Core stability and posture alignment therapy',
        'Guided meditative cool-down and mental clarity',
      ],
    },
  ];

  return (
    <section id="services" className="py-20 section-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase theme-heading font-['Outfit']">
              Programs Built For <span className="text-red-500">Every Goal</span>
            </h2>
          </div>
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 text-sm font-semibold theme-text-sec hover:text-red-500 px-5 py-2.5 rounded-full fz-card transition-colors w-fit group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              onClick={() => setSelectedProgram(prog)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer fz-card"
            >
              <img
                src={prog.image}
                alt={prog.title}
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-110 group-hover:brightness-[0.8] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2 font-['Outfit']">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">{prog.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800/90 text-zinc-200 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="theme-bg-elevated fz-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 theme-text-sec hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative h-48">
              <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover filter brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">Featured Program</span>
                <h3 className="text-2xl font-black text-white font-['Outfit']">{selectedProgram.title}</h3>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-sm theme-text-sec">{selectedProgram.description}</p>
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl theme-bg-input border fz-card text-center">
                <div>
                  <div className="text-xs theme-text-muted">Duration</div>
                  <div className="text-sm font-bold theme-heading mt-0.5">{selectedProgram.duration}</div>
                </div>
                <div>
                  <div className="text-xs theme-text-muted">Burn</div>
                  <div className="text-sm font-bold text-red-500 mt-0.5">{selectedProgram.calories}</div>
                </div>
                <div>
                  <div className="text-xs theme-text-muted">Lead Coach</div>
                  <div className="text-sm font-bold theme-heading mt-0.5">{selectedProgram.trainer}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {selectedProgram.details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm theme-text-sec">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => { setSelectedProgram(null); onOpenJoin(selectedProgram.title); }}
                  className="flex-1 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all"
                >
                  Join With This Program
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-3 rounded-full theme-bg-input theme-text-sec text-sm font-semibold fz-card"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
