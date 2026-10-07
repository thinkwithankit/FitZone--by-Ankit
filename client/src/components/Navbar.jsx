import React, { useState, useEffect } from 'react';
import { Dumbbell, Search, Menu, X, Database, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenJoin, onOpenSearch, onOpenAdmin, activeSection, dbStatus }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Membership', href: '#membership' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Contact', href: '#contact' },
  ];

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md py-3'
            : 'bg-[#0c0d12]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <span className={`text-2xl font-extrabold tracking-tight font-['Outfit'] ${scrolled && isLight ? 'text-gray-900' : 'text-white'}`}>
              Fit<span className="text-red-500">Zone</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? scrolled && isLight ? 'text-gray-900 font-semibold' : 'text-white font-semibold'
                      : scrolled && isLight ? 'text-gray-500 hover:text-gray-900' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-3">
            {/* DB Status Badge */}
            <button
              onClick={onOpenAdmin}
              title="Open Database Admin Console"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                isLight && scrolled
                  ? 'bg-gray-100 border-gray-200 text-gray-600 hover:border-red-400 hover:text-gray-900'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-red-500" />
              <span className="capitalize">{dbStatus || 'MySQL'}</span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-colors ${
                isLight && scrolled
                  ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* 🌙 / ☀️ Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`p-2 rounded-full transition-all border ${
                isLight && scrolled
                  ? 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-amber-400'
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 theme-toggle-icon" />
              ) : (
                <Sun className="w-4 h-4 theme-toggle-icon" />
              )}
            </button>

            {/* Join Now CTA */}
            <button
              onClick={() => onOpenJoin('Premium Plan')}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors border ${
                isLight
                  ? 'text-gray-600 border-gray-200 bg-gray-100'
                  : 'text-zinc-300 border-zinc-800 bg-zinc-900/80'
              }`}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenSearch}
              className={`p-2 transition-colors ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${isLight ? 'text-gray-700' : 'text-zinc-200'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-4 pb-6 space-y-3 ${
          isLight ? 'bg-white border-gray-200' : 'bg-[#0e1017] border-zinc-800'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2 text-base font-medium border-b transition-colors ${
                isLight
                  ? 'text-gray-700 hover:text-red-600 border-gray-100'
                  : 'text-zinc-300 hover:text-red-500 border-zinc-800/50'
              }`}
            >
              <span>{link.name}</span>
              <ChevronRight className={`w-4 h-4 ${isLight ? 'text-gray-400' : 'text-zinc-600'}`} />
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border text-xs font-semibold ${
                isLight
                  ? 'bg-gray-50 border-gray-200 text-gray-700'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300'
              }`}
            >
              <Database className="w-4 h-4 text-red-500" />
              <span>Database Console ({dbStatus || 'MySQL'})</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenJoin('Premium Plan'); }}
              className="w-full py-3 rounded-full bg-red-600 font-bold text-white shadow-lg shadow-red-600/30"
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
