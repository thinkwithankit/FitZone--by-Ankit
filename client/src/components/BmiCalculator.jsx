import React, { useState } from 'react';
import { Calculator, Activity, Flame, ArrowRight, RotateCcw } from 'lucide-react';

export default function BmiCalculator({ onSelectProgram }) {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);
  const [age, setAge] = useState(26);
  const [activity, setActivity] = useState(1.55);

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * activity);

  let status = 'Optimal Fitness', statusColor = 'text-emerald-500', barPercent = 50, recommendedProgram = 'CrossFit & Conditioning';
  if (bmi < 18.5)      { status = 'Underweight';  statusColor = 'text-amber-500';  barPercent = 20; recommendedProgram = 'Strength Training'; }
  else if (bmi <= 24.9){ status = 'Optimal Fitness'; statusColor = 'text-emerald-500'; barPercent = 50; recommendedProgram = 'CrossFit & Conditioning'; }
  else if (bmi <= 29.9){ status = 'Overweight';   statusColor = 'text-orange-500'; barPercent = 75; recommendedProgram = 'Cardio Fitness & HIIT'; }
  else                 { status = 'Obese';         statusColor = 'text-red-500';    barPercent = 95; recommendedProgram = 'Cardio & Low-Impact Strength'; }

  return (
    <section className="py-20 section-secondary relative border-t border-b" style={{ borderColor: 'var(--border-default)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-red-500 font-extrabold tracking-[0.2em] text-xs uppercase font-['Outfit']">
              <Calculator className="w-4 h-4" />
              <span>FITNESS TARGET ANALYZER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase theme-heading font-['Outfit']">
              Calculate Your <span className="text-red-500">BMI & Daily Calories</span>
            </h2>
            <p className="text-sm theme-text-sec leading-relaxed">
              Use our biomechanical health formula to measure your body mass index, daily energy expenditure,
              and discover the exact workout program tailored to your body genetics.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl fz-card">
                <div className="flex items-center gap-2 theme-text-muted text-xs mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Daily TDEE</span>
                </div>
                <div className="text-2xl font-black theme-heading font-['Outfit']">
                  {tdee} <span className="text-xs font-normal theme-text-muted">kcal/day</span>
                </div>
              </div>
              <div className="p-4 rounded-xl fz-card">
                <div className="flex items-center gap-2 theme-text-muted text-xs mb-1">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>Ideal Weight</span>
                </div>
                <div className="text-2xl font-black theme-heading font-['Outfit']">
                  {(22 * (heightM * heightM)).toFixed(0)} <span className="text-xs font-normal theme-text-muted">kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Calculator */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl fz-card shadow-2xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <div className="flex items-center gap-2">
                {['male', 'female'].map((g) => (
                  <button key={g} onClick={() => setGender(g)}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                            gender === g ? 'bg-red-600 text-white' : 'theme-bg-input theme-text-muted'
                          }`}>
                    {g}
                  </button>
                ))}
              </div>
              <button onClick={() => { setHeight(175); setWeight(72); setAge(26); setActivity(1.55); setGender('male'); }}
                      className="text-xs theme-text-muted hover:theme-text flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Height', value: height, min: 120, max: 220, unit: 'cm', setter: setHeight },
                { label: 'Weight', value: weight, min: 35,  max: 160, unit: 'kg', setter: setWeight },
              ].map(({ label, value, min, max, unit, setter }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="theme-text-sec">{label}</span>
                    <span className="theme-heading font-mono text-sm">{value} {unit}</span>
                  </div>
                  <input type="range" min={min} max={max} value={value}
                         onChange={(e) => setter(Number(e.target.value))}
                         className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-red-500"
                         style={{ background: 'var(--border-default)' }} />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold theme-text-sec mb-2">Age: {age} yrs</label>
                  <input type="range" min="14" max="80" value={age}
                         onChange={(e) => setAge(Number(e.target.value))}
                         className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-red-500"
                         style={{ background: 'var(--border-default)' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold theme-text-sec mb-2">Activity Level</label>
                  <select value={activity} onChange={(e) => setActivity(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg fz-input text-xs">
                    <option value={1.2}>Sedentary (desk job)</option>
                    <option value={1.375}>Light Exercise (1-3 days/wk)</option>
                    <option value={1.55}>Moderate Exercise (3-5 days/wk)</option>
                    <option value={1.725}>Hard Exercise (6-7 days/wk)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="mt-8 p-5 rounded-2xl fz-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs theme-text-muted">Your Body Mass Index</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black theme-heading font-['Outfit']">{bmi}</span>
                  <span className={`text-sm font-bold ${statusColor}`}>{status}</span>
                </div>
                <div className="w-48 h-2 rounded-full mt-3 overflow-hidden" style={{ background: 'var(--border-default)' }}>
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 rounded-full transition-all duration-300"
                       style={{ width: `${barPercent}%` }} />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] theme-text-muted block mb-1">Recommended Routine</span>
                <span className="text-sm font-bold text-red-500 font-['Outfit'] block">{recommendedProgram}</span>
                <a href="#services" className="inline-flex items-center gap-1.5 text-xs theme-text-sec hover:theme-text mt-2 font-medium">
                  <span>Explore Routine</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
