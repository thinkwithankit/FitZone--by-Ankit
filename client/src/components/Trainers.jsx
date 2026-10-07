import React, { useState } from 'react';
import { ArrowRight, Star, X, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './SocialIcons';
import { useState as useStateAlias } from 'react';

// Remove duplicate useState import
export default function Trainers({ trainers = [], onBookSession }) {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [sessionBooked, setSessionBooked] = useState(false);
  const [date, setDate] = useState('2026-10-02');
  const [time, setTime] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const defaultTrainers = [
    { id: 1, name: 'Rahul Sharma', specialty: 'Strength & Conditioning', rating: 4.9, experience_years: 7,
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80',
      instagram: '#', facebook: '#', linkedin: '#' },
    { id: 2, name: 'Priya Mehta', specialty: 'Yoga & Wellness', rating: 5.0, experience_years: 6,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      instagram: '#', facebook: '#', linkedin: '#' },
    { id: 3, name: 'Aman Verma', specialty: 'CrossFit Expert', rating: 4.9, experience_years: 8,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      instagram: '#', facebook: '#', linkedin: '#' },
    { id: 4, name: 'Neha Singh', specialty: 'Cardio & Fitness', rating: 4.8, experience_years: 5,
      image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&auto=format&fit=crop&q=80',
      instagram: '#', facebook: '#', linkedin: '#' },
  ];

  const list = trainers.length > 0 ? trainers : defaultTrainers;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setSessionBooked(true);
    setTimeout(() => {
      setSessionBooked(false);
      setSelectedTrainer(null);
      setClientName('');
      setClientPhone('');
    }, 2500);
  };

  return (
    <section id="trainers" className="py-24 section-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">
              OUR TRAINERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase theme-heading font-['Outfit']">
              Learn From <span className="text-red-500">The Best</span>
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

        {/* 4 Trainer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative rounded-2xl overflow-hidden fz-card flex flex-col"
            >
              <div className="relative h-80 overflow-hidden theme-bg-input">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{trainer.rating || '4.9'}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold theme-heading group-hover:text-red-500 transition-colors font-['Outfit']">
                    {trainer.name}
                  </h3>
                  <p className="text-xs theme-text-muted mt-0.5">{trainer.specialty}</p>
                </div>

                <div className="mt-4 pt-3 border-t theme-border flex items-center justify-between">
                  <div className="flex items-center gap-3 theme-text-muted">
                    <a href={trainer.instagram || '#'} target="_blank" rel="noreferrer"
                       className="hover:text-red-500 transition-colors" aria-label="Instagram">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href={trainer.facebook || '#'} target="_blank" rel="noreferrer"
                       className="hover:text-red-500 transition-colors" aria-label="Facebook">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a href={trainer.linkedin || '#'} target="_blank" rel="noreferrer"
                       className="hover:text-red-500 transition-colors" aria-label="LinkedIn">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full theme-bg-input hover:bg-red-600 theme-text-sec hover:text-white transition-all duration-200"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="theme-bg-elevated fz-card rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 theme-text-muted hover:theme-text"
            >
              <X className="w-5 h-5" />
            </button>

            {sessionBooked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold theme-heading font-['Outfit']">Session Scheduled!</h3>
                <p className="text-xs theme-text-sec">
                  Your 1-on-1 trial workout with {selectedTrainer.name} is confirmed for {date} at {time}.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3.5 pb-4 mb-4 border-b theme-border">
                  <img src={selectedTrainer.image} alt={selectedTrainer.name}
                       className="w-14 h-14 rounded-full object-cover border-2 border-red-500" />
                  <div>
                    <h3 className="text-lg font-bold theme-heading font-['Outfit']">Book with {selectedTrainer.name}</h3>
                    <p className="text-xs theme-text-muted">{selectedTrainer.specialty} • {selectedTrainer.experience_years || 5}+ yrs exp</p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {[
                    { label: 'Your Name', value: clientName, setter: setClientName, type: 'text', placeholder: 'e.g. Rahul Sharma' },
                    { label: 'Phone Number', value: clientPhone, setter: setClientPhone, type: 'tel', placeholder: '+91 98765 43210' },
                  ].map(({ label, value, setter, type, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold theme-text-sec mb-1.5">{label}</label>
                      <input type={type} required value={value}
                             onChange={(e) => setter(e.target.value)}
                             placeholder={placeholder}
                             className="w-full px-3.5 py-2.5 rounded-xl fz-input text-sm" />
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold theme-text-sec mb-1.5">Date</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                             className="w-full px-3 py-2 rounded-xl fz-input text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold theme-text-sec mb-1.5">Time Slot</label>
                      <select value={time} onChange={(e) => setTime(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl fz-input text-xs">
                        <option>07:00 AM</option>
                        <option>10:00 AM</option>
                        <option>05:00 PM</option>
                        <option>07:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit"
                            className="w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all">
                      Confirm Free Trial Session
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
