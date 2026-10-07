import React, { useState } from 'react';
import { Check, Crown, Gem, Award } from 'lucide-react';

export default function Membership({ onOpenJoin, plans = [] }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const defaultPlans = [
    { id: 1, name: 'Basic Plan',   slug: 'basic',   monthly_price: 999,  yearly_price: 9990,  currency: '₹', is_popular: false,
      features: ['Gym Access','Basic Training Plan','Locker Facility','Community Support'] },
    { id: 2, name: 'Premium Plan', slug: 'premium', monthly_price: 1499, yearly_price: 14990, currency: '₹', is_popular: true,
      features: ['Gym Access','Personal Training (2 sessions)','Diet Plan','Locker Facility','Community Support'] },
    { id: 3, name: 'Pro Plan',     slug: 'pro',     monthly_price: 1999, yearly_price: 19990, currency: '₹', is_popular: false,
      features: ['All Premium Features','Unlimited Personal Training','Advanced Training Plan','Nutrition Consultation','Priority Support'] },
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  const getIcon = (slug, idx) => {
    if (slug === 'pro' || idx === 2) return Gem;
    if (slug === 'premium' || idx === 1) return Crown;
    return Award;
  };

  return (
    <section id="membership" className="py-24 section-secondary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/8 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-500 font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-['Outfit'] block mb-2">
              MEMBERSHIP PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase theme-heading font-['Outfit']">
              Choose <span className="text-red-500">Your Plan</span>
            </h2>
          </div>

          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center p-1 fz-card rounded-full w-fit">
            {['monthly', 'yearly'].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  billingCycle === cycle
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'theme-text-muted hover:theme-text'
                }`}
              >
                <span className="capitalize">{cycle}</span>
                {cycle === 'yearly' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-extrabold">-17%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {displayPlans.map((plan, idx) => {
            const isPopular = plan.is_popular || plan.slug === 'premium';
            const Icon = getIcon(plan.slug, idx);
            const price = billingCycle === 'yearly'
              ? (plan.yearly_price || plan.monthly_price * 10).toLocaleString('en-IN')
              : (plan.monthly_price || 999).toLocaleString('en-IN');

            return (
              <div
                key={plan.id || idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 fz-card ${
                  isPopular
                    ? 'border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.18)] md:-translate-y-2'
                    : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-600/40">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isPopular ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'theme-bg-input theme-text-sec'
                    }`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold theme-heading mb-3 font-['Outfit']">{plan.name}</h3>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl sm:text-4xl font-black theme-heading font-['Outfit']">₹{price}</span>
                    <span className="text-xs theme-text-muted font-medium">
                      {billingCycle === 'yearly' ? '/ year' : '/ month'}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-red-500 stroke-[3] shrink-0" />
                        <span className="text-xs sm:text-sm theme-text-sec">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenJoin(plan.name, billingCycle)}
                  className={`w-full py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isPopular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'theme-bg-input theme-text-sec hover:border-red-500 hover:text-red-500 border fz-card'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
