
import React, { useState } from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AIChat } from './components/AIChat';
import { QuizModule } from './components/QuizModule';
import { ZenGame } from './components/ZenGame';
import { AmbientSound } from './components/AmbientSound';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'study' | 'refresh'>('study');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 min-h-screen flex flex-col relative">
      {/* Decorative Blur Spots */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8b5e3c]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-[#2d1b0b] rounded-[1.5rem] flex items-center justify-center text-white text-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ring-8 ring-white/50">☕</div>
          <div>
            <h1 className="text-6xl font-serif font-black text-[#2d1b0b] tracking-tighter mb-1">Digi Cafe</h1>
            <p className="text-amber-800 font-bold uppercase tracking-[0.3em] text-[10px]">Artisanal Workspace & Sanctuary</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <AmbientSound />
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-200/30 px-3 py-1 rounded-full">Atmosphere: Rainy Afternoon</div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Focus Tools (4/12) */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-12">
          <PomodoroTimer />
          
          <div className="bg-[#2d1b0b] text-amber-50 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group border border-white/10">
            <div className="absolute top-0 right-0 p-6 text-7xl opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700 font-serif">"</div>
            <h4 className="font-serif font-bold text-2xl mb-4 italic text-amber-200">Refined Focus</h4>
            <p className="text-amber-100/70 text-sm leading-relaxed font-medium">
              A single espresso shot contains 63mg of caffeine. A single session of deep work contains an infinite amount of potential.
            </p>
            <div className="mt-6 w-12 h-1 bg-amber-500/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Column: Interactive Modules (8/12) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Navigation Tabs - Boutique Style */}
          <div className="flex gap-4 p-2 bg-stone-200/40 rounded-[1.5rem] w-full max-w-md border border-stone-200/50 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('study')}
              className={`flex-1 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'study' ? 'bg-[#2d1b0b] text-white shadow-xl scale-105' : 'text-stone-500 hover:bg-white/50'
              }`}
            >
              Study Lounge
            </button>
            <button
              onClick={() => setActiveTab('refresh')}
              className={`flex-1 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'refresh' ? 'bg-[#2d1b0b] text-white shadow-xl scale-105' : 'text-stone-500 hover:bg-white/50'
              }`}
            >
              Zen Garden
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {activeTab === 'study' ? (
              <>
                <AIChat />
                <div className="space-y-10">
                  <QuizModule />
                  <div className="glass-card p-8 rounded-[2rem] border-dashed border-2 border-stone-300 bg-transparent flex flex-col items-center justify-center text-center opacity-60">
                    <p className="text-stone-500 font-serif italic text-lg">"The best preparation for tomorrow is doing your best today."</p>
                    <span className="text-stone-300 mt-4">— H. Jackson Brown, Jr.</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ZenGame />
                <div className="glass-card p-10 rounded-[3rem] flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[400px]">
                  <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_#fff_0%,_transparent_70%)] opacity-40"></div>
                  <div className="text-6xl mb-8 animate-pulse">🧘</div>
                  <h3 className="text-3xl font-serif font-black text-[#2d1b0b] mb-6 tracking-tight leading-tight">Breathe in,<br/>Breathe out.</h3>
                  <p className="text-stone-500 mb-8 max-w-[250px] font-medium leading-loose">
                    This space is for your stillness. Enjoy the quiet of the morning air.
                  </p>
                  <div className="flex gap-4">
                    <span className="w-3 h-3 rounded-full bg-stone-200"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-stone-200"></span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pt-12 text-center border-t border-stone-200/50">
        <div className="font-serif font-black text-[#2d1b0b] text-xl mb-4">Digi Cafe</div>
        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em]">Designed for Focused Minds & Kind Souls</p>
        <div className="flex justify-center gap-4 mt-8 opacity-30 grayscale hover:grayscale-0 transition-all">
          <span className="text-2xl">☕</span>
          <span className="text-2xl">🥐</span>
          <span className="text-2xl">🌱</span>
        </div>
        <p className="mt-8 text-stone-300 text-[10px] font-medium">&copy; {new Date().getFullYear()} DIGI CAFE INTERACTIVE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;
