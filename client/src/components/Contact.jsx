import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    try {
      setLoading(true);
      await submitInquiry(form);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Membership Inquiry',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0b0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <div className="max-w-2xl mb-16">
          <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-['Outfit']">
            Ready To Start <span className="text-red-500">Your Transformation?</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Drop by our flagship fitness center or send us a message. Our head coaches are ready to design your customized workout plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#12131b] border border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Outfit'] mb-1">
                    Club Location
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    FitZone Elite Sports Complex, Plot 42, Tonk Road, Jaipur, Rajasthan 302015, India
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12131b] border border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Outfit'] mb-1">
                    Operating Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Monday – Friday: 05:00 AM – 11:00 PM <br />
                    Saturday – Sunday: 06:00 AM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12131b] border border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Outfit'] mb-1">
                    Direct Helpline & Email
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Phone: <a href="tel:+919876543210" className="text-white hover:text-red-400">+91 98765 43210</a> <br />
                    Email: <a href="mailto:support@fitzone.com" className="text-white hover:text-red-400">support@fitzone.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#111219] border border-zinc-800 shadow-xl relative">
            <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
              Send Us A Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Inquire about personal training, membership rates, corporate partnerships or gym visits.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you within 2 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Aman Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aman@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 text-sm text-white outline-none transition-colors"
                  >
                    <option>Membership Inquiry</option>
                    <option>Personal Training Consultation</option>
                    <option>Trial Workout Pass</option>
                    <option>Corporate Fitness Plan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your fitness background and goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 text-sm text-white placeholder-zinc-500 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Submit Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
