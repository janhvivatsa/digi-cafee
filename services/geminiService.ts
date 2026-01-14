
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, QuizData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (history: ChatMessage[], prompt: string): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  // Convert history to correct format for standard contents
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));
  
  // Add current prompt
  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: "You are a helpful, encouraging cafe barista AI named 'Digi Barista'. Your goal is to help students and workers stay focused, answer their questions clearly, and keep the tone warm, professional, and cozy.",
      temperature: 0.7,
    }
  });

  return response.text || "I'm sorry, I couldn't process that request. How about a cup of virtual coffee instead?";
};

export const generateQuiz = async (topic: string): Promise<QuizData> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Generate a fun and educational 5-question quiz about "${topic}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.INTEGER, description: "Index (0-3) of the correct option" },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer", "explanation"]
            }
          }
        },
        required: ["title", "questions"]
      }
    }
  });

  const text = response.text.trim();
  return JSON.parse(text) as QuizData;
};
