import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Membership from './components/Membership';
import Trainers from './components/Trainers';
import BmiCalculator from './components/BmiCalculator';
import ClassSchedule from './components/ClassSchedule';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JoinModal from './components/JoinModal';
import VideoModal from './components/VideoModal';
import AdminModal from './components/AdminModal';
import SearchModal from './components/SearchModal';
import { fetchStats, fetchPlans, fetchTrainers, fetchHealth, fetchReviews } from './services/api';

export default function App() {
  const [stats, setStats] = useState(null);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [health, setHealth] = useState(null);

  // Modals state
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState('Premium Plan');
  const [selectedCycleForJoin, setSelectedCycleForJoin] = useState('monthly');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Active navigation section
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initial fetch of dynamic data
    async function loadInitialData() {
      try {
        const [statsData, plansData, trainersData, healthData, reviewsData] = await Promise.all([
          fetchStats().catch(() => null),
          fetchPlans().catch(() => []),
          fetchTrainers().catch(() => []),
          fetchHealth().catch(() => null),
          fetchReviews().catch(() => []),
        ]);
        if (statsData) setStats(statsData);
        if (plansData?.length) setPlans(plansData);
        if (trainersData?.length) setTrainers(trainersData);
        if (healthData) setHealth(healthData);
        if (reviewsData?.length) setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching initial FitZone data:', err);
      }
    }
    loadInitialData();

    // Scroll spy for navigation
    const handleScroll = () => {
      const sections = ['home', 'services', 'membership', 'trainers', 'schedule', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenJoin = (planName = 'Premium Plan', billingCycle = 'monthly') => {
    setSelectedPlanForJoin(planName);
    setSelectedCycleForJoin(billingCycle);
    setJoinModalOpen(true);
  };

  return (
    <div className="min-h-screen theme-bg theme-text flex flex-col font-['Inter'] selection:bg-red-600 selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenJoin={handleOpenJoin}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        activeSection={activeSection}
        dbStatus={health?.database || 'MySQL'}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenJoin={handleOpenJoin}
          onOpenVideo={() => setVideoModalOpen(true)}
          stats={stats}
        />

        {/* Services / Programs Built For Every Goal */}
        <Services onOpenJoin={handleOpenJoin} />

        {/* Membership Plans - Choose Your Plan */}
        <Membership onOpenJoin={handleOpenJoin} plans={plans} />

        {/* Trainers - Learn From The Best */}
        <Trainers trainers={trainers} onBookSession={handleOpenJoin} />

        {/* Interactive Biometric BMI & Calorie Calculator */}
        <BmiCalculator onSelectProgram={handleOpenJoin} />

        {/* Weekly Timetable & Class Booking Schedule */}
        <ClassSchedule />

        {/* Testimonials - What Our Members Say */}
        <Testimonials reviews={reviews} />

        {/* Contact Us, Operating Hours & Club Location */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenJoin={handleOpenJoin} />

      {/* Modals */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        initialPlan={selectedPlanForJoin}
        initialCycle={selectedCycleForJoin}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectPlan={handleOpenJoin}
      />
    </div>
  );
}
