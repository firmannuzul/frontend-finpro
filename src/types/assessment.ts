// src/types/assessment.ts
export interface Option {
  id: number;
  optionText: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

export interface AnswerPayload {
  questionId: number;
  selectedOptionId: number;
}