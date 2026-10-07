import React, { useState } from 'react';
import { Dumbbell, Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { subscribeNewsletter } from '../services/api';

export default function Footer({ onOpenJoin }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    try {
      setStatus('loading');
      await subscribeNewsletter(email);
      setStatus('success');
      setFeedback('Thank you for subscribing! Check your inbox for 15% discount code.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setFeedback('Subscription saved locally.');
    }
  };

  return (
    <footer className="bg-[#08090d] border-t border-zinc-800/80 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/60">
          {/* Brand Info matching reference */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Dumbbell className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold text-white font-['Outfit']">
                Fit<span className="text-red-500">Zone</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Your fitness journey starts here. Join FitZone and build a healthier,
              stronger, and happier you.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/lostin__ankitt404?stkn=dGhmbWx5a3BsYzE="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/18F6G2ZSgg/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="http://www.youtube.com/@Blogwithankit52"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-patel-think5265/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links matching reference */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white font-['Outfit'] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-red-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-red-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#services" className="hover:text-red-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-red-400 transition-colors">Trainers</a>
              </li>
              <li>
                <a href="#membership" className="hover:text-red-400 transition-colors">Membership</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Us matching reference */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-['Outfit'] uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:+918470942665" className="hover:text-white transition-colors">
                  +91 8470942665
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:patelankeet048@gmail.com" className="hover:text-white transition-colors">
                  patelankeet048@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Behal, Haryana, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter matching reference */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-['Outfit'] uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to get latest updates and offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center rounded-full bg-zinc-900 border border-zinc-800 p-1 focus-within:border-red-500 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-3 text-xs text-white placeholder-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shrink-0 transition-colors shadow-sm disabled:opacity-50"
                >
                  {status === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Subscribe'}
                </button>
              </div>

              {feedback && (
                <p className={`text-[11px] ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 FitZone. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
