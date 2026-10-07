import React, { useState, useEffect } from 'react';
import { Clock, User, CheckCircle, X, Loader2 } from 'lucide-react';
import { fetchClasses, bookClassSlot } from '../services/api';

export default function ClassSchedule() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingModal, setBookingModal] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const categories = ['All', 'Strength', 'Cardio', 'CrossFit', 'Yoga'];

  const loadClasses = async () => {
    try { setLoading(true); const data = await fetchClasses(selectedDay, selectedCategory); setClasses(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadClasses(); }, [selectedDay, selectedCategory]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      setSubmitting(true);
      const result = await bookClassSlot({ class_id: bookingModal.id, class_title: bookingModal.title,
        member_name: form.name, member_email: form.email, member_phone: form.phone, time_slot: bookingModal.time_slot });
      setBookingSuccess(result.booking);
      loadClasses();
    } catch { alert('Booking error'); }
    finally { setSubmitting(false); }
  };

  const closeBooking = () => { setBookingModal(null); setBookingSuccess(null); setForm({ name: '', email: '', phone: '' }); };

  return (
    <section id="schedule" className="py-24 section-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">WEEKLY TIMETABLE</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase theme-heading font-['Outfit']">
            Workout <span className="text-red-500">Schedule</span>
          </h2>
          <p className="text-sm theme-text-sec mt-3">Reserve your workout slot with certified coaches. Limited capacity for personalized attention.</p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6">
          {days.map((day) => (
            <button key={day} onClick={() => setSelectedDay(day)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                      selectedDay === day ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'fz-card theme-text-sec hover:theme-text'
                    }`}>
              {day}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'theme-bg-input theme-heading border-red-500 border'
                        : 'theme-text-muted hover:theme-text-sec'
                    }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>
        ) : classes.length === 0 ? (
          <div className="text-center py-16 theme-text-muted text-sm">
            No classes for {selectedDay} in {selectedCategory}. Try another day!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((cls) => {
              const spotsLeft = cls.capacity - (cls.booked_count || 0);
              const isFull = spotsLeft <= 0;
              return (
                <div key={cls.id} className="p-6 rounded-2xl fz-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-1 rounded-md fz-card theme-text-sec font-semibold uppercase tracking-wider">{cls.category}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        cls.intensity === 'Extreme' ? 'bg-red-500/15 text-red-500 border border-red-500/30' : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      }`}>{cls.intensity} Intensity</span>
                    </div>
                    <h3 className="text-lg font-bold theme-heading font-['Outfit'] mb-2">{cls.title}</h3>
                    <div className="space-y-2 text-xs theme-text-sec mb-6">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" /><span>{cls.time_slot}</span></div>
                      <div className="flex items-center gap-2"><User className="w-4 h-4 theme-text-muted" />
                        <span>Trainer: <strong className="theme-text-sec">{cls.trainer_name}</strong></span></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs theme-text-muted mb-2">
                      <span>Capacity</span>
                      <span className="font-semibold theme-heading">{cls.booked_count || 0} / {cls.capacity} Booked</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--border-default)' }}>
                      <div className="h-full bg-red-600 rounded-full transition-all duration-500"
                           style={{ width: `${Math.min(100, ((cls.booked_count || 0) / cls.capacity) * 100)}%` }} />
                    </div>
                    <button onClick={() => setBookingModal(cls)} disabled={isFull}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                              isFull ? 'theme-bg-input theme-text-muted cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25'
                            }`}>
                      {isFull ? 'Class Full' : 'Book Class Slot'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="theme-bg-elevated fz-card rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={closeBooking} className="absolute top-4 right-4 theme-text-muted hover:theme-text"><X className="w-5 h-5" /></button>
            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold theme-heading font-['Outfit']">Slot Confirmed!</h3>
                  <p className="text-xs theme-text-sec mt-1">Your spot in <strong>{bookingSuccess.class_title}</strong> is reserved.</p>
                </div>
                <div className="p-4 rounded-xl fz-card text-left space-y-1.5 text-xs theme-text-sec">
                  <div><strong>Code:</strong> <span className="text-red-500 font-mono">{bookingSuccess.booking_code}</span></div>
                  <div><strong>Time:</strong> {bookingSuccess.time_slot}</div>
                  <div><strong>Member:</strong> {bookingSuccess.member_name}</div>
                </div>
                <button onClick={closeBooking} className="w-full py-2.5 rounded-full bg-red-600 font-bold text-xs text-white">Done</button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold theme-heading font-['Outfit'] mb-1">Reserve Workout Slot</h3>
                <p className="text-xs theme-text-sec mb-4">{bookingModal.title} • {bookingModal.time_slot}</p>
                <form onSubmit={handleBook} className="space-y-3.5">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Vikram Malhotra' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'vikram@example.com' },
                    { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold theme-text-sec mb-1">{label}</label>
                      <input type={type} required={key !== 'phone'} value={form[key]}
                             onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                             placeholder={placeholder} className="w-full px-3.5 py-2.5 rounded-xl fz-input text-xs" />
                    </div>
                  ))}
                  <button type="submit" disabled={submitting}
                          className="w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 mt-4">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Reservation'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
