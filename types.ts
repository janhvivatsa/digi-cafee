
export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON'
}
