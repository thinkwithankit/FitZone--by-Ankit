import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Plus, X, Check } from 'lucide-react';

export default function Testimonials({ reviews = [] }) {
  const [reviewList, setReviewList] = useState([
    { id: 1, member_name: 'Amit Kumar', role_or_title: 'Powerlifting Member', rating: 5,
      comment: 'Amazing environment, professional trainers and great results!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 2, member_name: 'Sneha Patel', role_or_title: 'Yoga & CrossFit Member', rating: 5,
      comment: 'FitZone has completely transformed my fitness journey. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { id: 3, member_name: 'Vikram Singh', role_or_title: 'Functional Fitness', rating: 5,
      comment: 'Best gym in the city with modern equipment and great support.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 4, member_name: 'Ritu Sen', role_or_title: 'Cardio & HIIT Member', rating: 5,
      comment: 'Lost 12 kg in 4 months with Neha\'s guidance. The energy here is infectious!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const prevSlide = () => setCurrentIndex(p => (p === 0 ? reviewList.length - 1 : p - 1));
  const nextSlide = () => setCurrentIndex(p => (p === reviewList.length - 1 ? 0 : p + 1));

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const item = {
      id: reviewList.length + 1, member_name: newReview.name, role_or_title: 'FitZone Member',
      rating: newReview.rating, comment: newReview.comment,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newReview.name)}`,
    };
    setReviewList([item, ...reviewList]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setModalOpen(false); setNewReview({ name: '', comment: '', rating: 5 }); }, 1800);
  };

  return (
    <section id="about" className="py-24 section-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase theme-heading font-['Outfit']">
              What Our <span className="text-red-500">Members Say</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setModalOpen(true)}
                    className="mr-2 text-xs font-semibold px-4 py-2 rounded-full fz-card theme-text-sec hover:text-red-500 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-red-500" /><span>Add Review</span>
            </button>
            <button onClick={prevSlide} aria-label="Previous"
                    className="w-10 h-10 rounded-full fz-card theme-text-sec hover:text-red-500 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} aria-label="Next"
                    className="w-10 h-10 rounded-full fz-card theme-text-sec hover:text-red-500 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewList.slice(0, 3).map((item) => (
            <div key={item.id} className="p-6 rounded-2xl fz-card flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <img src={item.avatar} alt={item.member_name}
                     className="w-12 h-12 rounded-full object-cover border" style={{ borderColor: 'var(--border-default)' }} />
                <div>
                  <h4 className="text-sm font-bold theme-heading font-['Outfit']">{item.member_name}</h4>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm theme-text-sec italic leading-relaxed">"{item.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="theme-bg-elevated fz-card rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 theme-text-muted hover:theme-text"><X className="w-5 h-5" /></button>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold theme-heading">Thank You!</h3>
                <p className="text-xs theme-text-sec">Your review has been published.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold theme-heading mb-1 font-['Outfit']">Share Your FitZone Experience</h3>
                <p className="text-xs theme-text-muted mb-5">Inspire other athletes with your feedback.</p>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold theme-text-sec mb-1">Your Name</label>
                    <input type="text" required value={newReview.name}
                           onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                           placeholder="e.g. Rahul Verma" className="w-full px-3.5 py-2.5 rounded-xl fz-input text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold theme-text-sec mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map((star) => (
                        <button type="button" key={star} onClick={() => setNewReview({ ...newReview, rating: star })} className="p-1">
                          <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'theme-text-muted'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold theme-text-sec mb-1">Your Feedback</label>
                    <textarea required rows={3} value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              placeholder="Tell us what you love about FitZone..."
                              className="w-full px-3.5 py-2.5 rounded-xl fz-input text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all">
                    Post Review
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
