import React, { useState } from 'react';
import { X, Check, Dumbbell, ShieldCheck, CreditCard, Sparkles, Download, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerMember } from '../services/api';

export default function JoinModal({ isOpen, onClose, initialPlan = 'Premium Plan', initialCycle = 'monthly' }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Info & Plan, 2: Payment, 3: Success Pass
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState(initialCycle);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [createdMember, setCreatedMember] = useState(null);

  const planPrices = {
    'Basic Plan': { monthly: 999, yearly: 9990 },
    'Premium Plan': { monthly: 1499, yearly: 14990 },
    'Pro Plan': { monthly: 1999, yearly: 19990 },
  };

  const currentPrice = planPrices[selectedPlan]
    ? planPrices[selectedPlan][billingCycle]
    : 1499;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStep(2);
  };

  const handleCompletePayment = async () => {
    try {
      setLoading(true);
      const res = await registerMember({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        plan: selectedPlan,
        billing_cycle: billingCycle,
        amount_paid: currentPrice,
        payment_method: paymentMethod,
      });

      setCreatedMember(res.member);
      setStep(3);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
        });
      } catch (err) {}
    } catch (e) {
      alert('Error registering membership: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12141d] border border-zinc-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div>
            <div className="mb-6">
              <span className="text-red-500 font-extrabold tracking-wider text-xs uppercase font-['Outfit'] block mb-1">
                STEP 1 OF 2 • MEMBERSHIP REGISTRATION
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Join <span className="text-red-500">FitZone</span> Today
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Begin your transformation with instant club access and personal training.
              </p>
            </div>

            <form onSubmit={handleNextStep} className="space-y-4">
              {/* Plan Choice Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Select Your Plan
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['Basic Plan', 'Premium Plan', 'Pro Plan'].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setSelectedPlan(p)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedPlan === p
                          ? 'bg-red-600/15 border-red-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{p}</div>
                      <div className="text-[11px] text-zinc-400 mt-1">
                        ₹{planPrices[p][billingCycle].toLocaleString('en-IN')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Cycle Switch */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs text-zinc-300 pl-2">Billing Frequency</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      billingCycle === 'monthly'
                        ? 'bg-red-600 text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      billingCycle === 'yearly'
                        ? 'bg-red-600 text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    Yearly (-17%)
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Continue to Payment CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/35 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment (₹{currentPrice.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-6">
              <span className="text-red-500 font-extrabold tracking-wider text-xs uppercase font-['Outfit'] block mb-1">
                STEP 2 OF 2 • SECURE CHECKOUT
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Complete Your Order
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Instant database confirmation & digital VIP pass delivery.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Member Name:</span>
                <span className="font-semibold text-white">{form.name}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Selected Plan:</span>
                <span className="font-semibold text-red-400">{selectedPlan} ({billingCycle})</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Gym Location:</span>
                <span className="text-white">FitZone Club Jaipur</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                <span>Total Amount Due:</span>
                <span className="text-red-500 text-base">₹{currentPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-semibold text-zinc-300">
                Select Payment Method
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'UPI', label: 'UPI / GPay' },
                  { id: 'Card', label: 'Credit/Debit Card' },
                  { id: 'NetBanking', label: 'Net Banking' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === m.id
                        ? 'bg-red-600/20 border-red-500 text-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'UPI' && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  <p className="text-xs text-zinc-400">
                    Pay using UPI ID: <strong className="text-white font-mono">fitzone@icici</strong> or any QR scanner.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleCompletePayment}
                className="flex-1 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/35 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{currentPrice.toLocaleString('en-IN')} & Activate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && createdMember && (
          <div className="py-2 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                PAYMENT CONFIRMED • MEMBERSHIP ACTIVE
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] mt-1">
                Welcome to FitZone, {createdMember.full_name}!
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your profile has been registered in the database. Present this pass at gym front reception.
              </p>
            </div>

            {/* Digital Membership Pass Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1d27] via-[#12131b] to-[#0c0d12] border-2 border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.25)] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-white text-lg font-['Outfit']">
                    Fit<span className="text-red-500">Zone</span> VIP Pass
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold text-[11px] border border-red-500/40">
                  {createdMember.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Member Name</span>
                  <span className="text-white font-bold text-sm">{createdMember.full_name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Member ID Code</span>
                  <span className="text-red-400 font-mono font-bold text-sm">{createdMember.membership_code}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Tier / Plan</span>
                  <span className="text-white font-medium">{createdMember.plan}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Valid Until</span>
                  <span className="text-white font-medium">{createdMember.expiry_date}</span>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 h-6">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3].map((w, i) => (
                    <div
                      key={i}
                      className="bg-zinc-400 h-full"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {createdMember.membership_code}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print Pass</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all"
              >
                Finish & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
