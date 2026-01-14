
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAIResponse } from '../services/geminiService';
import { Button } from './Button';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the Digi Cafe Study Lounge. I’m your Barista. What can I brew up for you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, the steam wand is acting up. Could you repeat that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-[2rem] flex flex-col h-[550px] overflow-hidden shadow-2xl border-t-white border-l-white">
      <div className="p-6 bg-white/40 border-b border-stone-200/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2d1b0b] flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-amber-100/30">📖</div>
          <div>
            <h3 className="font-serif font-black text-[#2d1b0b] text-xl leading-tight">Study Assistant</h3>
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Active Barista Mode</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[85%] px-5 py-4 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-amber-100 text-[#4a2c1a] rounded-2xl rounded-tr-none border-b-2 border-amber-200 -rotate-1' 
                : 'bg-white text-stone-800 rounded-2xl rounded-tl-none border border-stone-100 rotate-1'
            }`}>
              {msg.role === 'model' && <div className="text-[10px] font-black text-stone-300 uppercase mb-2 tracking-widest border-b pb-1">Barista Receipt</div>}
              <div className="leading-relaxed font-medium">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/50 px-5 py-3 rounded-2xl text-xs text-stone-400 italic flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></span>
              Brewing response...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-5 bg-white/60 border-t border-stone-200/50 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 bg-white/80 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-amber-200 shadow-inner"
        />
        <Button size="sm" type="submit" disabled={isLoading} className="rounded-xl px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </Button>
      </form>
    </div>
  );
};
