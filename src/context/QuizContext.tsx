import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question, UserAnswer, QuizState } from "@/types";
import { isAnswerCorrect, calculateScore as calcScore } from "@/utils/helper";
import questionsData from "@/data/questions.json";

export interface QuizContextType {
  quizState: QuizState;
  answerQuestion: (
    questionId: number,
    selectedAnswer: number,
    timeTaken: number
  ) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  markAsUnanswered: (questionId: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  calculateScore: () => number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Initial state
const initialState: QuizState = {
  questions: [],
  userAnswers: [],
  currentQuestionIndex: 0,
  score: 0,
  isQuizCompleted: false,
};

// Provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    // Load questions from JSON and initialize user answers
    const questions = questionsData as Question[];
    const userAnswers: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: null,
      isCorrect: false,
      timeTaken: 0,
    }));

    return {
      ...initialState,
      questions,
      userAnswers,
    };
  });

  /**
   * Record user's answer for a question
   */
  const answerQuestion = (
    questionId: number,
    selectedAnswer: number,
    timeTaken: number
  ) => {
    setQuizState((prev) => {
      const question = prev.questions.find((q) => q.id === questionId);
      if (!question) return prev;

      const isCorrect = isAnswerCorrect(question, selectedAnswer);

      const updatedAnswers = prev.userAnswers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedAnswer, isCorrect, timeTaken }
          : answer
      );

      return {
        ...prev,
        userAnswers: updatedAnswers,
      };
    });
  };

  /**
   * Mark a question as unanswered (when timer runs out)
   */
  const markAsUnanswered = (questionId: number) => {
    setQuizState((prev) => {
      const updatedAnswers = prev.userAnswers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedAnswer: null, isCorrect: false, timeTaken: 30 }
          : answer
      );

      return {
        ...prev,
        userAnswers: updatedAnswers,
      };
    });
  };

  /**
   * Move to the next question
   */
  const nextQuestion = () => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;

      // Check if this was the last question
      if (nextIndex >= prev.questions.length) {
        return {
          ...prev,
          isQuizCompleted: true,
          score: calcScore(prev.userAnswers),
        };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  /**
   * Move to the last question
   */
  const previousQuestion = () => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex - 1;

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  /**
   * Complete the quiz and calculate final score
   */
  const completeQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isQuizCompleted: true,
      score: calcScore(prev.userAnswers),
    }));
  };

  /**
   * Reset quiz to initial state
   */
  const resetQuiz = () => {
    const questions = questionsData as Question[];
    const userAnswers: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: null,
      isCorrect: false,
      timeTaken: 0,
    }));

    setQuizState({
      questions,
      userAnswers,
      currentQuestionIndex: 0,
      score: 0,
      isQuizCompleted: false,
    });
  };

  /**
   * Calculate current score
   */
  const calculateScore = () => {
    return calcScore(quizState.userAnswers);
  };

  const contextValue: QuizContextType = {
    quizState,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    markAsUnanswered,
    completeQuiz,
    resetQuiz,
    calculateScore,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
