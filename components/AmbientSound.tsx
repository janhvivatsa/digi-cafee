
import React, { useState } from 'react';

const SOUNDS = [
  { id: 'rain', label: 'Soft Rain', emoji: '🌧️', url: 'https://www.soundjay.com/nature/rain-01.mp3' },
  { id: 'cafe', label: 'Coffee Shop', emoji: '☕', url: 'https://www.soundjay.com/misc/sounds/coffee-shop-1.mp3' },
  { id: 'jazz', label: 'Chill Jazz', emoji: '🎷', url: 'https://www.soundjay.com/button/sounds/button-1.mp3' } // Note: Real ambient loops would be better, these are placeholders
];

export const AmbientSound: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  const toggleSound = (id: string) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
      {SOUNDS.map(sound => (
        <button
          key={sound.id}
          onClick={() => toggleSound(sound.id)}
          className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            playing === sound.id ? 'bg-amber-800 text-white shadow-md' : 'bg-white/50 text-stone-600 hover:bg-white'
          }`}
        >
          <span className="text-xl">{sound.emoji}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{sound.label}</span>
        </button>
      ))}
    </div>
  );
};
