export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeTaken: number;
}

export interface QuizState {
  questions: Question[];
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  score: number;
  isQuizCompleted: boolean;
}
