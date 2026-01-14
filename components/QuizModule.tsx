
import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizData } from '../types';
import { Button } from './Button';

export const QuizModule: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateQuiz(topic);
      setQuiz(data);
      setCurrentQuestion(0);
      setScore(0);
      setShowResults(false);
      setSelectedOption(null);
      setIsAnswered(false);
    } catch (e) {
      alert("Error brewing your quiz. Our barista got distracted!");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quiz!.questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quiz!.questions.length) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="glass-card p-8 rounded-[2.5rem] border-t-white relative group overflow-hidden">
      {/* Menu Header Decoration */}
      <div className="absolute top-0 right-0 p-4 font-serif text-stone-100 text-6xl font-black -rotate-12 pointer-events-none select-none">QUIZ</div>
      
      <h3 className="text-2xl font-serif font-black text-[#2d1b0b] mb-6 flex items-center gap-3">
        <span className="text-amber-700">✦</span> Daily Specials
      </h3>
      
      {!quiz ? (
        <div className="space-y-6">
          <p className="text-sm text-stone-500 font-medium leading-relaxed italic border-l-4 border-amber-200 pl-4">
            Order a quiz on any subject. Perfect for a quick cognitive refresh during your break.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What topic is on your mind?"
              className="w-full bg-white/50 border border-stone-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-amber-200 outline-none shadow-sm"
            />
            <Button onClick={startQuiz} disabled={loading} className="w-full py-4">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </div>
              ) : 'Brew Knowledge Quiz'}
            </Button>
          </div>
        </div>
      ) : showResults ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-6">🏆</div>
          <h4 className="text-3xl font-serif font-black text-[#2d1b0b] mb-2">Quiz Results</h4>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px] mb-8">Score Card: {score} / {quiz.questions.length}</p>
          <div className="w-full bg-stone-100 rounded-full h-2 mb-8 overflow-hidden">
             <div className="bg-amber-600 h-full transition-all duration-1000" style={{width: `${(score/quiz.questions.length)*100}%`}}></div>
          </div>
          <Button onClick={() => setQuiz(null)} variant="primary">Return to Menu</Button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div>
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">Course {currentQuestion + 1}</span>
               <span className="text-[10px] font-bold text-stone-300">Question {currentQuestion + 1}/{quiz.questions.length}</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-[#2d1b0b] leading-tight">{quiz.questions[currentQuestion].question}</h4>
          </div>
          
          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((opt, i) => {
              let btnClass = "w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 text-sm font-semibold ";
              if (isAnswered) {
                if (i === quiz.questions[currentQuestion].correctAnswer) btnClass += "bg-green-50 border-green-500 text-green-900 ring-4 ring-green-100";
                else if (i === selectedOption) btnClass += "bg-red-50 border-red-500 text-red-900";
                else btnClass += "border-stone-50 text-stone-300 opacity-50";
              } else {
                btnClass += "border-stone-100 bg-white/50 hover:border-amber-300 hover:bg-white hover:translate-x-1";
              }

              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={isAnswered} className={btnClass}>
                  <span className="mr-3 opacity-30 font-serif italic">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-100/50 animate-in slide-in-from-top-4 duration-500">
              <h5 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-2">Barista Note</h5>
              <p className="text-sm text-stone-700 italic font-medium leading-relaxed">"{quiz.questions[currentQuestion].explanation}"</p>
              <Button className="mt-6 w-full py-4" onClick={nextQuestion}>
                {currentQuestion + 1 === quiz.questions.length ? 'Finalize Quiz' : 'Next Course'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
