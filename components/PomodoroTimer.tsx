
import React, { useState, useEffect } from 'react';
import { TimerMode } from '../types';
import { Button } from './Button';

const MODE_TIMES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODE_TIMES[mode]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(MODE_TIMES[mode]);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODE_TIMES[mode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((MODE_TIMES[mode] - timeLeft) / MODE_TIMES[mode]) * 100;

  return (
    <div className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center max-w-sm mx-auto relative group">
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-100/50 rounded-full blur-2xl group-hover:bg-amber-200/50 transition-colors"></div>
      
      <div className="flex gap-1 mb-10 bg-stone-200/50 p-1.5 rounded-2xl w-full">
        {(Object.keys(MODE_TIMES) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all ${
              mode === m 
                ? 'bg-white text-[#4a2c1a] shadow-md' 
                : 'text-stone-500 hover:text-[#4a2c1a]'
            }`}
          >
            {m === 'pomodoro' ? 'Focus' : m === 'shortBreak' ? 'Short' : 'Long'}
          </button>
        ))}
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center mb-10">
        <svg className="absolute inset-0 w-full h-full -rotate-90 timer-glow">
          <circle
            cx="144" cy="144" r="132"
            fill="transparent"
            stroke="rgba(214, 202, 189, 0.3)"
            strokeWidth="4"
          />
          <circle
            cx="144" cy="144" r="132"
            fill="transparent"
            stroke="#8b5e3c"
            strokeWidth="12"
            strokeDasharray={829}
            strokeDashoffset={829 - (829 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        <div className="flex flex-col items-center">
          <div className="text-stone-300 mb-1">
            {isActive && (
              <div className="flex gap-1 justify-center">
                <div className="w-1 h-3 bg-stone-300 rounded-full steam-particle" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-5 bg-stone-300 rounded-full steam-particle" style={{animationDelay: '0.4s'}}></div>
                <div className="w-1 h-3 bg-stone-300 rounded-full steam-particle" style={{animationDelay: '0s'}}></div>
              </div>
            )}
            <span className="text-4xl">☕</span>
          </div>
          <div className="text-7xl font-serif font-black text-[#2d1b0b] tracking-tighter tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full px-2">
        <Button 
          onClick={toggleTimer} 
          className="flex-[2] py-5 text-lg"
          variant={isActive ? 'secondary' : 'primary'}
        >
          {isActive ? 'Pause Session' : 'Start Brewing'}
        </Button>
        <Button 
          onClick={resetTimer} 
          variant="secondary"
          className="flex-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
