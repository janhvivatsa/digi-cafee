
import React, { useState, useEffect } from 'react';
import { Button } from './Button';

const EMOJIS = ['☕', '🥐', '🥯', '🍰', '🍪', '🍩', '🥛', '🍵'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const ZenGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    const deck: Card[] = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === first || c.id === second) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === first || c.id === second) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setWon(true);
    }
  }, [cards]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-amber-100 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-bold text-amber-900">Zen Break Match</h3>
        <div className="text-stone-500 text-sm">Moves: {moves}</div>
      </div>

      {won ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎉</div>
          <h4 className="text-2xl font-bold text-stone-800 mb-2">Well Done!</h4>
          <p className="text-stone-500 mb-6">Your mind is refreshed. Ready to focus again?</p>
          <Button onClick={initGame}>Play Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
                card.isFlipped || card.isMatched 
                  ? 'bg-amber-100 border-amber-200' 
                  : 'bg-stone-200 hover:bg-stone-300 border-transparent shadow-sm'
              } border-2`}
            >
              {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
